---
name: google-cloud-workflows-and-vertex
description: Google Cloud Workflows and Vertex AI Agent Builder: orchestrating serverless microservices, Cloud Tasks, Reasoning Engines, Gemini model integration, and event-driven automation.
---

# Google Cloud Workflows & Vertex AI Automation

Orchestrating serverless microservices, Google Cloud Tasks, Vertex AI Reasoning Engines, and event-driven pipelines.

## When to Use This Skill
- Orchestrating multi-step Google Cloud services (Cloud Run, Cloud Functions, BigQuery, Pub/Sub)
- Building serverless, low-cost workflow pipelines defined in YAML
- Integrating Vertex AI Agent Builder and Gemini 1.5 Pro reasoning flows with Enterprise Google Workspace / AppSheet

## Google Cloud Workflows YAML Template (`analytics_workflow.yaml`)

```yaml
main:
  params: [args]
  steps:
    - init:
        assign:
          - datasetId: ${args.datasetId}
          - prompt: ${args.prompt}
    
    # Step 1: Trigger BigQuery Analytics Query
    - runBigQueryJob:
        call: googleapis.bigquery.v2.jobs.insert
        args:
          projectId: ${sys.get_env("GOOGLE_CLOUD_PROJECT_ID")}
          body:
            configuration:
              query:
                query: ${"SELECT * FROM `" + sys.get_env("GOOGLE_CLOUD_PROJECT_ID") + ".analytics." + datasetId + "` LIMIT 100"}
                useLegacySql: false
        result: bqResult

    # Step 2: Pass BigQuery Results to Vertex AI Gemini Model
    - callGeminiModel:
        call: http.post
        args:
          url: ${"https://" + sys.get_env("GOOGLE_CLOUD_LOCATION") + "-aiplatform.googleapis.com/v1/projects/" + sys.get_env("GOOGLE_CLOUD_PROJECT_ID") + "/locations/" + sys.get_env("GOOGLE_CLOUD_LOCATION") + "/publishers/google/models/gemini-1.5-pro:generateContent"}
          auth:
            type: OAuth2
          body:
            contents:
              - role: "user"
                parts:
                  - text: ${"Analyze this data and provide executive insights: " + json.encode_to_string(bqResult.data)}
        result: geminiResponse

    # Step 3: Return Final Report
    - returnOutput:
        return: ${geminiResponse.body.candidates[0].content.parts[0].text}
```
