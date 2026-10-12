---
name: ui-components-21st
description: Use 21st.dev (Magic MCP and 21st-dev CLI) to find or generate UI components from a prompt. Use only when the user asks for 21st.dev or wants ready-made React, Tailwind or shadcn components. Covers the stack gate, the setup the user runs themselves, key handling, and how to review and adapt the output.
metadata:
  source: original (Agent_REF); setup details from 21st.dev docs and community guides, verify against the current official docs
  date_added: '2026-10-13'
---

> **Stack gate (vanilla-first):** 21st.dev components are typically React, TypeScript, Tailwind and shadcn/ui. In a plain HTML/CSS/JS project that adds a build chain, so ask first. The alternative is to use a component only as a design reference and rebuild it in plain HTML/CSS/JS (`frontend-developer`, `ui-ux-pro-max`).

# 21st.dev components

## What it is
A hosted service: the Magic MCP server turns a prompt (for example "/ui a pricing table with a monthly toggle") into component code, and the community library offers ready-made components. It needs an API key and may have usage limits or paid plans: check current terms.

## Setup (the user runs these, not the agent)
The agent must not type, store or echo API keys. Give the user the command to run in their own terminal, with their key taken from the 21st.dev console:
- Remote MCP: `claude mcp add --transport http --scope user 21st https://21st.dev/api/mcp --header "x-api-key: <YOUR_KEY>"` (`--scope user` keeps the key out of the project).
- CLI installer: `npx @21st-dev/cli init --client claude --write` (it edits MCP config files: say so before it runs).
- Exact current commands: 21st.dev and github.com/21st-dev/magic. Guides differ, so confirm there.
- **No install, no registration (tested 2026-10-13):** when there is no `claude` command on the PATH (the VS Code extension alone) or the server is not registered, call the same server with the bundled script, run from the project folder: `python scripts/twentyfirst.py tools`, `search "<query>"`, `call get_component '{"id": <id>}'`, `call get_usage`. It reads `TWENTYFIRST_API_KEY` from the environment or from the project's `.env` (check `git check-ignore .env` first; create the line empty and let the user paste the key) and never prints it.
- Main tools: `search` (components, themes, templates; metadata and preview images, free), `get_component` (the code), `get_theme`, `get_inspiration`, `search_logo`, `get_usage`. Run `get_usage` first: on the free tier (seen 2026-10-13) `get_component` allows 2 code retrievals a day and AI generation is off, so search and compare previews before spending a retrieval.

Keys never go into the repo, `CLAUDE.md`, the context file, screenshots or chat. If a key was pasted in chat, tell the user to revoke and replace it. If the key lives in a project MCP config, that file must be git-ignored.

## Procedure
1. Confirm the project stack. If it is not React plus Tailwind, offer reference-only use or ask whether to add them.
2. Describe the component precisely: purpose, states, content, responsive behavior, colors and type from the context file (visual identity, section 10).
3. Review the generated code before adding it: dependencies it pulls in, the license of the source component, accessibility (labels, focus, keyboard, contrast) and size. Remove unused imports and props.
4. Adapt to the project's tokens, naming and file layout. Add only the dependencies the user approved.
5. Verify with `testing` and `accessibility` (build, keyboard, reduced motion, mobile width).

## Rules
- Third-party components keep their license: record the source in a comment or the context file.
- Do not send client data or private copy to the service.
- Report what the service produced and what you changed.
