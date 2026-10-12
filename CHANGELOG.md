# Changelog

Versions follow `vMAJOR.MINOR.PATCH`. Every commit on `main` starts with the version it belongs to, for example `v1.2.0: summary`.
Git tags cannot be pushed from the environment these updates were made in, so the commit prefix and this file are the version record.

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
