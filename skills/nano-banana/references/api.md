# Raw REST call (what the CLI does)

```
curl -s -X POST "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent" \
  -H "x-goog-api-key: $GEMINI_API_KEY" -H "Content-Type: application/json" \
  -d '{"contents":[{"parts":[{"text":"<prompt>"}]}]}'
```

The image comes back base64 in `candidates[0].content.parts[].inlineData.data`; decode it to a file. For edits, add a second part with `inlineData` (`mimeType`, base64 `data`) holding the source image. Optional `generationConfig.imageConfig.aspectRatio`.

# Alternative: Gemini CLI extension

`gemini extensions install https://github.com/gemini-cli-extensions/nanobanana` (Apache-2.0) adds `/generate`, `/edit`, `/restore`, `/icon`, `/pattern`, `/story`, `/diagram` inside the Gemini CLI, not inside Claude Code. It needs the Gemini CLI, Node.js 20+ and its own key variable (`NANOBANANA_API_KEY` per its README). Use it only if the user works in Gemini CLI.
