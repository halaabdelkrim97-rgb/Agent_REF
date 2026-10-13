#!/usr/bin/env python3
"""Keep the skill catalog and Forge version inside the Project Hub page in sync with the repo.

Standard library only. Run from the repository root:
  python3 scripts/sync_hub_skills.py          rewrite the catalog block in index.html
  python3 scripts/sync_hub_skills.py --check  exit 1 if it is out of date

Groups and one-line purposes come from README.md (### group headings and skill table rows).
"""
import json, re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PAGE = ROOT / "REF/SKILLS/project-hub/templates/index.html"
BEGIN, END = "/*SKILLS:BEGIN*/", "/*SKILLS:END*/"


def short(text, n=120):
    text = re.sub(r"\s+", " ", text).strip()
    first = re.split(r"(?<=[.!?])\s", text)[0]
    first = first if len(first) <= n else text
    return first if len(first) <= n else first[: n - 1].rstrip(" ,;:-") + "…"


def catalog():
    readme = (ROOT / "README.md").read_text(encoding="utf-8")
    body = readme.split("## 🧰 Skills", 1)[1].split("\n## ", 1)[0]
    groups, cur = [], None
    for line in body.splitlines():
        if line.startswith("### "):
            cur = {"g": line[4:].strip(), "skills": []}
            groups.append(cur)
        else:
            m = re.match(r"\| \[`([^`]+)`\]\([^)]*\) \| (.*) \|$", line)
            if m and cur is not None:
                if not (ROOT / "REF/SKILLS" / m.group(1) / "SKILL.md").exists():
                    sys.exit(f"README lists {m.group(1)} but the skill folder is missing")
                cur["skills"].append([m.group(1), short(m.group(2))])
    ver = re.search(r"Agent version: (v[\d.]+)", (ROOT / "REF/AGENT/forge.md").read_text(encoding="utf-8"))
    return {"version": ver.group(1) if ver else "", "groups": [g for g in groups if g["skills"]]}


def render():
    cat = catalog()
    lines = ",\n".join(json.dumps(g, ensure_ascii=False) for g in cat["groups"])
    data = ('{"version": %s, "groups": [\n%s\n]}' % (json.dumps(cat["version"]), lines)).replace("</", "<\\/")
    page = PAGE.read_text(encoding="utf-8")
    a, b = page.index(BEGIN) + len(BEGIN), page.index(END)
    return page, page[:a] + "\nconst FORGE = " + data + ";\n" + page[b:]


def main(argv):
    old, new = render()
    if "--check" in argv:
        if old != new:
            print("hub skill catalog is out of date: run python3 scripts/sync_hub_skills.py")
            return 1
        print("hub skill catalog is up to date")
        return 0
    PAGE.write_text(new, encoding="utf-8")
    print("hub skill catalog updated")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
