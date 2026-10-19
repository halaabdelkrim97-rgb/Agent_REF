# Optional historical reference

Original material is preserved verbatim below. Follow the current SKILL.md for routing, approval, style and efficiency rules; conflicting blanket mandates below are superseded. Load only relevant sections when needed. Relative paths in the preserved text refer to the original skill directory; resolve them from that directory, not this archive folder.

---
name: writing-plans
description: Use when you have an approved spec or requirements for a multi-step task, before touching code. Produces a bite-sized implementation plan saved to docs/plans/.
metadata:
  source: community
  date_added: '2026-02-27'
---

# Writing Plans

## Overview

Write comprehensive implementation plans assuming the engineer has zero context for our codebase and questionable taste. Document everything they need to know: which files to touch for each task, code, testing, docs they might need to check, how to test it. Give them the whole plan as bite-sized tasks. DRY. YAGNI. TDD. Frequent commits.

Assume they are a skilled developer, but know almost nothing about our toolset or problem domain. Assume they don't know good test design very well.

**Announce at start:** "I'm using the writing-plans skill to create the implementation plan."

**Context:** Run this after brainstorming has produced an approved design. Using a separate git branch or worktree is optional, not required.

**Stack:** Plan with native HTML, CSS and JavaScript unless the project already uses something else. Never put a new framework, library, test runner or build tool in a plan without the user's approval. If one would clearly help, say so in the plan as a question for the user.

**Testing:** Use the project's existing test approach. For plain HTML/CSS/JS with no test setup, the "test" can be a manual browser check with exact steps and expected result.

**Save plans to:** `docs/plans/YYYY-MM-DD-<feature-name>.md`

## Bite-Sized Task Granularity

**Each step is one action (2-5 minutes):**
- "Write the failing test" - step
- "Run it to make sure it fails" - step
- "Implement the minimal code to make the test pass" - step
- "Run the tests and make sure they pass" - step
- "Commit" - step

## Plan Document Header

**Every plan MUST start with this header:**

```markdown
# [Feature Name] Implementation Plan

> **For Claude:** Implement this plan task-by-task, in order. Verify each task before starting the next.

**Goal:** [One sentence describing what this builds]

**Architecture:** [2-3 sentences about approach]

**Tech Stack:** [Key technologies/libraries]

---
```

## Task Structure

```markdown
### Task N: [Component Name]

**Files:**
- Create: `exact/path/to/file.py`
- Modify: `exact/path/to/existing.py:123-145`
- Test: `tests/exact/path/to/test.py`

**Step 1: Write the failing test**

```python
def test_specific_behavior():
    result = function(input)
    assert result == expected
```

**Step 2: Run test to verify it fails**

Run: `pytest tests/path/test.py::test_name -v`
Expected: FAIL with "function not defined"

**Step 3: Write minimal implementation**

```python
def function(input):
    return expected
```

**Step 4: Run test to verify it passes**

Run: `pytest tests/path/test.py::test_name -v`
Expected: PASS

**Step 5: Commit**

```bash
git add tests/path/test.py src/path/file.py
git commit -m "feat: add specific feature"
```
```

## Remember
- Exact file paths always
- Complete code in plan (not "add validation")
- Exact commands with expected output
- Reference relevant skills with @ syntax
- DRY, YAGNI, TDD, frequent commits

## Execution Handoff

After saving the plan, offer execution choice:

**"Plan complete and saved to `docs/plans/<filename>.md`. Two execution options:**

**1. Inline (this session, default)** - I work through the tasks in order, verify each one, and report at the end. Cheapest in tokens.

**2. Subagent-Driven (only if subagents are available)** - A fresh subagent per task with a review between tasks. Slower to set up and uses more tokens.

**Which approach?"**

If the user picks neither, use Inline. Either way, finish and verify one task before starting the next, and stop to ask if a task turns out to need a technology the plan did not approve.

