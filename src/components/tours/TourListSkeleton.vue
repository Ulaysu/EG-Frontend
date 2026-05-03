<template>
  <section class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" aria-label="Loading tours">
    <div
      v-for="placeholder in 6"
      :key="placeholder"
      class="rounded-2xl border border-amber-100 overflow-hidden animate-pulse bg-white"
    >
      <div class="h-52 bg-amber-100/60"></div>
      <div class="p-5 space-y-3">
        <div class="h-4 bg-amber-100 rounded w-2/3"></div>
        <div class="h-3 bg-slate-100 rounded w-full"></div>
        <div class="h-3 bg-slate-100 rounded w-5/6"></div>
        <div class="h-3 bg-amber-100 rounded w-1/2"></div>
      </div>
    </div>
  </section>
</template>