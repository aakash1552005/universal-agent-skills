---
name: netflix-uber-microservices-resilience
description: Netflix & Uber distributed systems resilience: Circuit Breakers (Resilience4j), Bulkheads, distributed rate-limiting with Redis, Kafka event streaming, and Chaos Engineering.
---

# Netflix & Uber Microservices Resilience Patterns

Designing fault-tolerant distributed systems that survive cascading failures, network partitions, and traffic spikes.

## Key Distributed Resilience Patterns:
1. **Circuit Breaker**: Trips when error rate exceeds threshold (e.g. 50% over 10s window), instantly returning fallback responses without overloading upstream services.
2. **Bulkhead Isolation**: Isolates thread pools and connection pools so failures in one downstream dependency cannot exhaust total system resources.
3. **Kafka Event Sourcing**: Asynchronous event streams decoupling producer throughput from consumer processing speed.
