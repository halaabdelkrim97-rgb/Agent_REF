---
name: gsap
description: GSAP (GreenSock) animation: tweens, timelines, easing, ScrollTrigger, stagger, SVG and text effects, React cleanup with useGSAP, matchMedia and reduced motion. Use for complex sequenced or scroll-driven animation that CSS cannot do cleanly. Ask before adding the library; for simple motion use css-motion.
metadata:
  source: original (Agent_REF); API from gsap.com docs. The official full skill set is github.com/greensock/gsap-skills (MIT)
  date_added: '2026-10-13'
---

> **Stack gate (vanilla-first):** GSAP is a library. First try `css-motion` (transitions, keyframes, scroll-driven CSS). Suggest GSAP only for timelines, complex sequencing, pinned or scrubbed scroll scenes, or SVG effects, and ask before adding it. For scroll storytelling pages see `scroll-experience`. Check gsap.com for the current license terms.

# GSAP

## Load it
- Plain HTML: one `<script>` from a pinned CDN version (`gsap.min.js`, plus `ScrollTrigger.min.js` if needed), no build step.
- npm project: `npm i gsap`, `import gsap from "gsap"`, `import { ScrollTrigger } from "gsap/ScrollTrigger"`, then `gsap.registerPlugin(ScrollTrigger)` once.

## Core
- `gsap.to(el, {x:100, duration:.6, ease:"power2.out"})`, `gsap.from`, `gsap.fromTo`, `gsap.set`. Animate transforms and `opacity` (`x`, `y`, `scale`, `rotation`), not layout properties.
- **Timeline:** `const tl = gsap.timeline({defaults:{duration:.5, ease:"power2.out"}})`, then `tl.to(a,{...}).to(b,{...},"-=0.2")`, or use labels. Control with `play`, `pause`, `reverse`, `progress`.
- **Stagger:** `stagger: .08` or `{each:.08, from:"center"}`.
- **Targets:** scope selectors to a container; use `gsap.utils.toArray`.

## ScrollTrigger
`scrollTrigger:{trigger:el, start:"top 80%", end:"bottom 20%", scrub:true, pin:true, toggleActions:"play none none reverse"}`. Use `scrub` for scroll-linked progress, `pin` sparingly, call `ScrollTrigger.refresh()` after layout or image changes, remove markers before shipping, create triggers after the DOM and fonts are ready.

## React and cleanup
Use `useGSAP` from `@gsap/react` with a `scope` ref so tweens and triggers revert on unmount; otherwise wrap in `gsap.context()` and call `ctx.revert()` in cleanup. Do not drive the same style property with GSAP and React state.

## Accessibility and performance
- Reduced motion: `gsap.matchMedia()` with `"(prefers-reduced-motion: no-preference)"` for the animations, and a static end state otherwise. Essential content must stay readable if JS fails.
- Do not animate many large elements at once; kill tweens and triggers you no longer need.
- Test touch devices and resize (pins break easily).

## Check
Reduced motion handled, no leaked triggers on route change, library size told to the user.
