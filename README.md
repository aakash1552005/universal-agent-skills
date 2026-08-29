# ⚡ Universal AI Agent Skills Library

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![Total Skills](https://img.shields.io/badge/Total%20Skills-547%20Skills-emerald?style=for-the-badge)](#-full-547-skill-catalog)
[![Unified Location](https://img.shields.io/badge/Architecture-All--in--One%20Unified%20Directory-blueviolet?style=for-the-badge)](#-unified-all-in-one-architecture)
[![Active Updates](https://img.shields.io/badge/Status-Actively%20Maintained%20%26%20Updated-success?style=for-the-badge)](#-continuous-updates--roadmap)
[![Cross-Tool Compatibility](https://img.shields.io/badge/Compatible%20With-Antigravity%20|%20Claude%20Code%20|%20Cursor%20|%20Windsurf-indigo?style=for-the-badge)](#-zero-config-compatibility)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=for-the-badge)](CONTRIBUTING.md)

### **The world's most comprehensive, unified open-source library of 547 production AI agent skills.**
*Turn any AI coding assistant into a Principal Staff Engineer, Data Architect, AI Scientist, and Startup Co-founder.*

[Quickstart](#-1-click-installation) • [Why This Library](#-why-universal-agent-skills) • [What You Can Build](#-what-you-can-build) • [Full 547-Skill Catalog](#-full-547-skill-catalog) • [Contributing](#-contributing) • [License](#-license)

</div>

---

## 🌟 Why Universal Agent Skills?

Instead of scattered, fragmented prompt snippets or tool-specific plugins, **Universal Agent Skills** consolidates **all 547 skills into one single, unified workspace standard** (`.agents/skills/`). 

Whether you are a **student** learning state-of-the-art tech, an **enterprise employee** writing mission-critical software, or a **solo founder** building the next unicorn startup, this library gives your AI assistant instant access to elite battle-tested patterns, zero-placeholder code templates, and architectural decision trees.

---

## 🚀 1-Click Installation

Install all **547 skills** into any existing project or new workspace in seconds:

### Windows (PowerShell)
```powershell
irm https://raw.githubusercontent.com/aakash1552005/universal-agent-skills/main/install.ps1 | iex
```

### macOS / Linux (Bash)
```bash
curl -fsSL https://raw.githubusercontent.com/aakash1552005/universal-agent-skills/main/install.sh | bash
```

### Manual Git Clone
```bash
git clone https://github.com/aakash1552005/universal-agent-skills.git
# Copy .agents/ into your target repository root
```

---

## 🏛️ Unified "All-in-One" Architecture

All 547 skills live in a single, standardized directory structure with zero duplicate folders or clutter:

```
universal-agent-skills/
├── .agents/skills/                     # 🌟 Single Unified Skills Root (547 Skills)
│   ├── gstack-plan-ceo-review/         # Garry Tan's GStack Leadership Skills
│   ├── performance-optimization/       # Addy Osmani's Core Engineering Skills
│   ├── owasp-top-10-testing/           # Strix Cybersecurity & Pentesting
│   ├── ui-ux-pro-max/                  # UI/UX Pro Max & 35+ Visual Styles
│   ├── google-cloud-sre-patterns/      # Google SRE & Distributed Tracing
│   ├── microsoft-dotnet-csharp-pro/    # Microsoft .NET 9 & Azure Architectures
│   ├── mcp-server-and-client-builder/  # Anthropic Model Context Protocol (MCP)
│   ├── n8n-workflow-automation/        # n8n & AI Agent Workflow Automation
│   ├── saas-billing-and-stripe/        # Stripe Subscription Monetization
│   └── ... (547 production skills total)
├── .github/
│   ├── workflows/ci.yml                # Automated CI skill validation pipeline
│   ├── workflows/release.yml           # Automated release publisher
│   └── ISSUE_TEMPLATE/                 # Structured community contribution forms
├── scripts/
│   ├── validate_skills.py              # CLI automated syntax & frontmatter tester
│   └── update_catalog.py               # Automated SKILLS_INDEX.md catalog generator
├── install.ps1                         # 1-Click Windows installer
├── install.sh                          # 1-Click Unix installer
├── SKILLS_INDEX.md                     # Complete categorized searchable index
├── CONTRIBUTING.md                     # Contribution guide
├── CODE_OF_CONDUCT.md                  # Contributor Covenant v2.1
├── SECURITY.md                         # Security policy
└── LICENSE                             # MIT Open Source License
```

---

## 🎯 Tailored for Every Developer Stage

| Persona | How Universal Skills Empowers You |
|---|---|
| **🎓 Students & Researchers** | Build cutting-edge machine learning research with PyTorch 2.x, analyze complex datasets with Polars/Arrow, build computer vision pipelines with YOLO/SAM/CLIP, and write publication-grade documentation. |
| **🏢 Tech Employees & Senior Engineers** | Apply Big Tech production standards: Google SRE (SLI/SLO math), Netflix/Uber microservices resilience (Circuit Breakers & Kafka), .NET 9 CQRS, Go microservices, and multi-axis code reviews. |
| **🚀 Startup Founders & Solo Builders** | Ship venture-grade SaaS in days: Stripe subscription billing, PostgreSQL Row-Level Security multi-tenancy, Auth.js / Clerk, Flutter/Expo mobile apps, and AEO/SEO search dominance. |
| **🤖 AI Agent Engineers** | Build autonomous workflows with Model Context Protocol (MCP), LangGraph stateful graphs, CrewAI swarms, AutoGen debate loops, and n8n visual pipelines. |

---

## 🛠️ What You Can Build

```
┌────────────────────────────────────────────────────────────────────────────┐
│                       WHAT YOU CAN SHIP WITH THIS REPO                     │
├────────────────────────┬───────────────────────────┬───────────────────────┤
│ 🚀 Full-Stack SaaS     │ 📊 Autonomous Analytics   │ 🤖 Autonomous Agents  │
│ • Stripe Subscriptions │ • Natural Language to SQL │ • MCP Tool Servers    │
│ • Postgres RLS Tenancy │ • Polars & Arrow Streaming│ • LangGraph State Gts │
│ • Auth.js & Supabase   │ • Automated BI Dashboards │ • CrewAI Swarms       │
│ • Next.js 15 & Svelte 5│ • dbt, Spark & Airflow    │ • n8n Self-Healing    │
├────────────────────────┼───────────────────────────┼───────────────────────┤
│ 📱 Cross-Platform Apps │ 🔒 Enterprise Security    │ 📈 Search & Growth    │
│ • Flutter 3.x Mobile   │ • OWASP Top 10 Pentesting │ • Perplexity/Claude AEO│
│ • React Native / Expo  │ • Strix Automated Audits  │ • Generative GEO Graph│
│ • Offline-first SQLite │ • SOC2, GDPR, PCI DSS     │ • Programmatic SEO    │
└────────────────────────┴───────────────────────────┴───────────────────────┘
```

---

## 📦 Curated Skill Ecosystem (Included Sources)

1. **[Garry Tan's GStack](https://github.com/garrytan/gstack) (All 54 Subskills)**: CEO/Eng/Design plan reviews, QA automation, zero-downtime shipping, incident investigation, and YC Office Hours sounding board.
2. **[Addy Osmani's Agent Skills](https://github.com/addyosmani/agent-skills) (All 24 Skills + References)**: Web performance, Core Web Vitals, API ergonomics, spec-driven development, and architectural ADRs.
3. **[Strix AI Security](https://github.com/usestrix/strix) (8 Skills)**: Automated vulnerability scanning, penetration testing, and security patch remediation.
4. **[UI/UX Pro Max & 21st.dev Magic UI](https://21st.dev) (40+ Skills)**: Production component blocks, Tailwind CSS v4, dynamic bento grids, and 35+ visual aesthetics.
5. **Big Tech Architectures**: Google SRE / BigQuery / gRPC, Microsoft Azure / .NET 9 / Semantic Kernel, AWS Serverless, Meta React 19 / GraphQL, Netflix resilience.
6. **AI Agent Frameworks**: Anthropic MCP, LangGraph, CrewAI, AutoGen, LlamaIndex, and 3-Tier Long-Term Memory.
7. **AI Workflow Automation**: n8n AI agent workflows, Google Cloud Workflows / Vertex AI Flows, Make/Zapier, Temporal.io, and Browser-Use.

---

## 📑 Full 547-Skill Catalog

See the comprehensive, searchable index in **[`SKILLS_INDEX.md`](SKILLS_INDEX.md)** with detailed descriptions and paths for all 547 skills organized across:

- 🚀 **Startup Launch, SaaS Architecture & Monetization**
- 🔄 **AI Workflow Automation & Orchestration (n8n, Google Flows, Temporal)**
- 📈 **SEO, AEO (Answer Engine Optimization) & GEO (Generative Engine Optimization)**
- 🤖 **AI Agents, LLMs, RAG & Prompt Engineering**
- 📊 **Data Engineering, Data Science & Analytics**
- 🧠 **Machine Learning, Deep Learning & Computer Vision**
- 🏢 **Big Tech Architectures (Google, Microsoft, Meta, AWS, Netflix)**
- 🎨 **UI/UX Design Systems & Visual Styles (35+ Aesthetics)**
- ⚡ **Backend & Systems Engineering (Python, Go, Rust, Node, C#, Scala)**
- 🔒 **Cybersecurity, DevSecOps & Enterprise Compliance**
- 🚢 **Software Engineering Best Practices & Leadership (GStack & Addy Osmani)**

---

## 🔄 Continuous Updates & Roadmap

This repository is **actively maintained and continuously updated**. As new AI models, web frameworks, agent protocols, and engineering standards emerge, new skills are added directly to the library.

Upcoming skill modules on our roadmap:
- 🌐 Quantum Computing & Qiskit Algorithms
- 🧬 AI Bio-Informatics & Genomics Pipelines
- ⚡ WebAssembly (Wasm) & Edge Computing Networks
- 🤖 Autonomous Robotics & ROS 2 Agent Integrations

---

## 🌐 Zero-Config Compatibility

Every skill is formatted with standard YAML frontmatter and tested for:
- ✅ **Antigravity IDE** (`.agents/skills/`)
- ✅ **Claude Code** (`.agents/skills/` or `.claude/skills/`)
- ✅ **Cursor** (`.agents/skills/`)
- ✅ **Windsurf** (`.agents/skills/`)
- ✅ **OpenCode & Custom Agent Swarms**

---

## 🤝 Contributing

Contributions from the global open-source community are warmly welcomed! If you have a battle-tested engineering pattern or framework skill, please share it. See [`CONTRIBUTING.md`](CONTRIBUTING.md) for full submission guidelines.

---

## 📜 License

Distributed under the **MIT License** — 100% free for personal, commercial, academic, and open-source use.

<div align="center">

### **Go build something amazing! 🚀**

</div>
