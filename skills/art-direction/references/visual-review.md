# Rendered visual review

Use actual runtime captures, with viewport and state recorded. Separate brief violations and functional defects from optional subjective suggestions. Do not treat deliberate user choices as defects. Compare with the chosen brief, not an invented universal taste. Do not claim a numerical aesthetic score is objective.

| Lens | Inspect | Typical correction |
| --- | --- | --- |
| Composition | Clear focal point, silhouette, crop, negative space | Reframe, simplify competing forms, adjust scale |
| Hierarchy | Reading order, contrast, typography, primary action | Adjust size/value/spacing before adding effects |
| Depth | Separation, occlusion, contact, foreground/background | Improve layers, camera or lighting |
| Surface | Material differences, edge detail, texture scale | Correct roughness, asset quality or UVs |
| Cohesion | Consistent palette, forms, assets, motion language | Remove conflicting treatments |
| Motion | Timing, weight, readable action, interruptions | Retune pacing, inertia, easing or feedback |
| Usability | Narrow viewport, keyboard, touch, focus, reduced motion | Preserve meaning and controls across modes |

Capture the key composition and a narrow viewport. For a sequence, inspect start, transitions, interaction and end; still frames cannot establish smoothness. Use recording playback or runtime frame timings when possible. Check camera clipping, scene entry/exit and loading failures.

Keep a compact evidence table: criterion, capture/state, observed issue, correction, result. Separate what is observed from what is inferred. A screenshot cannot prove performance or collision stability.

After each pass, identify at most three high-impact problems, fix them and re-capture affected states. Default to two correction rounds; record unresolved criteria and blockers. Do not keep replacing the whole visual direction to avoid diagnosing a specific defect. Required checks still apply.
