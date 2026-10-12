---
name: 3d-scene-builder
description: Designs and builds interactive 3D scenes and game-like product demos for client websites - art direction, procedural modeling from primitives, materials, lighting, camera, interaction and website embedding with Three.js. Use when a client wants a 3D device, machine or product shown or simulated on their site, or when a scene needs to look good, not just work.
metadata:
  source: original (Agent_REF); builds on the threejs and interactive-simulation skills
  date_added: '2026-10-12'
---

> **Stack gate (vanilla-first):** For web showcases the default engine is Three.js, an external library: propose it once per project with the benefit and wait for approval; load it without a build step (import map, pinned version or a local copy). If the project is a professional Unity project, use `unity-scene-builder` after the art direction below. Asset generators, AI image or 3D services and extra libraries need their own approval. Without a 3D engine, fall back to SVG/Canvas 2D (`interactive-simulation`).

# 3D Scene Builder

Order of work: brief, engine choice, art direction, blockout, look, interaction, polish, delivery. Do not jump to details before the blockout reads well. Use `threejs` for API details (open only the topic file you need) and `interactive-simulation` for the model and loop.

## 1. Brief (ask one question at a time)
What the visitor should understand or do in 30 seconds, the product and its moving parts, brand colors and mood, the page it sits in (size, position), device targets, and source assets (CAD export, photos, logo). Ask for a CAD export in glTF (or STEP/STL to convert) when the product exists.

## 1b. Choose the engine and asset level (ask the user)
| Situation | Engine |
| --- | --- |
| Light product showcase, configurator, fast load, SEO or phone-first | Three.js (this skill, plus `threejs`) |
| Professional project, heavy mechanics or physics, Asset Store content, high-end visuals | Unity (`unity-scene-builder`) |
Asset levels (each step up needs approval): (1) primitives only, no outside assets; (2) a client or CAD model as glTF, free HDRI and textures; (3) paid, purchased or AI-generated assets that the user provides or approves, with licenses checked and never committed to a public repo.

## 2. Art direction (write it down in about 8 lines)
- **Mood** in two words, **palette** of 4 to 6 colors (one hero color, neutrals, one accent), **background** (solid, soft gradient, studio floor).
- **Hero object** and what moves. **Camera:** a 3/4 view at 35 to 50 degrees field of view, orbit limits so the visitor cannot get lost.
- **Light plan:** key + fill + rim, or an environment light. **Level of detail:** clean, slightly stylized shapes read better than noisy realism.
- Share this with the user before building. Change it first, not later. The same direction drives Three.js or Unity.

## 3. Blockout with primitives (no external assets needed)
- Build the product from boxes, cylinders, spheres, lathe and extrude shapes. Group parts in `Group`s that match real assemblies (base, arm, door, rotor) so they can move.
- Set pivots at the real joint axes. Name every object. Real-world scale in meters, one unit equals one meter.
- Add bevel-like detail with slightly smaller inset boxes, rings and fillets on key edges. Use instancing for repeated parts (bolts, vents, tiles).
- A simple ground plane with a soft contact shadow sells the object.

## 4. Look
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
