---
name: project-hub
description: Builds and updates the Project Hub for the project Forge is working on, generated from the project and its type (web, mechatronics, game). Always has context, work plan with hours, business plan, documents and quality, the agent page with analytics, and open points with Q&A. Adds type pages (frontend, backend, database, design; firmware, hardware, app; UI, code, structure, assets) and system drawings with zones. Same layout and house style in every project, plus an A4 hours report (PDF). Use at project start, after substantial work, for an hours PDF, or for /forge:hub.
metadata:
  source: original (Agent_REF)
  date_added: '2026-10-13'
---

# Project Hub

Goal: one visual place where the user (and the client) sees the project: context, who builds what, plans, money, the agent, and what is still undecided. Generate it from `docs/PROJECT_CONTEXT.md` and relevant linked files under `docs/source-of-truth/` and `docs/plans/`. The hub is a view, not the authority; never invent facts.

Three files in `docs/hub/`:
- `index.html`: the static page. Copy it, never edit or re-read it.
- `report.html`: the static A4 hours report. Copy it, never edit it.
- `hub-data.js`: all project content in one `HUB` object. This is the only file Forge edits (it is small).

**Same hub, tabs by category.** Look and common tabs are the same in every project; the middle tabs follow the project category (mechatronics, web, game) by the rules in `references/house-style.md`, never invented per project. Follow `references/house-style.md` for how to fill and write the content (dashboard, stages, plain English, hours only, the report).

Pages are generated from the project and its type (`HUB.profile`, details in `references/profiles.md`).
- **Always:** Dashboard (first page: progress, hours, task map, hours per phase, project timeline, next up, risks, open decisions, quick access, then the full project details), Plan (summary, timeline, workload, risks, decisions), Work plan (every task, list or board; added automatically after Plan when there are tasks), Business, Docs and quality, Agent (roles, capabilities, skills used, analytics), Gaps (open points with options and typed answers).
- The page is a dark and light dashboard (pill tabs, rounded cards, status colors: done lime, in progress orange, blocked red, not started white or black). The toggle remembers the choice.
- **web:** Frontend, Backend, Database, Design (palette, techs, assets, references, libraries). **mechatronics:** Firmware, Hardware (system drawing, block schematic, parts list, power, pins), and App (web app, mobile app or HMI) when present. **game:** UI, Code (for example Unity), Structure, Assets (by type, libraries, licenses).
- Each type page can hold details, a project structure tree, diagrams and its tasks. The page draws every tab when first opened, so it loads light.

## Analyze the project first
The content and the category tabs come from this project; the look does not change.
1. List what exists with `git ls-files` or `ls`; read only manifests, the context index and relevant linked source-of-truth and plan files. Hardware: `hardware/`, `cad/`, `*.kicad_sch`, `*.step`, `*.stl`. Firmware: `platformio.ini`, `*.ino`, `firmware/`. Backend: `server/`, `api/`, `requirements.txt`, `package.json`. Frontend: `index.html`, `src/`. Do not read source files for this.
2. Decide the type and set `profile.type` (`web`, `mechatronics`, `game`; ask if unclear) and `profile.apps`. Fill `sections` for each type page: summary, stack, owner, status, a `tree` of 20 to 60 lines (folders and key files, not-built files noted `planned`), and `items`. Diagrams: see "Legacy shape and diagrams" in `references/profiles.md`.
3. Draw only what the files, the context file or the user show. Parts not built yet get `status: "planned"` (dashed box). A diagram is `proposed` until the user confirms it, then `decided`, then `built`. If the architecture is open, raise a gap with 2 to 4 options (area `architecture`) instead of guessing.
4. Never invent part numbers, pins, voltages, currents, prices, endpoints or fields. Leave them out and say so. The hardware diagram is block-level: put the real schematic file in `docs` and name it in the diagram `note`.
5. Diagram format (details in `references/hub-data.example.js` and the drawing style in `references/profiles.md`): `nodes` `{id,label,sub,group,status,in,out}` (`in` and `out` are pins drawn on the left and right), `edges` `{from,to,label,kind}` with `kind` one of `data`, `power`, `signal`, `control` and pins named as `"block.pin"`, optional `columns` for lanes. Keep a diagram under 12 nodes and labels short; split instead of cramming. For a full **system drawing** add `zones` (enclosure or location outlines), your own wire `kinds` (label, color, dash), block `lines` and `tag` (tested, missing, tone ok, warn or bad), and edge `start` and `end` labels (baud rate, pin names). The page lays it out, routes long wires above the diagram and adds a text version.

## Create (first time)
1. Make sure the context file exists (`doc-writer`, project context file). Read it once.
2. `mkdir -p docs/hub`, then copy `templates/index.html`, `templates/report.html` and `templates/hub-data.js` from this skill folder into it (shell `cp`; do not open them).
3. Fill `hub-data.js` from the context index and relevant linked project records, in the house style (`references/house-style.md`). If unsure of a field's shape, read `references/hub-data.example.js` once (fictional example, copy shapes not facts).
   - Agent page: set `agent.usedSkills` from this session's skill-use reports (name and reason), `agent.roles` if the project needs roles other than the defaults (planner, builder, verifier, documenter), and append one line to `agent.log` per piece of work (`date`, `task`, `skills`, `tokens` only when the environment shows them). The analytics (coverage, sessions, most used skills) are computed from these. The catalog and Forge version are built into `index.html`.
   - Tracks: only the ones the project needs; each task joins a track through its `track` field and the card appears in the matching tab.
   - `hardware`, `software` and `diagrams` as decided in the analysis; power loads and capacities only from datasheets or the user.
4. Business plan: use only what the user stated or the files show. Leave unknown fields empty; the page shows "to define". Never invent prices, costs, market sizes or KPIs.
5. Gaps: the page automatically lists missing basics as "missing info" gaps. Add explicit gaps to `gaps` for real decisions, each with 2 to 4 options (`label`, short `note`, mark at most one `recommended`) and a `why`. Priorities: `blocker` (stops work), `important`, `nice`. Do not write option notes you cannot justify.
6. Open `index.html` in a headless browser or the browser pane and fix console errors. Say what you could not check.

## Dashboard and project details
- The first tab mirrors the context index and the linked source-of-truth files, so the client sees the same facts. Put them in `context.details`, in the document's order: `[{ title, text, flow, stats, meter, split, tiles, items, ordered, chips, table, timeline, note, wide, fold, count }]`. Prefer visual forms over paragraphs: `flow` (steps with arrows: `[{ t, s }]`), `tiles` (`[{ n, t, d, tag }]`, `tag` marks later additions), `stats` (`[{ n, l }]`), `meter` (`{ max, zones: [{ from, to, tone ok|warn, label }], marks: [{ at, label, lvl }] }`), `split` (`[{ title, items }]`), `table` (`{ head, rows, badgeCol }`), `timeline` (`[{ date, t }]`). `fold: true` collapses long tables such as parts lists. Set `context.detailsSource` to one line naming the sources.
- Keep text short. Each card holds one idea; long paragraphs go to the source-of-truth file and the card links the idea, not the prose.
- Phases may carry `stage` (for example "Stage 1"); the timeline groups them under stage bands, and the Work plan tab shows one section per stage with its hours and progress, plus a Stage filter. Name the stages with `plan.stages: [{ name, title }]`. Stages, phases and tasks may carry `what` and `goal` (one short line each): what it is and what it achieves; the Work plan shows them under the title. The timeline is drawn in hours, one task after another, from the task data.
- The dashboard shows each fact once. Keep out of `context.details` anything that has its own tab: parts and BOM (Hardware), tests (Quality), risks and decisions (Plan, Gaps), tasks and next steps (Work plan). Do not add a diagram card and a flow card for the same thing.
- The last block is the project brief: `context.brief = { title, source, text: [paragraphs], points: [{ t, d }] }`. Without it the page writes a brief from goal, problem, users, scope and constraints. Next to it is the "Tell Forge" box: the user writes an update, picks Inform, Update, Change or Decision, and copies a ready message to paste into the chat. When you receive one, record it in the context file first, then update the hub and the brief.
- A parts list per stage: give each `hardware.bom` item a `list` name (for example "List A: test kit (Stage 1)"); the Hardware tab draws one table per list, with an optional note in `hardware.bomNotes[list]`. Without `list` there is one "Bill of materials" table.
- Every table and list of four or more items has a Copy button (tab-separated, pastes into Excel); Gaps has its own. This is automatic: do not add copy controls to the data.
- Never put a fact in `context.details` that the context index or source-of-truth files do not hold. When a fact changes, change the file first, then the card.

## Work plan (tasks and hours)
- Every task lives in a phase of `plan.phases`: `{ id, t, owner, est, spent, status, due, after, track, note }`. `est` and `spent` are hours; `status` is `todo`, `doing`, `blocked` or `done`; `after` lists task ids that must finish first; `track` is `hardware`, `firmware`, `backend`, `frontend` or `project`.
- Keep tasks small (1 to 8 hours; split bigger ones), one owner each, ordered so a person can take the next one. Put the reason for `blocked` in `note`.
- Hours come from the user or the team. When Forge proposes them, set `plan.estimateNote` ("First estimates by Forge from the brief, not yet confirmed by the team") and add a blocker gap "Are the hour estimates right?". Never present estimates as commitments. `spent` is only what the user reports.
- The page computes totals, remaining hours, workload per person, next-up tasks (not blocked, dependencies done) and phase progress. Do not write those numbers by hand.

## Hours report (PDF)
- `report.html` prints the plan as an A4 portrait report: summary, one-page task map, one timeline per stage (each from day 1). It reads `plan.stages[].short`, `plan.reserve`, `plan.pace` (hours per day per owner, never printed), `plan.reportIntro` and `plan.reportNotes`. Details in `references/house-style.md`.
- Render it with a headless browser (`page.pdf` with `preferCSSPageSize`) or ask the user to print it to PDF, look at every page, and save the PDF under `docs/plans/`.

## Documents
- List every project document in `docs` with `group`, `title`, `type`, `status` (`draft`, `review`, `approved`, `outdated`, `missing`), `owner`, `updated`, `note`, and `path` (relative to the project root, copy button) or `url` (Open button).
- Find them with `git ls-files` or `ls` on `docs/`, `hardware/` and similar. Do not open the files: use the file name, or the first heading with `head -1`. Status is `draft` unless the user says otherwise.
- Add `missing` entries for documents the brief, contract or acceptance criteria require that do not exist yet.
- Never list secrets or credential files (`.env`, keys) or client-private files the user did not agree to show.

## Gap page (how decisions flow)
The user picks an option or types an answer on the Gaps tab. "Ask Forge about this" copies a ready prompt; "Copy all decisions for Forge" copies a block to paste into chat. The page cannot write files, and picks live only in that browser. When the user pastes decisions: set the gap to `status: "decided"` with `decision`, record each in context file section 7 (one line: decision, reason, date), update the plan, tracks or business fields it affects, then refresh the hub.

## Publish
- With the Artifact tool: build one wrapper-less file with the Forge repo script `python3 scripts/hub_inline.py docs/hub <out.html> --bare --title "<Project> Hub"` (the tool adds its own document wrapper) and publish that; keep the title stable on republishes. Use `hub_inline.py` without `--bare` for a single file to send by hand. It is private until the user shares it; record the link in section 9 of the context file and update the same artifact later by its URL.
- Without it, the folder is the hub; tell the user to open `index.html` in a browser (keep both files together). Never say a page was published unless the tool confirmed it.

## Update (token-friendly)
- After substantial work, change only the changed fields in `hub-data.js` with targeted edits (task status and spent hours, `agent.log` line, quality tests and checklist, new files in a `tree`, new tasks, document status, risks, decisions, gap status, used skills, version, updated date). Re-publish only when something visible changed.
- If the Hub and documentation disagree, the source-of-truth record wins; resolve any conflict in the underlying records rather than guessing.
- New Forge or skills version: the catalog inside `index.html` is refreshed by copying the new template over `index.html` (data stays in `hub-data.js`).

## Rules
- Plain HTML, CSS and JS only; no external scripts, fonts or images unless the user approves.
- All data is escaped by the page. Never put raw HTML in `hub-data.js`.
- No secrets, tokens, personal data or client data the user did not agree to show. For a client-facing hub, leave out internal costs and margin unless told otherwise.
- Brand colors: the page darkens fills automatically when white text on the primary color would be under 4.5:1; still warn the user if a palette color is very light.
- Tabs come from the category rules in `references/house-style.md`. Set `ui.tabs` or add a tab only when the user asks for that project. Gaps is always present.
