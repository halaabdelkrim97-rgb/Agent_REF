# Agent_REF

A lightweight context framework designed to ground AI coding agents in your project's specific domain logic, business rules, and technical requirements.

---

## 🚀 Quick Start

1. In your project, create the `REF/CONTEXT` folder and the `001_PROJECT_CONTEXT.md` file, then fill it with your project's general description and business rules.
2. Copy the text in `agentrules.md` inside your agent instructions, and it will perform automatically.
   
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
│        agentrules.md         │ ──► Enforces execution rules & operational guidelines
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│ Context-Aware Code & Output  │ ──► Generates tailored, production-ready code
└──────────────────────────────┘
```

1. **Context Reading:** The agent reads `001_PROJECT_CONTEXT.md` to understand your project's background and logic.
2. **Rule Enforcement:** The agent follows the rules defined in `agentrules.md`.
3. **Execution:** Code and tasks are executed automatically aligned with your setup.

---

## 📁 Repository Structure

```
Agent_REF/
├── README.md
└── REF/
    ├── RULES/
    │   └── agent-rules.md      # System prompt / execution rules for the agent
    └── SKILLS/                 # 22 skills, one folder each (SKILL.md + optional references)
```

---

## 🧰 Skills

All skills live in [`REF/SKILLS/`](REF/SKILLS). Each skill is a folder containing a `SKILL.md` (with `name` and `description` frontmatter) and, for some, extra `references/`, data, or scripts. The agent inspects this folder on every prompt, loads the relevant skills, and reports which ones it used.

### Planning & Process

| Skill | Description |
| --- | --- |
| [`brainstorming`](REF/SKILLS/brainstorming) | Mandatory before any creative work (features, components, behavior changes). Explores intent, requirements and design through one-question-at-a-time dialogue, and requires an approved design before any implementation starts. |
| [`writing-plans`](REF/SKILLS/writing-plans) | Turns a spec or requirements into a detailed multi-step implementation plan before touching code: bite-sized tasks, exact files, tests, and frequent commits. Plans are saved to `docs/plans/`. |

### Engineering & Code Quality

| Skill | Description |
| --- | --- |
| [`backend-architect-skill`](REF/SKILLS/backend-architect-skill) | Scalable API and backend design: REST/GraphQL/gRPC, microservices, event-driven architecture, service boundaries, inter-service communication, resilience patterns and observability. Use when creating new backend services or APIs. |
| [`frontend-developer-skill`](REF/SKILLS/frontend-developer-skill) | Builds React components and responsive layouts, handles client-side state, and focuses on performance and accessibility (React 19, Next.js 15). Use when creating UI components or fixing frontend issues. |
| [`cc-skill-coding-standards`](REF/SKILLS/cc-skill-coding-standards) | Universal coding standards, best practices and patterns for TypeScript, JavaScript, React and Node.js. |

### UI / UX Design

| Skill | Description |
| --- | --- |
| [`ui-ux-pro-max`](REF/SKILLS/ui-ux-pro-max) | Comprehensive design guide for web and mobile apps: designing components and pages, choosing color palettes and typography, and reviewing code for UX issues. Backed by CSV knowledge bases (styles, colors, typography, charts, icons, landing patterns, UX guidelines, per-stack guidance for React, Next.js, Vue, Svelte, Flutter, SwiftUI and more) and search/design-system scripts. |
| [`baseline-ui`](REF/SKILLS/baseline-ui) | Fast cleanup pass for UI code: fixes spacing, hierarchy, typography and small layout issues. Use when an interface needs quick polish. |
| [`scroll-experience`](REF/SKILLS/scroll-experience) | Immersive scroll-driven experiences: parallax storytelling, scroll animations, interactive narratives and cinematic web pages. Includes a detailed guide. |

### Three.js / 3D

| Skill | Description |
| --- | --- |
| [`threejs-skills`](REF/SKILLS/threejs-skills) | Entry point for creating 3D scenes, interactive experiences and visual effects with Three.js (WebGL, 3D visualizations, animations). |
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
