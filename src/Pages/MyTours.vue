<script setup>
import { ref, onMounted } from 'vue'
import { getMyTours } from '@/services/toursService'

const tours = ref([])
const loading = ref(true)
const error = ref('')

async function loadTours() {
  try {
    loading.value = true
    error.value = ''

    tours.value = await getMyTours()
  }
  catch (err) {
    error.value = err.message
  }
  finally {
    loading.value = false
  }
}

onMounted(loadTours)
</script>

<template>
  <div>
    <h1>My Tours</h1>

    <p v-if="loading">
      Loading tours...
    </p>

    <p v-else-if="error">
      {{ error }}
    </p>

    <div v-else>
      <div
        v-for="tour in tours"
        :key="tour.id"
      >
        <h3>{{ tour.title }}</h3>
        <p>{{ tour.location }}</p>
        <p>${{ tour.price }}</p>
      </div>
    </div>
  </div>
</template>