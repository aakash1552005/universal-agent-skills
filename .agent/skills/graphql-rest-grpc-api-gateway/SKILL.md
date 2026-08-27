---
name: graphql-rest-grpc-api-gateway
description: Unified API Gateway architecture: Cloudflare Workers, Kong, Envoy, edge rate-limiting, CORS, SSL termination, and caching layers.
---

# Enterprise API Gateway & Edge Architecture

Designing unified API Gateways managing authentication, rate limiting, and request routing across REST, GraphQL, and gRPC backends.

## Cloudflare Workers Edge Gateway Template
```typescript
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    
    // Edge Rate Limiting via Cloudflare KV / RateLimiter
    const clientIP = request.headers.get('CF-Connecting-IP') || 'anonymous';
    const { success } = await env.RATE_LIMITER.limit({ key: clientIP });
    if (!success) {
      return new Response(JSON.stringify({ error: 'Too Many Requests' }), {
        status: 429,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Proxy to backend microservices
    return fetch(request);
  },
};
```
