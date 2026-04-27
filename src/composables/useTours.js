import { computed, ref } from 'vue'
import { getTours } from '../services/toursService'

export function useTours() {
  const tours = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  const hasTours = computed(() => tours.value.length > 0)
  const availableToursCount = computed(() => tours.value.filter((tour) => tour.isAvailable).length)

  async function loadTours() {
    isLoading.value = true
    error.value = null

    try {
      tours.value = await getTours()
    } catch (err) {
      error.value = err
      tours.value = []
    } finally {
      isLoading.value = false
    }
  }

  function retry() {
    return loadTours()
  }

  return {
    tours,
    isLoading,
    error,
    hasTours,
    availableToursCount,
    loadTours,
    retry
  }
}
