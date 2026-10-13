---
name: project-hub
description: Builds and updates the Project Hub, a visually rich HTML page (published as an artifact when the tool exists) with project context, dev tracks (hardware, firmware, backend, frontend), dev plan, action plan, business plan, the AI agent page, a gap page with decisions, and visual identity. Use at project start, after substantial work, or for /forge:hub.
metadata:
  source: original (Agent_REF)
  date_added: '2026-10-13'
---

# Project Hub

Goal: one visual place where the user (and the client) sees the project: context, who builds what, plans, money, the agent, and what is still undecided. It is generated from `REF/CONTEXT/001_PROJECT_CONTEXT.md`, which stays the source of truth. The hub never holds facts the context file does not.

Two files in `REF/CONTEXT/hub/`:
- `index.html`: the static page. Copy it, never edit or re-read it.
- `hub-data.js`: all project content in one `HUB` object. This is the only file Forge edits (it is small).

Tabs: **Project** (goal, problem, users, scope, constraints, people, next steps, build progress and completeness rings), **Tracks** (hardware, firmware, backend, frontend, other; mark `applicable: false` when not used), **Plan** (roadmap, action plan board, risks, decisions), **Business** (audience, value, model, offer, costs, margin, KPIs, milestones), **Agent** (Forge role, responsibilities, commands, skills used here, full skill catalog), **Gaps**, **Identity**.

## Create (first time)
1. Make sure the context file exists (`doc-writer`, project context file). Read it once.
2. `mkdir -p REF/CONTEXT/hub`, then copy `templates/index.html` and `templates/hub-data.js` from this skill folder into it (shell `cp`; do not open them).
3. Fill `hub-data.js` from the context file. If unsure of a field's shape, read `references/hub-data.example.js` once (fictional example, copy shapes not facts).
   - Agent page: set `agent.usedSkills` from this session's skill-use reports (name and reason). The catalog and Forge version are built into `index.html`.
   - Tracks: only the ones the project needs; firmware and hardware only if applicable.
4. Business plan: use only what the user stated or the files show. Leave unknown fields empty; the page shows "to define". Never invent prices, costs, market sizes or KPIs.
5. Gaps: the page automatically lists missing basics as "missing info" gaps. Add explicit gaps to `gaps` for real decisions, each with 2 to 4 options (`label`, short `note`, mark at most one `recommended`) and a `why`. Priorities: `blocker` (stops work), `important`, `nice`. Do not write option notes you cannot justify.
6. Open `index.html` in a headless browser or the browser pane and fix console errors. Say what you could not check.

## Gap page (how decisions flow)
The user picks an option or types an answer on the Gaps tab. "Ask Forge about this" copies a ready prompt; "Copy all decisions for Forge" copies a block to paste into chat. The page cannot write files, and picks live only in that browser. When the user pastes decisions: set the gap to `status: "decided"` with `decision`, record each in context file section 7 (one line: decision, reason, date), update the plan, tracks or business fields it affects, then refresh the hub.

## Publish
- With the Artifact tool: publish `index.html` and pass `hub-data.js` in `files`. If the user wants one shareable file, first run `python3 scripts/hub_inline.py REF/CONTEXT/hub <out.html>` (REF repo script) and publish that. Title "<project> Hub". It is private until the user shares it; record the link in section 9 of the context file and update the same artifact later by its URL.
- Without it, the folder is the hub; tell the user to open `index.html` in a browser (keep both files together). Never say a page was published unless the tool confirmed it.

## Update (token-friendly)
- After substantial work, change only the changed fields in `hub-data.js` with targeted edits (phase progress, action status, next steps, risks, decisions, gap status, used skills, version, updated date). Re-publish only when something visible changed.
- If the context file and the hub disagree, the context file wins.
- New Forge or skills version: the catalog inside `index.html` is refreshed by copying the new template over `index.html` (data stays in `hub-data.js`).

## Rules
- Plain HTML, CSS and JS only; no external scripts, fonts or images unless the user approves.
- All data is escaped by the page. Never put raw HTML in `hub-data.js`.
- No secrets, tokens, personal data or client data the user did not agree to show. For a client-facing hub, leave out internal costs and margin unless told otherwise.
- Keep the seven tabs. Add a tab only when the user asks.
