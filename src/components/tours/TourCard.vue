<template>
  <RouterLink :to="{ name: 'tour-details', params: { id: tour.id } }" class="block">
     <article class="group bg-white rounded-2xl border border-amber-100 overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
    <div class="relative">
      <img :src="tour.imageUrl" :alt="tour.title" class="w-full h-52 object-cover" />
      <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      <span
        class="absolute top-3 right-3 text-xs px-2.5 py-1 rounded-full font-semibold"
        :class="tour.isAvailable ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'"
      >
        {{ tour.isAvailable ? 'Available' : 'Unavailable' }}
      </span>
    </div>

    <div class="p-5 space-y-3">
      <h3 class="text-lg font-semibold text-slate-800 group-hover:text-amber-700 transition-colors">{{ tour.title }}</h3>

      <p class="text-sm text-slate-600 line-clamp-3">{{ tour.description }}</p>

      <div class="flex items-center justify-between text-sm pt-2 border-t border-amber-100">
        <span class="text-slate-500">{{ tour.location }}</span>
        <span class="font-bold text-amber-700">{{ formatPrice(tour.price) }}</span>
      </div>
    </div>
  </article>
  </RouterLink>
 
</template>

<script setup>
import TourDetails from '@/Pages/TourDetails.vue';
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