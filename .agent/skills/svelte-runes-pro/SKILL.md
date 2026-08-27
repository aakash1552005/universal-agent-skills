---
name: svelte-runes-pro
description: Svelte 5 with Runes reactivity ($state, $derived, $effect), SvelteKit full-stack architecture, form actions, server load functions, and optimized bundle footprints.
---

# Svelte 5 & SvelteKit Full-Stack Mastery

Mastering universal web applications with Svelte 5 Runes reactivity and SvelteKit server routes.

## Svelte 5 Runes Component Pattern
```svelte
<script lang="ts">
  let query = $state('');
  let rows = $state(10);
  let isValid = $derived(query.trim().length > 5);

  function handleSubmit() {
    console.log(`Executing ${query} on ${rows} rows`);
  }
</script>

<div class="p-6 bg-stone-900 text-white rounded-xl">
  <input bind:value={query} placeholder="Enter SQL query..." class="p-2 bg-stone-800 rounded w-full mb-4" />
  <button disabled={!isValid} onclick={handleSubmit} class="px-4 py-2 bg-indigo-600 rounded disabled:opacity-50">
    Run Analysis
  </button>
</div>
```
