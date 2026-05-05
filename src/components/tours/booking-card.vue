<script setup>
defineProps({
  price: Number,
  participants: Number,
  isAvailable: Boolean
})
</script>

<template>
  <div class="rounded-2xl border border-border bg-card p-6 shadow-lg">
    <div class="space-y-5">

      <!-- Price -->
      <div class="flex items-baseline gap-2">
        <span class="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-3xl font-bold text-transparent">
          ${{ price.toLocaleString() }}
        </span>
        <span class="text-muted-foreground">/ person</span>
      </div>

      <!-- Participants -->
      <div class="flex items-center gap-3 rounded-xl bg-secondary/50 p-4">
        <div class="rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 p-2">
          <!-- Replace this with your icon system -->
          <span class="text-white">👥</span>
        </div>
        <div>
          <p class="text-sm font-medium text-muted-foreground">Availability</p>
          <p class="font-semibold text-foreground">
            {{ participants }} spots remaining
          </p>
        </div>
      </div>

      <!-- Button -->
      <button
        :disabled="!isAvailable"
        :class="[
          'w-full rounded-xl px-6 py-4 text-lg font-semibold text-white shadow-md transition-all duration-300',
          isAvailable
            ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 hover:shadow-lg active:scale-[0.98] hover:scale-[1.02]'
            : 'bg-gradient-to-r from-amber-500 to-orange-500 opacity-50 cursor-not-allowed'
        ]"
      >
        {{ isAvailable ? "Book Now" : "Sold Out" }}
      </button>

      <!-- Info -->
      <p class="text-center text-sm text-muted-foreground">
        Free cancellation up to 24 hours before
      </p>

    </div>
  </div>
</template>