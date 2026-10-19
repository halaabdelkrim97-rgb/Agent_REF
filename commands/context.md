---
description: Check, migrate or create project documentation in the Forge docs structure
---

Use `doc-writer` and `${CLAUDE_PLUGIN_ROOT}/templates/DOCUMENTATION.md` to inventory, organize and migrate project documentation into `docs/`. Inspect legacy `REF/` and existing destinations first; do not overwrite conflicts or discard content.

1. If the file does not exist: create it from `${CLAUDE_PLUGIN_ROOT}/templates/001_PROJECT_CONTEXT.md`. Fill what you can verify from the project files (name, stack actually in use, how to run). Ask the user for goal, constraints and visual identity. Never invent.
2. If it exists: map its content to the template's ten sections. Keep every fact the user wrote; move detailed facts to `docs/source-of-truth/` and plans to `docs/plans/`, with links in the index. Keep uncertain or conflicting claims with provenance. Do not drop anything.
3. Update section 9 (done, in progress, next, blockers, how to resume) from `git log` and the current state, and section 10 (visual identity and references) from what the project and conversation show.
4. Verify moved files, references and relevant checks. Preserve originals when collisions or other blockers cannot be resolved safely. Respect the user's existing authorization.
5. Report what changed, what remains unknown and any retained legacy files or blockers.

Open only the files needed. Keep the file under about 150 lines.
