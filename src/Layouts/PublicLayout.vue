<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from '@/components/Navbar.vue'

const route = useRoute()
const mainClass = computed(() => (route.name === 'home' ? '' : 'pt-24'))
</script>

<template>
  <Navbar />
  <main :class="mainClass">
    <RouterView />
  </main>
</template>
