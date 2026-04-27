<template>
  <section class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" aria-label="Loading tours">
    <div
      v-for="placeholder in 6"
      :key="placeholder"
      class="rounded-xl border border-slate-200 overflow-hidden animate-pulse"
    >
      <div class="h-48 bg-slate-200"></div>
      <div class="p-5 space-y-3">
        <div class="h-4 bg-slate-200 rounded w-2/3"></div>
        <div class="h-3 bg-slate-200 rounded w-full"></div>
        <div class="h-3 bg-slate-200 rounded w-5/6"></div>
        <div class="h-3 bg-slate-200 rounded w-1/2"></div>
      </div>
    </div>
  </section>
</template>