---
name: project-summarizer
description: Keeps the project context file current - status, decisions, constraints and visual identity - so new sessions do not re-read the project or conversation. Use at the end of work, before a handoff, when no context file exists, or for /forge:context.
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

## Handoff note (when the session ends or the user switches tool)
Add a short block at the end of section 9, replaced each time: **Goal of this session**, **State** (what is done and verified), **Decisions** made and why, **Next action** (one concrete step), **Do not redo** (things already tried or rejected). Under 12 lines. A new session reads it first and continues from "Next action".

## Context file check (every project)
- **Exists:** read it once. If it does not follow the REF template, map every fact to the template's ten sections without dropping anything, add missing sections as empty placeholders, and show the diff.
- **Missing:** create it from `REF/TEMPLATES/001_PROJECT_CONTEXT.md` (the REF repo). Fill only what you can verify from the files (name, stack in use, how to run). Ask the user for goal, constraints and visual identity.
- Keep it under about 150 lines; it is read at the start of every session.

## Visual identity and references (section 10)
Capture it so later screens, scenes and documents match. Sources: CSS variables and font declarations in the project, logo and image files, the brief, and what the user said in the conversation.
- Palette with roles (primary, accent, background, text), typography, tone of voice in three words, logo and imagery rules, motion and 3D style, and reference links or files.
- Record only what exists or was stated; mark guesses "unconfirmed". Offer a one-page HTML brand sheet (swatches, type samples) if the user wants to see it.

## Rules
- Keep section 9 under about 25 lines. Replace old status instead of appending a history; git keeps the history.
- Facts only: paths, commands, decisions, results you verified. Mark anything unverified as "unverified".
- Never put secrets, tokens or personal data in the summary.
- Do not rewrite sections the user wrote. Edit only section 9, and add single lines to 6 and 7.
