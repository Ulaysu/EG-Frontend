<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { AlertCircle, CalendarDays, CheckCircle, Compass, Loader2, RefreshCw } from 'lucide-vue-next'
import { getBookingById } from '@/services/bookingService'

const route = useRoute()

const POLL_INTERVAL_MS = 2000
const MAX_POLL_ATTEMPTS = 10

const booking = ref(null)
const errorMessage = ref('')
const isChecking = ref(false)
const pollAttempts = ref(0)
const pollingFinished = ref(false)
const timeoutId = ref(null)

const bookingId = computed(() => route.query.bookingId || '')
const isConfirmed = computed(() => booking.value?.status === 'Confirmed')
const isPending = computed(() => booking.value?.status === 'Pending')
const isProcessing = computed(() => isChecking.value || (isPending.value && !pollingFinished.value))
const shouldShowWaitingMessage = computed(() => isPending.value && pollingFinished.value)

const clearPollTimer = () => {
  if (timeoutId.value) {
    clearTimeout(timeoutId.value)
    timeoutId.value = null
  }
}

const loadBookingStatus = async ({ shouldContinuePolling = true } = {}) => {
  if (!bookingId.value) {
    errorMessage.value = 'We could not find the booking for this payment return.'
    pollingFinished.value = true
    return
  }

  clearPollTimer()
  isChecking.value = true
  errorMessage.value = ''

  try {
    booking.value = await getBookingById(bookingId.value)

    if (booking.value?.status === 'Confirmed') {
      pollingFinished.value = true
      return
    }

    if (booking.value?.status !== 'Pending') {
      pollingFinished.value = true
      return
    }

    if (shouldContinuePolling && pollAttempts.value < MAX_POLL_ATTEMPTS) {
      pollAttempts.value += 1
      timeoutId.value = setTimeout(() => {
        loadBookingStatus()
      }, POLL_INTERVAL_MS)
      return
    }

    pollingFinished.value = true
  } catch (error) {
    errorMessage.value = error?.message || 'We could not check your booking status. Please refresh this page in a moment.'
    pollingFinished.value = true
  } finally {
    isChecking.value = false
  }
}

const refreshStatus = () => {
  pollAttempts.value = 0
  pollingFinished.value = false
  loadBookingStatus()
}

onMounted(() => {
  loadBookingStatus()
})

onUnmounted(clearPollTimer)
</script>

<template>
  <section class="min-h-screen bg-stone-50">
    <div class="mx-auto flex max-w-3xl flex-col items-center px-4 py-16 text-center sm:px-6 lg:px-8">
      <div
        :class="[
          'flex h-16 w-16 items-center justify-center rounded-full',
          isConfirmed ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
        ]"
      >
        <CheckCircle v-if="isConfirmed" class="h-9 w-9" />
        <Loader2 v-else-if="isProcessing" class="h-9 w-9 animate-spin" />
        <AlertCircle v-else class="h-9 w-9" />
      </div>

      <h1 class="mt-6 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
        <span v-if="isConfirmed">Payment successful</span>
        <span v-else-if="isProcessing">Payment processing</span>
        <span v-else>Payment status pending</span>
      </h1>

      <p v-if="isConfirmed" class="mt-3 max-w-xl text-base leading-7 text-stone-600">
        Your payment has been confirmed and your booking is now confirmed.
      </p>
      <p v-else-if="isProcessing" class="mt-3 max-w-xl text-base leading-7 text-stone-600">
        Stripe has returned you to ExploreGambia. We are waiting for the backend webhook to confirm your booking.
      </p>
      <p v-else-if="shouldShowWaitingMessage" class="mt-3 max-w-xl text-base leading-7 text-stone-600">
        Your payment is still being confirmed. Please refresh this page in a moment.
      </p>
      <p v-else-if="errorMessage" class="mt-3 max-w-xl text-base leading-7 text-stone-600">
        {{ errorMessage }}
      </p>
      <p v-else class="mt-3 max-w-xl text-base leading-7 text-stone-600">
        Your booking status is {{ booking?.status || 'not available' }}. Please check your bookings for the latest update.
      </p>

      <div
        v-if="booking"
        class="mt-6 w-full max-w-md rounded-2xl border border-stone-200 bg-white p-5 text-left shadow-sm"
      >
        <p class="text-sm font-medium text-stone-500">Booking status</p>
        <p class="mt-1 text-lg font-semibold text-stone-900">{{ booking.status }}</p>
        <p v-if="booking.tour?.title" class="mt-3 text-sm text-stone-600">{{ booking.tour.title }}</p>
      </div>

      <div class="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          :disabled="isChecking"
          class="inline-flex items-center justify-center gap-2 rounded-lg border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-700 transition hover:border-stone-400 hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-60"
          @click="refreshStatus"
        >
          <RefreshCw :class="['h-4 w-4', isChecking ? 'animate-spin' : '']" />
          Refresh Status
        </button>
        <RouterLink
          to="/bookings"
          class="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
        >
          <CalendarDays class="h-4 w-4" />
          My Bookings
        </RouterLink>
        <RouterLink
          to="/tours"
          class="inline-flex items-center justify-center gap-2 rounded-lg border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-700 transition hover:border-stone-400 hover:bg-stone-50"
        >
          <Compass class="h-4 w-4" />
          Explore Tours
        </RouterLink>
      </div>
    </div>
  </section>
</template>
