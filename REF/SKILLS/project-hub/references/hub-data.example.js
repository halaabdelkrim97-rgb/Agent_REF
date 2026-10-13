/* EXAMPLE with fictional content. It shows every field and its allowed values. Copy shapes, not facts. */
const HUB = {
  project: { name: "Desk Fan Demo", tagline: "Interactive product simulation", client: "Example Co", status: "doing", version: "v0.3", updated: "2026-10-13",
    goal: "Let visitors see how the fan speed responds to their input.", stack: ["HTML", "CSS", "JavaScript", "Three.js (approved)"],
    links: [{ label: "Repository", url: "https://example.com/repo" }] },
  context: { problem: "The client cannot show motion and airflow in a static product page.", users: "Retail visitors on phones and desktops.",
    scope: { in: ["3D fan with speed control", "Part labels"], out: ["Checkout", "User accounts"] },
    constraints: ["Runs on a 3-year-old phone", "Delivery 2026-11-15"], assumptions: ["Client supplies the final logo"],
    stakeholders: [{ name: "Alex (client)", role: "approves design" }, { name: "You", role: "development" }] },
  tracks: [  // key: hardware | firmware | backend | frontend | other. status and item status: todo | doing | done
    { key: "frontend", title: "Frontend", applicable: true, status: "doing", owner: "You", stack: ["HTML", "CSS", "JS"], summary: "Scene, controls, responsive layout.",
      items: [{ t: "Fan model", status: "done" }, { t: "Speed slider", status: "doing", note: "touch support open" }, { t: "Part labels", status: "todo" }] },
    { key: "backend", title: "Backend", applicable: false },
    { key: "hardware", title: "Hardware", applicable: false },
    { key: "firmware", title: "Firmware", applicable: false }
  ],
  plan: {
    phases: [{ name: "Brief", status: "done", progress: 100, start: "Oct 1", end: "Oct 3", tasks: [{ t: "Collect brief", done: true }] },
             { name: "Prototype", status: "doing", progress: 40, start: "Oct 4", end: "Oct 15", tasks: [{ t: "Fan model", done: true }, { t: "Controls", done: false }] },
             { name: "Delivery", status: "todo", progress: 0, start: "Nov 1", end: "Nov 15", tasks: [] }],
    actions: [{ a: "Finish speed slider", owner: "You", due: "Oct 16", status: "doing", priority: "high", track: "Frontend" },
              { a: "Ask client for logo", owner: "You", due: "Oct 14", status: "todo", priority: "medium", track: "Business" },
              { a: "Collect brief", owner: "You", due: "Oct 3", status: "done", priority: "low", track: "Project" }],
    next: ["Finish controls", "Test on a phone"], resume: "python3 -m http.server 8000, open examples/desk-fan",
    risks: [{ r: "Slow on old phones", level: "high", mitigation: "Cap pixel ratio, test early" }],   // level: low | medium | high
    decisions: [{ d: "Plain JS first", why: "Light project", date: "2026-10-02" }]
  },
  business: { audience: "Retail visitors", value: "See the product move before buying", model: "Fixed fee",
    offer: [{ item: "Demo build", price: 2400, note: "3D fan" }, { item: "Handover", price: null, note: "price not agreed yet" }],
    costs: [{ item: "Hosting", amount: 120 }], kpis: [{ k: "Demo plays", target: "500/month", now: "" }],
    milestones: [{ m: "Client review", date: "Oct 20" }], currency: "EUR", notes: "" },
  agent: { name: "Forge", usedSkills: [{ name: "brainstorming", why: "choose the approach" }, "3d-scene-builder"], notes: "" },
  gaps: [  // priority: blocker | important | nice. status: open | decided (decision = text). Options need label; note and recommended are optional.
    { id: "G1", area: "tracks", priority: "blocker", question: "Which 3D approach should the demo use?", why: "It decides the build effort and the performance on phones.",
      options: [{ label: "Three.js primitives", note: "fast, light, plain web stack", recommended: true }, { label: "glTF model from CAD", note: "more realistic, needs export" }, { label: "Unity WebGL", note: "heavy; only for projects you define as Unity" }], status: "open" },
    { id: "G2", area: "business", priority: "important", question: "How is the handover priced?", options: [{ label: "Included" }, { label: "Separate fee" }], status: "decided", decision: "Included" }
  ],
  identity: { palette: [{ name: "Indigo", hex: "#3b3bff", role: "primary" }, { name: "Amber", hex: "#ffb703", role: "accent" }, { name: "Ink", hex: "#161a2b", role: "text" }],
    fonts: { heading: "Inter", body: "Inter" }, tone: ["clear", "technical", "warm"], references: ["https://example.com/brand"] }
};
