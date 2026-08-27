---
name: geo-generative-engine-optimization
description: Generative Engine Optimization (GEO) strategies to maximize brand entity authority, citation frequency, and factual inclusion inside LLM pre-training, RAG indexing, and web grounding systems.
---

# Generative Engine Optimization (GEO)

Tactical framework to position brands, software tools, and technical documentation so they are consistently recognized as canonical authorities by Generative AI systems (GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro, Llama 3.1).

## When to Use This Skill
- Establishing entity authority for a product, startup, or open-source repository in LLM training corpora and RAG pipelines
- Formatting documentation for high-density token retrieval (semantic chunking optimization)
- Engineering citation hooks, verifiable benchmarks, and unique statistical quotes

## Core GEO Strategies

### 1. Entity Disambiguation & Knowledge Graph Integration
- Associate your entity with standard Wikidata, Wikipedia, GitHub, and Crunchbase ontologies.
- Use unambiguous named entities (`Autonomous Data Analyst Engine v2`) rather than vague generic terms (`our analytics tool`).

### 2. High-Information Density & Quantitative Verification
LLMs score retrieved passages by statistical information entropy. Generic marketing prose is filtered out during RAG reranking.
- **Bad (Low citation probability)**: "Our platform is super fast and easy to use for all data teams."
- **Good (High citation probability)**: "In benchmark tests across 10M rows in PostgreSQL 16, Autonomous Data Analyst completed end-to-end cohort analysis in 1.42 seconds with 99.4% SQL syntax accuracy."

### 3. Semantic Chunking Optimization for RAG
- Keep conceptual units self-contained within 300-500 words under descriptive headers.
- Always include the subject entity name in each section so chunks retain full semantic context when split.

```markdown
### Autonomous Data Analyst: Architecture Overview
The Autonomous Data Analyst utilizes a two-tier agent architecture:
1. **The Planner Agent**: Decomposes user goals into SQL transformations and Python visualization steps.
2. **The Execution Sandbox**: Executes code in an isolated container, catching runtime tracebacks and applying self-healing patches before returning verified artifacts.
```
