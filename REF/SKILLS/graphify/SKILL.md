---
name: graphify
description: Connect Graphify Cloud or an explicitly requested local graph to ChatGPT, Claude Code, Codex or another MCP client, then investigate code architecture with graph evidence and source locations. Use for Graphify setup, OAuth troubleshooting, indexed repository selection or graph-based code questions.
---

# Graphify

## Setup
1. Read the current guide at https://docs.graphify.com/integrations/cloud first, then follow its link for the actual client. Check the available tools and existing connection before configuring anything. Skill installation alone does not connect Graphify.
2. Confirm Cloud versus local. Default this setup to Cloud: Streamable HTTP at `https://api.graphify.com/mcp`, using OAuth. Do not request an API key. For an explicitly requested local graph, read https://docs.graphify.com/mcp/overview and follow current instructions; do not substitute Cloud instructions. If a guide is inaccessible, report it and find an official replacement before inventing commands.
3. Confirm the user has a Graphify account, workspace access and a repository with Indexed status. If missing, guide them at https://app.graphify.com. Leave account sign-in, workspace authorization and repository access approval to the user.
4. Follow the current client-specific installation route. In ChatGPT/Codex, prefer the documented Graphify plugin when available; discover it through available plugin tools. In Claude Code, follow the current remote-MCP instructions for that client. Do not guess flags, config paths or OAuth commands.
5. If configuration is supported and authorized, add only Graphify. Inspect existing configuration first; preserve unrelated servers, settings and credentials. Reuse a matching existing entry. Do not create duplicate plugin/manual connections or overwrite a name collision. If direct configuration is unavailable, give exact manual steps from the current guide, including relevant plan, client and workspace-admin restrictions. Do not claim all plans support it.
6. Let the user complete OAuth themselves. Never inspect or store passwords, tokens, cookies or authorization codes in project files, logs, screenshots or handoffs. Explain any required reconnect or new-session step.

## Verify and select
- Verify tool availability, then make a successful authenticated listing call before reporting a working connection. Record the actual result; do not treat a saved URL or completed installation as proof.
- Use the exposed workspace and repository listing tools, with their actual schemas. Show available workspaces, active workspace, repository identity and index status. Ask which indexed repository to use; do not silently select the first match.
- Change workspace only as needed for the user's chosen target and according to the tool's permissions. Do not change persistent defaults or save repository memories without authorization. If tools remain unavailable, report setup incomplete and the concrete next step.

## Answer with evidence
Answer one user architecture question after selection. If no question was provided, ask for it or offer a concise architecture overview as the proposed first query. Search narrowly, expand relevant nodes and inspect cited source locations where accessible. Include repository, file path and symbol/line locations returned by evidence; never invent line numbers.
Separate indexed call/import edges, semantic suggestions and your inference. An empty graph result does not prove code is absent. Check index freshness/commit when exposed and warn when it differs from the working tree. Do not claim exhaustive change impact from a partial graph.
Keep queries bounded and avoid retrieving the entire graph. Tool availability, names and side effects can change: inspect descriptions before use, including query-trail logging, stored memories and workspace selection. Preserve user privacy and distinguish source verification from graph-only evidence.

## Sources to refresh
- Cloud: https://docs.graphify.com/integrations/cloud
- ChatGPT/Codex: https://docs.graphify.com/integrations/chatgpt
- Other clients: https://docs.graphify.com/integrations/other-agents
- Local: https://docs.graphify.com/mcp/overview

When asked only to add this skill to Forge, create and validate it without changing the user's active MCP configuration or initiating sign-in.
