# Working on Agent_REF with Codex

Read `CLAUDE.md` for repository maintenance rules and `agent/forge.md` for shared Forge behavior. These files are instructions, not a connection to a running Claude session.

Load relevant skills directly from `skills/<name>/SKILL.md`; Claude plugin commands are not required. Use plain-language equivalents of Forge commands when slash commands are unavailable.

Before editing, inspect the branch, worktree status and current diff. Preserve other agents' uncommitted work. Follow Forge section 8 for handoffs and ownership. Never claim that GitHub access automatically starts or messages another agent.

For projects using Forge, add a project `AGENTS.md` pointing to the actual installed Forge file and skill directory. Do not assume this repository is installed in every project.
