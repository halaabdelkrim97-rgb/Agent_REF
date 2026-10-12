---
name: reflect
description: Improves the REF skills over time. Reviews the session for corrections and approvals, then proposes small, confidence-tagged edits to skills or rules as a diff for the user to approve. Use when the user runs /reflect, says a skill got something wrong, or asks to learn from this session.
metadata:
  source: original (Agent_REF), pattern from public self-improving-skills write-ups
  date_added: '2026-10-12'
---

# Reflect

Manual by design: nothing changes a skill without the user approving the diff.

## Procedure
1. Pick the target: the skill the user names, or the skill that was used when the correction happened. If unclear, ask.
2. Scan the session for three signals only: **corrections** the user made, **approvals** the user confirmed, and **repeated patterns** that worked.
3. For each signal, write one proposed learning: the rule, where it goes (skill file and section) and why. Skip anything that is a one-off preference for the current task.
4. Tag each learning with confidence:
   - **High**: an explicit "always" or "never" from the user.
   - **Medium**: a pattern that worked more than once.
   - **Low**: a single observation. Record it as a note only if the user wants it.
5. Show the proposed edits as a diff. Keep each edit small, and merge with an existing rule instead of adding a duplicate.
6. After approval only: apply the edit, run `python3 scripts/package_skills.py --check` if the repo has it, and commit with a message that says which skill changed and why.

## Guardrails
- Never edit a skill without approval. Never run automatically unless the user has set that up and asked for it.
- Never add rules that weaken the vanilla-first policy, the permission rules, or honesty and security rules.
- Never store secrets, personal data or client names in a skill.
- Prefer deleting or tightening a rule to piling on more text. A skill that grows without limit costs tokens every time.
- Keep a changed skill's description accurate and under 1024 characters.
- If a correction shows a skill is wrong or unclear, fix the wording; if it shows the rules file is wrong, propose that edit separately.
