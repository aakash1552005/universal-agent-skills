---
name: python-asyncio-concurrency
description: High-performance Python concurrency: asyncio event loops, TaskGroups (Python 3.11+), worker pools, rate limiters, semaphores, and graceful backpressure handling.
---

# Python AsyncIO & Concurrency Engineering

Architecting non-blocking, concurrent workflows for web scrapers, data pipelines, multi-agent tool execution, and stream processing.

## Key Patterns:

### 1. Python 3.11+ `asyncio.TaskGroup` for Structured Concurrency
```python
import asyncio
from typing import List, Dict, Any

async def fetch_data_source(source_id: str) -> Dict[str, Any]:
    await asyncio.sleep(0.5)
    return {"source": source_id, "status": "ok"}

async def run_parallel_analytics() -> List[Dict[str, Any]]:
    sources = ["postgres_db", "snowflake_dw", "s3_lake", "api_metrics"]
    results = []
    
    # TaskGroup guarantees all subtasks are cancelled if any task raises an exception
    async with asyncio.TaskGroup() as tg:
        tasks = [tg.create_task(fetch_data_source(s)) for s in sources]
        
    for task in tasks:
        results.append(task.result())
        
    return results
```

### 2. Concurrency Throttling with `asyncio.Semaphore`
```python
sem = asyncio.Semaphore(10)  # Max 10 concurrent requests to external LLM API

async def call_llm_with_rate_limit(prompt: str) -> str:
    async with sem:
        return await client.generate(prompt)
```
