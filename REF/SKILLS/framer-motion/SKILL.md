---
name: framer-motion
description: Motion (formerly Framer Motion) for React projects: motion components, variants, gestures, AnimatePresence exit animations, layout and shared-layout transitions, scroll-linked values, springs and reduced motion. Use only when the project already uses React and CSS motion is not enough. Ask before adding the dependency.
metadata:
  source: original (Agent_REF); API from the public Motion docs (motion.dev)
  date_added: '2026-10-13'
---

> **Stack gate (vanilla-first):** Motion is a dependency and its React API needs React. In a plain HTML/CSS/JS project use `css-motion` first. The `motion` package also has a vanilla `animate()`, but still ask before adding any package.

# Motion for React

The library is published as `motion` (import from `"motion/react"`); older projects use `framer-motion` (import from `"framer-motion"`). Match what `package.json` already has; do not install both.

## Core patterns
- **Basic:** `<motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:.3}} />`. Animate `transform` and `opacity`, not width, height, top or left.
- **Variants:** name states (`hidden`, `show`) on the parent and children; set `staggerChildren` in the parent's `transition` for lists.
- **Gestures:** `whileHover`, `whileTap`, `whileFocus`, `drag` with `dragConstraints`. Do not rely on hover for touch users.
- **Exit:** wrap conditional elements in `<AnimatePresence>` and give the child `exit` and a stable `key`. Use `mode="wait"` for page or tab swaps.
- **Layout:** `layout` on an element animates size and position changes; `layoutId` on two elements animates a shared element between them. Wrap related groups in `<LayoutGroup>`.
- **Scroll:** `useScroll` returns `scrollYProgress`; map it with `useTransform` (for example to opacity or y). Use `whileInView` with `viewport={{once:true}}` for reveal-on-scroll.
- **Springs:** `transition={{type:"spring", stiffness:300, damping:30}}` for natural motion; tune `bounce` and `duration` for predictability.
- **Per-frame values:** `useMotionValue`, `useSpring`, `useTransform` instead of React state.

## Accessibility and performance
- Respect reduced motion: wrap the app in `<MotionConfig reducedMotion="user">` or branch on `useReducedMotion()`; replace movement with a fade or nothing.
- Animate containers, not hundreds of components; avoid layout animation in long scrolling lists.
- Keep UI feedback short (150-300 ms); longer only for deliberate storytelling.
- In Next.js, files that use motion components need `"use client"`.

## Check
Content is visible if JS fails, reduced motion tested, no layout shift, bundle impact told to the user (`LazyMotion` with the `m` component reduces size).
