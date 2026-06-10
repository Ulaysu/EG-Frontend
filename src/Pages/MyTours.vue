<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getMyTours} from '@/services/toursService'

const router = useRouter()

const tours = ref([])
const loading = ref(false)
const error = ref(null)
  
const filter = ref('all')
const sortBy = ref('startDate')

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

async function loadTours() {
  try {
    loading.value = true
    error.value = null

    tours.value = await getMyTours()
  } catch (err) {
    console.error(err)
    error.value = 'Failed to load tours'
  } finally {
    loading.value = false
  }
}

onMounted(loadTours)

const enrichedTours = computed(() => {
  const now = new Date()

  return tours.value.map((tour) => {
    const start = new Date(tour.startDate)

    return {
      ...tour,
      isUpcoming: start > now,
    }
  })
})

const stats = computed(() => ({
  total: tours.value.length,
  active: tours.value.filter((x) => x.isAvailable).length,
  upcoming: enrichedTours.value.filter((x) => x.isUpcoming).length,
  capacity: tours.value.reduce(
    (sum, x) => sum + (x.maxParticipants || 0),
    0
  ),
}))

const visibleTours = computed(() => {
  let list = [...enrichedTours.value]

  if (filter.value === 'active') {
    list = list.filter((x) => x.isAvailable)
  }

  if (filter.value === 'upcoming') {
    list = list.filter((x) => x.isUpcoming)
  }

  list.sort((a, b) => {
    switch (sortBy.value) {
      case 'price':
        return a.price - b.price

      case 'title':
        return a.title.localeCompare(b.title)

      default:
        return new Date(a.startDate) - new Date(b.startDate)
    }
  })

  return list
})

function createTour() {
  router.push('/tours/create')
}

function viewTour(tour) {
    console.log('Viewing tour', tour)

  router.push(`/tours/guidedetails/${tour.id}`)
}

function editTour(tour) {
  router.push(`/guide/tours/edit/${tour.tourId}`)
}

/*async function removeTour(tour) {
  const confirmed = window.confirm(
    `Delete "${tour.title}"?`
  )

  if (!confirmed) return

  try {
    await deleteTour(tour.tourId)

    tours.value = tours.value.filter(
      (x) => x.tourId !== tour.tourId
    )
  } catch (err) {
    console.error(err)
    alert('Failed to delete tour')
  }
}*/

function retry() {
  loadTours()
}

</script>

<template>
    <section class="min-h-screen bg-gradient-to-b from-amber-50/50 via-white to-white">
    <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <header class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">My Tours</h1>
          <p class="mt-2 text-sm text-slate-600 sm:text-base">Manage all tours you have created</p>
        </div>
        <button type="button" @click="createTour"
          class="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-500/30 transition hover:from-amber-600 hover:to-orange-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2">
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>
          Create Tour
        </button>
      </header>

      <div class="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <div v-for="card in [
          { label: 'Total Tours', value: stats.total, icon: 'M3 7h18M3 12h18M3 17h18', tint: 'from-amber-500 to-orange-500' },
          { label: 'Active Tours', value: stats.active, icon: 'M5 13l4 4L19 7', tint: 'from-emerald-500 to-teal-500' },
          { label: 'Upcoming Tours', value: stats.upcoming, icon: 'M8 7V3M16 7V3M3 11h18M5 5h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z', tint: 'from-sky-500 to-indigo-500' },
          { label: 'Total Capacity', value: stats.capacity, icon: 'M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-5.13a4 4 0 11-8 0 4 4 0 018 0zm6 0a4 4 0 11-8 0 4 4 0 018 0z', tint: 'from-rose-500 to-pink-500' },
        ]" :key="card.label"
          class="relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5">
          <div class="flex items-start justify-between">
            <div>
              <p class="text-xs font-medium uppercase tracking-wider text-slate-500 sm:text-sm">{{ card.label }}</p>
              <p class="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">{{ card.value }}</p>
            </div>
            <div :class="['flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-md sm:h-12 sm:w-12', card.tint]">
              <svg class="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path :d="card.icon"/></svg>
            </div>
          </div>
        </div>
      </div>

      <div v-if="!loading && !error && tours.length" class="mt-8 flex flex-wrap items-center justify-between gap-3">
        <div class="inline-flex rounded-xl border border-slate-200 bg-white p-1 shadow-sm" role="tablist">
          <button v-for="f in [{k:'all',label:'All'},{k:'active',label:'Active'},{k:'upcoming',label:'Upcoming'}]" :key="f.k"
            type="button" role="tab" :aria-selected="filter === f.k" @click="filter = f.k"
            :class="['rounded-lg px-3 py-1.5 text-sm font-medium transition', filter === f.k ? 'bg-amber-500 text-white shadow' : 'text-slate-600 hover:text-slate-900']">
            {{ f.label }}
          </button>
        </div>
        <label class="flex items-center gap-2 text-sm text-slate-600">
          <span class="hidden sm:inline">Sort by</span>
          <select v-model="sortBy"
            class="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30">
            <option value="startDate">Start date</option>
            <option value="price">Price</option>
            <option value="title">Title</option>
          </select>
        </label>
      </div>

      <div v-if="loading" class="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="n in 6" :key="n" class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div class="h-48 animate-pulse bg-slate-200"></div>
          <div class="space-y-3 p-5">
            <div class="h-5 w-2/3 animate-pulse rounded bg-slate-200"></div>
            <div class="h-4 w-1/3 animate-pulse rounded bg-slate-200"></div>
            <div class="h-3 w-full animate-pulse rounded bg-slate-200"></div>
            <div class="h-3 w-5/6 animate-pulse rounded bg-slate-200"></div>
          </div>
        </div>
      </div>

      <div v-else-if="error" class="mt-10 rounded-2xl border border-rose-200 bg-rose-50/50 p-8 text-center shadow-sm">
        <h3 class="text-lg font-semibold text-slate-900">Something went wrong</h3>
        <p class="mt-1 text-sm text-slate-600">{{ typeof error === 'string' ? error : 'We couldn\'t load your tours.' }}</p>
        <button type="button" @click="retry" class="mt-5 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">Retry</button>
      </div>

      <div v-else-if="!tours.length" class="mt-10 rounded-3xl border-2 border-dashed border-amber-200 bg-gradient-to-b from-amber-50/60 to-white p-10 text-center">
        <div class="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg shadow-amber-500/30">
          <svg class="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
        </div>
        <h3 class="mt-6 text-xl font-bold text-slate-900">You haven't created any tours yet.</h3>
        <p class="mt-2 text-sm text-slate-600">Start sharing the beauty of Gambia with travelers around the world.</p>
        <button type="button" @click="createTour" class="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-500/30 hover:from-amber-600 hover:to-orange-600">
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>
          Create Your First Tour
        </button>
      </div>

      <div v-else class="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <article v-for="tour in visibleTours" :key="tour.tourId"
          class="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
          <div class="relative h-48 overflow-hidden bg-slate-100">
            <img v-if="tour.imageUrl" :src="tour.imageUrl" :alt="tour.title" loading="lazy"
              class="h-full w-full object-cover transition duration-500 group-hover:scale-105"/>
            <span :class="['absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold backdrop-blur-md', tour.isAvailable ? 'bg-emerald-500/90 text-white' : 'bg-slate-900/80 text-white']">
              <span :class="['h-1.5 w-1.5 rounded-full', tour.isAvailable ? 'bg-white animate-pulse' : 'bg-slate-300']"></span>
              {{ tour.isAvailable ? 'Available' : 'Unavailable' }}
            </span>
            <div class="absolute right-3 top-3 rounded-full bg-white/95 px-3 py-1 text-sm font-bold text-amber-600 shadow">
              {{ priceFmt.format(tour.price) }}
            </div>
          </div>
          <div class="flex flex-1 flex-col p-5">
            <h3 class="text-lg font-bold text-slate-900 line-clamp-1">{{ tour.title }}</h3>
            <p class="mt-1 flex items-center gap-1.5 text-sm font-medium text-amber-600">
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              {{ tour.location }}
            </p>
            <p class="mt-3 text-sm text-slate-600 line-clamp-2">{{ tour.description }}</p>
            <dl class="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4 text-xs">
              <div><dt class="font-medium uppercase tracking-wider text-slate-400">Max guests</dt><dd class="mt-0.5 font-semibold text-slate-700">{{ tour.maxParticipants }}</dd></div>
              <div><dt class="font-medium uppercase tracking-wider text-slate-400">Price</dt><dd class="mt-0.5 font-semibold text-slate-700">{{ priceFmt.format(tour.price) }}</dd></div>
              <div><dt class="font-medium uppercase tracking-wider text-slate-400">Starts</dt><dd class="mt-0.5 font-semibold text-slate-700">{{ dateFmt(tour.startDate) }}</dd></div>
              <div><dt class="font-medium uppercase tracking-wider text-slate-400">Ends</dt><dd class="mt-0.5 font-semibold text-slate-700">{{ dateFmt(tour.endDate) }}</dd></div>
            </dl>
            <div class="mt-5 flex gap-2">
              <button type="button" @click="viewTour(tour)" class="flex-1 rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200">View</button>
              <button type="button" @click="editTour(tour)" class="flex-1 rounded-lg bg-amber-500 px-3 py-2 text-xs font-semibold text-white hover:bg-amber-600">Edit</button>
              <button type="button" @click="removeTour(tour)" :aria-label="'Delete ' + tour.title" class="rounded-lg bg-rose-50 px-3 py-2 text-rose-600 hover:bg-rose-100">
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-2 14a2 2 0 01-2 2H9a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a2 2 0 012-2h2a2 2 0 012 2v2"/></svg>
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>

</template>