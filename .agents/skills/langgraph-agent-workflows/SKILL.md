---
name: langgraph-agent-workflows
description: LangGraph multi-agent graph workflows: cyclical state machines, human-in-the-loop checkpoints, conditional branch routing, and durable memory persistence.
---

# LangGraph Stateful Multi-Agent Architecture

Designing cyclic graph workflows for complex reasoning, self-reflection, and human-in-the-loop approval gates.

## LangGraph StateGraph Pattern
```python
from typing import TypedDict, Annotated, Sequence
import operator
from langgraph.graph import StateGraph, END
from langchain_core.messages import BaseMessage

class AgentState(TypedDict):
    messages: Annotated[Sequence[BaseMessage], operator.add]
    sql_query: str
    error_count: int
    is_verified: bool

def generate_sql_node(state: AgentState):
    # Generates SQL based on prompt
    return {"sql_query": "SELECT * FROM sales LIMIT 10;", "error_count": 0}

def validate_sql_node(state: AgentState):
    # Runs query in sandbox to check for syntax errors
    has_error = False
    if has_error:
        return {"error_count": state["error_count"] + 1, "is_verified": False}
    return {"is_verified": True}

def should_retry(state: AgentState):
    if state["is_verified"]:
        return "generate_visualization"
    if state["error_count"] > 3:
        return END
    return "generate_sql"

workflow = StateGraph(AgentState)
workflow.add_node("generate_sql", generate_sql_node)
workflow.add_node("validate_sql", validate_sql_node)

workflow.set_entry_point("generate_sql")
workflow.add_edge("generate_sql", "validate_sql")
workflow.add_conditional_edges("validate_sql", should_retry, {
    "generate_sql": "generate_sql",
    "generate_visualization": END,
    END: END
})
app = workflow.compile()
```
