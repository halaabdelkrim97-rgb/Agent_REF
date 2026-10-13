---
name: project-hub
description: Builds and updates the Project Hub, a visually rich HTML page (published as an artifact when the tool exists): project context, dev tracks, a task-by-task work plan with hour estimates and owners, business plan, project documents, the AI agent page, a gap page with decisions, and visual identity. Use at project start, after substantial work, or for /forge:hub.
metadata:
  source: original (Agent_REF)
  date_added: '2026-10-13'
---

# Project Hub

Goal: one visual place where the user (and the client) sees the project: context, who builds what, plans, money, the agent, and what is still undecided. It is generated from `REF/CONTEXT/001_PROJECT_CONTEXT.md`, which stays the source of truth. The hub never holds facts the context file does not.

Two files in `REF/CONTEXT/hub/`:
- `index.html`: the static page. Copy it, never edit or re-read it.
- `hub-data.js`: all project content in one `HUB` object. This is the only file Forge edits (it is small).

Tabs: **Project** (goal, problem, users, scope, constraints, people, next steps, build and completeness rings), **Tracks** (hardware, firmware, backend, frontend, other; `applicable: false` when not used; progress comes from the tasks of that track), **Plan** (hours summary, next-up tasks, workload per person, task-by-task work plan as list or board with person and status filters, risks, decisions), **Business**, **Docs** (all project documents with status, search, open link or copy path, missing documents), **Agent** (Forge role, commands, skills used here, full skill catalog), **Gaps**, **Identity**.

## Create (first time)
1. Make sure the context file exists (`doc-writer`, project context file). Read it once.
2. `mkdir -p REF/CONTEXT/hub`, then copy `templates/index.html` and `templates/hub-data.js` from this skill folder into it (shell `cp`; do not open them).
3. Fill `hub-data.js` from the context file. If unsure of a field's shape, read `references/hub-data.example.js` once (fictional example, copy shapes not facts).
   - Agent page: set `agent.usedSkills` from this session's skill-use reports (name and reason). The catalog and Forge version are built into `index.html`.
   - Tracks: only the ones the project needs; firmware and hardware only if applicable.
4. Business plan: use only what the user stated or the files show. Leave unknown fields empty; the page shows "to define". Never invent prices, costs, market sizes or KPIs.
5. Gaps: the page automatically lists missing basics as "missing info" gaps. Add explicit gaps to `gaps` for real decisions, each with 2 to 4 options (`label`, short `note`, mark at most one `recommended`) and a `why`. Priorities: `blocker` (stops work), `important`, `nice`. Do not write option notes you cannot justify.
6. Open `index.html` in a headless browser or the browser pane and fix console errors. Say what you could not check.

## Work plan (tasks and hours)
- Every task lives in a phase of `plan.phases`: `{ id, t, owner, est, spent, status, due, after, track, note }`. `est` and `spent` are hours; `status` is `todo`, `doing`, `blocked` or `done`; `after` lists task ids that must finish first; `track` is `hardware`, `firmware`, `backend`, `frontend` or `project`.
- Keep tasks small (1 to 8 hours; split bigger ones), one owner each, ordered so a person can take the next one. Put the reason for `blocked` in `note`.
- Hours come from the user or the team. When Forge proposes them, set `plan.estimateNote` ("First estimates by Forge from the brief, not yet confirmed by the team") and add a blocker gap "Are the hour estimates right?". Never present estimates as commitments. `spent` is only what the user reports.
- The page computes totals, remaining hours, workload per person, next-up tasks (not blocked, dependencies done) and phase progress. Do not write those numbers by hand.

## Documents
- List every project document in `docs` with `group`, `title`, `type`, `status` (`draft`, `review`, `approved`, `outdated`, `missing`), `owner`, `updated`, `note`, and `path` (relative to the project root, copy button) or `url` (Open button).
- Find them with `git ls-files` or `ls` on `docs/`, `REF/CONTEXT/`, `hardware/` and similar. Do not open the files: use the file name, or the first heading with `head -1`. Status is `draft` unless the user says otherwise.
- Add `missing` entries for documents the brief, contract or acceptance criteria require that do not exist yet.
- Never list secrets or credential files (`.env`, keys) or client-private files the user did not agree to show.

## Gap page (how decisions flow)
The user picks an option or types an answer on the Gaps tab. "Ask Forge about this" copies a ready prompt; "Copy all decisions for Forge" copies a block to paste into chat. The page cannot write files, and picks live only in that browser. When the user pastes decisions: set the gap to `status: "decided"` with `decision`, record each in context file section 7 (one line: decision, reason, date), update the plan, tracks or business fields it affects, then refresh the hub.

## Publish
- With the Artifact tool: build one wrapper-less file with the REF repo script `python3 scripts/hub_inline.py REF/CONTEXT/hub <out.html> --bare --title "<Project> Hub"` (the tool adds its own document wrapper) and publish that; keep the title stable on republishes. Use `hub_inline.py` without `--bare` for a single file to send by hand. It is private until the user shares it; record the link in section 9 of the context file and update the same artifact later by its URL.
- Without it, the folder is the hub; tell the user to open `index.html` in a browser (keep both files together). Never say a page was published unless the tool confirmed it.

## Update (token-friendly)
- After substantial work, change only the changed fields in `hub-data.js` with targeted edits (task status and spent hours, new tasks, document status, risks, decisions, gap status, used skills, version, updated date). Re-publish only when something visible changed.
- If the context file and the hub disagree, the context file wins.
- New Forge or skills version: the catalog inside `index.html` is refreshed by copying the new template over `index.html` (data stays in `hub-data.js`).

## Rules
- Plain HTML, CSS and JS only; no external scripts, fonts or images unless the user approves.
- All data is escaped by the page. Never put raw HTML in `hub-data.js`.
- No secrets, tokens, personal data or client data the user did not agree to show. For a client-facing hub, leave out internal costs and margin unless told otherwise.
- Brand colors: the page darkens fills automatically when white text on the primary color would be under 4.5:1; still warn the user if a palette color is very light.
- Keep the eight tabs. Add a tab only when the user asks.
