# ⚡ Universal AI Agent Skills Library

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![Total Skills](https://img.shields.io/badge/Total%20Skills-672%20Skills-emerald?style=for-the-badge)](#-full-672-skill-catalog)
[![Web Catalog](https://img.shields.io/badge/Web%20Catalog-Live%20on%20GitHub%20Pages-2ea44f?style=for-the-badge&logo=github)](https://aakash1552005.github.io/universal-agent-skills/)
[![CLI Tool](https://img.shields.io/badge/CLI-universal--agent--skills-blueviolet?style=for-the-badge&logo=npm)](#-interactive-cli--selective-installation)
[![MCP Server](https://img.shields.io/badge/MCP-Stdio%20Server%20Ready-black?style=for-the-badge&logo=anthropic)](#-model-context-protocol-mcp-server)
[![Compatible With](https://img.shields.io/badge/Compatible%20With-Antigravity%20|%20Claude%20Code%20|%20Cursor%20|%20Windsurf-indigo?style=for-the-badge)](#-zero-config-compatibility)

### **The world's most comprehensive, unified library of 672 production AI agent skills.**
*Empower your AI coding assistants with enterprise-grade system instructions, multi-agent swarms, security playbooks, and full-stack workflows.*

[🌐 Live Web Catalog](https://aakash1552005.github.io/universal-agent-skills/) • [⚡ Interactive CLI](#-interactive-cli--selective-installation) • [🧠 MCP Server](#-model-context-protocol-mcp-server) • [📖 Cookbooks](#-real-world-cookbooks) • [📑 Full Catalog](#-full-672-skill-catalog)

</div>

---

> [!IMPORTANT]
> **The Problem:** Modern AI coding assistants (Cursor, Claude Code, Antigravity, Windsurf) default to generic outputs. Developers waste hours manually re-prompting architectural standards, configuring security guardrails, or copy-pasting prompt snippets for every new repository.
> 
> **The Solution:** **Universal Agent Skills** provides **672 battle-tested production skills** in a unified open standard (`.agents/skills/`):
> - ⚡ **Zero-Config CLI**: Run `npx universal-agent-skills add @bundle/saas` to configure your agent in seconds.
> - 🧠 **Zero-Disk MCP Server**: Connect all 672 skills dynamically via Model Context Protocol without filling your disk.
> - 🌐 **Instant Web Catalog**: Filter, search, and inspect playbooks visually at [aakash1552005.github.io/universal-agent-skills](https://aakash1552005.github.io/universal-agent-skills/).
> - 📖 **Multi-Skill Cookbooks**: Chained workflows for Zero-to-Production SaaS, Autonomous Security, and Multi-Agent Swarms.

---

## 📸 See It in Action

### 1. Interactive CLI Setup Wizard
```bash
$ npx universal-agent-skills init

⚡ Universal AI Agent Skills — Interactive Setup Wizard
Select skill bundles to install into this workspace:

  [x] 1. 🚀 Full-Stack SaaS & Monetization (@bundle/saas)
  [x] 2. 🌊 Multi-Agent Swarms & Consensus (@bundle/swarms)
  [x] 3. 🔒 Cybersecurity & DevSecOps     (@bundle/security)
  [ ] 4. 🤖 AI Agents, LLMs & Vector RAG  (@bundle/data-ai)
  [ ] 5. 🎨 UI/UX Design & Styling        (@bundle/frontend)

✔ Installed 3 bundles (28 skills) into ./.agents/skills/ in 0.4s!
```

### 2. Live Web Catalog
👉 **[Open Live Web Catalog](https://aakash1552005.github.io/universal-agent-skills/)**
```
┌────────────────────────────────────────────────────────────────────────┐
│ ⚡ Universal AI Agent Skills Library — 672 Production Skills           │
│ [ 🔍 Search 672 skills... (e.g. stripe, swarm, postgres, owasp) ]      │
│                                                                        │
│ Filters: [All] [🌊 Swarms] [🚀 SaaS] [🔒 Security] [🤖 AI] [📊 Data]   │
│                                                                        │
│ ┌──────────────────────┐ ┌──────────────────────┐ ┌──────────────────┐ │
│ │ 🌊 hive-mind-advanced│ │ 🚀 stripe-billing    │ │ 🔒 owasp-top-10  │ │
│ │ Queen-led swarms &   │ │ Subscriptions, RLS,  │ │ Dynamic security │ │
│ │ Byzantine consensus  │ │ webhooks, customer   │ │ scanning & patch │ │
│ │ [📋 Copy Install]    │ │ [📋 Copy Install]    │ │ [📋 Copy Install]│ │
│ └──────────────────────┘ └──────────────────────┘ └──────────────────┘ │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Overview

Instead of fragmented prompts or tool-specific lock-in, **Universal Agent Skills** establishes a single open standard (`.agents/skills/`) compatible across **Antigravity IDE**, **Claude Code**, **Cursor**, **Windsurf**, and autonomous swarms.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        DEVELOPER / AI ASSISTANT                        │
│             Antigravity  •  Claude Code  •  Cursor  •  Windsurf        │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
           ┌────────────────────────┴────────────────────────┐
           ▼                                                 ▼
┌──────────────────────┐                          ┌──────────────────────┐
│  NPX CLI / BUNDLES   │                          │   STDIO MCP SERVER   │
│  npx universal-skills│                          │  Dynamic Context     │
└──────────┬───────────┘                          └──────────┬───────────┘
           │                                                 │
           └────────────────────────┬────────────────────────┘
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   UNIVERSAL AGENT SKILLS LIBRARY                       │
│  672 Validated Skills  •  Multi-Agent Swarms  •  Enterprise Cookbooks  │
│  SaaS & Payments • Security & Pentesting • Big Tech • Agency Agents    │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│           🌐 LIVE WEB CATALOG (Instant Search & Filter)                │
│             https://aakash1552005.github.io/universal-agent-skills/     │
└────────────────────────────────────────────────────────────────────────┘
```

---

## ⚡ Interactive CLI & Selective Installation

Install specific skills or curated bundles on-the-fly into any repository without cloning the entire repository:

```bash
# Install a specific skill into .agents/skills/
npx universal-agent-skills add stripe-billing

# Install domain bundles
npx universal-agent-skills add @bundle/saas        # Stripe, Postgres RLS, Next.js, Auth.js, Vercel
npx universal-agent-skills add @bundle/swarms      # Ruflo Queen, SPARC coder, Byzantine consensus
npx universal-agent-skills add @bundle/security    # Strix OWASP Top 10, Semgrep, Compliance, Zero-Trust
npx universal-agent-skills add @bundle/data-ai     # LangGraph, MCP, Vector RAG, Polars, dbt
npx universal-agent-skills add @bundle/frontend    # UI/UX Pro Max, Brutalism, Glassmorphism, Tailwind v4
npx universal-agent-skills add @bundle/leadership  # GStack CEO/Eng Review, Ship, Performance, QA

# Interactive terminal wizard
npx universal-agent-skills init

# Search across all 672 skills by keyword
npx universal-agent-skills search kubernetes

# Inspect skill details & requirements
npx universal-agent-skills info hive-mind-advanced
```

### CLI Command Reference

| Command | Usage | Description |
| :--- | :--- | :--- |
| `add <skill \| @bundle>` | `npx universal-agent-skills add stripe-billing` | Downloads and installs skills directly to `.agents/skills/`. |
| `search <term>` | `npx universal-agent-skills search postgres` | Fast keyword and domain search across all 672 skills. |
| `list [filter]` | `npx universal-agent-skills list swarm` | Displays formatted list of skills with descriptions. |
| `info <skill>` | `npx universal-agent-skills info sparc-methodology` | Displays full frontmatter details, category, and requirements. |
| `init` | `npx universal-agent-skills init` | Interactive multi-select installer for project setup. |
| `mcp` | `npx universal-agent-skills mcp` | Spawns standard Stdio Model Context Protocol server. |

---

## 🌐 Live Interactive Web Catalog

Search, filter, and inspect skills directly in the browser:
👉 **[https://aakash1552005.github.io/universal-agent-skills](https://aakash1552005.github.io/universal-agent-skills)**

- 🔍 **Real-time instant search** across all 672 skills and tags.
- 🏷️ **Category Filter Pills** (Swarms, SaaS, Security, AI Agents, Data, Frontend, Big Tech, Agency).
- 📋 **1-Click Copy Install Command** (`npx universal-agent-skills add <name>`).
- 📖 **Direct GitHub links** to every skill's source documentation.

---

## 🧠 Model Context Protocol (MCP) Server

Connect the entire 672-skill library to your agent environment with **zero disk clutter**. Your agent queries and retrieves playbooks into context only when needed.

### Configuration

Add to your **Claude Code**, **Cursor**, or **Antigravity** MCP settings:

```json
{
  "mcpServers": {
    "universal-skills": {
      "command": "npx",
      "args": ["-y", "universal-agent-skills", "mcp"]
    }
  }
}
```

Or connect in Claude Code CLI:
```bash
claude mcp add universal-skills -- npx -y universal-agent-skills mcp
```

### Available MCP Tools

- `search_skills(query)`: Search catalog by task, language, or architectural pattern.
- `get_skill_details(skill_name)`: Returns the complete instructions and system prompt for a skill.
- `list_skill_bundles()`: Inspect curated multi-skill bundles.
- `install_skill(skill_name)`: Installs the requested skill directly into the active project workspace.

---

## 📖 Real-World Cookbooks

Chaining skills together produces autonomous execution pipelines. Explore our step-by-step guides:

- 🚀 **[Cookbook 1: Zero-to-Production SaaS in One Afternoon](cookbooks/01-zero-to-production-saas.md)**  
  *GStack CEO Plan → PostgreSQL RLS Multi-Tenancy → Stripe Billing → UI/UX Pro Max → Vercel Deployment.*
- 🔒 **[Cookbook 2: Autonomous Security Audit & Pentest Remediation](cookbooks/02-autonomous-security-pentest.md)**  
  *Strix OWASP Top 10 → Pentest Simulation → Hardening & Secrets Hygiene → CI Guardrails.*
- 🌊 **[Cookbook 3: Multi-Agent Swarm Collaboration & Consensus](cookbooks/03-multi-agent-swarm-collaboration.md)**  
  *Ruflo Queen Coordinator → SPARC Autonomous Coder → Byzantine Consensus Verification.*

---

## 🚀 1-Click Complete Installation

To install all 672 skills directly into your workspace:

### Windows (PowerShell)
```powershell
irm https://raw.githubusercontent.com/aakash1552005/universal-agent-skills/main/install.ps1 | iex
```

### macOS / Linux (Bash)
```bash
curl -fsSL https://raw.githubusercontent.com/aakash1552005/universal-agent-skills/main/install.sh | bash
```

### Git Submodule / Clone
```bash
git clone https://github.com/aakash1552005/universal-agent-skills.git
# Copy .agents/skills/ into your repository root
```

---

## 🏛️ Standardized Architecture

All skills strictly conform to standard specifications with valid YAML frontmatter:

```
universal-agent-skills/
├── .agents/skills/                     # 🌟 Unified Skills Directory (672 Skills)
│   ├── universal-skill-dispatcher/     # Autonomous Meta-Skill Router
│   ├── hive-mind-advanced/             # Ruflo: Queen-Led Swarm & Consensus
│   ├── sparc-methodology/              # Ruflo: SPARC Autonomous Coding Swarms
│   ├── gstack-plan-ceo-review/         # Garry Tan's GStack Leadership Suite
│   ├── performance-optimization/       # Addy Osmani's Core Web Performance
│   ├── owasp-top-10-testing/           # Strix Cybersecurity & Pentesting
│   ├── ui-ux-pro-max/                  # UI/UX Pro Max Design Intelligence
│   ├── google-cloud-sre-patterns/      # Google SRE & Distributed Tracing
│   ├── stripe-billing/                 # Production Subscription Architecture
│   ├── marketing-tiktok-strategist/    # Agency Agents: Digital Marketing & SEO
│   └── ... (672 production skills total)
├── bin/
│   └── cli.js                          # Zero-dependency CLI & stdio MCP server
├── cookbooks/                          # Step-by-step end-to-end implementation guides
├── site/                               # Live GitHub Pages Web Catalog
├── scripts/
│   ├── validate_skills.py              # Automated syntax, schema & quality validator
│   └── update_catalog.py               # Dynamic SKILLS_INDEX.md & JSON generator
├── install.ps1                         # Windows 1-click installer
├── install.sh                          # Unix 1-click installer
└── SKILLS_INDEX.md                     # Complete categorized skills encyclopedia
```

---

## 📑 Full 672-Skill Catalog Breakdown

Explore the detailed directory in **[`SKILLS_INDEX.md`](SKILLS_INDEX.md)**:

| Category | Icon | Skills | Highlights |
| :--- | :---: | :---: | :--- |
| **Ruflo Swarms & Hive Mind** | 🌊 | 24 | Queen coordinator, SPARC coder, Byzantine fault tolerance, CRDT sync, AgentDB. |
| **Startup Launch & SaaS** | 🚀 | 18 | Stripe billing, Postgres RLS, Auth.js, Next.js 15, Freemium tiers, Analytics. |
| **Workflow Automation** | 🔄 | 22 | n8n visual automation, Temporal workflows, Webhooks, Event queues. |
| **SEO, AEO & GEO** | 📈 | 26 | Programmatic SEO, Answer Engine Optimization, Search Console telemetry. |
| **AI Agents & LLMs** | 🤖 | 42 | MCP servers, LangGraph state machines, CrewAI, AutoGen, Vector RAG. |
| **Data Engineering & Science** | 📊 | 48 | BigQuery, Polars & Arrow, dbt pipelines, Snowflake, DuckDB analytics. |
| **ML & Computer Vision** | 🧠 | 36 | PyTorch, Hugging Face PEFT/LoRA, YOLO, OpenCV, ONNX runtime. |
| **Big Tech Architectures** | 🏢 | 34 | Google SRE, AWS Serverless, Azure .NET 9, Meta React 19, Netflix chaos. |
| **UI/UX & Design Systems** | 🎨 | 52 | UI/UX Pro Max, Glassmorphism, Brutalism, Apple aesthetic, Tailwind v4. |
| **Backend & Systems** | ⚡ | 58 | FastAPI, Go microservices, Rust async, Spring Boot, Node.js concurrency. |
| **Cybersecurity & DevSecOps** | 🔒 | 40 | Strix OWASP Top 10, Semgrep, Trivy, Zero-Trust, SOC2/GDPR compliance. |
| **Software Quality & Lead** | 🚢 | 65 | Garry Tan GStack, Addy Osmani engineering, TDD, Clean Architecture. |
| **Agency Roles & Strategy** | 💼 | 116 | Product Managers, Sales Ops, Finance Analysts, GIS Specialists, Legal. |
| **Developer Experience** | 🛠️ | 91 | Docker, Kubernetes, GitHub Actions CI/CD, Terraform, Vitest, Playwright. |

---

## 🌐 Zero-Config Compatibility

Every skill conforms to standard markdown format with UTF-8 encoding and YAML frontmatter (`name`, `description`):
- ✅ **Antigravity IDE** (`.agents/skills/`)
- ✅ **Claude Code** (`.agents/skills/` or `.claude/skills/`)
- ✅ **Cursor** (`.agents/skills/`)
- ✅ **Windsurf** (`.agents/skills/`)
- ✅ **Devin & OpenCode Swarms**

---

## 🤝 Contributing

Contributions are welcome! If you have built or refined a skill, check out [`CONTRIBUTING.md`](CONTRIBUTING.md) and submit a Pull Request. Every submission is automatically verified via our GitHub Actions quality gate.

---

## 📜 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for details.

<div align="center">

### **Go build something amazing! 🚀**

⭐ [Star this repo](https://github.com/aakash1552005/universal-agent-skills/stargazers) • 🍴 [Fork it](https://github.com/aakash1552005/universal-agent-skills/fork) • 🐛 [Report an issue](https://github.com/aakash1552005/universal-agent-skills/issues)

</div>
```

---

## 🎯 Tailored for Developer Workflows

| Persona | How Universal Skills Helps |
|---|---|
| **🌊 Swarm & Autonomous Agent Builders** | Deploy Ruflo multi-player swarms, Queen coordinators, Byzantine consensus, CRDT sync, AgentDB neural memory, and Flow Nexus execution. |
| **🏢 Enterprise Engineers & Architects** | Access standard production patterns: Google SRE (SLI/SLO), microservices resilience, .NET 9 CQRS, Go microservices, and code reviews. |
| **🚀 Startup Founders & Solo Builders** | Build SaaS applications using templates for Stripe billing, PostgreSQL RLS multi-tenancy, Auth.js, and Flutter apps. |
| **🤖 AI Agent & Automation Engineers** | Reference workflows for Model Context Protocol (MCP), LangGraph, CrewAI, AutoGen, and n8n visual pipelines. |
| **📈 Marketing, Sales & Strategy** | Use specialized agent prompts for SEO, B2B sales pipeline analysis, paid media, product management, and spatial computing design. |

---

## 🛠️ What You Can Build

Combine engineering skills, multi-agent swarms, and specialized agency roles for your workflows.

### 🌊 Autonomous Multi-Agent Swarms & Intelligence
- **Swarm Orchestration**: Queen-led multi-agent topologies, Byzantine fault tolerance, Raft consensus, and CRDT synchronizers.
- **AgentDB & Reasoning Memory**: Semantic routing, HNSW vector search, hierarchical recall, and continuous learning plugins.
- **SPARC Engineering Methodology**: Specification, Pseudocode, Architecture, Refinement, and Completion autonomous coder loops.

### 🌐 Scalable SaaS & Engineering
- **SaaS Platforms**: Implement Stripe Subscriptions, PostgreSQL RLS, Next.js 15 & Auth.js.
- **Cross-Platform Applications**: Build with Flutter 3.x, React Native / Expo, and offline-first SQLite.
- **Infrastructure**: Configure Kubernetes, Terraform IaC, Databricks Lakehouse, and AWS Serverless.

### 🧠 Advanced AI & Autonomous Workflows
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
- **Offensive & Defensive Security**: Audit against OWASP Top 10, run Strix automated pentests, and implement zero-trust architectures.
- **Compliance Automation**: Reference SOC2, GDPR, PCI DSS, and FedRAMP governance protocols.

---

## 📦 Curated Skill Ecosystem (Included Sources)

1. **[Ruflo Agent Meta-Harness](https://github.com/ruvnet/ruflo)**: Multi-player agent swarms, Queen coordination, Hive Mind consensus, Byzantine fault tolerance, CRDT synchronization, AgentDB neural memory, SPARC methodology, and Flow Nexus distributed execution.
2. **[Garry Tan's GStack](https://github.com/garrytan/gstack)**: CEO/Eng/Design plan reviews, QA automation, shipping, and incident investigation.
3. **[Agency Agents Framework](https://github.com/msitarzewski/agency-agents)**: Over 260+ specialized personas spanning Marketing, GIS, Healthcare, Game Development, Finance, Sales, and Strategy.
4. **[Addy Osmani's Agent Skills](https://github.com/addyosmani/agent-skills)**: Web performance, Core Web Vitals, API ergonomics, and architectural ADRs.
5. **[Strix AI Security](https://github.com/usestrix/strix)**: Vulnerability scanning, penetration testing, and security patch remediation.
6. **[UI/UX Pro Max & 21st.dev Magic UI](https://21st.dev)**: Component blocks, Tailwind CSS v4, bento grids, and visual aesthetics.
7. **Big Tech Architectures**: Google SRE / BigQuery / gRPC, Microsoft Azure / .NET 9, AWS Serverless, Meta React 19 / GraphQL, Netflix resilience.
8. **AI Agent Frameworks**: Anthropic MCP, LangGraph, CrewAI, AutoGen, LlamaIndex, and Long-Term Memory.

---

## 📑 Full 672-Skill Catalog

See the complete index in **[`SKILLS_INDEX.md`](SKILLS_INDEX.md)** with detailed descriptions and paths for all 672 skills organized across:

- 🌊 **Ruflo Agentic Swarms, Hive Mind & Multi-Agent Coordination**
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

<div align="center">

### **Go build something amazing! 🚀**

⭐ [Star this repo](https://github.com/aakash1552005/universal-agent-skills/stargazers) • 🍴 [Fork it](https://github.com/aakash1552005/universal-agent-skills/fork) • 🐛 [Report an issue](https://github.com/aakash1552005/universal-agent-skills/issues)

</div>
