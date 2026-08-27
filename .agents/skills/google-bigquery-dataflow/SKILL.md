---
name: google-bigquery-dataflow
description: Google Cloud data analytics: BigQuery partitioning, clustering, BI Engine, dbt-bigquery, and Apache Beam / Cloud Dataflow streaming pipelines.
---

# Google BigQuery & Cloud Dataflow Architecture

Optimizing petabyte-scale data warehouse queries, streaming ingestion, and analytical pipelines on Google Cloud Platform.

## BigQuery SQL Cost & Speed Optimization Principles
1. **Partition by Date/Timestamp**: Restrict scans using `WHERE _PARTITIONDATE >= ...`
2. **Cluster by High-Cardinality Query Keys**: e.g., `CLUSTER BY customer_id, region`
3. **Avoid `SELECT *`**: BigQuery charges by columnar data read.

```sql
CREATE OR REPLACE TABLE `my_project.analytics.user_events`
PARTITION BY DATE(event_timestamp)
CLUSTER BY user_id, event_type
OPTIONS (
  description = "Partitioned and clustered user event telemetry"
) AS
SELECT * FROM `my_project.raw.events`;
```
