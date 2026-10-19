---
name: data-and-charts
description: Charts, KPIs and small dashboards for client sites in plain SVG or Canvas - chart choice, scales, labels, accessible color palettes, tooltips, table fallbacks and performance. Use when showing data, measurements or simulation results visually.
metadata:
  source: original (Agent_REF)
  date_added: '2026-10-12'
---

> **Stack gate (vanilla-first):** Draw charts with SVG or Canvas 2D. Chart libraries (Chart.js, D3, Plotly) are dependencies: ask first, explain the benefit (many chart types, large data, zoom).

# Data and Charts

## Choose the chart
| Question | Chart |
| --- | --- |
| Change over time | Line (many points) or column (few periods) |
| Compare categories | Horizontal bars, sorted |
| Part of a whole (2 to 5 parts) | Stacked bar or a single bar; avoid pies beyond that |
| Relationship of two numbers | Scatter |
| Distribution | Histogram |
| One number that matters | Big number with unit and context (KPI) |
| Simulation output | Line over time with the controls beside it |

## Rules
- Start bars at zero. Label axes with units. One message per chart; title says the takeaway.
- Direct labels beat legends. Limit to about five series; highlight one, mute the rest.
- Colors: a palette that stays distinguishable for color-blind users (vary lightness too), contrast of 3:1 against the background, same color means the same thing everywhere. Support dark mode through CSS variables.
- Format numbers with `Intl.NumberFormat`, dates with `Intl.DateTimeFormat`; show units.
- Tooltips work on keyboard focus and touch, not only hover.
- Responsive: SVG with `viewBox`, redraw on resize; readable at 360 px.

## Accessibility
`role="img"` with a `<title>` and `<desc>` summarizing the insight, plus a visible data table (or a `details` with the table). Live readouts as text.

## Performance
SVG up to a few thousand elements; Canvas 2D beyond that; downsample before drawing; redraw only what changed; `requestAnimationFrame` for live charts and pause when hidden.

## SVG bar chart pattern
```js
function bars(svg, data, w = 320, h = 160) { // data: [{label, value}]
  const max = Math.max(...data.map(d => d.value)), bw = w / data.length;
  svg.setAttribute('viewBox', `0 0 ${w} ${h + 20}`);
  svg.innerHTML = data.map((d, i) => {
    const bh = d.value / max * h;
    return `<rect x="${i * bw + 4}" y="${h - bh}" width="${bw - 8}" height="${bh}" fill="var(--bar)"></rect>` +
           `<text x="${i * bw + bw / 2}" y="${h + 14}" text-anchor="middle" font-size="10">${d.label}</text>`;
  }).join('');
}
```
Escape any user-provided label before putting it in `innerHTML` (or build elements with `textContent`).
