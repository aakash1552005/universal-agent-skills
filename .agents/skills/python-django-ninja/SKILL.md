---
name: python-django-ninja
description: High-performance Django and Django Ninja APIs: ORM query optimization, select_related/prefetch_related, Celery task distribution, and PostgreSQL connection management.
---

# Django & Django Ninja Enterprise Architecture

Expert patterns for building scalable enterprise web backends with Django and Django Ninja (FastAPI-style speed with Django ORM maturity).

## When to Use This Skill
- Enterprise applications requiring relational data models, admin interfaces, and rapid schema migrations
- High-speed typed APIs using Django Ninja (`NinjaAPI`, `Schema`)
- Eliminating N+1 database queries with `select_related` and `prefetch_related`
- Asynchronous task processing with Celery and Redis

## Query Optimization & Typed Schema Pattern

```python
from ninja import NinjaAPI, Schema
from typing import List
from django.shortcuts import get_object_or_404
from django.db.models import Prefetch
from .models import AnalysisProject, AgentTask

api = NinjaAPI(title="Analytics Platform API", version="1.0.0")

class TaskOut(Schema):
    id: int
    task_type: str
    status: str
    execution_time_ms: float

class ProjectDetailOut(Schema):
    id: int
    name: str
    created_at: str
    tasks: List[TaskOut]

@api.get("/projects/{project_id}", response=ProjectDetailOut)
def get_project_details(request, project_id: int):
    # Eliminate N+1 queries using prefetch_related with filtered queryset
    project = get_object_or_404(
        AnalysisProject.objects.prefetch_related(
            Prefetch('tasks', queryset=AgentTask.objects.filter(is_active=True))
        ),
        id=project_id
    )
    return project
```
