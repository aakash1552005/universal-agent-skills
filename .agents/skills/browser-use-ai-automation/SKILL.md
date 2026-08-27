---
name: browser-use-ai-automation
description: Autonomous browser automation with Browser-Use and Playwright: LLM vision navigation, dynamic DOM interaction, form filling, captcha bypass, and web data extraction.
---

# Autonomous Browser-Use Automation

Building autonomous vision-guided web agents that navigate dynamic web applications, complete multi-step forms, and extract structured data.

## Python Browser-Use Agent Pattern

```python
import asyncio
from browser_use import Agent
from langchain_openai import ChatOpenAI

async def run_web_automation(task_description: str):
    # Initialize LLM with vision capabilities
    llm = ChatOpenAI(model="gpt-4o", temperature=0.0)
    
    agent = Agent(
        task=task_description,
        llm=llm,
        use_vision=True,
    )
    
    history = await agent.run(max_steps=25)
    print("Final Result:", history.final_result())

if __name__ == "__main__":
    asyncio.run(run_web_automation("Navigate to GitHub trending, extract top 5 repositories and their stars."))
```
