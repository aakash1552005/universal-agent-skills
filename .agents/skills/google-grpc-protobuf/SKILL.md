---
name: google-grpc-protobuf
description: High-performance microservices communication using gRPC and Protocol Buffers v3: unary, client/server streaming, multiplexing, and schema evolution.
---

# gRPC & Protocol Buffers Architecture

Building ultra-low-latency, type-safe inter-service communication layers for distributed AI and data services.

## Proto3 Definition (`analytics_service.proto`)
```protobuf
syntax = "proto3";

package analytics.v1;

service AnalyticsAgent {
  rpc ExecuteAnalysis (AnalysisRequest) returns (AnalysisResponse);
  rpc StreamInsights (AnalysisRequest) returns (stream InsightChunk);
}

message AnalysisRequest {
  string dataset_id = 1;
  string prompt = 2;
  map<string, string> parameters = 3;
}

message AnalysisResponse {
  string job_id = 1;
  string status = 2;
  double execution_time_seconds = 3;
}

message InsightChunk {
  string token = 1;
  bool is_final = 2;
}
```
