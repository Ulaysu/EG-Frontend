<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Minus, Plus, Users } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/authStore'
import { createBooking } from '@/services/bookingService'

const props = defineProps({
  tourId: [String, Number],
  price: Number,
  participants: Number,
  isAvailable: Boolean,
  compact: {
    type: Boolean,
    default: false
  }
})

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const peopleCount = ref(1)
const isSubmitting = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const availableSpots = computed(() => Math.max(Number(props.participants) || 0, 0))
const pricePerPerson = computed(() => Number(props.price) || 0)
const totalPrice = computed(() => pricePerPerson.value * peopleCount.value)
const canBook = computed(() => props.isAvailable)
const isAtMinimum = computed(() => peopleCount.value <= 1)
const isAtMaximum = computed(() => availableSpots.value > 0 && peopleCount.value >= availableSpots.value)

const ctaLabel = computed(() => {
  if (!canBook.value) return 'Sold Out'
  if (!authStore.isAuthenticated) return 'Sign in to book'
  if (isSubmitting.value) return 'Booking...'
  if (successMessage.value) return 'Booked'
  return 'Book Now'
})

watch(availableSpots, (spots) => {
  if (spots > 0 && peopleCount.value > spots) {
    peopleCount.value = spots
  }
})

function clearFeedback() {
  errorMessage.value = ''
  successMessage.value = ''
}

function decreasePeople() {
  if (!isAtMinimum.value) {
    peopleCount.value -= 1
    clearFeedback()
  }
}

function increasePeople() {
  if (!isAtMaximum.value) {
    peopleCount.value += 1
    clearFeedback()
  }
}

async function handleBooking() {
  clearFeedback()

  if (!canBook.value || isSubmitting.value) return

  if (!authStore.isAuthenticated) {
    router.push({ name: 'login', query: { redirect: route.fullPath } })
    return
  }

  try {
    isSubmitting.value = true
    await createBooking(props.tourId, peopleCount.value)
    successMessage.value = 'Your booking is confirmed.'
  } catch (error) {
    errorMessage.value = error?.message || 'Unable to create booking. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div
    :class="[
      'border border-border bg-card shadow-lg',
      compact ? 'rounded-2xl p-4' : 'rounded-2xl p-6'
    ]"
  >
    <div :class="compact ? 'space-y-4' : 'space-y-5'">
      <div class="flex items-start justify-between gap-4">
        <div class="flex items-baseline gap-2">
          <span
            :class="[
              'bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text font-bold text-transparent',
              compact ? 'text-2xl' : 'text-3xl'
            ]"
          >
            ${{ pricePerPerson.toLocaleString() }}
          </span>
          <span class="text-sm text-muted-foreground">/ person</span>
        </div>

        <div class="text-right">
          <p class="text-xs font-medium text-muted-foreground">Total</p>
          <p class="text-lg font-bold text-foreground">${{ totalPrice.toLocaleString() }}</p>
        </div>
      </div>

      <div v-if="!compact" class="flex items-center gap-3 rounded-xl bg-secondary/50 p-4">
        <div class="rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 p-2">
          <Users class="h-5 w-5 text-white" />
        </div>
        <div>
          <p class="text-sm font-medium text-muted-foreground">Availability</p>
          <p class="font-semibold text-foreground">
            {{ availableSpots > 0 ? `${availableSpots} spots remaining` : 'Availability confirmed' }}
          </p>
        </div>
      </div>

      <div class="flex items-center justify-between gap-4 rounded-xl border border-border p-3">
        <div>
          <p class="text-sm font-medium text-muted-foreground">People</p>
          <p class="font-semibold text-foreground">
            {{ peopleCount }} traveler{{ peopleCount === 1 ? '' : 's' }}
          </p>
          <p v-if="compact" class="text-xs text-muted-foreground">
            {{ availableSpots > 0 ? `${availableSpots} spots remaining` : 'Availability confirmed' }}
          </p>
        </div>

        <div class="flex items-center gap-3">
          <button
            type="button"
            class="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-40"
            :disabled="isAtMinimum || isSubmitting"
            aria-label="Decrease number of people"
            @click="decreasePeople"
          >
            <Minus class="h-4 w-4" />
          </button>

          <span class="w-6 text-center text-lg font-bold text-foreground">{{ peopleCount }}</span>

          <button
            type="button"
            class="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-40"
            :disabled="isAtMaximum || isSubmitting"
            aria-label="Increase number of people"
            @click="increasePeople"
          >
            <Plus class="h-4 w-4" />
          </button>
        </div>
      </div>

      <button
        type="button"
        :disabled="!canBook || isSubmitting || Boolean(successMessage)"
        :class="[
          'w-full rounded-xl px-6 py-4 text-lg font-semibold text-white shadow-md transition-all duration-300',
          canBook && !isSubmitting && !successMessage
            ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 hover:shadow-lg active:scale-[0.98] hover:scale-[1.02]'
            : 'cursor-not-allowed bg-gradient-to-r from-amber-500 to-orange-500 opacity-50'
        ]"
        @click="handleBooking"
      >
        {{ ctaLabel }}
      </button>

      <p v-if="successMessage" class="text-center text-sm font-medium text-emerald-700">
        {{ successMessage }}
      </p>

      <p v-else-if="errorMessage" class="text-center text-sm font-medium text-red-600">
        {{ errorMessage }}
      </p>

      <p v-else class="text-center text-sm text-muted-foreground">
        Free cancellation up to 24 hours before
      </p>
    </div>
  </div>
</template>
