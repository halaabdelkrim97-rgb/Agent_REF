---
name: writing-guidelines
description: Reviews files for compliance with Vercel's Writing Guidelines. Fetches the latest rules at runtime (needs network access) and reports findings in terse file:line format. Use when the user asks to review prose, docs or UI copy against those guidelines.
metadata:
  author: vercel
  version: 1.0.0
  argument-hint: <file-or-pattern>
  source_repo: vercel-labs/agent-skills
  source_type: official
  source: vercel-labs
  date_added: '2026-09-21'
---

# Writing Guidelines

Review files for compliance with Writing Guidelines.

## How It Works

1. Fetch the latest guidelines from the source URL below
2. Read the specified files (or prompt user for files/pattern)
3. Check against all rules in the fetched guidelines
4. Output findings in the terse `file:line` format

## Guidelines Source

Fetch fresh guidelines before each review:

```
https://raw.githubusercontent.com/vercel-labs/writing-guidelines/main/command.md
```

Use WebFetch to retrieve the latest rules. The fetched content contains all the rules and output format instructions.

## Usage

When a user provides a file or pattern argument:
1. Fetch guidelines from the source URL above
2. Read the specified files
3. Apply all rules from the fetched guidelines
4. Output findings using the format specified in the guidelines

If no files specified, ask the user which files to review.

## Limitations

Needs network access (WebFetch) to fetch the latest rules. If the fetch fails, say so and do not guess the rules.
