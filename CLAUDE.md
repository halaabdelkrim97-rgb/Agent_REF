# Working on the Agent_REF repo

This repo holds the REF rules, templates and skills. When you change it:

1. Follow `REF/RULES/agent-rules.md`. Vanilla-first: do not add dependencies to the repo's own tooling (the scripts use the Python standard library only).
2. Skills live in `REF/SKILLS/<name>/SKILL.md`. Frontmatter keys allowed: `name`, `description`, `license`, `compatibility`, `metadata`, `allowed-tools`. `name` equals the folder name. Description under 1024 characters: what it does and when to use it.
3. Keep `SKILL.md` short (aim under about 200 lines). Move detail to `references/` and point to it. Do not delete content when trimming: move it and check that no line was lost.
4. Never commit paid or licensed assets, secrets or client data. Third-party code needs its license file next to it.
5. Before every push run `python3 scripts/package_skills.py --check`, check README links, and update the README skill table, `CHANGELOG.md`, the version in README, rules, and `.claude-plugin/*.json`.
6. Commit message starts with the version prefix (`vX.Y.Z: ...`). Push to `main`. Tags cannot be pushed from some environments; the commit prefix and CHANGELOG are the record.
7. Say plainly what was tested and what was not.
