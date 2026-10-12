---
name: project-summarizer
description: Keeps a short, current project summary so new sessions do not re-read the whole project or conversation. Use at the end of substantial work, when a session is getting long, before handing off, or when starting work in a project with no summary.
metadata:
  source: original (Agent_REF)
  date_added: '2026-10-12'
---

# Project Summarizer

Goal: a later session reads one small file instead of the whole project. The summary lives in `REF/CONTEXT/001_PROJECT_CONTEXT.md`, section 9 "Current status and next steps". Do not create another file.

## When
- After substantial work, or when the user asks to wrap up, hand off or "save progress".
- When the conversation is long and decisions would be lost on a reset.
- When starting in a project that has no summary: build the first one from the files, not from guesses.

## Procedure
1. Read `REF/CONTEXT/001_PROJECT_CONTEXT.md` (create it from `REF/TEMPLATES/001_PROJECT_CONTEXT.md` if missing; ask the user for goal and stack, do not invent them).
2. Gather only what changed: `git log --oneline` and `git diff --stat` since the last summary, plus the files you touched. Do not re-read untouched files.
3. Update section 9 with: **Done** (what works now), **In progress**, **Next** (ordered, max 5), **Open questions / blockers**, **How to resume** (exact command or file to open first).
4. Move settled decisions to section 7 as one line each: decision, reason, date. Move new constraints to section 6.
5. Show the user the diff of the context file and wait for approval before saving it, unless they asked you to save directly.

## Rules
- Keep section 9 under about 25 lines. Replace old status instead of appending a history; git keeps the history.
- Facts only: paths, commands, decisions, results you verified. Mark anything unverified as "unverified".
- Never put secrets, tokens or personal data in the summary.
- Do not rewrite sections the user wrote. Edit only section 9, and add single lines to 6 and 7.
