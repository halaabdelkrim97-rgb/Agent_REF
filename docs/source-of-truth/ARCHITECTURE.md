# Forge architecture

## Maintained components

- `agent/forge.md`: shared Forge behavior and task routing.
- `skills/`: skill entry points, optional references and Hub templates.
- `templates/`: reusable project context, documentation migration, visual brief and handoff guidance.
- `commands/`: Claude Code command definitions.
- `.claude-plugin/`: plugin and marketplace manifests.
- `scripts/package_skills.py`: validates skill metadata and packages skills.
- `scripts/sync_hub_skills.py`: synchronizes the Hub template's skill catalog with the README and agent version.
- `scripts/hub_inline.py`: combines Hub files for publishing.
- `AGENTS.md` and `CLAUDE.md`: repository instructions for their respective hosts.

## Project documentation

`docs/PROJECT_CONTEXT.md` is a compact index. Detailed current records live under `docs/source-of-truth/`; plans live under `docs/plans/`; the optional Project Hub lives under `docs/hub/`. The migration procedure is specified in `templates/DOCUMENTATION.md`. Required tool files and repository release documentation remain at their expected paths.
