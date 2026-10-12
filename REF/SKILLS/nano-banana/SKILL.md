---
name: nano-banana
description: Generates and edits raster images (hero art, mockups, icons, textures, product shots) with Google's Nano Banana image models through the Gemini API. Use when the user asks for an AI-generated image or an edit of an existing image. Not for SVG or CSS art (art-svg-canvas) or posters made by code (canvas-design).
metadata:
  source: original (Agent_REF); model names and API shape from Google's public Gemini API docs
  date_added: '2026-10-13'
---

> **Gate:** this calls an external service and needs the user's own Gemini API key. Ask before using it, say what will be sent (the prompt and any input image), and never store the key in the repo.

# Nano Banana (Gemini image models)

## Models (verify current names in Google's docs before use)
- `gemini-2.5-flash-image`: "Nano Banana", fast and cheap, good default.
- `gemini-3-pro-image-preview`: "Nano Banana Pro", higher quality, text in images, larger sizes. Preview names change.

## Cost and key
- Get a key from Google AI Studio. Whether image generation is free, and the limits, change over time: check Google's pricing page and tell the user. Do not promise "free".
- Read the key from the `GEMINI_API_KEY` environment variable. Never paste it into a file, commit or log. If the user pastes a key in chat, tell them to revoke and replace it.

## Procedure
1. Confirm purpose, size or aspect ratio, style, where the file goes, and that the image may be sent to Google.
2. Write a specific prompt: subject, setting, style, lighting, composition, colors from the project's visual identity (context file section 10), and what to avoid. One image per call at first.
3. Call the API (no SDK needed):
```
curl -s -X POST "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent" \
  -H "x-goog-api-key: $GEMINI_API_KEY" -H "Content-Type: application/json" \
  -d '{"contents":[{"parts":[{"text":"<prompt>"}]}]}'
```
   The image comes back base64 in `candidates[0].content.parts[].inlineData.data`; decode it to a file. For edits, add a second part with `inlineData` (`mimeType`, base64 `data`) holding the source image.
4. Save into the project's assets folder with a descriptive name. Convert and compress for the web (WebP or AVIF, set `width` and `height`, add `alt` text). Check the result before showing it; regenerate with a changed prompt instead of stacking fixes.
5. Report: model used, prompt, file path, size.

## Rules
- Check the service's terms for commercial use and any AI-generated-content marking; tell the user if unsure.
- No real people's likeness, logos or copyrighted characters unless the user owns the rights.
- Do not send client data or private images without explicit approval.
- Keep the prompt in the notes so the image can be reproduced or replaced.
