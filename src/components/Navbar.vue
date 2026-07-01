<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Leaf, Menu, X } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/authStore'

const O = '#F97316'
const mobileMenuOpen = ref(false)
const router = useRouter()
const authStore = useAuthStore()

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

const handleLogout = async () => {
  authStore.logout()
  closeMobileMenu()
  await router.replace('/home')
}
</script>

<template>
  <nav class="fixed left-0 right-0 top-0 z-50 border-b border-orange-100/80 bg-white/96 shadow-sm backdrop-blur-lg">
    <div class="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-6">
      <router-link :to="{ name: 'home' }" class="group flex items-center gap-2.5">
        <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#F97316] to-orange-600 shadow-md shadow-orange-200 transition-transform group-hover:scale-105">
          <Leaf :size="17" class="text-white" />
        </div>
        <span class="font-['Poppins'] text-[17px] font-bold text-[#1E293B]">
          Explore <span :style="{ color: O }">Gambia</span>
        </span>
      </router-link>

      <div class="hidden items-center gap-8 lg:flex">
        <router-link :to="{ name: 'home' }" class="text-[13.5px] font-medium text-slate-600 transition-colors hover:text-[#F97316]">Home</router-link>
        <router-link
          v-if="!authStore.isAuthenticated || authStore.isUser"
          :to="{ name: 'tour' }"
          class="text-[13.5px] font-medium text-slate-600 transition-colors hover:text-[#F97316]"
        >
          Experiences
        </router-link>
        <router-link
          v-if="authStore.isGuide"
          :to="{ name: 'create-tour' }"
          class="text-[13.5px] font-medium text-slate-600 transition-colors hover:text-[#F97316]"
        >
          Become a Guide
        </router-link>
        <router-link
          v-if="authStore.isGuide"
          :to="{ name: 'guide-tours' }"
          class="text-[13.5px] font-medium text-slate-600 transition-colors hover:text-[#F97316]"
        >
          My Tours
        </router-link>
        <router-link
          v-if="authStore.isUser"
          :to="{ name: 'bookings' }"
          class="text-[13.5px] font-medium text-slate-600 transition-colors hover:text-[#F97316]"
        >
          Bookings
        </router-link>
        <router-link
          v-if="authStore.isAuthenticated"
          :to="{ name: 'profile' }"
          class="text-[13.5px] font-medium text-slate-600 transition-colors hover:text-[#F97316]"
        >
          Profile
        </router-link>
        <router-link
          v-if="authStore.isAdmin"
          :to="{ name: 'dashboard' }"
          class="text-[13.5px] font-medium text-slate-600 transition-colors hover:text-[#F97316]"
        >
          Dashboard
        </router-link>
      </div>

      <div class="hidden items-center gap-2 lg:flex">
        <template v-if="!authStore.isAuthenticated">
          <router-link :to="{ name: 'login' }" class="rounded-xl px-4 py-2 text-[13.5px] font-semibold text-slate-700 transition-all hover:bg-orange-50 hover:text-[#F97316]">
            Login
          </router-link>
          <router-link :to="{ name: 'signup' }" class="rounded-xl bg-[#F97316] px-5 py-2.5 text-[13.5px] font-bold text-white shadow-md shadow-orange-200 transition-all hover:bg-orange-500 hover:shadow-lg hover:shadow-orange-300">
            Sign Up
          </router-link>
        </template>
        <button
          v-else
          type="button"
          class="rounded-xl px-4 py-2 text-[13.5px] font-semibold text-slate-700 transition-all hover:bg-orange-50 hover:text-[#F97316]"
          @click="handleLogout"
        >
          Log Out
        </button>
      </div>

      <button class="p-1 lg:hidden" type="button" aria-label="Toggle navigation" @click="mobileMenuOpen = !mobileMenuOpen">
        <X v-if="mobileMenuOpen" :size="22" />
        <Menu v-else :size="22" />
      </button>
    </div>

    <div v-if="mobileMenuOpen" class="flex flex-col gap-4 border-t border-orange-100 bg-white px-6 py-5 shadow-lg lg:hidden">
      <router-link :to="{ name: 'home' }" class="text-sm font-semibold text-slate-700 transition-colors hover:text-[#F97316]" @click="closeMobileMenu">Home</router-link>
      <router-link
        v-if="!authStore.isAuthenticated || authStore.isUser"
        :to="{ name: 'tour' }"
        class="text-sm font-semibold text-slate-700 transition-colors hover:text-[#F97316]"
        @click="closeMobileMenu"
      >
        Experiences
      </router-link>
      <router-link
        v-if="authStore.isGuide"
        :to="{ name: 'create-tour' }"
        class="text-sm font-semibold text-slate-700 transition-colors hover:text-[#F97316]"
        @click="closeMobileMenu"
      >
        Become a Guide
      </router-link>
      <router-link
        v-if="authStore.isGuide"
        :to="{ name: 'guide-tours' }"
        class="text-sm font-semibold text-slate-700 transition-colors hover:text-[#F97316]"
        @click="closeMobileMenu"
      >
        My Tours
      </router-link>
      <router-link
        v-if="authStore.isUser"
        :to="{ name: 'bookings' }"
        class="text-sm font-semibold text-slate-700 transition-colors hover:text-[#F97316]"
        @click="closeMobileMenu"
      >
        Bookings
      </router-link>
      <router-link
        v-if="authStore.isAuthenticated"
        :to="{ name: 'profile' }"
        class="text-sm font-semibold text-slate-700 transition-colors hover:text-[#F97316]"
        @click="closeMobileMenu"
      >
        Profile
      </router-link>
      <router-link
        v-if="authStore.isAdmin"
        :to="{ name: 'dashboard' }"
        class="text-sm font-semibold text-slate-700 transition-colors hover:text-[#F97316]"
        @click="closeMobileMenu"
      >
        Dashboard
      </router-link>

      <div v-if="!authStore.isAuthenticated" class="mt-1 flex gap-3">
        <router-link :to="{ name: 'login' }" class="flex-1 rounded-xl border-2 border-[#F97316] py-2.5 text-center text-sm font-bold text-[#F97316] transition-all hover:bg-orange-50" @click="closeMobileMenu">
          Login
        </router-link>
        <router-link :to="{ name: 'signup' }" class="flex-1 rounded-xl bg-[#F97316] py-2.5 text-center text-sm font-bold text-white transition-all hover:bg-orange-500" @click="closeMobileMenu">
          Sign Up
        </router-link>
      </div>
      <button v-else type="button" class="rounded-xl border-2 border-[#F97316] py-2.5 text-sm font-bold text-[#F97316] transition-all hover:bg-orange-50" @click="handleLogout">
        Log Out
      </button>
    </div>
  </nav>
</template>
