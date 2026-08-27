---
name: mcp-server-and-client-builder
description: Build Model Context Protocol (MCP) servers and clients using TypeScript and Python SDKs: tools, resources, prompts, stdio/SSE transports, and secure sandboxing.
---

# Model Context Protocol (MCP) Architecture & Implementation

Standardized framework for connecting LLMs to external tools, databases, and filesystem resources using the Anthropic MCP specification.

## FastMCP Python Server Example
```python
from mcp.server.fastmcp import FastMCP
import subprocess

mcp = FastMCP("Data Analyst Engine")

@mcp.tool()
def execute_sql(query: str) -> str:
    """Execute a read-only SQL query against the analytics database."""
    # Validate read-only query
    if any(keyword in query.upper() for keyword in ["DROP", "DELETE", "UPDATE", "INSERT"]):
        return "Error: Read-only queries permitted."
    return f"Rows returned for query: {query}"

@mcp.resource("schema://tables")
def get_database_schema() -> str:
    """Return the full relational schema of all analytical tables."""
    return "TABLE sales (id INT, amount DECIMAL, region TEXT);"

if __name__ == "__main__":
    mcp.run()
```
