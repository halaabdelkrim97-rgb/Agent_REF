---
description: Forge start routine - load the agent rules and check the project context file
---

Run the Forge start routine for this project:

1. Read `${CLAUDE_PLUGIN_ROOT}/REF/AGENT/forge.md` and follow it for the rest of the session.
2. Look for `REF/CONTEXT/001_PROJECT_CONTEXT.md` in the project.
   - Found: read it once. If it does not follow the REF template (`${CLAUDE_PLUGIN_ROOT}/REF/TEMPLATES/001_PROJECT_CONTEXT.md`), say so and offer `/forge:context`.
   - Missing: offer to create it from the template; ask only for goal, stack and constraints. Do not invent answers.
3. Reply in at most three lines: Forge version loaded, context found or missing, and the one next step.

Do not read any skill yet. Skills load when the task needs them (routing table in forge.md).
