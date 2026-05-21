<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getMyBookings } from '@/services/bookingService'

const router = useRouter()

const bookings = ref([])
const loading = ref(true)
const error = ref('')

const formatDate = (value) => {
  if (!value) return '—'
  const d = new Date(value)
  return d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const formatCurrency = (amount) => {
  if (amount == null) return '—'
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(amount)
}

const getStatusClasses = (status) => {
  switch (status) {
    case 'Pending':
      return 'bg-amber-100 text-amber-800 ring-1 ring-amber-200'
    case 'Confirmed':
      return 'bg-emerald-100 text-emerald-800 ring-1 ring-emerald-200'
    case 'Cancelled':
      return 'bg-red-100 text-red-700 ring-1 ring-red-200'
    default:
      return 'bg-slate-100 text-slate-700 ring-1 ring-slate-200'
  }
}

const getStatusMessage = (status) => {
  if (status === 'Confirmed') return 'Payment Complete'
  if (status === 'Cancelled') return 'Booking Cancelled'
  return null
}

const goToTour = (tourId) => router.push(`/tours/${tourId}`)
const goToCheckout = (bookingId) => router.push(`/checkout/${bookingId}`)
const goToExplore = () => router.push('/tours')

const fetchBookings = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const res = await getMyBookings() // ✅ token is attached automatically
    bookings.value = Array.isArray(res) ? res : []
  } catch (e) {
    console.error(e)
    error.value = 'We could not load your bookings. Please try again.'
  } finally {
    loading.value = false
  }

}

onMounted(fetchBookings)
</script>

<template>
  <section class="min-h-screen bg-stone-50">
    <div class="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <!-- Header -->
      <header class="mb-8">
        <h1 class="text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
          My Bookings
        </h1>
        <p class="mt-2 text-stone-600">
          Track and manage your upcoming tour reservations.
        </p>
      </header>

      <!-- Error -->
      <div
        v-if="error && !loading"
        class="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
      >
        {{ error }}
        <button
          @click="fetchBookings"
          class="ml-3 font-medium underline underline-offset-2 hover:text-red-800"
        >
          Retry
        </button>
      </div>

      <!-- Loading skeletons -->
      <div v-if="loading" class="space-y-4">
        <div
          v-for="i in 3"
          :key="i"
          class="animate-pulse rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6"
        >
          <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div class="flex-1 space-y-3">
              <div class="h-5 w-2/3 rounded bg-stone-200"></div>
              <div class="h-4 w-1/3 rounded bg-stone-200"></div>
              <div class="flex gap-3">
                <div class="h-4 w-24 rounded bg-stone-200"></div>
                <div class="h-4 w-24 rounded bg-stone-200"></div>
                <div class="h-4 w-24 rounded bg-stone-200"></div>
              </div>
            </div>
            <div class="flex gap-2">
              <div class="h-9 w-24 rounded-lg bg-stone-200"></div>
              <div class="h-9 w-24 rounded-lg bg-stone-200"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div
        v-else-if="!error && bookings.length === 0"
        class="rounded-3xl border border-stone-200 bg-white px-6 py-16 text-center shadow-sm"
      >
        <div
          class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-600"
        >
          <!-- compass icon -->
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
            <circle cx="12" cy="12" r="9" />
            <path d="M15.5 8.5l-2 5-5 2 2-5 5-2z" />
          </svg>
        </div>
        <h3 class="mt-5 text-lg font-semibold text-stone-900">You have no bookings yet.</h3>
        <p class="mt-1 text-sm text-stone-500">
          Start exploring tours and plan your next adventure.
        </p>
        <button
          @click="goToExplore"
          class="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
        >
          Explore Tours
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <!-- Bookings list -->
      <ul v-else class="space-y-4">
        <li
          v-for="b in bookings"
          :key="b.bookingId"
          class="group rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-6"
        >
          <div class="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <!-- Left: details -->
            <div class="min-w-0 flex-1">
              <div class="flex flex-wrap items-center gap-2">
                <h2 class="truncate text-lg font-semibold text-stone-900">
                  {{ b.tour?.title }}
                </h2>
                <span
                  :class="[
                    'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium',
                    getStatusClasses(b.status),
                  ]"
                >
                  <span class="h-1.5 w-1.5 rounded-full bg-current opacity-70"></span>
                  {{ b.status }}
                </span>
              </div>

              <!-- Location -->
              <p class="mt-1 flex items-center gap-1.5 text-sm text-stone-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 11a3 3 0 100-6 3 3 0 000 6z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 11c0 7-7 11-7 11s-7-4-7-11a7 7 0 1114 0z" />
                </svg>
                {{ b.tour?.location }}
              </p>

              <!-- Meta grid -->
              <dl class="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-4">
                <div class="flex items-center gap-2 text-stone-600">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-5a4 4 0 11-8 0 4 4 0 018 0zm6 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span>{{ b.numberOfPeople }} {{ b.numberOfPeople === 1 ? 'guest' : 'guests' }}</span>
                </div>

                <div class="flex items-center gap-2 text-stone-600">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="5" width="18" height="16" rx="2" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 3v4M8 3v4M3 11h18" />
                  </svg>
                  <span>Booked {{ formatDate(b.bookingDate) }}</span>
                </div>

                <div class="flex items-center gap-2 text-stone-600 sm:col-span-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="5" width="18" height="16" rx="2" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 11h18" />
                  </svg>
                  <span>
                    {{ formatDate(b.tour?.startDate) }} – {{ formatDate(b.tour?.endDate) }}
                  </span>
                </div>
              </dl>

              <!-- Status message + total -->
              <div class="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-stone-100 pt-4">
                <div class="flex items-center gap-2 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <rect x="2" y="6" width="20" height="12" rx="2" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2 10h20" />
                  </svg>
                  <span class="font-semibold text-stone-900">
                    {{ formatCurrency(b.totalAmount) }}
                  </span>
                  <span
                    v-if="getStatusMessage(b.status)"
                    class="text-stone-500"
                  >
                    · {{ getStatusMessage(b.status) }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Right: actions -->
            <div class="flex flex-row gap-2 sm:flex-col sm:items-stretch sm:gap-2">
              <button
                @click="goToTour(b.tour?.tourId)"
                class="inline-flex items-center justify-center gap-1.5 rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition hover:border-stone-400 hover:bg-stone-50"
              >
                View Tour
              </button>

              <button
                v-if="b.status === 'Pending'"
                @click="goToCheckout(b.bookingId)"
                class="inline-flex items-center justify-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <rect x="2" y="6" width="20" height="12" rx="2" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2 10h20" />
                </svg>
                Pay Now
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

