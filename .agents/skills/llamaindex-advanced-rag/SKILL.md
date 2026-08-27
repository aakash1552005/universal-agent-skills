---
name: llamaindex-advanced-rag
description: LlamaIndex production RAG: hierarchical node chunking, query routing, sub-question query engine, document metadata extractors, and cross-encoder reranking.
---

# LlamaIndex Advanced RAG Engineering

Building enterprise knowledge retrieval engines with multi-document summarization, sub-query decomposition, and semantic reranking.

## Sub-Question Query Engine Pattern
```python
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader
from llama_index.core.tools import QueryEngineTool, ToolMetadata
from llama_index.core.query_engine import SubQuestionQueryEngine

# Load documents
docs_2025 = SimpleDirectoryReader(input_files=["report_2025.pdf"]).load_data()
docs_2026 = SimpleDirectoryReader(input_files=["report_2026.pdf"]).load_data()

index_2025 = VectorStoreIndex.from_documents(docs_2025)
index_2026 = VectorStoreIndex.from_documents(docs_2026)

query_engine_tools = [
    QueryEngineTool(
        query_engine=index_2025.as_query_engine(),
        metadata=ToolMetadata(name="report_2025", description="Provides financial metrics for year 2025")
    ),
    QueryEngineTool(
        query_engine=index_2026.as_query_engine(),
        metadata=ToolMetadata(name="report_2026", description="Provides financial metrics for year 2026")
    )
]

# Decomposes multi-part questions (e.g. "Compare revenue growth between 2025 and 2026")
s_engine = SubQuestionQueryEngine.from_defaults(query_engine_tools=query_engine_tools)
response = s_engine.query("Compare revenue growth between 2025 and 2026")
```
