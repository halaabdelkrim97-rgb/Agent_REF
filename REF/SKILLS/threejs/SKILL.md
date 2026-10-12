---
name: threejs
description: Three.js 3D graphics for the web - scenes, cameras, renderer, Object3D hierarchies, geometry and instancing, materials (PBR), textures, UVs, lighting and shadows, animation (mixers, clips, keyframes, GLTF, skeletal, morph targets), raycasting, picking, controls and pointer input, loaders (GLTFLoader, TextureLoader, HDR), GLSL shaders, and post-processing (bloom, glow, DOF). Use for 3D scenes, WebGL, 3D visualizations, particles, interactive 3D elements or any mention of Three.js.
metadata:
  source: https://github.com/CloudAI-X/threejs-skills
  merged_from: threejs-skills, threejs-fundamentals, threejs-geometry, threejs-materials, threejs-textures, threejs-lighting, threejs-animation, threejs-interaction, threejs-loaders, threejs-shaders, threejs-postprocessing
  date_added: '2026-02-27'
---

> **Stack gate (vanilla-first):** This repo's default is native HTML, CSS and JavaScript. Three.js is an external library. If the project does not already use it, ask the user before adding it (it can be loaded without a build step through an import map).

# Three.js

Create high-quality 3D scenes and interactive experiences with Three.js best practices. This skill is a router: read `references/overview.md` first for a new scene (setup, process, common patterns, troubleshooting), then only the topic files the task needs.

## When to Use
- Requests 3D visualizations or graphics ("create a 3D model", "show in 3D")
- Wants interactive 3D experiences ("rotating cube", "explorable scene")
- Needs WebGL or canvas-based rendering
- Asks for animations, particles, or visual effects
- Mentions Three.js, WebGL, or 3D rendering
- Wants to visualize data in 3D space

## Which file to read

| Task | Read |
| --- | --- |
| New scene, end-to-end process, patterns, troubleshooting, modern r183 practices | [overview.md](references/overview.md) |
| Scene setup, cameras, renderer, Object3D hierarchy, coordinate systems, transforms | [fundamentals.md](references/fundamentals.md) |
| Built-in shapes, BufferGeometry, custom meshes, vertices, instanced rendering | [geometry.md](references/geometry.md) |
| PBR, basic, phong and shader materials, material properties and performance | [materials.md](references/materials.md) |
| Texture types, UV mapping, environment maps, cubemaps, HDR, texture optimization | [textures.md](references/textures.md) |
| Light types, shadows, environment lighting (IBL), lighting performance | [lighting.md](references/lighting.md) |
| Keyframe and skeletal animation, morph targets, mixing, GLTF animations, procedural motion | [animation.md](references/animation.md) |
| Raycasting, camera controls, mouse/touch input, object selection, click detection | [interaction.md](references/interaction.md) |
| Loading GLTF models, textures, images, HDR environments, async patterns, progress | [loaders.md](references/loaders.md) |
| GLSL, ShaderMaterial, uniforms, custom vertex/fragment effects, extending built-in materials | [shaders.md](references/shaders.md) |
| EffectComposer, bloom, depth of field, color grading, blur, screen-space effects | [postprocessing.md](references/postprocessing.md) |

Read the safety, prerequisite and validation notes in each file you open as mandatory. For focused work load the relevant sections; for end-to-end work read the file completely.

## Example Workflow

User: "Create an interactive 3D sphere that responds to mouse movement"

1. **Setup**: Import Three.js, create scene/camera/renderer ([overview.md](references/overview.md), [fundamentals.md](references/fundamentals.md))
2. **Geometry**: Create `SphereGeometry(1, 32, 32)` for smooth sphere
3. **Material**: Use `MeshStandardMaterial` for realistic look
4. **Lighting**: Add ambient + directional lights ([lighting.md](references/lighting.md))
5. **Interaction**: Track mouse position, update camera ([interaction.md](references/interaction.md))
6. **Animation**: Rotate sphere, render continuously
7. **Responsive**: Add window resize handler
8. **Result**: Smooth, interactive 3D sphere ✓
