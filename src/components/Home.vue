<template>
    <navbar />
    <heroSection />
    <Features/>
    <Problems/>
    <solutions/>
    <PlatformFeatures/>
    <GuideFeatures/>
    <RevenueModel/>
</template>
<script setup>
    import { ref, onMounted, computed } from 'vue'
    import navbar from './Navbar.vue'
    import heroSection from './HeroSection.vue'
    import Features from './Features.vue'
    import Problems from './Problems.vue'
    import solutions from './Solutions.vue'
    import PlatformFeatures from './PlatformFeatures.vue'
    import GuideFeatures from './GuideFeatures.vue'
    import RevenueModel from './RevenueModel.vue'

</script>