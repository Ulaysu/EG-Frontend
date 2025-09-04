<template>
        <header class="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-amber-100">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16 md:h-20">
        <!-- Logo -->
        <router-link :to="{name: 'home'}" class="text-2xl font-bold text-amber-600">
          <div class="flex items-center space-x-2">
          <div class="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-lg">EG</span>
          </div>
          <div>
            <div class="text-xl font-bold text-slate-800">Explore Gambia</div>
            <div class="text-xs text-amber-600 font-medium">Discover the Smiling Coast</div>
          </div>
        </div>
        </router-link>
          

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-8">
          <router-link :to="{name: 'tour'}" class="text-slate-600 hover:text-amber-600 transition-colors font-medium">Experiences</router-link >
          <a href="#features" class="text-slate-600 hover:text-amber-600 transition-colors font-medium">Features</a>
          <a href="#guides" class="text-slate-600 hover:text-amber-600 transition-colors font-medium">For Guides</a>
          <a href="#testimonials" class="text-slate-600 hover:text-amber-600 transition-colors font-medium">Testimonials</a>

          <div class="flex items-center space-x-3">
            <button class="border border-amber-500 text-amber-600 hover:bg-amber-50 px-4 py-2 rounded-md">
              Log In
            </button>
            <button class="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-4 py-2 rounded-md">
              Sign Up
            </button>
          </div>
        </nav>

        <!-- Mobile Menu Button -->
       <!-- Mobile Menu Button -->
        <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden text-slate-700 focus:outline-none">
          <svg v-if="!mobileMenuOpen" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

        <!-- Mobile Navigation -->
       <div v-if="mobileMenuOpen" class="md:hidden mt-4 space-y-4">
        <nav class="flex flex-col space-y-3 text-slate-600 font-medium">
          <a href="#experiences" class="hover:text-amber-600 transition-colors">Experiences</a>
          <a href="#features" class="hover:text-amber-600 transition-colors">Features</a>
          <a href="#guides" class="hover:text-amber-600 transition-colors">For Guides</a>
          <a href="#testimonials" class="hover:text-amber-600 transition-colors">Testimonials</a>
        </nav>
        <div class="flex flex-col gap-2 mt-4">
          <button class="border border-amber-500 text-amber-600 hover:bg-amber-50 px-4 py-2 rounded-md">
            Log In
          </button>
          <button class="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-4 py-2 rounded-md">
            Sign Up
          </button>
        </div>
      </div>


    </div>
  </header>
</template>
<script setup>
    import { ref } from 'vue';
    const mobileMenuOpen = ref(false);
</script>