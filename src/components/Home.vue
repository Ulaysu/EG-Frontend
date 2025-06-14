<template>
    <navbar />
    <heroSection />
    <Features/>
    <Problems/>
</template>
<script setup>
    import { ref, onMounted, computed } from 'vue'
    import navbar from './Navbar.vue'
    import heroSection from './HeroSection.vue'
    import Features from './Features.vue'
    import Problems from './Problems.vue'
</script>