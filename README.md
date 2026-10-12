# Agent_REF

**Version v1.9.1** · see [CHANGELOG.md](CHANGELOG.md). Every update to `main` has a commit prefixed with its version, for example `v1.9.1: ...`.

A lightweight context framework designed to ground AI coding agents in your project's specific domain logic, business rules, and technical requirements.

---

## 🤖 Agent setup (for Claude Code)

> **Human:** open Claude Code in your project and say: *"Read https://github.com/halaabdelkrim97-rgb/Agent_REF/blob/main/README.md and follow the Agent setup section."*
> **Agent:** the steps below are for you. Do them in order, skip anything already done, and do not install anything else.

1. **Ask once:** install the skills for **this project only** (`.claude/skills/`) or for **all projects** (`~/.claude/skills/`)? Default to this project.
2. **Plugin route (preferred).** Run `/plugin marketplace add halaabdelkrim97-rgb/Agent_REF`, then `/plugin install agent-ref@agent-ref`. If plugin commands are unavailable, use the copy route.
3. **Copy route.** `git clone --depth 1 https://github.com/halaabdelkrim97-rgb/Agent_REF.git` into a temporary folder, copy each folder of `REF/SKILLS/` to the chosen skills folder (skip folders that already exist and tell the user), then delete the temporary clone.
4. **Rules.** If `CLAUDE.md` does not already contain "REF PROJECT AGENT", append the contents of `REF/RULES/agent-rules.md` to it (create the file if missing). Do not edit the rules.
5. **Context.** If `REF/CONTEXT/001_PROJECT_CONTEXT.md` is missing, create it from `REF/TEMPLATES/001_PROJECT_CONTEXT.md` and ask the user for the project name, goal and stack. Do not invent answers.
6. **Official add-ons (optional, ask the user first).** Offer these Anthropic skills, and install only the ones the user accepts:
   - `frontend-design` (distinctive UI direction): `/plugin marketplace add anthropics/skills`, then install the plugin that contains it (`/plugin` lists them; the group is likely `example-skills@anthropic-agent-skills`). Alternative: `/plugin install frontend-design@claude-plugins-official`.
   - `webapp-testing` (real-browser tests with Playwright): same marketplace. It adds Playwright, which is a new dependency, so explain why it helps and install it only with explicit approval, per the technology policy.
   - The plugin names above come from public documentation and may change. If a command fails or a name is not found, report the exact error and what `/plugin` shows. Do not guess other names, and do not install from other sources.
   - Added skills add their descriptions to the context, which costs tokens. After installing, run `/skills` and tell the user how many were added.
7. **Report** in this form: installed skills (count and where), rules added or already present, context file created or found, and anything skipped. Tell the user to run `/skills` to confirm.

Never add React, TypeScript, Tailwind, Node or any build tool during setup.

### One-command options
- Claude Code plugin (`/agent-ref:report` prints the session report: skills used, tokens, plan, improvements): `/plugin marketplace add halaabdelkrim97-rgb/Agent_REF` then `/plugin install agent-ref@agent-ref`. After that, `/agent-ref:ref` loads the rules and project context in any session.
- Claude chat has no install command: build ZIPs with `python3 scripts/package_skills.py` and upload them in Customize > Skills.

---

## 🚀 Quick Start

1. In your project, create the `REF/CONTEXT` folder. Copy [`REF/TEMPLATES/001_PROJECT_CONTEXT.md`](REF/TEMPLATES/001_PROJECT_CONTEXT.md) into it and fill it with your project's description, business rules and current stack.
2. Copy the text in [`agent-rules.md`](REF/RULES/agent-rules.md) into your agent instructions, and it will perform automatically.

Default stack: native HTML, CSS and JavaScript. The agent will ask you before using anything else. Unity is used only for heavy projects that you define as Unity projects; basic and light projects never use it.

### Use it in Claude Code
- **All projects:** copy the folders in `REF/SKILLS/` into `~/.claude/skills/`.
- **One project only:** copy the ones you want into that project's `.claude/skills/` and commit them.
- Paste `agent-rules.md` into your project's `CLAUDE.md`, or `@`-import it from there.
- Check what loaded with `/skills`. If a skill does not trigger, invoke it with `/skill-name`.

### Use it in Claude chat
- Build upload-ready ZIPs with `python3 scripts/package_skills.py` (standard library only; ZIPs go to `dist/`).
- In Claude, open Customize > Skills (older versions: Settings > Capabilities > Skills), choose "Upload a skill" and upload a ZIP.
- Skills uploaded in chat apply to your whole account. For project-specific rules, put the context in the Project's instructions instead.
- Paste `agent-rules.md` into your custom instructions or the Project instructions.
- Skills enabled in chat also sync into Claude Code when you sign in with the same account.
   
<img width="880" height="345" alt="image" src="https://github.com/user-attachments/assets/c0f1d273-d486-4c49-80ee-bdd6c26e6509" />

---

## ⚙️ How It Works

```
┌──────────────────────────────┐
│  001_PROJECT_CONTEXT.md      │ ──► Reads domain logic & technical constraints
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│        agent-rules.md        │ ──► Enforces execution rules & operational guidelines
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│ Context-Aware Code & Output  │ ──► Generates tailored, production-ready code
└──────────────────────────────┘
```

1. **Context Reading:** The agent reads `001_PROJECT_CONTEXT.md` to understand your project's background and logic.
2. **Rule Enforcement:** The agent follows the rules defined in `agent-rules.md`.
3. **Execution:** Code and tasks are executed automatically aligned with your setup.

---

## 📁 Repository Structure

```
Agent_REF/
├── README.md
├── CLAUDE.md                   # rules for working on this repo
├── CHANGELOG.md                # version history (commits on main are prefixed vX.Y.Z)
├── .claude-plugin/             # marketplace.json and plugin.json (Claude Code plugin)
├── commands/
│   ├── ref.md                  # /agent-ref:ref loads rules and project context
│   └── report.md               # /agent-ref:report session report
├── examples/
│   ├── spring-damper/          # tested reference demo built with interactive-simulation (plain HTML/CSS/JS)
│   └── desk-fan/               # 3D demo built with 3d-scene-builder (Three.js r170, local copy; serve with a static server)
├── scripts/
│   └── package_skills.py       # validates skills and builds upload-ready ZIPs for Claude chat
└── REF/
    ├── RULES/
    │   └── agent-rules.md      # System prompt / execution rules for the agent
    ├── TEMPLATES/
    │   └── 001_PROJECT_CONTEXT.md   # Copy into your project as REF/CONTEXT/001_PROJECT_CONTEXT.md
    └── SKILLS/                 # 24 skills, one folder each (SKILL.md + optional references)
```

---

## 🧰 Skills

All skills live in [`REF/SKILLS/`](REF/SKILLS). Each skill is a folder containing a `SKILL.md` (with `name` and `description` frontmatter) and, for some, extra `references/`, data, or scripts. Claude loads a skill when its description fits the task, so the agent does not need to read this folder on every prompt. If skills are not loaded natively, the agent reads only the index below and opens the relevant skills. It reports which skills it used.

### Which skill for which job (quick routing)

| You want to... | Skill | Not this one |
| --- | --- | --- |
| Plan before building | `brainstorming`, then `writing-plans` | |
| Build UI with a design direction | `ui-ux-pro-max` | `frontend-developer` is for component and state code; `baseline-ui` is a quick polish |
| Add motion | `css-motion` | `scroll-experience` only for scroll-driven pages |
| Show a product in 3D on a website | `3d-scene-builder`, then `threejs` for API details | `interactive-simulation` is for 2D and the model/loop logic |
| Heavy 3D project you defined as Unity | `unity-scene-builder` | never for basic or light projects |
| Draw illustrations or icons | `art-svg-canvas` | |
| Write docs or a README | `doc-writer` | `project-summarizer` is for session status and handoff |
| Test or verify a change | `testing` | |
| Check security | `security-review` | |
| Hardware, CAD, firmware | `cad-firmware` | |
| Improve a skill after a session | `reflect` | |
| Build a whole agent or a new skill from sources | `agent-builder` (uses `writing-skills` for the rules) | `writing-great-skills` is a reference for wording |

### Planning & Process

| Skill | Description |
| --- | --- |
| [`brainstorming`](REF/SKILLS/brainstorming) | Mandatory before any creative work (features, components, behavior changes). Explores intent, requirements and design through one-question-at-a-time dialogue, and requires an approved design before any implementation starts. |
| [`writing-plans`](REF/SKILLS/writing-plans) | Turns a spec or requirements into a detailed multi-step implementation plan before touching code: bite-sized tasks, exact files, tests, and frequent commits. Plans are saved to `docs/plans/`. |

### Engineering & Code Quality

| Skill | Description |
| --- | --- |
| [`backend-architect`](REF/SKILLS/backend-architect) | Scalable API and backend design: REST/GraphQL/gRPC, microservices, event-driven architecture, service boundaries, inter-service communication, resilience patterns and observability. Use when creating new backend services or APIs. Recommends technology but asks before adding any runtime, framework or database. |
| [`frontend-developer`](REF/SKILLS/frontend-developer) | Builds React components and responsive layouts, handles client-side state, and focuses on performance and accessibility (React 19, Next.js 15). Stack-gated: applies only if the project already uses React/Next.js or you approved them; otherwise its principles are applied in plain HTML/CSS/JS. |
| [`coding-standards`](REF/SKILLS/coding-standards) | Universal coding standards, best practices and patterns for JavaScript by default; the TypeScript, React and Node.js parts apply only if the project already uses them. |

### UI / UX Design

| Skill | Description |
| --- | --- |
| [`ui-ux-pro-max`](REF/SKILLS/ui-ux-pro-max) | Comprehensive design guide for web and mobile apps: designing components and pages, choosing color palettes and typography, and reviewing code for UX issues. Backed by CSV knowledge bases (styles, colors, typography, charts, icons, landing patterns, UX guidelines, per-stack guidance with plain HTML/CSS/JS as the default, plus React, Next.js, Vue, Svelte, Flutter, SwiftUI and more) and search/design-system scripts. |
| [`baseline-ui`](REF/SKILLS/baseline-ui) | Fast cleanup pass for UI code: fixes spacing, hierarchy, typography and small layout issues. Use when an interface needs quick polish. Its Tailwind/React rules are stack-gated; the rest is applied in plain CSS. |
| [`scroll-experience`](REF/SKILLS/scroll-experience) | Immersive scroll-driven experiences: parallax storytelling, scroll animations, interactive narratives and cinematic web pages. Prefers CSS scroll-driven animation and `IntersectionObserver` over libraries. Includes a detailed guide. |

### Three.js / 3D

| Skill | Description |
| --- | --- |
| [`threejs`](REF/SKILLS/threejs) | One router skill for 3D on the web with Three.js: scenes, cameras, geometry, materials, textures, lighting and shadows, animation, raycasting and controls, loaders, GLSL shaders and post-processing. `SKILL.md` stays small and points to 11 topic files in `references/`, so only the part you need is read. Three.js is an external library, so the agent asks before adding it to a project. |

### Project, Docs & Quality

| Skill | Description |
| --- | --- |
| [`project-summarizer`](REF/SKILLS/project-summarizer) | Keeps section 9 of the project context current (done, in progress, next, blockers, how to resume) so new sessions do not re-read the whole project. |
| [`doc-writer`](REF/SKILLS/doc-writer) | READMEs, setup steps, design notes, handover and release notes written from the real code, with every command and path checked. |
| [`testing`](REF/SKILLS/testing) | Manual browser checklists and native checks first (console, responsive, keyboard, accessibility, forms); test tools only with your approval. |

### Simulation, Motion & Art

| Skill | Description |
| --- | --- |
| [`interactive-simulation`](REF/SKILLS/interactive-simulation) | Interactive product simulations, configurators and browser games for clients: model/view split, fixed-timestep loop, physics basics, parameter controls, performance budget, client delivery. Plain Canvas/SVG first; 3D through `threejs` after approval. |
| [`3d-scene-builder`](REF/SKILLS/3d-scene-builder) | Art-directed, game-like 3D scenes for client websites: brief, engine and asset-level choice (Three.js or Unity), art direction, primitive blockout, materials and lighting, interaction, performance budget and embedding. Libraries and paid assets need your approval. |
| [`unity-scene-builder`](REF/SKILLS/unity-scene-builder) | Professional Unity scenes for web delivery: scene-as-code editor scripts, orbit camera, hotspots, simulation script, WebGL build settings, JavaScript bridge and website embed template. Scripts only: Asset Store assets stay local and out of git. Untested in the Unity editor until you run it. |
| [`css-motion`](REF/SKILLS/css-motion) | Native CSS/Web Animations motion: transitions, keyframes, scroll-driven animation, FLIP, reduced motion. No animation libraries. |
| [`art-svg-canvas`](REF/SKILLS/art-svg-canvas) | Illustrations, icons, patterns and generative art in SVG, CSS and Canvas. No image services. |

### Security

| Skill | Description |
| --- | --- |
| [`security-review`](REF/SKILLS/security-review) | Checklist review of web code: secrets, XSS, input, forms, headers, third-party scripts, dependencies, storage, APIs. Findings as severity, `file:line`, fix. |

### Mechatronics

| Skill | Description |
| --- | --- |
| [`cad-firmware`](REF/SKILLS/cad-firmware) | Parametric CAD and printable-part rules, Arduino/ESP32 C++ habits, pin maps, wiring and BOM docs, and a hardware safety checklist. Uses your toolchain; asks before proposing a new one. |

### Improving the agent

| Skill | Description |
| --- | --- |
| [`reflect`](REF/SKILLS/reflect) | Reviews a session for corrections and approvals and proposes small, confidence-tagged edits to skills as a diff. Manual: nothing changes without your approval. |

### Writing & Skill Authoring

| Skill | Description |
| --- | --- |
| [`agent-builder`](REF/SKILLS/agent-builder) | Builds your own complete AI agent: mission, identity, scope, rules, tools, skills, memory, reports and tests. Gathers and verifies your sources, checks licenses, creates the skills it needs, and trials the agent on three tasks before handover. Includes an agent file template. |
| [`writing-skills`](REF/SKILLS/writing-skills) | Creating, updating and improving agent skills. Includes templates, testing guidance (including subagent testing), anti-rationalization and CSO references, and Anthropic best practices. |
| [`writing-great-skills`](REF/SKILLS/writing-great-skills) | Reference for writing and editing skills well: the vocabulary and principles that make a skill predictable. Includes a glossary. Manual invocation only. |
| [`writing-guidelines`](REF/SKILLS/writing-guidelines) | Reviews files for compliance with Vercel's Writing Guidelines. Fetches the latest rules at runtime (requires network access) and reports findings in terse `file:line` format. |

---

## 📚 Skill Sources & Credits

Several skills are imported from community and upstream projects. Each `SKILL.md` records its origin in its frontmatter (`source`, `license`, etc.), including:

- [`ibelick/ui-skills`](https://github.com/ibelick/ui-skills) (`baseline-ui`, MIT)
- [`CloudAI-X/threejs-skills`](https://github.com/CloudAI-X/threejs-skills) (`threejs`)
- [`mattpocock/skills`](https://github.com/mattpocock/skills) (`writing-great-skills`, MIT)
- [`vercel-labs/agent-skills`](https://github.com/vercel-labs/agent-skills) (`writing-guidelines`)
- Ideas for `ui-ux-pro-max`, `testing`, `security-review`, `css-motion`, `art-svg-canvas` and `interactive-simulation` come from public community skill lists (Anthropic `anthropics/skills`, `vercel-labs/agent-skills`, `trailofbits/skills`, `majidmanzarpour/threejs-game-skills`). The skills here are original text written for this repo; no third-party skill text was copied.
- `vibeship-spawner-skills`, Apache 2.0 (`scroll-experience`)

Check each skill's frontmatter for its exact license before reuse.
