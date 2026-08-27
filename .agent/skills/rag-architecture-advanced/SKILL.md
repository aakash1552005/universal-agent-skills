---
name: rag-architecture-advanced
description: Advanced Retrieval-Augmented Generation (RAG) architecture, hybrid search (dense + sparse BM25), semantic chunking, cross-encoder reranking, HyDE, GraphRAG, and RAGAS evaluation.
---

# Advanced RAG Architecture & Production Pipelines

Design and implement production-scale Retrieval-Augmented Generation systems with sub-second latency and high retrieval accuracy.

## Retrieval Pipeline Architecture

```
User Query
    │
    ├─► Query Expansion / HyDE (Hypothetical Document Embeddings)
    │
    ▼
Hybrid Retrieval:
  ├── 1. Dense Semantic Vector Search (Cosine / HNSW in Qdrant/pgvector)
  └── 2. Sparse Lexical Search (BM25 / SPLADE)
    │
    ▼
Reciprocal Rank Fusion (RRF) / Score Normalization
    │
    ▼
Cross-Encoder Reranking (Cohere Rerank / BGE-Reranker-Large) [Top 50 -> Top 5]
    │
    ▼
Context Compression / Lost-in-the-Middle Reordering
    │
    ▼
LLM Generation with Strict Citation Grounding
```

## Production Guidelines
1. **Chunking Strategy**: Never use fixed-size character chunking blindly. Use semantic sentence chunking with 15-20% overlap.
2. **Metadata Filtering**: Attach tenant ID, document version, timestamps, and access-control tags to every chunk payload.
3. **RAG Triad Evaluation**:
   - **Context Relevance**: Are retrieved chunks relevant to query?
   - **Groundedness / Faithfulness**: Is answer derived exclusively from context?
   - **Answer Relevance**: Does response address the user's explicit question?