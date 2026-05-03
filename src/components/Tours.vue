<template>
      <main class="pt-28 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
    <section class="relative overflow-hidden rounded-3xl border border-amber-100 bg-gradient-to-br from-amber-50 via-white to-orange-50 p-6 md:p-10 shadow-sm mb-8">
      <div class="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-amber-200/40"></div>
      <div class="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-orange-200/30"></div>

      <header class="relative z-10">
        <span class="inline-flex rounded-full bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 mb-4">
          Curated local experiences
        </span>
        <h1 class="text-3xl md:text-4xl font-bold text-slate-800">Explore Tours</h1>
        <p class="text-slate-600 mt-2 max-w-2xl">
          Discover authentic experiences from local guides across The Gambia.
        </p>
        <p v-if="!isLoading && !error" class="text-sm text-amber-700 font-medium mt-3">
          {{ filteredTours.length }} of {{ tours.length }} tours · {{ availableToursCount }} available now
        </p>
      </header>
    </section>

    <TourFilters
      v-if="!isLoading && !error && hasTours"
      v-model:availability="availability"
      v-model:location="location"
      v-model:sortBy="sortBy"
      :locations="locations"
    />-

    <TourListSkeleton v-if="isLoading" />

    <ApiErrorState
      v-else-if="error"
      :error-message="error.message"
      @retry="retry"
    />

    <EmptyState v-else-if="!hasTours" />

    <EmptyState
      v-else-if="filteredTours.length === 0"
      title="No tours match your filters"
      message="Try changing availability, location, or sort options."
    />

    <TourList v-else :tours="filteredTours" />
  </main>
</template>
<script setup>
import { onMounted } from 'vue';
import ApiErrorState from './tours/ApiErrorState.vue';
import EmptyState from './tours/EmptyState.vue';
import TourList from './tours/TourList.vue';
import TourListSkeleton from './tours/TourListSkeleton.vue';
import TourFilters from './tours/TourFilters.vue';
import { useTours } from '../composables/useTours';

const {  
tours,
  filteredTours,
  isLoading,
  error,
  hasTours,
  availableToursCount,
  locations,
  availability,
  location,
  sortBy,
  loadTours,
  retry } = useTours();

onMounted(() => {
  loadTours()
});
</script>

