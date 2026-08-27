---
name: rust-systems-engineering
description: Systems programming with Rust: ownership, lifetimes, Tokio async runtime, Axum web framework, serde JSON serialization, and memory-safe concurrency.
---

# Rust High-Performance Systems Architecture

Building memory-safe, zero-cost abstraction backend services and CLI tools with Rust and Tokio.

## Axum Web Service Template
```rust
use axum::{
    routing::{get, post},
    http::StatusCode,
    Json, Router,
};
use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
struct CreateJob {
    dataset_name: String,
}

#[derive(Serialize)]
struct JobCreated {
    id: String,
    status: String,
}

async fn create_job(Json(payload): Json<CreateJob>) -> (StatusCode, Json<JobCreated>) {
    let job = JobCreated {
        id: "job_99".to_string(),
        status: format!("Processing {}", payload.dataset_name),
    };
    (StatusCode::CREATED, Json(job))
}

#[tokio::main]
async fn main() {
    let app = Router::new()
        .route("/health", get(|| async { "OK" }))
        .route("/api/v1/jobs", post(create_job));

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
```
