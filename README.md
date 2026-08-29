# ⚡ Universal AI Agent Skills Library

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![Total Skills](https://img.shields.io/badge/Total%20Skills-537%20Skills-emerald?style=for-the-badge)](#-full-537-skill-catalog)
[![Unified Location](https://img.shields.io/badge/Architecture-All--in--One%20Unified%20Directory-blueviolet?style=for-the-badge)](#-unified-all-in-one-architecture)
[![Active Updates](https://img.shields.io/badge/Status-Actively%20Maintained%20%26%20Updated-success?style=for-the-badge)](#-continuous-updates--roadmap)
[![Cross-Tool Compatibility](https://img.shields.io/badge/Compatible%20With-Antigravity%20|%20Claude%20Code%20|%20Cursor%20|%20Windsurf-indigo?style=for-the-badge)](#-zero-config-compatibility)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=for-the-badge)](CONTRIBUTING.md)

### **A unified library of 537 AI agent skills.**
*Provide your AI coding assistant with system prompts and workflows for engineering, data, marketing, and specialized roles.*

[Quickstart](#-1-click-installation) • [Why This Library](#-why-universal-agent-skills) • [What You Can Build](#-what-you-can-build) • [Full 537-Skill Catalog](#-full-537-skill-catalog) • [Contributing](#-contributing) • [License](#-license)

</div>

---

## 🌟 Why Universal Agent Skills?

Instead of scattered prompt snippets or tool-specific plugins, **Universal Agent Skills** consolidates **537 skills into a single workspace standard** (`.agents/skills/`). 

Whether you are an individual developer, a researcher, or a team building software, this library provides your AI assistant with structured prompts, code templates, and architectural patterns.

---

## 🚀 1-Click Installation

Install the skills into your existing project or new workspace:

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

All 537 skills reside in a standardized directory structure:

```
universal-agent-skills/
├── .agents/skills/                     # 🌟 Single Unified Skills Root (537 Skills)
│   ├── gstack-plan-ceo-review/         # Garry Tan's GStack Leadership Skills
│   ├── performance-optimization/       # Addy Osmani's Core Engineering Skills
│   ├── owasp-top-10-testing/           # Strix Cybersecurity & Pentesting
│   ├── ui-ux-pro-max/                  # UI/UX Pro Max & 35+ Visual Styles
│   ├── google-cloud-sre-patterns/      # Google SRE & Distributed Tracing
│   ├── marketing-tiktok-strategist/    # Agency Agents: Digital Marketing & SEO
│   ├── gis-spatial-data-scientist/     # Agency Agents: Spatial Computing & GIS
│   ├── n8n-workflow-automation/        # n8n & AI Agent Workflow Automation
│   └── ... (537 production skills total)
├── .github/
│   ├── workflows/ci.yml                # Automated CI skill validation pipeline
│   ├── workflows/release.yml           # Automated release publisher
│   └── ISSUE_TEMPLATE/                 # Structured community contribution forms
├── scripts/
│   ├── validate_skills.py              # CLI automated syntax & frontmatter tester
│   └── update_catalog.py               # Automated SKILLS_INDEX.md catalog generator
├── install.ps1                         # Windows installer
├── install.sh                          # Unix installer
├── SKILLS_INDEX.md                     # Complete categorized index
├── CONTRIBUTING.md                     # Contribution guide
├── CODE_OF_CONDUCT.md                  # Contributor Covenant v2.1
├── SECURITY.md                         # Security policy
└── LICENSE                             # MIT Open Source License
```

---

## 🎯 Tailored for Developer Workflows

| Persona | How Universal Skills Helps |
|---|---|
| **🏢 Enterprise Engineers & Architects** | Access standard production patterns: Google SRE (SLI/SLO), microservices resilience, .NET 9 CQRS, Go microservices, and code reviews. |
| **🚀 Startup Founders & Solo Builders** | Build SaaS applications using templates for Stripe billing, PostgreSQL RLS multi-tenancy, Auth.js, and Flutter apps. |
| **🤖 AI Agent & Automation Engineers** | Reference workflows for Model Context Protocol (MCP), LangGraph, CrewAI, and n8n visual pipelines. |
| **📈 Marketing, Sales & Strategy** | Use specialized agent prompts for SEO, B2B sales pipeline analysis, paid media, product management, and spatial computing design. |

---

## 🛠️ What You Can Build

Combine engineering skills and specialized agency roles for your workflows.

### 🌐 Scalable SaaS & Engineering
- **SaaS Platforms**: Implement Stripe Subscriptions, PostgreSQL RLS, Next.js 15 & Auth.js.
- **Cross-Platform Applications**: Build with Flutter 3.x, React Native / Expo, and offline-first SQLite.
- **Infrastructure**: Configure Kubernetes, Terraform IaC, Databricks Lakehouse, and AWS Serverless.

### 🧠 Advanced AI & Autonomous Agents
- **Agentic Ecosystems**: Set up MCP Tool Servers, LangGraph State Machines, and CrewAI swarms.
- **Data & Analytics**: Generate SQL from natural language, process Polars & Arrow streams, and automate dbt transformations.
- **Machine Learning**: Fine-tune PEFT/LoRA models, implement PyTorch vision pipelines, and set up RAG architectures.

### 🏢 Agency Operations & Growth
- **Digital Marketing & Growth**: Generate programmatic SEO, plan audience strategies, and manage App Store Optimization (ASO).
- **Sales & Project Management**: Automate Jira workflows, synthesize meeting notes, and analyze sales pipelines.
- **Specialized Industry Verticals**: 
  - *GIS & Spatial*: Drone mapping, 3D Scene development, and Cartography.
  - *Game Dev*: Engine architecture, Level design, and audio engineering.
  - *Finance*: Virtual economy design, investment research, and bookkeeping processes.

### 🔒 Enterprise Security & Compliance
- **Offensive & Defensive Security**: Audit against OWASP Top 10 and implement zero-trust architectures.
- **Compliance Automation**: Reference SOC2, GDPR, PCI DSS, and FedRAMP governance protocols.

---

## 📦 Curated Skill Ecosystem (Included Sources)

1. **[Garry Tan's GStack](https://github.com/garrytan/gstack)**: CEO/Eng/Design plan reviews, QA automation, shipping, and incident investigation.
2. **[Agency Agents Framework](https://github.com/msitarzewski/agency-agents)**: Over 260+ specialized personas spanning Marketing, GIS, Healthcare, Game Development, Finance, Sales, and Strategy.
3. **[Addy Osmani's Agent Skills](https://github.com/addyosmani/agent-skills)**: Web performance, Core Web Vitals, API ergonomics, and architectural ADRs.
4. **[Strix AI Security](https://github.com/usestrix/strix)**: Vulnerability scanning, penetration testing, and security patch remediation.
5. **[UI/UX Pro Max & 21st.dev Magic UI](https://21st.dev)**: Component blocks, Tailwind CSS v4, bento grids, and visual aesthetics.
6. **Big Tech Architectures**: Google SRE / BigQuery / gRPC, Microsoft Azure / .NET 9, AWS Serverless, Meta React 19 / GraphQL, Netflix resilience.
7. **AI Agent Frameworks**: Anthropic MCP, LangGraph, CrewAI, AutoGen, LlamaIndex, and Long-Term Memory.

---

## 📑 Full 537-Skill Catalog

See the complete index in **[`SKILLS_INDEX.md`](SKILLS_INDEX.md)** with detailed descriptions and paths for all 537 skills organized across:

- 🚀 **Startup Launch, SaaS Architecture & Monetization**
- 🔄 **AI Workflow Automation & Orchestration (n8n, Google Flows, Temporal)**
- 📈 **SEO, AEO (Answer Engine Optimization) & GEO (Generative Engine Optimization)**
- 🤖 **AI Agents, LLMs, RAG & Prompt Engineering**
- 📊 **Data Engineering, Data Science & Analytics**
- 🧠 **Machine Learning, Deep Learning & Computer Vision**
- 🏢 **Big Tech Architectures (Google, Microsoft, Meta, AWS, Netflix)**
- 🎨 **UI/UX Design Systems & Visual Styles**
- ⚡ **Backend & Systems Engineering (Python, Go, Rust, Node, C#, Scala)**
- 🔒 **Cybersecurity, DevSecOps & Enterprise Compliance**
- 🚢 **Software Engineering Best Practices & Leadership**
- 💼 **Professional Agency Roles (Marketing, Finance, Healthcare, Sales, GIS)**

---

## 🔄 Continuous Updates & Roadmap

This repository is maintained and updated. As new tools, frameworks, and agent protocols emerge, new skills are added to the library.

**Upcoming skill modules on our roadmap:**
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

Contributions are welcome. If you have a workflow, pattern, or specialized AI skill to add, please see [`CONTRIBUTING.md`](CONTRIBUTING.md) for submission guidelines.

---

## 📜 License

Distributed under the **MIT License**.
