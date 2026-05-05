<script setup>
import { computed } from 'vue'

// If you install lucide-vue-next
// import { MapPin, Calendar, Users } from 'lucide-vue-next'

defineProps({
  location: String,
  price: Number,
  isAvailable: Boolean,
  description: String,
  startDate: String,
  endDate: String,
  participants: Number
})

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
</script>

<template>
  <div class="flex flex-col gap-6">

    <!-- Location + Price -->
    <div class="flex flex-wrap items-start justify-between gap-4">
      <div class="flex items-center gap-2 text-muted-foreground">
        <!-- Replace with icon if installed -->
        <span>📍</span>
        <span class="text-lg">{{ location }}</span>
      </div>

      <div class="flex items-center gap-3">
        <span class="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-3xl font-bold text-transparent">
          ${{ price.toLocaleString() }}
        </span>
        <span class="text-muted-foreground">/ person</span>
      </div>
    </div>

    <!-- Availability -->
    <div>
      <span
        v-if="isAvailable"
        class="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700"
      >
        <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
        Available
      </span>

      <span
        v-else
        class="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-sm font-medium text-red-700"
      >
        <span class="h-2 w-2 rounded-full bg-red-500"></span>
        Not Available
      </span>
    </div>

    <!-- Description -->
    <div class="space-y-2">
      <h2 class="text-xl font-semibold text-foreground">About this tour</h2>
      <p class="leading-relaxed text-muted-foreground">
        {{ description }}
      </p>
    </div>

    <!-- Dates -->
    <div class="grid gap-4 rounded-xl bg-secondary/50 p-5 sm:grid-cols-2">

      <div class="flex items-start gap-3">
        <div class="rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 p-2">
          <span class="text-white">📅</span>
        </div>
        <div>
          <p class="text-sm font-medium text-muted-foreground">Start Date</p>
          <p class="font-semibold text-foreground">
            {{ formatDate(startDate) }}
          </p>
        </div>
      </div>

      <div class="flex items-start gap-3">
        <div class="rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 p-2">
          <span class="text-white">📅</span>
        </div>
        <div>
          <p class="text-sm font-medium text-muted-foreground">End Date</p>
          <p class="font-semibold text-foreground">
            {{ formatDate(endDate) }}
          </p>
        </div>
      </div>

    </div>

    <!-- Participants -->
    <div class="flex items-center gap-3 text-muted-foreground md:hidden">
      <span>👥</span>
      <span>{{ participants }} spots remaining</span>
    </div>

  </div>
</template>