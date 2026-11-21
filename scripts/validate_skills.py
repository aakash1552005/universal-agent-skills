import os
import re
import sys
from pathlib import Path

BASE_DIR = Path(__file__).parent.parent
SKILLS_DIR = BASE_DIR / ".agents" / "skills"


def validate():
    print("=" * 60)
    print(" Validating Universal AI Agent Skills Structure & Quality")
    print("=" * 60)

    if not SKILLS_DIR.exists():
        print("[ERROR] .agents/skills directory not found")
        sys.exit(1)

    skills = [d for d in SKILLS_DIR.iterdir() if d.is_dir()]
    print(f"Discovered {len(skills)} skill packages.")

    errors = 0
    for s in sorted(skills):
        skill_md = s / "SKILL.md"
        if not skill_md.exists():
            print(f"[ERROR] Missing SKILL.md in: {s.name}")
            errors += 1
            continue

        try:
            content = skill_md.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            print(f"[ERROR] Invalid UTF-8 encoding in: {s.name}/SKILL.md")
            errors += 1
            continue

        if not content.startswith("---"):
            print(f"[ERROR] Missing YAML frontmatter header (---) in: {s.name}/SKILL.md")
            errors += 1
            continue

        match = re.search(r"^---\s*\n(.*?)\n---", content, re.DOTALL)
        if not match:
            print(f"[ERROR] Unclosed YAML frontmatter in: {s.name}/SKILL.md")
            errors += 1
            continue

        fm = match.group(1)
        name_match = re.search(r"^name:\s*(.+)$", fm, re.MULTILINE)
        if not name_match or not name_match.group(1).strip().strip("'\""):
            print(f"[ERROR] Missing or empty 'name' in frontmatter: {s.name}")
            errors += 1

        # Parse description (both single-line and multiline block scalars)
        desc_block = re.search(
            r"^description:\s*[>|]-?\s*\n((?:[ \t]+.+\n*)+)", fm, re.MULTILINE
        )
        if desc_block:
            desc = " ".join([l.strip() for l in desc_block.group(1).splitlines() if l.strip()])
        else:
            desc_match = re.search(r"^description:\s*(.+)$", fm, re.MULTILINE)
            desc = desc_match.group(1).strip().strip("'\"") if desc_match else ""

        if not desc or len(desc) < 15 or desc in (">", "|", ">-", "|-"):
            print(f"[ERROR] Incomplete or placeholder description in {s.name}: '{desc}'")
            errors += 1

    if errors == 0:
        print(f"\n[SUCCESS] All {len(skills)} skills are 100% compliant with standard specifications!")
    else:
        print(f"\n[FAILED] Found {errors} validation errors.")
        sys.exit(1)


if __name__ == "__main__":
    validate()
