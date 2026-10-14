---
name: css-motion
description: Plain CSS and Web Animations motion: transitions, keyframes, scroll-driven animation, FLIP, micro-interactions, easing and reduced motion. Use when adding or fixing UI animation. Not for 3D.
metadata:
  source: original (Agent_REF); informed by public motion-design skill lists
  date_added: '2026-10-12'
---

> **Stack gate (vanilla-first):** Use CSS and the Web Animations API. GSAP, Framer Motion, Lottie and similar are dependencies: only suggest them when native code is clearly insufficient, and ask first. For 3D motion use the `threejs` skill. For scroll storytelling pages use `scroll-experience`.

# CSS Motion

Motion should explain change, guide attention or confirm an action. If it does none of these, remove it.

## Artistic choreography
For new creative direction, use `art-direction` first. Define trigger, primary subject, anticipation, action, settle and interruption. Use arcs, overlap and pauses deliberately; keep secondary motion subordinate. UI feedback durations below are starting points, not limits on artistic storytelling. Keep interactive controls responsive during longer sequences.
Inspect actual playback or sampled states for timing and continuity, including reversed or interrupted animations and repeated input. Treat screenshots as composition checks, not proof of smoothness. Reuse the project's easing and duration tokens; do not apply identical entrance effects to every element.

## Choose the tool
| Need | Use |
| --- | --- |
| State change (hover, open, color) | CSS `transition` |
| Looping or multi-step motion | CSS `@keyframes` |
| Start, pause, reverse or sequence from JS | Web Animations API (`el.animate()`) |
| Layout change (reorder, expand) | FLIP technique with `transform` |
| Reveal on scroll | `IntersectionObserver` + class, or scroll-driven animation (`animation-timeline`) where supported |
| Page or view change | View Transitions API where supported, with a plain fallback |

## Rules that keep it fast
- Animate `transform` and `opacity` only. Avoid animating `width`, `height`, `top`, `left`, `box-shadow` or `filter` on large areas.
- Use `will-change` briefly and only where needed; remove after the animation.
- Keep UI motion 150 to 300 ms (large movement up to 500 ms). Ease-out for entering, ease-in for leaving, no linear except for loops and progress.
- Stagger lists by 30 to 60 ms with a cap, not per item forever.
- Never block interaction while animating. Make animations interruptible.

## Reduced motion (required)
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
Keep meaning without motion (state changes still visible).

## Patterns
```css
/* micro-interaction */
.btn { transition: transform .15s ease-out, box-shadow .15s ease-out; }
.btn:hover { transform: translateY(-1px); }
.btn:active { transform: translateY(0) scale(.98); }
```
```js
// Web Animations API
const a = el.animate(
  [{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }],
  { duration: 220, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'both' }
);
// a.pause(); a.reverse(); await a.finished;
```
FLIP: measure first rect, apply the DOM change, measure last rect, apply an inverse `transform`, then animate it to `none`.

## Check
- Smooth in the Performance panel (no long frames), no layout shift, works with reduced motion on, still usable with keyboard.
