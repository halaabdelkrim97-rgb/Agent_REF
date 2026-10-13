# Changelog

Versions follow `vMAJOR.MINOR.PATCH`. Every commit on `main` starts with the version it belongs to, for example `v1.2.0: summary`.
Git tags cannot be pushed from the environment these updates were made in, so the commit prefix and this file are the version record.

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
