# Unity WebGL: hosting, embedding and common failures

## Build output
`Build/` (loader, data, framework, wasm; names follow the build name), `TemplateData/` and `index.html`. Upload the folder to any static host. Edit the file names at the top of `templates/web-embed/index.html` to match.

## Compression and headers
| Setting | Server must send |
| --- | --- |
| Brotli (`.br` files) | `Content-Encoding: br` and the original MIME type (`application/wasm` for `.wasm`, `application/javascript` for `.js`, `application/octet-stream` for `.data`); Brotli works over HTTPS only |
| Gzip (`.gz` files) | `Content-Encoding: gzip` and the original MIME type |
| Decompression fallback on | Works without special headers; larger download time and slower start |
| Uncompressed | Largest download; works everywhere |

If the page shows an error about an unexpected end of file, a wrong MIME type or "Unable to parse", the cause is almost always headers or file names. Check them in the browser Network panel. Use the right file extensions in `dataUrl`, `frameworkUrl` and `codeUrl` (`.br` or `.gz` when served compressed).

## Embedding options
| Option | Use when |
| --- | --- |
| `iframe` pointing at the Unity page | Simplest; the client's page does not need to talk to the scene |
| Direct load with `createUnityInstance` | The page controls the scene and reacts to events (template) |
| Same-origin hosting | Avoids CORS and cookie surprises; prefer it |

For an `iframe`, use `allow="fullscreen"` if needed, a fixed aspect ratio box so the page does not jump, and `loading="lazy"` below the fold.

## Bridge details
- `SendMessage(objectName, methodName, value)` takes one string, number or nothing. The object must exist in the scene and the method must be public. For several values, send one JSON string and parse it in C#.
- Unity to page uses a `.jslib` plugin in `Assets/Plugins/WebGL/`. Call it only in WebGL builds (`#if UNITY_WEBGL && !UNITY_EDITOR`); in the editor it logs instead.
- Strings cross the boundary as UTF-8. Do not send large data; send ids and small values.
- Wait for `createUnityInstance` to resolve before sending messages.

## Common failures
| Symptom | Likely cause |
| --- | --- |
| Black canvas, no errors | Shader or pipeline mismatch (HDRP in WebGL), or the canvas has zero size when created |
| Controls do nothing | Input handling set to the new Input System only, while scripts use the old Input; set "Both" |
| Out of memory | Textures too large or too many; reduce sizes, compress, stream assets |
| Very long load | No stripping, uncompressed textures, or the fallback decompression on a large build |
| Works on desktop, fails on a phone | Mobile WebGL limits; reduce memory and effects, test real devices |
| Console warning about `SharedArrayBuffer` or threads | WebGL does not support threads; remove thread-dependent code |

## Performance targets
Aim for under about 30 MB, a few seconds to start, and stable frame rate on a mid laptop. Measure with the browser Performance panel and Unity's Profiler on a development build. Keep a static image or short video fallback for unsupported devices.
