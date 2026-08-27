---
name: crewai-multi-agent-collaboration
description: Role-playing multi-agent systems with CrewAI: specialized agents, hierarchical manager delegation, task dependencies, tool bindings, and shared memory.
---

# CrewAI Multi-Agent Swarm Orchestration

Architecting collaborative AI crews where specialized agents assume distinct roles (Researcher, Data Engineer, Technical Writer) to execute end-to-end projects.

## Crew Definition Pattern
```python
from crewai import Agent, Task, Crew, Process

# 1. Define Specialized Agents
data_engineer = Agent(
    role="Lead Data Engineer",
    goal="Extract, clean, and run exploratory statistics on datasets",
    backstory="You are an expert in SQL, Polars, and database schema analysis.",
    verbose=True
)

business_analyst = Agent(
    role="Principal Business Intelligence Analyst",
    goal="Extract executive strategic insights from quantitative metrics",
    backstory="You translate complex numbers into actionable ROI recommendations.",
    verbose=True
)

# 2. Define Sequential Tasks
task1 = Task(
    description="Analyze dataset 'q4_revenue.csv' and identify anomalous drops.",
    expected_output="A quantitative statistical summary table.",
    agent=data_engineer
)

task2 = Task(
    description="Write an executive briefing explaining the anomalies found in task1.",
    expected_output="A structured 3-paragraph executive memo.",
    agent=business_analyst
)

# 3. Assemble and Run Crew
crew = Crew(
    agents=[data_engineer, business_analyst],
    tasks=[task1, task2],
    process=Process.sequential
)
result = crew.kickoff()
```
