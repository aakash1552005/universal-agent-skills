---
name: universal-skill-dispatcher
description: Autonomous meta-skill and routing controller for the 671-skill Universal Agent Skills Library. Analyzes user intent, identifies the optimal skill domain, and selectively activates only the top relevant skills to maximize accuracy while minimizing context token overhead.
---

# Universal Skill Dispatcher (Autonomous Meta-Skill)

The **Universal Skill Dispatcher** is the central routing governor of the Universal AI Agent Skills Library. It prevents context bloat by dynamically analyzing developer requests and routing to the exact specialized skills required for the task.

## When to Activate
- When a user request spans multiple engineering disciplines (e.g., building a SaaS platform that requires Stripe billing, UI design, and database multi-tenancy).
- When you need to discover which specialized skills in `.agents/skills/` are best suited for an unfamiliar problem.
- When you want to minimize token consumption by selectively reading only the necessary `SKILL.md` playbooks instead of loading broad context.

## Skill Domain Routing Matrix

| If the User Request Involves... | Route To These Primary Skills |
|:---|:---|
| **Multi-Agent Swarms & Consensus** | `hive-mind`, `sparc-methodology`, `agent-byzantine-coordinator`, `agent-crdt-synchronizer` |
| **SaaS Subscriptions & Billing** | `saas-billing-and-stripe`, `auth-and-session-management`, `saas-multi-tenancy-architecture` |
| **Frontend UI/UX & Aesthetics** | `ui-ux-pro-max`, `design-style-glassmorphism`, `brutalist-skill`, `design-system` |
| **Security Auditing & Pentesting** | `owasp-top-10-testing`, `security-and-hardening`, `security-penetration-tester`, `semgrep` |
| **LLM Agents, MCP & RAG Pipelines** | `langgraph-agent-workflows`, `mcp-server-and-client-builder`, `embeddings` |
| **Data Pipelines & Analytics** | `database-optimizer`, `data-data-engineer`, `dbt-data-transformations`, `polars-high-performance-data` |
| **Code Review & Executive QA** | `gstack-plan-ceo-review`, `gstack-plan-eng-review`, `code-review-skill`, `doubt-driven-development` |
| **Digital Marketing & Growth** | `content-marketer`, `seo`, `programmatic-seo`, `marketing-tiktok-strategist` |

## Execution Protocol

1. **Analyze Intent**:
   - Determine core output goal: Is it an MVP, a bug fix, an architectural plan, a security audit, or an automation workflow?
2. **Consult `.agents/skills/` Directory**:
   - Locate the 1 to 3 target skill directories that match the domain.
3. **Execute Under Target Framework**:
   - Read the target `SKILL.md` instructions and strictly enforce their architectural constraints, anti-patterns, and decision matrices.
4. **Deliver Structured Output**:
   - Conclude work with clear verification steps and production-ready code templates.
