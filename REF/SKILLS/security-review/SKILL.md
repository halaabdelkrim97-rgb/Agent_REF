---
name: security-review
description: Security checklist review for web code and static sites - secrets, input handling and XSS, forms and CSRF, headers, third-party scripts, dependencies, storage and APIs. Use before release, when handling user input, auth, payments or client data, or when asked to check security.
metadata:
  source: original (Agent_REF); informed by public security-review skill lists
  date_added: '2026-10-12'
---

> **Stack gate (vanilla-first):** This is a checklist you apply by reading code. Scanners (CodeQL, Semgrep, npm audit and similar) are tools to install, so ask first. If the project already runs one, use it.

# Security Review

Report findings as: **severity** (high, medium, low), **where** (`file:line`), **problem**, **fix**. If nothing is found, say what you checked and what you could not check.

## Checklist
1. **Secrets:** keys, tokens, passwords, `.env` files, private URLs in code, git history or client-side files. Anything in browser code is public.
2. **Output and XSS:** no `innerHTML`, `document.write` or `eval` with untrusted data. Use `textContent` or build elements. Escape on output. Check URLs (`javascript:`) before using them in `href` or `src`.
3. **Input:** validate type, length and range on the server too. Never trust hidden fields, query strings, `localStorage` or client-side checks.
4. **Forms and sessions:** CSRF protection for state-changing requests, `SameSite` cookies, `HttpOnly` and `Secure` flags, rate limiting for login and contact forms.
5. **Headers (set on the host):** Content-Security-Policy, `X-Content-Type-Options: nosniff`, frame protection (`frame-ancestors`), `Referrer-Policy`, HTTPS with HSTS.
6. **Third-party code:** every external script, font, iframe and CDN is a risk. List them, pin versions, use Subresource Integrity where possible, remove what is not needed.
7. **Dependencies:** list packages and versions; flag unmaintained or known-vulnerable ones. Prefer fewer.
8. **Storage and privacy:** no sensitive data in `localStorage` or URLs. Cookie and analytics consent when required. Collect only what is needed.
9. **APIs:** authentication and authorization on every endpoint, least privilege, no verbose error details to clients, CORS limited to known origins.
10. **Uploads and files:** type and size limits, store outside the web root, never execute user files.
11. **Hardware or embedded (if present):** default passwords, open debug ports, unsigned updates, credentials in firmware.

## Rules
- Do not weaken a control to make something work; propose a safer way.
- Never print secrets in the report; show the location and a masked value.
- Do not attack or probe systems the user does not own.
- Say when a finding needs a real tool or a human expert (payments, medical, mains-powered devices).
