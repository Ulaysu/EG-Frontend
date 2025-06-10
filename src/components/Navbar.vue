<template>
        <header class="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-amber-100">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16 md:h-20">
        <!-- Logo -->
        <div class="flex items-center space-x-2">
          <div class="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-lg">EG</span>
          </div>
          <div>
            <div class="text-xl font-bold text-slate-800">Explore Gambia</div>
            <div class="text-xs text-amber-600 font-medium">Discover the Smiling Coast</div>
          </div>
        </div>

        <!-- Desktop Navigation -->
        <nav class=" md:flex items-center space-x-8">
          <a href="#experiences" class="text-slate-600 hover:text-amber-600 transition-colors font-medium">Experiences</a>
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
        <button class="md:hidden text-slate-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>
<script setup></script>