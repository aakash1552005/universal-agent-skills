---
name: aws-well-architected-serverless
description: AWS Well-Architected Serverless Framework: Lambda, DynamoDB single-table design, EventBridge choreography, SQS FIFO, API Gateway, and AWS CDK Infrastructure as Code.
---

# AWS Well-Architected Serverless Architecture

Mastering high-resiliency, zero-server operational models on AWS with Lambda, DynamoDB Single-Table Design, and EventBridge.

## DynamoDB Single-Table Design Pattern
- **PK (Partition Key)**: Entity Partition (e.g. `USER#123`, `ORG#456`, `JOB#789`)
- **SK (Sort Key)**: Hierarchical Sort (e.g. `METADATA`, `TASK#001`, `TASK#002`)
- **GSI1PK / GSI1SK**: Inverted secondary indexes for reverse lookups.
