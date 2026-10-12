---
description: End-of-day improvement - learn from this session or today's work, update context, skip what already exists
---

Run the end-of-day improvement. Use the `reflect` skill (improve mode) and `project-summarizer`.

Scope: ask once if not stated: this session (default), or today's sessions. For today's sessions, you may read only today's Claude Code transcripts for this project (under `~/.claude/projects/`), after the user agrees. Do not read other projects.

1. **Collect** corrections the user made, approvals, repeated patterns and token waste (skills opened but unused, files re-read, long replies).
2. **Skip what exists:** check the learnings file `REF/CONTEXT/forge-learnings.md`, the context file and the installed skills and Forge rules. Drop any item already covered, and say how many were skipped.
3. **Propose** the remaining items as a short list: rule, where it goes (project learnings, a skill edit, or a Forge rule), confidence (high, medium, low). Project-specific lessons go to `REF/CONTEXT/forge-learnings.md`. Lessons that belong in a skill or in Forge are listed as proposals for the Agent_REF repo, never applied to installed copies.
4. **Wait for approval,** then apply only the approved project items. Never edit installed skills or Forge rules from a project session.
5. **Update the context file** (section 9, decisions in 7, visual identity in 10) with the diff and approval.
6. **Finish** with the session report: skills used, tokens (only figures the environment shows), what was learned, what was skipped, tomorrow's first step.

Never store secrets, client data or personal data. Keep it short.
