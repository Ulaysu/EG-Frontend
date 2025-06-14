<template>
    <navbar />
    <heroSection />
    <Features/>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue'
    import navbar from './Navbar.vue'
    import heroSection from './HeroSection.vue'
    import Features from './Features.vue'
</script>