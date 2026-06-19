<script setup>
import { ref, onMounted, computed } from 'vue'

// ---------- State ----------
const activeNav = ref('dashboard')
const sidebarOpen = ref(false)
const loading = ref(true)


const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'M3 12l9-9 9 9M5 10v10h14V10' },
  { id: 'users', label: 'Users', icon: 'M16 11a4 4 0 10-8 0 4 4 0 008 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  { id: 'tours', label: 'Tours', icon: 'M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z' },
  { id: 'bookings', label: 'Bookings', icon: 'M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { id: 'payments', label: 'Payments', icon: 'M3 10h18M3 6h18v12H3zM7 15h2m4 0h4' },
]

const pageTitle = computed(() => navItems.find(n => n.id === activeNav.value)?.label || 'Dashboard')


function logout() {
  localStorage.removeItem('admin_token')
  window.location.href = '/login'
}



</script>
      <template>
            <!-- Sidebar -->
      <aside
        class="fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-100 shadow-sm transform transition-transform duration-200"
        :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
      >
        <div class="h-16 flex items-center gap-2 px-6 border-b border-gray-100">
          <div class="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold">EG</div>
          <div>
            <div class="font-semibold text-gray-900 leading-tight">Explore Gambia</div>
            <div class="text-[11px] text-gray-500 uppercase tracking-wider">Admin Panel</div>
          </div>
        </div>

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

        <div class="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-100">
          <button
            @click="logout"
            class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
            </svg>
            Logout
          </button>
        </div>
      </aside>

       <!-- Mobile sidebar overlay -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 bg-black/40 z-30 lg:hidden"
      @click="sidebarOpen = false"
    />
      </template>