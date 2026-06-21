<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'Tours', to: '/tours' },
  { label: 'Experiences', to: '/experiences' },
  { label: 'Guides', to: '/guides' },
  { label: 'Bookings', to: '/bookings' },
  { label: 'About', to: '/about' },
]

const categories = [
  { label: 'Cultural Tours', to: '/tours' },
  { label: 'River Cruises', to: '/tours' },
  { label: 'Wildlife & Safari', to: '/tours' },
  { label: 'Historical Sites', to: '/tours' },
  { label: 'Local Food Experiences', to: '/tours' },
]

const socials = [
  {
    name: 'Facebook',
    href: 'https://facebook.com/exploregambia',
    path: 'M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.5 2.9h-2.3v7A10 10 0 0 0 22 12z',
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/exploregambia',
    path: 'M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 3.3a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zm0 10.7a4.2 4.2 0 1 1 0-8.4 4.2 4.2 0 0 1 0 8.4zm6.8-10.9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z',
  },
  {
    name: 'X',
    href: 'https://x.com/exploregambia',
    path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z',
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/@exploregambia',
    path: 'M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z',
  },
]

const showTop = ref(false)
const onScroll = () => (showTop.value = window.scrollY > 400)
const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <footer class="relative bg-[#0b1f1c] text-slate-300">
    <!-- Subtle top gradient line -->
    <div class="h-px w-full bg-gradient-to-r from-transparent via-[#d4a857]/60 to-transparent" />

    <div class="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
      <div class="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
        <!-- Brand -->
        <div class="space-y-5">
          <router-link to="/" class="inline-flex items-center gap-2 group">
            <span
              class="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-teal-600 to-emerald-800 text-white font-bold shadow-lg shadow-emerald-900/40 transition-transform group-hover:scale-105"
            >EG</span>
            <span class="text-xl font-semibold tracking-tight text-white">
              Explore <span class="text-[#d4a857]">Gambia</span>
            </span>
          </router-link>
          <p class="text-sm leading-relaxed text-slate-400">
            Discover the Smiling Coast of Africa through authentic local experiences.
          </p>
          <div class="flex items-center gap-3 pt-1">
            <a
              v-for="s in socials"
              :key="s.name"
              :href="s.href"
              :aria-label="s.name"
              target="_blank"
              rel="noopener noreferrer"
              class="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-all duration-200 hover:scale-110 hover:border-[#d4a857]/60 hover:bg-[#d4a857]/10 hover:text-[#d4a857]"
            >
              <svg viewBox="0 0 24 24" class="h-4 w-4 fill-current" aria-hidden="true">
                <path :d="s.path" />
              </svg>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
            Quick Links
          </h3>
          <ul class="space-y-3 text-sm">
            <li v-for="l in quickLinks" :key="l.to">
              <router-link
                :to="l.to"
                class="inline-block text-slate-400 transition-all duration-200 hover:translate-x-1 hover:text-[#d4a857]"
              >{{ l.label }}</router-link>
            </li>
          </ul>
        </div>

        <!-- Explore Categories -->
        <div>
          <h3 class="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
            Explore
          </h3>
          <ul class="space-y-3 text-sm">
            <li v-for="c in categories" :key="c.to">
              <router-link
                :to="c.to"
                class="inline-block text-slate-400 transition-all duration-200 hover:translate-x-1 hover:text-[#d4a857]"
              >{{ c.label }}</router-link>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h3 class="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
            Contact
          </h3>
          <ul class="space-y-4 text-sm text-slate-400">
            <li class="flex items-start gap-3">
              <svg viewBox="0 0 24 24" class="mt-0.5 h-4 w-4 shrink-0 fill-current text-[#d4a857]" aria-hidden="true">
                <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              <a href="mailto:support@exploregambia.com" class="transition-colors hover:text-[#d4a857]">
                support@exploregambia.com
              </a>
            </li>
            <li class="flex items-start gap-3">
              <svg viewBox="0 0 24 24" class="mt-0.5 h-4 w-4 shrink-0 fill-current text-[#d4a857]" aria-hidden="true">
                <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .58 3.6 1 1 0 0 1-.25 1l-2.23 2.2z"/>
              </svg>
              <a href="tel:+2206147209" class="transition-colors hover:text-[#d4a857]">
                +220 6147209
              </a>
            </li>
            <li class="flex items-start gap-3">
              <svg viewBox="0 0 24 24" class="mt-0.5 h-4 w-4 shrink-0 fill-current text-[#d4a857]" aria-hidden="true">
                <path d="M12 2a8 8 0 0 0-8 8c0 5.5 8 12 8 12s8-6.5 8-12a8 8 0 0 0-8-8zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
              </svg>
              <span>The Gambia, West Africa</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Divider -->
      <div class="my-10 h-px w-full bg-white/10" />

      <!-- Bottom -->
      <div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p class="text-xs text-slate-500">
          &copy; 2026 Explore Gambia. All rights reserved.
        </p>
        <div class="flex items-center gap-6 text-xs text-slate-500">
          <router-link to="/privacy" class="transition-colors hover:text-[#d4a857]">Privacy</router-link>
          <router-link to="/terms" class="transition-colors hover:text-[#d4a857]">Terms</router-link>
          <router-link to="/cookies" class="transition-colors hover:text-[#d4a857]">Cookies</router-link>
        </div>
      </div>
    </div>

    <!-- Back to top -->
    <transition
      enter-active-class="transition duration-300"
      enter-from-class="opacity-0 translate-y-2"
      leave-active-class="transition duration-200"
      leave-to-class="opacity-0 translate-y-2"
    >
      <button
        v-show="showTop"
        @click="scrollTop"
        aria-label="Back to top"
        class="fixed bottom-6 right-6 z-50 grid h-11 w-11 place-items-center rounded-full bg-[#d4a857] text-[#0b1f1c] shadow-lg shadow-black/30 transition-transform hover:scale-110"
      >
        <svg viewBox="0 0 24 24" class="h-5 w-5 fill-current" aria-hidden="true">
          <path d="M12 4l-8 8h5v8h6v-8h5z" />
        </svg>
      </button>
    </transition>
  </footer>
</template>
