<script setup>
import { Facebook, Instagram, Leaf, Twitter, Youtube } from 'lucide-vue-next'

const O = '#F97316'

const experienceLinks = ['Nature & Wildlife', 'Cultural Tours', 'Food & Cooking', 'Water Activities', 'Photography', 'Adventure']
const supportLinks = ['Help Center', 'Cancellation Policy', 'Safety Guidelines', 'Become a Guide', 'Guide Resources', 'Partnership']
const legalLinks = ['Privacy Policy', 'Terms of Service', 'Cookie Settings']
const socials = [Instagram, Facebook, Twitter, Youtube]
</script>

<template>
  <footer class="bg-[#1E293B] pb-8 pt-16">
    <div class="mx-auto max-w-7xl px-6">
      <div class="mb-14 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
        <div class="lg:col-span-2">
          <router-link :to="{ name: 'home' }" class="mb-5 flex items-center gap-2.5">
            <div class="flex h-9 w-9 items-center justify-center rounded-xl" :style="{ background: 'linear-gradient(135deg, #F97316, #ea580c)' }">
              <Leaf :size="17" class="text-white" />
            </div>
            <span class="font-['Poppins'] text-lg font-bold text-white">
              Explore <span :style="{ color: O }">Gambia</span>
            </span>
          </router-link>
          <p class="mb-7 max-w-xs text-sm leading-relaxed text-slate-400">
            The Smiling Coast's premier marketplace for authentic local experiences. Connecting curious travellers with passionate Gambian guides since 2022.
          </p>
          <div class="flex gap-2">
            <a
              v-for="(Icon, index) in socials"
              :key="index"
              href="#"
              class="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[.08] transition-all hover:scale-110 hover:bg-[#F97316]"
              aria-label="Social link"
            >
              <component :is="Icon" :size="15" class="text-white" />
            </a>
          </div>
        </div>

        <div>
          <h4 class="mb-5 font-['Poppins'] text-[11px] font-bold uppercase tracking-widest text-white/60">Experiences</h4>
          <ul class="space-y-3">
            <li v-for="link in experienceLinks" :key="link">
              <router-link :to="{ name: 'tour' }" class="text-sm text-slate-400 transition-colors hover:text-white">{{ link }}</router-link>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="mb-5 font-['Poppins'] text-[11px] font-bold uppercase tracking-widest text-white/60">Support</h4>
          <ul class="space-y-3">
            <li v-for="link in supportLinks" :key="link">
              <router-link :to="link === 'Become a Guide' ? { name: 'signup' } : { name: 'home' }" class="text-sm text-slate-400 transition-colors hover:text-white">
                {{ link }}
              </router-link>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="mb-5 font-['Poppins'] text-[11px] font-bold uppercase tracking-widest text-white/60">Newsletter</h4>
          <p class="mb-5 text-sm leading-relaxed text-slate-400">Weekly experience highlights and Gambia travel tips.</p>
          <div class="flex flex-col gap-2.5">
            <input
              type="email"
              placeholder="your@email.com"
              class="w-full rounded-xl border border-white/15 bg-white/[.06] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-slate-500 focus:border-[#F97316]"
            />
            <button class="w-full rounded-xl py-3 text-sm font-bold text-white transition-all hover:opacity-90" :style="{ background: 'linear-gradient(135deg, #F97316, #ea580c)' }">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div class="flex flex-col items-center justify-between gap-3 border-t border-white/[.08] pt-6 md:flex-row">
        <span class="text-xs text-slate-500">&copy; 2026 Explore Gambia Ltd. All rights reserved.</span>
        <div class="flex gap-6 text-xs">
          <router-link v-for="link in legalLinks" :key="link" :to="{ name: 'home' }" class="text-slate-500 transition-colors hover:text-slate-300">
            {{ link }}
          </router-link>
        </div>
      </div>
    </div>
  </footer>
</template>
