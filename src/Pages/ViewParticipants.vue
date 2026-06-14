<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getTourParticipants, getMyTourById } from '@/services/toursService'
import {
  ArrowLeft,
  Users,
  UserCheck,
  CalendarDays,
  PieChart,
  Search,
  Download,
  Mail,
  AlertCircle,
  RefreshCw,
  Inbox,
} from 'lucide-vue-next'

// ---- Router ----
const route = useRoute()
const router = useRouter()
const tourId = computed(() => route.params.tourId)

// ---- State ----
const participants = ref([])
const loading = ref(true)
const error = ref(null)
const search = ref('')

const tour = ref(null)
tour.value = getMyTourById(tourId.value)

const capacity = computed(() => tour.value?.maxParticipants ?? 0)
console.log(capacity.value)

// ---- Fetching ----
async function fetchParticipants() {
  loading.value = true
  error.value = null
  try {
    participants.value = await getTourParticipants(tourId.value)
  } catch (e) {
    error.value = e.message || 'Failed to load participants'
  } finally {
    loading.value = false
  }
}

async function fetchTour() {
  try {
    tour.value = await getMyTourById(tourId.value)
    console.log('Tour loaded:', tour.value)
  } catch (err) {
    console.error(err)
  }
}

onMounted(async () => {
  await Promise.all([
    fetchTour(),
    fetchParticipants()
  ])
})

// ---- Derived ----
const filtered = computed(() => {
  const q = search.value.trim().toLowerCase()
  if (!q) return participants.value
  return participants.value.filter(
    (p) =>
      p.fullName?.toLowerCase().includes(q) ||
      p.email?.toLowerCase().includes(q),
  )
})

const totalBookings = computed(() => participants.value.length)
const totalPeople = computed(() =>
  participants.value.reduce((sum, p) => sum + (p.numberOfPeople || 0), 0),
)
const latestBooking = computed(() => {
  if (!participants.value.length) return null
  return participants.value
    .map((p) => new Date(p.bookingDate))
    .sort((a, b) => b - a)[0]
})
const capacityPct = computed(() =>
  Math.min(100, Math.round((totalPeople.value / capacity.value) * 100)),
)

// ---- Helpers ----
function formatDate(d) {
  if (!d) return '—'
  const date = typeof d === 'string' ? new Date(d) : d
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function isRecent(d) {
  if (!d) return false
  const diff = Date.now() - new Date(d).getTime()
  return diff < 24 * 60 * 60 * 1000
}

function initials(name) {
  return name
    ?.split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() || '?'
}

function exportCSV() {
  const headers = ['Full Name', 'Email', 'Number of People', 'Booking Date']
  const rows = filtered.value.map((p) => [
    p.fullName,
    p.email,
    p.numberOfPeople,
    formatDate(p.bookingDate),
  ])
  const csv = [headers, ...rows]
    .map((r) => r.map((c) => `"${String(c ?? '').replace(/"/g, '""')}"`).join(','))
    .join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `participants-${tourId.value}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

function goBack() {
  router.push(`/guide/tours/${tourId.value}`)
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <button
          @click="goBack"
          class="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-amber-600 transition-colors mb-4"
        >
          <ArrowLeft class="w-4 h-4" />
          Back to tour details
        </button>

        <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 class="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
              Tour Participants
            </h1>
            <p class="mt-2 text-gray-600">
              Manage and view all bookings for this tour
            </p>
          </div>
          <button
            @click="exportCSV"
            :disabled="!participants.length"
            class="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-700 font-medium shadow-sm hover:shadow-md hover:border-amber-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download class="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      <!-- Summary Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div class="relative overflow-hidden rounded-2xl bg-white p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
          <div class="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br from-amber-400/20 to-orange-500/20"></div>
          <div class="flex items-center justify-between relative">
            <div>
              <p class="text-sm text-gray-500">Total Bookings</p>
              <p class="text-2xl font-bold text-gray-900 mt-1">
                <span v-if="loading" class="inline-block h-7 w-12 bg-gray-200 rounded animate-pulse" />
                <span v-else>{{ totalBookings }}</span>
              </p>
            </div>
            <div class="p-3 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-md">
              <Users class="w-5 h-5" />
            </div>
          </div>
        </div>

        <div class="relative overflow-hidden rounded-2xl bg-white p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
          <div class="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br from-amber-400/20 to-orange-500/20"></div>
          <div class="flex items-center justify-between relative">
            <div>
              <p class="text-sm text-gray-500">Total Participants</p>
              <p class="text-2xl font-bold text-gray-900 mt-1">
                <span v-if="loading" class="inline-block h-7 w-12 bg-gray-200 rounded animate-pulse" />
                <span v-else>{{ totalPeople }}</span>
              </p>
            </div>
            <div class="p-3 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-md">
              <UserCheck class="w-5 h-5" />
            </div>
          </div>
        </div>

        <div class="relative overflow-hidden rounded-2xl bg-white p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
          <div class="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br from-amber-400/20 to-orange-500/20"></div>
          <div class="flex items-center justify-between relative">
            <div>
              <p class="text-sm text-gray-500">Latest Booking</p>
              <p class="text-lg font-semibold text-gray-900 mt-1">
                <span v-if="loading" class="inline-block h-6 w-20 bg-gray-200 rounded animate-pulse" />
                <span v-else>{{ formatDate(latestBooking) }}</span>
              </p>
            </div>
            <div class="p-3 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-md">
              <CalendarDays class="w-5 h-5" />
            </div>
          </div>
        </div>

        <div class="relative overflow-hidden rounded-2xl bg-white p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
          <div class="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br from-amber-400/20 to-orange-500/20"></div>
          <div class="flex items-center justify-between relative">
            <div class="flex-1">
              <p class="text-sm text-gray-500">Capacity</p>
              <p class="text-2xl font-bold text-gray-900 mt-1">
                <span v-if="loading" class="inline-block h-7 w-12 bg-gray-200 rounded animate-pulse" />
                <span v-else>{{ capacityPct }}%</span>
              </p>
              <div v-if="!loading" class="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  class="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all"
                  :style="{ width: capacityPct + '%' }"
                />
              </div>
            </div>
            <div class="p-3 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-md ml-3">
              <PieChart class="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      <!-- Main Card -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <!-- Toolbar -->
        <div class="p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 class="text-lg font-semibold text-gray-900">Participants</h2>
            <p class="text-sm text-gray-500">
              <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                {{ totalPeople }} people
              </span>
              across {{ totalBookings }} bookings
            </p>
          </div>
          <div class="relative w-full sm:w-72">
            <Search class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              v-model="search"
              type="text"
              placeholder="Search by name or email..."
              class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none text-sm transition"
            />
          </div>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="p-6 space-y-3">
          <p class="text-sm text-gray-500 mb-4">Loading participants...</p>
          <div v-for="i in 5" :key="i" class="flex items-center gap-4 p-3 rounded-xl bg-gray-50 animate-pulse">
            <div class="w-10 h-10 rounded-full bg-gray-200" />
            <div class="flex-1 space-y-2">
              <div class="h-3 w-1/3 bg-gray-200 rounded" />
              <div class="h-3 w-1/2 bg-gray-200 rounded" />
            </div>
            <div class="h-3 w-16 bg-gray-200 rounded" />
          </div>
        </div>

        <!-- Error -->
        <div v-else-if="error" class="p-12 text-center">
          <div class="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-50 text-red-500 mb-4">
            <AlertCircle class="w-7 h-7" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900">Couldn't load participants</h3>
          <p class="text-sm text-gray-500 mt-1">{{ error }}</p>
          <button
            @click="fetchParticipants"
            class="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-white font-medium shadow hover:shadow-md transition"
          >
            <RefreshCw class="w-4 h-4" />
            Retry
          </button>
        </div>

        <!-- Empty -->
        <div v-else-if="!filtered.length" class="p-12 text-center">
          <div class="inline-flex items-center justify-center w-14 h-14 rounded-full bg-amber-50 text-amber-500 mb-4">
            <Inbox class="w-7 h-7" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900">
            {{ search ? 'No matches found' : 'No participants yet' }}
          </h3>
          <p class="text-sm text-gray-500 mt-1">
            {{ search ? 'Try a different search term.' : 'Bookings will appear here once travelers join this tour.' }}
          </p>
        </div>

        <!-- Desktop Table -->
        <div v-else class="hidden md:block overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50/70">
              <tr class="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th class="px-6 py-3">Participant</th>
                <th class="px-6 py-3">Email</th>
                <th class="px-6 py-3">People</th>
                <th class="px-6 py-3">Booking Date</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr
                v-for="p in filtered"
                :key="p.bookingId"
                class="hover:bg-amber-50/40 transition-colors"
              >
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white font-semibold flex items-center justify-center text-sm shadow-sm">
                      {{ initials(p.fullName) }}
                    </div>
                    <div>
                      <div class="font-medium text-gray-900">{{ p.fullName }}</div>
                      <div v-if="isRecent(p.bookingDate)" class="text-xs text-amber-600 font-medium">
                        New · last 24h
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 text-sm text-gray-600">
                  <div class="flex items-center gap-2">
                    <Mail class="w-4 h-4 text-gray-400" />
                    {{ p.email }}
                  </div>
                </td>
                <td class="px-6 py-4">
                  <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
                    {{ p.numberOfPeople }} {{ p.numberOfPeople === 1 ? 'person' : 'people' }}
                  </span>
                </td>
                <td class="px-6 py-4 text-sm text-gray-600">
                  {{ formatDate(p.bookingDate) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Mobile Cards -->
        <div v-if="!loading && !error && filtered.length" class="md:hidden divide-y divide-gray-100">
          <div
            v-for="p in filtered"
            :key="p.bookingId"
            class="p-4 hover:bg-amber-50/40 transition-colors"
          >
            <div class="flex items-start gap-3">
              <div class="w-11 h-11 shrink-0 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white font-semibold flex items-center justify-center text-sm shadow-sm">
                {{ initials(p.fullName) }}
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between gap-2">
                  <div class="font-medium text-gray-900 truncate">{{ p.fullName }}</div>
                  <span class="shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
                    {{ p.numberOfPeople }}
                  </span>
                </div>
                <div class="text-sm text-gray-500 truncate flex items-center gap-1.5 mt-0.5">
                  <Mail class="w-3.5 h-3.5" />
                  {{ p.email }}
                </div>
                <div class="text-xs text-gray-400 mt-1 flex items-center gap-2">
                  <CalendarDays class="w-3.5 h-3.5" />
                  {{ formatDate(p.bookingDate) }}
                  <span v-if="isRecent(p.bookingDate)" class="text-amber-600 font-medium">· New</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
