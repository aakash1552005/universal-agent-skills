---
name: temporal-durable-execution
description: Temporal.io durable distributed workflow orchestration: stateful workflows, retry policies, activities, saga compensation transactions, and long-running AI agent processes.
---

# Temporal.io Durable Execution for AI Workflows

Architecting fault-tolerant, long-running agent workflows that survive node crashes, deployments, and days-long execution loops.

## Python Temporal Workflow & Activity Pattern

```python
from datetime import timedelta
from temporalio import activity, workflow
from temporalio.common import RetryPolicy

@activity.defn
async def execute_agent_task(task_prompt: str) -> str:
    # Run long computational or API task
    return f"Completed: {task_prompt}"

@workflow.defn
class AutonomousAnalysisWorkflow:
    @workflow.run
    async def run(self, dataset_name: str) -> str:
        # Step 1: Run Data Preparation Activity with Retry Policy
        retry_policy = RetryPolicy(
            initial_interval=timedelta(seconds=2),
            backoff_coefficient=2.0,
            maximum_attempts=5
        )
        
        result = await workflow.execute_activity(
            execute_agent_task,
            f"Analyze {dataset_name}",
            start_to_close_timeout=timedelta(minutes=5),
            retry_policy=retry_policy
        )
        
        # Workflow state is automatically persisted by Temporal server
        return result
```
