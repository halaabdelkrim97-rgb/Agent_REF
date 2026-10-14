---
name: frontend-developer
description: Frontend component, responsive layout, client-side state, performance and accessibility guidance. Plain HTML, CSS and JavaScript by default; React 19 and Next.js 15 parts apply only if the project already uses them. Use when building or fixing UI components or frontend behavior.
metadata:
  model: inherit
---

# Frontend Developer

Use the existing stack; default to native HTML/CSS/JavaScript for new projects. Reuse approved dependencies. Do not add a framework for a small UI task.

## Work procedure
1. Read the project context and relevant entry points. Trace only the interaction being changed.
2. Identify acceptance criteria, state owner and affected UI. Reuse the project's existing components and conventions.
3. Implement semantic HTML, responsive CSS and accessible keyboard behavior. Include loading, empty and error states when the feature needs them.
4. Verify the changed interaction and nearby integration points. For visible changes use the visual workflow below. Run broader existing checks before release.

## Structure
- Separate domain calculations and data access from rendering and event handlers when they have independent responsibilities. Keep tiny projects simple; do not create empty architecture folders.
- Give each piece of shared state one owner. Pass data through explicit inputs/outputs; avoid new hidden globals and circular imports.
- Extract a shared component when repetition or an independent responsibility justifies it, not for every element. Keep routes/scenes as composition points.
- Use existing design tokens; centralize new palette, spacing, typography, radius and motion values in the project's existing theme or CSS variables.
- Keep secrets out of client code. Dispose listeners, timers and renderers when views exit. Keep unrelated refactors outside the task.

## Visual workflow
For a new visual concept, redesign or generic-looking output, load `art-direction` before implementation. Use its medium selection and rendered critique; keep this skill focused on structure and behavior.
For new UI or a redesign, record a short visual brief in project context section 10 using `../../TEMPLATES/VISUAL_BRIEF.md` from the installed REF tree. Do not duplicate it into another summary.
Polish one representative screen or component, including a narrow viewport and real-length content, before expanding the pattern. For a defined design, proceed within its direction; ask only about unresolved choices that materially affect the result.
When browser tools exist, capture and inspect desktop and mobile states. Fix hierarchy, spacing, typography, contrast, overflow and interaction defects. Use at most two visual correction rounds by default; after that report remaining gaps and the concrete blocker. Do not mark unresolved acceptance criteria as passed. A round limit never overrides required checks or justifies delivering broken behavior.

## Optional framework reference
Only for an existing or approved React/Next.js task, consult the relevant headings of [the React/Next.js catalog](references/react-next-catalog.md). It is a reference, not a required tool list. Do not load it for vanilla projects.
