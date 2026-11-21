import json
import os
import re
from pathlib import Path

BASE_DIR = Path(__file__).parent.parent
SKILLS_DIR = BASE_DIR / ".agents" / "skills"
SITE_DIR = BASE_DIR / "site"


def parse_skill(skill_folder: Path):
    skill_file = skill_folder / "SKILL.md"
    if not skill_file.exists():
        return None
    content = skill_file.read_text(encoding="utf-8", errors="ignore")

    name = skill_folder.name
    desc = "No description provided."

    match = re.search(r"^---\s*\n(.*?)\n---", content, re.DOTALL)
    if match:
        fm = match.group(1)
        name_match = re.search(r"^name:\s*(.+)$", fm, re.MULTILINE)
        if name_match:
            name = name_match.group(1).strip().strip("'\"")

        # Check for multi-line block scalar: description: > or description: |
        desc_block_match = re.search(
            r"^description:\s*[>|]-?\s*\n((?:[ \t]+.+\n*)+)", fm, re.MULTILINE
        )
        if desc_block_match:
            lines = [l.strip() for l in desc_block_match.group(1).splitlines() if l.strip()]
            desc = " ".join(lines)
        else:
            desc_match = re.search(r"^description:\s*(.+)$", fm, re.MULTILINE)
            if desc_match:
                desc = desc_match.group(1).strip().strip("'\"")

    # Normalize description
    desc = re.sub(r"\s+", " ", desc).strip()
    clean_desc = desc
    # Escape pipe characters for markdown tables
    table_desc = clean_desc.replace("|", "\\|")
    return {
        "name": name,
        "folder": skill_folder.name,
        "description": clean_desc,
        "table_description": table_desc,
        "path": f".agents/skills/{skill_folder.name}/SKILL.md",
    }


def build_index():
    all_skills = []
    for item in sorted(SKILLS_DIR.iterdir()):
        if item.is_dir():
            s = parse_skill(item)
            if s:
                all_skills.append(s)

    print(f"Total skills indexed: {len(all_skills)}")

    categories = {
        "🌊 Ruflo Agentic Swarms, Hive Mind & Multi-Agent Coordination": [
            "swarm", "hive-mind", "queen", "byzantine", "consensus", "gossip", "crdt", "raft",
            "quorum", "sparc", "agentdb", "reasoningbank", "flow-nexus", "v3-", "topology",
            "jujutsu", "safla", "sona", "pair-programming", "worker-", "agentic-jujutsu",
            "memory-management", "hooks-automation", "stream-chain", "claims"
        ],
        "🚀 Startup Launch, SaaS Architecture & Monetization": [
            "stripe", "billing", "multi-tenancy", "auth-and-session", "startup-growth", "mobile-cross-platform", "gateway"
        ],
        "🔄 AI Workflow Automation & Orchestration (n8n, Google Flows, Temporal)": [
            "n8n", "workflows", "make-zapier", "temporal", "browser-use", "automation-governance"
        ],
        "📈 SEO, AEO & GEO": [
            "seo", "aeo", "geo", "programmatic-seo"
        ],
        "🤖 AI Agents, LLMs, RAG & Prompt Engineering": [
            "agent", "prompt", "rag", "vector", "mcp", "langgraph", "crewai", "autogen", "llamaindex", "llm", "embeddings"
        ],
        "📊 Data Engineering, Data Science & Analytics": [
            "data", "spark", "airflow", "dbt", "sql", "postgres", "polars", "lakehouse", "snowflake", "databricks", "kpi", "analytics", "quant", "bi-", "gis-"
        ],
        "🧠 Machine Learning, Deep Learning & Vision": [
            "machine-learning", "pytorch", "peft", "quantization", "vllm", "vision", "time-series", "ml-pipeline", "neural"
        ],
        "🏢 Big Tech Architectures (Google, Microsoft, Meta, AWS, Netflix)": [
            "google", "microsoft", "aws", "meta", "netflix", "sre", "grpc", "azure", "dotnet", "semantic-kernel"
        ],
        "🎨 UI/UX Design, Visual Styles & Frontend Engineering": [
            "ui-", "taste", "21st", "slides", "brand", "design", "banner", "web-design", "vue", "nuxt", "svelte", "tailwind", "brutalist", "composition-patterns"
        ],
        "⚡ Backend & Systems Engineering": [
            "python", "nodejs", "golang", "rust", "php", "scala", "api", "system-architecture", "fastapi", "django"
        ],
        "🔒 Cybersecurity, DevSecOps & Compliance": [
            "security", "strix", "owasp", "pentest", "cybersecurity", "semgrep", "pci", "gdpr", "supply-chain"
        ],
        "🚢 Software Engineering Best Practices & Leadership (GStack)": [
            "gstack", "spec", "test", "code", "devops", "ci-cd", "git", "review", "observability", "debugging", "shipping", "devex", "cso", "qa", "doubt-driven", "documentation-and-adrs", "deprecation-and-migration"
        ],
        "💼 Professional Agency Roles, Strategy & Operations": [
            "academic-", "business-", "change-management", "chief-", "customer-", "marketing-", "sales-", "consultant", "operations", "finance", "hr-", "legal", "executive", "product-manager", "recruiter", "writer", "copywriter", "storyteller", "researcher", "strategist", "analyst"
        ],
        "🛠️ Developer Experience, Cloud Deployment & Tooling": [
            "deploy", "context-engineering", "tooling", "cms-", "desktop-", "drupal", "email-intelligence", "developer-"
        ],
    }

    index_md = "# Comprehensive Universal AI Agent Skills Library Index\n\n"
    index_md += f"**Total Installed Skills: {len(all_skills)}**\n\n"
    index_md += "This index catalogues all installed, standardized AI agent skills. Each skill includes an actionable `SKILL.md` containing architectural standards, code templates, and decision frameworks.\n\n"

    # Table of contents
    index_md += "## Quick Navigation\n"
    for cat in categories.keys():
        anchor = re.sub(r"[^\w\s-]", "", cat).strip().lower()
        anchor = re.sub(r"[-\s]+", "-", anchor)
        index_md += f"- [{cat}](#{anchor})\n"
    index_md += "\n---\n\n"

    categorized_names = set()
    catalog_by_category = []

    for cat, keywords in categories.items():
        matched_skills = []
        for s in all_skills:
            matched = any(k in s["folder"].lower() for k in keywords)
            if matched and s["folder"] not in categorized_names:
                categorized_names.add(s["folder"])
                s["category"] = cat
                matched_skills.append(s)

        if matched_skills:
            index_md += f"## {cat}\n\n"
            index_md += "| Skill Name | Description | Path |\n"
            index_md += "|---|---|---|\n"
            for s in matched_skills:
                index_md += f"| **`{s['name']}`** | {s['table_description']} | [`.agents/skills/{s['folder']}`]({s['path']}) |\n"
            index_md += "\n"
            catalog_by_category.append({"category": cat, "skills": matched_skills})

    remaining = [s for s in all_skills if s["folder"] not in categorized_names]
    if remaining:
        index_md += "## 📦 Other Specialized Skills\n\n"
        index_md += "| Skill Name | Description | Path |\n"
        index_md += "|---|---|---|\n"
        for s in remaining:
            s["category"] = "📦 Other Specialized Skills"
            index_md += f"| **`{s['name']}`** | {s['table_description']} | [`.agents/skills/{s['folder']}`]({s['path']}) |\n"
        index_md += "\n"
        catalog_by_category.append({"category": "📦 Other Specialized Skills", "skills": remaining})

    (BASE_DIR / "SKILLS_INDEX.md").write_text(index_md, encoding="utf-8")

    # Generate JSON for Web Catalog, CLI and MCP server
    SITE_DIR.mkdir(parents=True, exist_ok=True)
    catalog_json_payload = {
        "version": "1.0.0",
        "total": len(all_skills),
        "categorized_count": len(categorized_names),
        "categories": list(categories.keys()) + ["📦 Other Specialized Skills"],
        "skills": [
            {
                "name": s["name"],
                "folder": s["folder"],
                "description": s["description"],
                "category": s.get("category", "General"),
                "path": s["path"],
            }
            for s in all_skills
        ],
    }
    (SITE_DIR / "catalog.json").write_text(
        json.dumps(catalog_json_payload, indent=2, ensure_ascii=False), encoding="utf-8"
    )
    # Also save a copy in scripts/ for CLI fast packaging
    (BASE_DIR / "scripts" / "catalog.json").write_text(
        json.dumps(catalog_json_payload, indent=2, ensure_ascii=False), encoding="utf-8"
    )

    print(
        f"SKILLS_INDEX.md & catalog.json generated successfully ({len(categorized_names)} categorized, {len(remaining)} remaining)."
    )


if __name__ == "__main__":
    build_index()
