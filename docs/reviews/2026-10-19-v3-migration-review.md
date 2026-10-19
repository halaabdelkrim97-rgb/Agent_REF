# Forge v3 migration review

## Scope and evidence

- Baseline: Agent_REF commit `f3bacff` (v2.12.1). The working tree was clean before this migration.
- Local Graphify `graphifyy` 0.9.92, code-only extraction of the working tree during migration: 26 supported code files, 2,282 nodes and 5,148 edges. Extraction took 9.5 seconds as reported by Graphify.
- Graphify skipped 111 documentation files and 28 unclassified files. It cannot establish documentation migration coverage. A separate source and path audit checked the README, manifests, commands, scripts, active skill instructions and templates.
- A local Graphify query for `package_skills` identified its `check`, `build_zip`, `read_frontmatter` and `main` relationships, plus shared imports with `sync_hub_skills.py`. The source was inspected directly to validate path changes. A requested 600-token graph output budget was exceeded by Graphify's own estimate; this is not measured model usage.
- Graphify Cloud was not connected. Local Graphify was used instead; no model-backed semantic extraction was performed.
- The later working-tree extraction covered 27 code files, 2,294 nodes and 5,163 edges in 25.8 seconds, skipping 114 documents. A query for the new manifest test returned the test node but also unrelated vendor matches and truncated the result at the requested budget. Narrower searches and source inspection remain necessary.
- After adding the last release-path check and moving the earlier generated graph outside the repository, a final code-only extraction found 27 code files, 2,295 nodes and 5,164 edges in 7.6 seconds; it still skipped 114 documents and 28 unclassified files. The output reflects the working tree before the release commit.

## Comparable instruction-size measurements

The old files come from `git show HEAD:<path>` at `f3bacff`; the new files come from the working tree. `tiktoken` 0.14.0 with `cl100k_base` provides a reproducible approximation for the text only. It is not necessarily the host model's tokenizer and excludes tool output, conversation, caching and actual model usage.

| Text | Before bytes | After bytes | Before tokens | After tokens |
| --- | ---: | ---: | ---: | ---: |
| Forge agent instructions | 10,561 | 11,789 | 2,096 | 2,321 |
| Project context template | 2,090 | 2,233 | 493 | 531 |

The agent file increased by 225 estimated tokens (10.7%); the template increased by 38 (7.7%). This is not a token-saving claim. The migration guide is loaded when needed and is not included in these figures. No actual before/after task token counts, dollar costs or end-to-end agent latency were available.

## Tool runtime sample

`scripts/package_skills.py --check` ran five times per version with the same Python 3.14.7 environment. Median elapsed time was 0.1151 seconds for v2.12.1 and 0.1107 seconds for v3.0.0. The old version ran first in a temporary archive and the new version second; cache and operating-system noise make this sample insufficient to claim a speedup.

## Validation and limitations

- All 39 skills pass the packaging metadata check; the Hub catalog synchronization check passes.
- Automated release checks cover manifest versions and paths, plugin command resources, active Markdown links, and a packaged `doc-writer` skill.
- Historical reference documents preserve their original text and explicitly resolve their relative links from the original skill directory. They are not treated as active instructions.
- Plugin registration, actual host startup and automatic migration of a real existing project have not been exercised. The migration is an agent procedure, not an automated migration script. Existing-project collision, ownership, symlink and rollback behavior must be reviewed in each live migration.
- A successful static link or metadata check does not prove a host loads or follows these instructions. Actual token costs and live performance remain unmeasured.
