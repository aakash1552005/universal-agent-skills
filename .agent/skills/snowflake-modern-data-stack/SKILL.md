---
name: snowflake-modern-data-stack
description: Snowflake enterprise data modeling: dynamic clustering keys, Dynamic Tables for declarative pipelines, Snowpark Python, Streams & Tasks (CDC), and Zero-Copy Cloning.
---

# Snowflake Enterprise Architecture & Snowpark

Architecting cloud data warehouses, real-time data transformations with Dynamic Tables, and Python Snowpark dataframe pipelines.

## Snowflake Dynamic Table Pattern (Declarative Transformation)
```sql
CREATE OR REPLACE DYNAMIC TABLE analytics.gold_monthly_customer_churn
TARGET_LAG = '1 hour'
WAREHOUSE = compute_wh
AS
SELECT 
    c.customer_id,
    c.country,
    COUNT(t.transaction_id) AS total_transactions,
    SUM(t.amount) AS total_spend,
    MAX(t.transaction_date) AS last_purchase_date,
    CASE 
        WHEN DATEDIFF('day', MAX(t.transaction_date), CURRENT_DATE()) > 60 THEN TRUE 
        ELSE FALSE 
    END AS is_churned
FROM analytics.silver_customers c
LEFT JOIN analytics.silver_transactions t ON c.customer_id = t.customer_id
GROUP BY c.customer_id, c.country;
```
