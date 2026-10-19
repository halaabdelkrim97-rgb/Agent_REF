# Hub profiles: which pages, which data

Set `HUB.profile = { type, apps }` in `hub-data.js`. `type` is `web`, `mechatronics` or `game`; leave it empty for anything else (tabs are then picked from the data). `apps` (mechatronics only) is a list of `webapp`, `mobile`, `hmi`. The page builds the tabs; `HUB.ui.tabs` overrides them.

## Always present
| Page | Holds |
| --- | --- |
| Project | context, goal, problem, users, scope, constraints, people, next steps, progress rings, system overview diagram |
| Plan | work plan with hour estimates (tasks, owners, dependencies), workload, risks, decisions |
| Business | audience, value, revenue model, offer, costs, margin, KPIs, milestones |
| Docs and quality | project documents with status; tests, release checklist, environments |
| Agent | Forge's roles in this project, capabilities used, skills used, analytics (coverage, sessions, tokens if shown, most used skills), skill catalog |
| Gaps | open points: questions with options and typed answers, copied to Forge |

## Pages by project type
| Type | Pages (in order) |
| --- | --- |
| `web` | Frontend, Backend, Database, Design (palette, fonts, tone, techs, references, assets, libraries) |
| `mechatronics` | Firmware, Hardware (block schematic, power budget, parts list, pin map, hardware structure), App (webapp, mobile or HMI when present), Assets and Identity only if data exists |
| `game` | UI, Code (game code, for example Unity), Structure (whole project tree), Assets (assets by type, libraries, licenses; plus the art style) |
| none | Hardware and Software when the data has them, Identity, Assets when listed |

## Data shapes (all optional; empty stays "to define")
```js
sections: { frontend|backend|database|firmware|app|ui|code: {
  summary: "", stack: ["..."], owner: "", status: "todo|doing|done|blocked",
  tree: ["src/ | source", "src/app.js | entry point", "src/new.js | planned"],   // project structure, "path | note"
  items: [{ name, role, tech, status, note }],            // pages, services, drivers, screens, scripts
  endpoints: [{ method, path, purpose, auth }],           // backend (falls back to software.endpoints)
  tables: [{ entity, fields, note }],                     // database (falls back to software.data)
  layers: [{ name, tech, items: ["..."] }]                // optional layered view
} }
structure: ["Assets/ | art and prefabs", "Assets/Scripts/ | game code"]   // whole project tree (Structure page)
hardware: { ..., tree: ["hardware/schematic.pdf | planned"] }             // hardware project structure
assets: [{ name, type, path, source, license, status, note }]             // type groups the cards: image, model, audio, font, ...
libs: [{ name, version, purpose, license, url }]                          // a library without license is flagged
quality: { tests: [{ area, type, status }], checklist: [{ t, done }], envs: [{ name, url, status, note }] }
agent: { roles: [{ role, does }], log: [{ date, task, skills: [], tokens }], usedSkills: [...] }
identity: { palette, fonts, tone, tech: [], references }
```
Tasks join a page through their `track` (`frontend`, `backend`, `database`, `firmware`, `hardware`, `app`, `ui`, `code`, `assets`); each page shows its tasks and progress. A diagram joins a page through `tab` (or its `kind`); if that page does not exist it moves to the nearest one.

## What to put where (keep it light)
- Folder trees: 20 to 60 lines per tree, folders and key files only, not every file. Mark files not built yet with the note `planned`.
- `tokens` in `agent.log` only from figures the environment shows.
- No invented part numbers, endpoints, licenses or prices. A library or asset with unknown license gets no `license` (the page flags it).
- Never list secrets, `.env` files or client-private files.

## System drawing style (hardware, wiring, any diagram)
A diagram can look like a real system drawing. All fields are optional; the page lays it out and routes the wires.
```js
{ kind: "wiring", title: "System drawing", status: "proposed", nodeWidth: 210,         // nodeWidth 140 to 280
  kinds: [{ key: "power", label: "Power", color: "#f59a3c" }, { key: "rs485", label: "RS-485 (A/B)", color: "#5b9cf5" }, { key: "lora", label: "LoRaWAN radio", color: "#a78bfa", dash: true }],
  zones: [{ id: "box", label: "Controller box", nodes: ["psu", "mcu"] }, { id: "field", label: "Field", style: "dashed", nodes: ["probe"] }],
  nodes: [{ id: "mcu", label: "ESP32-S3", sub: "32 MB flash", in: ["GPIO16 RX"], out: ["GPIO15 TX"],
            lines: ["UART1 -> weather", "Do not use: GPIO 19/20"],                      // mono text under the pins
            tag: { text: "tested 13 Oct", tone: "ok" } }],                              // tone: ok | warn | bad
  edges: [{ from: "mcu.GPIO15 TX", to: "rs1", kind: "rs485", start: "4800 8N1", label: "A yellow, B blue" }] }  // start and end: text at the wire ends; status "planned" draws a dashed wire
```
- Wire `kind`: `data`, `power`, `signal`, `control` or one you define in `kinds`; the legend is built from the kinds used.
- A zone is an outlined area for an enclosure or a location (`style: "dashed"` for field or planned areas). List its blocks together; blocks of one zone are kept next to each other. With zones the column lanes are not drawn.
- Routing: blocks are reordered inside each column to cut crossings (zone first), every wire between neighbouring columns gets its own vertical channel with square corners, the gap widens when many wires share it, and labels move along the wire (or just above or below it) to avoid each other and never sit on a block.
- Wires between blocks in the same column loop out on the right. A rail shared by many blocks is shown as one labelled power wire per consumer.
- Facts only: baud rates, pins, voltages and test dates come from the user or the files; a block not built yet gets `status: "planned"`.
