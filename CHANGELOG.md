# Changelog

Versions follow `vMAJOR.MINOR.PATCH`. Every commit on `main` starts with the version it belongs to, for example `v1.2.0: summary`.
Git tags cannot be pushed from the environment these updates were made in, so the commit prefix and this file are the version record.

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
