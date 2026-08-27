---
name: ai-agent-engineer
description: Architect, implement, and orchestrate autonomous AI agents using ReAct, Plan-and-Solve, LangGraph, Reflexion, multi-agent swarms, tool-use protocols, and agent evaluation loops.
---

# AI Agent Engineering & Multi-Agent Systems

Comprehensive guide for designing production-grade autonomous agent systems, cognitive architectures, tool routing, memory hierarchies, and error-recovery loops.

## Core Agent Architectures

### 1. ReAct (Reasoning + Acting) Cycle
1. **Observation**: Parse user intent and tool execution output.
2. **Thought**: Plan next sub-step, assess hypotheses, detect failures.
3. **Action**: Select tool and emit strictly validated JSON schema parameters.
4. **Execution**: Execute tool safely with timeout and retry guardrails.

### 2. State Graph Architecture (LangGraph / Async State Machines)
- **Nodes**: Discrete LLM reasoning steps or deterministic functions.
- **Edges**: Conditional routers based on state inspection (e.g., `is_complete`, `needs_clarification`, `retry_tool`).
- **Checkpointers**: Persistent state storage (PostgreSQL / Redis) for human-in-the-loop and resume capabilities.

```python
from typing import TypedDict, Annotated, Sequence
import operator
from langgraph.graph import StateGraph, END

class AgentState(TypedDict):
    messages: Annotated[Sequence[dict], operator.add]
    plan: list[str]
    current_step: int
    tool_outputs: dict
    is_finished: bool

def planner_node(state: AgentState):
    # Generates discrete, verified task steps
    return {"plan": ["fetch_data", "process_metrics", "generate_report"]}

def executor_node(state: AgentState):
    # Runs tool calling and verifies output
    return {"current_step": state["current_step"] + 1}

def should_continue(state: AgentState):
    if state["current_step"] >= len(state["plan"]):
        return END
    return "executor"
```

### 3. Agent Guardrails & Resilience
- **Max Iteration Limits**: Hard stop counter (e.g. max 25 turns) to prevent infinite loops.
- **Context Compaction**: Summarize older conversation turns when context window reaches 70% threshold.
- **Deterministic Validation**: Always parse tool inputs against Pydantic models before executing shell or database commands.