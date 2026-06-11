
<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getMyTourById } from '@/services/toursService'

const router = useRouter()
const route = useRoute()

const tour = ref(null)
const loading = ref(true)
const error = ref(null)
const toasts = ref([])

const fallbackDate = '1970-01-01'

const priceFmt = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

const dateFmt = (date) =>
  new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })


 const durationDays = computed(() => {
          if (!tour.value?.startDate || !tour.value?.endDate) return 0;
          const start = new Date(tour.value.startDate);
          const end = new Date(tour.value.endDate);
          const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
          return diff > 0 ? diff : 1;
        });

const availabilityLabel = computed(() =>
  tour.value?.isAvailable ? 'Available' : 'Unavailable'
)

const availabilityClasses = computed(() =>
  tour.value?.isAvailable
    ? 'bg-emerald-500/90 text-white'
    : 'bg-slate-900/80 text-white'
)

const availabilityDot = computed(() =>
  tour.value?.isAvailable
    ? 'bg-white'
    : 'bg-slate-300'
)

const stats = computed(() => {
  if (!tour.value) return []

  return [
    {
      label: 'Price',
      value: priceFmt.format(tour.value.price || 0),
      icon: 'M12 8c-3 0-5 1.5-5 4s2 4 5 4 5-1.5 5-4-2-4-5-4z',
      tint: 'from-amber-500 to-orange-500',
    },
    {
      label: 'Capacity',
      value: tour.value.maxParticipants || 0,
      icon: 'M17 21v-2a4 4 0 00-4-4H5',
      tint: 'from-sky-500 to-indigo-500',
    },
    {
      label: 'Duration',
      value: `${durationDays.value} day${durationDays.value !== 1 ? 's' : ''}`,
      icon: 'M8 7V3M16 7V3M3 11h18M5 5h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z',
      tint: 'from-emerald-500 to-teal-500',
    }
    ,
    {
      label: 'Status',
      value: availabilityLabel.value,
      icon: 'M5 13l4 4L19 7',
      tint: 'from-emerald-500 to-teal-500',
    },
    {
      label: 'Location',
      value: tour.value.location || '-',
      icon: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z',
      tint: 'from-rose-500 to-pink-500',
    },
  ]
})

async function loadTourDetails() {

  try {
      loading.value = true
    error.value = null

    const id = route.params.id
    console.log('Tour ID:', id)

    if (!id) {
      throw new Error('Tour id is missing')
    }

    const response = await getMyTourById(id)
   

    tour.value = response
  } catch (err) {
    console.error(err)
    error.value =
      err?.message || 'Unable to load tour details.'
  } finally {
    loading.value = false
  }
}

function retry() {
  loadTourDetails()
}

function edit() {
  router.push(`/tours/edit/${tour.value.id}`)
}

function manageBookings() {
  router.push(`/guide/tours/${tour.value.id}/bookings`)
}

function viewParticipants() {
  router.push(`/guide/tours/${tour.value.id}/participants`)
}

async function toggleAvailability() {
  try {
    // wire backend later

    tour.value.isAvailable =
      !tour.value.isAvailable

    console.log(
      'Availability changed:',
      tour.value.isAvailable
    )
  } catch (err) {
    console.error(err)
  }
}
 

        function pushToast(message, type = 'info') {
          const id = Date.now() + Math.random();
          toasts.value.push({ id, message, type });
          setTimeout(() => {
            toasts.value = toasts.value.filter(t => t.id !== id);
          }, 3000);
        }
async function deleteTour() {
  const confirmed = window.confirm(
    `Delete "${tour.value.title}"?`
  )

  if (!confirmed) return

  try {
    // wire backend delete later

    console.log('Delete tour:', tour.value.id)

    router.push('/guide/tours')
  } catch (err) {
    console.error(err)
  }
}

onMounted(loadTourDetails)

</script>
<template>
  <section class="min-h-screen bg-gradient-to-b from-amber-50/50 via-white to-white">
      <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <!-- Loading State -->
        <div v-if="loading" class="space-y-6">
          <div class="overflow-hidden rounded-3xl">
            <div class="h-64 animate-pulse bg-slate-200 sm:h-80 lg:h-96" />
          </div>
          <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div class="space-y-6 lg:col-span-2">
              <div class="h-64 animate-pulse rounded-2xl bg-slate-200" />
              <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div v-for="n in 4" :key="n" class="h-32 animate-pulse rounded-2xl bg-slate-200" />
              </div>
            </div>
            <div class="h-80 animate-pulse rounded-2xl bg-slate-200" />
          </div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="mt-10 rounded-2xl border border-rose-200 bg-rose-50/50 p-8 text-center shadow-sm">
          <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 text-rose-600">
            <svg class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h3 class="mt-4 text-lg font-semibold text-slate-900">Something went wrong</h3>
          <p class="mt-1 text-sm text-slate-600">
            {{ typeof error === 'string' ? error : "We couldn't load the tour details. Please try again." }}
          </p>
          <button @click="retry" class="mt-4 inline-flex items-center gap-2 rounded-xl bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-rose-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2">
            Try Again
          </button>
        </div>

        <!-- Not Found State -->
        <div v-else-if="!tour" class="mt-10 rounded-3xl border-2 border-dashed border-amber-200 bg-gradient-to-b from-amber-50/60 to-white p-10 text-center">
          <div class="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg shadow-amber-500/30">
            <svg class="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <h3 class="mt-6 text-xl font-bold text-slate-900">Tour not found</h3>
          <p class="mt-2 text-sm text-slate-600">The tour you're looking for doesn't exist or has been removed.</p>
        </div>

        <!-- Tour Content -->
        <div v-else class="space-y-6">
          <!-- Hero -->
          <div class="relative overflow-hidden rounded-3xl shadow-lg">
            <div class="h-64 sm:h-80 lg:h-96">
              <img v-if="tour.imageUrl" :src="tour.imageUrl" :alt="tour.title" loading="eager" class="h-full w-full object-cover" />
              <div v-else class="flex h-full w-full items-center justify-center bg-gradient-to-br from-amber-300 to-orange-400">
                <svg class="h-16 w-16 text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
              </div>
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div class="absolute bottom-0 left-0 w-full p-6 sm:p-8 lg:p-10">
              <div class="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h1 class="text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">{{ tour.title }}</h1>
                  <p class="mt-2 flex items-center gap-1.5 text-sm font-medium text-white/90">
                    <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {{ tour.location }}
                  </p>
                </div>
                <span :class="['inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold backdrop-blur-md', availabilityClasses]">
                  <span :class="['h-2 w-2 rounded-full', availabilityDot]" />
                  {{ availabilityLabel }}
                </span>
              </div>
            </div>
          </div>

          <!-- Two-Column Layout -->
          <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <!-- Left Column -->
            <div class="space-y-6 lg:col-span-2">
              <!-- Overview Card -->
              <div class="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm sm:p-8">
                <h2 class="text-lg font-bold text-slate-900 sm:text-xl">Tour Overview</h2>
                <p class="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">{{ tour.description }}</p>
                <div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div class="rounded-xl bg-slate-50 p-4">
                    <dt class="text-xs font-medium uppercase tracking-wider text-slate-400">Location</dt>
                    <dd class="mt-1 flex items-center gap-1.5 text-sm font-semibold text-slate-700">
                      <svg class="h-4 w-4 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {{ tour.location }}
                    </dd>
                  </div>
                  <div class="rounded-xl bg-slate-50 p-4">
                    <dt class="text-xs font-medium uppercase tracking-wider text-slate-400">Price</dt>
                    <dd class="mt-1 text-sm font-semibold text-slate-700">{{ priceFmt.format(tour.price) }}</dd>
                  </div>
                  <div class="rounded-xl bg-slate-50 p-4">
                    <dt class="text-xs font-medium uppercase tracking-wider text-slate-400">Max Participants</dt>
                    <dd class="mt-1 flex items-center gap-1.5 text-sm font-semibold text-slate-700">
                      <svg class="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                      </svg>
                      {{ tour.maxParticipants}}
                    </dd>
                  </div>
                  <div class="rounded-xl bg-slate-50 p-4">
                    <dt class="text-xs font-medium uppercase tracking-wider text-slate-400">Start Date</dt>
                    <dd class="mt-1 text-sm font-semibold text-slate-700">{{ dateFmt(tour.startDate) }}</dd>
                  </div>
                  <div class="rounded-xl bg-slate-50 p-4">
                    <dt class="text-xs font-medium uppercase tracking-wider text-slate-400">End Date</dt>
                    <dd class="mt-1 text-sm font-semibold text-slate-700">{{ dateFmt(tour.endDate) }}</dd>
                  </div>
                </div>
              </div>

              <!-- Statistics -->
              <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div v-for="stat in stats" :key="stat.label" class="group relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm transition hover:shadow-md">
                  <div class="flex items-start justify-between">
                    <div>
                      <p class="text-[10px] font-medium uppercase tracking-wider text-slate-500 sm:text-xs">{{ stat.label }}</p>
                      <p class="mt-2 text-xl font-bold text-slate-900 sm:text-2xl">{{ stat.value }}</p>
                    </div>
                    <div :class="['flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-md sm:h-10 sm:w-10', stat.tint]">
                      <svg class="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path :d="stat.icon" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Column: Management Panel -->
            <div class="lg:col-span-1">
              <div class="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm sm:p-8 lg:sticky lg:top-6 lg:self-start">
                <h3 class="text-base font-bold text-slate-900 sm:text-lg">Management Actions</h3>
                <p class="mt-1 text-xs text-slate-500 sm:text-sm">Manage your tour and participants</p>
                <div class="mt-5 space-y-3">
                  <button type="button" @click="edit" class="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-amber-500/20 transition hover:from-amber-600 hover:to-orange-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2">
                    <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    Edit Tour
                  </button>
                  <button type="button" @click="manageBookings" class="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2">
                    <svg class="h-4 w-4 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    Manage Bookings
                  </button>
                  <button type="button" @click="viewParticipants" class="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2">
                    <svg class="h-4 w-4 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                    </svg>
                    View Participants
                  </button>
                  <button type="button" @click="toggleAvailability" :class="['flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold shadow-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2', tour.isAvailable ? 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 focus-visible:ring-emerald-500' : 'border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 focus-visible:ring-amber-500']">
                    <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <path v-if="tour.isAvailable" d="M18.36 6.64a9 9 0 11-12.73 0M12 2v10" />
                      <path v-else d="M18.36 6.64a9 9 0 11-12.73 0M12 2v10" />
                      <path v-if="!tour.isAvailable" d="M1 1l22 22" stroke-width="2" />
                    </svg>
                    {{ tour.isAvailable ? 'Set Unavailable' : 'Set Available' }}
                  </button>
                  <div class="border-t border-slate-100 pt-3">
                    <button type="button" @click="deleteTour" class="flex w-full items-center justify-center gap-2 rounded-xl bg-rose-50 px-4 py-2.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2">
                      <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-2 14a2 2 0 01-2 2H9a2 2 0 01-2-2L5 6" />
                        <path d="M10 11v6M14 11v6" />
                        <path d="M9 6V4a2 2 0 012-2h2a2 2 0 012 2v2" />
                      </svg>
                      Delete Tour
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Toast notifications -->
      <div class="fixed bottom-4 right-4 z-50 space-y-2">
        <transition-group name="toast">
          <div v-for="t in toasts" :key="t.id" :class="['rounded-xl px-4 py-3 text-sm font-medium shadow-lg border', t.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : t.type === 'error' ? 'bg-rose-50 border-rose-200 text-rose-700' : 'bg-slate-50 border-slate-200 text-slate-700']">
            {{ t.message }}
          </div>
        </transition-group>
      </div>
    </section>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.toast-enter-to,
.toast-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
