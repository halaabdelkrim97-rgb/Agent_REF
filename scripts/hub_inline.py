#!/usr/bin/env python3
"""Merge the Project Hub page and its data into one shareable HTML file (standard library only).

Usage: python3 scripts/hub_inline.py <hub folder> <output.html>
The folder holds index.html and hub-data.js (default location in a project: REF/CONTEXT/hub).
"""
import sys
from pathlib import Path

if len(sys.argv) != 3:
    sys.exit(__doc__)
folder, out = Path(sys.argv[1]), Path(sys.argv[2])
page = (folder / "index.html").read_text(encoding="utf-8")
data = (folder / "hub-data.js").read_text(encoding="utf-8").replace("</script", "<\\/script")
tag = '<script src="hub-data.js"></script>'
if tag not in page:
    sys.exit("index.html does not contain the hub-data.js script tag")
out.write_text(page.replace(tag, "<script>\n" + data + "\n</script>"), encoding="utf-8")
print("wrote", out)
