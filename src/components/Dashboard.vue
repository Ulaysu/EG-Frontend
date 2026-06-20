<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import {getDashboardStats, getRecentBookings, getRecentPayments,
  getUsers,
  updateUserStatus, getTours, softDeleteTour, restoreTour
} from  '@/services/adminService'


// ---------- State ----------
const activeNav = ref('dashboard')
const sidebarOpen = ref(false)
const loading = ref(true)
const usersLoading = ref(false)
const stats = ref({ totalUsers: 0, totalGuides: 0, totalTours: 0, totalBookings: 0, revenue: 0 })
const recentBookings = ref([])
const recentPayments = ref([])
const users = ref([])
const tours = ref([])
const toursLoading = ref(false)



const admin = ref({ name: 'Admin User', email: 'admin@exploregambia.com' })

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'M3 12l9-9 9 9M5 10v10h14V10' },
  { id: 'users', label: 'Users', icon: 'M16 11a4 4 0 10-8 0 4 4 0 008 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  { id: 'tours', label: 'Tours', icon: 'M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z' },
  { id: 'bookings', label: 'Bookings', icon: 'M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { id: 'payments', label: 'Payments', icon: 'M3 10h18M3 6h18v12H3zM7 15h2m4 0h4' },
]

const pageTitle = computed(() => navItems.find(n => n.id === activeNav.value)?.label || 'Dashboard')

// ---------- Data loading ----------
async function loadDashboard() {
   loading.value = true

  try {
    const [dashboard, bookings, payments] = await Promise.all([
      getDashboardStats(),
      getRecentBookings(),
      getRecentPayments()
    ])

    stats.value = {
      totalUsers: dashboard.totalUsers,
      totalGuides: dashboard.totalGuides,
      totalTours: dashboard.totalTours,
      totalBookings: dashboard.totalBookings,
      revenue: dashboard.revenue
    }

    recentBookings.value = bookings
    recentPayments.value = payments

  } catch (error) {
    console.error('Failed to load dashboard stats', error)
  } finally {
    loading.value = false
  }
}

// ---------- Users ----------
async function loadUsers() {
  usersLoading.value = true

  try {
    users.value = await getUsers()
  }
  catch (error) {
    console.error('Failed to load users', error)
  }
  finally {
    usersLoading.value = false
  }
}

async function loadTours() {
  toursLoading.value = true

  try {
    tours.value = await getTours()
  }
  catch (error) {
    console.error('Failed to load tours', error)
  }
  finally {
    toursLoading.value = false
  }
}

async function toggleUserStatus(user) {
  try {
    await updateUserStatus(
      user.id,
      !user.isActive
    )

    user.isActive = !user.isActive
  }
  catch (error) {
    console.error('Failed to update user status', error)
  }
}

// ---------- Watch Navigation ----------
watch(activeNav, async (newTab) => {
  if (newTab === 'users' && users.value.length === 0) {
    await loadUsers()
  }
  if (newTab === 'tours' && tours.value.length === 0) {
    await loadTours()
  }
})


async function toggleTourStatus(tour) {
  try {
    if (tour.isDeleted) {
      await restoreTour(tour.tourId)
      tour.isDeleted = false
    } else {
      await softDeleteTour(tour.tourId)
      tour.isDeleted = true
    }
  }
  catch (error) {
    console.error('Failed to update tour', error)
  }
}


function logout() {
  localStorage.removeItem('admin_token')
  window.location.href = '/login'
}

function formatCurrency(v) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v || 0)
}
function formatDate(d) {
  if (!d) return '-'
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
function statusClasses(s) {
  const v = (s || '').toLowerCase()
  if (['success', 'confirmed', 'paid', 'completed'].includes(v)) return 'bg-green-100 text-green-700'
  if (['pending', 'processing'].includes(v)) return 'bg-amber-100 text-amber-700'
  if (['failed', 'cancelled', 'canceled'].includes(v)) return 'bg-red-100 text-red-700'
  return 'bg-gray-100 text-gray-700'
}

const statCards = computed(() => [
  { label: 'Total Users',    value: stats.value.totalUsers,    accent: 'amber',    icon: 'M16 11a4 4 0 10-8 0 4 4 0 008 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  { label: 'Total Guides',   value: stats.value.totalGuides,   accent: 'orange',   icon: 'M12 2l2 5h5l-4 3 1.5 5L12 12l-4.5 3L9 10 5 7h5z' },
  { label: 'Total Tours',    value: stats.value.totalTours,    accent: 'amber',    icon: 'M9 20l-5.5-3V7L9 4l6 3 5.5-3v13L15 20l-6-3z' },
  { label: 'Total Bookings', value: stats.value.totalBookings, accent: 'orange',   icon: 'M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { label: 'Revenue',        value: stats.value.revenue,       accent: 'gradient', icon: 'M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6', isCurrency: true },
])

function cardAccent(a) {
  if (a === 'amber') return 'from-amber-50 to-white border-amber-200'
  if (a === 'orange') return 'from-orange-50 to-white border-orange-200'
  return 'from-amber-500 to-orange-600 border-transparent text-white'
}
function iconBg(a) {
  if (a === 'amber') return 'bg-amber-100 text-amber-600'
  if (a === 'orange') return 'bg-orange-100 text-orange-600'
  return 'bg-white/20 text-white'
}

onMounted(loadDashboard)
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-amber-50/40 via-white to-orange-50/30 text-gray-800">

  <button
    @click="sidebarOpen = true"
    class="fixed top-4 left-4 z-50 lg:hidden bg-amber-500 text-white p-3 rounded-lg shadow-lg"
  >
    <svg
      class="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
    >
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  </button>
    <!-- Mobile sidebar overlay -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 bg-black/40 z-30 lg:hidden"
      @click="sidebarOpen = false"
    />

    <div class="flex">
      <!-- Sidebar -->
      <aside
        class="fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-100 shadow-sm transform transition-transform duration-200"
        :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
      >
        <!----<div class="h-16 flex items-center gap-2 px-6 border-b border-gray-100">
          <div class="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold">EG</div>
          <div>
            <div class="font-semibold text-gray-900 leading-tight">Explore Gambia</div>
            <div class="text-[11px] text-gray-500 uppercase tracking-wider">Admin Panel</div>
          </div>
        </div>-->

        <nav class="p-3 space-y-1">
          <button
            v-for="item in navItems"
            :key="item.id"
            @click="activeNav = item.id; sidebarOpen = false"
            class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
            :class="activeNav === item.id
              ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md shadow-orange-500/20'
              : 'text-gray-600 hover:bg-amber-50 hover:text-amber-700'"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path :d="item.icon" />
            </svg>
            {{ item.label }}
          </button>
        </nav>

        <!---<div class="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-100">
          <button
            @click="logout"
            class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
            </svg>
            Logout
          </button>
        </div>-->
      </aside>

      <!-- Main -->
      <div class="flex-1 min-w-0 lg:ml-0">
        <!-- Topbar -->
        <!--<header class="h-16 bg-white/80 backdrop-blur border-b border-gray-100 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-20">
          <div class="flex items-center gap-3">
            <button class="lg:hidden p-2 rounded-md hover:bg-gray-100" @click="sidebarOpen = true">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
            <h1 class="text-lg lg:text-xl font-semibold text-gray-900">{{ pageTitle }}</h1>
          </div>
          <div class="flex items-center gap-3">
            <div class="hidden sm:block text-right">
              <div class="text-sm font-medium text-gray-900">{{ admin.name }}</div>
              <div class="text-xs text-gray-500">{{ admin.email }}</div>
            </div>
            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center font-semibold">
              {{ admin.name.charAt(0) }}
            </div>
          </div>
        </header>-->

        <!-- Content -->
        <main class="p-4 lg:p-8 space-y-8">
          <template v-if="activeNav === 'dashboard'">
            <!-- Stat cards -->
            <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <div
                v-for="card in statCards"
                :key="card.label"
                class="relative rounded-2xl border bg-gradient-to-br p-5 shadow-sm hover:shadow-md transition-shadow"
                :class="cardAccent(card.accent)"
              >
                <div class="flex items-start justify-between">
                  <div>
                    <p class="text-xs font-medium uppercase tracking-wider opacity-80">{{ card.label }}</p>
                    <p class="mt-2 text-3xl font-bold">
                      <span v-if="loading" class="inline-block w-20 h-7 rounded bg-current/20 animate-pulse" />
                      <span v-else>{{ card.isCurrency ? formatCurrency(card.value) : card.value.toLocaleString() }}</span>
                    </p>
                  </div>
                  <div class="w-10 h-10 rounded-xl flex items-center justify-center" :class="iconBg(card.accent)">
                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path :d="card.icon" />
                    </svg>
                  </div>
                </div>
              </div>
            </section>

            <!-- Tables -->
            <section class="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <!-- Recent Bookings -->
              <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                  <h2 class="font-semibold text-gray-900">Recent Bookings</h2>
                  <button class="text-xs font-medium text-orange-600 hover:text-orange-700">View all</button>
                </div>
                <div class="overflow-x-auto">
                  <table class="w-full text-sm">
                    <thead class="bg-amber-50/60 text-gray-600 text-xs uppercase tracking-wider">
                      <tr>
                        <th class="text-left px-6 py-3 font-medium">Tour</th>
                        <th class="text-left px-6 py-3 font-medium">Customer</th>
                        <th class="text-left px-6 py-3 font-medium">Status</th>
                        <th class="text-right px-6 py-3 font-medium">Amount</th>
                        <th class="text-right px-6 py-3 font-medium">Date</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                      <tr v-if="loading">
                        <td colspan="5" class="px-6 py-10 text-center text-gray-400">Loading...</td>
                      </tr>
                      <tr v-else-if="!recentBookings.length">
                        <td colspan="5" class="px-6 py-10 text-center text-gray-400">No bookings yet</td>
                      </tr>
                      <tr v-for="b in recentBookings" :key="b.bookingId" class="hover:bg-amber-50/50 transition-colors">
                        <td class="px-6 py-3 font-medium text-gray-900">{{ b.tourTitle }}</td>
                        <td class="px-6 py-3 text-gray-600">{{ b.customerName }}</td>
                        <td class="px-6 py-3"><span class="px-2 py-1 rounded-md text-xs font-semibold" :class="statusClasses(b.status)">{{ b.status }}</span></td>
                        <td class="px-6 py-3 text-right font-semibold">{{ formatCurrency(b.totalAmount) }}</td>
                        <td class="px-6 py-3 text-right text-gray-500">{{ formatDate(b.bookingDate) }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Recent Payments -->
              <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                  <h2 class="font-semibold text-gray-900">Recent Payments</h2>
                  <button class="text-xs font-medium text-orange-600 hover:text-orange-700">View all</button>
                </div>
                <div class="overflow-x-auto">
                  <table class="w-full text-sm">
                    <thead class="bg-amber-50/60 text-gray-600 text-xs uppercase tracking-wider">
                      <tr>
                        <th class="text-left px-6 py-3 font-medium">Payment ID</th>
                        <th class="text-left px-6 py-3 font-medium">Method</th>
                        <th class="text-left px-6 py-3 font-medium">Status</th>
                        <th class="text-right px-6 py-3 font-medium">Amount</th>
                        <th class="text-right px-6 py-3 font-medium">Date</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                      <tr v-if="loading">
                        <td colspan="5" class="px-6 py-10 text-center text-gray-400">Loading...</td>
                      </tr>
                      <tr v-else-if="!recentPayments.length">
                        <td colspan="5" class="px-6 py-10 text-center text-gray-400">No payments yet</td>
                      </tr>
                      <tr v-for="p in recentPayments" :key="p.paymentId" class="hover:bg-amber-50/50 transition-colors">
                        <td class="px-6 py-3 font-medium text-gray-900">{{ p.paymentId }}</td>
                        <td class="px-6 py-3 text-gray-600">{{ p.paymentMethod }}</td>
                        <td class="px-6 py-3"><span class="px-2 py-1 rounded-md text-xs font-semibold" :class="statusClasses(p.status)">{{ p.status }}</span></td>
                        <td class="px-6 py-3 text-right font-semibold">{{ formatCurrency(p.amount) }}</td>
                        <td class="px-6 py-3 text-right text-gray-500">{{ formatDate(p.paymentDate) }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </template>

            <template v-else-if="activeNav === 'tours'">
  <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

    <div class="px-6 py-4 border-b border-gray-100">
      <h2 class="font-semibold text-gray-900">
        Tour Management
      </h2>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-sm">

        <thead class="bg-amber-50/60">
          <tr>
            <th class="px-6 py-3 text-left">Tour</th>
            <th class="px-6 py-3 text-left">Guide</th>
            <th class="px-6 py-3 text-left">Location</th>
            <th class="px-6 py-3 text-right">Price</th>
            <th class="px-6 py-3 text-center">Available</th>
            <th class="px-6 py-3 text-center">Status</th>
            <th class="px-6 py-3 text-center">Action</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-100">

          <tr v-if="toursLoading">
            <td colspan="7" class="px-6 py-10 text-center">
              Loading tours...
            </td>
          </tr>

          <tr v-else-if="!tours.length">
            <td colspan="7" class="px-6 py-10 text-center">
              No tours found
            </td>
          </tr>

          <tr
            v-for="tour in tours"
            :key="tour.tourId"
            class="hover:bg-amber-50/50"
          >
            <td class="px-6 py-4">
              <div class="font-medium text-gray-900">
                {{ tour.title }}
              </div>
            </td>

            <td class="px-6 py-4">
              {{ tour.guideName }}
            </td>

            <td class="px-6 py-4">
              {{ tour.location }}
            </td>

            <td class="px-6 py-4 text-right font-medium">
              {{ formatCurrency(tour.price) }}
            </td>

            <td class="px-6 py-4 text-center">
              <span
                class="px-2 py-1 rounded-md text-xs font-semibold"
                :class="tour.isAvailable
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'"
              >
                {{ tour.isAvailable ? 'Available' : 'Unavailable' }}
              </span>
            </td>

            <td class="px-6 py-4 text-center">
              <span
                class="px-2 py-1 rounded-md text-xs font-semibold"
                :class="tour.isDeleted
                  ? 'bg-red-100 text-red-700'
                  : 'bg-green-100 text-green-700'"
              >
                {{ tour.isDeleted ? 'Deleted' : 'Active' }}
              </span>
            </td>

            <td class="px-6 py-4 text-center">
              <button
                @click="toggleTourStatus(tour)"
                class="font-medium"
                :class="tour.isDeleted
                  ? 'text-green-600 hover:text-green-700'
                  : 'text-red-600 hover:text-red-700'"
              >
                {{ tour.isDeleted ? 'Restore' : 'Delete' }}
              </button>
            </td>

          </tr>

        </tbody>

      </table>
    </div>

  </div>
</template>
            <template v-else-if="activeNav === 'bookings'"></template>
            <template v-else-if="activeNav === 'payments'"></template>
          <template v-else-if="activeNav === 'users'">
  <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

    <!-- Header -->
    <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
      <div>
        <h2 class="font-semibold text-gray-900 text-lg">Users</h2>
        <p class="text-sm text-gray-500">
          Manage registered users and account status
        </p>
      </div>

      <div class="text-sm text-gray-500">
        {{ users.length }} users
      </div>
    </div>

    <!-- Loading -->
    <div
      v-if="loadingUsers"
      class="p-10 text-center text-gray-400"
    >
      Loading users...
    </div>

    <!-- Empty State -->
    <div
      v-else-if="!users.length"
      class="p-10 text-center text-gray-400"
    >
      No users found.
    </div>

    <!-- Users Grid -->
    <div
      v-else
      class="divide-y divide-gray-100"
    >
      <div
        v-for="user in users"
        :key="user.id"
        class="flex flex-col lg:flex-row lg:items-center justify-between px-6 py-5 hover:bg-amber-50/40 transition"
      >
        <!-- User Info -->
        <div class="flex-1">
          <div class="flex items-center gap-3">

            <!-- Avatar -->
            <div
              class="w-11 h-11 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-semibold"
            >
              {{ user.email?.charAt(0).toUpperCase() }}
            </div>

            <div>
              <h3 class="font-semibold text-gray-900">
                {{ user.fullName }}
              </h3>

              <p class="text-sm text-gray-500">
                {{ user.email }}
              </p>
            </div>
          </div>
        </div>

        <!-- Roles -->
        <div class="mt-4 lg:mt-0 lg:w-52">
          <div class="flex flex-wrap gap-2">
            <span
              v-for="role in user.roles"
              :key="role"
              class="px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700"
            >
              {{ role }}
            </span>
          </div>
        </div>

        <!-- Status -->
        <div class="mt-4 lg:mt-0 lg:w-36">
          <span
            :class="
              user.isActive
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            "
            class="px-3 py-1 rounded-full text-xs font-semibold"
          >
            {{ user.isActive ? 'Active' : 'Disabled' }}
          </span>
        </div>

        <!-- Actions -->
        <div class="mt-4 lg:mt-0">
          <button
            @click="toggleUserStatus(user)"
            :class="
              user.isActive
                ? 'bg-red-50 text-red-600 hover:bg-red-100'
                : 'bg-green-50 text-green-600 hover:bg-green-100'
            "
            class="px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            {{ user.isActive ? 'Disable User' : 'Enable User' }}
          </button>
        </div>
      </div>
    </div>

  </div>
</template>
        </main>
      </div>
    </div>
  </div>
</template>
