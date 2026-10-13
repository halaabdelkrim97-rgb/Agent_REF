/* Project Hub data. Forge edits only this file. Unknown values stay "" or [] and show as "to define".
   Never invent facts, prices or dates. Shapes are in references/hub-data.example.js and references/profiles.md. */
const HUB = {
  /* type decides the middle tabs: "web" | "mechatronics" | "game" | "" (picked from the data). apps: ["webapp","mobile","hmi"] */
  profile: { type: "", apps: [] },
  project: { name: "", tagline: "", client: "", status: "planning", version: "", updated: "", goal: "", stack: [], links: [] },
  context: { problem: "", users: "", scope: { in: [], out: [] }, constraints: [], assumptions: [], stakeholders: [] },
  tracks: [],
  plan: { phases: [], actions: [], next: [], risks: [], decisions: [], resume: "" },
  sections: {},   /* frontend, backend, database, firmware, app, ui, code: { summary, stack, owner, status, tree, items, endpoints, tables } */
  structure: [],  /* project folder tree, lines like "src/app.js | entry point" */
  assets: [], libs: [],
  quality: { tests: [], checklist: [], envs: [] },
  business: { audience: "", value: "", model: "", offer: [], costs: [], kpis: [], milestones: [], currency: "EUR", notes: "" },
  agent: { name: "Forge", usedSkills: [], roles: [], log: [], notes: "" },
  gaps: [],
  identity: { palette: [], fonts: { heading: "", body: "" }, tone: [], tech: [], references: [] }
};
