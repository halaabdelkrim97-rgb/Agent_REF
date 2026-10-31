/* EXAMPLE with fictional content (team, client and figures are invented). Shows every field and its allowed values.
   Copy shapes, not facts. */
const HUB = {
  profile: { type: "mechatronics", apps: ["webapp"] },   // type: web | mechatronics | game (see references/profiles.md); apps: webapp | mobile | hmi
  project: { name: "Smart Planter Demo", tagline: "Interactive web demo of a self-watering planter", client: "Greenleaf Co (fictional)", status: "design", version: "v0.2", updated: "2026-10-13",
    goal: "Let garden-shop visitors see how the planter reads soil moisture and waters by itself, on a simulated device.",
    stack: ["HTML", "CSS", "JavaScript", "Three.js (approved)", "ESP32 firmware (C++)", "Small REST API"],
    links: [{ label: "Repository", url: "https://example.com/repo" }, { label: "Client folder", url: "https://example.com/drive" }] },
  context: { problem: "The client cannot show a hidden mechanism (sensor, pump, logic) in photos or a video.",
    users: "Garden-shop visitors on phones and desktops; the client's sales team.",
    scope: { in: ["3D planter with live soil-moisture simulation", "Pump on/off logic shown step by step", "Dashboard with a moisture chart", "Working hardware test board"], out: ["Real cloud connection", "Checkout", "Native app"] },
    constraints: ["Runs on a 3-year-old phone", "Delivery 2026-11-20", "Budget fixed by the quote"], assumptions: ["Client sends final logo by Oct 16", "CAD export as STEP is available"],
    stakeholders: [{ name: "Alex", role: "lead, client contact" }, { name: "Lina", role: "hardware and CAD" }, { name: "Omar", role: "firmware and backend" }, { name: "Sara", role: "frontend and 3D" }],
    brief: { title: "Smart Planter Demo in short", text: ["A web demo that shows how the planter reads soil moisture and waters by itself.", "Delivery is 2026-11-20; the client supplies the logo and CAD."], points: [{ t: "Scope", d: "3D planter, simulation, dashboard, test board." }, { t: "Main risk", d: "Client logo arrives late." }] },   // last block of the Dashboard
    detailsSource: "From docs/PROJECT_CONTEXT.md and docs/source-of-truth/ (fictional).",
    details: [   // the Dashboard shows these cards below the monitoring tiles; see "Dashboard and project details" in SKILL.md
      { title: "How it works", wide: true, text: "The planter reads soil moisture and waters by itself; the demo shows it on a simulated device.", flow: [{ t: "Soil sensor", s: "reads moisture" }, { t: "Controller", s: "decides" }, { t: "Pump", s: "waters" }] },
      { title: "What the demo does", wide: true, tiles: [{ t: "Live moisture", d: "A chart follows the simulation." }, { t: "Pump logic", d: "Shown step by step." }, { t: "Test board", d: "Real hardware next to the demo.", tag: "added Oct 13" }] },
      { title: "Parts list", fold: true, count: "2 items", table: { head: ["#", "Item", "Qty"], rows: [["1", "Soil-moisture sensor", "1"], ["2", "Mini pump 5 V", "1"]] }, note: "Supplied by the client." }] },
  tracks: [  // key: hardware | firmware | backend | frontend | other. Tasks join a track through their "track" field.
    { key: "hardware", title: "Hardware", applicable: true, status: "doing", owner: "Lina", stack: ["KiCad", "STEP / glTF export"], summary: "Sensor board, pump driver, simplified enclosure for the web." },
    { key: "firmware", title: "Firmware", applicable: true, status: "doing", owner: "Omar", stack: ["ESP32", "C++"], summary: "Moisture read, hysteresis, pump control, serial log." },
    { key: "backend", title: "Backend", applicable: true, status: "todo", owner: "Omar", stack: ["Small REST API"], summary: "Mock readings and pump commands for the demo." },
    { key: "frontend", title: "Frontend", applicable: true, status: "doing", owner: "Sara", stack: ["HTML", "CSS", "JS", "Three.js"], summary: "3D scene, simulation, dashboard, responsive layout." }
  ],
  plan: {
    stages: [{ name: "Stage 1", short: "Discovery", title: "Discovery and design", what: "Learn what users need and design the screens.", goal: "A design the client accepts." }],   // optional titles for the stage sections
    reserve: 10,                       // percent reserve for the unexpected, shown in the hours report
    pace: { "Omar": 6 },                // hours per day per owner for the report timeline (default 8), never printed
    reportNotes: ["Hours are working hours."],   // "Good to know" lines of the hours report
    estimateNote: "First estimates by Forge from the brief. Not yet confirmed by the team; confirm in the next planning call.",
    // task: { id, t, owner, est (hours), spent (hours), status: todo|doing|blocked|done, due, after: [ids], track, note }
    phases: [
      { stage: "Stage 1", name: "1. Discovery", status: "done", start: "Oct 1", end: "Oct 4", tasks: [
        { id: "T1.1", t: "Kickoff call and brief", owner: "Alex", est: 2, spent: 2, status: "done", due: "Oct 1", track: "project" },
        { id: "T1.2", t: "Collect product specs and CAD from the client", owner: "Alex", est: 3, spent: 4, status: "done", due: "Oct 3", track: "hardware", note: "client sent files in two rounds" },
        { id: "T1.3", t: "Write scope and acceptance criteria", owner: "Alex", est: 3, spent: 3, status: "done", due: "Oct 4", track: "project" } ] },
      { name: "2. Design", status: "doing", start: "Oct 5", end: "Oct 16", tasks: [
        { id: "T2.1", t: "Review sensor board schematic", owner: "Lina", est: 6, spent: 6, status: "done", due: "Oct 9", after: ["T1.2"], track: "hardware" },
        { id: "T2.2", t: "Simplify enclosure CAD and export glTF", owner: "Lina", est: 8, spent: 3, status: "doing", due: "Oct 16", after: ["T1.2"], track: "hardware" },
        { id: "T2.3", t: "Design the watering state machine", owner: "Omar", est: 5, spent: 5, status: "done", due: "Oct 10", track: "firmware" },
        { id: "T2.4", t: "Write the API contract for readings and pump commands", owner: "Omar", est: 4, spent: 0, status: "todo", due: "Oct 14", after: ["T2.3"], track: "backend" },
        { id: "T2.5", t: "UI wireframes and visual identity", owner: "Sara", est: 8, spent: 6, status: "doing", due: "Oct 15", track: "frontend" },
        { id: "T2.6", t: "Client design approval", owner: "Alex", est: 2, spent: 0, status: "blocked", due: "Oct 16", after: ["T2.5"], track: "project", note: "waiting for the client logo" } ] },
      { name: "3. Build", status: "todo", start: "Oct 19", end: "Nov 6", tasks: [
        { id: "T3.1", t: "3D scene: planter model and lighting", owner: "Sara", est: 12, status: "todo", due: "Oct 28", after: ["T2.2"], track: "frontend" },
        { id: "T3.2", t: "Simulation model: soil moisture and pump", owner: "Sara", est: 10, status: "todo", due: "Oct 30", after: ["T2.3"], track: "frontend" },
        { id: "T3.3", t: "Firmware: sensor read and pump control", owner: "Omar", est: 14, status: "todo", due: "Nov 3", after: ["T2.3"], track: "firmware" },
        { id: "T3.4", t: "Backend: readings endpoint with mock data", owner: "Omar", est: 8, status: "todo", due: "Nov 4", after: ["T2.4"], track: "backend" },
        { id: "T3.5", t: "Dashboard: moisture chart and controls", owner: "Sara", est: 10, status: "todo", due: "Nov 5", after: ["T2.5"], track: "frontend" },
        { id: "T3.6", t: "Assemble and wire the hardware test board", owner: "Lina", est: 10, status: "todo", due: "Nov 4", after: ["T2.1"], track: "hardware" },
        { id: "T3.7", t: "Connect the demo to the simulated device data", owner: "Sara", est: 6, status: "todo", due: "Nov 6", after: ["T3.2", "T3.4"], track: "frontend" } ] },
      { name: "4. Test and handover", status: "todo", start: "Nov 9", end: "Nov 20", tasks: [
        { id: "T4.1", t: "Cross-device testing: phone, tablet, desktop", owner: "Sara", est: 6, status: "todo", due: "Nov 12", after: ["T3.7"], track: "frontend" },
        { id: "T4.2", t: "Hardware test report", owner: "Lina", est: 5, status: "todo", due: "Nov 13", after: ["T3.6"], track: "hardware" },
        { id: "T4.3", t: "Accessibility and performance pass", owner: "Sara", est: 5, status: "todo", due: "Nov 16", after: ["T4.1"], track: "frontend" },
        { id: "T4.4", t: "Client handover pack and walkthrough", owner: "Alex", est: 5, status: "todo", due: "Nov 20", after: ["T4.1", "T4.2"], track: "project" } ] }
    ],
    next: [],  // leave empty to show the next ready tasks automatically
    risks: [{ r: "Client logo arrives late", level: "medium", mitigation: "Design with a placeholder, swap by variable" }, { r: "Slow on old phones", level: "high", mitigation: "Cap pixel ratio, test on one old phone in week 1 of Build" }],   // level: low | medium | high
    decisions: [{ d: "Plain JS first, Three.js only for the 3D scene", why: "Light project, approved by the client", date: "2026-10-02" }],
    resume: "python3 -m http.server 8000, open the demo folder"
  },
  business: { audience: "Visitors of garden-shop websites", value: "See the hidden mechanism work before buying", model: "Fixed fee, optional monthly hosting",
    offer: [{ item: "Discovery and design", price: 1800, note: "phases 1 and 2" }, { item: "Build", price: 5200, note: "demo, firmware, API" }, { item: "Test and handover", price: 1500, note: "phase 4" }],
    costs: [{ item: "Hosting (first year)", amount: 120 }, { item: "Hardware parts", amount: 260 }, { item: "Team hours", amount: null }],
    kpis: [{ k: "Demo plays per month", target: "500", now: "" }, { k: "Time on page", target: "90 s", now: "" }],
    milestones: [{ m: "Design approved", date: "Oct 16" }, { m: "Demo online for review", date: "Nov 6" }, { m: "Handover", date: "Nov 20" }], currency: "EUR", notes: "Figures are fictional." },
  docs: [  // status: draft | review | approved | outdated | missing. Give "url" (opens) or "path" (copy button, relative to the project root).
    { group: "Brief and contract", title: "Client brief", type: "PDF", status: "approved", path: "docs/brief.pdf", owner: "Alex", updated: "Oct 2" },
    { group: "Brief and contract", title: "Quote and signed contract", type: "PDF", status: "approved", path: "docs/contract-signed.pdf", owner: "Alex", updated: "Oct 3" },
    { group: "Brief and contract", title: "Scope and acceptance criteria", type: "MD", status: "approved", path: "docs/PROJECT_CONTEXT.md", owner: "Alex", updated: "Oct 4" },
    { group: "Technical", title: "Sensor board schematic", type: "PDF", status: "review", path: "hardware/schematic-v2.pdf", owner: "Lina", updated: "Oct 9", note: "Omar to review the pin map" },
    { group: "Technical", title: "Enclosure CAD", type: "STEP", status: "draft", path: "hardware/enclosure.step", owner: "Lina", updated: "Oct 12" },
    { group: "Technical", title: "Firmware state machine", type: "MD", status: "approved", path: "docs/firmware-state-machine.md", owner: "Omar", updated: "Oct 10" },
    { group: "Technical", title: "API contract", type: "MD", status: "missing", owner: "Omar", note: "needed before T3.4" },
    { group: "Technical", title: "Test plan", type: "MD", status: "missing", owner: "Sara", note: "needed before phase 4" },
    { group: "Design", title: "Wireframes", type: "LINK", status: "review", url: "https://example.com/wireframes", owner: "Sara", updated: "Oct 13" },
    { group: "Design", title: "Brand sheet", type: "PDF", status: "outdated", path: "docs/brand.pdf", owner: "Sara", note: "waiting for the final logo" },
    { group: "Business", title: "Pricing sheet", type: "XLSX", status: "approved", path: "docs/pricing.xlsx", owner: "Alex", updated: "Oct 3" },
    { group: "Delivery", title: "Handover checklist", type: "MD", status: "draft", path: "docs/handover-checklist.md", owner: "Alex" },
    { group: "Delivery", title: "User guide", type: "MD", status: "missing", owner: "Alex", note: "after the demo is online" }
  ],
  // Optional. Without it the tabs are generated from the project: Hardware only if there is hardware or firmware, Software only if there is backend or frontend.
  // To merge sections: ui: { tabs: ["Project", "Plan", { label: "Build", parts: ["Hardware", "Software"] }, "Business", "Docs", "Agent", "Gaps", "Identity"] }
  // ui: { tabs: [...] },
  diagrams: [  // kind: system (Project tab) | hardware, wiring (Hardware tab) | software, dataflow, state (Software tab). Set "tab" to override. status: proposed | decided | built
    { id: "sys", kind: "system", status: "decided", title: "System overview", note: "Who talks to whom. Dashed boxes are planned.",
      columns: ["Power", "Sensing", "Device", "Demo", "Visitor"],   // optional lanes, left to right; without it the layout follows the arrows
      nodes: [{ id: "usb", label: "USB 5 V supply", group: "Power" }, { id: "soil", label: "Soil moisture sensor", sub: "capacitive", group: "Sensing" },
              { id: "mcu", label: "ESP32 controller", sub: "firmware v0.1", group: "Device" }, { id: "pump", label: "Water pump and driver", group: "Device" },
              { id: "api", label: "Mock API", sub: "readings, pump commands", group: "Demo", status: "planned" }, { id: "web", label: "Web demo", sub: "3D scene and dashboard", group: "Visitor" }],
      edges: [{ from: "usb", to: "mcu", label: "5 V", kind: "power" }, { from: "soil", to: "mcu", label: "analog level", kind: "signal" }, { from: "mcu", to: "pump", label: "on / off", kind: "control" },
              { from: "mcu", to: "api", label: "readings (Wi-Fi)", kind: "data" }, { from: "api", to: "web", label: "JSON", kind: "data" }] },
    { id: "hw", kind: "hardware", status: "proposed", title: "Block-level schematic: controller board", note: "Drawn from the project data to agree the design. The electrical design is hardware/schematic-v2.pdf.",
      columns: ["Power", "Sensing", "Controller", "Driver", "Load"],   // in / out are the pins drawn on the left and right of a block; edges can name a pin as "block.pin"
      nodes: [{ id: "pwr", label: "Power supply", sub: "USB-C and 3V3 regulator", group: "Power", out: ["5V", "3V3"] },
              { id: "snr", label: "Moisture sensor", group: "Sensing", in: ["VCC"], out: ["AOUT"] },
              { id: "mcu", label: "ESP32-C3", sub: "module", group: "Controller", in: ["3V3", "GPIO2 ADC"], out: ["GPIO5"] },
              { id: "drv", label: "MOSFET driver", group: "Driver", in: ["VMOT", "GATE"], out: ["DRAIN"] }, { id: "pmp", label: "Mini pump 5 V", group: "Load", in: ["PLUS"] }],
      edges: [{ from: "pwr.3V3", to: "snr.VCC", kind: "power" }, { from: "pwr.3V3", to: "mcu.3V3", kind: "power" }, { from: "pwr.5V", to: "drv.VMOT", label: "pump supply", kind: "power" },
              { from: "snr.AOUT", to: "mcu.GPIO2 ADC", label: "0 to 3.3 V", kind: "signal" }, { from: "mcu.GPIO5", to: "drv.GATE", label: "pump enable", kind: "control" }, { from: "drv.DRAIN", to: "pmp.PLUS", kind: "power" }] },
    { id: "fsm", kind: "state", tab: "Hardware", status: "decided", title: "Firmware states", note: "Watering logic from the approved state machine document.",
      nodes: [{ id: "idle", label: "Idle", sub: "sleep between reads" }, { id: "read", label: "Reading", sub: "average 8 samples" }, { id: "water", label: "Watering", sub: "pump on" }, { id: "cool", label: "Cooldown" }, { id: "fault", label: "Fault", sub: "pump off, LED blinks" }],
      edges: [{ from: "idle", to: "read", label: "timer 10 s", kind: "control" }, { from: "read", to: "idle", label: "moisture OK", kind: "control" }, { from: "read", to: "water", label: "below 30%", kind: "control" },
              { from: "water", to: "cool", label: "after 5 s", kind: "control" }, { from: "cool", to: "idle", label: "after 60 s", kind: "control" }, { from: "water", to: "fault", label: "overcurrent", kind: "control" }, { from: "fault", to: "idle", label: "reset", kind: "control" }] },
    { id: "flow", kind: "dataflow", status: "proposed", title: "Data flow: from sensor to screen", note: "Without columns the layout follows the arrows.",
      nodes: [{ id: "fw", label: "ESP32 firmware", sub: "reads sensor" }, { id: "sim", label: "Simulation model", sub: "demo mode, JavaScript" }, { id: "api", label: "Mock API", status: "planned" },
              { id: "store", label: "Readings store", sub: "in memory", status: "planned" }, { id: "ui", label: "Dashboard and 3D scene", sub: "Three.js" }],
      edges: [{ from: "fw", to: "api", label: "POST readings", kind: "data" }, { from: "api", to: "store", label: "save", kind: "data" }, { from: "store", to: "ui", label: "GET readings", kind: "data" }, { from: "sim", to: "ui", label: "simulated readings", kind: "data" }] },
    { kind: "wiring", title: "System drawing", status: "proposed", nodeWidth: 200,   // nodeWidth 140 to 280. kinds: your own wire types. zones: outlined areas (enclosure, location; style "dashed" for field or planned areas; list a zone's blocks together). Blocks may carry lines (mono text) and a tag.
      note: "Fictional example of the full system-drawing style.",
      kinds: [{ key: "power", label: "Power 5 V", color: "#f59a3c" }, { key: "uart", label: "UART 3.3 V", color: "#4ade80" }, { key: "wifi", label: "Wi-Fi (planned)", color: "#a78bfa", dash: true }],
      zones: [{ id: "box", label: "Planter electronics", nodes: ["usb", "mcu", "drv"] }],
      nodes: [{ id: "usb", label: "USB-C supply", sub: "5 V, 2 A" },
              { id: "mcu", label: "ESP32-C3 module", sub: "firmware: state machine", in: ["ADC in"], out: ["GPIO5", "UART TX"], lines: ["Wi-Fi: planned", "Do not use: GPIO18/19 (USB)"] },
              { id: "drv", label: "Pump driver", sub: "MOSFET + flyback diode", in: ["gate"], tag: { text: "bench test pending", tone: "warn" } },
              { id: "sens", label: "Moisture sensor", sub: "capacitive, analog", tag: { text: "tested", tone: "ok" } },
              { id: "pump", label: "Mini pump", sub: "5 V, 380 mA" },
              { id: "app", label: "Phone app", sub: "optional", status: "planned" }],
      edges: [{ from: "usb", to: "mcu", kind: "power", label: "5 V rail" }, { from: "mcu.GPIO5", to: "drv.gate", kind: "uart", start: "PWM 1 kHz" }, { from: "sens", to: "mcu.ADC in", kind: "signal", end: "ADC1" }, { from: "drv", to: "pump", kind: "power" }, { from: "mcu", to: "app", kind: "wifi", status: "planned" }] }
  ],
  hardware: { tree: ["hardware/ | design files", "hardware/schematic.pdf | planned", "hardware/bom.csv | planned", "hardware/enclosure.step | planned"], summary: "One ESP32-C3 board reads a capacitive moisture sensor and switches a 5 V pump through a MOSFET.", interfaces: ["ADC", "GPIO", "UART debug", "Wi-Fi"], currency: "EUR",
    power: [{ rail: "5 V USB", source: "USB-C", capacity: 500, loads: [{ name: "Pump", mA: 380 }, { name: "3V3 regulator", mA: 90 }] },
            { rail: "3V3", source: "regulator", capacity: 600, loads: [{ name: "ESP32-C3 with Wi-Fi", mA: 260 }, { name: "Moisture sensor", mA: 5 }] }],   // capacity and mA are numbers you entered
    bom: [{ ref: "U1", part: "ESP32-C3 module", qty: 1, unit: 3.2, status: "approved" }, { ref: "S1", part: "Capacitive moisture sensor", qty: 1, unit: 1.8, status: "approved" }, { ref: "Q1", part: "Logic-level MOSFET", qty: 1, unit: 0.4, status: "review" },
          { ref: "D1", part: "Flyback diode", qty: 1, unit: 0.1 }, { ref: "M1", part: "Mini pump 5 V", qty: 1, unit: 4.5, status: "approved" }, { ref: "U2", part: "3V3 regulator", qty: 1, unit: 0.3 },
          { ref: "J1", part: "USB-C connector", qty: 1, unit: 0.5 }, { ref: "T1", part: "Silicone tube 1 m", qty: 1, unit: null, note: "supplier not chosen", status: "draft" }],
    pins: [{ pin: "GPIO2", signal: "Moisture (ADC)", connects: "S1 AOUT", note: "ADC1 channel, keep Wi-Fi-safe" }, { pin: "GPIO5", signal: "Pump enable", connects: "Q1 gate", note: "10 k pulldown" }, { pin: "GPIO8", signal: "Status LED", connects: "LED1", note: "onboard" }, { pin: "GPIO20 / 21", signal: "UART debug", connects: "header J2", note: "115200 baud" }] },
  software: { summary: "A static web demo with a small simulation model. A mock API stands in for the board until the live link is decided.",
    layers: [{ name: "Presentation", tech: "HTML, CSS, JS, Three.js", items: ["3D planter scene", "Moisture dashboard", "Controls"] }, { name: "Logic", tech: "JavaScript", items: ["Simulation model", "Pump rules"] },
             { name: "Data access", tech: "fetch, JSON", items: ["Readings client", "Demo mode switch"] }, { name: "Service", tech: "Small REST API", items: ["Readings", "Pump command"] }, { name: "Device", tech: "ESP32 firmware, C++", items: ["Sensor read", "State machine", "HTTP client"] }],
    modules: [{ name: "scene.js", layer: "Presentation", role: "planter model, lighting, camera", tech: "Three.js", owner: "Sara", status: "doing" }, { name: "sim.js", layer: "Logic", role: "soil moisture and pump model", tech: "JavaScript", owner: "Sara", status: "todo" },
              { name: "api/readings", layer: "Service", role: "store and return readings", tech: "REST", owner: "Omar", status: "draft" }, { name: "main.cpp", layer: "Device", role: "state machine and pump control", tech: "C++", owner: "Omar", status: "todo" }],
    endpoints: [{ method: "GET", path: "/api/readings", purpose: "latest 100 readings", auth: "none (demo)" }, { method: "POST", path: "/api/readings", purpose: "device sends a reading", auth: "device token" }, { method: "POST", path: "/api/pump", purpose: "start pump for N seconds", auth: "demo token" }],
    data: [{ entity: "Reading", fields: "id, soil_pct, ts", note: "one row per sample" }, { entity: "PumpEvent", fields: "id, started, seconds", note: "written by the device" }] },
  sections: {   // firmware | app | frontend | backend | database | ui | code. Every field is optional.
    firmware: { summary: "State machine on the ESP32-C3: read sensor, decide, drive the pump, report over Wi-Fi.", stack: ["C++", "Arduino framework", "PlatformIO"], owner: "Omar", status: "todo",
      tree: ["firmware/ | ESP32-C3 project", "firmware/platformio.ini | board and libraries", "firmware/src/main.cpp | state machine | planned", "firmware/src/sensor.cpp | planned", "firmware/src/pump.cpp | planned", "firmware/test/ | planned"],
      items: [{ name: "main.cpp", role: "state machine", tech: "C++", status: "todo" }, { name: "sensor.cpp", role: "moisture read and filter", tech: "C++", status: "todo" }] },
    app: { summary: "Static web demo with a simulated planter.", stack: ["HTML", "CSS", "JavaScript"], owner: "Sara", status: "doing",
      tree: ["web/ | static site", "web/index.html | page", "web/app.js | simulation and UI", "web/scene.js | 3D scene | planned"] }
  },
  assets: [{ name: "Planter model", type: "model", path: "web/assets/planter.glb", source: "own CAD export", license: "client owns", status: "planned" }, { name: "Leaf texture", type: "image", source: "CC0 library", license: "CC0", status: "built" }],   // type groups the cards; status: planned | built | missing
  libs: [{ name: "Three.js", version: "r160", purpose: "3D scene (approved)", license: "MIT", url: "https://threejs.org" }],
  quality: { tests: [{ area: "Moisture filter", type: "unit", status: "todo" }, { area: "Demo page on phone", type: "manual", status: "passing", note: "checked at 360 px" }],   // status: passing | failing | todo
    checklist: [{ t: "Client approves the scene", done: false }, { t: "Hosting decided", done: false }, { t: "Final accessibility check", done: false }],
    envs: [{ name: "Local", status: "built", note: "open web/index.html" }, { name: "Live demo", status: "proposed", note: "host not chosen" }] },
  agent: { name: "Forge", log: [{ date: "2026-10-13", task: "Built the hub and the work plan", skills: ["project-hub", "writing-plans"] }], usedSkills: [{ name: "brainstorming", why: "chose the simulation approach" }, { name: "writing-plans", why: "split the work into tasks with hours" }, { name: "project-hub", why: "built this hub" }, "3d-scene-builder"], notes: "" },
  gaps: [  // priority: blocker | important | nice. status: open | decided (decision = text). Options need label; note and recommended are optional.
    { id: "G1", area: "plan", priority: "blocker", question: "Are the hour estimates right?", why: "They set the delivery date and the price margin. All estimates are first guesses.",
      options: [{ label: "Confirm as they are", note: "team has seen them" }, { label: "Review in a planning call first", note: "adds one meeting", recommended: true }], status: "open" },
    { id: "G2", area: "tracks", priority: "important", question: "How realistic must the soil simulation be?", why: "It decides the effort of task T3.2 and how it behaves on phones.",
      options: [{ label: "Simple model", note: "fast, light, easy to explain", recommended: true }, { label: "Physics-based model", note: "more realistic, about 2x the hours" }, { label: "Replay of real sensor data", note: "needs a recorded data set from the board" }], status: "open" },
    { id: "G4", area: "architecture", priority: "important", question: "Should the demo talk to a real board or only to the simulation?", why: "It decides whether the mock API and the Wi-Fi link are built at all.",
      options: [{ label: "Simulation only", note: "no hardware needed on the client site", recommended: true }, { label: "Live board over Wi-Fi", note: "impressive, needs power and Wi-Fi on site" }, { label: "Both, with a switch", note: "most work, safest for demos" }], status: "open" },
    { id: "G3", area: "business", priority: "important", question: "Who hosts the demo after handover?", options: [{ label: "Client's own server" }, { label: "Our hosting, monthly fee", recommended: true }, { label: "Static host, client pays directly" }], status: "decided", decision: "Our hosting, monthly fee" }
  ],
  identity: { palette: [{ name: "Leaf", hex: "#2f9e5a", role: "primary" }, { name: "Sun", hex: "#f2b138", role: "accent" }, { name: "Soil", hex: "#3b2f2a", role: "text" }],
    fonts: { heading: "Inter", body: "Inter" }, tone: ["calm", "clear", "friendly"], tech: ["Plain CSS", "SVG icons"], references: ["https://example.com/brand-inspiration"] }
};
