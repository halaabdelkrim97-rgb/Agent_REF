---
name: i18n-forms
description: Multilingual pages and reliable web forms: lang and RTL, text files, Intl formatting, language switcher, labels, validation, errors, spam protection, submission. Use for translations, RTL, contact forms and any user input.
metadata:
  source: original (Agent_REF)
  date_added: '2026-10-12'
---

> **Stack gate (vanilla-first):** Use native HTML forms, the Constraint Validation API and the `Intl` APIs. i18n libraries and form services are dependencies: ask first. Form submission needs a server endpoint the user controls or approves.

# Languages and Forms

## Multilingual pages
- `lang` on `<html>` and on foreign phrases; `dir="rtl"` for right-to-left languages, and use CSS logical properties (`margin-inline-start`, `padding-inline`) so one stylesheet works in both directions.
- One URL per language (`/en/`, `/ar/`), `hreflang` links between them, a visible language switcher that does not auto-redirect by guess.
- Keep text out of code: one JSON or HTML file per language with stable keys. Never build sentences by concatenation; use whole sentences with placeholders.
- Use `Intl.DateTimeFormat`, `Intl.NumberFormat`, `Intl.PluralRules` and `Intl.RelativeTimeFormat` for dates, numbers, currency and plurals.
- Allow about 30 percent more space for longer translations. Choose fonts that cover the scripts used. Mirror icons that imply direction.
- Translations for a client need review by a native speaker; say so when machine translated.

## Forms
- A visible `<label for>` per field, correct `type` and `autocomplete`, `required`, `min`, `max`, `pattern` only when needed. Keep fields few.
- Validate on the client for help and on the server for truth. Show errors next to the field and in a summary, in plain language that says how to fix it ("Enter an email like name@example.com").
- Do not clear the form on error. Disable the submit button only during sending, with a visible state.
- Submit with `fetch` and keep a working non-JS fallback (`action` and `method`). Show success and failure states; announce them with `role="status"`.
- Spam: honeypot field, server-side rate limit, time check; avoid CAPTCHA unless needed (it hurts accessibility).
- Privacy: collect only what you need, link the privacy policy, get consent where the law requires it, never log sensitive values, store nothing in `localStorage` that you would not publish.
- Security: validate and escape on the server, CSRF protection for state-changing requests (`security-review`).

## Test
Submit empty, wrong, long, special-character and valid input; keyboard-only; screen-reader error announcement; switch language and direction; check the layout at 360 px in each language.
