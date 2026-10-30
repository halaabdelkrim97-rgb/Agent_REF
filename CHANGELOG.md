# Changelog

Versions follow `vMAJOR.MINOR.PATCH`. Every commit on `main` starts with the version it belongs to, for example `v1.2.0: summary`.
Git tags cannot be pushed from the environment these updates were made in, so the commit prefix and this file are the version record.

## v3.1.1 (Dashboard without repeats, copy buttons, brief)

- The dashboard shows each fact once: risks, decisions, next steps, parts, tests and the stack card are left to their own tabs; a short "Needs attention" strip appears only when something is blocked.
- Every table and list of four or more items gets a Copy button (tab-separated, pastes into Excel); Gaps has a table copy too.
- New last block on the dashboard: the project brief (`context.brief`, or written from goal, problem, users and scope) and a "Tell Forge" box with Inform, Update, Change and Decision types that copies a ready message for the chat. The page is static, so it cannot send the message itself.
- The Work plan tab groups phases under their stage with hours and progress per stage, and has a Stage filter; `plan.stages` gives each stage a title.
- Phases, stages and tasks can carry `what` and `goal` (a one-line description and its goal), shown in the Work plan.
- Hardware draws one bill of materials per `list` (for example one per stage), each with its own note.
- Tested: Playwright desktop and narrow, light and dark, all tabs, copy to the clipboard of a table and the update message, no console errors. Not tested: pasting into Excel itself, other project types.

## v3.1.0 (Hub dashboard)

- Restyle the project-hub template as a monitoring dashboard: dark and light themes with a saved toggle, KPI tiles, task map, hours chart, hours-based Gantt and quick-access tiles.
- Add `context.details` (visual project-context cards: flow, tiles, stats, meter, split, table, timeline, fold) so the first page carries the project context. Add optional `stage` on phases and a separate Work plan tab.
- An explicit gap with the same id now overrides the automatic one. Schematic diagrams open under Hardware. BOM price columns show only when prices exist. Long track lists collapse.
- Tested: Playwright on desktop and a narrow viewport, light and dark, all tabs viewed, no console errors, no horizontal scroll, `node --check` on the example data. Not tested: screen readers, web and game project types, hubs built by Forge on other projects.

## v3.0.1 (README refresh)

- Rebuild the README with clearer setup guidance, a task-based skill finder, and direct links to the skill catalog.
- Adapt the Hub catalog generator to the new README layout and skill descriptions.

## v3.0.0 (Docs-first migration)

- Replace the project `REF/` documentation convention with `docs/PROJECT_CONTEXT.md`, `docs/source-of-truth/`, `docs/plans/` and `docs/hub/`. Add a collision-safe migration guide and update context, planning and Hub workflows.
- Move the shared agent, skills and templates to `agent/`, `skills/` and `templates/`; update plugin paths and packaging scripts. Existing installs and custom paths require migration; historical changelog paths remain historical.
- Keep project migration content-preserving and task-aware. Distinguish verified current facts, plans, conflicts and historical claims.
- Graphify local code-only extraction is limited to supported source files and does not cover Markdown documentation; actual host behavior and token savings require separate measurement.

## v2.12.1 (Pause and resume)

- Add /forge:stop and plain-language equivalents to pause session routines without changing files or configuration; /forge:start resumes.
- Keep independent project constraints and host safeguards active; individual Forge commands during a pause do not resume automatic behavior.
- Validation: skill packaging, command metadata, documentation and Hub catalog checks. Live plugin command registration and pause behavior are not tested.

## v2.12.0 (Proportionate work and optional detail)

- Audit 39 skill entry points and resolve expensive conflicts in discovery, planning, UI guidance, testing and reflection.
- Shorten four recurring skills while preserving originals in optional references; stop mandatory full-code plans, repeated approvals and blanket style choices.
- Remove duplicated Hub/visual detail from core and add task-size routing plus targeted diagnostics.
- Add review findings and explicit measurement limitations in docs/reviews. Validation does not establish runtime token savings or visual quality.

## v2.11.1 (User vision, no house style)

- Make the user's vision authoritative: visual skills provide techniques without imposing an aesthetic.
- Offer concepts only when exploration is requested or delegated; distinguish objective defects and brief mismatches from optional subjective preferences.
- Validate through packaging and Hub synchronization; live visual behavior remains untested.

## v2.11.0 (Graphify integration skill)

- Add Graphify skill for current-guide-first Cloud/local setup across clients, additive MCP configuration, user-completed OAuth and authenticated verification.
- Require workspace/repository selection and source-backed architecture answers; distinguish index evidence, semantic suggestions and inference.
- Skill addition does not initiate a connection or change active MCP settings.
- Validation: skill packaging, Hub catalog and documentation checks. No live Graphify account, OAuth or indexed repository query tested.

## v2.10.0 (Art direction across hosts)

- Add art-direction: compact creative concepts, reference inspection, medium/asset selection, one polished sample and evidence-based visual critique. Detailed cinematic, animation and game techniques load only when relevant.
- Adapt to available ChatGPT, Claude Code and Codex tools without assuming image generation, browser access or automatic cross-agent communication.
- Strengthen 3D cinematic composition and animation choreography. Add an artistic/game branch to simulations, with bounded stepping, responsive feedback and frame-rate checks. Correct the suggestion that explicit RK4 is a general stiff-system fix.
- Preserve engineering workflows for later development; artistic projects do not require CAD, measured readouts or engineering formulas.
- Validation: packaging, catalog and documentation checks; rendered artistic quality and live host behavior still require real-project trials.

## v2.9.0 (Focused context and visual quality)

- Add task-based context loading, one-agent defaults, bounded review rounds and documentation updates only when facts change.
- Replace the default frontend capability catalog with focused implementation, module ownership and design-token guidance. Preserve the full original in an optional React/Next.js reference.
- Add a reusable visual brief, one polished sample before expansion, and explicit screenshot review criteria for UI and 3D.
- Align 3D and documentation skills with existing approvals and compact shared handoffs.
- Validation: all 37 skills passed packaging checks; Hub catalog, changed-document links, version metadata, section sequence, whitespace and verbatim catalog preservation passed. Real task token savings, visual outcomes and live agent collaboration are not yet measured.

## v2.8.0 (Shared Forge workflow for Claude and Codex)

- Restore missing Forge sections 3-10: task routing, proportionate work, implementation, visual review, validation, collaboration, reporting and context budget.
- Add a Codex AGENTS.md entry point and a shared handoff template. Document separate worktrees for concurrent edits and the limits of file-based coordination.
- Reuse existing stack approvals and align startup Hub behavior with the start command: offer creation rather than blocking unrelated work.
- Validation: skill packaging, Hub catalog synchronization and local documentation checks. Live Claude/Codex handoffs and visual browser automation have not been tested.

## v2.7.1 (Clearer wires)

- **Block diagrams route wires to overlap less.** Blocks are reordered inside each column to reduce crossings (zones stay together), each wire between neighbouring columns gets its own vertical channel with square corners (ordered so wires do not cross each other needlessly), the gap between columns widens with the number of wires, and wire labels, baud rates and pin labels are placed so they do not cover each other or the blocks (they move along the wire, or just above or below it).
- **Tested** (headless Chrome, 1200 and 360 px): all test hubs and the full example render, no console errors, no horizontal scroll, no overlapping blocks; the irrigation-controller style drawing (3 UART wires, 2 RS-485 buses, Ethernet, LoRa, I2C) is visibly clearer than v2.7.0. **Not tested:** drawings with more than about 12 blocks or more than about 8 wires in one gap, where some crossings and label overlaps remain.

## v2.7.0 (Hub follows the project type)

- **The hub now depends on the project type** (`HUB.profile.type`: `web`, `mechatronics`, `game`). Always present: Project (context), Plan (work plan with hour estimates), Business, Docs and quality, Agent, Gaps (open points with Q&A). Web adds Frontend, Backend, Database and Design (palette, techs, assets, references, libraries). Mechatronics adds Firmware, Hardware (system drawing, schematic, parts list, power, pins, structure) and App, web app or HMI when present. Game adds UI, Code (for example Unity), Structure and Assets (by type, libraries, license flags). Each type page holds details, a project structure tree (collapsible, `path | note`), items, endpoints or tables, diagrams and its own tasks and progress. Projects without a type keep the old tab logic.
- **Things that were missing, added:** a Quality section (tests, release checklist, environments), an asset and library list that flags libraries without a license, and Agent analytics (skill coverage, sessions, tokens only if shown, most used skills, work done by Forge, roles in the project, capabilities used) fed by a one-line `agent.log` per piece of work. New automatic gaps per type.
- **System drawings:** diagrams can now look like a real system drawing: outlined zones (enclosure, on mast, field), your own wire types with a legend (color, dashed), blocks with detail lines and a tested/missing tag, baud and pin labels at the wire ends, dashed planned wires, wider blocks, same-column wires. Style and fields in `references/profiles.md`; a fictional example is in `references/hub-data.example.js`.
- **Lighter page:** each tab is drawn when first opened (all tabs are drawn for printing); the skill catalog is collapsed. Template 85 KB, about 27 KB gzipped, no external files.
- Forge rules (section 10), `/forge:hub` and `project-hub` updated; `references/profiles.md` is new.
- **Tested** (headless Chrome, 1200 and 360 px): fictional web, mechatronics and game hubs, the full example, a blank hub and a hub without a type: every tab renders, no console errors, no horizontal scroll, HTML in names, notes and folder names (including `__proto__`) is escaped, a system drawing with zones, custom wires, tags and end labels renders without overlapping blocks. **Not tested:** a hub built by Forge from a real project, publishing from Claude Code, screen readers, drawings with more than about 12 blocks, zones whose blocks span many columns (they can overlap other blocks).

## v2.6.0 (Hub built from the project: hardware, software, diagrams)

- **The hub is generated from the project Forge works on.** `project-hub` now starts with an analysis step (file list and manifests only, no source reading) that decides the tabs, tracks and diagrams. Hardware tab only for hardware or firmware, Software tab only for backend or frontend, a system overview always; small projects merge sections with `HUB.ui.tabs` (for example one "Build" tab). The separate Tracks tab is gone: each track card appears in the tab it belongs to (hardware and firmware in Hardware, backend and frontend in Software, others in Plan).
- **Diagrams drawn from data, no libraries.** Blocks (`nodes` with optional `in` and `out` pins) and wires (`edges` with `kind` data, power, signal or control, pins as `block.pin`) are laid out automatically in lanes or by arrow direction, routed so long wires run above the diagram instead of behind blocks, with labels, a legend, a text version of every diagram, dashed boxes for planned parts, and a `proposed`, `decided` or `built` badge. Used for: system overview (Project tab), block-level schematic with pins, firmware or UI state diagram, data flow.
- **Hardware tab:** power budget per rail (amber above 80%, red above 100%), parts list with computed totals and "unpriced" count, pin map, interfaces. **Software tab:** architecture layers, modules, API endpoints, data model.
- **No invented engineering data:** Forge may not make up part numbers, pins, voltages, currents, prices or endpoints; unknown architecture becomes a gap with options (area `architecture`). The schematic is block-level and points to the real design file in Docs.
- Signal wires are blue, power red (colors checked for contrast in light and dark); number columns are right-aligned.
- **Tested** (headless Chromium, 1200 and 360 px; fictional hardware and software project, empty data, web-only project with merged tab, hostile data): no console errors, no horizontal scroll, hostile text escaped in diagrams and tables, no overlapping blocks or blocks outside the drawing, power percentages and parts total match a hand count, generated tab sets as expected. **Not tested:** hubs built by Forge from real projects, publishing from Claude Code, screen readers, very large diagrams (over 12 blocks).

## v2.5.0 (Hub: work plan with hours, documents)

- **Task-by-task work plan with hour estimates.** Phases hold tasks with id, one owner, estimated and spent hours, status (`todo`, `doing`, `blocked`, `done`), due date, dependencies (`after`) and track. The Plan tab shows planned, done, remaining and spent hours, the next tasks that are ready, workload per person, and the plan as a list (one table per phase) or a board, filtered by person (remembered in the browser) and status. Over-runs show in red, waiting tasks say what they wait for. On phones each task is a stacked card instead of a table. Track progress and project progress are computed from the tasks, so Forge only edits task fields. `actions` was removed from the data format.
- **Estimates stay honest:** when Forge proposes hours it sets `plan.estimateNote` and adds a blocker gap "Are the hour estimates right?"; `spent` is only what the user reports.
- **New Docs tab:** every project document with group, type, status (`draft`, `review`, `approved`, `outdated`, `missing`), owner, date, note, and an Open link or a Copy path button. Search, status filters, counts, an approved-percentage ring, and dashed cards for required but missing documents. Forge lists documents with `git ls-files` or `ls` and does not open them; secrets and client-private files are never listed. New automatic gaps: tasks and hours, documents.
- **Accessibility pass** (`accessibility` skill): status badge colors, links and filled buttons now meet 4.5:1 in light and dark mode (measured on every tab: 0 failures); fills darken automatically when a brand color is too light for white text; the header has a dark overlay; the "to define" style no longer collides with the "todo" status.
- **Example for approval:** `references/hub-data.example.js` is now a fictional four-person hardware, firmware, backend and frontend project (20 tasks, 132 planned hours, 13 documents, 3 gaps).
- **Tested** (headless Chromium, 1200 and 360 px; fictional full data, empty data, hostile data, inlined single file): no console errors, no horizontal scroll, HTML in task and document fields is escaped, hours totals match a hand count (132 planned, 19 done, 29 spent, 104 remaining), person and status filters, board view, document search and filters, copy-path fallback dialog, contrast scan, keyboard focus order. **Not tested:** publishing from Claude Code, `/forge:hub` in a live plugin install, a hub from a real project, screen readers.

## v2.4.0 (Project Hub, full version)

- **Project Hub now has seven tabs:** Project (context, scope, constraints, people, completeness and build rings), Tracks (hardware, firmware if applicable, backend, frontend, other; not-applicable tracks are greyed), Plan (dev roadmap, action plan board, risks, decisions), Business (audience, value, model, offer, costs, margin, KPIs, milestones), **Agent** (Forge's role, responsibilities, what it will not do, commands, skills used in this project with reasons, searchable catalog of all skills), **Gaps** and Identity.
- **Gap page:** missing basics are detected automatically from empty fields ("missing info"); explicit gaps carry options with notes and a recommended pick. The user clicks an option or types an answer; "Ask Forge about this" and "Copy all decisions for Forge" copy ready prompts (with a select-and-copy dialog when the clipboard is blocked). Picks are kept in the browser only; Forge records pasted decisions in the context file (section 7) and marks the gaps decided. Open gaps show as a badge on the tab.
- **Split files for cheap updates:** the hub is `REF/CONTEXT/hub/index.html` (static, copied, never re-read) plus `hub-data.js` (the only file Forge edits). `scripts/hub_inline.py` merges them into one shareable HTML file. `references/hub-data.example.js` is a fictional example of every field. The hub path changed from `REF/CONTEXT/PROJECT_HUB.html` (v2.3.0, never used live).
- **`scripts/sync_hub_skills.py`** writes the skill catalog and Forge version into the page from README.md and forge.md (`--check` for drift); CLAUDE.md asks for it before every push.
- **Tested** in headless Chromium at 1200 and 360 px with fictional full data, empty data, hostile data and the inlined single file: no console errors, no horizontal scroll, HTML in data is escaped, `javascript:` links and CSS-injection colors are neutralized, tab switching, option picks, typed answers, persistence after reload, filter counts, both copy paths (clipboard and fallback dialog), skill filter. **Not tested:** publishing through the Artifact tool from Claude Code, `/forge:hub` in a live plugin install, a hub built from a real context file, and keyboard-only use beyond focus styles.

## v2.3.0 (Project Hub)

- **New skill `project-hub`** (37 skills): every project gets a visually rich single-file HTML hub with four tabs (Overview, Dev plan, Business plan, Identity): progress ring, roadmap timeline, risks and decisions tables, offer, costs and margin, KPIs, brand palette, dark mode, print styles, phone layout. All content is one `HUB` data object in `templates/hub-template.html`, so updates are small targeted edits, not rewrites. It is generated from the context file (source of truth) and published as an artifact when the Artifact tool exists, otherwise saved as `REF/CONTEXT/PROJECT_HUB.html`.
- **Forge rules:** the start routine checks for the hub and creates it; context upkeep refreshes it; routing table row; non-negotiable 4 now covers the hub. New command `/forge:hub` (five commands). `/forge:start` offers the hub when missing. The context-file step in `doc-writer` now ends with a hub refresh.
- **No invented business plan:** unknown prices, costs and KPIs stay empty and show "to define"; at most five short questions are asked. Internal costs and margin are left out of a client-facing hub unless the user says otherwise.
- **Tested:** the template renders with empty data and with sample data in headless Chromium at 1200 and 360 px: no console errors, no horizontal scroll, HTML in data is escaped, a `javascript:` link is neutralized, dark mode toggles. **Not tested:** publishing through the Artifact tool from Claude Code, the `/forge:hub` command in a live plugin install, and a hub generated from a real context file.
- Rebased onto v2.1.0 to v2.2.3 (another session had pushed `canvas-design`, `nano-banana`, `framer-motion`, `gsap`, `ui-components-21st` and moved `project-summarizer` into `doc-writer`); this release is numbered v2.3.0 to avoid reusing those versions.

## v2.2.3

- **`ui-components-21st` from a first real test:** new `scripts/twentyfirst.py` (Python standard library) calls the 21st.dev MCP server over HTTP without registering it: `tools`, `search`, `call <tool> '<json>'`. It reads `TWENTYFIRST_API_KEY` from the environment or a gitignored `.env`, never prints the key, and prints UTF-8 on Windows consoles. The skill adds `--scope user` to the `claude mcp add` command, the main tools, and the free-tier limits (2 code retrievals a day, AI generation off) so the agent checks `get_usage` first.
- Tested on a real project without the `claude` CLI: key from `.env` accepted, `tools` (51), `search`, `get_usage`, missing-key and bad-JSON errors; `package_skills.py --check`. Not tested: `get_component` (kept the user's daily retrievals), `claude mcp add` (no CLI on that machine).

## v2.2.2

- **`nano-banana` from a first real test:** the CLI also reads the key from a gitignored `.env` in the folder it runs from, explains a `429 ... limit: 0` (no free image quota on the key: billing needed) instead of printing raw JSON, and has `--list-models` to show the image models a key can use. The skill notes the free-key result and how to set up `.env` safely.
- Tested on a real project: the key in `.env` was read and accepted by the API; a new free key got `limit: 0` on `gemini-2.5-flash-image` and `gemini-3.1-flash-image`, so no image was generated. Also `--list-models`, `--dry-run`, `package_skills.py --check`. Not tested: a successful image (needs billing).

## v2.2.1

- **`nano-banana` now ships a CLI:** `REF/SKILLS/nano-banana/scripts/nano_banana.py` (Python standard library, no install) generates and edits images, supports `--aspect`, `--model`, `--image` and `--dry-run`, never overwrites files and never prints the key (reads `GEMINI_API_KEY`). The raw REST call and the Gemini CLI extension option moved to `references/api.md`; the Gemini CLI extension (Apache-2.0) runs inside Gemini CLI, not Claude Code, so it is not the default.
- Tested: `--dry-run`, missing-key and missing-image errors, `package_skills.py --check`. Not tested: a real image request (needs the user's key) and the models listed.

## v2.2.0

- **Four new skills (36):** `nano-banana` (AI raster images through the Gemini API, user's own key, ask first), `framer-motion` (Motion for React, ask first), `gsap` (timelines and ScrollTrigger, ask first; the official full set is github.com/greensock/gsap-skills, MIT) and `ui-components-21st` (21st.dev Magic MCP and CLI: stack gate, review checklist, key handling).
- Written for this repo from public docs; no third-party skill text copied. Each carries a vanilla-first gate: they are dependencies or paid/keyed services, so Forge asks before using them. The 21st.dev commands are given to the user to run themselves; no API key is stored anywhere in the repo.
- `forge.md` routing table updated; version bumped in README, `forge.md` and `.claude-plugin/*.json`.
- Tested: `package_skills.py --check`. Not tested: any of the four in a live session, the Gemini request, the 21st.dev commands (setup differs between guides).

## v2.1.1

- **`project-summarizer` removed (32 skills).** Its full body moved, nothing dropped, to `REF/SKILLS/doc-writer/references/project-context.md`; `doc-writer` has a short "Project context file" section and its description now covers wrap-up, handoff and `/forge:context`.
- References updated: `/forge:context` and `/forge:improve` commands, `forge.md` (routing table, context upkeep), `reflect`, `client-delivery`, `agent-builder` template, README. Older changelog entries still mention the old name as history.
- Tested: `package_skills.py --check`, no remaining references, README links. Not tested: `/forge:context` in a live session.

## v2.1.0

- **New skill `canvas-design`** (33 skills): original static posters and art as a single .png or .pdf, written as a short design philosophy first and then expressed on a canvas. Adapted from `canvas-design` in [anthropics/skills](https://github.com/anthropics/skills/tree/main/skills/canvas-design), found through BehiSecc/awesome-claude-skills. Apache-2.0: `LICENSE.txt` is next to it. Changes: shorter description, repo frontmatter, and the bundled font folder is not included (system fonts first, ask before downloading any font).
- `forge.md` routing table points posters and static art to `canvas-design`; version bumped in README, `forge.md` and `.claude-plugin/*.json`.
- Tested: `package_skills.py --check`. Not tested: the skill in a live session.

## v2.0.0 (Forge)

- **The agent is now named Forge.** `REF/RULES/agent-rules.md` became `REF/AGENT/forge.md` and was rewritten: 11.1 KB to 8.6 KB while adding a start routine (context file check), a task-to-skill routing table, token rules (one or two skills per step, one reference file, never re-read), context upkeep, and the command list. Old users: replace the "REF PROJECT AGENT" block in `CLAUDE.md` with the new file.
- **Plugin renamed `forge`** (install: `/plugin install forge@agent-ref`). Commands: `/forge:start`, `/forge:context` (create or migrate the context file to the REF template, update status and visual identity), `/forge:improve` (end-of-day self-improvement through `reflect`, skips what exists, project lessons to `REF/CONTEXT/forge-learnings.md`, Agent_REF proposals listed separately, nothing applied without approval) and `/forge:report`. The old `/agent-ref:ref` became `/forge:start`.
- **Eight new skills:** `git-workflow`, `debugging`, `seo-performance`, `client-delivery`, `web-3d-assets`, `accessibility`, `data-and-charts`, `i18n-forms`.
- **`reflect` rewritten** as the improve mode (scope: session or today, skip existing, confidence tags, destinations). **`project-summarizer`** now checks and migrates the context file and keeps a visual identity section; the context template gained section 10, "Visual identity and references".
- **Token diet:** nine long skill descriptions shortened; resident description text 8.2 KB for 32 skills.
- **README rewritten** around Forge: agent setup, the four commands, a test checklist for a real project, how Forge works, structure, and skill tables generated from the skill descriptions.
- Not tested in a live Claude Code session: plugin name and namespace, command behavior, reading today's transcripts.

## v1.9.1 (audit)

- **Unity policy:** Unity is used only when the user defines a project as a Unity project. `unity-scene-builder` and `3d-scene-builder` descriptions and bodies, the rules (section 6) and the README now say so; the default for 3D stays the plain web stack with Three.js after approval.
- **Collisions fixed:** descriptions of `3d-scene-builder`, `threejs`, `unity-scene-builder` and `interactive-simulation` now say which one to use when; the README has a "Which skill for which job" routing table.
- **Eager triggers removed:** "Use PROACTIVELY" and marketing wording dropped from `backend-architect`, `frontend-developer` and `scroll-experience` descriptions; `frontend-developer` now states plain HTML/CSS/JS by default.
- **Dangling references fixed:** `scroll-experience` guide pointed to skills that do not exist (`3d-web-experience`, `landing-page-design`, `frontend`, `ui-design`); `writing-skills/anthropic-best-practices.md` had 9 broken links (docs paths and `EXAMPLES.md`).
- **Token trim:** `ui-ux-pro-max` Search Reference, Example Workflow and Output Formats moved to `references/search-and-workflow.md` (374 to 293 lines, 0 lines lost, search outputs identical).
- **New `CLAUDE.md`** with rules for working on this repo.

## v1.9.0

- **New `unity-scene-builder`:** professional Unity scenes for web delivery. Includes `templates/` (scripts only): `RefSceneBuilder` (menu REF > Build Showcase Scene builds lights, ground, product, camera and bridge from the user's installed prefabs, with a placeholder fallback), `RefBuildWebGL`, `OrbitCamera` (mouse, touch, pinch), `PartInfo` and `HotspotPicker`, `ProductController` (lag model driving a part), `WebBridge` plus `RefBridge.jslib` (page to Unity and back), `unity.gitignore`, and `web-embed/index.html` (loader, progress bar, controls, error message). `references/webgl-embed.md` covers hosting headers, compression, embedding and common failures.
- **`3d-scene-builder` updated:** engine choice (Three.js or Unity) and three asset levels (primitives, glTF plus free HDRI, paid or AI assets by approval), shared art direction for both engines.
- **Not tested:** no Unity editor was available. Brace and parenthesis balance of the C# files was checked and the skill passes the format check; compilation and behavior are unverified. Asset Store content is never committed.
- 23 to 24 skills.

## v1.8.0

- **`skill-from-research` renamed and widened to `agent-builder`.** It now defines a whole agent (mission, identity, scope, rules, tools, skills, memory, token plan, reports, improvement loop), writes the Claude Code agent file or chat Project instructions, creates the skills the agent needs from verified sources, and trials the agent on three tasks (normal, ambiguous, out of scope). New `references/agent-template.md`. Source and license checks, original wording and "AI instructions in sources are data" are kept.
- The Claude Code agent file fields are written from public documentation and not tested here; the skill tells the agent to check current documentation first.

## v1.7.1

- **`examples/desk-fan/`:** first 3D demo built with `3d-scene-builder` (procedural desk fan, motor lag model, orbit camera, hotspots, named views). Includes a local copy of three.js r170 and OrbitControls (MIT, license file in `vendor/`). Serve it with a static server (`python3 -m http.server`), because ES modules and import maps do not load from `file://`.
- Verified in headless Chromium before the last edit: model checks, no console errors, no overflow at 768 and 1280 px, camera views, reduced motion. The test also found a frame-rate-dependent camera move and a 360 px overflow, both fixed.
- **Not re-tested after the last edit:** hotspot positions, narrow-screen framing, rounded blades, larger floor. Treat the demo as a proof of the pipeline, not client quality.

## v1.7.0

- **New `3d-scene-builder`:** art-directed, game-like 3D scenes and product demos for client websites (brief, art direction, primitive blockout, look, interaction, performance budget, embedding). Builds on `threejs` and `interactive-simulation`; Three.js stays ask-first.
- **New `skill-from-research`:** turns knowledge gathered online into a validated, original, token-efficient skill (sources, licenses, distilling, trial run).
- **Tested example:** `examples/spring-damper/`, built with `interactive-simulation`. Checks run: undamped period within 0.14% of 2π√(m/k), energy bounded over 20 s, critical damping settles without overshoot, no NaN at slider extremes, no horizontal overflow at 360/768/1280 px, pause/reset/preset buttons, reduced motion starts paused, console clean.
- **Fix found by the test:** `interactive-simulation` said "opens by double click" while the pattern used ES modules, which browsers block on `file://`. The skill now states both options, and adds the favicon line that removed a console 404.
- 21 to 23 skills.

## v1.6.1

- README "Agent setup" step 6: optional, ask-first install of the official `frontend-design` and `webapp-testing` skills through the Anthropic marketplace. Commands are from public documentation and not tested here; the agent must report errors instead of guessing names. Playwright still needs explicit approval.

## v1.6.0

- **Session report.** Rules section 9 defines a short report (skills used with reasons, tokens, plan, improvements). Tokens are reported only from figures the environment shows (`/cost`, `/context`); otherwise "not measured". New `/agent-ref:report` command prints it without opening extra files.
- **New skills (4):** `interactive-simulation` (client product simulations, configurators, games; plain Canvas/SVG first, patterns file), `css-motion`, `art-svg-canvas`, `security-review`. Original text; community lists were used to choose topics, not copied.
- **Merges:** `ui-ux-pro-max` gets a "Design direction first" step; `project-summarizer` gets a handoff note; `testing` gets an "ask first" browser-automation section.
- Not added: skills that need outside services or API keys (image/audio/3D generators), plugins with background services, and sources that could not be read (the `anthropics/skills` pages were not reachable, so nothing from them was used).
- 17 to 21 skills.

## v1.5.0

- **Skill-use report and token discipline** in the rules: each used skill is listed with the reason, reference files are named, and a new "Token discipline" block limits what is opened and re-read.
- **Lossless trims.** `coding-standards` 524 to 296 lines (React, API design and performance/testing moved to `references/`), `backend-architect` 331 to 127 lines (capabilities moved to `references/capabilities.md`). A line-by-line check found 0 missing lines in both.
- **`writing-skills`** description rewritten so it triggers reliably (body unchanged).
- **New skills (5):** `project-summarizer`, `doc-writer`, `testing`, `cad-firmware`, `reflect`. Written for this repo from the user's picks and a public survey of community skills; no third-party skill text was copied.
- Skill count 12 to 17. Plugin manifests, README and rules version updated.

## v1.4.0

- **Agent setup section** at the top of the README: numbered, repeatable steps an agent follows when told to read the README (project or global choice, skip what exists, rules into `CLAUDE.md`, context from the template, final report).
- **Claude Code plugin.** `.claude-plugin/marketplace.json` and `plugin.json` expose `REF/SKILLS` as the plugin's skills, so `/plugin marketplace add` plus `/plugin install` installs everything. New `/agent-ref:ref` command loads the rules and project context. Written from the plugin format documentation; not yet tested in a live Claude Code session.

## v1.3.0

- **Three.js consolidated.** The 11 `threejs-*` skills are now one skill, `threejs`: a router `SKILL.md` (stack gate, trigger keywords, topic table, example workflow) plus 11 files in `references/`. The skill list in context drops from 22 to 12 entries and a Three.js task loads one small router, then only the topic file it needs.
- **No content lost.** The ten detailed guides were moved with `git mv`; the only changes are the "See Also" cross-references, now relative links (about 3 lines per guide, 2 in the overview). The lighting skill's body became `references/lighting.md`; only its frontmatter, stack gate and generic Limitations block were removed.
- **New `html-css-js` stack in `ui-ux-pro-max`.** 50 native-web guidelines (layout, responsive, typography, color, accessibility, forms, animation, images, performance). It is now the default for `--stack`. The other stacks are unchanged.
- **Regression check.** Seven `ui-ux-pro-max` searches (design system, style, color, landing, ux, react stack, html-tailwind stack) give byte-identical output before and after.
- README, rules version and skill count updated.

## v1.2.0: lighter rules, native skill loading, chat and Claude Code install
- `agent-rules.md` rewritten: 473 lines / 19,117 characters down to 110 lines / 10,297 characters (46% smaller). Every requirement kept, each stated once instead of up to four times.
- Skills now load natively (Claude Code, Claude chat) when their description fits. The README index is the fallback, not an every-prompt step.
- Skills access is still mandatory, but any of three sources counts: native skills, the local `REF/SKILLS/` copy, or GitHub. The agent stops only if none is reachable.
- `brainstorming`: trivial, fully specified edits (typo, rename, one value) no longer need a design document.
- Removed generic filler ("When to Use" and "Limitations" boilerplate) from six skills.
- README: install steps for Claude Code and Claude chat, version line.
- New `scripts/package_skills.py`: validates each skill and builds one upload-ready ZIP per skill (standard library only).

## v1.1.0: quick fixes, vanilla-first stack gate, upload-safe frontmatter
- README: corrected `agent-rules.md` name, added `REF/TEMPLATES/001_PROJECT_CONTEXT.md`.
- `ui-ux-pro-max`: commands run from the skill folder; default stack is plain HTML/CSS/JS.
- Removed references to skills that are not in the repo.
- "Stack gate (vanilla-first)" added to the React/Next.js, Tailwind, TypeScript/Node, backend, scroll-library and Three.js skills.
- Frontmatter limited to `name`, `description`, `license`, `compatibility`, `metadata`; folders renamed to match skill names (`backend-architect`, `frontend-developer`, `coding-standards`).

## v1.0.0: baseline
- Rules file, README skills index and 22 skills as first published.
