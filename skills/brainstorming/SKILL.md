---
name: brainstorming
description: Clarify materially ambiguous requirements and explore design choices when requested or needed. Use for open-ended new features and unresolved architecture; skip an extra discovery cycle for an already specified or approved task.
---

# Brainstorming

## Decide whether discovery is needed
Read the current request, relevant context and existing decisions. If the task is already defined or the user delegated implementation choices, proceed with a short stated approach; do not require another approval cycle. For small fixes, use the relevant implementation/debugging skill directly.

If a missing decision materially changes scope, architecture, cost or the user's visual vision, ask one focused question. Continue independent work while waiting. Do not reopen answered questions.

## Resolve the actual uncertainty
- Explore alternatives only where useful or requested. Usually two or three short options with concrete tradeoffs suffice; do not invent options for settled decisions.
- Preserve the user's aesthetic. Label suggestions as optional; choose only within delegated authority.
- Summarize goal, constraints, chosen approach and observable acceptance criteria. Use current user authorization; ask for approval only for a material unresolved commitment.
- For substantial design, update an existing spec or save a concise design note under `docs/plans/` when useful. Do not create or commit a separate design document for every component.
- Use writing-plans for complex dependent work. For a bounded task, a few task steps are sufficient; avoid a mandatory chain of planning skills.

## Optional reference
The [legacy workshop](references/legacy-workshop.md) preserves the original extended process for an explicitly requested design workshop. Its blanket gates, mandatory approvals and per-feature documents are historical guidance, not current requirements. This entry point governs routing and authorization.
