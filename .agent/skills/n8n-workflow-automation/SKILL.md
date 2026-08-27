---
name: n8n-workflow-automation
description: Master n8n workflow automation: self-hosted scaling, Advanced AI Agent nodes, LangChain vector store integration, custom webhook triggers, sub-workflow execution, and error handling branches.
---

# n8n AI Workflow Automation Mastery

Engineering scalable, self-hosted, and cloud automation pipelines using n8n and n8n Advanced AI nodes.

## When to Use This Skill
- Designing visual and code-based automation pipelines connecting SaaS APIs, databases, and LLMs
- Building Autonomous AI Agents inside n8n with tool-calling, memory buffers, and vector stores
- Creating robust webhook handlers, scheduled cron triggers, and sub-workflow orchestrations
- Implementing dead-letter queues, error workflows, and credential management

## Architecture & Production Patterns

### 1. n8n AI Agent Node Architecture
- **Agent Node**: Select `Tools Agent` or `Conversational Agent` with OpenAI, Anthropic, or local Ollama LLMs.
- **Tools**: Bind Custom HTTP Request tools, Code execution tools (JavaScript/Python), and Database query tools.
- **Memory**: Connect `Window Buffer Memory` or `Redis Chat Memory` for multi-turn user continuity.
- **Vector Store**: Connect `Pinecone Vector Store` or `Qdrant Vector Store` for embedded retrieval.

### 2. Standard Error Handling Pattern (Sub-Workflow)
Always configure an **Error Trigger** workflow that receives error metadata (Node Name, Execution ID, Error Message) and dispatches alerts to Slack/PagerDuty:

```json
{
  "nodes": [
    {
      "parameters": {},
      "id": "error-trigger-1",
      "name": "Error Trigger",
      "type": "n8n-nodes-base.errorTrigger",
      "typeVersion": 1,
      "position": [250, 300]
    },
    {
      "parameters": {
        "channel": "#alerts-n8n",
        "text": "=🚨 Workflow Failed: {{ $json.workflow.name }}\nNode: {{ $json.execution.error.node.name }}\nMessage: {{ $json.execution.error.message }}\nExec URL: {{ $json.execution.url }}"
      },
      "id": "slack-alert-1",
      "name": "Slack Alert",
      "type": "n8n-nodes-base.slack",
      "typeVersion": 2,
      "position": [480, 300]
    }
  ]
}
```

### 3. n8n Best Practices
- **Never hardcode secrets**: Use n8n Credentials Manager and environment variables (`$env.VARIABLE_NAME`).
- **Batch Processing**: Use the `Split In Batches` node (batches of 50-100 items) to prevent memory exhaustion on large payload loops.
- **Sub-Workflows**: Modularize complex pipelines using the `Execute Workflow` node with `Wait for Sub-Workflow Completion`.
