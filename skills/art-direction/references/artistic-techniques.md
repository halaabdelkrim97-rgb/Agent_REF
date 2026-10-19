# Artistic techniques

## Composition and UI
Choose a focal point and reading order. Create contrast through scale, density, value and spacing, not decoration alone. Express the project's identity through type, layout and imagery rather than repeating gradient cards across every project. Reuse tokens for consistency, but allow deliberate exceptions. Test real-length content and important empty/error states. Use references to understand principles rather than copying a distinctive artwork or interface wholesale.

## Cinematic 3D
Choose a visual language: stylized, graphic, miniature, illustrative or realistic as appropriate. Establish silhouette and framing before detail. Layer depth through placement and occlusion; avoid filling the scene with incidental particles.
Use meaningful camera beats: establish, reveal, focus, resolve. Name the subject and purpose of each move. Tune perspective and travel to the subject; do not apply one field of view to all scenes. Keep controls readable, avoid clipping and abrupt scroll-driven camera changes. Offer a calm reduced-motion view.
Separate subject from background with value, hue, lighting or focus. Choose key/fill/rim or environmental illumination intentionally; do not add every light type by default. Distinguish surfaces through roughness, reflectivity, texture scale and edge treatment. Use shadows to establish contact.
Use atmosphere, bloom, depth of field, grain and color grading only when they support the brief. Preserve text clarity and silhouettes; test on the target device. A post-processing stack cannot repair poor framing or a weak model.
Use suitable licensed models or artwork when primitives cannot express the desired form. Primitive-only work can be excellent when its stylization is intentional. Never fabricate licenses or commit restricted assets.

## Animation
Write beats with trigger, subject, anticipation, action, settle and interruption behavior. Use timing, arcs, overlap and follow-through to communicate weight and character. Squash/stretch is a style choice, not a requirement. Choreograph primary motion before secondary loops. Include stillness so every element does not compete.
Distinguish short UI feedback from longer storytelling. Make input feedback immediate even when the resulting animation takes time. Support reverse, cancellation, repeated input, resize and reduced motion. Use elapsed time rather than frame count.

## Games and playful simulations
Define the core loop: input, action, feedback, consequence and retry. Polish one loop before adding levels or menus. Tune acceleration, drag, jump/coyote/input-buffer behavior where relevant, collision response and camera follow for feel. Do not add every mechanic to every game.
Separate gameplay state from presentation. Use a bounded fixed-step accumulator with a maximum catch-up count and defined excess-time policy. Reset accumulated time after suspension. Interpolate rendering when useful. Use substeps or continuous collision detection for fast small objects when the existing engine supports it; do not solve tunneling by hiding it with particles.
Choose stylized or realistic behavior deliberately. Tune restitution, friction, gravity and damping consistently; avoid random impulses each frame. A collision needs readable visual response before optional sound, particles or camera shake. Make shake and flashes optional and restrained.
Test held inputs, repeated actions, restart, win/lose states, tab suspension, rapid collisions and slow frames. Verify that speed and jump height do not depend on rendering frame rate. Record actual performance observations; proposed budgets are not measurements.
