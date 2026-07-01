<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  ArrowRight,
  Baby,
  Bookmark,
  Calendar,
  Camera,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  CreditCard,
  Globe,
  Heart,
  Landmark,
  Leaf,
  MapPin,
  Music2,
  Search,
  Shield,
  Star,
  Users,
  UtensilsCrossed,
  Waves,
  Zap,
} from 'lucide-vue-next'

const router = useRouter()

const IMG = {
  hero: 'https://images.unsplash.com/photo-1751725081099-119939e1ae2b?w=1800&h=1000&fit=crop&auto=format',
  cruise: 'https://images.unsplash.com/photo-1528046652967-217fde4a4529?w=800&h=1100&fit=crop&auto=format',
  cultural: 'https://images.unsplash.com/photo-1603703182693-51a19941fa59?w=900&h=500&fit=crop&auto=format',
  birds: 'https://images.unsplash.com/photo-1615791773013-324387bbf7b0?w=600&h=420&fit=crop&auto=format',
  cooking: 'https://images.unsplash.com/photo-1765584829997-12ab011bb5b3?w=600&h=420&fit=crop&auto=format',
  beach: 'https://images.unsplash.com/photo-1690560561495-b745f2263ed8?w=560&h=400&fit=crop&auto=format',
  dance: 'https://images.unsplash.com/photo-1515657834497-26509e295154?w=560&h=400&fit=crop&auto=format',
  market: 'https://images.unsplash.com/photo-1734255026082-82fdc81991f0?w=560&h=400&fit=crop&auto=format',
  canoe: 'https://images.unsplash.com/photo-1649519764684-d4eb93e1322e?w=560&h=400&fit=crop&auto=format',
  festival: 'https://images.unsplash.com/photo-1515657241610-a6b33f0f6c5a?w=560&h=400&fit=crop&auto=format',
  guide: 'https://images.unsplash.com/photo-1699954993484-1731c83c3929?w=1600&h=700&fit=crop&auto=format',
  reviewer1: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&auto=format',
  reviewer2: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&auto=format',
  reviewer3: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&auto=format',
}

const O = '#F97316'
const G = '#15803D'
const B = '#0EA5E9'

const categories = [
  { name: 'Nature', icon: Leaf, color: '#15803D', bg: '#dcfce7' },
  { name: 'Culture', icon: Music2, color: '#7c3aed', bg: '#ede9fe' },
  { name: 'Adventure', icon: Zap, color: '#F97316', bg: '#ffedd5' },
  { name: 'Food', icon: UtensilsCrossed, color: '#b45309', bg: '#fef3c7' },
  { name: 'Photography', icon: Camera, color: '#0EA5E9', bg: '#e0f2fe' },
  { name: 'History', icon: Landmark, color: '#be123c', bg: '#ffe4e6' },
  { name: 'Water', icon: Waves, color: '#0284c7', bg: '#dbeafe' },
  { name: 'Family', icon: Baby, color: '#d97706', bg: '#fef9c3' },
]

const popular = [
  { id: 5, title: 'Sunset Beach Horse Riding', location: 'Kololi Beach', rating: 4.9, price: 55, guide: 'Musa Dibba', img: IMG.beach, cat: 'Adventure' },
  { id: 6, title: 'West African Dance & Drumming', location: 'Banjul Old Town', rating: 4.8, price: 25, guide: 'Adama Kouyate', img: IMG.dance, cat: 'Culture' },
  { id: 7, title: 'Photography Walk - Hidden Markets', location: 'Serrekunda Market', rating: 4.7, price: 40, guide: 'Yankuba Sanneh', img: IMG.market, cat: 'Photography' },
  { id: 8, title: 'River Gambia Canoe Journey', location: 'Tendaba Camp', rating: 4.9, price: 60, guide: 'Ebrima Baldeh', img: IMG.canoe, cat: 'Water Activities' },
  { id: 9, title: 'Traditional Festival Experience', location: 'Farafenni', rating: 4.6, price: 32, guide: 'Mariama Darboe', img: IMG.festival, cat: 'Culture' },
]

const reviews = [
  {
    name: 'Sophie Andersson',
    country: 'Sweden',
    photo: IMG.reviewer1,
    rating: 5,
    experience: 'River Gambia Cruise',
    text: 'The River Gambia cruise was absolutely magical. Lamin knew every bird by name and the sunset was something I will carry with me forever. Nothing like the packaged tours back home.',
  },
  {
    name: 'James Okafor',
    country: 'Nigeria',
    photo: IMG.reviewer2,
    rating: 5,
    experience: 'Cooking With Locals',
    text: 'Fatou welcomed us into her family home, taught us to cook Benachin, and told us stories of her grandmother. It was the kind of travel experience you dream of but rarely find.',
  },
  {
    name: 'Clara Mendes',
    country: 'Portugal',
    photo: IMG.reviewer3,
    rating: 5,
    experience: 'Mandinka Cultural Experience',
    text: 'The Smiling Coast lives up to its name. Every single person we met through Explore Gambia made us feel like honoured guests. Booking was instant, guides were punctual and passionate.',
  },
]

const featuredSmall = [
  {
    img: IMG.cultural,
    cat: 'Culture',
    title: 'Mandinka Cultural Village Experience',
    location: 'Brikama',
    rating: 4.8,
    reviews: 189,
    price: 35,
    gridClass: 'lg:col-start-2 lg:col-end-4 lg:row-start-1',
  },
  {
    img: IMG.birds,
    cat: 'Nature',
    title: 'Bird Watching Safari at Abuko Reserve',
    location: 'Abuko Nature Reserve',
    rating: 4.7,
    reviews: 241,
    price: 30,
    gridClass: 'lg:col-start-2 lg:row-start-2',
  },
  {
    img: IMG.cooking,
    cat: 'Food',
    title: 'Cooking With Locals - Benachin & Domoda',
    location: 'Serrekunda',
    rating: 5.0,
    reviews: 98,
    price: 28,
    gridClass: 'lg:col-start-3 lg:row-start-2',
  },
]

const promises = [
  {
    icon: Shield,
    title: 'Verified Local Guides',
    desc: 'Every guide is background-checked, trained, and passionate about sharing authentic Gambian culture with the world.',
    color: O,
    accent: O,
    bg: 'linear-gradient(145deg, #fff7ed, #ffedd5)',
    shape: 'shield',
  },
  {
    icon: CreditCard,
    title: 'Secure Online Booking',
    desc: 'Bank-grade encryption on every transaction. Pay with card, mobile money, or PayPal - fully protected.',
    color: B,
    accent: B,
    bg: 'linear-gradient(145deg, #f0f9ff, #e0f2fe)',
    shape: 'card',
  },
  {
    icon: Heart,
    title: 'Authentic Experiences',
    desc: 'No tourist traps. We work directly with communities to offer experiences you cannot find in any brochure.',
    color: '#be123c',
    accent: '#be123c',
    bg: 'linear-gradient(145deg, #fff1f2, #ffe4e6)',
    shape: 'heart',
  },
  {
    icon: Clock,
    title: 'Instant Confirmation',
    desc: 'Your booking is confirmed within seconds. A detailed itinerary and guide contact arrive in your inbox immediately.',
    color: G,
    accent: G,
    bg: 'linear-gradient(145deg, #f0fdf4, #dcfce7)',
    shape: 'clock',
  },
]

const stats = [
  { num: '2,400+', label: 'Experiences' },
  { num: '380+', label: 'Local Guides' },
  { num: '48K+', label: 'Happy Travellers' },
  { num: '4.9 *', label: 'Average Rating' },
]

const dest = ref('')
const cat = ref('')
const activeReview = ref(0)
const savedIds = ref(new Set())
const scrollRef = ref(null)

const goTours = () => router.push('/tours')
const goSignup = () => router.push('/signup')
const slide = (dir) => scrollRef.value?.scrollBy({ left: dir === 'r' ? 300 : -300, behavior: 'smooth' })
const toggleSaved = (id) => {
  const next = new Set(savedIds.value)
  next.has(id) ? next.delete(id) : next.add(id)
  savedIds.value = next
}
const previousReview = () => {
  activeReview.value = (activeReview.value - 1 + reviews.length) % reviews.length
}
const nextReview = () => {
  activeReview.value = (activeReview.value + 1) % reviews.length
}
</script>

<template>
  <div class="min-h-screen overflow-x-hidden bg-[#FFFBF5] font-['Inter'] text-[#1E293B]">
    <section class="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-slate-900">
        <img :src="IMG.hero" alt="River Gambia at golden hour with traditional wooden boats" class="h-full w-full object-cover opacity-75" />
        <div class="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent via-40% to-black/80" />
        <div class="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
      </div>

      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute left-1/4 top-1/3 h-96 w-96 rounded-full opacity-10 blur-3xl" :style="{ background: 'radial-gradient(circle, #F97316, transparent)' }" />
        <div class="absolute bottom-1/3 right-1/4 h-72 w-72 rounded-full opacity-[.08] blur-3xl" :style="{ background: 'radial-gradient(circle, #0EA5E9, transparent)' }" />
      </div>

      <div class="relative z-10 mx-auto w-full max-w-5xl px-6 pb-6 pt-28 text-center">
        <div class="mb-8 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-5 py-2.5 text-xs font-bold text-white shadow-lg backdrop-blur-md">
          <span class="h-2 w-2 animate-pulse rounded-full" :style="{ backgroundColor: O }" />
          <span>The Smiling Coast of Africa</span>
          <span class="mx-1 opacity-40">.</span>
          <span class="opacity-75">48,000+ travellers</span>
        </div>

        <h1 class="mb-7 font-['Poppins'] text-[clamp(2.6rem,6vw,5.5rem)] font-black leading-[1.04] text-white">
          Discover Authentic<br />
          <span :style="{ color: O }">Experiences</span>
          <span class="text-white/90"> Across</span><br />
          The Gambia
        </h1>

        <p class="mx-auto mb-12 max-w-2xl text-[clamp(1rem,2vw,1.2rem)] leading-relaxed text-white/80">
          Book unforgettable adventures, cultural experiences, food tours and nature escapes with trusted local guides.
        </p>

        <div class="mx-auto max-w-4xl rounded-2xl bg-white p-2.5 shadow-2xl shadow-black/30">
          <div class="flex flex-col gap-1 md:flex-row">
            <div class="group/field flex flex-[1.2] cursor-text items-center gap-3 rounded-xl px-4 py-3.5 transition-colors hover:bg-orange-50/80">
              <div class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg transition-colors" :style="{ backgroundColor: '#ffedd5' }">
                <MapPin :size="15" :style="{ color: O }" />
              </div>
              <div class="min-w-0 flex-1 text-left">
                <div class="mb-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-400">Destination</div>
                <input v-model="dest" placeholder="Where in Gambia?" class="w-full bg-transparent text-[13.5px] font-semibold text-[#1E293B] outline-none placeholder:text-slate-400" />
              </div>
            </div>

            <div class="my-2 hidden w-px bg-slate-100 md:block" />

            <div class="flex flex-1 cursor-pointer items-center gap-3 rounded-xl px-4 py-3.5 transition-colors hover:bg-orange-50/80">
              <div class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg" :style="{ backgroundColor: '#e0f2fe' }">
                <Globe :size="15" :style="{ color: B }" />
              </div>
              <div class="flex-1 text-left">
                <div class="mb-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-400">Category</div>
                <select v-model="cat" class="w-full cursor-pointer appearance-none bg-transparent text-[13.5px] font-semibold text-[#1E293B] outline-none">
                  <option value="">All experiences</option>
                  <option v-for="category in categories" :key="category.name" :value="category.name">{{ category.name }}</option>
                </select>
              </div>
            </div>

            <div class="my-2 hidden w-px bg-slate-100 md:block" />

            <div class="flex flex-1 cursor-pointer items-center gap-3 rounded-xl px-4 py-3.5 transition-colors hover:bg-orange-50/80">
              <div class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg" :style="{ backgroundColor: '#dcfce7' }">
                <Calendar :size="15" :style="{ color: G }" />
              </div>
              <div class="flex-1 text-left">
                <div class="mb-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-400">Date</div>
                <input type="date" class="w-full bg-transparent text-[13.5px] font-semibold text-[#1E293B] outline-none" />
              </div>
            </div>

            <div class="my-2 hidden w-px bg-slate-100 md:block" />

            <div class="flex flex-1 cursor-pointer items-center gap-3 rounded-xl px-4 py-3.5 transition-colors hover:bg-orange-50/80">
              <div class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg" :style="{ backgroundColor: '#fef3c7' }">
                <Users :size="15" :style="{ color: '#b45309' }" />
              </div>
              <div class="flex-1 text-left">
                <div class="mb-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-400">Guests</div>
                <select class="w-full cursor-pointer appearance-none bg-transparent text-[13.5px] font-semibold text-[#1E293B] outline-none">
                  <option v-for="n in [1, 2, 3, 4, 5, 6, '7+']" :key="n" :value="n">
                    {{ n }} {{ n === 1 ? 'guest' : 'guests' }}
                  </option>
                </select>
              </div>
            </div>

            <button
              class="flex flex-shrink-0 items-center justify-center gap-2.5 rounded-xl px-8 py-4 font-bold text-white shadow-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-xl active:scale-95"
              :style="{ background: 'linear-gradient(135deg, #F97316, #ea580c)', boxShadow: '0 8px 24px rgba(249,115,22,.35)' }"
              @click="goTours"
            >
              <Search :size="16" />
              <span class="text-[13.5px]">Explore</span>
            </button>
          </div>
        </div>
      </div>

      <div class="relative z-10 w-full max-w-4xl px-6 pb-14">
        <div class="mt-8 flex flex-wrap justify-center gap-x-10 gap-y-4">
          <div v-for="stat in stats" :key="stat.label" class="text-center">
            <div class="font-['Poppins'] text-2xl font-black leading-none text-white">{{ stat.num }}</div>
            <div class="mt-1 text-xs font-medium text-white/50">{{ stat.label }}</div>
          </div>
        </div>
      </div>

      <div class="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 opacity-40">
        <div class="h-8 w-px animate-pulse bg-white" />
        <span class="text-[10px] font-semibold uppercase tracking-widest text-white">Scroll</span>
      </div>
    </section>

    <section class="py-24">
      <div class="mx-auto max-w-7xl px-6">
        <div class="mb-12 flex items-end justify-between">
          <div>
            <p class="mb-3 text-xs font-bold uppercase tracking-widest" :style="{ color: O }">Hand-picked for you</p>
            <h2 class="font-['Poppins'] text-[clamp(2rem,4vw,3.25rem)] font-black leading-tight text-[#1E293B]">Featured<br />Experiences</h2>
          </div>
          <button class="hidden items-center gap-2 text-sm font-bold transition-all hover:gap-3 md:flex" :style="{ color: O }" @click="goTours">
            View all <ArrowRight :size="15" />
          </button>
        </div>

        <div class="grid gap-5 lg:grid-cols-3 lg:grid-rows-[320px_320px]">
          <div class="lg:col-start-1 lg:row-start-1 lg:row-end-3">
            <div class="group relative min-h-[500px] h-full w-full cursor-pointer overflow-hidden rounded-3xl bg-slate-200">
              <img :src="IMG.cruise" alt="River Gambia Sunset Cruise" class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <div class="absolute left-5 right-5 top-5 flex items-start justify-between">
                <span class="rounded-full border border-white/30 bg-white/25 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-sm">Water Activities</span>
                <div class="rounded-xl border border-white/30 bg-white/20 px-3 py-1.5 text-center backdrop-blur-sm">
                  <div class="text-[10px] font-medium text-white/70">from</div>
                  <div class="font-['Poppins'] text-xl font-bold leading-none text-white">$45</div>
                </div>
              </div>
              <div class="absolute bottom-0 left-0 right-0 p-6">
                <h3 class="mb-1.5 font-['Poppins'] text-2xl font-bold leading-snug text-white">River Gambia Sunset Cruise</h3>
                <div class="mb-3 flex items-center gap-1.5 text-sm text-white/70">
                  <MapPin :size="12" />
                  <span>Janjanbureh Island</span>
                </div>
                <div class="mb-4 flex items-center justify-between">
                  <div class="flex items-center gap-1.5">
                    <span class="flex items-center gap-0.5">
                      <Star v-for="s in 5" :key="s" :size="12" :fill="O" :stroke="O" />
                    </span>
                    <span class="text-sm font-semibold text-white/80">4.9</span>
                    <span class="text-xs text-white/50">(312 reviews)</span>
                  </div>
                  <div class="flex items-center gap-1.5 text-xs text-white/60">
                    <Globe :size="12" />
                    <span>Lamin Touray</span>
                  </div>
                </div>
                <button class="w-full rounded-xl bg-[#F97316] py-3 text-sm font-bold text-white shadow-lg shadow-orange-900/30 transition-all duration-200 hover:bg-orange-400" @click="goTours">
                  Book Now - $45
                </button>
              </div>
            </div>
          </div>

          <div v-for="item in featuredSmall" :key="item.title" :class="item.gridClass">
            <div class="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl bg-slate-100 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl">
              <div class="relative h-[190px] overflow-hidden">
                <img :src="item.img" :alt="item.title" class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div class="absolute left-3 top-3">
                  <span class="rounded-full border border-white/30 bg-white/25 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-sm">{{ item.cat }}</span>
                </div>
                <div class="absolute bottom-3 right-3 rounded-lg bg-white/90 px-2.5 py-1 text-center backdrop-blur-sm">
                  <div class="text-[9px] text-slate-500">from</div>
                  <div class="font-['Poppins'] text-base font-bold leading-none text-[#F97316]">${{ item.price }}</div>
                </div>
              </div>
              <div class="flex flex-1 flex-col bg-white p-4">
                <h4 class="mb-1 font-['Poppins'] text-sm font-bold leading-snug text-[#1E293B]">{{ item.title }}</h4>
                <div class="mb-auto flex items-center gap-1 pb-3 text-xs text-slate-400">
                  <MapPin :size="10" />
                  <span>{{ item.location }}</span>
                </div>
                <div class="flex items-center justify-between border-t border-slate-100 pt-3">
                  <div class="flex items-center gap-1">
                    <Star v-for="s in 5" :key="s" :size="10" :fill="s <= Math.round(item.rating) ? O : 'none'" :stroke="s <= Math.round(item.rating) ? O : '#cbd5e1'" />
                    <span class="text-xs font-semibold text-slate-600">{{ item.rating }}</span>
                    <span class="text-xs text-slate-400">({{ item.reviews }})</span>
                  </div>
                  <button class="text-xs font-bold text-[#F97316] hover:underline" @click="goTours">Book Now</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-8 flex justify-center md:hidden">
          <button class="flex items-center gap-2 text-sm font-bold" :style="{ color: O }" @click="goTours">
            View all experiences <ArrowRight :size="15" />
          </button>
        </div>
      </div>
    </section>

    <section class="bg-white py-20">
      <div class="mx-auto max-w-7xl px-6">
        <div class="mb-14 text-center">
          <p class="mb-3 text-xs font-bold uppercase tracking-widest" :style="{ color: O }">Find your passion</p>
          <h2 class="font-['Poppins'] text-4xl font-black text-[#1E293B] md:text-5xl">Browse by Category</h2>
        </div>
        <div class="grid grid-cols-4 gap-3 md:grid-cols-8 md:gap-6">
          <button v-for="category in categories" :key="category.name" class="group flex flex-col items-center gap-3" @click="goTours">
            <div class="flex h-16 w-16 items-center justify-center rounded-full shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl md:h-[86px] md:w-[86px]" :style="{ backgroundColor: category.bg }">
              <component :is="category.icon" :size="32" :style="{ color: category.color }" />
            </div>
            <span class="text-center text-xs font-bold leading-tight text-slate-600 transition-colors group-hover:text-[#F97316] md:text-[13px]">{{ category.name }}</span>
          </button>
        </div>
      </div>
    </section>

    <section class="py-20">
      <div class="mx-auto max-w-7xl px-6">
        <div class="mb-10 flex items-end justify-between">
          <div>
            <p class="mb-3 text-xs font-bold uppercase tracking-widest" :style="{ color: O }">Trending now</p>
            <h2 class="font-['Poppins'] text-4xl font-black text-[#1E293B]">Popular This Week</h2>
          </div>
          <div class="flex gap-2">
            <button class="flex h-11 w-11 items-center justify-center rounded-full border-2 border-slate-200 bg-white shadow-sm transition-all hover:border-[#F97316] hover:text-[#F97316]" @click="slide('l')">
              <ChevronLeft :size="18" />
            </button>
            <button class="flex h-11 w-11 items-center justify-center rounded-full text-white shadow-lg transition-all" :style="{ backgroundColor: O, boxShadow: '0 4px 14px rgba(249,115,22,.4)' }" @click="slide('r')">
              <ChevronRight :size="18" />
            </button>
          </div>
        </div>

        <div ref="scrollRef" class="-mx-2 flex gap-5 overflow-x-auto px-2 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div v-for="exp in popular" :key="exp.id" class="group w-[280px] flex-shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div class="relative h-[196px] overflow-hidden">
              <img :src="exp.img" :alt="exp.title" class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <button class="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 shadow-md transition-all hover:scale-110 active:scale-95" @click.stop="toggleSaved(exp.id)">
                <Bookmark :size="14" :fill="savedIds.has(exp.id) ? O : 'none'" :stroke="savedIds.has(exp.id) ? O : '#64748b'" />
              </button>
              <div class="absolute left-3 top-3">
                <span class="rounded-full border border-white/30 bg-white/25 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-sm">{{ exp.cat }}</span>
              </div>
            </div>
            <div class="p-4">
              <h4 class="mb-1 font-['Poppins'] text-sm font-bold leading-snug text-[#1E293B]">{{ exp.title }}</h4>
              <div class="mb-3 flex items-center gap-1 text-xs text-slate-400">
                <MapPin :size="10" />
                <span>{{ exp.location }}</span>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-1.5">
                  <Star :size="12" :fill="O" :stroke="O" />
                  <span class="text-sm font-bold text-[#1E293B]">{{ exp.rating }}</span>
                  <span class="text-xs text-slate-400">- {{ exp.guide }}</span>
                </div>
                <div>
                  <span class="text-xs text-slate-400">from </span>
                  <span class="font-['Poppins'] text-base font-bold text-[#F97316]">${{ exp.price }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-24" :style="{ background: 'linear-gradient(160deg, #FFFBF5 0%, #fff7ed 60%, #FFFBF5 100%)' }">
      <div class="mx-auto max-w-7xl px-6">
        <div class="mb-16 text-center">
          <p class="mb-3 text-xs font-bold uppercase tracking-widest" :style="{ color: O }">Our promise to you</p>
          <h2 class="font-['Poppins'] text-4xl font-black text-[#1E293B] md:text-5xl">Why Choose<br />Explore Gambia</h2>
        </div>
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="promise in promises" :key="promise.title" class="group relative cursor-default overflow-hidden rounded-3xl transition-all duration-400 hover:-translate-y-2 hover:shadow-2xl" :style="{ background: promise.bg }">
            <div class="pointer-events-none absolute -right-4 -top-4 opacity-10">
              <svg width="140" height="140" viewBox="0 0 140 140" fill="none" aria-hidden="true">
                <circle v-if="promise.shape !== 'card'" cx="90" cy="50" r="60" :fill="promise.color" />
                <circle v-if="promise.shape !== 'card'" cx="30" cy="100" r="35" :fill="promise.color" />
                <rect v-if="promise.shape === 'card'" x="20" y="20" width="100" height="100" rx="50" :fill="promise.color" />
                <circle v-if="promise.shape === 'card'" cx="110" cy="110" r="30" :fill="promise.color" />
              </svg>
            </div>
            <div class="relative z-10 p-7">
              <div class="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110" :style="{ backgroundColor: promise.color }">
                <component :is="promise.icon" :size="28" class="text-white" />
              </div>
              <h3 class="mb-3 font-['Poppins'] text-lg font-bold leading-snug text-[#1E293B]">{{ promise.title }}</h3>
              <p class="text-sm leading-relaxed text-slate-500">{{ promise.desc }}</p>
              <div class="mt-6 h-0.5 w-8 rounded-full transition-all duration-300 group-hover:w-16" :style="{ backgroundColor: promise.accent }" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-white py-24">
      <div class="mx-auto max-w-5xl px-6">
        <div class="mb-16 text-center">
          <p class="mb-3 text-xs font-bold uppercase tracking-widest" :style="{ color: O }">Travellers love us</p>
          <h2 class="mb-6 font-['Poppins'] text-4xl font-black text-[#1E293B] md:text-5xl">Real Stories</h2>
          <div class="inline-flex items-center gap-3 rounded-2xl border border-orange-100 bg-[#FFFBF5] px-6 py-4">
            <div class="flex">
              <Star v-for="s in 5" :key="s" :size="18" :fill="O" :stroke="O" />
            </div>
            <div class="h-6 w-px bg-orange-200" />
            <span class="font-['Poppins'] text-2xl font-black text-[#1E293B]">4.9</span>
            <span class="text-sm text-slate-500">from 2,400+ reviews</span>
          </div>
        </div>

        <div class="relative">
          <div class="relative overflow-hidden rounded-3xl border border-orange-100 bg-[#FFFBF5] p-10 shadow-sm md:p-14">
            <div class="absolute right-10 top-8 select-none font-['Poppins'] text-[180px] font-black leading-none text-[#F97316] opacity-[.06]">"</div>
            <div class="mb-8 flex items-start gap-5">
              <img :src="reviews[activeReview].photo" :alt="reviews[activeReview].name" class="h-16 w-16 flex-shrink-0 rounded-2xl object-cover shadow-md" />
              <div>
                <span class="flex items-center gap-0.5">
                  <Star v-for="s in 5" :key="s" :size="15" :fill="s <= reviews[activeReview].rating ? O : 'none'" :stroke="s <= reviews[activeReview].rating ? O : '#cbd5e1'" />
                </span>
                <div class="mt-1 font-['Poppins'] text-lg font-bold text-[#1E293B]">{{ reviews[activeReview].name }}</div>
                <div class="text-sm text-slate-500">{{ reviews[activeReview].country }}</div>
                <div class="mt-1 text-xs font-semibold" :style="{ color: O }">Verified - {{ reviews[activeReview].experience }}</div>
              </div>
            </div>
            <p class="relative z-10 text-xl font-medium leading-relaxed text-[#1E293B] italic md:text-2xl">"{{ reviews[activeReview].text }}"</p>
          </div>

          <div class="mt-8 flex items-center justify-between">
            <div class="flex gap-2">
              <button
                v-for="(_, i) in reviews"
                :key="i"
                class="h-2.5 rounded-full transition-all duration-300"
                :class="i === activeReview ? 'w-10 bg-[#F97316]' : 'w-2.5 bg-orange-200 hover:bg-orange-300'"
                @click="activeReview = i"
              />
            </div>
            <div class="flex gap-2">
              <button class="flex h-10 w-10 items-center justify-center rounded-full border-2 border-slate-200 bg-white shadow-sm transition-all hover:border-[#F97316] hover:text-[#F97316]" @click="previousReview">
                <ChevronLeft :size="17" />
              </button>
              <button class="flex h-10 w-10 items-center justify-center rounded-full text-white transition-all" :style="{ backgroundColor: O }" @click="nextReview">
                <ChevronRight :size="17" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="relative min-h-[520px] overflow-hidden">
      <div class="absolute inset-0 bg-slate-900">
        <img :src="IMG.guide" alt="Smiling Gambian guide on the beach with tourists" class="h-full w-full object-cover opacity-45" />
        <div class="absolute inset-0" :style="{ background: 'linear-gradient(100deg, rgba(0,0,0,.85) 0%, rgba(0,0,0,.55) 55%, rgba(0,0,0,.1) 100%)' }" />
      </div>
      <div class="absolute inset-y-0 left-0 w-1 opacity-60" :style="{ background: 'linear-gradient(to bottom, #F97316, #ea580c, #F97316)' }" />
      <div class="relative z-10 mx-auto flex max-w-7xl items-center px-6 py-24">
        <div class="max-w-xl">
          <p class="mb-5 text-xs font-bold uppercase tracking-widest" :style="{ color: O }">For local experts</p>
          <h2 class="mb-6 font-['Poppins'] text-[clamp(2.2rem,5vw,3.75rem)] font-black leading-tight text-white">Turn Your Passion<br />Into Income</h2>
          <p class="mb-10 max-w-md text-lg leading-relaxed text-white/75">
            Share your culture and create unforgettable experiences for visitors from around the world. Join 380+ guides already earning on Explore Gambia.
          </p>
          <div class="mb-10 flex flex-col gap-3">
            <div v-for="perk in ['Set your own schedule and availability', 'Keep 85% of every booking', 'Free onboarding support and training']" :key="perk" class="flex items-center gap-3">
              <div class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full" :style="{ backgroundColor: O }">
                <Check :size="12" class="text-white" />
              </div>
              <span class="text-[15px] text-white/80">{{ perk }}</span>
            </div>
          </div>
          <div class="flex flex-wrap gap-4">
            <button class="flex items-center gap-2.5 rounded-xl px-8 py-4 text-base font-bold text-white transition-all duration-200 hover:scale-105 hover:shadow-2xl" :style="{ background: 'linear-gradient(135deg, #F97316, #ea580c)', boxShadow: '0 8px 28px rgba(249,115,22,.45)' }" @click="goSignup">
              Become a Guide <ArrowRight :size="18" />
            </button>
            <button class="flex items-center gap-2 rounded-xl border border-white/20 px-4 py-4 text-sm font-semibold text-white/80 transition-all hover:border-white/40 hover:text-white" @click="goSignup">
              Learn More <ChevronRight :size="15" />
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
