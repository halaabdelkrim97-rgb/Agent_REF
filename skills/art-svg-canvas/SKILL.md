---
name: art-svg-canvas
description: Illustrations, icons, patterns, generative art, backgrounds and simple image assets in plain SVG, CSS and Canvas, with no libraries or image services. Use for logo and icon sketches, hero art, patterns, favicons or social images.
metadata:
  source: original (Agent_REF); informed by public canvas and generative-art skill lists
  date_added: '2026-10-12'
---

> **Stack gate (vanilla-first):** Use SVG, CSS and Canvas 2D only. Libraries (p5.js, GSAP) and AI image services need an API key or a dependency: ask first. Never recreate a known artwork, character or brand logo.

# Art with SVG, CSS and Canvas

## Choose the medium
| Need | Use |
| --- | --- |
| Logos, icons, illustrations, diagrams | Inline SVG (scales, themeable with `currentColor`) |
| Gradients, patterns, simple backgrounds | CSS (`linear-gradient`, `radial-gradient`, `conic-gradient`, `background-blend-mode`) |
| Noise, particles, generative or animated art | Canvas 2D |
| Photo-like or painted images | Not possible here: ask the user for assets or approval of an image service |

## Process
1. Ask: purpose, size and ratio, palette or brand colors, mood in three words, light or dark background.
2. Pick a small palette (3 to 5 colors) and one shape language (geometric, organic, line). Keep it consistent.
3. Build with a clear `viewBox`, grouped layers (`<g>` with ids), and reusable `<defs>` for gradients and symbols.
4. Add depth with few devices: layered opacity, gradients, one soft shadow, grain. More effects do not mean better art.
5. Check at small and large size, light and dark background, and with contrast for any text.
6. Deliver the source file, plus exports the user asked for (SVG; PNG through a canvas or browser screenshot).

## Generative art (Canvas 2D)
- Seed your randomness (small PRNG like mulberry32) so the same seed gives the same image.
- Build from simple rules: grids, noise-based flow, circle packing, recursion, Lissajous curves.
- Keep draw calls low; render once for stills, `requestAnimationFrame` for motion with a pause control.
- Handle `devicePixelRatio` for sharp output.

## Quality rules
- Original work only. Do not copy a specific artwork, mascot, brand mark or character.
- Optimize SVG: round numbers to 1 to 2 decimals, remove unused ids, avoid thousands of nodes.
- Accessibility: `role="img"` with `<title>` for meaningful SVG, `aria-hidden="true"` for decoration.
- Respect `prefers-reduced-motion` for animated art.
