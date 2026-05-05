<script setup>
defineProps({
  title: String,
  imageUrl: String
})
</script>

<template>
  <section class="relative h-[50vh] min-h-[400px] w-full overflow-hidden md:h-[60vh]">
    
    <!-- Image -->
    <img
      :src="imageUrl"
      :alt="title"
      class="absolute inset-0 h-full w-full object-cover"
    />

    <!-- Gradient Overlay -->
    <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

    <!-- Content -->
    <div class="absolute inset-0 flex items-end">
      <div class="container mx-auto px-4 pb-8 md:pb-12">
        <h1 class="max-w-3xl text-3xl font-bold text-white drop-shadow-lg md:text-4xl lg:text-5xl">
          {{ title }}
        </h1>
      </div>
    </div>

  </section>
</template>