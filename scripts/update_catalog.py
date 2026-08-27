import os
import re
from pathlib import Path

BASE_DIR = Path(__file__).parent.parent
SKILLS_DIR = BASE_DIR / ".agents" / "skills"

def parse_skill(skill_folder: Path):
    skill_file = skill_folder / "SKILL.md"
    if not skill_file.exists():
        return None
    content = skill_file.read_text(encoding="utf-8", errors="ignore")
    
    # Extract YAML frontmatter
    name = skill_folder.name
    desc = "No description provided."
    
    match = re.search(r"^---\s*\n(.*?)\n---\s*\n", content, re.DOTALL)
    if match:
        fm = match.group(1)
        name_match = re.search(r"^name:\s*(.+)$", fm, re.MULTILINE)
        if name_match:
            name = name_match.group(1).strip()
        desc_match = re.search(r"^description:\s*(.+)$", fm, re.MULTILINE)
        if desc_match:
            desc = desc_match.group(1).strip()
            
    return {"name": name, "folder": skill_folder.name, "description": desc}

def build_index():
    all_skills = []
    for item in sorted(SKILLS_DIR.iterdir()):
        if item.is_dir():
            s = parse_skill(item)
            if s:
                all_skills.append(s)
                
    print(f"Total skills indexed: {len(all_skills)}")
    
    categories = {
        "🚀 Startup Launch, SaaS Architecture & Monetization": [
            "stripe", "billing", "multi-tenancy", "auth-and-session", "startup-growth", "mobile-cross-platform", "gateway"
        ],
        "🔄 AI Workflow Automation & Orchestration (n8n, Google Flows, Temporal)": [
            "n8n", "workflows", "make-zapier", "temporal", "browser-use"
        ],
        "📈 SEO, AEO & GEO": ["seo", "aeo", "geo", "programmatic-seo"],
        "🤖 AI Agents, LLMs, RAG & Prompt Engineering": [
            "agent", "prompt", "rag", "vector", "mcp", "langgraph", "crewai", "autogen", "llamaindex", "llm"
        ],
        "📊 Data Engineering, Data Science & Analytics": [
            "data", "spark", "airflow", "dbt", "sql", "postgres", "polars", "lakehouse", "snowflake", "databricks", "kpi", "analytics", "quant"
        ],
        "🧠 Machine Learning, Deep Learning & Vision": [
            "machine-learning", "pytorch", "peft", "quantization", "vllm", "vision", "time-series", "ml-pipeline"
        ],
        "🏢 Big Tech Architectures (Google, Microsoft, Meta, AWS, Netflix)": [
            "google", "microsoft", "aws", "meta", "netflix", "sre", "grpc", "azure", "dotnet", "semantic-kernel"
        ],
        "🎨 UI/UX Design, Visual Styles & Frontend Engineering": [
            "ui-", "taste", "21st", "slides", "brand", "design", "banner", "web-design", "vue", "nuxt", "svelte", "tailwind"
        ],
        "⚡ Backend & Systems Engineering": [
            "python", "nodejs", "golang", "rust", "php", "scala", "api", "system-architecture"
        ],
        "🔒 Cybersecurity, DevSecOps & Compliance": [
            "security", "strix", "owasp", "pentest", "cybersecurity", "semgrep", "pci", "gdpr", "supply-chain"
        ],
        "🚢 Software Engineering Best Practices & Leadership (GStack)": [
            "gstack", "spec", "test", "code", "devops", "ci-cd", "git", "review", "observability", "debugging", "shipping", "devex", "cso", "qa"
        ]
    }
    
    index_md = f"# Comprehensive Universal AI Agent Skills Library Index\n\n"
    index_md += f"**Total Installed Skills: {len(all_skills)}**\n\n"
    index_md += "This index catalogues all installed, standardized AI agent skills. Each skill includes an actionable `SKILL.md` containing architectural standards, code templates, and decision frameworks.\n\n"
    
    # Table of contents
    index_md += "## Quick Navigation\n"
    for cat in categories.keys():
        anchor = cat.lower().replace(" ", "-").replace(",", "").replace("&", "").replace("(", "").replace(")", "").replace("🚀", "").replace("🔄", "").replace("📈", "").replace("🤖", "").replace("📊", "").replace("🧠", "").replace("🏢", "").replace("🎨", "").replace("⚡", "").replace("🔒", "").replace("🚢", "").strip("-")
        index_md += f"- [{cat}](#{anchor})\n"
    index_md += "\n---\n\n"
    
    categorized_names = set()
    
    for cat, keywords in categories.items():
        index_md += f"## {cat}\n\n"
        index_md += "| Skill Name | Description | Path |\n"
        index_md += "|---|---|---|\n"
        
        for s in all_skills:
            matched = any(k in s["folder"].lower() for k in keywords)
            if matched and s["folder"] not in categorized_names:
                categorized_names.add(s["folder"])
                index_md += f"| **`{s['name']}`** | {s['description']} | [`.agents/skills/{s['folder']}`](file:///.agents/skills/{s['folder']}/SKILL.md) |\n"
        index_md += "\n"
        
    remaining = [s for s in all_skills if s["folder"] not in categorized_names]
    if remaining:
        index_md += f"## 📦 Other Specialized Skills\n\n"
        index_md += "| Skill Name | Description | Path |\n"
        index_md += "|---|---|---|\n"
        for s in remaining:
            index_md += f"| **`{s['name']}`** | {s['description']} | [`.agents/skills/{s['folder']}`](file:///.agents/skills/{s['folder']}/SKILL.md) |\n"
        index_md += "\n"
        
    (BASE_DIR / "SKILLS_INDEX.md").write_text(index_md, encoding="utf-8")
    print("SKILLS_INDEX.md generated successfully.")

if __name__ == "__main__":
    build_index()
