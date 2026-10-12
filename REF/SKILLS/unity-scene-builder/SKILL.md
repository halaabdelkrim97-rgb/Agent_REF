---
name: unity-scene-builder
description: Builds professional interactive 3D scenes and product simulations in Unity for web delivery - scene-as-code editor scripts, orbit camera, hotspots, simulation scripts, URP or HDRP setup, WebGL build settings, a JavaScript bridge and a website embed. Use for Unity projects, Asset Store scenes, Unity WebGL builds, or embedding Unity in a web app.
metadata:
  source: original (Agent_REF); based on public Unity documentation, untested in the Unity editor
  date_added: '2026-10-12'
---

> **Status:** the scripts and templates in this skill were written without access to the Unity editor and are untested. Say so to the user, ask them to run the checks in section 8, and fix errors from the console text they paste back. API names change between Unity versions: confirm against the user's version.

> **Licensing gate:** Asset Store and other paid assets are licensed to the user. Never put them in a public repo, never upload or redistribute them, and remind the user to check the asset license and the Unity license for client work. Keep them in a folder listed in `.gitignore`.

# Unity Scene Builder

Use after `3d-scene-builder` has produced the brief and art direction. Unity is the user's choice for professional projects; propose Three.js instead only if the scene is a light product showcase.

## 1. Ask first (one question at a time)
Unity version and render pipeline (URP is the usual web choice; HDRP is too heavy for WebGL), target (WebGL in a web app, desktop too), which Asset Store packages are installed and their prefab paths, the product's moving parts and inputs, and the page that will host it. Read `REF/CONTEXT/001_PROJECT_CONTEXT.md` if it exists.

## 2. Project layout (scripts only in git)
```
Assets/Editor/      RefSceneBuilder.cs, RefBuildWebGL.cs   (menu: REF > ...)
Assets/Scripts/     OrbitCamera, PartInfo, HotspotPicker, ProductController, WebBridge
Assets/Plugins/WebGL/RefBridge.jslib
Assets/ClientAssets/  (paid or client assets; in .gitignore, never committed)
```
Start from [templates/](templates/): copy `Assets/` into the Unity project, copy `unity.gitignore` as `.gitignore`, and use `web-embed/index.html` for the page.

## 3. Scene as code
- `RefSceneBuilder` creates lights, ground, product, camera and bridge from the prefabs the user installed. Set `ProductPrefabPath`; without it a placeholder is built so the scene always compiles and runs.
- Rebuild the scene with one menu click instead of hand-editing it. Changes go into the script, so the result is repeatable and reviewable.
- Name every object. Real-world scale, one unit equals one meter. Pivots at real joint axes. Group assemblies so parts can move.
- Add a `PartInfo` and a `Collider` to each clickable part.

## 4. Look (art direction from `3d-scene-builder`)
- URP, linear color space, one soft shadow-casting key light plus ambient; add reflection probes or an HDRI skybox for metal and glass; bake lighting (lightmaps) for static scenery to save frame time.
- Post-processing (bloom, vignette, color adjustments) through a URP Volume, kept light for WebGL.
- Materials from the asset pack where they exist; consistent palette; avoid overusing emissive and transparent materials.

## 5. Interaction and simulation
- `OrbitCamera` for orbit, zoom and pinch with limits; `HotspotPicker` for clicks that report the part id to the page.
- Model first: inputs change `ProductController` (the simulation), and the model drives transforms. Fixed-step physics in `FixedUpdate`. Replace the lag model with the product's real behavior and keep units in names.
- Show readouts and part explanations in HTML next to the canvas, not as heavy in-engine UI, unless the project needs it.

## 6. WebGL budget and settings
- Target: build under about 30 MB (smaller is better), starts in a few seconds, 30 to 60 fps on a mid laptop. Test a phone and keep a static-image fallback.
- Stripping: Managed Stripping Level up, remove unused packages and assets, compress textures (ASTC or DXT per target), reduce texture sizes, avoid realtime GI and many realtime lights, small shadow distance.
- Compression: Brotli with correct server headers, or Gzip, or the decompression fallback (works anywhere, slower). Threading is not available in WebGL.
- See [references/webgl-embed.md](references/webgl-embed.md) for hosting headers, embedding options, bridge details and common failures.

## 7. Web integration
- Page to Unity: `unityInstance.SendMessage("WebBridge", "SetSpeed", 0.6)`.
- Unity to page: C# `WebBridge.Send(name, payload)` calls the `.jslib`, which calls `window.onUnityEvent(name, payload)`.
- Embed with an `iframe` for the simplest case, or load the Unity loader directly (template) when the page controls the scene. Fixed aspect ratio box, loading bar, error message.

## 8. Verify (ask the user to run, then paste any console text)
1. Open the project, wait for compile with no errors.
2. Menu REF > Build Showcase Scene, then press Play: orbit, zoom, click a part (the console logs the event).
3. Menu REF > Build WebGL, serve `Builds/WebGL` with a static server and open the template page.
4. Check the browser console is clean, power and speed controls work, resize and a phone work, and the build size is within budget.
5. Report unverified items plainly.

## Rules
- Never claim a Unity step worked unless the user confirmed it.
- No secrets or client data in scripts. No third-party tracking in the page.
- Ask before adding Unity packages, plugins or paid assets.
- Treat generated or purchased art as the user's responsibility to license; do not recreate a known brand's model or character.
