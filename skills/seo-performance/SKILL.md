---
name: seo-performance
description: Search visibility and page speed for client websites - semantic HTML, titles, metadata, structured data, sitemap, images, Core Web Vitals and loading strategy. Use before launching a site, when asked about SEO or speed, or when a page loads slowly.
metadata:
  source: original (Agent_REF)
  date_added: '2026-10-12'
---

> **Stack gate (vanilla-first):** Everything here is plain HTML, headers and files. Audit tools (Lighthouse, PageSpeed) are optional external checks: run them if the user can, or ask before installing anything.

# SEO and Performance

## SEO checklist
- One `<h1>` per page, headings in order, semantic landmarks (`header`, `nav`, `main`, `footer`).
- Unique `<title>` (about 50 to 60 characters) and meta description (about 120 to 155) per page, written for people.
- `lang` on `<html>`; `<link rel="canonical">`; readable URLs; `robots.txt` and `sitemap.xml`; 404 page.
- Open Graph and Twitter card tags with a real image for sharing.
- Structured data (JSON-LD) only for content that exists on the page (Organization, Product, Article, FAQ). Never mark up invisible or false content.
- Real text for content that matters. Content shown only inside a canvas, 3D scene or iframe is invisible to search: add HTML text and a static image beside it.
- Descriptive link text and image `alt`. Internal links to the important pages.

## Core Web Vitals targets
Largest Contentful Paint 2.5 s or less, Interaction to Next Paint 200 ms or less, Cumulative Layout Shift 0.1 or less (measured at the 75th percentile of real users).

## How to hit them
- **Images:** correct size, `width` and `height` set, `srcset`, modern formats where supported, `loading="lazy"` below the fold, never lazy-load the hero, `fetchpriority="high"` on the LCP image.
- **CSS and JS:** one small stylesheet, `defer` or `type="module"` scripts, no render-blocking third parties, remove unused code.
- **Fonts:** few families and weights, `font-display: swap`, preload the main file, subset when possible.
- **Layout shift:** reserve space for images, embeds, ads and fonts; never insert content above existing content.
- **Responsiveness:** break up long tasks, keep handlers light, avoid heavy work on input.
- **Server:** HTTPS, compression (Brotli or gzip), long cache lifetimes for hashed assets, short for HTML, a CDN if available.
- **Heavy embeds (3D, video, maps):** load on interaction or when visible, show a poster image first.

## Report
Per page: what was checked, measured numbers if a tool was run (otherwise "not measured"), prioritized fixes (high, medium, low), and what you changed.
