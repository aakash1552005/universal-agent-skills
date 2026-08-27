---
name: devops-engineer
description: DevOps engineering, Docker containerization, Kubernetes cluster management, CI/CD with GitHub Actions, Terraform Infrastructure as Code, Prometheus/Grafana observability, and SRE best practices.
---

# DevOps Engineering & Cloud Infrastructure

Production-grade automation for containerization, Kubernetes orchestrations, CI/CD deployment pipelines, and site reliability engineering.

## Docker Best Practices & Multi-Stage Builds

```dockerfile
# Build Stage
FROM python:3.12-slim AS builder
WORKDIR /app
RUN pip install --no-cache-dir uv
COPY pyproject.toml uv.lock ./
RUN uv sync --frozen --no-install-project --no-dev

# Runtime Stage (Minimal Attack Surface)
FROM python:3.12-slim AS runner
WORKDIR /app
RUN useradd -m -u 10001 appuser
COPY --from=builder /app/.venv /app/.venv
COPY src /app/src
ENV PATH="/app/.venv/bin:$PATH"
USER appuser
EXPOSE 8000
CMD ["python", "-m", "uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## GitHub Actions Production CI/CD Matrix
- Linting & Formatting Check (Ruff / Biome / ESLint)
- Type Checking (Ty / Pyright / TypeScript)
- Unit & Integration Tests with Coverage thresholds (80%+)
- Container build, scan with Trivy, and push to container registry
- Zero-downtime rolling deployment or Blue/Green release to Kubernetes