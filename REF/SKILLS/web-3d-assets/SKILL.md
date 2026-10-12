---
name: web-3d-assets
description: Turning CAD or 3D models into fast web assets - glTF export, cleanup, PBR materials, texture sizes, compression, HDRI and lighting sources, license tracking and loading in Three.js. Use when a client model, CAD export or downloaded 3D asset must run in a web scene.
metadata:
  source: original (Agent_REF)
  date_added: '2026-10-12'
---

> **Stack gate (vanilla-first):** Modeling and conversion tools (Blender, FreeCAD, glTF validators, compressors) are the user's choice; ask before installing any. Never commit paid or licensed assets to a public repo. Three.js use follows `3d-scene-builder`.

# Web 3D Assets

## Pipeline
1. **Source:** ask for the CAD file (STEP preferred), units, and what must be visible. Remove screws, hidden internals and tiny parts the visitor will never see.
2. **Convert to mesh:** tessellate with a tolerance that keeps curves smooth but triangles low. Merge parts that never move; keep separate objects for parts that move or are clickable, with clear names.
3. **Clean:** apply transforms, set pivots at real joint axes, real-world scale in meters (one unit equals one meter), consistent orientation (Y up), flip bad normals, remove duplicates and loose edges.
4. **Materials (PBR):** base color, metallic, roughness, normal, optional occlusion and emissive. Few materials beat many; reuse them.
5. **Export glTF binary (`.glb`).** Name it clearly.
6. **Optimize:** mesh compression (Draco or Meshopt), texture compression (KTX2 where supported, or WebP or JPEG), textures no larger than needed (2048 max, 1024 for small parts).
7. **Validate:** load it in the scene, check scale, pivots, materials and animations; run the Khronos glTF validator if the user can.

## Budgets
Under about 300k triangles and about 100 draw calls for the whole scene, file under a few MB for the model, under about 30 MB total page weight for a heavy showcase. Check on a mid phone.

## Lighting and environment
Image-based lighting (an HDRI) gives realistic reflections cheaply. Baked shadows or lightmaps keep real-time cost low. Keep the HDRI small (1k to 2k) and compress it.

## Free sources (check each license before use)
Poly Haven and ambientCG offer HDRIs, textures and models that are published as CC0 as far as I know; verify on the asset page. For anything else record the license, author and link.

## License ledger (keep in the project, update every time an asset is added)
| Asset | Source link | Author | License | Commercial use | Credit required |
Paid assets: keep outside git and out of public repos; confirm the license allows the client's use.

## Loading in Three.js (pattern)
Use `GLTFLoader` (plus `DRACOLoader` or `MeshoptDecoder` if compressed) with a loading indicator, handle load errors with a fallback image, dispose geometries, materials and textures you remove, and cap the pixel ratio. API details are in the `threejs` skill's loaders file.
