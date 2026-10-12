#!/usr/bin/env python3
"""Build one upload-ready ZIP per skill for Claude chat (Customize > Skills > Upload a skill).

Standard library only. Run from the repository root:

    python3 scripts/package_skills.py            # all skills -> dist/<skill>.zip
    python3 scripts/package_skills.py threejs    # only the named skills
    python3 scripts/package_skills.py --check    # validate only, write nothing

Each skill is checked first: allowed frontmatter keys only, name equal to the folder,
a description of at most 1024 characters. A skill that fails is reported and not zipped.
"""
import re
import sys
import zipfile
from pathlib import Path

ALLOWED = {"name", "description", "license", "compatibility", "metadata", "allowed-tools"}
SKILLS_DIR = Path(__file__).resolve().parent.parent / "REF" / "SKILLS"
OUT_DIR = Path(__file__).resolve().parent.parent / "dist"
SKIP = {"__pycache__", ".DS_Store"}


def read_frontmatter(skill_md: Path):
    text = skill_md.read_text(encoding="utf-8")
    m = re.match(r"---\n(.*?)\n---\n", text, re.S)
    if not m:
        return None
    block = m.group(1)
    keys = re.findall(r"^([A-Za-z0-9_-]+):", block, re.M)
    name = re.search(r"^name:\s*(.+)$", block, re.M)
    desc = re.search(r"^description:\s*(.*(?:\n[ \t]+.*)*)", block, re.M)
    description = re.sub(r"\s+", " ", desc.group(1)).strip().strip("\"'") if desc else ""
    return keys, (name.group(1).strip().strip("\"'") if name else ""), description


def check(skill: Path):
    problems = []
    md = skill / "SKILL.md"
    if not md.exists():
        return ["no SKILL.md"]
    fm = read_frontmatter(md)
    if fm is None:
        return ["no frontmatter"]
    keys, name, description = fm
    extra = sorted(set(keys) - ALLOWED)
    if extra:
        problems.append(f"keys not accepted by claude.ai uploads: {extra}")
    if name != skill.name:
        problems.append(f"name '{name}' does not match folder '{skill.name}'")
    if not re.fullmatch(r"[a-z0-9]+(-[a-z0-9]+)*", name) or len(name) > 64:
        problems.append("name must be lowercase letters, digits and hyphens, at most 64 characters")
    if not description:
        problems.append("missing description")
    if len(description) > 1024:
        problems.append(f"description is {len(description)} characters (limit 1024)")
    return problems


def build_zip(skill: Path) -> Path:
    OUT_DIR.mkdir(exist_ok=True)
    target = OUT_DIR / f"{skill.name}.zip"
    with zipfile.ZipFile(target, "w", zipfile.ZIP_DEFLATED) as z:
        for f in sorted(skill.rglob("*")):
            if f.is_file() and not (set(f.parts) & SKIP):
                z.write(f, Path(skill.name) / f.relative_to(skill))
    return target


def main(argv):
    check_only = "--check" in argv
    wanted = [a for a in argv if not a.startswith("--")]
    skills = sorted(p for p in SKILLS_DIR.iterdir() if p.is_dir())
    if wanted:
        skills = [s for s in skills if s.name in wanted]
        missing = set(wanted) - {s.name for s in skills}
        if missing:
            print("Unknown skill(s):", ", ".join(sorted(missing)))
            return 2
    failed = 0
    for skill in skills:
        problems = check(skill)
        if problems:
            failed += 1
            print(f"FAIL  {skill.name}")
            for p in problems:
                print(f"        - {p}")
            continue
        if check_only:
            print(f"ok    {skill.name}")
        else:
            z = build_zip(skill)
            print(f"ok    {skill.name:<24} {z.stat().st_size / 1024:8.1f} KB  {z.relative_to(z.parent.parent)}")
    print(f"\n{len(skills) - failed} of {len(skills)} skills passed" + ("" if check_only else "; ZIPs are in dist/"))
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
