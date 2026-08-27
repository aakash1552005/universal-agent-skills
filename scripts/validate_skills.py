import os
import re
import sys
from pathlib import Path

BASE_DIR = Path(__file__).parent.parent
SKILLS_DIR = BASE_DIR / ".agents" / "skills"

def validate():
    print("=" * 60)
    print(" Validating Universal AI Agent Skills Structure")
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
            
        content = skill_md.read_text(encoding="utf-8", errors="ignore")
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
        if "name:" not in fm or "description:" not in fm:
            print(f"[ERROR] Missing 'name' or 'description' in frontmatter: {s.name}")
            errors += 1
            
    if errors == 0:
        print(f"\n[SUCCESS] All {len(skills)} skills are 100% compliant with standard specifications!")
    else:
        print(f"\n[FAILED] Found {errors} validation errors.")
        sys.exit(1)

if __name__ == "__main__":
    validate()
