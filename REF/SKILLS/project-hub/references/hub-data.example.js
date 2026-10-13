/* EXAMPLE with fictional content (team, client and figures are invented). Shows every field and its allowed values.
   Copy shapes, not facts. */
const HUB = {
  project: { name: "Smart Planter Demo", tagline: "Interactive web demo of a self-watering planter", client: "Greenleaf Co (fictional)", status: "design", version: "v0.2", updated: "2026-10-13",
    goal: "Let garden-shop visitors see how the planter reads soil moisture and waters by itself, on a simulated device.",
    stack: ["HTML", "CSS", "JavaScript", "Three.js (approved)", "ESP32 firmware (C++)", "Small REST API"],
    links: [{ label: "Repository", url: "https://example.com/repo" }, { label: "Client folder", url: "https://example.com/drive" }] },
  context: { problem: "The client cannot show a hidden mechanism (sensor, pump, logic) in photos or a video.",
    users: "Garden-shop visitors on phones and desktops; the client's sales team.",
    scope: { in: ["3D planter with live soil-moisture simulation", "Pump on/off logic shown step by step", "Dashboard with a moisture chart", "Working hardware test board"], out: ["Real cloud connection", "Checkout", "Native app"] },
    constraints: ["Runs on a 3-year-old phone", "Delivery 2026-11-20", "Budget fixed by the quote"], assumptions: ["Client sends final logo by Oct 16", "CAD export as STEP is available"],
    stakeholders: [{ name: "Alex", role: "lead, client contact" }, { name: "Lina", role: "hardware and CAD" }, { name: "Omar", role: "firmware and backend" }, { name: "Sara", role: "frontend and 3D" }] },
  tracks: [  // key: hardware | firmware | backend | frontend | other. Tasks join a track through their "track" field.
    { key: "hardware", title: "Hardware", applicable: true, status: "doing", owner: "Lina", stack: ["KiCad", "STEP / glTF export"], summary: "Sensor board, pump driver, simplified enclosure for the web." },
    { key: "firmware", title: "Firmware", applicable: true, status: "doing", owner: "Omar", stack: ["ESP32", "C++"], summary: "Moisture read, hysteresis, pump control, serial log." },
    { key: "backend", title: "Backend", applicable: true, status: "todo", owner: "Omar", stack: ["Small REST API"], summary: "Mock readings and pump commands for the demo." },
    { key: "frontend", title: "Frontend", applicable: true, status: "doing", owner: "Sara", stack: ["HTML", "CSS", "JS", "Three.js"], summary: "3D scene, simulation, dashboard, responsive layout." }
  ],
  plan: {
    estimateNote: "First estimates by Forge from the brief. Not yet confirmed by the team; confirm in the next planning call.",
    // task: { id, t, owner, est (hours), spent (hours), status: todo|doing|blocked|done, due, after: [ids], track, note }
    phases: [
      { name: "1. Discovery", status: "done", start: "Oct 1", end: "Oct 4", tasks: [
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
    { group: "Brief and contract", title: "Scope and acceptance criteria", type: "MD", status: "approved", path: "REF/CONTEXT/001_PROJECT_CONTEXT.md", owner: "Alex", updated: "Oct 4" },
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
  agent: { name: "Forge", usedSkills: [{ name: "brainstorming", why: "chose the simulation approach" }, { name: "writing-plans", why: "split the work into tasks with hours" }, { name: "project-hub", why: "built this hub" }, "3d-scene-builder"], notes: "" },
  gaps: [  // priority: blocker | important | nice. status: open | decided (decision = text). Options need label; note and recommended are optional.
    { id: "G1", area: "plan", priority: "blocker", question: "Are the hour estimates right?", why: "They set the delivery date and the price margin. All estimates are first guesses.",
      options: [{ label: "Confirm as they are", note: "team has seen them" }, { label: "Review in a planning call first", note: "adds one meeting", recommended: true }], status: "open" },
    { id: "G2", area: "tracks", priority: "important", question: "How realistic must the soil simulation be?", why: "It decides the effort of task T3.2 and how it behaves on phones.",
      options: [{ label: "Simple model", note: "fast, light, easy to explain", recommended: true }, { label: "Physics-based model", note: "more realistic, about 2x the hours" }, { label: "Replay of real sensor data", note: "needs a recorded data set from the board" }], status: "open" },
    { id: "G3", area: "business", priority: "important", question: "Who hosts the demo after handover?", options: [{ label: "Client's own server" }, { label: "Our hosting, monthly fee", recommended: true }, { label: "Static host, client pays directly" }], status: "decided", decision: "Our hosting, monthly fee" }
  ],
  identity: { palette: [{ name: "Leaf", hex: "#2f9e5a", role: "primary" }, { name: "Sun", hex: "#f2b138", role: "accent" }, { name: "Soil", hex: "#3b2f2a", role: "text" }],
    fonts: { heading: "Inter", body: "Inter" }, tone: ["calm", "clear", "friendly"], references: ["https://example.com/brand-inspiration"] }
};
