---
name: microsoft-semantic-kernel
description: Microsoft Semantic Kernel framework: AI plugins, native function calling, planners, vector memory connectors, and multi-model agent orchestration in C# and Python.
---

# Microsoft Semantic Kernel Agent Architecture

Building enterprise AI copilots and autonomous workflows with Semantic Kernel plugins and planners.

## Python Semantic Kernel Plugin Setup
```python
import semantic_kernel as sk
from semantic_kernel.connectors.ai.open_ai import AzureChatCompletion
from semantic_kernel.functions import kernel_function

kernel = sk.Kernel()

class DatabasePlugin:
    @kernel_function(description="Executes a sandboxed SQL query and returns JSON rows")
    def run_query(self, sql_query: str) -> str:
        return f"[Result for {sql_query}]"

kernel.add_plugin(DatabasePlugin(), plugin_name="Database")
```
