---
name: doc-writer
description: Writes and updates project documentation from the real code - README, setup and run steps, specs, handover notes, changelogs and code comments, and keeps the project context file current. Use when asked to document, write a README, explain how a project works, wrap up or hand off, for /forge:context, or when docs are out of date after a change.
metadata:
  source: original (Agent_REF)
  date_added: '2026-10-12'
---

# Doc Writer

Documentation must describe what exists. If it is not in the code or the project context, do not write it.

## Procedure
1. Find what is already documented (README, `docs/`, comments) and match its style and language. Update before creating new files.
2. Read only the files the document is about. Take commands, paths, names and options from the code, not from memory.
3. Verify every command and path you write down (run it, or check that the file exists). Say what you could not verify.
4. Write for the reader named in the request. If none is named, assume a developer new to the project.
5. Keep docs in sync: when a change alters behavior, update the matching doc in the same change.

## Choose the document
| Need | Write |
| --- | --- |
| First contact with the project | README: what it is, how to run it, folder map, how to contribute |
| How to build/test/deploy | Exact steps, one command per line, expected result |
| Why it is built this way | Short design note: problem, options, decision, consequences |
| Handover | What works, what does not, where things are, next steps (context file upkeep below) |
| API or module use | Purpose, inputs, outputs, one runnable example |
| Release notes | Version, date, user-visible changes, breaking changes |

## Project context file
`docs/PROJECT_CONTEXT.md` is the compact overview and index. Keep it current after substantial work, at wrap-up or handoff, when it is missing, and for `/forge:context`. Put detailed current facts and decisions in `docs/source-of-truth/` and plans in `docs/plans/`. Follow `templates/DOCUMENTATION.md` from the Forge installation for lossless migration; use `references/project-context.md` for context upkeep. Do not create a competing summary file.

## Compact context and handoffs
Keep context under about 150 lines by linking detailed specs, not deleting requirements. Section 5 is the navigation index: entry points, module ownership and paths to detailed documents. Read task-relevant linked detail on demand. Section 9 holds current status, not a chronological transcript.
Update documentation only when its facts change. Keep task ownership and checks in `docs/HANDOFF.md` using the shared template; this operational record is not another project summary. Link commits for detailed changes. Avoid copying the same status into multiple documents or reading the generated Hub as startup context.

## Style
- Short sentences, active voice, present tense. Lead with what the reader needs first.
- One idea per paragraph. Use a table only to compare things, a list only for steps or parallel items.
- Code blocks for commands and code. Name the language.
- No marketing wording, no claims you cannot back, no screenshots of text.
- Comments in code explain why, not what. Do not restate the line below.

## Check before finishing
- Every link, path and command works or is marked unverified.
- Nothing documents a feature that does not exist.
- No secrets, tokens or private data.
