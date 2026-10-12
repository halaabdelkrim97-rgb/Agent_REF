---
name: git-workflow
description: Git habits for clean history - branches, small commits, version-prefixed messages, safe pushes, pull requests, changelogs and recovery. Use when committing, branching, versioning, pushing, opening a PR or undoing a git mistake.
metadata:
  source: original (Agent_REF)
  date_added: '2026-10-12'
---

# Git Workflow

## Before every commit
1. `git status` and `git diff`: read what will be committed. One logical change per commit.
2. No secrets, tokens, `.env`, client data, paid assets or build output. Check `.gitignore`.
3. Run the project's checks (or the `testing` steps). Do not commit known-broken work to `main`.

## Commit messages
- Follow the project's convention. In REF projects: `vX.Y.Z: short summary`, then a blank line and bullets of what changed and what was not tested.
- Otherwise: imperative present tense, under about 72 characters ("Add contact form validation"). Explain why in the body when it is not obvious.
- Add the attribution trailers the environment requires.

## Branches and pushes
- Small work on a short-lived branch `type/short-name` (`feat/`, `fix/`, `docs/`) and merge when verified. A solo repo may use `main` if the user says so.
- Ask before pushing unless the user told you to push. Never force-push `main` or rewrite shared history. Never skip hooks.
- Pull or fetch before pushing. Resolve conflicts by reading both sides, then re-run the checks.

## Versions and changelog
- Semantic versions: MAJOR breaking, MINOR new feature, PATCH fix. Update the version file, `CHANGELOG.md` (newest first, user-visible changes) and the README together.
- If tags cannot be pushed in this environment, the commit prefix and changelog are the record; say so.

## Pull requests
Title in the same style. Body: what and why, how it was tested (and what was not), risks, screenshots for UI. Keep PRs small.

## Recovery (ask before anything destructive)
| Situation | Safe move |
| --- | --- |
| Last commit message wrong, not pushed | `git commit --amend` |
| Undo last commit, keep changes | `git reset --soft HEAD~1` |
| Undo a pushed commit | `git revert <sha>` |
| Discard changes in one file | `git restore <file>` (loses edits: confirm first) |
| Find which commit broke it | `git bisect` |
| Lost work | `git reflog` first, before anything else |
`reset --hard`, `clean -fd`, force pushes and branch deletes need the user's explicit yes.
