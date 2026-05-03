<template>
  <div class="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-center shadow-sm">
    <h3 class="text-lg font-semibold text-slate-800">We couldn't load tours</h3>
    <p class="text-slate-600 mt-2">{{ errorMessage }}</p>
    <button
      class="mt-4 inline-flex items-center justify-center px-4 py-2 rounded-md bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:from-amber-600 hover:to-orange-700"
      @click="$emit('retry')"
    >
      Try Again
    </button>
  </div>
</template>

<script setup>
defineEmits(['retry'])

defineProps({
  errorMessage: {
    type: String,
    default: 'An unexpected error occurred.'
  }
})
</script>