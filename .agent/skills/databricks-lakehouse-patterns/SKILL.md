---
name: databricks-lakehouse-patterns
description: Databricks Lakehouse architecture: Delta Lake ACID transactions, Unity Catalog data governance, PySpark optimization, MLflow model tracking, and Delta Live Tables (DLT).
---

# Databricks Lakehouse Enterprise Architecture

Designing modern Lakehouse architectures combining data lake storage with data warehouse reliability using Delta Lake and Unity Catalog.

## Medallion Architecture (Bronze -> Silver -> Gold)
1. **Bronze**: Raw ingest tables, schema-on-read, append-only history.
2. **Silver**: Cleaned, deduplicated, standardized schemas with data validation checks.
3. **Gold**: Business-level aggregates, star schema dimension models ready for PowerBI/Tableau.
