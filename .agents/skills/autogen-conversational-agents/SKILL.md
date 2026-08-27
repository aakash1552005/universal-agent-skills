---
name: autogen-conversational-agents
description: Microsoft AutoGen conversational multi-agent systems: GroupChatManager, AssistantAgent, UserProxyAgent with sandboxed code execution.
---

# Microsoft AutoGen Multi-Agent Systems

Conversational orchestration where autonomous agents collaborate, debate, write code, execute in sandboxes, and iterate until task completion.

## AutoGen GroupChat Pattern
```python
import autogen

config_list = [{"model": "gpt-4o", "api_key": "YOUR_KEY"}]

user_proxy = autogen.UserProxyAgent(
    name="User_Proxy",
    system_message="A human admin who approves final plans.",
    code_execution_config={"work_dir": "sandbox", "use_docker": False},
    human_input_mode="NEVER"
)

coder = autogen.AssistantAgent(
    name="Python_Engineer",
    llm_config={"config_list": config_list},
    system_message="You write clean, executable Python scripts to solve data analytics problems."
)

groupchat = autogen.GroupChat(agents=[user_proxy, coder], messages=[], max_round=10)
manager = autogen.GroupChatManager(groupchat=groupchat, llm_config={"config_list": config_list})
```
