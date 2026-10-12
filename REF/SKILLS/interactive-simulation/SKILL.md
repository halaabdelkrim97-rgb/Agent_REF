---
name: interactive-simulation
description: Model, state, fixed-timestep loop, physics basics, parameter controls, performance budget and delivery for 2D (Canvas or SVG) interactive simulations, product demos and browser games. For 3D scenes use 3d-scene-builder. Use for simulations, configurators, mechanism demos and animated explainers.
metadata:
  source: original (Agent_REF); informed by public browser-game and Three.js game skill collections
  date_added: '2026-10-12'
---

> **Stack gate (vanilla-first):** Start with plain HTML, CSS and JavaScript (Canvas 2D or SVG). Physics engines, game engines, Three.js and build tools are external dependencies: say why they would help and ask first. For 3D use the `threejs` skill after approval.

# Interactive Simulation

Goal: a client opens one page, moves a control, and sees how their product behaves. Correct, smooth and easy to hand over.

## 1. Scope first (ask, one question at a time)
- What question should the simulation answer for the client's customer? (the one thing it must show)
- Illustrative or engineering-accurate? Say which, and write it on the page.
- Inputs the user can change, outputs they should read, and the ranges (with units).
- Device targets (desktop, tablet, phone), offline need, branding, data the client can share.
- Source models: CAD export (glTF/STEP/STL), measured data, formulas. Ask for units and a reference case with a known result.

## 2. Architecture (keeps it small and testable)
- **Model** (pure JS, no DOM): state, parameters, `step(dt)`. **View** (canvas/SVG/DOM): draws state. **Controls** (inputs): change parameters. Never mix them.
- One state object; the view reads it. Controls write parameters, not pixels.
- Fixed timestep for the model (for example 1/120 s) with an accumulator, and `requestAnimationFrame` for drawing. Cap `dt` after tab switches.
- Presets (named parameter sets), Reset, Pause, Speed. Compare A/B when the client sells variants.
- Show live readouts (value, unit) next to the visual. Put formulas and assumptions in a collapsible "How this works".

## 3. Choose the renderer
| Need | Use |
| --- | --- |
| Diagrams, mechanisms, flows, gauges, graphs | SVG (crisp, accessible) or Canvas 2D |
| Many moving objects, particles, 2D games | Canvas 2D |
| Product in 3D, rotate/explode/configure | `threejs` skill (ask first), glTF models |
| Charts of results | Canvas/SVG line chart drawn by hand; library only with approval |

## 4. Physics and math
- Use semi-implicit Euler for simple motion; RK4 for stiff or oscillating systems. Smaller `dt` before bigger formulas.
- Keep SI units inside the model; convert only for display. Name variables with units.
- Check stability: energy should not grow on its own. Clamp, damp or reduce `dt` when it does.
- Collisions: start with circles/AABB and simple impulses. Engines (Matter.js, Rapier, cannon-es) only with approval.
- Verify with a reference case: a known analytic result or the client's measured data. Report the error.

## 5. Performance budget
- 60 fps on the target device. Draw only what changed, reuse objects, no allocations inside the frame loop.
- Handle resize and device pixel ratio: scale the canvas buffer, not only CSS.
- Pause when the tab is hidden. Respect `prefers-reduced-motion` with a calm or paused default.
- Large assets: compress, lazy load, show progress.

## 6. Client delivery
- One folder, no build step, no external CDN unless approved (and then pinned). Browsers block ES modules (`type="module"`, `import`) on `file://`, so choose one: (a) plain `<script>` files or one inline script if the client must open it by double click, or (b) modules plus a static host or `python3 -m http.server`, and say so in the README.
- Add `<link rel="icon" href="data:,">` (or a real icon) so the console has no 404 for `favicon.ico`.
- Works offline if promised. No tracking, no third-party calls without the client's consent.
- Touch and keyboard support, labels on every control, readable on a phone.
- Include a one-page README: how to run, how to change parameters, units, assumptions, known limits.
- Mark clearly what is estimated. Never present an illustrative model as a guarantee.

## 7. Verify before showing a client
Use the `testing` skill: console clean, resize 360/768/1280, keyboard, reduced motion, the reference case matches, extremes of every slider behave (zero, max, negative where allowed), reset restores the start state.

See [references/simulation-patterns.md](references/simulation-patterns.md) for code patterns (loop, controls, state, graph).
