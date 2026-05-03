<template>
  <section class="grid gap-3 sm:grid-cols-3 mb-6 rounded-2xl border border-amber-100 bg-white p-4 shadow-sm">
    <label class="text-sm text-slate-700 flex flex-col gap-1">
      Availability
      <select
        :value="availability"
        class="border border-amber-200 rounded-md px-3 py-2 text-slate-700 bg-amber-50/40 focus:outline-none focus:ring-2 focus:ring-amber-400"
        @change="$emit('update:availability', $event.target.value)"
      >
        <option value="all">All</option>
        <option value="available">Available</option>
        <option value="unavailable">Unavailable</option>
      </select>
    </label>

    <label class="text-sm text-slate-700 flex flex-col gap-1">
      Location
      <select
        :value="location"
        class="border border-amber-200 rounded-md px-3 py-2 text-slate-700 bg-amber-50/40 focus:outline-none focus:ring-2 focus:ring-amber-400"
        @change="$emit('update:location', $event.target.value)"
      >
        <option v-for="loc in locations" :key="loc" :value="loc">
          {{ loc === 'all' ? 'All locations' : loc }}
        </option>
      </select>
    </label>

    <label class="text-sm text-slate-700 flex flex-col gap-1">
      Sort by
      <select
        :value="sortBy"
        class="border border-amber-200 rounded-md px-3 py-2 text-slate-700 bg-amber-50/40 focus:outline-none focus:ring-2 focus:ring-amber-400"
        @change="$emit('update:sortBy', $event.target.value)"
      >
        <option value="title-asc">Title (A-Z)</option>
        <option value="title-desc">Title (Z-A)</option>
        <option value="price-asc">Price (Low to High)</option>
        <option value="price-desc">Price (High to Low)</option>
      </select>
    </label>
  </section>
</template>

<script setup>
defineEmits(['update:availability', 'update:location', 'update:sortBy'])

defineProps({
  availability: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  sortBy: {
    type: String,
    required: true
  },
  locations: {
    type: Array,
    required: true
  }
})
</script>