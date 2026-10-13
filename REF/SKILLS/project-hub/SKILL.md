---
name: project-hub
description: Builds and updates the Project Hub for the project Forge is working on, generated from the project and its type (web, mechatronics, game). Always has context, work plan with hours, business plan, documents and quality, the agent page with analytics, and open points with Q&A. Adds type pages (frontend, backend, database, design; firmware, hardware, app; UI, code, structure, assets) and system drawings with zones. Use at project start, after substantial work, or for /forge:hub.
metadata:
  source: original (Agent_REF)
  date_added: '2026-10-13'
---

# Project Hub

Goal: one visual place where the user (and the client) sees the project: context, who builds what, plans, money, the agent, and what is still undecided. It is generated from `REF/CONTEXT/001_PROJECT_CONTEXT.md`, which stays the source of truth. The hub never holds facts the context file does not.

Two files in `REF/CONTEXT/hub/`:
- `index.html`: the static page. Copy it, never edit or re-read it.
- `hub-data.js`: all project content in one `HUB` object. This is the only file Forge edits (it is small).

Pages are generated from the project and its type (`HUB.profile`, details in `references/profiles.md`).
- **Always:** Project, Plan (task-by-task work plan with hour estimates), Business, Docs and quality, Agent (roles, capabilities, skills used, analytics), Gaps (open points with options and typed answers).
- **web:** Frontend, Backend, Database, Design (palette, techs, assets, references, libraries). **mechatronics:** Firmware, Hardware (system drawing, block schematic, parts list, power, pins), and App (web app, mobile app or HMI) when present. **game:** UI, Code (for example Unity), Structure, Assets (by type, libraries, licenses).
- Each type page can hold details, a project structure tree, diagrams and its tasks. The page draws every tab when first opened, so it loads light.

## Analyze the project first
The hub is built for this project, not from a fixed form.
1. List what exists with `git ls-files` or `ls`, and read only manifests and the context file. Hardware: `hardware/`, `cad/`, `*.kicad_sch`, `*.step`, `*.stl`. Firmware: `platformio.ini`, `*.ino`, `firmware/`. Backend: `server/`, `api/`, `requirements.txt`, `package.json`. Frontend: `index.html`, `src/`. Do not read source files for this.
2. Decide the type and set `profile.type` (`web`, `mechatronics`, `game`; ask if unclear) and `profile.apps`. Fill `sections` for each type page: summary, stack, owner, status, a `tree` of 20 to 60 lines (folders and key files, not-built files noted `planned`), and `items`. For the legacy shape: **Hardware tab** only if there is hardware or firmware; **Software tab** only if there is backend or frontend; a **System overview** diagram always (4 to 10 blocks, written to the Project tab); a **block schematic** for the board or wiring; a **state diagram** where firmware or UI logic has states; **layers and a data-flow diagram** for software. Small projects merge sections with `ui.tabs` (for example one "Build" tab with `parts: ["Hardware","Software"]`). Without `ui.tabs` the page picks tabs from the data.
3. Draw only what the files, the context file or the user show. Parts not built yet get `status: "planned"` (dashed box). A diagram is `proposed` until the user confirms it, then `decided`, then `built`. If the architecture is open, raise a gap with 2 to 4 options (area `architecture`) instead of guessing.
4. Never invent part numbers, pins, voltages, currents, prices, endpoints or fields. Leave them out and say so. The hardware diagram is block-level: put the real schematic file in `docs` and name it in the diagram `note`.
5. Diagram format (details in `references/hub-data.example.js` and the drawing style in `references/profiles.md`): `nodes` `{id,label,sub,group,status,in,out}` (`in` and `out` are pins drawn on the left and right), `edges` `{from,to,label,kind}` with `kind` one of `data`, `power`, `signal`, `control` and pins named as `"block.pin"`, optional `columns` for lanes. Keep a diagram under 12 nodes and labels short; split instead of cramming. For a full **system drawing** add `zones` (enclosure or location outlines), your own wire `kinds` (label, color, dash), block `lines` and `tag` (tested, missing, tone ok, warn or bad), and edge `start` and `end` labels (baud rate, pin names). The page lays it out, routes long wires above the diagram and adds a text version.

## Create (first time)
1. Make sure the context file exists (`doc-writer`, project context file). Read it once.
2. `mkdir -p REF/CONTEXT/hub`, then copy `templates/index.html` and `templates/hub-data.js` from this skill folder into it (shell `cp`; do not open them).
3. Fill `hub-data.js` from the context file. If unsure of a field's shape, read `references/hub-data.example.js` once (fictional example, copy shapes not facts).
   - Agent page: set `agent.usedSkills` from this session's skill-use reports (name and reason), `agent.roles` if the project needs roles other than the defaults (planner, builder, verifier, documenter), and append one line to `agent.log` per piece of work (`date`, `task`, `skills`, `tokens` only when the environment shows them). The analytics (coverage, sessions, most used skills) are computed from these. The catalog and Forge version are built into `index.html`.
   - Tracks: only the ones the project needs; each task joins a track through its `track` field and the card appears in the matching tab.
   - `hardware`, `software` and `diagrams` as decided in the analysis; power loads and capacities only from datasheets or the user.
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
- After substantial work, change only the changed fields in `hub-data.js` with targeted edits (task status and spent hours, `agent.log` line, quality tests and checklist, new files in a `tree`, new tasks, document status, risks, decisions, gap status, used skills, version, updated date). Re-publish only when something visible changed.
- If the context file and the hub disagree, the context file wins.
- New Forge or skills version: the catalog inside `index.html` is refreshed by copying the new template over `index.html` (data stays in `hub-data.js`).

## Rules
- Plain HTML, CSS and JS only; no external scripts, fonts or images unless the user approves.
- All data is escaped by the page. Never put raw HTML in `hub-data.js`.
- No secrets, tokens, personal data or client data the user did not agree to show. For a client-facing hub, leave out internal costs and margin unless told otherwise.
- Brand colors: the page darkens fills automatically when white text on the primary color would be under 4.5:1; still warn the user if a palette color is very light.
- Tabs follow the project (`ui.tabs` overrides). Gaps is always present. Add a tab only when the user asks.
