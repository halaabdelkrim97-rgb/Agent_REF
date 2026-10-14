---
description: Forge start routine - load the agent rules and check the project context file
---

Run the Forge start routine for this project:

1. Clear any session pause and resume Forge. Read `${CLAUDE_PLUGIN_ROOT}/REF/AGENT/forge.md` and follow it for the rest of the session.
2. Look for `REF/CONTEXT/001_PROJECT_CONTEXT.md` in the project.
   - Found: read it if not loaded or if changed since pausing. If it does not follow the REF template (`${CLAUDE_PLUGIN_ROOT}/REF/TEMPLATES/001_PROJECT_CONTEXT.md`), say so and offer `/forge:context`.
   - Missing: offer to create it from the template; ask only for goal, stack and constraints. Do not invent answers.
3. Check `REF/CONTEXT/hub/index.html`. Missing and the context file exists: offer to create it with `/forge:hub`.
4. Reply in at most three lines: Forge version loaded, context and hub found or missing, and the one next step.

Do not read any skill yet. Skills load when the task needs them (routing table in forge.md).
