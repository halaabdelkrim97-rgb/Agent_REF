---
name: 3d-scene-builder
description: Art-directed cinematic 3D scenes, environments and interactive web experiences: brief, art direction, blockout, materials, lighting, interaction, performance budget, embedding. Three.js by default (ask first); Unity only if the user defines a Unity project.
metadata:
  source: original (Agent_REF); builds on the threejs and interactive-simulation skills
  date_added: '2026-10-12'
---

> **Stack gate (vanilla-first):** For web showcases the default engine is Three.js, an external library: propose it once per project with the benefit and wait for approval; load it without a build step (import map, pinned version or a local copy). Unity is used only when the user says the project is a Unity project: use `unity-scene-builder` after the art direction below. Never propose Unity yourself, and never add it to basic or light projects. Asset generators, AI image or 3D services and extra libraries need their own approval. Without a 3D engine, fall back to SVG/Canvas 2D (`interactive-simulation`).

# 3D Scene Builder

For new artistic scenes or weak visual results, load `art-direction` first. Set style, composition, asset strategy and camera beats before choosing geometry. The product-demo questions below apply only to product work; do not ask for CAD or measured data for an artistic scene or game.

Order of work: brief, engine choice, art direction, blockout, look, interaction, polish, delivery. Do not jump to details before the blockout reads well. Use `threejs` for API details (open only the topic file you need) and `interactive-simulation` for the model and loop.

## Efficient visual workflow
Reuse decisions already in context. Use `../../TEMPLATES/VISUAL_BRIEF.md` from the installed REF tree to fill context section 10; do not create a duplicate brief. Ask only about missing choices that affect the outcome. Reuse approved engine and asset choices without asking again.
After blockout, polish one representative composition before building all scenes. If shape quality is the limitation, use a suitable approved CAD/glTF or licensed model instead of endlessly adding primitives. Capture and inspect desktop/mobile views when tools exist; compare silhouette, framing, material separation, lighting and motion to the brief. Check loading and non-WebGL fallback. Allow two visual correction rounds by default, then record remaining gaps and blockers; do not call the result finished if acceptance criteria fail. Never claim visual validation when screenshots were unavailable.

## 1. Brief (ask only unresolved questions)
What the visitor should understand or do in 30 seconds, the product and its moving parts, brand colors and mood, the page it sits in (size, position), device targets, and source assets (CAD export, photos, logo). Ask for a CAD export in glTF (or STEP/STL to convert) when the product exists.

## 1b. Choose the engine and asset level (ask the user)
| Situation | Engine |
| --- | --- |
| Everything else: showcase, configurator, fast load, SEO, phone-first | Plain web stack with Three.js after approval (this skill, plus `threejs`) |
| The user has defined the project as a Unity project (heavy mechanics, Asset Store content, high-end visuals) | Unity (`unity-scene-builder`), only because the user said so |
Asset levels (new purchases, services or scope need approval unless already authorized): (1) primitives only, no outside assets; (2) a client or CAD model as glTF, free HDRI and textures; (3) paid, purchased or AI-generated assets that the user provides or approves, with licenses checked and never committed to a public repo.

## 2. Art direction (write it down in about 8 lines)
- **Mood** in two words, **palette** of 4 to 6 colors (one hero color, neutrals, one accent), **background** (solid, soft gradient, studio floor).
- **Hero object** and what moves. **Camera:** choose framing and perspective for the brief; a 3/4 view at 35 to 50 degrees field of view is an optional product-showcase starting point, not a cinematic rule. Set movement limits where controls require them.
- **Light plan:** key + fill + rim, or an environment light. **Level of detail:** clean, slightly stylized shapes read better than noisy realism.
- Share this with the user before building. Change it first, not later. The same direction drives Three.js or Unity.

## 3. Blockout with primitives (no external assets needed)
- Build the product from boxes, cylinders, spheres, lathe and extrude shapes. Group parts in `Group`s that match real assemblies (base, arm, door, rotor) so they can move.
- Set pivots at the real joint axes. Name every object. Real-world scale in meters, one unit equals one meter.
- Add bevel-like detail with slightly smaller inset boxes, rings and fillets on key edges. Use instancing for repeated parts (bolts, vents, tiles).
- A simple ground plane with a soft contact shadow sells the object.

## 4. Look
- For cinematic scenes, plan establish/reveal/focus/resolve beats with a subject and reason for each camera move. Compose foreground, subject and background; check framing throughout transitions. Build one complete composition before all sequences.
- Choose intentional stylization or suitable approved models when primitive geometry cannot meet the silhouette. Refine proportions and edges before surface detail. Use art-direction's optional cinematic reference for lighting/material/atmosphere critique.
- Add post-processing only for a specific visual purpose within the device budget; it is not a substitute for composition or asset quality. Verify actual frames and motion, camera clipping and transitions, not just scene source.
- Materials: `MeshStandardMaterial` with a few presets (painted metal, brushed metal, rubber, glass, emissive screen). Keep roughness and metalness values deliberate.
- Lighting: environment or hemisphere light for base, one shadow-casting directional key, a weak rim. Tone mapping on, correct output color space, soft shadows with sensible map size.
- Color: stay in the palette. Contrast comes from value (light vs dark), not many hues.
- Labels and hotspots: HTML overlays tied to 3D positions, not text inside the scene.

## 5. Interaction (game-like feel)
- Orbit with damping and limits, tap or hover to highlight a part, click a hotspot to explain or animate it, sliders or buttons for the product's real inputs.
- Animate parts through the model, not by hand-tweening: input changes the model, the model drives the meshes. Ease camera moves between named views.
- Show a readout (speed, temperature, flow) tied to the simulation values, with units.
- Pointer and touch both work; keyboard focus on the controls; a reduced-motion mode that skips camera fly-throughs.

## 6. Performance (website-safe)
- Budget: 60 fps on a mid phone, under about 100 draw calls, under about 300k triangles, textures no larger than needed (2048 max, compressed formats if available), one renderer.
- Cap pixel ratio at 2. Render on demand when nothing moves. Pause when off-screen (`IntersectionObserver`) or hidden.
- Dispose geometries, materials and textures you remove. Show a loading state for assets. Provide a static image fallback if WebGL is unavailable.

## 7. Delivery as a website embed
- Self-contained folder: `index.html`, scripts, assets, README. Embed with an `iframe` or mount into a `div` with a fixed aspect ratio so the page does not jump.
- No tracking or third-party calls without client consent. Keep Three.js pinned and local when possible.
- Test with the `testing` skill (console clean, resize, touch, keyboard, reduced motion) and the `security-review` checklist if the page takes input or loads remote files.

## What to tell the client
Whether it is illustrative or measured, which parts are simplified, the supported devices, and the file size. Never show a simplified model as an engineering guarantee.
