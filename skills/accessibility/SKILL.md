---
name: accessibility
description: WCAG 2.2 AA accessibility checks and fixes for web pages and interactive tools - keyboard, focus, names, contrast, forms, motion, dialogs, canvas and 3D alternatives. Use when building or auditing for accessibility, or before client launch.
metadata:
  source: original (Agent_REF)
  date_added: '2026-10-12'
---

> **Stack gate (vanilla-first):** Checks are by reading code and using the browser. Automated tools (axe, Lighthouse) are optional; ask before installing. Native HTML first, ARIA only when native elements cannot do it.

# Accessibility

## Checklist
1. **Structure:** landmarks, one `h1`, headings in order, lists for lists, tables only for data with `th` and scope.
2. **Keyboard:** everything usable by Tab, Shift+Tab, Enter, Space, arrows where expected; no keyboard trap; Esc closes dialogs and menus; logical focus order.
3. **Focus:** always visible (`:focus-visible` with clear contrast); after opening a dialog move focus in, after closing return it. Prefer `<dialog>`.
4. **Names:** every control has an accessible name (visible label first, `aria-label` only when no visible text). Icon-only buttons need a name. Link text makes sense alone.
5. **Contrast:** 4.5:1 for text, 3:1 for large text and UI parts and focus indicators. Never use color alone to carry meaning.
6. **Targets:** at least 24 by 24 CSS px (WCAG 2.2 AA), aim for 44 on touch.
7. **Forms:** label per field, instructions before the field, errors in text next to the field and in a summary, `aria-invalid` and `aria-describedby`, `autocomplete` values, no placeholder-only labels.
8. **Images and media:** meaningful `alt`, empty `alt` for decoration, captions and transcripts for video and audio, no autoplay with sound.
9. **Motion:** respect `prefers-reduced-motion`, no flashing more than three times a second, a pause control for moving content.
10. **Zoom and reflow:** works at 200 percent zoom and 320 px width without two-way scrolling; text can be resized; no fixed-height text boxes.
11. **Language:** `lang` on the page and on parts in another language.
12. **Dynamic content:** status messages use `role="status"` or `aria-live="polite"`; do not move focus unexpectedly.

## Canvas, simulations and 3D
A canvas is invisible to assistive tech. Provide: a text description of what it shows (`aria-label` and visible summary), keyboard-operable controls for every action (sliders, buttons), live readouts in real text, a way to pause motion, and a text or table alternative of key data.

## ARIA rules
Use native elements first. Do not change native semantics without reason. Every interactive ARIA widget needs keyboard support. Do not hide focusable content with `aria-hidden`.

## Verify
Keyboard-only pass, 200 percent zoom, reduced-motion on, a screen reader spot-check (NVDA, VoiceOver or TalkBack) on the main flow, then any automated tool the user has. Report: issue, where (`file:line`), WCAG criterion if known, fix. State what was not tested.
