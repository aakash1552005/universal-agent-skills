---
name: golang-backend-pro
description: Production Go (Golang) 1.23+ backends: goroutines, channels, Gin/Chi HTTP routers, GORM/sqlx database operations, structured slog logging, and high-concurrency microservices.
---

# Idiomatic Go 1.23+ Backend Engineering

Building high-throughput, low-latency microservices with Go standard library, Chi router, and structured logging.

## Production Chi Router with Structured Slog Logging
```go
package main

import (
	"context"
	"encoding/json"
	"log/slog"
	"net/http"
	"os"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

type AnalysisTask struct {
	ID        string    `json:"id"`
	Status    string    `json:"status"`
	CreatedAt time.Time `json:"created_at"`
}

func main() {
	logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))
	r := chi.NewRouter()

	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Recoverer)
	r.Use(middleware.Timeout(30 * time.Second))

	r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`{"status":"ok"}`))
	})

	r.Post("/api/v1/analyze", func(w http.ResponseWriter, r *http.Request) {
		task := AnalysisTask{
			ID:        "task_12345",
			Status:    "PENDING",
			CreatedAt: time.Now(),
		}
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusAccepted)
		json.NewEncoder(w).Encode(task)
	})

	logger.Info("Starting server on :8080")
	http.ListenAndServe(":8080", r)
}
```
