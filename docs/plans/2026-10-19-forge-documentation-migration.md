# Forge documentation migration plan

**Status:** implementation complete; local validation recorded in [the migration review](../reviews/2026-10-19-v3-migration-review.md). User approved a major Forge repository migration and local Graphify if Cloud is unavailable. Existing projects are migrated when Forge is used there; the Quatra workspace is outside this change.

## Goal

Place project documentation under `docs/`, with a concise entry point, a source of truth and development plans. Remove the project `REF/` convention without losing existing documentation or hiding uncertain facts. Deliver the approved major-version update to the shared Forge repository.

## Decisions

- Rename the shared repository's `REF/` directory as well as retiring the project `REF/` convention. Provide explicit upgrade instructions for existing plugin and copy installations.
- Try Graphify Cloud first, then use a local Graphify environment. Do not claim graph-based coverage without a successful graph query and an identified repository revision.

## Baseline

- Shared repository baseline: `f3bacff`, Forge v2.12.1.
- `python scripts/package_skills.py --check`: 39 of 39 skills passed.
- `python scripts/sync_hub_skills.py --check`: catalog is up to date.
- Core instruction file: 10,656 bytes and 95 lines; context template: 2,135 bytes and 45 lines. These are file sizes, not token counts.
- Graphify Cloud was unavailable; local Graphify was installed in an isolated workspace environment and used for code-only extraction. See the review for scope and findings.

## Work

1. Map consumers of old paths: setup, plugin manifests, commands, skills, templates, Python scripts, links and installed projects. Use Graphify once connected and verify important edges against source.
2. Define the new `docs/` layout, source-of-truth precedence, plan lifecycle, selective reads, handoff and Hub paths. Make migration collision-safe, lossless and explicit about unverified information.
3. Update the shared agent, entry points, commands, templates, skills and scripts. Preserve historical material as historical and document the breaking changes and upgrade path.
4. Provide a careful, collision-safe migration workflow for existing projects; do not migrate the Quatra project in this change.
5. Validate plugin metadata, package all skills, synchronize the Hub catalog, and check links and paths. Live new-install and existing-project migration scenarios, including destination collisions and repeat runs, remain untested.
6. Measure startup instruction size and, if available, actual model token usage and end-to-end timings for comparable representative tasks. Report methodology, environment and limitations; do not infer token savings from byte counts.
7. Review the complete diff, commit and push to the selected shared repository after validation. Never force-push.

## Acceptance criteria

- New guidance consistently points to the approved `docs/` structure and provides a non-destructive path for existing projects.
- All applicable repository checks pass, or failures and untested host/plugin behavior are explicitly reported.
- Performance claims include measured data or state that measurements were unavailable.
- Graphify results identify the queried repository and working-tree baseline; their evidence is distinguished from ordinary text searches. Local extraction is not a Cloud index.
