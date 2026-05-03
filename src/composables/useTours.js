import { computed, ref } from 'vue'
import { getTours } from '../services/toursService'

export function useTours() {
  const tours = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  const availability = ref('all')
  const location = ref('all')
  const sortBy = ref('title-asc')

  const hasTours = computed(() => tours.value.length > 0)
  const availableToursCount = computed(() => tours.value.filter((tour) => tour.isAvailable).length)

  const locations = computed(() => {
    const uniqueLocations = new Set(tours.value.map((tour) => tour.location).filter(Boolean))
    return ['all', ...Array.from(uniqueLocations).sort((a, b) => a.localeCompare(b))]
  })

  const filteredTours = computed(() => {
    const filtered = tours.value.filter((tour) => {
      const availabilityMatches =
        availability.value === 'all' ||
        (availability.value === 'available' && tour.isAvailable) ||
        (availability.value === 'unavailable' && !tour.isAvailable)

      const locationMatches = location.value === 'all' || tour.location === location.value

      return availabilityMatches && locationMatches
    })

    return filtered.sort((a, b) => {
      if (sortBy.value === 'price-asc') return a.price - b.price
      if (sortBy.value === 'price-desc') return b.price - a.price
      if (sortBy.value === 'title-desc') return b.title.localeCompare(a.title)
      return a.title.localeCompare(b.title)
    })
  })

  async function loadTours(pageNumber = 1, pageSize = 10) {
    isLoading.value = true
    error.value = null

    try {
      tours.value = await getTours(pageNumber, pageSize)
    } catch (err) {
      error.value = err
      tours.value = []
    } finally {
      isLoading.value = false
    }
  }

  function retry(pageNumber = 1, pageSize = 10) {
    return loadTours(pageNumber, pageSize)
  }

  return {
    tours,
    filteredTours,
    isLoading,
    error,
    hasTours,
    availableToursCount,
    locations,
    availability,
    location,
    sortBy,
    loadTours,
    retry
  }
}