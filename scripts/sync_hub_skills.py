#!/usr/bin/env python3
"""Keep the skill catalog and Forge version inside the Project Hub page in sync with the repo.

Standard library only. Run from the repository root:
  python3 scripts/sync_hub_skills.py          rewrite the catalog block in index.html
  python3 scripts/sync_hub_skills.py --check  exit 1 if it is out of date

Groups come from the README skill catalog; purposes come from skill frontmatter.
"""
import json, re, sys
from pathlib import Path
from package_skills import read_frontmatter

ROOT = Path(__file__).resolve().parent.parent
PAGE = ROOT / "skills/project-hub/templates/index.html"
BEGIN, END = "/*SKILLS:BEGIN*/", "/*SKILLS:END*/"


def short(text, n=120):
    text = re.sub(r"\s+", " ", text).strip()
    first = re.split(r"(?<=[.!?])\s", text)[0]
    first = first if len(first) <= n else text
    return first if len(first) <= n else first[: n - 1].rstrip(" ,;:-") + "…"


def catalog():
    readme = (ROOT / "README.md").read_text(encoding="utf-8")
    try:
        body = readme.split("### Skill catalog", 1)[1].split("\n## ", 1)[0]
    except IndexError:
        sys.exit("README skill catalog heading is missing")
    groups, seen = [], set()
    for line in body.splitlines():
        row = re.match(r"^\|\s*([^|]+?)\s*\|\s*(.*?)\s*\|$", line)
        if not row:
            continue
        names = re.findall(r"\[([a-z0-9-]+)\]\(skills/\1/SKILL\.md\)", row.group(2))
        if not names:
            continue
        group = {"g": row.group(1).strip(), "skills": []}
        for name in names:
            skill = ROOT / "skills" / name / "SKILL.md"
            if name in seen or not skill.exists():
                sys.exit(f"Duplicate or missing skill in README: {name}")
            frontmatter = read_frontmatter(skill)
            if not frontmatter or not frontmatter[2]:
                sys.exit(f"Missing skill description: {name}")
            seen.add(name)
            group["skills"].append([name, short(frontmatter[2])])
        groups.append(group)
    available = {p.parent.name for p in (ROOT / "skills").glob("*/SKILL.md")}
    if seen != available:
        sys.exit(f"README skill catalog mismatch: {sorted(seen ^ available)}")
    ver = re.search(r"Agent version: (v[\d.]+)", (ROOT / "agent/forge.md").read_text(encoding="utf-8"))
    return {"version": ver.group(1) if ver else "", "groups": groups}


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
