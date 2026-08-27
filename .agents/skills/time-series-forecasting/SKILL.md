---
name: time-series-forecasting
description: Production time series forecasting and anomaly detection: Prophet, Temporal Fusion Transformers (TFT), Statsmodels ARIMA, Polars rolling windows, and backtesting metrics (MAPE/WAPE).
---

# Production Time Series Forecasting & Anomaly Detection

Statistical and deep learning methodologies for sales forecasting, demand planning, metrics anomaly detection, and rolling backtests.

## Polars Rolling Anomaly Detection Pattern
```python
import polars as pl

def detect_metric_anomalies(df: pl.DataFrame, value_col: str, window_size: int = 7) -> pl.DataFrame:
    return (
        df.with_columns([
            pl.col(value_col).rolling_mean(window_size=window_size).alias("rolling_mean"),
            pl.col(value_col).rolling_std(window_size=window_size).alias("rolling_std")
        ])
        .with_columns([
            ((pl.col(value_col) - pl.col("rolling_mean")) / (pl.col("rolling_std") + 1e-6)).alias("z_score")
        ])
        .with_columns([
            (pl.col("z_score").abs() > 3.0).alias("is_anomaly")
        ])
    )
```
