---
name: tailwind-v4-modern-css
description: Modern CSS & Tailwind CSS v4: native @theme design tokens, CSS container queries, CSS subgrid, fluid typography, dark mode strategies, and hardware acceleration.
---

# Modern CSS & Tailwind CSS v4

Engineering sleek, high-performance interfaces using modern CSS features and Tailwind CSS v4 CSS-first configuration.

## Tailwind v4 CSS Configuration (`app.css`)
```css
@import "tailwindcss";

@theme {
  --color-brand-primary: oklch(0.65 0.24 265);
  --color-brand-accent: oklch(0.75 0.18 150);
  --font-display: "Outfit", sans-serif;
  --font-body: "Inter", sans-serif;
}

@layer utilities {
  .glass-card {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }
}
```
