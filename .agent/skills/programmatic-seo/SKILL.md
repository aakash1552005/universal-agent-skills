---
name: programmatic-seo
description: Build high-scale programmatic SEO engines, dynamic directory architectures, database-driven landing pages, internal link graphs, and automated sitemaps.
---

# Programmatic SEO & Dynamic Page Architectures

Architectural guidelines for generating thousands of high-quality, non-duplicate, search-optimized dynamic pages with Next.js App Router, Astro, or static site generators.

## When to Use This Skill
- Creating template-driven programmatic pages (e.g. `[integration]-for-[use-case]`, `best-[tool]-alternatives`, `convert-[format]-to-[format]`)
- Generating dynamic XML sitemaps with `sitemap.ts` in Next.js
- Designing internal linking algorithms (hub-and-spoke topic clusters)
- Avoiding Google thin content and doorway page algorithmic penalties

## Architecture Checklist

### 1. Data-Rich Unique Content Templates
Every programmatic page must have **at least 60% unique, dataset-driven content** (not just keyword swaps).
- Unique data attributes: performance benchmarks, pricing tiers, API signatures, code snippets, compatibility charts.

### 2. Next.js 15 App Router Dynamic Sitemap Generation (`app/sitemap.ts`)
```typescript
import { MetadataRoute } from 'next';
import { getAllIntegrations } from '@/lib/data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://example.com';
  const integrations = await getAllIntegrations();

  const integrationUrls = integrations.map((item) => ({
    url: `${baseUrl}/integrations/${item.slug}`,
    lastModified: new Date(item.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...integrationUrls,
  ];
}
```

### 3. Hub-and-Spoke Internal Link Topology
- **Hub Page**: Main category index (`/integrations`) linking down to all child nodes.
- **Spoke Page**: Specific integration (`/integrations/postgresql-ai-analyst`) linking back to the parent hub AND 4 related sibling spokes.
