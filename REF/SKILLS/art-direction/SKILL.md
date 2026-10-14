---
name: art-direction
description: Art direction and rendered visual critique for websites, web apps, animation, artistic simulations, games and cinematic 3D. Use before a new visual concept or redesign, or when working output looks generic, flat, basic or visually incoherent. Applies in ChatGPT, Codex and Claude Code with available tools.
---

# Art Direction

Execute the user's visual vision using available techniques. Forge has no house style or independent aesthetic agenda. Do not equate quality with cinematic, minimalist, realistic, premium or trendy styling unless the user requested it. Technical correctness alone does not prove faithful visual execution.

Treat user references and explicit choices as the acceptance standard. Critique fidelity, consistency, usability and technical defects; distinguish those from subjective alternatives. Preserve intentional roughness, simplicity or exaggeration. For an ambiguous brief, ask a focused question or offer clearly labeled options; do not decide the user's taste for them.

## Workflow
1. Read existing context section 10 and the task. Ask only for unresolved high-impact choices. If the user asks to explore or delegates creative choices, offer up to three compact concepts within their constraints. Otherwise ask only about the missing decision that materially affects execution. Select a concept only when the user chooses it or delegates that choice; state any assumptions. Do not make three full implementations.
2. Inspect available references. Describe concrete qualities to borrow: hierarchy, silhouette, scale, depth, palette, texture, typography and rhythm. Record provenance. Never claim to have seen a URL or image you could not open; mark an imagined direction as proposed.
3. Record the chosen direction and observable acceptance criteria in context section 10 using `../../TEMPLATES/VISUAL_BRIEF.md`. For small polish tasks, use a few task notes instead. Keep detailed technique references out of startup context.
4. Choose the medium: DOM/CSS for interface and typography; SVG for vector composition; Canvas for dense 2D animation; approved 3D tooling for spatial scenes; image/model assets for forms or detail that code cannot produce well. Combine media deliberately. Check tool availability, dependencies and asset rights; reuse existing approvals.
5. Build one representative visual or playable moment. Establish composition and silhouette first, then materials/type, light/color, motion and secondary detail. Avoid expanding a weak sample into multiple pages or levels.
6. Render and critique using [visual review](references/visual-review.md). Fix the largest mismatch with the user's brief first. Do not restyle a compliant result because another treatment seems more fashionable. Default to two correction rounds; report remaining acceptance failures and the next action rather than silently calling them finished. The limit does not waive functional or release checks.
7. Expand using shared design tokens, materials, camera conventions and motion vocabulary. Record changed decisions and checks without transcripts.

## Environment adapter
- In ChatGPT, inspect supplied or retrieved images when available. Use image generation for original artwork or concept exploration when provided and authorized; it cannot verify runtime UI, gameplay or physics. A generated screenshot is not evidence of a running application.
- In Claude Code or Codex, inspect actual source and assets. Run the project and use available browser/screenshot tools. Capture representative states; use recordings or sampled frames over time for animation. Do not install browser tools or paid services without authorization.
- Tool names, image generation, previews, shell access and browser automation differ by session. Check capabilities; do not assume a tool exists because another host has it. If rendering is unavailable, deliver a concrete verification plan and label the result visually unverified. Do not make manual screenshot sharing the default when authorized automatic capture is available.
- Shared context and handoff files bridge hosts. They do not transmit chats or invoke another model. Keep one worker by default; request a scoped independent visual review only through a configured, authorized mechanism.

## Technique selection
Read only the relevant part of [artistic techniques](references/artistic-techniques.md): composition/UI, cinematic 3D, animation, or games. Use the implementation skill for API details. Preserve accessibility, readability and interaction while pursuing expressive visuals.
