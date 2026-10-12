#!/usr/bin/env python3
"""Generate or edit an image with a Nano Banana (Gemini image) model. Standard library only.

    python nano_banana.py "a watercolor fox in a snowy forest" --out assets/fox.png
    python nano_banana.py "add sunglasses" --image photo.png --out assets/photo-sun.png
    python nano_banana.py "test" --dry-run        # print the request, send nothing

The key is read from the GEMINI_API_KEY environment variable (NANOBANANA_API_KEY also works).
It is never printed or written to a file. Model: --model, or NANOBANANA_MODEL, or the default below.
"""
import argparse
import base64
import json
import mimetypes
import os
import sys
import urllib.error
import urllib.request
from pathlib import Path

DEFAULT_MODEL = "gemini-2.5-flash-image"
URL = "https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent"


def build_payload(prompt, images, aspect):
    parts = [{"text": prompt}]
    for img in images:
        path = Path(img)
        mime = mimetypes.guess_type(path.name)[0] or "image/png"
        data = base64.b64encode(path.read_bytes()).decode("ascii")
        parts.append({"inlineData": {"mimeType": mime, "data": data}})
    payload = {"contents": [{"parts": parts}]}
    if aspect:
        payload["generationConfig"] = {"imageConfig": {"aspectRatio": aspect}}
    return payload


def unique_path(path: Path) -> Path:
    if not path.exists():
        return path
    n = 2
    while path.with_name(f"{path.stem}-{n}{path.suffix}").exists():
        n += 1
    return path.with_name(f"{path.stem}-{n}{path.suffix}")


def main(argv):
    ap = argparse.ArgumentParser(description="Generate or edit an image with Nano Banana.")
    ap.add_argument("prompt")
    ap.add_argument("--out", default="nano-banana.png", help="output file (never overwritten)")
    ap.add_argument("--image", action="append", default=[], help="input image for edits (repeatable)")
    ap.add_argument("--model", default=os.environ.get("NANOBANANA_MODEL", DEFAULT_MODEL))
    ap.add_argument("--aspect", help="aspect ratio such as 1:1, 16:9, 9:16")
    ap.add_argument("--dry-run", action="store_true", help="show the request without sending it")
    a = ap.parse_args(argv)

    for img in a.image:
        if not Path(img).is_file():
            sys.exit(f"input image not found: {img}")
    payload = build_payload(a.prompt, a.image, a.aspect)

    if a.dry_run:
        shown = json.loads(json.dumps(payload))
        for part in shown["contents"][0]["parts"]:
            if "inlineData" in part:
                part["inlineData"]["data"] = "<base64 omitted>"
        print(f"POST {URL.format(model=a.model)}")
        print(json.dumps(shown, indent=2))
        return 0

    key = os.environ.get("GEMINI_API_KEY") or os.environ.get("NANOBANANA_API_KEY")
    if not key:
        sys.exit("No key: set GEMINI_API_KEY (get one in Google AI Studio), then restart the terminal.")

    req = urllib.request.Request(
        URL.format(model=a.model),
        data=json.dumps(payload).encode("utf-8"),
        headers={"x-goog-api-key": key, "Content-Type": "application/json"},
    )
    try:
        with urllib.request.urlopen(req, timeout=180) as resp:
            body = json.load(resp)
    except urllib.error.HTTPError as e:
        detail = e.read().decode("utf-8", "replace")[:500]
        sys.exit(f"API error {e.code}: {detail}")
    except urllib.error.URLError as e:
        sys.exit(f"Network error: {e.reason}")

    parts = (body.get("candidates") or [{}])[0].get("content", {}).get("parts", [])
    image = next((p["inlineData"]["data"] for p in parts if "inlineData" in p), None)
    if image is None:
        text = " ".join(p.get("text", "") for p in parts).strip()
        sys.exit("No image returned. " + (text[:300] if text else json.dumps(body)[:300]))

    out = unique_path(Path(a.out))
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_bytes(base64.b64decode(image))
    print(f"saved {out} ({out.stat().st_size} bytes, model {a.model})")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
