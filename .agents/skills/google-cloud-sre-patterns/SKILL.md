---
name: google-cloud-sre-patterns
description: Google Site Reliability Engineering (SRE) principles: SLI/SLO/SLA mathematical frameworks, error budget policies, OpenTelemetry distributed tracing, blameless postmortems, and chaos engineering.
---

# Google Site Reliability Engineering (SRE) Master Guide

Production standards derived from Google SRE engineering practices for mission-critical software reliability.

## 1. SLI / SLO Mathematical Calculations
- **SLI (Service Level Indicator)**: Measurable metric (e.g. `% of HTTP requests returning 2xx in < 200ms`).
- **SLO (Service Level Objective)**: Target reliability (e.g. `99.9% over a rolling 30-day window`).
- **Error Budget**: `100% - SLO` = `0.1% allowable failures` = `43.2 minutes downtime / month`.

## 2. Error Budget Policy & Release Gating
- If Error Budget Remaining > 20%: Routine feature deployments permitted.
- If Error Budget Burn Rate > 14.4x (1hr alert): Deployment freezes activated automatically; engineering shifts 100% focus to reliability bugs.

## 3. OpenTelemetry Distributed Tracing Setup (Python / Node.js)
```python
from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter

provider = TracerProvider()
processor = BatchSpanProcessor(OTLPSpanExporter(endpoint="tempo:4317", insecure=True))
provider.add_span_processor(processor)
trace.set_tracer_provider(provider)

tracer = trace.get_tracer("autonomous.analyst")

with tracer.start_as_current_span("execute_sql_query") as span:
    span.set_attribute("db.system", "postgresql")
    span.set_attribute("query.rows_returned", 420)
```
