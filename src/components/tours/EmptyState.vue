<template>
  <div class="rounded-2xl border border-amber-100 bg-gradient-to-br from-amber-50 to-orange-50 p-8 text-center shadow-sm">
    <h3 class="text-lg font-semibold text-slate-800">{{ title }}</h3>
    <p class="text-slate-600 mt-2">{{ message }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'No tours available yet'
  },
  message: {
    type: String,
    default: 'Please check back soon for new experiences across The Gambia.'
  }
})
</script>