---
name: testing
description: Plans and runs tests for plain HTML, CSS and JavaScript projects - manual browser checklists first, then simple native tests. Use when verifying a change, writing test steps, checking responsive or accessibility behavior, or before saying work is done.
metadata:
  source: original (Agent_REF)
  date_added: '2026-10-12'
---

> **Stack gate (vanilla-first):** Start with manual browser checks and native tools (console, DevTools, `node --test` only if Node is already in the project). Test frameworks, Playwright, Jest and similar need the user's approval first. If the project already uses a test tool, use it.

# Testing

Never report "works" without saying what was checked and how.

## Procedure
1. List what the change should do and what it must not break (2 to 6 items).
2. Pick the cheapest check that proves each item (table below).
3. Run it. Record the result as pass, fail or not verified.
4. On failure, find the cause before fixing. Re-run the failed check and the items near it.
5. Report: checked items with results, then what could not be verified and why.

## Cheapest check for each need
| Need | Check |
| --- | --- |
| JavaScript runs without errors | Open the page, DevTools Console shows no errors or warnings |
| Feature works | Written steps with the expected result, followed by hand |
| Layout | Resize to about 360, 768 and 1280 px; no horizontal scroll, nothing overlapping |
| Keyboard | Tab through the page: every control reachable, visible focus, Enter and Space work, Esc closes dialogs |
| Accessibility basics | Images have alt, inputs have labels, headings in order, contrast 4.5:1, works with zoom 200% |
| Forms | Empty, wrong, long and valid input; error text next to the field |
| Motion | Works with `prefers-reduced-motion: reduce` |
| Performance | No layout shift, images sized, no long tasks in the Performance panel |
| Pure functions | Small `assert` checks in a script, or `node --test` if Node is already used |
| Data storage | Reload the page; clear storage; offline behavior if promised |

## Manual test steps format
```
Test: <what>
Steps: 1. ... 2. ... 3. ...
Expected: <observable result>
Result: pass | fail | not verified (<reason>)
```

## Browser automation (ask first)
Driving a real browser (Playwright and similar) is the best way to test flows and take screenshots, but it is a new dependency. Offer it when manual steps would be repeated often or the project has many flows. Explain the benefit and the cost (install, maintenance) and wait for approval. Without it, keep the manual checklist.

## Rules
- Test the behavior you changed and the nearest behavior it could break. Do not run the whole project's checks for a one-line change.
- A test you did not run is "not verified", never "passed".
- If a check needs a tool you may not install (browser automation, a test framework), say so and ask first.
