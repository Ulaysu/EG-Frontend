<template>
  <div class="min-h-screen bg-gradient-to-br from-amber-400 via-orange-500 to-orange-600 relative overflow-hidden">
    <div
      class="absolute inset-0 bg-cover bg-center opacity-20"
      :style="{
        backgroundImage: 'url(/src/assets/beautiful2.jpg)',
      }"
    />

    <div class="absolute top-20 left-10 w-32 h-32 bg-amber-300/30 rounded-full blur-xl animate-pulse" />
    <div class="absolute top-40 right-20 w-24 h-24 bg-orange-400/40 rounded-full blur-lg animate-bounce" />
    <div class="absolute bottom-32 left-1/4 w-20 h-20 bg-amber-400/25 rounded-full blur-md animate-pulse delay-1000" />
    <div class="absolute bottom-20 right-1/3 w-28 h-28 bg-orange-300/35 rounded-full blur-xl animate-bounce delay-500" />

    
    <div class="relative z-10 flex items-center justify-center min-h-screen p-4">
      <LoginForm />
    </div>
  </div>
</template>

<script setup>
import LoginForm from '@/components/Login.vue';
</script>