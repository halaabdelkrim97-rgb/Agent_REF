# Forge project documentation

## Layout

```text
docs/
├── PROJECT_CONTEXT.md        # Short overview and index
├── source-of-truth/          # Current detailed project facts and decisions
├── plans/                    # Roadmap, designs and development plans
├── hub/                      # Optional Project Hub
├── HANDOFF.md                # Optional shared handoff
└── forge-learnings.md        # Optional project lessons
```

Keep `PROJECT_CONTEXT.md` short and link to details. Create subject-specific source-of-truth files as needed, such as architecture, requirements, hardware, protocols, decisions or status. Do not create empty documents for their own sake. Record each material fact once and link to it; distinguish implemented, planned, unverified, disputed and historical statements. Include sources and dates where they affect interpretation. Mark unknowns explicitly.

Plans describe goals, scope, dependencies, tasks, status and acceptance criteria. Keep completed and superseded plans as history, label their status, and record lasting decisions in the source of truth. Update affected context, plans and Hub data when facts change. Tool-required files such as `AGENTS.md`, `CLAUDE.md`, package manifests and required root README files remain where their tools expect them and may link to `docs/`.

## Migration for an existing project

1. Inspect Git state and inventory existing documentation, `docs/`, legacy `REF/` and paths referenced by instructions, manifests, scripts, links and Hub data. Inspect the content needed to classify files and identify owners; exclude generated and dependency trees from routine scans unless affected. Preserve other agents' changes.
2. Build a source-to-destination map before moving anything. Map the old `REF/CONTEXT/001_PROJECT_CONTEXT.md` to `docs/PROJECT_CONTEXT.md`, `REF/CONTEXT/hub/` to `docs/hub/`, and handoffs, lessons, plans and detailed documents to their appropriate `docs/` locations. Preserve other project-owned material and its structure under a clearly named `docs/` subfolder when classification is uncertain. Keep code, tool configuration, dependencies and files required at fixed locations where they are.
3. Check destination collisions, case sensitivity, symlinks, ignored or untracked files, permissions and external references. Never overwrite or delete a differing file. Identical files may be consolidated only after their contents and references are checked. For unresolved collisions, ambiguous ownership or missing permissions, preserve both, report the blocked item and continue independent work.
4. Move or copy each item without losing bytes or metadata needed by the project; retain a recoverable original until verification succeeds. Update links, instructions, manifests and scripts only when their actual targets are known. Preserve historical records and mark stale paths as historical. Do not change unrelated source or remove generated files merely to make a tree look clean.
5. Reconcile the overview and detailed records against available evidence. Keep conflicting or uncertain claims with their sources and mark them for review; do not claim an untested feature works. Verify all moved files and affected links, run project-appropriate checks, and remove a legacy directory only after confirming it is empty and no required references remain. Follow user and host rules before any destructive action.
6. Report the mapping, validation, unresolved conflicts, retained legacy items and any steps requiring permission. Repeat visits should find the migrated structure without moving files again. The user may request a migration review at any time.

Migration should be deep enough to find affected documentation and references. After migration, return to task-based reads and targeted searches rather than scanning the project on every session.
