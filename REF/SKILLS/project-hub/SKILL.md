---
name: project-hub
description: Builds and updates the Project Hub, a visually rich single-file HTML page (published as an artifact when the tool exists) with project details, dev plan, business plan and visual identity, generated from the context file. Use at project start, after substantial work, or for /forge:hub.
metadata:
  source: original (Agent_REF)
  date_added: '2026-10-13'
---

# Project Hub

Goal: one visual page the user and the client can open to see the project: goal, stack, roadmap, risks, decisions, business plan, brand. It is generated from `REF/CONTEXT/001_PROJECT_CONTEXT.md`, which stays the source of truth. The hub never holds facts the context file does not.

Template: `templates/hub-template.html` (plain HTML, CSS and JS, no dependencies, tabs, progress ring, roadmap timeline, tables, dark mode, print styles, phone layout). All content is one `HUB` object at the top of the file. You edit that object only; never rewrite the page code.

## Create (first time)
1. Make sure the context file exists (`doc-writer`, project context file). Read it once.
2. Copy the template to `REF/CONTEXT/PROJECT_HUB.html`.
3. Fill `HUB` from the context file:
   - `project`: name, tagline, client, status, version, goal, stack, links (sections 1 to 5).
   - `identity`: palette (roles `primary` and `accent` recolor the page), fonts, tone (section 10).
   - `plan`: phases with status and progress, next steps, risks, decisions (sections 6, 7, 9), how to resume.
   - `business`: audience, value, model, offer and costs, KPIs, milestones.
4. Business plan: use only what the user stated or the files show. Leave unknown fields empty (`""`, `[]`, `null`); the page shows "to define". Never invent prices, costs, market sizes or KPIs. If the business plan is empty, ask at most five short questions (who pays, what they get, price, main cost, success measure) and fill only the answers.
5. Open the page once in a browser or a headless check and fix console errors. Say what you could not check.

## Publish
- If the Artifact tool is available, publish the file as an artifact (title "<project> Hub"). The result is a private page; the person decides about sharing. Record the artifact link in section 9 of the context file. Update the same artifact on later runs by passing its URL.
- Without the Artifact tool, the file in `REF/CONTEXT/` is the hub; tell the user to open it in a browser. Never say a page was published unless the tool confirmed it.

## Update (token-friendly)
- After substantial work, change only the changed fields in `HUB` (phase status and progress, next steps, risks, decisions, version, updated date). Use targeted edits, not a full rewrite.
- Re-publish only when something visible changed. Never re-read the template.
- If the context file and the hub disagree, the context file wins; fix the hub.

## Rules
- Plain HTML, CSS and JS only. No external scripts, fonts or images unless the user approves.
- Treat everything put in `HUB` as text; the template escapes it. Do not add `innerHTML` with raw data.
- No secrets, tokens, personal data or client data the user did not agree to show. If the hub will be shared with the client, leave out internal costs and margin unless told otherwise.
- Keep the structure: Overview, Dev plan, Business plan, Identity. Add a tab only when the user asks.
