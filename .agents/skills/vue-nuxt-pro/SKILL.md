---
name: vue-nuxt-pro
description: Modern Vue 3 and Nuxt 3: Composition API (<script setup>), Pinia state management, Nuxt SSR/SSG, Nitro server engine, and Tailwind CSS integration.
---

# Vue 3 & Nuxt 3 Enterprise Web Applications

Building fast, modular web applications with Vue 3 Composition API, TypeScript, and Nuxt 3 server-side rendering.

## Nuxt 3 Server Route & Vue Component Pattern
```vue
<script setup lang="ts">
const { data: analytics, pending } = await useFetch('/api/analytics/summary');
</script>

<template>
  <main class="min-h-screen bg-slate-950 text-white p-8">
    <h1 class="text-3xl font-bold mb-6">Executive Analytics Dashboard</h1>
    <div v-if="pending" class="text-slate-400">Loading insights...</div>
    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800">
        <span class="text-sm text-slate-400">Total Revenue</span>
        <p class="text-2xl font-bold text-emerald-400">{{ analytics.revenue }}</p>
      </div>
    </div>
  </main>
</template>
```
