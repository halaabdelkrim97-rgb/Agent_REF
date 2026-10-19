---
description: Forge start routine - load the agent rules and check the project context file
---

Run the Forge start routine for this project:

1. Clear any session pause and resume Forge. Read `${CLAUDE_PLUGIN_ROOT}/agent/forge.md` and follow it for the rest of the session.
2. Inventory existing project documentation and legacy `REF/` paths. Follow `${CLAUDE_PLUGIN_ROOT}/templates/DOCUMENTATION.md` for safe migration; retain files and report unresolved collisions or permissions. This deep inventory is a one-time migration, not a repeated full scan.
3. Look for `docs/PROJECT_CONTEXT.md`. Read it if not loaded or changed since pausing, then load only task-relevant linked documents. If missing, create it from `${CLAUDE_PLUGIN_ROOT}/templates/001_PROJECT_CONTEXT.md` when authorized; ask for unknown goal, stack and constraints. Do not invent answers.
4. Check `docs/hub/index.html`. Missing and the context file exists: offer to create it with `/forge:hub`.
5. Reply briefly: Forge version, context and hub status, migration blockers and next step.

Do not read any skill yet. Skills load when the task needs them (routing table in forge.md).
