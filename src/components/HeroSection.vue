<template>
       <!-- Hero Section -->
  <section class="relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden">
    <!-- Background Image -->
    <div class="absolute inset-0 z-0">
      <img 
        src="https://picsum.photos/13" 
        alt="Beautiful Gambian landscape" 
        class="w-full h-full object-cover opacity-20" 
      />
      <div class="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/80"></div>
    </div>

    <div class="container mx-auto px-4 relative z-10">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <!-- Hero Content -->
        <div class="text-center lg:text-left">
          <div class="mb-6 inline-block bg-amber-100 text-amber-800 px-4 py-1.5 rounded-full">
            #1 Tour Booking Platform in The Gambia
          </div>

          <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-800 mb-6 leading-tight">
            Explore Gambia – Book Authentic Tours & Cultural Experiences Online
          </h1>

          <p class="text-xl text-slate-600 mb-8 max-w-lg mx-auto lg:mx-0">
            Connect with verified local guides and explore the Smiling Coast of Africa. Discover, book, and experience the real Gambia.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button class="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white text-lg px-8 py-6 rounded-full">
              Browse Experiences
            </button>
            <button class="border border-amber-500 text-amber-600 hover:bg-amber-50 text-lg px-8 py-6 rounded-full">
              List Your Tour
            </button>
          </div>

          <div class="mt-8 flex items-center justify-center lg:justify-start space-x-4 text-sm text-slate-500">
            <div class="flex items-center">
              <span class="text-green-500 mr-1">✔</span>
              <span>Verified Guides</span>
            </div>
            <div class="flex items-center">
              <span class="text-green-500 mr-1">✔</span>
              <span>Secure Payments</span>
            </div>
            <div class="flex items-center">
              <span class="text-green-500 mr-1">✔</span>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>

        <!-- Search Box -->
        <div class="relative">
          <div class="bg-white rounded-2xl shadow-2xl p-6 border border-slate-100">
            <h3 class="text-xl font-bold text-slate-800 mb-6">Find Your Perfect Experience</h3>

            <div class="space-y-4">
              <div class="relative">
                
                <input 
                  type="text" 
                  placeholder="What would you like to experience?" 
                  class="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
                <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div class="relative">
                  <select class="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 appearance-none bg-white">
                    <option>Location</option>
                    <option>Banjul</option>
                    <option>Serrekunda</option>
                    <option>Bakau</option>
                    <option>Brikama</option>
                  </select>
                  <MapPin class="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />                </div>

                <div class="relative">
                  <input 
                    type="text" 
                    placeholder="Date" 
                    class="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                  <Calendar class="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div class="relative">
                  <select class="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 appearance-none bg-white">
                    <option>Guests</option>
                    <option>1 Person</option>
                    <option>2 People</option>
                    <option>3-5 People</option>
                    <option>6+ People</option>
                  </select>
                  <Users class="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"/>
                </div>

                <div class="relative">
                  <select class="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 appearance-none bg-white">
                    <option>Experience Type</option>
                    <option>Cultural</option>
                    <option>Adventure</option>
                    <option>Nature</option>
                    <option>Food</option>
                  </select>
                  <Compass class="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                </div>
              </div>

              <button class="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white py-3 rounded-lg">
                Search Experiences
              </button>
            </div>

            <div class="mt-6 text-center text-sm text-slate-500">
              Popular:
              <span class="inline-flex gap-2 ml-2">
                <span class="px-3 py-1 border border-slate-200 rounded-full cursor-pointer hover:bg-amber-50">River Cruise</span>
                <span class="px-3 py-1 border border-slate-200 rounded-full cursor-pointer hover:bg-amber-50">Cultural Tour</span>
                <span class="px-3 py-1 border border-slate-200 rounded-full cursor-pointer hover:bg-amber-50">Wildlife</span>
              </span>
            </div>
          </div>

          <!-- Floating Elements -->
          <div class="absolute -top-4 -right-4 w-24 h-24 bg-amber-100 rounded-full opacity-70"></div>
          <div class="absolute -bottom-6 -left-6 w-32 h-32 bg-orange-100 rounded-full opacity-70"></div>
        </div>
      </div>
    </div>
  </section>

</template>
<script setup>
import { 
  
  CreditCard,
  Search,
  Calendar,
  ShieldCheck,
  MapPin,
  Users,
  Compass, } from 'lucide-vue-next'
</script>