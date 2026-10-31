# Forge

**A development agent with shared instructions, task-specific skills, and project documentation that stays useful across sessions.**

Forge helps an AI assistant understand a project, work within its existing stack, document decisions, and report what it checked. This repository contains the agent instructions, 39 skills, templates, and Claude Code commands.

**Current version:** 3.2.0 · [Changelog](CHANGELOG.md) · [Documentation guide](templates/DOCUMENTATION.md) · [Skills](skills/)

---

## Start here

| Where you work | How to use Forge |
| --- | --- |
| **Claude Code** | Follow [Agent setup](#agent-setup-for-claude-code) below. |
| **Codex** | Read [Codex setup](#codex). |
| **Claude chat** | Read [Claude chat setup](#claude-chat). |

### Ask your agent to set up Forge

Open Claude Code in your project and send:

> Read https://github.com/halaabdelkrim97-rgb/Agent_REF/blob/main/README.md and follow the Agent setup section.

## Agent setup for Claude Code

These steps are for the assistant performing setup. Work in the user's project, preserve existing instructions and files, and report any skipped or blocked step.

1. Ask whether skills should be installed for **this project** (`.claude/skills/`) or **all projects** (`~/.claude/skills/`). Default to this project if the user has no preference.
2. Prefer the plugin route when available. In Claude Code, run:

   ```text
   /plugin marketplace add halaabdelkrim97-rgb/Agent_REF
   /plugin install forge@agent-ref
   ```

   The plugin provides the Forge skills and six `/forge:` commands. If plugin commands are unavailable, use the copy route in step 3. Plugin installation and command names have not yet been verified in a live Claude Code session.
3. **Copy route:** clone this repository into a temporary folder. Copy each folder from `skills/` into the selected skills directory, skipping and reporting existing folders. Copy `templates/` into the project's `.forge/templates/`, without overwriting existing files. Remove the temporary clone after copying.

   ```bash
   git clone --depth 1 https://github.com/halaabdelkrim97-rgb/Agent_REF.git
   ```

4. Inspect the project's `CLAUDE.md` for an existing Forge instruction block, including the older `FORGE — REF DEV AGENT` and `REF PROJECT AGENT` markers. If present, compare versions and offer a scoped update that preserves unrelated instructions. Otherwise append the contents of [`agent/forge.md`](agent/forge.md), creating `CLAUDE.md` if needed. Do not silently rewrite the Forge rules.
5. Run the start routine. Inventory existing project documentation and use the [documentation guide](templates/DOCUMENTATION.md) to plan and carry out a safe migration. If the project context is missing, use the [context template](templates/001_PROJECT_CONTEXT.md) and ask for unknown goals, stack, and constraints. Preserve collisions and unknown files; never invent project facts.
6. Report the installation location and skill count, whether Forge instructions were added or already present, documentation changes, and anything skipped. Ask the user to run `/skills` to check what Claude Code loaded.

Do not introduce frameworks, runtimes, or other dependencies during setup. Optional add-ons require the user's approval.

### Codex

The Claude Code plugin does not install itself into Codex. Give Codex access to [`agent/forge.md`](agent/forge.md) and the relevant [`skills/`](skills/) directory. In a project, retain existing instructions and use `AGENTS.md` to point to the actual Forge instruction and skill locations. Codex can follow the workflow in plain language; the Claude Code slash commands are not assumed to exist there.

### Claude chat

1. Run `python3 scripts/package_skills.py` from this repository to build skill ZIPs in `dist/`.
2. Upload the ZIPs using Claude's skills interface. Availability and interface names depend on the account and host.
3. Add [`agent/forge.md`](agent/forge.md) to the project or custom instructions, and add project context to the project's knowledge when available.
4. Ask for Forge actions in plain language, such as “Forge: start” or “Forge: report.”

## What Forge does

- **Starts with project context.** It reads the project overview, checks the documentation layout, and investigates the files relevant to the task.
- **Routes work to skills.** It loads the instructions needed for the current task, such as debugging, firmware, design, or documentation.
- **Keeps decisions accessible.** Current facts, plans, and open questions have clear places in the project documentation.
- **Works within the project.** It respects the existing architecture and approved tools, and asks before introducing new technology when required.
- **Reports evidence.** It identifies the skills used and distinguishes completed checks from work that could not be verified.

Forge is an instruction and skill collection. It does not automatically synchronize chat histories or invoke another agent; those capabilities depend on the host and its configuration.

## Project documentation

Forge uses this structure for project-owned documentation:

```text
docs/
├── PROJECT_CONTEXT.md       Short overview and index
├── source-of-truth/         Current facts and decisions
├── plans/                   Roadmaps, designs, and development plans
├── hub/                     Optional Project Hub
├── HANDOFF.md               Optional shared handoff
└── forge-learnings.md       Optional project lessons
```

Create detailed files as the project needs them. Keep unknowns and proposed work labeled, and link to authoritative facts instead of duplicating them. Files a tool requires at a particular location, such as `AGENTS.md`, `CLAUDE.md`, and root README files, stay where that tool expects them.

When Forge first works in an existing project, it inventories the documentation and references before migration. It maps old locations to the new layout, checks for conflicts and ownership, preserves uncertain material, and verifies moved files and links before removing an empty legacy directory. Follow the full [migration guide](templates/DOCUMENTATION.md).

### Upgrading from an earlier version

Version 3 changes paths. In this repository, `REF/AGENT/`, `REF/SKILLS/`, and `REF/TEMPLATES/` became `agent/`, `skills/`, and `templates/`. Existing projects may still have a `REF/CONTEXT/` directory; Forge reviews and migrates it when it is used in that project. Update installed plugin or copied files and custom references to the new locations. Preserve unresolved conflicts and legacy files until their contents and references are verified.

## Commands

Claude Code users can use the plugin commands. In other hosts, ask for the same action in plain language.

| Command | Purpose |
| --- | --- |
| `/forge:start` | Start or resume Forge; inspect project context and documentation. |
| `/forge:stop` | Pause Forge-specific behavior for this conversation. |
| `/forge:context` | Create, review, or migrate project documentation. |
| `/forge:hub` | Create or refresh the Project Hub. |
| `/forge:report` | Summarize the session, checks, skills, and available usage data. |
| `/forge:improve` | Review lessons and propose improvements for approval. |

## Project Hub

The optional Project Hub is a local HTML view of project context, plans, documentation, open questions, and agent information. Every project gets the same layout and house style (plain English, stages, hours only); the middle pages adapt to the project type, including software, mechatronics, and games. A matching A4 hours report (`report.html`) prints the plan as a PDF: summary, task map and one timeline per stage. Forge offers to create it when missing and updates affected information as the project changes. Unknown facts remain open; diagrams and estimates need appropriate evidence or confirmation.

Read the [`project-hub` skill](skills/project-hub/SKILL.md) for the details.

## Skills

Each skill lives in `skills/<name>/SKILL.md`; some include additional references or templates. Forge selects skills according to the task. Use the quick guide below, then open a skill directly from the catalog. You can also use your browser's page search to find a task or skill name.

### Find a skill by task

| I want to… | Start here |
| --- | --- |
| Plan a feature or clarify a design | [brainstorming](skills/brainstorming/SKILL.md), [writing-plans](skills/writing-plans/SKILL.md) |
| Find and fix a bug | [debugging](skills/debugging/SKILL.md) |
| Build or improve a frontend | [frontend-developer](skills/frontend-developer/SKILL.md), [baseline-ui](skills/baseline-ui/SKILL.md) |
| Design a backend or API | [backend-architect](skills/backend-architect/SKILL.md) |
| Work with ESP32, sensors, wiring, or CAD | [cad-firmware](skills/cad-firmware/SKILL.md) |
| Create a 3D experience or simulation | [3d-scene-builder](skills/3d-scene-builder/SKILL.md), [interactive-simulation](skills/interactive-simulation/SKILL.md) |
| Check accessibility, security, or performance | [accessibility](skills/accessibility/SKILL.md), [security-review](skills/security-review/SKILL.md), [seo-performance](skills/seo-performance/SKILL.md) |
| Write project docs or make a hub | [doc-writer](skills/doc-writer/SKILL.md), [project-hub](skills/project-hub/SKILL.md) |
| Explore code relationships | [graphify](skills/graphify/SKILL.md) |
| Create or improve an agent or skill | [agent-builder](skills/agent-builder/SKILL.md), [writing-skills](skills/writing-skills/SKILL.md) |
| Commit or push changes | [git-workflow](skills/git-workflow/SKILL.md) |

### Skill catalog

| Area | Skills |
| --- | --- |
| Planning and delivery | [brainstorming](skills/brainstorming/SKILL.md), [writing-plans](skills/writing-plans/SKILL.md), [client-delivery](skills/client-delivery/SKILL.md), [git-workflow](skills/git-workflow/SKILL.md) |
| Engineering | [backend-architect](skills/backend-architect/SKILL.md), [frontend-developer](skills/frontend-developer/SKILL.md), [coding-standards](skills/coding-standards/SKILL.md), [debugging](skills/debugging/SKILL.md), [i18n-forms](skills/i18n-forms/SKILL.md) |
| Design and interface | [art-direction](skills/art-direction/SKILL.md), [ui-ux-pro-max](skills/ui-ux-pro-max/SKILL.md), [baseline-ui](skills/baseline-ui/SKILL.md), [ui-components-21st](skills/ui-components-21st/SKILL.md), [accessibility](skills/accessibility/SKILL.md), [art-svg-canvas](skills/art-svg-canvas/SKILL.md), [canvas-design](skills/canvas-design/SKILL.md), [nano-banana](skills/nano-banana/SKILL.md), [data-and-charts](skills/data-and-charts/SKILL.md) |
| Motion and 3D | [css-motion](skills/css-motion/SKILL.md), [framer-motion](skills/framer-motion/SKILL.md), [gsap](skills/gsap/SKILL.md), [scroll-experience](skills/scroll-experience/SKILL.md), [threejs](skills/threejs/SKILL.md), [3d-scene-builder](skills/3d-scene-builder/SKILL.md), [web-3d-assets](skills/web-3d-assets/SKILL.md), [interactive-simulation](skills/interactive-simulation/SKILL.md), [unity-scene-builder](skills/unity-scene-builder/SKILL.md) |
| Quality | [testing](skills/testing/SKILL.md), [security-review](skills/security-review/SKILL.md), [seo-performance](skills/seo-performance/SKILL.md) |
| Documentation and agents | [doc-writer](skills/doc-writer/SKILL.md), [project-hub](skills/project-hub/SKILL.md), [reflect](skills/reflect/SKILL.md), [graphify](skills/graphify/SKILL.md), [agent-builder](skills/agent-builder/SKILL.md), [writing-skills](skills/writing-skills/SKILL.md), [writing-great-skills](skills/writing-great-skills/SKILL.md), [writing-guidelines](skills/writing-guidelines/SKILL.md) |
| Hardware | [cad-firmware](skills/cad-firmware/SKILL.md) |

Graphify can help investigate code relationships when its service or local tooling is available. Graph output is evidence to inspect alongside source files, and its coverage depends on the indexed material.

## Repository map

```text
agent/             Forge's shared instructions
skills/            Task-specific skills and supporting files
commands/          Claude Code commands
templates/         Documentation, context, handoff, and visual templates
docs/              Forge's own context, plans, and reviews
scripts/           Skill packaging and Project Hub maintenance
examples/          Example projects
tests/             Release layout checks
.claude-plugin/    Plugin and marketplace manifests
```

`AGENTS.md` and `CLAUDE.md` contain instructions for working on this repository. See [CLAUDE.md](CLAUDE.md) for release practices.

## Performance and verification

Forge aims to keep context focused by reading relevant material on demand. Actual token use and performance depend on the host and task. The [v3 migration review](docs/reviews/2026-10-19-v3-migration-review.md) records the measurements and their limits; it does not claim verified token savings. Live plugin installation and a real project migration remain to be verified.

## Sources and reuse

Some skills originate in upstream projects, including [ibelick/ui-skills](https://github.com/ibelick/ui-skills), [CloudAI-X/threejs-skills](https://github.com/CloudAI-X/threejs-skills), [mattpocock/skills](https://github.com/mattpocock/skills), [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills), and `vibeship-spawner-skills`. Check each skill's metadata and accompanying license before reuse. The desk-fan example includes three.js and OrbitControls with their license. This repository does not currently have a repository-wide `LICENSE` file.
