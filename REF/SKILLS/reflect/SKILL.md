---
name: reflect
description: End-of-day and end-of-session self-improvement: reviews the session or today for corrections, approvals and token waste, skips what exists, proposes small edits for approval. Use for /forge:improve or when a skill got something wrong.
metadata:
  source: original (Agent_REF), pattern from public self-improving-skills write-ups
  date_added: '2026-10-12'
---

# Reflect (improve mode)

Manual by design: nothing is saved or changed without the user's approval. Command: `/forge:improve`.

## Scope (ask once if not stated)
- **This session** (default): the current conversation.
- **Today:** today's Claude Code transcripts for this project only (`~/.claude/projects/`), read after the user agrees. Never read other projects.

## Procedure
1. **Collect** three signals: **corrections** the user made, **approvals** they confirmed, **repeated patterns** that worked. Add **token waste**: skills opened but unused, files read twice, long replies, unneeded tool calls.
2. **Skip what exists.** Check the learnings file `REF/CONTEXT/forge-learnings.md`, the context file, the installed skills and the Forge rules. Drop any item already covered and report how many were skipped. Merge near-duplicates into one rule.
3. **Classify each remaining item:**
   - *Project lesson* (this project's conventions, client preferences, constraints) -> `REF/CONTEXT/forge-learnings.md`.
   - *Skill or Forge improvement* (applies to any project) -> a proposal for the Agent_REF repo. In a project session, never edit installed skill or Forge files; write the proposal in the learnings file under "Proposals for Agent_REF" so it can be applied later in the repo.
4. **Tag confidence:** High (explicit "always" or "never"), Medium (worked more than once), Low (single observation; keep only if the user wants it).
5. **Show a short list** (rule, destination, confidence) and wait for approval.
6. **Apply only approved items.** In the Agent_REF repo: edit the skill, run `python3 scripts/package_skills.py --check`, bump the version, update the CHANGELOG, commit with the version prefix.
7. **Update the context file** with `doc-writer` (project context file: status, decisions, visual identity) and show the diff.
8. **Finish** with the session report: skills used, tokens (only figures the environment shows), learned, skipped, tomorrow's first step.

## Learnings file format
```
# Forge learnings (project)
## Rules
- [high] <rule>. (YYYY-MM-DD)
## Proposals for Agent_REF
- [medium] <skill or Forge change>. (YYYY-MM-DD)
```
Keep it under about 60 lines; merge and delete obsolete entries.

## Guardrails
- Never weaken the vanilla-first policy, permission rules, honesty or security rules.
- Never store secrets, client data or personal data.
- Prefer tightening or deleting a rule to adding text: every line costs tokens each time it loads.
- Keep descriptions accurate and under 1024 characters.
