<template>
  <article class="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
    <img :src="tour.imageUrl" :alt="tour.title" class="w-full h-48 object-cover" />

    <div class="p-5 space-y-3">
      <div class="flex items-start justify-between gap-3">
        <h3 class="text-lg font-semibold text-slate-800">{{ tour.title }}</h3>
        <span
          class="text-xs px-2 py-1 rounded-full font-medium"
          :class="tour.isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'"
        >
          {{ tour.isAvailable ? 'Available' : 'Unavailable' }}
        </span>
      </div>

      <p class="text-sm text-slate-600 line-clamp-3">{{ tour.description }}</p>

      <div class="flex items-center justify-between text-sm">
        <span class="text-slate-500">{{ tour.location }}</span>
        <span class="font-semibold text-amber-700">{{ formatPrice(tour.price) }}</span>
      </div>
    </div>
  </article>
</template>

<script setup>
defineProps({
  tour: {
    type: Object,
    required: true
  }
})

function formatPrice(price) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2
  }).format(price)
}
</script>