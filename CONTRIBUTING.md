# Contributing to Universal AI Agent Skills

Thank you for your interest in contributing to the **Universal AI Agent Skills Library**! Our goal is to maintain the world's most comprehensive, production-grade library of AI agent skills across all engineering, data, AI, design, and business domains.

---

## 🛠️ How to Add a New Skill

1. **Create a Skill Directory**:
   Inside `.agents/skills/<skill-name>/` create a `SKILL.md` file.

2. **Format YAML Frontmatter**:
   Every `SKILL.md` MUST begin with valid YAML frontmatter:
   ```markdown
   ---
   name: your-skill-name
   description: 1-2 sentence description of when the AI agent should trigger and use this skill.
   ---
   ```

3. **Standard Structure**:
   - **`# Title`**: Clear domain title.
   - **`## When to Use This Skill`**: Bullet points for intent matching.
   - **`## Architectural Principles & Core Concepts`**: Deep technical standards, equations, or design patterns.
   - **`## Production Code Examples`**: Concrete, copy-pasteable, zero-placeholder code templates.
   - **`## Anti-Patterns to Avoid`**: Common pitfalls and their modern replacements.

4. **Mirror to `.agent/skills/`**:
   Copy your new skill folder to `.agent/skills/<skill-name>/` to ensure 100% backward and cross-tool compatibility.

5. **Submit a Pull Request**:
   - Branch name: `feat/add-<skill-name>`
   - Commit message: `feat: add <skill-name> skill`
   - Open a PR with a description of the domain and use cases.

---

## 📜 Code of Conduct

- Keep all skills actionable, direct, and free of generic AI fluff.
- Respect open-source licenses and cite original research/sources where applicable.
- Help fellow developers and builders succeed.

**Go build something!** 🚀
