# Agent_REF: Forge, the REF dev agent

**Version v2.2.3** · see [CHANGELOG.md](CHANGELOG.md). Every update to `main` has a commit prefixed with its version, for example `v2.0.0: ...`.

**Forge** is a dev agent for Claude Code and Claude chat. It is one instruction file ([`REF/AGENT/forge.md`](REF/AGENT/forge.md)) plus 36 skills, a project context file convention and four commands. Forge works in native HTML, CSS and JavaScript first, asks before adding anything else, keeps the project context file current, reports which skills it used, and is built to spend few tokens.

---

## 🤖 Agent setup (for Claude Code)

> **Human:** open Claude Code in your project and say: *"Read https://github.com/halaabdelkrim97-rgb/Agent_REF/blob/main/README.md and follow the Agent setup section."*
> **Agent:** the steps below are for you. Do them in order, skip anything already done, and install nothing else.

1. **Ask once:** install for **this project only** (`.claude/skills/`) or **all projects** (`~/.claude/skills/`)? Default to this project.
2. **Plugin route (preferred):** run `/plugin marketplace add halaabdelkrim97-rgb/Agent_REF`, then `/plugin install forge@agent-ref`. This installs the skills and the commands `/forge:start`, `/forge:context`, `/forge:improve` and `/forge:report`. If plugin commands are unavailable, use the copy route.
3. **Copy route:** `git clone --depth 1 https://github.com/halaabdelkrim97-rgb/Agent_REF.git` into a temporary folder, copy each folder of `REF/SKILLS/` to the chosen skills folder (skip folders that already exist and say so), then delete the clone.
4. **Forge file:** if `CLAUDE.md` contains "FORGE — REF DEV AGENT", leave it (compare the version line and offer to update). If it contains the older "REF PROJECT AGENT" block, offer to replace that block. Otherwise append the contents of `REF/AGENT/forge.md` to `CLAUDE.md` (create the file if missing). Do not edit the rules.
5. **Context file:** run the Forge start routine. If `REF/CONTEXT/001_PROJECT_CONTEXT.md` is missing, create it from `REF/TEMPLATES/001_PROJECT_CONTEXT.md` and ask the user for goal, stack and constraints. If it exists in another format, offer `/forge:context` to migrate it without losing content. Do not invent answers.
6. **Official add-ons (optional, ask first):** offer Anthropic's `frontend-design` and `webapp-testing` skills through `/plugin marketplace add anthropics/skills` (`/plugin` lists the plugins; the group is likely `example-skills@anthropic-agent-skills`). `webapp-testing` adds Playwright, a new dependency: explain why and install only with explicit approval. Names come from public documentation; if a command fails, report the exact error and what `/plugin` shows. Do not guess other names or sources. Added skills add their descriptions to the context, so tell the user how many were added.
7. **Report:** installed skills (count and where), Forge file added or present, context file created, found or migrated, and anything skipped. Tell the user to run `/skills` to confirm.

Never add React, TypeScript, Tailwind, Node or any build tool during setup.

---

## 🧭 Daily use: the four commands

| Command | When | What it does |
| --- | --- | --- |
| `/forge:start` | Start of a session | Loads the Forge rules, checks the project context file (reads it, or offers to create or migrate it), then waits. |
| `/forge:context` | Any time | Makes `REF/CONTEXT/001_PROJECT_CONTEXT.md` follow the REF template: creates it if missing, or maps every existing fact into the ten sections without dropping content, updates status and visual identity, shows the diff. |
| `/forge:improve` | End of the workday | Learns from this session (or today's sessions) with `reflect`: collects corrections, approvals and token waste, skips what already exists, proposes small edits, applies only what you approve, updates the context file, and prints the report. |
| `/forge:report` | Any time | Prints the session report: skills used, tokens (only figures the environment shows), plan, improvements. |

Without the plugin, say the same in plain words ("Forge: improve"). Forge also runs the start routine on its own when it begins project work.

**Learnings and where they go.** Project lessons are saved in `REF/CONTEXT/forge-learnings.md`. Lessons that should change a skill or Forge itself are written as "Proposals for Agent_REF", and you apply them in this repo; a project session never edits the installed skills.

---

## 🧪 Test it in a real project (for example MakeIntelligens Studios)

1. Open Claude Code in that project's folder and say the sentence from the Agent setup section (or run the two `/plugin` commands).
2. Run `/skills` and check that the REF skills are listed.
3. Run `/forge:start`. Expect at most three lines: Forge version, whether the context file was found, and the next step.
4. Run `/forge:context`. Expect a diff of the context file for your approval.
5. Give Forge one small real task. Expect: a short approach, only the skills it needs, and a closing "REF Skills Used" list with reasons.
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

- **Routing and token budget** live in [`forge.md`](REF/AGENT/forge.md) sections 4 and 10: a task-to-skill table, one or two skills per step, never re-read, targeted reads, short replies. Skills load on demand, so only their short descriptions sit in context.
- **Technology policy:** native HTML, CSS and JavaScript first. React, Tailwind, TypeScript, Node, build tools, Three.js, physics engines, test frameworks and outside services need your approval. Unity is used only for projects you define as Unity projects.
- **Honesty:** Forge never claims access, tests or token numbers it does not have.

---

## 💬 Use it in Claude chat

- Build upload-ready ZIPs with `python3 scripts/package_skills.py` (standard library only; ZIPs go to `dist/`), then open Customize > Skills (older versions: Settings > Capabilities > Skills) and upload them. Skills apply to your whole account and also sync into Claude Code with the same account.
- Paste [`REF/AGENT/forge.md`](REF/AGENT/forge.md) into the Project instructions (or custom instructions). For project-specific facts, keep the context file's text in the Project knowledge.
- The slash commands are a Claude Code feature; in chat, ask for the same in plain words.

---

## 📁 Repository structure

```
Agent_REF/
├── README.md
├── CHANGELOG.md                # version history (commits on main are prefixed vX.Y.Z)
├── CLAUDE.md                   # rules for working on this repo
├── .claude-plugin/             # marketplace.json and plugin.json (plugin "forge")
├── commands/                   # /forge:start, /forge:context, /forge:improve, /forge:report
├── examples/                   # tested demos: spring-damper (2D), desk-fan (Three.js)
├── scripts/
│   └── package_skills.py       # validates skills and builds upload-ready ZIPs for Claude chat
└── REF/
    ├── AGENT/
    │   └── forge.md            # the Forge agent instruction file
    ├── TEMPLATES/
    │   └── 001_PROJECT_CONTEXT.md   # copy into a project as REF/CONTEXT/001_PROJECT_CONTEXT.md
    └── SKILLS/                 # 36 skills, one folder each (SKILL.md + optional references)
```

---

## 🧰 Skills (36)

Each skill is a folder with a `SKILL.md` (name and description frontmatter) and, for some, `references/`, data, scripts or templates. Claude loads a skill when its description fits the task, so reading the whole folder is never needed. The task-to-skill routing table is in [`forge.md`](REF/AGENT/forge.md), section 4.

### Planning & Process

| Skill | Description |
| --- | --- |
| [`brainstorming`](REF/SKILLS/brainstorming) | You MUST use this before any creative work - creating features, building components, adding functionality, or modifying behavior. Explores user intent, requirements and design before implementation. |
| [`writing-plans`](REF/SKILLS/writing-plans) | Use when you have an approved spec or requirements for a multi-step task, before touching code. Produces a bite-sized implementation plan saved to docs/plans/. |

### Engineering

| Skill | Description |
| --- | --- |
| [`backend-architect`](REF/SKILLS/backend-architect) | Backend and API architecture: REST, GraphQL and gRPC design, service boundaries, event-driven patterns, resilience and observability. Use when designing or reviewing a backend service or API. Recommends technology but asks before adding any runtime, framework or database. |
| [`frontend-developer`](REF/SKILLS/frontend-developer) | Frontend component, responsive layout, client-side state, performance and accessibility guidance. Plain HTML, CSS and JavaScript by default; React 19 and Next.js 15 parts apply only if the project already uses them. Use when building or fixing UI components or frontend behavior. |
| [`ui-components-21st`](REF/SKILLS/ui-components-21st) | Use 21st.dev (Magic MCP and 21st-dev CLI) to find or generate UI components from a prompt. Use only when the user asks for 21st.dev or wants ready-made React, Tailwind or shadcn components. Covers the stack gate, the setup the user runs themselves, key handling, and how to review and adapt the output. |
| [`coding-standards`](REF/SKILLS/coding-standards) | Coding standards and best practices for JavaScript, plus TypeScript, React and Node.js where the project already uses them. Use when writing, reviewing or refactoring code. |
| [`debugging`](REF/SKILLS/debugging) | Root-cause debugging procedure - reproduce, isolate, form ranked hypotheses, gather evidence, apply the smallest fix and verify. Use for bugs, errors, blank pages, wrong output, flaky behavior or "it worked yesterday". |
| [`git-workflow`](REF/SKILLS/git-workflow) | Git habits for clean history - branches, small commits, version-prefixed messages, safe pushes, pull requests, changelogs and recovery. Use when committing, branching, versioning, pushing, opening a PR or undoing a git mistake. |

### UI, Motion & Visuals

| Skill | Description |
| --- | --- |
| [`ui-ux-pro-max`](REF/SKILLS/ui-ux-pro-max) | Comprehensive design guide for web and mobile applications. Use when designing new UI components or pages, choosing color palettes and typography, or reviewing code for UX issues. |
| [`baseline-ui`](REF/SKILLS/baseline-ui) | Quickly deslop UI code by fixing spacing, hierarchy, typography, and small layout issues. Use when the interface needs a fast cleanup or polish pass. |
| [`scroll-experience`](REF/SKILLS/scroll-experience) | Scroll-driven web experiences: parallax storytelling, scroll animations, interactive narratives and cinematic pages, using CSS scroll-driven animation and IntersectionObserver before any library. Use when a page should unfold as the visitor scrolls. |
| [`css-motion`](REF/SKILLS/css-motion) | Plain CSS and Web Animations motion: transitions, keyframes, scroll-driven animation, FLIP, micro-interactions, easing and reduced motion. Use when adding or fixing UI animation. Not for 3D. |
| [`framer-motion`](REF/SKILLS/framer-motion) | Motion (formerly Framer Motion) for React projects: motion components, variants, gestures, AnimatePresence exit animations, layout and shared-layout transitions, scroll-linked values, springs and reduced motion. Use only when the project already uses React and CSS motion is not enough. Ask before adding the dependency. |
| [`gsap`](REF/SKILLS/gsap) | GSAP (GreenSock) animation: tweens, timelines, easing, ScrollTrigger, stagger, SVG and text effects, React cleanup with useGSAP, matchMedia and reduced motion. Use for complex sequenced or scroll-driven animation that CSS cannot do cleanly. Ask before adding the library; for simple motion use css-motion. |
| [`art-svg-canvas`](REF/SKILLS/art-svg-canvas) | Illustrations, icons, patterns, generative art, backgrounds and simple image assets in plain SVG, CSS and Canvas, with no libraries or image services. Use for logo and icon sketches, hero art, patterns, favicons or social images. |
| [`canvas-design`](REF/SKILLS/canvas-design) | Creates original static visual art (poster, cover, art piece) as a single .png or .pdf, guided by a short written design philosophy. Use when asked for a poster, artwork or other static design piece, not for UI, web pages or charts. Never copies existing artists' work. |
| [`nano-banana`](REF/SKILLS/nano-banana) | Generates and edits raster images (hero art, mockups, icons, textures, product shots) with Google's Nano Banana image models through the Gemini API. Use when the user asks for an AI-generated image or an edit of an existing image. Not for SVG or CSS art (art-svg-canvas) or posters made by code (canvas-design). |
| [`data-and-charts`](REF/SKILLS/data-and-charts) | Charts, KPIs and small dashboards for client sites in plain SVG or Canvas - chart choice, scales, labels, accessible color palettes, tooltips, table fallbacks and performance. Use when showing data, measurements or simulation results visually. |
| [`accessibility`](REF/SKILLS/accessibility) | WCAG 2.2 AA accessibility checks and fixes for web pages and interactive tools - keyboard, focus, names, contrast, forms, motion, dialogs, canvas and 3D alternatives. Use when building or auditing for accessibility, or before client launch. |

### 3D & Simulation

| Skill | Description |
| --- | --- |
| [`threejs`](REF/SKILLS/threejs) | Three.js API reference: scenes, cameras, renderer, geometry, materials, textures, lighting, shadows, animation, raycasting, controls, loaders (GLTF, HDR), GLSL shaders, post-processing. Use for Three.js or WebGL code; for client scenes use 3d-scene-builder first. |
| [`3d-scene-builder`](REF/SKILLS/3d-scene-builder) | Process for art-directed, game-like 3D product demos on client websites: brief, art direction, blockout, materials, lighting, interaction, performance budget, embedding. Three.js by default (ask first); Unity only if the user defines a Unity project. |
| [`web-3d-assets`](REF/SKILLS/web-3d-assets) | Turning CAD or 3D models into fast web assets - glTF export, cleanup, PBR materials, texture sizes, compression, HDRI and lighting sources, license tracking and loading in Three.js. Use when a client model, CAD export or downloaded 3D asset must run in a web scene. |
| [`interactive-simulation`](REF/SKILLS/interactive-simulation) | Model, state, fixed-timestep loop, physics basics, controls and delivery for 2D (Canvas or SVG) simulations, product demos and browser games. For 3D use 3d-scene-builder. Use for simulations, configurators and animated explainers. |
| [`unity-scene-builder`](REF/SKILLS/unity-scene-builder) | Unity scenes for web delivery - scene-as-code editor scripts, orbit camera, hotspots, simulation scripts, WebGL build settings, JavaScript bridge and website embed. Use ONLY when the user says the project is a Unity project. Never propose Unity for basic or light projects. |

### Quality & Delivery

| Skill | Description |
| --- | --- |
| [`testing`](REF/SKILLS/testing) | Plans and runs tests for plain HTML, CSS and JavaScript projects - manual browser checklists first, then simple native tests. Use when verifying a change, writing test steps, checking responsive or accessibility behavior, or before saying work is done. |
| [`security-review`](REF/SKILLS/security-review) | Security checklist review for web code and static sites - secrets, input handling and XSS, forms and CSRF, headers, third-party scripts, dependencies, storage and APIs. Use before release, when handling user input, auth, payments or client data, or when asked to check security. |
| [`seo-performance`](REF/SKILLS/seo-performance) | Search visibility and page speed for client websites - semantic HTML, titles, metadata, structured data, sitemap, images, Core Web Vitals and loading strategy. Use before launching a site, when asked about SEO or speed, or when a page loads slowly. |
| [`i18n-forms`](REF/SKILLS/i18n-forms) | Multilingual pages and reliable web forms: lang and RTL, text files, Intl formatting, language switcher, labels, validation, errors, spam protection, submission. Use for translations, RTL, contact forms and any user input. |
| [`client-delivery`](REF/SKILLS/client-delivery) | Freelance client project flow - discovery brief, scope and acceptance criteria, milestones, change requests, final checklist and a handover pack. Use when starting, scoping, reviewing or handing over a client website, web app or interactive tool. |

### Docs & Memory

| Skill | Description |
| --- | --- |
| [`doc-writer`](REF/SKILLS/doc-writer) | Writes and updates project documentation from the real code - README, setup and run steps, specs, handover notes, changelogs and code comments, and keeps the project context file current. Use when asked to document, write a README, explain how a project works, wrap up or hand off, for /forge:context, or when docs are out of date after a change. |
| [`reflect`](REF/SKILLS/reflect) | End-of-day and end-of-session self-improvement: reviews the session or today for corrections, approvals and token waste, skips what exists, proposes small edits for approval. Use for /forge:improve or when a skill got something wrong. |

### Mechatronics

| Skill | Description |
| --- | --- |
| [`cad-firmware`](REF/SKILLS/cad-firmware) | Mechatronics help: parametric CAD and printable parts, Arduino/ESP32/STM32 C++ habits, pin maps, wiring and BOM docs, hardware safety checklist. Use for CAD notes, microcontroller code, sensors, actuators, wiring or enclosure design. |

### Agents & Skill Authoring

| Skill | Description |
| --- | --- |
| [`agent-builder`](REF/SKILLS/agent-builder) | Builds a complete task-specific AI agent: mission, identity, scope, rules, tools, skills, memory, reports and tests, creating needed skills from verified sources. Use to create, define, improve or test an agent or specialist role. |
| [`writing-skills`](REF/SKILLS/writing-skills) | Use when creating, updating, testing or improving agent skills (SKILL.md files). Routes to templates, testing guidance, description-writing (CSO) and anthropic best-practice references. Use before writing any new skill. |
| [`writing-great-skills`](REF/SKILLS/writing-great-skills) | Reference for writing and editing skills well: the vocabulary and principles that make a skill predictable. Use only when the user explicitly asks for it. |
| [`writing-guidelines`](REF/SKILLS/writing-guidelines) | Reviews files for compliance with Vercel's Writing Guidelines. Fetches the latest rules at runtime (needs network access) and reports findings in terse file:line format. Use when the user asks to review prose, docs or UI copy against those guidelines. |

---

## 📚 Skill Sources & Credits

Some skills are imported from community and upstream projects; each `SKILL.md` records its origin in its frontmatter. Imported: [`ibelick/ui-skills`](https://github.com/ibelick/ui-skills) (`baseline-ui`, MIT), [`CloudAI-X/threejs-skills`](https://github.com/CloudAI-X/threejs-skills) (`threejs`), [`mattpocock/skills`](https://github.com/mattpocock/skills) (`writing-great-skills`, MIT), [`vercel-labs/agent-skills`](https://github.com/vercel-labs/agent-skills) (`writing-guidelines`), and `vibeship-spawner-skills`, Apache 2.0 (`scroll-experience`).

The newer skills are original text written for this repo. Topics were chosen from public community skill lists (Anthropic `anthropics/skills`, `vercel-labs/agent-skills`, `trailofbits/skills`, `majidmanzarpour/threejs-game-skills`); no third-party skill text was copied. `examples/desk-fan/vendor/` contains three.js r170 and OrbitControls (MIT, license file included). Check each skill's frontmatter for its exact license before reuse.

## 🛠 Contributing and versions

See [`CLAUDE.md`](CLAUDE.md). Run `python3 scripts/package_skills.py --check` before every push, update the README table and CHANGELOG, and prefix commits with the version. The repo has no `LICENSE` file yet; add one before sharing it publicly.
