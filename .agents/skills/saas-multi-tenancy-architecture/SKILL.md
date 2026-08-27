---
name: saas-multi-tenancy-architecture
description: Multi-tenant SaaS architectures: PostgreSQL Row-Level Security (RLS), schema-per-tenant isolation, subdomain tenant routing, and cross-tenant data leak prevention.
---

# Multi-Tenant SaaS Architecture & Data Isolation

Designing secure multi-tenant B2B architectures preventing cross-tenant data leaks using PostgreSQL Row-Level Security (RLS).

## PostgreSQL Row-Level Security (RLS) Pattern

```sql
-- 1. Enable RLS on analytical tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE analyses ENABLE ROW LEVEL SECURITY;

-- 2. Create Tenant Isolation Policy
CREATE POLICY tenant_isolation_policy ON projects
    FOR ALL
    USING (organization_id = NULLIF(current_setting('app.current_org_id', true), '')::uuid);

-- 3. Application sets session variable per request
-- In API middleware before executing tenant queries:
-- SET LOCAL app.current_org_id = 'org_uuid_here';
```
