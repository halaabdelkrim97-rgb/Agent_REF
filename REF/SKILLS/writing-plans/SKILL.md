---
name: writing-plans
description: Plan complex or dependent work from defined requirements with scope, affected files, acceptance criteria and validation. Use for multi-stage implementation or a requested plan; keep bounded tasks to short steps without duplicating code.
metadata:
  source: community
  date_added: '2026-02-27'
---

# Writing Plans

Use the existing or approved stack. Preserve user decisions and authorization. Plan only enough to make implementation and verification clear.

## Choose the size
- Small defined task: state a few steps in the conversation; no plan file required.
- Complex work, handoff or requested written plan: update an existing plan, or save `docs/plans/YYYY-MM-DD-<feature>.md`.
- Unresolved material requirements: use brainstorming to resolve those choices, not to repeat the entire discovery process.

## Plan contents
State the goal, constraints and acceptance criteria. For each coherent deliverable include affected paths (verified when possible), dependencies, implementation intent, checks and expected behavior. Name uncertain paths as provisional. Include risks only when material.
Do not write the complete implementation twice. Use pseudocode or a short interface contract only where ambiguity justifies it. Prefer meaningful behavior checks to tests that merely repeat implementation. Use the project's existing tools; do not add test frameworks by default.
Group steps by independently verifiable outcomes, not arbitrary minute counts or a commit after every micro-action. Include required release checks.

## Execution
When the user asked to implement, continue after planning within their authorization; do not end with another execution-choice question. Use the current worker by default. Another agent requires an available authorized mechanism and a concrete benefit. Mark actual progress and blockers without duplicating the plan in context and handoff.
Do not push, deploy or make other consequential changes without the required authorization. A plan is not blanket permission.

## Optional reference
The [legacy detailed plan format](references/legacy-planning.md) is preserved for users who explicitly want a comprehensive workshop. Mandatory full-code plans, per-step commits and execution-choice prompts there are superseded by this entry point.
