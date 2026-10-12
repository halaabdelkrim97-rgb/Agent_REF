---
description: Check, migrate or create the project context file so it follows the REF template
---

Make `REF/CONTEXT/001_PROJECT_CONTEXT.md` follow the REF template. Use the `project-summarizer` skill.

1. If the file does not exist: create it from `${CLAUDE_PLUGIN_ROOT}/REF/TEMPLATES/001_PROJECT_CONTEXT.md`. Fill what you can verify from the project files (name, stack actually in use, how to run). Ask the user for goal, constraints and visual identity. Never invent.
2. If it exists: map its content to the template's ten sections. Keep every fact the user wrote; move it to the right section; add missing sections as empty placeholders; remove only exact duplicates. Do not drop anything.
3. Update section 9 (done, in progress, next, blockers, how to resume) from `git log` and the current state, and section 10 (visual identity and references) from what the project and conversation show.
4. Show the diff and wait for approval before saving, unless the user said to save directly.
5. End with one line: what changed, and anything still unknown.

Open only the files needed. Keep the file under about 150 lines.
