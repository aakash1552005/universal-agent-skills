---
name: seo-technical-and-onpage
description: Master technical and on-page SEO, Core Web Vitals optimization, JSON-LD structured data schemas, semantic HTML hierarchy, canonicals, internationalization, and crawl budget management.
---

# Technical & On-Page SEO Mastery

Comprehensive guide for building high-ranking, technically flawless web applications optimized for search engine crawlers (Googlebot, Bingbot).

## When to Use This Skill
- Building or auditing marketing pages, blogs, ecommerce stores, or SaaS landing pages
- Implementing JSON-LD structured schema markup (Organization, Product, Article, FAQ, SoftwareApplication)
- Optimizing Core Web Vitals (LCP, INP, CLS) and page speed metrics
- Configuring dynamic metadata, Open Graph (OG) tags, Twitter cards, and canonical tags
- Setting up robots.txt, XML sitemaps, hreflang tags for multi-language sites

## Core Pillars of Technical SEO

### 1. Semantic Document Structure
- Strict single `<h1>` per page reflecting the primary search intent.
- Logical `<h2>`, `<h3>` hierarchy without skipping heading levels.
- Accessible images with descriptive `alt` tags and explicit `width`/`height` attributes to eliminate Cumulative Layout Shift (CLS).

### 2. JSON-LD Structured Data Template
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Autonomous Data Analyst",
  "operatingSystem": "All",
  "applicationCategory": "BusinessApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "ratingCount": "1250"
  },
  "description": "Enterprise-grade autonomous AI data analyst that discovers insights, generates visualizations, and builds predictive models."
}
</script>
```

### 3. Core Web Vitals (CWV) Targets
| Metric | Good Target | Optimization Strategy |
|---|---|---|
| **LCP** (Largest Contentful Paint) | < 2.5s | Preload hero image, server-side render critical text, use CDN edge caching |
| **INP** (Interaction to Next Paint) | < 200ms | Yield main thread, debounce input handlers, avoid long JavaScript tasks |
| **CLS** (Cumulative Layout Shift) | < 0.1 | Reserve aspect-ratio boxes for media/ads, preload custom fonts with `font-display: swap` |

### 4. Dynamic Open Graph & Social Metadata (Next.js / HTML)
```typescript
export const metadata: Metadata = {
  title: 'Autonomous Data Analyst | Enterprise AI Analytics',
  description: 'Automate data analysis, business intelligence, and SQL transformations with autonomous AI agents.',
  alternates: {
    canonical: 'https://example.com/data-analyst',
  },
  openGraph: {
    title: 'Autonomous Data Analyst | Enterprise AI Analytics',
    description: 'Automate data analysis with autonomous AI agents.',
    url: 'https://example.com/data-analyst',
    siteName: 'Analytics AI',
    images: [
      {
        url: 'https://example.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Autonomous Data Analyst Interface',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Autonomous Data Analyst',
    description: 'Automate data analysis with autonomous AI agents.',
    images: ['https://example.com/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
```
