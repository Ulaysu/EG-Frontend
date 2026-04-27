<template>
  <div class="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
    <h3 class="text-lg font-semibold text-red-800">We couldn't load tours</h3>
    <p class="text-red-700 mt-2">{{ errorMessage }}</p>
    <button
      class="mt-4 inline-flex items-center justify-center px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
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