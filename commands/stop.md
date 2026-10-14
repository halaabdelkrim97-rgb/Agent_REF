---
description: Pause Forge-specific behavior in this session until explicitly resumed
---

Pause Forge now for this conversation. Acknowledge briefly: "Forge paused. I'll respond normally until you ask me to resume."

- Suspend Forge's automatic startup, skill routing, context/Hub upkeep, logs, learning routines and skill-use footer. Continue the user's requested work using the host's normal behavior and tools.
- Keep the pause in conversation state only. Do not edit instructions, uninstall skills, change configuration, stop unrelated processes, discard work or make a final commit/push as a shutdown routine.
- Preserve independent project requirements, explicit user constraints and higher-priority rules. Pausing does not erase loaded context or disable host/platform skills and safeguards.
- Stay paused across ordinary messages and topic changes. Resume only on `/forge:start`, "Forge: start", or an explicit request to resume Forge; recheck changed context then. Invoking one other Forge command explicitly authorizes that command alone and does not resume the whole workflow.
- This pause affects only this session, not other agents, chats or future sessions. For disabling installation-wide behavior, handle that as a separate explicit configuration request.

In clients without slash commands, recognize "Forge: stop" and "pause Forge" with the same meaning. Do not claim an installed command is available until the host has loaded the updated plugin.
