<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import TourHero from '@/components/tours/tour-hero.vue'
import TourInfo from '@/components/tours/tour-info.vue'
import BookingCard from '@/components/tours/booking-card.vue'
import { getTourById } from '@/services/toursService'

const route = useRoute()
const tourData = ref(null)
const isLoading = ref(true)
const error = ref(null)

const fallbackDate = '1970-01-01'

const startDate = computed(() => tourData.value?.startDate || fallbackDate)
const endDate = computed(() => tourData.value?.endDate || fallbackDate)

async function loadTourDetails() {
  isLoading.value = true
  error.value = null

  try {
    tourData.value = await getTourById(route.params.id)
  } catch (err) {
    error.value = err?.message || 'Unable to load tour details.'
  } finally {
    isLoading.value = false
  }
}

onMounted(loadTourDetails)
</script>

<template>
  <main class="min-h-screen bg-background">

    <!-- Loading -->
    <div v-if="isLoading" class="container mx-auto px-4 py-12 text-center text-muted-foreground">
      Loading tour details...
    </div>

    <!-- Error -->
    <div v-else-if="error" class="container mx-auto px-4 py-12 text-center">
      <p class="text-red-600">{{ error }}</p>
    </div>

    <!-- Content -->
    <template v-else-if="tourData">

      <!-- Hero -->
      <TourHero
        :title="tourData.title"
        :imageUrl="tourData.imageUrl"
      />

      <!-- Main Content -->
      <div class="container mx-auto px-4 py-8 lg:py-12">
        <div class="grid gap-8 lg:grid-cols-3 lg:gap-12">

          <!-- LEFT (Tour Info) -->
          <div class="lg:col-span-2">
            <TourInfo
              :location="tourData.location"
              :price="tourData.price"
              :isAvailable="tourData.isAvailable"
              :description="tourData.description"
              :startDate="startDate"
              :endDate="endDate"
              :participants="tourData.participants"
            />
          </div>

          <!-- RIGHT (Booking Card) -->
          <div class="hidden lg:block">
            <div class="sticky top-8">
              <BookingCard
                :price="tourData.price"
                :participants="tourData.participants"
                :isAvailable="tourData.isAvailable"
              />
            </div>
          </div>

        </div>
      </div>

      <!-- Mobile Booking Bar -->
      <div class="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 p-4 backdrop-blur-sm lg:hidden">
        <div class="flex items-center justify-between gap-4">
          <div>
            <span class="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-2xl font-bold text-transparent">
              ${{ tourData.price.toLocaleString() }}
            </span>
            <span class="text-sm text-muted-foreground"> / person</span>
          </div>

          <button
            :disabled="!tourData.isAvailable"
            :class="[
              'rounded-xl px-8 py-3 font-semibold text-white shadow-md transition-all duration-300',
              tourData.isAvailable
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 hover:shadow-lg active:scale-[0.98]'
                : 'bg-gradient-to-r from-amber-500 to-orange-500 opacity-50 cursor-not-allowed'
            ]"
          >
            {{ tourData.isAvailable ? "Book Now" : "Sold Out" }}
          </button>
        </div>
      </div>

      <!-- Spacer for mobile -->
      <div class="h-24 lg:hidden"></div>

    </template>

  </main>
</template>