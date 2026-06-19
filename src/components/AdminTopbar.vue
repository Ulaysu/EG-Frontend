<script setup>
const props = defineProps({
  pageTitle: {
    type: String,
    default: 'Dashboard'
  },

  admin: {
    type: Object,
    default: () => ({
      name: 'Admin User',
      email: 'admin@exploregambia.com'
    })
  }
})

const emit = defineEmits(['open-sidebar'])
</script>
<template>
    <!-- Topbar -->
        <header class="h-16 bg-white/80 backdrop-blur border-b border-gray-100 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-20">
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
        </header>
</template>