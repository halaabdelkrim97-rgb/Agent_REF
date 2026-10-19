# Project Context

## 1. What this project is
Agent_REF distributes Forge instructions, skills, commands and templates for development projects.

## 2. Goals and non-goals
- Goal: maintain a consistent, verifiable Forge workflow across supported hosts.
- Non-goal: claim a host integration or performance improvement without evidence.

## 3. Business rules and domain logic
- Project documentation lives in `docs/`; retain required tool entry points at their expected paths.
- Preserve project content and report unresolved migration conflicts.

## 4. Tech stack (current)
- Markdown instructions, Python standard-library maintenance scripts, HTML, CSS and JavaScript Hub templates.
- Claude Code plugin manifests and commands; Codex reads repository instructions and skills directly.

## 5. Structure and conventions
- [Architecture and ownership](source-of-truth/ARCHITECTURE.md).
- [Documentation migration plan](plans/2026-10-19-forge-documentation-migration.md).
- [Documentation migration guide](../templates/DOCUMENTATION.md).

## 6. Constraints
- Preserve user work; keep version metadata and generated Hub catalog synchronized.
- Do not introduce new repository runtime dependencies without authorization.

## 7. Key decisions already made
- Version 3 removes the `REF/` directory convention and uses project `docs/` paths.
- Existing projects migrate when Forge is used there; unresolved collisions stay intact.

## 8. How to run, test and deploy
- Run `python scripts/package_skills.py --check` and `python scripts/sync_hub_skills.py --check` from the repository root.
- The repository maintenance instructions in `CLAUDE.md` define release checks.

## 9. Current status and next steps
- v3 documentation and path migration implemented; the [review](reviews/2026-10-19-v3-migration-review.md) records local checks and measurement limits. Live host migration and plugin behavior remain untested.

## 10. Visual identity and references
- To define.
