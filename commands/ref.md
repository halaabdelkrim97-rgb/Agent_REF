---
description: Load the REF rules and project context for this session
---

Load the REF framework for this project:

1. Read the rules in `${CLAUDE_PLUGIN_ROOT}/REF/RULES/agent-rules.md` and follow them for the rest of this session.
2. If `REF/CONTEXT/001_PROJECT_CONTEXT.md` exists in the project, read it. If it does not, offer to create it from `${CLAUDE_PLUGIN_ROOT}/REF/TEMPLATES/001_PROJECT_CONTEXT.md` and ask the user for the missing details.
3. Reply in two lines: the rules version loaded, and whether the project context was found.

Do not read any skill yet. Skills load when their description fits the task.
