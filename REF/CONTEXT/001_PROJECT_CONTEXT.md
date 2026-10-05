# Sorgaflex Workforce Agenda Platform — Project Context

> **Purpose of this file:** this is the persistent source of truth for what
> this project is and why it's built the way it is. Read this before
> making any structural decision, adding a table, or changing a flow —
> don't infer intent from the code alone. If something in the code
> contradicts this file, this file wins unless the user says otherwise.

---

## 1. Business context

**Sorgaflex** is an agency that supplies freelance childcare workers to
client organizations. Org hierarchy is three levels:

```
Sorgaflex (agency)
  └── Clients (e.g. "CityKids")
        └── Creches (individual daycare locations, each with an address/city)
```

The primary client currently discussed is **CityKids**, which operates
many creches across Amsterdam, Rotterdam, and Den Haag.

**The problem being solved:** today, scheduling is manual. A Sorgaflex
manager posts available work slots in a WhatsApp group or texts/emails
workers individually; workers reply with their availability; the manager
manually assigns days. Sorgaflex also has to collect compliance documents
from workers (ID, certifications, etc.) and track expiry dates by hand.
This platform replaces that manual process with a structured web app.

---

## 2. Current build scope

**This phase is web-app only.** Do not build WhatsApp integration, n8n
workflows, email sending, or document OCR/extraction yet — those are
deferred to a later phase (see Section 7). Build the web app's pages, data
model, and business logic so that it works correctly as a standalone
system a manager and workers can use directly, with room for automation to
plug in later without requiring a redesign.

---

## 3. Roles

- **Admin (Sorgaflex manager)**: creates slots, monitors/overrides
  bookings, manages workers and clients/creches, reviews documents,
  requires password login.
- **Worker**: has a profile, sees open slots, self-books, can preset their
  own availability, uploads/views their documents. Login is simple for
  now (e.g. select/enter a worker identifier) — real worker authentication
  (phone/PIN-based) is undecided, treat as a placeholder to revisit later.

There is currently **no creche-side login** — creches are not platform
users, just an entity slots are tied to. This may be reconsidered later.

---

## 4. Pages & Routing

### 4.1 Login page
- One page routes the user to the right section. Admin tabs to a password,
  worker tabs to a worker identifier.
- **DEMO AUTHENTICATION, not security.** There is no backend, so the admin
  password is compared in the browser and any existing worker ID is accepted.
  The password is `sorgaflex2026` and is shown on the login page, because this
  is a demo and nobody should waste time guessing. Real worker authentication
  (phone/PIN) remains undecided — see Section 3.
- A blocked worker is refused at sign-in.
- Every route is role-guarded. A user with no session is sent to the login
  page, and a signed-in user who reaches the other section's route is sent
  back to their own home, so a role can never see the other section by URL.
- The sidebar is role-aware: admin sees Home/Clients/Workers/Reports; a worker
  sees My schedule/My profile/My invoices.

### 4.2 Routing structure
All routes are registered in `js/app.js` and hash-routed via
`js/core/router.js`. Every route is **role-guarded**: no session means the
login page, and the wrong role means that user's own home.

- **Login** `/login` — reachable from any state.
- **Admin routes**: `/` (Home, with `/home` as an alias), `/clients`,
  `/clients/:clientId`, `/workers`, `/workers/:workerId`, `/reports`,
  `/logout`.
  - Pages are mounted/unmounted on route change. There is no per-route
    provider tree; shared state goes through the `State` store and the `api`
    layer.
- **Worker routes**: `/worker` (My schedule), `/worker/profile`,
  `/worker/invoices`.
  - The `/worker` prefix means a worker route can never collide with an admin
    one.
- **404** redirects to the user's own home, not a fixed page.

- **App shell** (`js/app.js`): shared layout that wraps
  all role-specific pages. Renders the `Sidebar` on the left (fixed width 64px
  collapsed / 256px expanded) and a `main` content area on the right. Redirects
  to the opposite role's default route if the logged-in user's role does not match.
  Uses `Outlet` to render nested route content.

- **Sidebar** (`js/components/Sidebar.js`): Fixed 64px/256px sidebar with
  collapsible navigation. Admin nav items: Home, Clients, Workers, Reports.
  Worker nav items: My Agenda, Profile. Active route is highlighted with the
  accent color. Bottom card shows user status, name, and ID, plus a Logout button.

### 4.3 Admin — Home page
- A **yearly calendar**, rendered as a **3-month continuous view** (three
  month columns side by side on desktop, stacked on mobile).
  Months are navigated 3-at-a-time via Previous/Next buttons.
- Shows interactive day cells merging data from **all creches** for that
  date (an aggregate view, not per-worker).
- Day color = aggregate status for that date:
  - **Green** = at least one open/available slot that day
  - **Blue** = all of that day's slots are assigned
  - Neutral/default color = no slots exist for that day
- **Click** a day → opens `DayDetailPopup` with that day's slots, creches,
  and assigned workers.
- **Hover** a day → lightweight hover card tooltip (single card, positioned
  above the day cell using `getBoundingClientRect()`).
- Uses `showOnlyCurrentMonth` to hide padding days from adjacent months.
- The Home page is **read-only** apart from reopening an assigned slot from
  `DayDetailPopup`, which commits immediately. It carries no Save/Cancel:
  there is nothing staged on it. (An earlier version had a `SaveCancelBar`
  wired to an always-empty pending list, so it could never appear. See
  Section 5 for where Save/Cancel actually lives.)

### 4.4 Admin — Clients page
- Lists Sorgaflex's **clients** as a card grid (e.g. "CityKids"). Each card
  shows creche count, current-month slot stats (total/open/assigned), and the
  client's own contact details: address, email, phone. Creche cities are
  listed separately, since a client's creches can be in different cities and
  those are distinct from the client's registered address.
- Click a client → navigates to that client's profile (route
  `/admin/clients/:clientId`).
- The profile page shows a **client profile card** above the creche grid:
  name, client ID, creche count, address, email, phone, current-month slot
  totals, and a note that further detail is deferred to a later section
  (pending the Sorgaflex meeting). No edit actions yet.
- Creches are displayed as `CrecheCard` components, three per row on desktop,
  each with an **inline 1-month calendar** showing slot status per day and
  stats (total/open/assigned). Month navigation is shared across the cards via
  Previous/Next.
- Creche cards are read-only. Clicking a day on the calendar opens the day
  popup; there is no "Add Slots" button on the card.
- **DaySlotsPopup** (`js/components/DaySlotsPopup.js`): Manages the slots for
  one creche on one day. Opened from a day click, so the date is already
  chosen and there is no calendar inside. Features:
  - Creche select dropdown when the client has more than one creche.
  - The day's existing slots, each with a status chip, the assigned worker,
    and a Reopen action for assigned slots.
  - Four preset time ranges as one-click chips (08:00-16:00, 09:00-17:00,
    10:00-18:00, 13:00-21:00) plus a custom start/finish pair.
  - "Add slot" stages the current range. Staged ranges are listed with a
    per-row remove button. Nothing is written until Save.
  - A range already present that day cannot be staged twice, and the Add slot
    button is disabled while the range is invalid.
  - Save/Cancel in the footer with the pending count. A failed save keeps the
    popup open with staged slots intact rather than discarding them.
  - This is the ONLY place in the Clients section where Save/Cancel appears,
    because it is the only surface that stages changes.

### 4.5 Admin — Workers page
- Full worker list as **cards**, three per row, with basic info at a glance
  (name, ID, status chip, phone, email, document count, assignment count,
  availability day count) via `WorkerCard`.
- Search box filters workers by name or worker ID, case-insensitively.
- Click a worker → navigates to `/admin/workers/:workerId`, a full **page**
  (not a popup — this supersedes the earlier popup description, in line with
  the client profile page).
  - **Identity card** — name, worker ID, status chip, phone, email.
  - **Documents card** — the shared document list described in Section 4.7:
    a grid of small cards, one per document, each with a readable type label,
    status chip, expiry date and a time-remaining bar (green valid, yellow
    expiring within 14 days, red expired). Derived at render time; no
    percentage is stored.
    Note: a truly proportional bar needs the real document validity period,
    which is still an open question (see Section 10). Until then the bar shows
    proximity to expiry, not a true fraction of the validity window.
  - **3-month calendar** in worker mode, with a legend for the colours.
    Clicking a day opens `WorkerDayPopup`.
  - `WorkerDayPopup` shows the day's assignment (creche, client, time, status,
    source), the open slots that day, and the **Release this day** action.
  - Document status is changed in `DocumentStatusPopup`, a small popup with a
    status dropdown and Save/Cancel. It is the ONLY staged-editing surface on
    the worker profile page; the page itself carries no Save/Cancel.

### 4.5.1 Admin — releasing a worker from an assigned day
- On an assigned day the admin can **Release** the worker. This is an override
  that stands above the automatic rules.
- Effect:
  1. The slot reopens and the assignment is cleared.
  2. The worker is marked **available** for that date.
  3. An **exclusion** is recorded for that slot, so auto-matching does not
     put the worker straight back on it.
  4. **Auto-matching is NOT re-run.** The admin's decision is final.
- The worker is **not banned**. They stay eligible for every other slot, every
  other day, and every other creche, and auto-matching continues normally for
  everything else.
- The exclusion binds automatic matching and worker self-booking. If the
  worker tried to self-book that slot, it is refused, because that would undo
  the admin's decision in one click. An explicit admin assignment is always
  allowed and clears the exclusion for that pair.
- Because the release is a single decisive action, it commits immediately
  behind a confirmation dialog. There is no Save/Cancel for it.

### 4.5.2 Admin — Reports page
Two halves, because they answer different questions.

**The audit feed** — what changed, when, and what triggered it. Filterable by
date range, event type, worker and free text; grouped by day, 20 per page,
newest first. This is the record to check afterwards when something looks
wrong.

**Operational figures** — slots in range, fill rate, open demand, admin
decisions; how slots were filled (auto-matched / self-booked / manager
assigned); demand by client; and per-worker assignments, available days and
times released from.

**The figures are illustrative.** They exist to show Sorgaflex the shape of a
report during the demo. The definitions are ours, have not been agreed with
Sorgaflex, and are expected to change after that meeting. The page says so on
screen. Definitions in use:

- **fill rate** = `assigned / (assigned + open)`, cancelled excluded, counted
  over slots whose DATE falls in the range (not when they were created)
- **open demand** = slots still waiting for someone
- **admin decisions** = a release, a reopen, or a manager assignment, read
  from the audit trail rather than inferred from state

Read-only: no Save/Cancel.

### 4.5.3 The audit trail is complete by construction
Every mutation is logged from **inside the store**, not by its caller, so the
trail is complete no matter which screen triggered the change. Event types:

- `slot_created`, `worker_assigned`, `availability_changed`,
  `document_status_changed`, `slot_cancelled`, `slot_reopened`,
  `worker_released`

`worker_assigned` records the source (`Auto-matched`, `Self-booked`,
`Manager assigned`) so a human decision is distinguishable from an automatic
one. Auto-matched assignments are logged inside `autoMatchForDate` rather
than `createSlot`, so one slot produces exactly one `slot_created` and one
`worker_assigned`. A no-op document status change is not logged.

### 4.6 Worker — My schedule page
- 3-month calendar in worker mode, using the same schedule card as the admin
  worker profile (title, range, month buttons on the card, legend, calendar).
- Quick stats above: assignments, availability days, documents, invoices sent.
- **Clicking a day cycles availability**: no answer → available → unavailable
  → no answer. These are **staged** with a dashed outline, and committed by a
  **page-level Save/Cancel bar**. This is the one legitimate page-level bar:
  a worker answers for a stretch of days at once, so there is genuinely
  something to apply or cancel.
  - The staged value is the worker's **intended answer**, including "no
    answer". Storing the intent rather than deleting the entry matters: a
    deletion falls back to whatever was already saved, so a day previously
    marked available would snap back to green instead of clearing.
  - On Save, "no answer" deletes the `worker_availability` row, and the other
    two answers write it. "Neutral" is never a stored value.
- A day with **open slots**, or a day already **assigned**, opens a popup
  instead of cycling, because the action is about the slot rather than
  availability:
  - open slots → list them with a **Book** action
  - assigned → show the booking with a **Cancel booking** action
  - **The popup also carries a "Your availability" control** with all three
    answers, so a day with open slots is still answerable. It shares the
    calendar's staged state and is committed by the same Save. When the
    worker already holds a slot that day it is replaced by a note, because
    the assignment decides the day either way and answering would mislead.
  - The popup states **why any other open slot that day stayed open**: one
    worker can hold one slot per day (Section 7, rule 1), so the remaining
    slots are filled by whoever else is available. Auto-matching is working
    here, not failing.
- **Cancelling a booking** reopens the slot and records that the worker
  declined it, so auto-matching cannot hand it straight back. They are NOT
  marked available: cancelling a shift is a statement about that slot, not a
  claim they are free that day. Auto-matching is not re-run; the admin is
  notified through the activity log.

### 4.6.1 Worker — Invoices page
A worker sends the days they actually worked each month, for payment.
- **Only past months** can be invoiced. The current month is excluded because
  it is not finished, and future months obviously cannot be worked.
- A month's claim is **pre-filled from the slots the worker was assigned**, so
  nothing is retyped. The worker unticks the days they did not work.
- A warning appears when assigned days are left unclaimed, so a day is not
  forgotten by accident.
- **Un-ticking a day adjusts the invoice only. It does NOT reopen the slot.**
  Invoices only cover past months, so reopening a past slot accomplishes
  nothing — nobody can take a date that has already gone — and past
  assignments stay immutable records.
- A month that has been sent becomes **preview only**: the calendar and the
  comment are locked. A **pending** invoice can be **withdrawn**, which
  returns the month to editable. Accepted and paid invoices cannot be touched
  by the worker.
- A refused invoice shows the admin's note and can be corrected and resent.
- **No money amounts.** No rate exists anywhere in this project, so an invoice
  counts **days**. A Settings page will define rates in a later phase. The
  page says so on screen.

### 4.6.2 Admin — reviewing an invoice
- The admin's **worker profile carries its own Invoices card**, below the
  schedule and documents, listing every invoice the worker sent with its
  month, claimed day count, status and submission date.
- Clicking one opens a popup with a **1-month calendar** of the claimed days,
  the worker's comment, a note field for the worker, and **Refuse**,
  **Accept** and **Mark as paid**.
- Only the transitions the data layer allows are offered, so the admin is
  never shown an action that will be rejected:
  - a pending or refused invoice can be accepted or refused
  - **only an accepted invoice can be marked paid**
  - **refusing returns the month to editable** so the worker can correct and
    resend — a refusal must not lock the month permanently
  - a worker may withdraw only while the invoice is `pending`; once accepted
    or paid it is a financial record and only the admin changes it
- Every transition is written to `activity_log`, so the Reports page covers
  invoices with no extra work.

### 4.7 Document list — shared by both sides
Documents are shown the **same way everywhere**: a grid of small cards, one
per document, each with a readable type label, a status chip, the expiry date
with days remaining, and a progress bar (green valid, yellow within 14 days,
red expired). The bar is derived at read time; no percentage is stored.

`DocumentList` is the **single implementation** used by both the admin's
worker profile (4.8) and the worker's own profile. Each side passes its own
title and its own click handler; the markup and styling are shared, so a
change lands on both at once and the two can never drift apart.

**Each document is its own card**, containing:

- an **icon tile**, one inline-SVG glyph per document type (ID, background
  check, First Aid / CPR, childcare qualification, liability insurance), so a
  row scans by shape as well as by label;
- the **type name**, clamped to two lines so every card is the same height;
- a **status pill**;
- an **Expires / date** row on a hairline divider;
- the **urgency line** ("12 days left", "Expired 4 days ago");
- the **validity bar**, pinned to the card's bottom with `margin-top: auto`
  so the bars line up across a row even when a title wraps.

**Two independent colour dimensions**, deliberately not conflated:

| Dimension | Drives | Values |
|---|---|---|
| Review status | icon tile and status pill | approved / pending / rejected |
| Time remaining | urgency line and bar | valid / expiring / expired |

A document can be **approved and expired** at the same time, so it must be
able to show both. The card sets `--doc-tint` / `--doc-ink` from its status
modifier and `--exp-ink` from its expiry modifier; the three consumers read
those variables, so they cannot disagree. The expiry inks are tokens
(`--exp-valid`, `--exp-expiring`, `--exp-expired`) because the worker upload
popup shows the same states and must match.

The cards are real `<button>` elements, so focus, Enter/Space activation and
the accessible name come from the element rather than being hand-maintained.

The grid is `repeat(auto-fill, minmax(200px, 1fr))`, which measures as
1 / 2 / 5 columns at 390 / 820 / 1500 with no horizontal overflow. The
200px track minimum is the design parameter; the column counts follow from
it, so re-measure after changing it.

### 4.7.1 Worker — Profile page
- Identity card: name, worker ID, phone, email, status chip.
- The shared document list, titled "My documents".
- Clicking a card opens a **preview popup** with **Download** and **Upload**.
  - **Download is not connected** in this demo and says so.
  - **Upload is MOCKED**: there is no storage backend, so it records the
    filename and a timestamp in memory and resets the document to `pending`
    for review. It is lost on refresh. An uploaded file is logged.

### 4.8 Admin — Worker profile page
- Identity card, then the **schedule card** (3-month worker-mode calendar
  with its own month buttons), then the **documents card**, then the
  **invoices card** (Section 4.6.2). The schedule comes first because it is
  what the admin opens the page for.
- The month navigation lives in the schedule card's header, next to the
  calendar it moves, rather than in the page header.
- The same document list as 4.7, so the admin sees what the worker sees.
- Document status is changed from `DocumentStatusPopup`, the only staged
  surface on the page.

---

## 5. Interaction rule that applies to ALL pages

Changes are **staged, not instant**. Every editable page needs explicit
**Save** and **Cancel** buttons:
- Clicking a day, toggling availability, editing a slot, etc. updates the
  UI **locally first** — nothing is sent to the backend until Save is
  pressed.
- **Cancel** discards all pending local changes and reverts the view.
- Implement via local component state (or the shared
  the page) holding a "pending changes" object, flushed
  to the API only on Save.
- The `SaveCancelBar` component (`js/components/SaveCancelBar.js`)
  renders the Save/Cancel buttons as a fixed bar at the bottom of the
  screen, appearing only when there are pending changes.

### Where Save/Cancel actually appears

Save and Cancel belong **only on a surface that is genuinely editing
something**. A read-only page must not carry them, and a page with several
independent staged edits may carry them. Concretely, in the ADMIN section:

| Surface | Save/Cancel? | Why |
|---|---|---|
| `DaySlotsPopup` (client creche day) | **Yes** | The only place slots are staged |
| `DocumentStatusPopup` (worker document) | **Yes** | The only place a status is staged |
| Home, Clients, client profile, Workers, admin worker profile | No | Read-only apart from single decisive actions |
| `WorkerDayPopup` release | No | One immediate, confirmed action, not a batch |
| **Worker My schedule** | **Yes** | The one page-level bar: a worker answers availability across many days, so there is genuinely a batch to apply or cancel. Staged days are outlined. |

Single decisive admin actions — reopening a slot, releasing a worker from a
day — commit immediately behind a confirmation instead of being staged,
because a one-item "batch" is friction on an action the admin intends to take
now.

The `SaveCancelBar` component exists and is used inside those popups, but no
page-level bar is mounted anywhere: a bar that can never appear is worse than
no bar at all.

---

## 6. Data model

```
clients
  client_id (PK)
  name
  address   -- the client's own registered address, not a creche location
  email
  phone

creches
  creche_id (PK)
  client_id (FK -> clients)
  name
  address
  city

workers
  worker_id (PK, simple readable format e.g. W001 — not UUID)
  name
  phone
  email
  status: 'active' | 'blocked'

worker_availability   -- the "worker agenda"
  worker_id (FK)
  date (date only — NO time_from/time_to)
  is_available: boolean
  updated_at: timestamp
  PRIMARY KEY (worker_id, date)
  -- SHARED single table across ALL workers, not one per worker.
  -- OVERWRITE model: a new answer for a date replaces the old one row,
  --   no history log kept.
  -- "Neutral" state = row absent entirely (see Section 4.6).
  -- Records availability only. NEVER store "assigned" here — that status is
  --   always DERIVED by checking `slots` (below), to avoid the two tables
  --   ever drifting out of sync.
  -- Written by: the worker answering for a date, AND the admin when
  --   releasing them from an assigned day (Section 4.5.1). The admin writing
  --   this row is permitted; what is forbidden is putting assignment state
  --   in it.

slots   -- the "slots agenda" (demand + assignment)
  slot_id (PK, e.g. S001)
  creche_id (FK)
  date
  time_from   -- "HH:mm". Admin-defined: the four presets are conveniences,
               --   not an enum. Any range is allowed.
  time_to     -- "HH:mm"
  -- CONSTRAINT: time_to must be after time_from. A range may not cross
  --   midnight, because a slot carries a single date and a shift spanning
  --   midnight would belong to two days. Enforced in the data layer.
  -- CONSTRAINT: (creche_id, date, time_from, time_to) is unique among
  --   non-cancelled slots — the same range cannot be scheduled twice on a day.
  status: 'open' | 'assigned' | 'cancelled'
  assigned_worker_id (FK, nullable)
  assigned_at (timestamp, nullable)
  assigned_source: 'self_booked_web' | 'auto_matched' | 'manager_assigned'

activity_log   -- powers the Admin Report page
  id (PK)
  timestamp
  event_type: 'slot_created' | 'worker_assigned' | 'availability_changed'
            | 'document_status_changed' | 'slot_cancelled'
            | 'slot_reopened' | 'worker_released'
            | 'invoice_submitted' | 'invoice_withdrawn' | 'invoice_accepted'
            | 'invoice_refused' | 'invoice_paid'
  details (text)
  -- Written by the store on EVERY mutation, not by the calling screen, so
  --   the trail is complete regardless of which surface triggered the change.
  -- `worker_assigned` details begin with the source ("Auto-matched",
  --   "Self-booked", "Manager assigned") so a human decision is
  --   distinguishable from an automatic one.
  -- The worker filter matches on the worker ID appearing in the details.

documents   -- per worker
  document_id (PK)
  worker_id (FK)
  type (placeholder types for now — real list TBD by Sorgaflex):
        ID, background check, first aid / CPR cert,
        childcare qualification, liability insurance
  status: 'pending' | 'approved' | 'rejected'
  expiry_date

invoices   -- monthly day claims a worker sends for payment (Section 4.6.1)
  invoice_id (PK, e.g. INV001)
  worker_id (FK)
  month: 'YYYY-MM'   -- a month in the past only
  status: 'pending' | 'accepted' | 'refused' | 'paid'
  days: ['YYYY-MM-DD', ...]   -- what the worker CLAIMS they worked
  worker_comment: text
  submitted_at: timestamp
  decided_at (timestamp, nullable)
  decision_comment (text, nullable)
  -- A STORED SNAPSHOT, not a live query. The worker may remove a day the
  --   system recorded as assigned, and that divergence between "assigned"
  --   and "claimed" is exactly what the invoice exists to express.
  -- UNIQUE (worker_id, month), with one exception: a REFUSED invoice is
  --   replaced when the worker corrects and resends it. Anything else
  --   (pending, accepted, paid) still blocks a second claim.
  -- Only a month fully in the past can be sent. The current month is
  --   excluded because it is not finished.
  -- Only days the worker was actually assigned may be claimed.
  -- Withdrawal is allowed only while `pending`. Once accepted or paid it is
  --   a financial record and only the admin changes it.
  -- Only an ACCEPTED invoice can be marked paid.
  -- No money amounts: there is no rate anywhere in the model yet, so an
  --   invoice counts DAYS. Rates come with a future Settings page.

exclusions   -- admin release decisions and worker declines (Section 4.5.1)
  slot_id (FK -> slots)
  worker_id (FK -> workers)
  date
  released_by: 'admin' | 'worker'
  created_at (timestamp)
  -- UNIQUE (slot_id, worker_id): a worker released twice from one slot is
  --   recorded once. Several workers can be excluded from the same slot.
  -- 'admin' = the admin released them. 'worker' = the worker cancelled a
  --   booking they had taken, so they must not be matched back onto it.
  --   Either way the worker is NOT banned: eligible everywhere else.
  -- The worker is NOT banned; this only blocks auto-matching and
  --   self-booking for THIS slot. They stay eligible everywhere else.
  -- An explicit admin assignment to the slot clears the pair's exclusion.
  -- Rows are dropped when the slot is cancelled, so a slot id is never
  --   reused with stale decisions attached.
  -- Deliberately NOT stored in `worker_availability`: this is an
  --   assignment-derived decision, and duplicating it there is exactly the
  --   drift the availability table exists to avoid.
```

### Computed / derived values (do not store redundantly)
- A worker's status on a given date, as shown in any combined view, is one
  of: **assigned** (has an assigned slot that date — check `slots` first,
  this takes priority), **available** (worker_availability.is_available =
  true, no assignment), **unavailable** (is_available = false, no
  assignment), or **unknown/neutral** (no availability row at all). This
  is computed at query time by joining `worker_availability` and `slots`
  — never stored as one combined field.

---

## 7. Business rules (enforce server-side, never only in the UI)

1. **One assignment per worker per day.** A worker already assigned to a
   slot on a date cannot take or be matched to another slot that same
   date. Enforced in `api.slots.selfBook` (checks for existing assignment)
   and in `api.slots.autoMatchForDate` (only assigns to workers with no
   existing assignment that date).
2. **Blocked workers cannot book.** `status = 'blocked'` (missing or
   expired required document) → reject self-booking and exclude from
   auto-matching, regardless of what the UI shows. Enforced in
   `api.slots.selfBook` (rejects if worker.status === 'blocked') and
   `api.slots.autoMatchForDate` (only considers active workers).
3. **Auto-matching**: triggered whenever (a) a slot is created for a date,
   or (b) a worker marks `is_available = true` for a date. Find open slots
   for that date and eligible workers (active, available that date, no
   existing assignment that date, and not excluded from that specific slot
   by an admin release); assign in order of earliest
   `worker_availability.updated_at` (first responder gets priority);
   assign one worker per slot until slots or candidates run out. A slot
   that cannot be filled is skipped, not treated as the end of the run.
4. **Admin can reopen** an assigned slot (e.g. to simulate a decline),
   which clears the assignment and re-runs auto-matching for that date.
5. **Admin release override** (Section 4.5.1): the admin can remove a worker
   from an assigned day. The slot reopens, the worker is marked available,
   a per-slot `exclusions` row records that they must not be auto-matched
   back onto that slot, and auto-matching is **not** re-run. The worker is
   not banned — they remain eligible for all other slots and days, and the
   exclusion is cleared by an explicit admin assignment. Self-booking that
   slot is refused while the exclusion stands.
6. **A slot's time range must be valid**: `time_to` after `time_from`, and
   no range crossing midnight, since a slot carries a single date. The same
   range cannot be scheduled twice on one creche and day.
7. **Document status** may only be one of the known values; an unknown
   value is rejected in the data layer, not just filtered out of the UI.
8. **Invoices** (Section 4.6.1): only a month fully in the past can be
   sent; only days the worker was actually assigned may be claimed; one
   invoice per worker per month, except that a refused invoice is replaced
   on resubmission; a worker may withdraw only while `pending`; only an
   accepted invoice can be marked paid; refusing returns the month to
   editable. Un-claiming a day adjusts the invoice only and never reopens a
   past slot.
9. **A worker cancelling their own booking** reopens the slot and records
   them as declined for that specific slot, so auto-matching cannot hand it
   straight back. They are not marked available, and auto-matching is not
   re-run. The admin is notified through the activity log.
10. Self-booking and auto-matching are **final** — the manager does not
   need to approve every booking, only monitors/overrides via the
   dashboard.

---

## 8. Visual design system

**Style direction:** light, warm, minimal, rounded, uncluttered —
appropriate for a childcare-adjacent product. Popups are used for detail
views and actions, with structured fields, status chips/tags, and one clear
primary action button.

Detail views that a user navigates to deliberately (client profile, worker
profile) are **pages**; popups are for acting on something already in view.

### Design tokens

These are the real values, not placeholders. They live in
`styles/tokens.css` as CSS custom properties and are the single source of
truth for both markup and components.

```json
{
  "theme": "light",
  "colors": {
    "background": "#F7F2EC",
    "surface": "#FFFFFF",
    "text_primary": "#1C1E21",
    "text_muted": "#6B7280",
    "border": "#E8E2D9",
    "accent": "#D9A441",
    "status": {
      "available": "#2FA36B",
      "assigned": "#2F6FED",
      "unavailable": "#D1453B",
      "neutral": "#E5E2DC"
    }
  },
  "radius": {
    "card": "16px",
    "day_cell": "10px",
    "button": "8px",
    "popup": "20px"
  },
  "spacing": {
    "unit": "8px",
    "card_padding": "20px",
    "grid_gap": "6px"
  },
  "typography": {
    "font_family": "system-ui, -apple-system, 'Segoe UI', sans-serif",
    "headline": { "size": "32px", "weight": "800" },
    "day_number": { "size": "14px", "weight": "700" },
    "day_label": { "size": "11px", "weight": "500" },
    "body": { "size": "14px", "weight": "400" }
  },
  "shadow": {
    "card": "0 4px 20px rgba(0,0,0,0.06)",
    "popup": "0 12px 40px rgba(0,0,0,0.15)"
  }
}
```

Status colors (`available` = green, `assigned` = blue, `unavailable` =
red, `neutral` = light gray) are the core semantic colors used throughout
every calendar and slot view — keep them consistent across Admin and
Worker pages.

### Popup components
- All popups use the `Popup` component (`js/components/Popup.js`) which:
  - Renders as a centered modal overlay with backdrop blur.
  - Captures Escape key to close.
  - Prevents body scroll (`document.body.style.overflow = 'hidden'` when open).
  - Uses `role="dialog"` and `aria-modal="true"` for accessibility.
  - Supports a `className` for size customization and a `title` prop for
    the header.
- Popups with long content use a flex-column layout with fixed header and
  footer, content area scrolls (no full-page scroll). Max height is
  `90vh` to ensure they fit on screen.

### Calendar component
- `Calendar` (`js/components/Calendar.js`) supports:
  - `monthsToShow` prop (1 or 3) to control how many months render.
  - `showOnlyCurrentMonth` prop to hide padding days from adjacent months
    (renders as transparent spacers instead).
  - `onDayClick` and `onDayDoubleClick` callbacks.
  - `onDayHover` for hover interactions.
  - `mode` prop (`'admin'` or `'worker'`) to control rendering and behavior.
  - `selectedDate` and `hoveredDate` for controlled selection state.
  - A single hover card (not per-day tooltips) that positions itself above
    the hovered day cell using `getBoundingClientRect()`.
  - Hover effects: days scale up slightly (`scale-105`) and get a higher
    z-index on hover.

### Save/Cancel pattern
- `SaveCancelBar` (`js/components/SaveCancelBar.js`) renders Save and
  Cancel buttons as a fixed bar at the bottom of the screen.
  - Only renders when `hasChanges` is true.
  - Save button shows loading state when `saving` is true.
  - Save label can be customized (e.g., "Save 3 changes", "Save changes").

---

## 9. Deferred / future scope — DO NOT BUILD YET

These are real decisions already made for later phases. Don't build them
now, but don't contradict them either when designing today's data model
(e.g. keep worker contact fields, keep an activity log, keep status
fields — they'll be needed):

- **WhatsApp integration**: official WhatsApp Business API, 1:1 broadcasts
  to individual workers (no WhatsApp group — group automation was
  considered and rejected due to account-ban risk with unofficial
  libraries).
- **Automation direction**: the **web app decides** when a WhatsApp/email
  message should be sent and issues the command; the automation layer
  (n8n, to be discussed later) only executes sending on the app's command
  — the app is always in control, not the automation layer.
- **Document expiry notifications**: one reminder at 14 days before
  expiry, sent to both the worker and Sorgaflex; on actual expiry, a
  "stop activity" notice to both, and the worker is set to `blocked`.
- **Document approval workflow**: an automated step will pre-check/extract
  document data (OCR/LLM), but **final approval is always a manual admin
  action** — never auto-approved.
- **WhatsApp reply parsing**: free-text worker replies will be parsed by
  an LLM into structured availability; ambiguous replies get one
  clarifying question, then a fallback telling the worker to contact
  the admin or use the web app.
- **Report definitions**: the Reports page figures are illustrative examples
  for the Sorgaflex demo, not agreed metrics. Fill rate, open demand, admin
  decisions and the breakdowns all need real definitions — what counts as
  demand, what counts as filled, whether releases are a quality signal or a
  capacity one — before any of it means anything. The page carries a visible
  notice saying so.
- **Worker confirmation flow (post-Sorgaflex meeting)**: the auto-matching
  built today is the **basic** version and is expected to be replaced. The
  intended flow: a worker is asked to confirm an assignment over WhatsApp,
  an n8n automation carries the request and the reply, and Sorgaflex and
  the client are notified where necessary. This introduces a new state —
  *confirmed*, distinct from *assigned* — and a new transition. Nothing of
  it is built now. The hook points are slot creation and auto-matching: the
  automatic step becomes "request confirmation" rather than "assign
  outright". The admin release override (Section 4.5.1) is specified so it
  stays meaningful either way, since it removes an assignment whether or not
  it was ever confirmed.

---

## 10. Open questions (not yet decided — flag before assuming)

- Exact worker authentication method (phone/PIN/etc.) for the Login page.
- Final required document list and their real validity periods (currently
  placeholder: ID, background check, first aid cert, qualification,
  insurance).
- Whether/how creches will eventually get their own login (currently: no).

---

## 11. Component library

The app was rebuilt from scratch as **vanilla HTML + CSS + JavaScript (ES
modules)** with no framework and no build step. The earlier React/TypeScript
structure described in earlier revisions of this file no longer exists; the
list below is what is actually in the repository.

### Core (`js/core/`)
- **router.js** — hash routing with path parameters (`/clients/:clientId`).
- **state.js** — small pub/sub store plus a `StateActions` facade (pending
  changes, sidebar, toasts). UI state only; domain data lives in the store.
- **api.js** — the seam between the UI and the data layer. Derived **reads
  are synchronous** because calendars resolve each cell inline; **mutations
  are async** because they become network calls once a backend exists. This
  is the single file to replace when the real API arrives.
- **utils.js** — date helpers and the `createElement` factory. Deliberately
  small: everything exported is used. Components build markup through
  `createElement` rather than innerHTML.

### Data layer (`js/data/`)
- **mockData.js** — in-memory seed data for all entities.
- **store.js** — indexed lookups, derived values computed at query time, and
  **every business rule**. Assignment status, day aggregates and worker day
  status are derived, never stored. `invalidateIndexes()` runs after any
  mutation. Contains the release override and the exclusion handling.

### Shared components (`js/components/`)
- **Sidebar** — collapsible, role-based nav. Becomes an off-canvas drawer
  under 768px with a scrim.
- **Calendar** — admin/worker modes, 1 or 3 months, hover cards, a staged-day
  marker, caller-supplied day classes, and an option to suppress hover cards.
- **Popup** — modal with Escape-to-close, backdrop blur, body scroll lock,
  and focus trapping. Stacks correctly for a confirmation on top of a popup.
- **Button** — primary/secondary/danger/ghost with loading state.
- **Card** (`createStatCard`) — a single labelled figure. There is no generic
  card factory: every card in the app has its own stylesheet, so a shared one
  would be an abstraction nothing shares.
- **StatusChip** — status badge for all statuses.
- **DayDetailPopup** — the admin Home page's per-day slot list, with a Reopen
  action on assigned slots. Read-only apart from that, so it carries no
  Save/Cancel.
- **SaveCancelBar** — the Save/Cancel control used inside the staged popups.
  Always mounted inside the surface that stages changes, never at page level
  except on the worker's My schedule (Section 5).
- **Toast** — transient feedback; wired to `StateActions.addToast`.
- **CrecheCard** — creche header, month stats, inline 1-month calendar.
- **DaySlotsPopup** — slots for one creche on one day; the only staged
  surface in the Clients section.
- **WorkerCard** — worker identity, contact, and counts.
- **DocumentList** — a grid of small document cards with expiry bars.
  Shared by the admin's worker profile and the worker's own profile, so
  both render documents identically (Section 4.7).
- **DocumentStatusPopup** — staged document status change.
- **WorkerDayPopup** — the admin's view of a worker's day, with the release
  action and its confirmation dialog.
- **WorkerSlotDayPopup** — the worker's own day: book an open slot, or cancel
  a booking they took.
- **InvoiceCard** — the admin's invoices card on a worker profile.
- **InvoiceReviewPopup** — admin decides on one invoice: refuse, accept, or
  mark paid, with a 1-month calendar of the claimed days.

### Pages (`js/pages/`)
**Admin:** `HomePage`, `ClientsPage`, `ClientProfilePage`, `WorkersPage`,
`WorkerProfilePage` (with the invoices card) and `ReportsPage`.

**Worker:** `WorkerHomePage`, `MyProfilePage`, `WorkerInvoicesPage`.

**Shared:** `LoginPage`.

### Housekeeping rules
- Beware `align-items: flex-start` on a flex column: it also shrinks
  children to their content, so a full-width child such as a progress bar
  collapses to zero without error. Set an explicit width.
- No utility-class framework. Every component has its own stylesheet; a class
  is only added if something renders it, and removed when nothing does.
- No unused exports. `js/core/utils.js` in particular is trimmed to what is
  called; dead helpers are deleted rather than kept "just in case".
- One definition per CSS selector across all stylesheets. Duplicates are a
  bug: they drift apart and hide which file actually owns the rule.
- `Card.js` is the counter-example that proves the point: the generic
  `createCard` was removed once every card turned out to have its own layout.

### Tests
- `verify-rules.mjs` — business rule checks against the data layer, run with
  `node verify-rules.mjs`. Deterministic by construction: every check uses a
  date with no slots, no prior availability, and no reuse by another check, so
  the randomised mock data cannot consume the worker under test.
- **Mock data is randomised on every load, so a check can pass or fail on
  nothing but the seed.** A green run means nothing unless it is stable:
  run the suite several times before trusting it. Two habits that have caught
  real flakes here:
  - Do not assert on a fixed date, worker or status. Read the current value
    and choose something that actually differs, or search across workers for
    a suitable one.
  - A check that cannot run in a given seed must **skip and say so**, not
    throw. One throwing helper aborts the remaining 176 checks and looks like
    a catastrophic failure rather than a seed artefact.
  - Shared mutable state is the usual cause: blocks that each create an
    invoice must pick a month no earlier block has already used.

---

## 12. Build & run

- Frontend: **vanilla HTML + CSS + JavaScript (ES modules)**. No framework,
  no bundler, no `package.json`. (The earlier React/Vite/Tailwind stack is
  gone — this section supersedes it.)
- Styles: plain CSS. Design tokens live in `styles/tokens.css` as CSS custom
  properties; `styles/base.css` holds the reset and utilities; component and
  page stylesheets are linked from `index.html`.
- Data: in-memory mock in `js/data/`. A real backend (the production plan
  calls for Express + SQLite) will replace `js/core/api.js` only — the
  components do not change.
- **Dev server: any static file server.** ES modules require HTTP; opening
  `index.html` over `file://` fails on CORS. Either:
  - `python3 -m http.server 3000`, then open `http://localhost:3000`
  - `npx http-server -p 3000 -c-1 .`
- Tests: `node verify-rules.mjs`. There is no lint or build step.