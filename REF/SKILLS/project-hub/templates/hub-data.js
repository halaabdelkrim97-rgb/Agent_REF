/* Project Hub data. Forge edits only this file. Unknown values stay "" or [] and show as "to define".
   Never invent facts, prices or dates. Shapes are in references/hub-data.example.js. */
const HUB = {
  project: { name: "", tagline: "", client: "", status: "planning", version: "", updated: "", goal: "", stack: [], links: [] },
  context: { problem: "", users: "", scope: { in: [], out: [] }, constraints: [], assumptions: [], stakeholders: [] },
  tracks: [],
  plan: { phases: [], actions: [], next: [], risks: [], decisions: [], resume: "" },
  business: { audience: "", value: "", model: "", offer: [], costs: [], kpis: [], milestones: [], currency: "EUR", notes: "" },
  agent: { name: "Forge", usedSkills: [], notes: "" },
  gaps: [],
  identity: { palette: [], fonts: { heading: "", body: "" }, tone: [], references: [] }
};
