---
name: system-architecture-designer
description: High-level system architecture, distributed systems design, Domain-Driven Design (DDD), event-driven architectures (Kafka/RabbitMQ), multi-tier caching (Redis), and scalability patterns.
---

# System Architecture & Distributed Systems Design

Architect resilient, high-throughput, fault-tolerant software architectures ready for massive scale.

## Core Architectural Patterns

### 1. CQRS (Command Query Responsibility Segregation) & Event Sourcing
- **Write Path**: Optimized for transactional integrity and business validation (PostgreSQL). Emits domain events to Kafka.
- **Read Path**: Denormalized, ultra-fast read models (Elasticsearch / ClickHouse / Redis) updated asynchronously.

### 2. High-Availability Caching Strategy
- **Layer 1: Local In-Memory Cache** (LRU, TTL 10-60s) for hot invariant configuration.
- **Layer 2: Distributed Redis Cluster** (Write-through or Cache-Aside with jitter to prevent stampedes).
- **Layer 3: Primary Database** with Read Replicas and Connection Pooling (PgBouncer).

### 3. Distributed Fault Tolerance
- **Circuit Breakers**: Trip after N consecutive failures; fail fast without exhausting backend thread pools.
- **Idempotency Keys**: Header-based `X-Idempotency-Key` stored in Redis with atomic SETNX to prevent duplicate operations.