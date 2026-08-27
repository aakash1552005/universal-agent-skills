---
name: python-fastapi-pro
description: Production FastAPI backend architectures: Pydantic v2 schemas, async lifespan handlers, dependency injection, background tasks, JWT auth, and OpenAPI customization.
---

# Production FastAPI Engineering

Comprehensive patterns for building resilient, high-throughput REST APIs and microservices using FastAPI, Pydantic v2, and AsyncIO.

## When to Use This Skill
- Building modern Python microservices or AI model serving endpoints
- Structuring scalable API architectures with modular routers (`APIRouter`)
- Implementing type-safe request/response validation with Pydantic v2
- Managing database sessions, authentication, and background worker queues

## Production Code Pattern

```python
from contextlib import asynccontextmanager
from typing import AsyncGenerator
from fastapi import FastAPI, Depends, HTTPException, status, BackgroundTasks
from pydantic import BaseModel, Field, ConfigDict
import asyncpg

class AnalysisRequest(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)
    dataset_name: str = Field(..., min_length=3, max_length=100, examples=["sales_2026.csv"])
    query_goal: str = Field(..., min_length=10, examples=["Find top 5 churn risk customer segments"])

class AnalysisResponse(BaseModel):
    job_id: str
    status: str
    estimated_duration_seconds: float

# Lifespan Context Manager (Modern Startup/Shutdown)
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize connection pool
    app.state.pool = await asyncpg.create_pool(
        dsn="postgresql://user:pass@localhost:5432/analytics",
        min_size=10,
        max_size=50
    )
    yield
    # Graceful shutdown
    await app.state.pool.close()

app = FastAPI(
    title="Autonomous Data Analyst API",
    version="2.0.0",
    lifespan=lifespan
)

# Dependency Injection for DB Pool
async def get_db() -> AsyncGenerator[asyncpg.Connection, None]:
    async with app.state.pool.acquire() as conn:
        yield conn

@app.post(
    "/api/v1/analyze",
    response_model=AnalysisResponse,
    status_code=status.HTTP_202_ACCEPTED,
    summary="Submit an autonomous analysis job"
)
async def submit_analysis(
    payload: AnalysisRequest,
    background_tasks: BackgroundTasks,
    db: asyncpg.Connection = Depends(get_db)
):
    job_id = "job_" + os.urandom(8).hex()
    # Schedule background worker
    background_tasks.add_task(run_agent_pipeline, job_id, payload.dataset_name, payload.query_goal)
    return AnalysisResponse(
        job_id=job_id,
        status="QUEUED",
        estimated_duration_seconds=12.5
    )
```
