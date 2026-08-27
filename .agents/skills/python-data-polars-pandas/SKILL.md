---
name: python-data-polars-pandas
description: Ultra-fast tabular data processing using Polars lazy evaluation and vectorized Pandas 2.x with Apache Arrow backend.
---

# High-Performance Data Processing: Polars & Pandas 2.x

Guidelines for processing gigabyte-to-terabyte scale datasets using Polars multithreading and Arrow-backed Pandas 2.0.

## When to Use This Skill
- Fast exploratory data analysis (EDA) and feature engineering
- Replacing slow Pandas iteration (`iterrows`, `apply`) with vectorized expressions
- Memory-efficient streaming of large CSV/Parquet files with Polars LazyFrame

## Polars LazyFrame Optimization Pattern

```python
import polars as pl

def analyze_sales_data(file_path: str) -> pl.DataFrame:
    # Build lazy computation graph without reading entire file into memory
    query = (
        pl.scan_parquet(file_path)
        .filter(pl.col("transaction_date") >= pl.date(2025, 1, 1))
        .with_columns([
            (pl.col("revenue") - pl.col("cost")).alias("profit"),
            (pl.col("profit") / pl.col("revenue")).alias("profit_margin")
        ])
        .group_by(["region", "product_category"])
        .agg([
            pl.col("revenue").sum().alias("total_revenue"),
            pl.col("profit").sum().alias("total_profit"),
            pl.col("customer_id").n_unique().alias("unique_customers"),
            pl.col("profit_margin").mean().alias("avg_margin")
        ])
        .sort("total_profit", descending=True)
    )
    
    # Execute graph with streaming engine enabled
    return query.collect(streaming=True)
```
