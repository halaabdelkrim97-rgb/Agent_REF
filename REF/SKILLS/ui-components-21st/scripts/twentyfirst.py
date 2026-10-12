#!/usr/bin/env python3
"""Call the 21st.dev MCP server over HTTP with nothing to install. Standard library only.

    python twentyfirst.py tools                          # the server's tools
    python twentyfirst.py search "pricing table"         # components, themes, templates (metadata)
    python twentyfirst.py call get_component '{"id": 1512}'
    python twentyfirst.py call get_usage

Use it when the MCP server is not registered in Claude Code (for example no `claude` command on the
PATH). The key is read from TWENTYFIRST_API_KEY (API_KEY_21ST also works), else from that line in a
.env file in the current folder (the project's .env must be gitignored). It is never printed.
"""
import json
import os
import sys
import urllib.error
import urllib.request
from pathlib import Path

URL = "https://21st.dev/api/mcp"
PROTOCOL = "2025-06-18"
KEY_NAMES = ("TWENTYFIRST_API_KEY", "API_KEY_21ST")


def read_key():
    """The key from the environment, else from a .env file in the current folder."""
    for name in KEY_NAMES:
        if os.environ.get(name):
            return os.environ[name]
    env = Path(".env")
    if env.is_file():
        for line in env.read_text(encoding="utf-8").splitlines():
            name, sep, value = line.strip().partition("=")
            value = value.strip().strip("'\"")
            if sep and name.strip() in KEY_NAMES and value:
                return value
    return None


def post(body, key, session=None):
    """One JSON-RPC message; returns (reply or {}, session id). Handles JSON and event-stream replies."""
    headers = {"x-api-key": key, "Content-Type": "application/json",
               "Accept": "application/json, text/event-stream", "mcp-protocol-version": PROTOCOL}
    if session:
        headers["mcp-session-id"] = session
    req = urllib.request.Request(URL, data=json.dumps(body).encode("utf-8"), headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            raw = resp.read().decode("utf-8", "replace")
            session = resp.headers.get("mcp-session-id") or session
    except urllib.error.HTTPError as e:
        detail = e.read().decode("utf-8", "replace")[:300].replace(key, "***")
        hint = " (check the key in the 21st.dev console)" if e.code in (401, 403) else ""
        sys.exit(f"API error {e.code}{hint}: {detail}")
    except urllib.error.URLError as e:
        sys.exit(f"Network error: {e.reason}")
    data = [line[5:].strip() for line in raw.splitlines() if line.startswith("data:")]
    raw = data[-1] if data else raw
    return (json.loads(raw) if raw.strip() else {}), session


def main(argv):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")  # Windows consoles default to cp1252
    if not argv or argv[0] in ("-h", "--help"):
        print(__doc__)
        return 0
    key = read_key()
    if not key:
        sys.exit("No key: set TWENTYFIRST_API_KEY or add it to the project's gitignored .env, then retry.")

    init, session = post({"jsonrpc": "2.0", "id": 1, "method": "initialize", "params": {
        "protocolVersion": PROTOCOL, "capabilities": {}, "clientInfo": {"name": "agent-ref", "version": "1"}}}, key)
    if "error" in init:
        sys.exit(f"initialize failed: {json.dumps(init['error'])[:300]}")
    post({"jsonrpc": "2.0", "method": "notifications/initialized"}, key, session)

    command = argv[0]
    if command == "tools":
        reply, _ = post({"jsonrpc": "2.0", "id": 2, "method": "tools/list"}, key, session)
        for tool in reply.get("result", {}).get("tools", []):
            print(f"{tool['name']}: {tool.get('title', '')}")
        return 0
    if command == "search" and len(argv) > 1:
        name, args = "search", {"query": " ".join(argv[1:])}
    elif command == "call" and len(argv) > 1:
        name = argv[1]
        try:
            args = json.loads(argv[2]) if len(argv) > 2 else {}
        except json.JSONDecodeError:
            sys.exit("call: the arguments must be one JSON object, for example '{\"id\": 1512}'")
    else:
        sys.exit("usage: tools | search <query> | call <tool> ['<json args>']")

    reply, _ = post({"jsonrpc": "2.0", "id": 3, "method": "tools/call",
                     "params": {"name": name, "arguments": args}}, key, session)
    if "error" in reply:
        sys.exit(f"{name} failed: {json.dumps(reply['error'])[:300]}")
    result = reply.get("result", {})
    for part in result.get("content", []):
        if part.get("type") == "text":
            print(part["text"].replace(key, "***"))
    return 1 if result.get("isError") else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
