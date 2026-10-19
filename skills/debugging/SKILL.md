---
name: debugging
description: Root-cause debugging procedure - reproduce, isolate, form ranked hypotheses, gather evidence, apply the smallest fix and verify. Use for bugs, errors, blank pages, wrong output, flaky behavior or "it worked yesterday".
metadata:
  source: original (Agent_REF)
  date_added: '2026-10-12'
---

# Debugging

Fix the cause, not the symptom. Change one thing at a time.

## Procedure
1. **Reproduce.** Exact steps, input, browser/device, expected vs actual. If you cannot reproduce it, say so and gather logs instead of guessing.
2. **Read the evidence first.** Console errors, network panel, stack trace, logs, recent `git log` and `git diff`. Quote the exact error text.
3. **Isolate.** Shrink to the smallest case: disable parts, comment out, use a minimal page. `git bisect` when it used to work.
4. **Hypotheses.** List two or three causes ranked by likelihood. For each, one cheap test that would prove or disprove it. Run the cheapest first.
5. **Fix** the proven cause with the smallest change. Do not refactor while fixing.
6. **Verify.** Re-run the reproduction, then the nearest behavior that could break (`testing`). Add a regression check when practical.
7. **Explain** in a few lines: root cause, fix, how it was verified, what was not.

## Where to look first (web)
| Symptom | Check |
| --- | --- |
| Blank page | Console error, failed script path, ES modules opened from `file://`, wrong MIME type |
| Works locally, not deployed | Case-sensitive paths, base path, HTTPS mixed content, missing build file, cache |
| Layout off on one device | Viewport meta, units, `100vh` on mobile, fonts not loaded |
| Click does nothing | Listener attached before the element exists, overlay blocking, `pointer-events` |
| Data wrong | Types (string vs number), rounding, timezone, off-by-one, stale state |
| Intermittent | Race between async calls, timers, event order, cache |
| Slow | Performance panel, long tasks, layout thrash, oversized assets |
| 3D scene black | Camera inside object, no light, wrong color space, WebGL context lost, asset path |
Firmware and hardware: read the serial log first, then power and wiring (`cad-firmware`).

## Stop rules
- After two failed fixes, stop editing and re-read the evidence; your model of the problem is wrong.
- Never hide an error with an empty `catch` or by deleting a check.
- Do not claim it is fixed until the reproduction passes.
