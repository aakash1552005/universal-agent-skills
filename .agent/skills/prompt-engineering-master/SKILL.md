---
name: prompt-engineering-master
description: Master advanced prompt engineering techniques, DSPy programmatic optimization, few-shot chain-of-thought, XML tag structuring, metaprompting, and automated evaluation.
---

# Prompt Engineering Mastery & DSPy Optimization

Best practices for prompting frontier models (Claude 3.7 / 3.5 Sonnet, GPT-4o, Gemini 1.5/2.0 Pro) with mathematical precision.

## Key Prompt Design Principles

### 1. XML Structured Prompting
Use unambiguous semantic XML tags to delimit context, instructions, examples, and constraints:
```markdown
<system_instructions>
You are an expert distributed systems engineer.
</system_instructions>

<context>
The database handles 50,000 writes/sec with PostgreSQL on AWS RDS.
</context>

<task>
Provide a partitioned schema and indexing strategy to reduce replication lag below 500ms.
</task>

<constraints>
- Use PostgreSQL 16 declarative partitioning.
- Do not introduce external message brokers unless strictly necessary.
</constraints>

<output_format>
Output valid SQL inside a fenced code block followed by an architectural trade-off table.
</output_format>
```

### 2. Few-Shot Chain-of-Thought (CoT)
Provide step-by-step reasoning demonstrations with high signal-to-noise ratio:
- Demonstrate edge-case handling.
- Explicitly annotate "Thinking Step" vs "Final Decision".

### 3. DSPy Programmatic Optimization
Instead of hand-tuning prompt strings, use DSPy to optimize signatures and few-shot exemplars with metrics:
```python
import dspy

class ExtractKPIs(dspy.Signature):
    """Extract numerical KPIs and dimensions from business text."""
    report_text = dspy.InputField(desc="Business report or financial excerpt")
    kpis = dspy.OutputField(desc="JSON list of extracted KPIs with name, value, unit, and period")

class KPIModule(dspy.Module):
    def __init__(self):
        super().__init__()
        self.prog = dspy.ChainOfThought(ExtractKPIs)
    def forward(self, report_text):
        return self.prog(report_text=report_text)
```