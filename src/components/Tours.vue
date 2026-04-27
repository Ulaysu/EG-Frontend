<template>
      <main class="pt-28 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
    <header class="mb-8">
      <h1 class="text-3xl md:text-4xl font-bold text-slate-800">Explore Tours</h1>
      <p class="text-slate-600 mt-2">
        Discover authentic experiences from local guides across The Gambia.
      </p>
      <p v-if="!isLoading && !error" class="text-sm text-slate-500 mt-1">
        {{ tours.length }} tours found · {{ availableToursCount }} available now
      </p>
    </header>

    <TourListSkeleton v-if="isLoading" />

    <ApiErrorState
      v-else-if="error"
      :error-message="error.message"
      @retry="retry"
    />

    <EmptyState v-else-if="!hasTours" />

    <TourList v-else :tours="tours" />
  </main>
</template>
<script setup>
import { onMounted } from 'vue';
import ApiErrorState from './tours/ApiErrorState.vue';
import EmptyState from './tours/EmptyState.vue';
import TourList from './tours/TourList.vue';
import TourListSkeleton from './tours/TourListSkeleton.vue';
import { useTours } from '../composables/useTours';

const { tours, isLoading, error, hasTours, availableToursCount, loadTours, retry } = useTours();

onMounted(() => {
  loadTours()
});
</script>

