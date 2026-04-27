<template>
  <section class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <TourCard v-for="tour in tours" :key="tour.id" :tour="tour" />
  </section>
</template>

<script setup>
import TourCard from './TourCard.vue'

defineProps({
  tours: {
    type: Array,
    required: true
  }
})
</script>