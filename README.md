# Agent_REF

**Version v1.2.0** · see [CHANGELOG.md](CHANGELOG.md). Every update to `main` has a commit prefixed with its version, for example `v1.2.0: ...`.

A lightweight context framework designed to ground AI coding agents in your project's specific domain logic, business rules, and technical requirements.

---

## 🚀 Quick Start

1. In your project, create the `REF/CONTEXT` folder. Copy [`REF/TEMPLATES/001_PROJECT_CONTEXT.md`](REF/TEMPLATES/001_PROJECT_CONTEXT.md) into it and fill it with your project's description, business rules and current stack.
2. Copy the text in [`agent-rules.md`](REF/RULES/agent-rules.md) into your agent instructions, and it will perform automatically.

Default stack: native HTML, CSS and JavaScript. The agent will ask you before using anything else.

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
├── CHANGELOG.md                # version history (commits on main are prefixed vX.Y.Z)
├── scripts/
│   └── package_skills.py       # validates skills and builds upload-ready ZIPs for Claude chat
└── REF/
    ├── RULES/
    │   └── agent-rules.md      # System prompt / execution rules for the agent
    ├── TEMPLATES/
    │   └── 001_PROJECT_CONTEXT.md   # Copy into your project as REF/CONTEXT/001_PROJECT_CONTEXT.md
    └── SKILLS/                 # 22 skills, one folder each (SKILL.md + optional references)
```

---

## 🧰 Skills

All skills live in [`REF/SKILLS/`](REF/SKILLS). Each skill is a folder containing a `SKILL.md` (with `name` and `description` frontmatter) and, for some, extra `references/`, data, or scripts. Claude loads a skill when its description fits the task, so the agent does not need to read this folder on every prompt. If skills are not loaded natively, the agent reads only the index below and opens the relevant skills. It reports which skills it used.

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
| [`ui-ux-pro-max`](REF/SKILLS/ui-ux-pro-max) | Comprehensive design guide for web and mobile apps: designing components and pages, choosing color palettes and typography, and reviewing code for UX issues. Backed by CSV knowledge bases (styles, colors, typography, charts, icons, landing patterns, UX guidelines, per-stack guidance for React, Next.js, Vue, Svelte, Flutter, SwiftUI and more) and search/design-system scripts. |
| [`baseline-ui`](REF/SKILLS/baseline-ui) | Fast cleanup pass for UI code: fixes spacing, hierarchy, typography and small layout issues. Use when an interface needs quick polish. Its Tailwind/React rules are stack-gated; the rest is applied in plain CSS. |
| [`scroll-experience`](REF/SKILLS/scroll-experience) | Immersive scroll-driven experiences: parallax storytelling, scroll animations, interactive narratives and cinematic web pages. Prefers CSS scroll-driven animation and `IntersectionObserver` over libraries. Includes a detailed guide. |

### Three.js / 3D

| Skill | Description |
| --- | --- |
| [`threejs-skills`](REF/SKILLS/threejs-skills) | Entry point for creating 3D scenes, interactive experiences and visual effects with Three.js (WebGL, 3D visualizations, animations). Three.js is an external library, so the agent asks before adding it to a project. |
| [`threejs-fundamentals`](REF/SKILLS/threejs-fundamentals) | Scene setup, cameras, renderer, Object3D hierarchy and coordinate systems. |
| [`threejs-geometry`](REF/SKILLS/threejs-geometry) | Built-in shapes, `BufferGeometry`, custom geometry and instanced rendering. |
| [`threejs-materials`](REF/SKILLS/threejs-materials) | PBR, basic, phong and shader materials, and material properties and performance. |
| [`threejs-textures`](REF/SKILLS/threejs-textures) | Texture types, UV mapping, environment maps, cubemaps/HDR and texture settings and optimization. |
| [`threejs-lighting`](REF/SKILLS/threejs-lighting) | Light types, shadows, environment lighting (IBL) and lighting performance. |
| [`threejs-animation`](REF/SKILLS/threejs-animation) | Keyframe and skeletal animation, morph targets, animation mixing, GLTF animations and procedural motion. |
| [`threejs-interaction`](REF/SKILLS/threejs-interaction) | Raycasting, camera controls, mouse/touch input, object selection and click detection. |
| [`threejs-loaders`](REF/SKILLS/threejs-loaders) | Asset loading for GLTF models, textures, images and HDR environments, async patterns and loading progress. |
| [`threejs-shaders`](REF/SKILLS/threejs-shaders) | GLSL, `ShaderMaterial`, uniforms, custom vertex/fragment effects and extending built-in materials. |
| [`threejs-postprocessing`](REF/SKILLS/threejs-postprocessing) | `EffectComposer`, bloom, depth of field, color grading, blur and custom screen-space effects. |

### Writing & Skill Authoring

| Skill | Description |
| --- | --- |
| [`writing-skills`](REF/SKILLS/writing-skills) | Creating, updating and improving agent skills. Includes templates, testing guidance (including subagent testing), anti-rationalization and CSO references, and Anthropic best practices. |
| [`writing-great-skills`](REF/SKILLS/writing-great-skills) | Reference for writing and editing skills well: the vocabulary and principles that make a skill predictable. Includes a glossary. Manual invocation only. |
| [`writing-guidelines`](REF/SKILLS/writing-guidelines) | Reviews files for compliance with Vercel's Writing Guidelines. Fetches the latest rules at runtime (requires network access) and reports findings in terse `file:line` format. |

---

## 📚 Skill Sources & Credits

Several skills are imported from community and upstream projects. Each `SKILL.md` records its origin in its frontmatter (`source`, `license`, etc.), including:

- [`ibelick/ui-skills`](https://github.com/ibelick/ui-skills) (`baseline-ui`, MIT)
- [`CloudAI-X/threejs-skills`](https://github.com/CloudAI-X/threejs-skills) (`threejs-skills`)
- [`mattpocock/skills`](https://github.com/mattpocock/skills) (`writing-great-skills`, MIT)
- [`vercel-labs/agent-skills`](https://github.com/vercel-labs/agent-skills) (`writing-guidelines`)
- `vibeship-spawner-skills`, Apache 2.0 (`scroll-experience`)

Check each skill's frontmatter for its exact license before reuse.
