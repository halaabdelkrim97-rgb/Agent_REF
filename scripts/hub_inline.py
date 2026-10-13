#!/usr/bin/env python3
"""Merge the Project Hub page and its data into one shareable HTML file (standard library only).

Usage: python3 scripts/hub_inline.py <hub folder> <output.html> [--bare] [--title "Name"]
The folder holds index.html and hub-data.js (default location in a project: REF/CONTEXT/hub).
--bare drops the <!DOCTYPE>, <html>, <head> and <body> wrapper, as the Artifact tool adds its own.
--title sets the page <title> (the artifact name); keep it stable across republishes.
"""
import re
import sys
from pathlib import Path

args = sys.argv[1:]
title = None
if "--title" in args:
    i = args.index("--title")
    title = args[i + 1] if i + 1 < len(args) else None
    del args[i:i + 2]
bare = "--bare" in args
args = [a for a in args if a != "--bare"]
if len(args) != 2 or ("--title" in sys.argv and not title):
    sys.exit(__doc__)
folder, out = Path(args[0]), Path(args[1])
page = (folder / "index.html").read_text(encoding="utf-8")
data = (folder / "hub-data.js").read_text(encoding="utf-8").replace("</script", "<\\/script")
tag = '<script src="hub-data.js"></script>'
if tag not in page:
    sys.exit("index.html does not contain the hub-data.js script tag")
page = page.replace(tag, "<script>\n" + data + "\n</script>")
if title:
    page = re.sub(r"<title>.*?</title>", lambda m: "<title>" + title.replace("&", "&amp;").replace("<", "&lt;") + "</title>", page, count=1)
if bare:
    t = re.search(r"<title>.*?</title>", page, re.S).group(0)
    st = re.search(r"<style>.*?</style>", page, re.S).group(0)
    body = re.search(r"<body>(.*)</body>", page, re.S).group(1)
    page = t + "\n" + st + "\n" + body.strip() + "\n"
out.write_text(page, encoding="utf-8")
print("wrote", out)
