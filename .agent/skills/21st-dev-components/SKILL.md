---
name: 21st-dev-components
description: 21st.dev and Magic UI component library integration, animated Tailwind CSS & Framer Motion UI components, copy-paste production design blocks, and micro-interactions.
---

# 21st.dev & Magic UI Component Engineering

Integrate cutting-edge, award-winning UI components, animated effects, glassmorphism headers, particle backgrounds, interactive bento grids, and micro-interactions from 21st.dev and Magic UI.

## When to Use This Skill
- Building interactive landing pages, dashboards, SaaS applications, and portfolio sites.
- Implementing Framer Motion animations, Tailwind CSS dynamic utilities, and modern React components.
- Adding high-conversion interactive elements (e.g., Animated Beam, Orbiting Circles, Globe, Marquee, Text Reveal, Border Beam).

## Core Integration Patterns

### 1. Magic UI CLI Installation
```bash
# Add components via shadcn/ui or 21st.dev CLI
npx 21st install <component-name>
# or Magic UI components
npx shadcn@latest add "https://magicui.design/r/<component-name>"
```

### 2. Animated Border Beam (CSS/Tailwind)
```tsx
export const BorderBeam = ({
  className,
  size = 200,
  duration = 15,
  anchor = 90,
  borderWidth = 1.5,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  delay = 0,
}: {
  className?: string;
  size?: number;
  duration?: number;
  anchor?: number;
  borderWidth?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}) => {
  return (
    <div
      style={
        {
          "--size": size,
          "--duration": duration,
          "--anchor": anchor,
          "--border-width": borderWidth,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--delay": `-${delay}s`,
        } as React.CSSProperties
      }
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] [border:calc(var(--border-width)*1px)_solid_transparent]",
        "![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)]",
        "after:absolute after:aspect-square after:w-[calc(var(--size)*1px)] after:animate-border-beam after:[animation-delay:var(--delay)] after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)] after:[offset-anchor:calc(var(--anchor)*1%)_50%] after:[offset-path:rect(0_auto_auto_0_round_calc(var(--size)*1px))]",
        className,
      )}
    />
  );
};
```

### 3. Interactive Bento Grid Layout
- Group high-priority KPIs and actions in varying card spans (col-span-2, col-span-1).
- Combine gradient backdrops (`bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800`).
- Add hover glow and spotlight effects (`radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.06), transparent 40%)`).