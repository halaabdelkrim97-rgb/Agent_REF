# Agent_REF: Forge, the development agent

**Version v3.0.0** · see [CHANGELOG.md](CHANGELOG.md). Every update to `main` has a commit prefixed with its version, for example `v3.0.0: ...`.

**Forge** is a shared dev workflow for Claude Code, Claude chat and Codex. It is one instruction file ([`agent/forge.md`](agent/forge.md)) plus 39 skills, a `docs/` convention, a visual Project Hub and six commands. Forge respects the existing stack, keeps project documentation current, reports which skills it used and loads task-relevant detail on demand.

---

## 🤖 Agent setup (for Claude Code)

> **Human:** open Claude Code in your project and say: *"Read https://github.com/halaabdelkrim97-rgb/Agent_REF/blob/main/README.md and follow the Agent setup section."*
> **Agent:** the steps below are for you. Do them in order, skip anything already done, and install nothing else.

1. **Ask once:** install for **this project only** (`.claude/skills/`) or **all projects** (`~/.claude/skills/`)? Default to this project.
2. **Plugin route (preferred):** run `/plugin marketplace add halaabdelkrim97-rgb/Agent_REF`, then `/plugin install forge@agent-ref`. This installs the skills and the commands `/forge:start`, `/forge:context`, `/forge:improve`, `/forge:report` and `/forge:hub`. If plugin commands are unavailable, use the copy route.
3. **Copy route:** `git clone --depth 1 https://github.com/halaabdelkrim97-rgb/Agent_REF.git` into a temporary folder, copy each folder of `skills/` to the chosen skills folder (skip folders that already exist and say so), and copy `templates/` to `.forge/templates/` in the project without overwriting existing files. Then delete the clone. Use `.forge/templates/` when the plugin root is unavailable.
4. **Forge file:** inspect `CLAUDE.md` for both "FORGE — DEV AGENT" and the older "FORGE — REF DEV AGENT" or "REF PROJECT AGENT" markers. If Forge is present, compare its version and offer a scoped replacement without altering unrelated instructions. Otherwise append `agent/forge.md` (create the file if missing). Do not edit the rules.
5. **Project documentation:** run the Forge start routine and follow [`templates/DOCUMENTATION.md`](templates/DOCUMENTATION.md) for a lossless migration of existing documentation. If the context is missing, use `templates/001_PROJECT_CONTEXT.md` and ask for unknown goal, stack and constraints. Do not invent answers or overwrite conflicts.
6. **Official add-ons (optional, ask first):** offer Anthropic's `frontend-design` and `webapp-testing` skills through `/plugin marketplace add anthropics/skills` (`/plugin` lists the plugins; the group is likely `example-skills@anthropic-agent-skills`). `webapp-testing` adds Playwright, a new dependency: explain why and install only with explicit approval. Names come from public documentation; if a command fails, report the exact error and what `/plugin` shows. Do not guess other names or sources. Added skills add their descriptions to the context, so tell the user how many were added.
7. **Report:** installed skills (count and where), Forge file added or present, context file created, found or migrated, and anything skipped. Tell the user to run `/skills` to confirm.

Never add React, TypeScript, Tailwind, Node or any build tool during setup.

---

## Artistic work across ChatGPT, Claude Code and Codex

Forge has no house style: the user's vision and references define the target. Visual skills supply techniques, not aesthetic preferences. Creative alternatives are offered when requested or delegated; reviews check fidelity to the brief.

Use `art-direction` for new visual concepts or weak artistic output. It compares distinct concepts when needed, selects media/assets, polishes one sample, and critiques runtime captures before expansion. Optional references cover cinematic 3D, choreography, game feel and stable artistic physics. Engineering skills are unchanged.

In ChatGPT, image generation and previews depend on available tools; generated artwork is not proof of runtime behavior. In Claude Code and Codex, use actual source, assets and available browser capture. No host is assumed to have another host's tools. Shared files carry decisions; automatic model calls still require a configured coordinator.

## Focused work, visual quality and context cost

Start from a compact project context and its module index; load only task-relevant source and skill references. Vanilla frontend tasks no longer load the optional React/Next.js catalog. Use one agent by default and keep handoffs short. Update documentation only when facts change.

For new visuals, use [`VISUAL_BRIEF.md`](templates/VISUAL_BRIEF.md) to fill context section 10, polish one representative screen or scene, then expand. Reuse design tokens and suitable approved assets. Inspect screenshots when tools exist; limit visual correction rounds and report unresolved criteria honestly. These rules aim to reduce rework; actual token savings and visual improvements require measurement on real tasks.

## Codex and shared projects

Codex can use Forge by reading the shared instruction file and relevant skills directly; the Claude plugin does not install into Codex. In this repository, `AGENTS.md` is the Codex entry point. In a client project, add an `AGENTS.md` pointing to the actual installed `forge.md` and `skills/` location, and retain existing project instructions.

Claude and Codex share project context through Git, not chat history. Use `docs/HANDOFF.md` based on [`HANDOFF.md`](templates/HANDOFF.md) for task ownership, branch and commit, changes, validation and next action. Concurrent implementations need separate worktrees and branches; edits in a single folder must be serialized. Automatic agent invocation needs a separately configured coordinator and is not included in Forge.

The approved project stack can be reused without repeated permission. Startup checks for a Hub and offers creation; an unrelated small fix does not require generating it first. Visual work includes screenshot inspection when the environment supports it.

## Project documentation and v3 migration

Project documentation lives under `docs/`: `PROJECT_CONTEXT.md` is the compact index, `source-of-truth/` holds current detailed facts and decisions, `plans/` holds development plans, and `hub/` holds the optional Hub. A tool-required root file remains where the tool expects it. See [`DOCUMENTATION.md`](templates/DOCUMENTATION.md) for the layout and collision-safe migration.

Version 3 is a breaking path change. This repository's former `REF/AGENT/`, `REF/SKILLS/` and `REF/TEMPLATES/` are now `agent/`, `skills/` and `templates/`. Existing projects may still contain `REF/CONTEXT/`; Forge inventories and migrates their content when it is used there, verifying references and preserving conflicts and unknown files. Do not delete a legacy directory until its contents and references have been checked. Update installed plugin/copy versions and any custom paths; reinstalling the plugin or replacing the copied files may require the host's usual refresh. The repository name and historical changelog are unchanged.

---

## 🧭 Daily use: the six commands

| Command | When | What it does |
| --- | --- | --- |
| `/forge:stop` | Pause Forge in this session | Suspends Forge routines and reporting until explicitly resumed; keeps project requirements and host rules. Plain words: "Forge: stop". |
| `/forge:start` | Start or resume a session | Loads Forge, checks the project documentation, and migrates legacy paths safely when needed. |
| `/forge:context` | Any time | Creates or migrates project documentation into `docs/`, preserves content and conflicts, and updates the compact context index. |
| `/forge:improve` | End of the workday | Learns from this session (or today's sessions) with `reflect`: collects corrections, approvals and token waste, skips what already exists, proposes small edits, applies only what you approve, updates the context file, and prints the report. |
| `/forge:hub` | Project start, then after big changes | Studies the project (file list and manifests, no source reading) and builds or refreshes the **Project Hub** in `docs/hub/` (`index.html` + `hub-data.js`) with only the sections it needs: Project context and system diagram, **Plan** (task-by-task with owners, due dates and hour estimates, workload per person), **Hardware** (block-level schematic with pins, firmware state diagram, power budget, parts list, pin map), **Software** (architecture layers, data flow, modules, API, data model), Business plan, **Docs**, Agent page, a **Gaps** page with options and "Ask Forge" buttons, and Identity. Published as an artifact when the Artifact tool exists. Unknown facts stay "to define"; diagrams are marked proposed until you confirm them. |
| `/forge:report` | Any time | Prints the session report: skills used, tokens (only figures the environment shows), plan, improvements. |

Without the plugin, say the same in plain words ("Forge: improve"). Forge also runs the start routine on its own when it begins project work.

**Learnings and where they go.** Project lessons are saved in `docs/forge-learnings.md`. Lessons that should change a skill or Forge itself are written as "Proposals for Agent_REF", and you apply them in this repo; a project session never edits the installed skills.

---

## 🧪 Test it in a real project (for example MakeIntelligens Studios)

1. Open Claude Code in that project's folder and say the sentence from the Agent setup section (or run the two `/plugin` commands).
2. Run `/skills` and check that the Forge skills are listed.
3. Run `/forge:start`. Expect the Forge version, documentation status and any migration blockers.
4. Run `/forge:context`. Check the resulting documentation changes and any conflicts.
5. Give Forge one small real task. Expect: a short approach, only the skills it needs, and a skill-use report with reasons.
6. Run `/forge:report`, then at the end of the day `/forge:improve`.
7. Note anything wrong (a skill that did not trigger, a command that failed, too many tokens) and send it back: it becomes the next version.

Not yet tested in a live Claude Code session: the plugin install names, the command namespace (`/forge:...`) and reading today's transcripts. If any fail, the plain-words route still works.

---

## ⚙️ How Forge works

```
Start routine ──► context file (read, create or migrate)
      │
      ▼
Routing table ──► one or two skills for the task (SKILL.md, then at most one reference file)
      │
      ▼
Work (HTML/CSS/JS first, ask before any new technology) ──► validate ──► report skills used
      │
      ▼
End of day: /forge:improve ──► learnings, context update, session report
```

- **Routing and token budget** live in [`forge.md`](agent/forge.md) sections 4 and 10: a task-to-skill table, one or two skills per step, re-read changed context only, targeted reads, short replies. Skills load on demand, so only their short descriptions sit in context.
- **Technology policy:** native HTML, CSS and JavaScript first. New dependencies, services and architectural changes need approval unless already authorized; reuse the existing or approved stack without asking again. Unity is used only for projects you define as Unity projects.
- **Honesty:** Forge never claims access, tests or token numbers it does not have.

---

## 💬 Use it in Claude chat

- Build upload-ready ZIPs with `python3 scripts/package_skills.py` (standard library only; ZIPs go to `dist/`), then open Customize > Skills (older versions: Settings > Capabilities > Skills) and upload them. Skills apply to your whole account and also sync into Claude Code with the same account.
- Paste [`agent/forge.md`](agent/forge.md) into the Project instructions (or custom instructions). For project-specific facts, keep the context file's text in the Project knowledge.
- The slash commands are a Claude Code feature; in chat, ask for the same in plain words.

---

## 📁 Repository structure

```
Agent_REF/
├── README.md
├── CHANGELOG.md                # version history (commits on main are prefixed vX.Y.Z)
├── CLAUDE.md                   # rules for working on this repo
├── .claude-plugin/             # marketplace.json and plugin.json (plugin "forge")
├── commands/                   # /forge:start, /forge:stop, /forge:context, /forge:improve, /forge:report, /forge:hub
├── examples/                   # tested demos: spring-damper (2D), desk-fan (Three.js)
├── scripts/
│   ├── package_skills.py       # validates skills and builds upload-ready ZIPs for Claude chat
│   ├── sync_hub_skills.py      # keeps the Project Hub skill catalog in sync (--check)
│   └── hub_inline.py           # merges the hub page and data into one shareable HTML file
├── agent/forge.md              # shared Forge instructions
├── templates/                  # context, migration, handoff and visual templates
├── skills/                     # 39 skills and optional references
└── docs/                       # Forge project plans and reviews
```

---

## 🧰 Skills (39)

Each skill is a folder with a `SKILL.md` (name and description frontmatter) and, for some, `references/`, data, scripts or templates. Claude loads a skill when its description fits the task, so reading the whole folder is never needed. The task-to-skill routing table is in [`forge.md`](agent/forge.md), section 4.

### Planning & Process

| Skill | Description |
| --- | --- |
| [`brainstorming`](skills/brainstorming) | Resolve material ambiguity or explore requested designs; reuse approved requirements instead of forcing discovery for every change. |
| [`writing-plans`](skills/writing-plans) | Plan complex dependent work with paths, outcomes and checks; use short steps for bounded tasks without duplicating implementation code. |

### Engineering

| Skill | Description |
| --- | --- |
| [`backend-architect`](skills/backend-architect) | Backend and API architecture: REST, GraphQL and gRPC design, service boundaries, event-driven patterns, resilience and observability. Use when designing or reviewing a backend service or API. Recommends technology but asks before adding any runtime, framework or database. |
| [`frontend-developer`](skills/frontend-developer) | Frontend component, responsive layout, client-side state, performance and accessibility guidance. Plain HTML, CSS and JavaScript by default; React 19 and Next.js 15 parts apply only if the project already uses them. Use when building or fixing UI components or frontend behavior. |
| [`ui-components-21st`](skills/ui-components-21st) | Use 21st.dev (Magic MCP and 21st-dev CLI) to find or generate UI components from a prompt. Use only when the user asks for 21st.dev or wants ready-made React, Tailwind or shadcn components. Covers the stack gate, the setup the user runs themselves, key handling, and how to review and adapt the output. |
| [`coding-standards`](skills/coding-standards) | Coding standards and best practices for JavaScript, plus TypeScript, React and Node.js where the project already uses them. Use when writing, reviewing or refactoring code. |
| [`debugging`](skills/debugging) | Root-cause debugging procedure - reproduce, isolate, form ranked hypotheses, gather evidence, apply the smallest fix and verify. Use for bugs, errors, blank pages, wrong output, flaky behavior or "it worked yesterday". |
| [`git-workflow`](skills/git-workflow) | Git habits for clean history - branches, small commits, version-prefixed messages, safe pushes, pull requests, changelogs and recovery. Use when committing, branching, versioning, pushing, opening a PR or undoing a git mistake. |

### UI, Motion & Visuals

| Skill | Description |
| --- | --- |
| [`art-direction`](skills/art-direction) | Art direction, creative concepts, medium and asset selection, cinematic composition and rendered critique for websites, apps, games, animation and artistic simulations; adapts to ChatGPT, Claude Code and Codex tools. |
| [`ui-ux-pro-max`](skills/ui-ux-pro-max) | Comprehensive design guide for web and mobile applications. Use when designing new UI components or pages, choosing color palettes and typography, or reviewing code for UX issues. |
| [`baseline-ui`](skills/baseline-ui) | Quickly deslop UI code by fixing spacing, hierarchy, typography, and small layout issues. Use when the interface needs a fast cleanup or polish pass. |
| [`scroll-experience`](skills/scroll-experience) | Scroll-driven web experiences: parallax storytelling, scroll animations, interactive narratives and cinematic pages, using CSS scroll-driven animation and IntersectionObserver before any library. Use when a page should unfold as the visitor scrolls. |
| [`css-motion`](skills/css-motion) | Plain CSS and Web Animations motion: transitions, keyframes, scroll-driven animation, FLIP, micro-interactions, easing and reduced motion. Use when adding or fixing UI animation. Not for 3D. |
| [`framer-motion`](skills/framer-motion) | Motion (formerly Framer Motion) for React projects: motion components, variants, gestures, AnimatePresence exit animations, layout and shared-layout transitions, scroll-linked values, springs and reduced motion. Use only when the project already uses React and CSS motion is not enough. Ask before adding the dependency. |
| [`gsap`](skills/gsap) | GSAP (GreenSock) animation: tweens, timelines, easing, ScrollTrigger, stagger, SVG and text effects, React cleanup with useGSAP, matchMedia and reduced motion. Use for complex sequenced or scroll-driven animation that CSS cannot do cleanly. Ask before adding the library; for simple motion use css-motion. |
| [`art-svg-canvas`](skills/art-svg-canvas) | Illustrations, icons, patterns, generative art, backgrounds and simple image assets in plain SVG, CSS and Canvas, with no libraries or image services. Use for logo and icon sketches, hero art, patterns, favicons or social images. |
| [`canvas-design`](skills/canvas-design) | Creates original static visual art (poster, cover, art piece) as a single .png or .pdf, guided by a short written design philosophy. Use when asked for a poster, artwork or other static design piece, not for UI, web pages or charts. Never copies existing artists' work. |
| [`nano-banana`](skills/nano-banana) | Generates and edits raster images (hero art, mockups, icons, textures, product shots) with Google's Nano Banana image models through the Gemini API. Use when the user asks for an AI-generated image or an edit of an existing image. Not for SVG or CSS art (art-svg-canvas) or posters made by code (canvas-design). |
| [`data-and-charts`](skills/data-and-charts) | Charts, KPIs and small dashboards for client sites in plain SVG or Canvas - chart choice, scales, labels, accessible color palettes, tooltips, table fallbacks and performance. Use when showing data, measurements or simulation results visually. |
| [`accessibility`](skills/accessibility) | WCAG 2.2 AA accessibility checks and fixes for web pages and interactive tools - keyboard, focus, names, contrast, forms, motion, dialogs, canvas and 3D alternatives. Use when building or auditing for accessibility, or before client launch. |

### 3D & Simulation

| Skill | Description |
| --- | --- |
| [`threejs`](skills/threejs) | Three.js API reference: scenes, cameras, renderer, geometry, materials, textures, lighting, shadows, animation, raycasting, controls, loaders (GLTF, HDR), GLSL shaders, post-processing. Use for Three.js or WebGL code; for client scenes use 3d-scene-builder first. |
| [`3d-scene-builder`](skills/3d-scene-builder) | Process for art-directed, game-like 3D product demos on client websites: brief, art direction, blockout, materials, lighting, interaction, performance budget, embedding. Three.js by default (ask first); Unity only if the user defines a Unity project. |
| [`web-3d-assets`](skills/web-3d-assets) | Turning CAD or 3D models into fast web assets - glTF export, cleanup, PBR materials, texture sizes, compression, HDRI and lighting sources, license tracking and loading in Three.js. Use when a client model, CAD export or downloaded 3D asset must run in a web scene. |
| [`interactive-simulation`](skills/interactive-simulation) | Model, state, fixed-timestep loop, physics basics, controls and delivery for 2D (Canvas or SVG) simulations, product demos and browser games. For 3D use 3d-scene-builder. Use for simulations, configurators and animated explainers. |
| [`unity-scene-builder`](skills/unity-scene-builder) | Unity scenes for web delivery - scene-as-code editor scripts, orbit camera, hotspots, simulation scripts, WebGL build settings, JavaScript bridge and website embed. Use ONLY when the user says the project is a Unity project. Never propose Unity for basic or light projects. |

### Quality & Delivery

| Skill | Description |
| --- | --- |
| [`testing`](skills/testing) | Plans and runs tests for plain HTML, CSS and JavaScript projects - manual browser checklists first, then simple native tests. Use when verifying a change, writing test steps, checking responsive or accessibility behavior, or before saying work is done. |
| [`security-review`](skills/security-review) | Security checklist review for web code and static sites - secrets, input handling and XSS, forms and CSRF, headers, third-party scripts, dependencies, storage and APIs. Use before release, when handling user input, auth, payments or client data, or when asked to check security. |
| [`seo-performance`](skills/seo-performance) | Search visibility and page speed for client websites - semantic HTML, titles, metadata, structured data, sitemap, images, Core Web Vitals and loading strategy. Use before launching a site, when asked about SEO or speed, or when a page loads slowly. |
| [`i18n-forms`](skills/i18n-forms) | Multilingual pages and reliable web forms: lang and RTL, text files, Intl formatting, language switcher, labels, validation, errors, spam protection, submission. Use for translations, RTL, contact forms and any user input. |
| [`client-delivery`](skills/client-delivery) | Freelance client project flow - discovery brief, scope and acceptance criteria, milestones, change requests, final checklist and a handover pack. Use when starting, scoping, reviewing or handing over a client website, web app or interactive tool. |

### Docs & Memory

| Skill | Description |
| --- | --- |
| [`project-hub`](skills/project-hub) | Builds and updates the Project Hub for the project Forge is working on, generated from the project and its type (web, mechatronics, game). Always has context, work plan with hours, business plan, documents and quality, the agent page with analytics, and open points with Q&A. Adds type pages (frontend, backend, database, design; firmware, hardware, app; UI, code, structure, assets) and system drawings with zones. Use at project start, after substantial work, or for /forge:hub. |
| [`doc-writer`](skills/doc-writer) | Writes and updates project documentation from the real code - README, setup and run steps, specs, handover notes, changelogs and code comments, and keeps the project context file current. Use when asked to document, write a README, explain how a project works, wrap up or hand off, for /forge:context, or when docs are out of date after a change. |
| [`reflect`](skills/reflect) | End-of-day and end-of-session self-improvement: reviews the session or today for corrections, approvals and token waste, skips what exists, proposes small edits for approval. Use for /forge:improve or when a skill got something wrong. |

### Mechatronics

| Skill | Description |
| --- | --- |
| [`cad-firmware`](skills/cad-firmware) | Mechatronics help: parametric CAD and printable parts, Arduino/ESP32/STM32 C++ habits, pin maps, wiring and BOM docs, hardware safety checklist. Use for CAD notes, microcontroller code, sensors, actuators, wiring or enclosure design. |

### Agents & Skill Authoring

| Skill | Description |
| --- | --- |
| [`graphify`](skills/graphify) | Set up Graphify Cloud or local MCP, preserve client configuration, verify OAuth access, select indexed repositories and answer architecture questions with graph evidence and source locations. |
| [`agent-builder`](skills/agent-builder) | Builds a complete task-specific AI agent: mission, identity, scope, rules, tools, skills, memory, reports and tests, creating needed skills from verified sources. Use to create, define, improve or test an agent or specialist role. |
| [`writing-skills`](skills/writing-skills) | Use when creating, updating, testing or improving agent skills (SKILL.md files). Routes to templates, testing guidance, description-writing (CSO) and anthropic best-practice references. Use before writing any new skill. |
| [`writing-great-skills`](skills/writing-great-skills) | Reference for writing and editing skills well: the vocabulary and principles that make a skill predictable. Use only when the user explicitly asks for it. |
| [`writing-guidelines`](skills/writing-guidelines) | Reviews files for compliance with Vercel's Writing Guidelines. Fetches the latest rules at runtime (needs network access) and reports findings in terse file:line format. Use when the user asks to review prose, docs or UI copy against those guidelines. |

---

## 📚 Skill Sources & Credits

Some skills are imported from community and upstream projects; each `SKILL.md` records its origin in its frontmatter. Imported: [`ibelick/ui-skills`](https://github.com/ibelick/ui-skills) (`baseline-ui`, MIT), [`CloudAI-X/threejs-skills`](https://github.com/CloudAI-X/threejs-skills) (`threejs`), [`mattpocock/skills`](https://github.com/mattpocock/skills) (`writing-great-skills`, MIT), [`vercel-labs/agent-skills`](https://github.com/vercel-labs/agent-skills) (`writing-guidelines`), and `vibeship-spawner-skills`, Apache 2.0 (`scroll-experience`).

The newer skills are original text written for this repo. Topics were chosen from public community skill lists (Anthropic `anthropics/skills`, `vercel-labs/agent-skills`, `trailofbits/skills`, `majidmanzarpour/threejs-game-skills`); no third-party skill text was copied. `examples/desk-fan/vendor/` contains three.js r170 and OrbitControls (MIT, license file included). Check each skill's frontmatter for its exact license before reuse.

## 🛠 Contributing and versions

See [`CLAUDE.md`](CLAUDE.md). Run `python3 scripts/package_skills.py --check` before every push, update the README table and CHANGELOG, and prefix commits with the version. The repo has no `LICENSE` file yet; add one before sharing it publicly.

## Performance review

See [the focused performance review](docs/reviews/2026-10-15-performance.md) for findings, fixes and measurement limits. Core routing now distinguishes defined fixes, features, open designs and audits; optional detailed catalogs do not load for ordinary tasks.
