---
description: Forge Project Hub - create or refresh the visual hub (context, tracks, plans, business plan, agent page, gaps)
---

Create or refresh the Project Hub for this project:

1. Read `${CLAUDE_PLUGIN_ROOT}/REF/SKILLS/project-hub/SKILL.md` and follow it.
2. Analyze the project as the skill says (list files, read only manifests) and decide which tabs, tracks and diagrams it needs.
3. Make sure `REF/CONTEXT/001_PROJECT_CONTEXT.md` exists (offer `/forge:context` if not). The hub is generated from it.
4. Create `REF/CONTEXT/hub/` from the skill templates (`index.html`, `hub-data.js`), or update only the changed fields in `hub-data.js`. If the user pasted gap decisions, record them first (context file section 7, then the gaps).
5. Publish or update it as an artifact if the Artifact tool is available; otherwise say where the folder is.
6. Reply in at most four lines: what the hub contains (tabs and diagrams), where it is, how many gaps are open (and how many block work).
