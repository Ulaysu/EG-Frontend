<script setup>
import { ref, reactive, computed, onMounted } from 'vue'

const props = defineProps({
  tourId: { type: [String, Number], default: 'demo-123' },
  initialTour: { type: Object, default: null },
})

const emit = defineEmits(['updated', 'deleted', 'cancel'])

// Mock initial data — replace by passing :initialTour or fetching by tourId
const MOCK_TOUR = {
  title: 'Sunset River Cruise on the Gambia River',
  location: 'Banjul, The Gambia',
  price: '2500',
  maxParticipants: '12',
  shortDescription:
    'Glide down the Gambia River at golden hour and watch the sun melt into the mangroves.',
  fullDescription:
    "Join us for an unforgettable evening cruise along the legendary Gambia River. We'll cast off from Banjul harbor as the afternoon heat fades, drifting past mangroves where kingfishers dart and monkeys chatter overhead. Local snacks and a welcome drink are included. The journey lasts roughly 2.5 hours and finishes back at the harbor under a sky full of stars.",
  category: 'Beach & Water',
  startDate: '2026-07-01',
  endDate: '2026-09-30',
  imageUrl:
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
}

const categories = [
  'Nature & Wildlife',
  'Cultural & Historical',
  'Beach & Water',
  'Food & Drink',
  'Adventure',
  'City Tour',
]

const form = reactive({
  title: '',
  location: '',
  price: '',
  maxParticipants: '',
  shortDescription: '',
  fullDescription: '',
  category: '',
  startDate: '',
  endDate: '',
})

const errors = reactive({})
const imagePreview = ref(null)
const isDragging = ref(false)
const isSubmitting = ref(false)
const isDeleting = ref(false)
const isLoading = ref(true)
const toast = ref(null)
const fileInput = ref(null)

onMounted(() => {
  const data = props.initialTour || MOCK_TOUR
  setTimeout(() => {
    Object.assign(form, {
      title: data.title || '',
      location: data.location || '',
      price: String(data.price || ''),
      maxParticipants: String(data.maxParticipants || ''),
      shortDescription: data.shortDescription || '',
      fullDescription: data.fullDescription || '',
      category: data.category || '',
      startDate: data.startDate || '',
      endDate: data.endDate || '',
    })
    imagePreview.value = data.imageUrl || null
    isLoading.value = false
  }, 300)
})

function clearError(field) {
  if (errors[field]) errors[field] = undefined
}

function validate() {
  Object.keys(errors).forEach((k) => (errors[k] = undefined))
  let ok = true
  if (!form.title.trim()) (errors.title = 'Tour title is required'), (ok = false)
  else if (form.title.length < 5) (errors.title = 'Title must be at least 5 characters'), (ok = false)

  if (!form.location.trim()) (errors.location = 'Location is required'), (ok = false)

  if (!form.price) (errors.price = 'Price is required'), (ok = false)
  else if (Number(form.price) <= 0) (errors.price = 'Price must be greater than 0'), (ok = false)

  if (!form.maxParticipants)
    (errors.maxParticipants = 'Maximum participants is required'), (ok = false)
  else if (Number(form.maxParticipants) <= 0)
    (errors.maxParticipants = 'Must allow at least 1 participant'), (ok = false)

  if (!form.shortDescription.trim())
    (errors.shortDescription = 'Short description is required'), (ok = false)
  else if (form.shortDescription.length < 20)
    (errors.shortDescription = 'Must be at least 20 characters'), (ok = false)

  if (!form.fullDescription.trim())
    (errors.fullDescription = 'Full description is required'), (ok = false)
  else if (form.fullDescription.length < 50)
    (errors.fullDescription = 'Must be at least 50 characters'), (ok = false)

  if (!imagePreview.value) (errors.image = 'Please upload a tour image'), (ok = false)
  return ok
}

function showToast(message, description = '', kind = 'success') {
  toast.value = { message, description, kind }
  setTimeout(() => (toast.value = null), 3500)
}

function handleImageSelect(file) {
  if (!file.type.startsWith('image/')) {
    errors.image = 'Please upload an image file'
    return
  }
  if (file.size > 8 * 1024 * 1024) {
    errors.image = 'Image must be under 8MB'
    return
  }
  const reader = new FileReader()
  reader.onload = (e) => {
    imagePreview.value = e.target?.result
    errors.image = undefined
  }
  reader.readAsDataURL(file)
}

function onFileInput(e) {
  const file = e.target.files?.[0]
  if (file) handleImageSelect(file)
}
function onDrop(e) {
  e.preventDefault()
  isDragging.value = false
  const file = e.dataTransfer.files?.[0]
  if (file) handleImageSelect(file)
}
function onDragOver(e) {
  e.preventDefault()
  isDragging.value = true
}
function onDragLeave(e) {
  e.preventDefault()
  isDragging.value = false
}
function clearImage() {
  imagePreview.value = null
  if (fileInput.value) fileInput.value.value = ''
}

async function handleSubmit() {
  if (!validate()) return
  isSubmitting.value = true
  await new Promise((r) => setTimeout(r, 1200))
  isSubmitting.value = false
  showToast('Changes saved', `"${form.title}" has been updated.`)
  emit('updated', { id: props.tourId, ...form, imageUrl: imagePreview.value })
}

async function handleDelete() {
  if (!window.confirm('Delete this tour? This action cannot be undone.')) return
  isDeleting.value = true
  await new Promise((r) => setTimeout(r, 1000))
  isDeleting.value = false
  showToast('Tour deleted', 'The tour has been removed from your listings.')
  emit('deleted', props.tourId)
}

function handleCancel() {
  emit('cancel')
}

const dateRangeLabel = computed(() => {
  if (form.startDate && form.endDate)
    return `${new Date(form.startDate).toLocaleDateString()} - ${new Date(form.endDate).toLocaleDateString()}`
  if (form.startDate) return `From ${new Date(form.startDate).toLocaleDateString()}`
  if (form.endDate) return `Until ${new Date(form.endDate).toLocaleDateString()}`
  return ''
})
</script>

<template>
  <div class="et-page">
    <!-- Loading -->
    <div v-if="isLoading" class="et-loading">
      <div class="et-spinner" />
      <span>Loading tour details...</span>
    </div>

    <template v-else>
      <!-- Header -->
      <header class="et-header">
        <div class="et-header-inner">
          <div class="et-brand">
            <div class="et-logo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <span class="et-brand-name">Explore Gambia</span>
          </div>
          <span class="et-header-meta">Edit experience</span>
        </div>
      </header>

      <main class="et-main">
        <button type="button" class="et-back" @click="handleCancel">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
          Back to tours
        </button>

        <div class="et-title-row">
          <div>
            <h1>Edit Tour</h1>
            <p>Update the details of your experience. Changes appear live in the preview.</p>
          </div>
          <span class="et-id-pill">Tour ID: {{ tourId }}</span>
        </div>

        <div class="et-grid">
          <!-- Form -->
          <form class="et-form" @submit.prevent="handleSubmit">
            <!-- Image -->
            <section class="et-card">
              <header class="et-card-header">
                <h3>Tour Image</h3>
                <p>Replace the current photo or keep the existing one</p>
              </header>
              <div class="et-card-body">
                <div
                  v-if="!imagePreview"
                  class="et-dropzone"
                  :class="{ 'is-dragging': isDragging }"
                  @drop="onDrop"
                  @dragover="onDragOver"
                  @dragleave="onDragLeave"
                  @click="fileInput?.click()"
                >
                  <svg class="et-dropzone-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                  <p class="et-dropzone-title">Drag & drop an image here</p>
                  <p class="et-dropzone-hint">or click to browse (JPG, PNG, max 8MB)</p>
                  <input ref="fileInput" type="file" accept="image/*" @change="onFileInput" hidden />
                </div>
                <div v-else class="et-image-wrap">
                  <img :src="imagePreview" alt="Tour preview" />
                  <button type="button" class="et-image-btn et-image-btn--icon" @click="clearImage">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </button>
                  <button type="button" class="et-image-btn et-image-btn--label" @click="fileInput?.click()">
                    Change photo
                  </button>
                  <input ref="fileInput" type="file" accept="image/*" @change="onFileInput" hidden />
                </div>
                <p v-if="errors.image" class="et-error">{{ errors.image }}</p>
              </div>
            </section>

            <!-- Basic Info -->
            <section class="et-card">
              <header class="et-card-header">
                <h3>Basic Information</h3>
              </header>
              <div class="et-card-body et-stack">
                <div class="et-field">
                  <label for="title">Tour Title</label>
                  <input
                    id="title" type="text"
                    placeholder="e.g., Sunset River Cruise on the Gambia River"
                    v-model="form.title" @input="clearError('title')"
                    :class="{ 'has-error': errors.title }"
                  />
                  <p v-if="errors.title" class="et-error">{{ errors.title }}</p>
                </div>

                <div class="et-field">
                  <label for="location">Location</label>
                  <input
                    id="location" type="text"
                    placeholder="e.g., Banjul, The Gambia"
                    v-model="form.location" @input="clearError('location')"
                    :class="{ 'has-error': errors.location }"
                  />
                  <p v-if="errors.location" class="et-error">{{ errors.location }}</p>
                </div>

                <div class="et-row">
                  <div class="et-field">
                    <label for="price">Price (GMD)</label>
                    <input
                      id="price" type="number" min="0" placeholder="2500"
                      v-model="form.price" @input="clearError('price')"
                      :class="{ 'has-error': errors.price }"
                    />
                    <p v-if="errors.price" class="et-error">{{ errors.price }}</p>
                  </div>
                  <div class="et-field">
                    <label for="maxParticipants">Max Participants</label>
                    <input
                      id="maxParticipants" type="number" min="1" placeholder="10"
                      v-model="form.maxParticipants" @input="clearError('maxParticipants')"
                      :class="{ 'has-error': errors.maxParticipants }"
                    />
                    <p v-if="errors.maxParticipants" class="et-error">{{ errors.maxParticipants }}</p>
                  </div>
                </div>

                <div class="et-field">
                  <label for="category">Category</label>
                  <select id="category" v-model="form.category">
                    <option value="">Select a category</option>
                    <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
                  </select>
                </div>
              </div>
            </section>

            <!-- Dates -->
            <section class="et-card">
              <header class="et-card-header"><h3>Availability</h3></header>
              <div class="et-card-body et-row">
                <div class="et-field">
                  <label for="startDate">Start Date</label>
                  <input id="startDate" type="date" v-model="form.startDate" />
                </div>
                <div class="et-field">
                  <label for="endDate">End Date</label>
                  <input id="endDate" type="date" v-model="form.endDate" />
                </div>
              </div>
            </section>

            <!-- Description -->
            <section class="et-card">
              <header class="et-card-header">
                <h3>Description</h3>
                <p>Help travelers understand what makes your experience special</p>
              </header>
              <div class="et-card-body et-stack">
                <div class="et-field">
                  <label for="shortDescription">Short Description</label>
                  <textarea
                    id="shortDescription" rows="2"
                    placeholder="A brief summary that appears in search results..."
                    v-model="form.shortDescription" @input="clearError('shortDescription')"
                    :class="{ 'has-error': errors.shortDescription }"
                  />
                  <p v-if="errors.shortDescription" class="et-error">{{ errors.shortDescription }}</p>
                </div>
                <div class="et-field">
                  <label for="fullDescription">Full Description</label>
                  <textarea
                    id="fullDescription" rows="6"
                    placeholder="Describe the full experience, itinerary, what to expect, what to bring..."
                    v-model="form.fullDescription" @input="clearError('fullDescription')"
                    :class="{ 'has-error': errors.fullDescription }"
                  />
                  <p v-if="errors.fullDescription" class="et-error">{{ errors.fullDescription }}</p>
                </div>
              </div>
            </section>

            <!-- Actions -->
            <div class="et-actions">
              <button
                type="button" class="et-btn et-btn--danger-ghost"
                :disabled="isDeleting || isSubmitting" @click="handleDelete"
              >
                <span v-if="isDeleting" class="et-spinner et-spinner--sm" />
                {{ isDeleting ? 'Deleting...' : 'Delete tour' }}
              </button>
              <div class="et-actions-right">
                <button
                  type="button" class="et-btn et-btn--outline"
                  :disabled="isSubmitting || isDeleting" @click="handleCancel"
                >Cancel</button>
                <button
                  type="submit" class="et-btn et-btn--primary"
                  :disabled="isSubmitting || isDeleting"
                >
                  <span v-if="isSubmitting" class="et-spinner et-spinner--sm" />
                  {{ isSubmitting ? 'Saving...' : 'Save Changes' }}
                </button>
              </div>
            </div>
          </form>

          <!-- Preview -->
          <aside class="et-preview">
            <section class="et-card">
              <header class="et-card-header et-card-header--muted">
                <h3>Live Preview</h3>
                <p>This is how your tour will appear to travelers</p>
              </header>
              <div class="et-preview-body">
                <div class="et-preview-image">
                  <img v-if="imagePreview" :src="imagePreview" alt="Tour preview" />
                  <div v-else class="et-preview-empty">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                    <span>Your image will appear here</span>
                  </div>
                  <span v-if="form.category" class="et-chip">{{ form.category }}</span>
                </div>
                <div class="et-preview-content">
                  <h4>{{ form.title || 'Your tour title' }}</h4>
                  <div v-if="form.location" class="et-preview-meta">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    {{ form.location }}
                  </div>
                  <p class="et-preview-desc">
                    {{ form.shortDescription || 'Your short description will appear here...' }}
                  </p>
                  <div class="et-preview-footer">
                    <div v-if="form.price" class="et-price">
                      <strong>GMD {{ Number(form.price).toLocaleString() }}</strong>
                      <span>/person</span>
                    </div>
                    <div v-if="form.maxParticipants" class="et-preview-meta et-preview-meta--right">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                      Max {{ form.maxParticipants }}
                    </div>
                  </div>
                  <div v-if="dateRangeLabel" class="et-preview-meta et-preview-meta--small">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    {{ dateRangeLabel }}
                  </div>
                </div>
              </div>
            </section>

            <section class="et-card et-card--tips">
              <header class="et-card-header"><h3>Editing Tips</h3></header>
              <div class="et-card-body">
                <ul class="et-tips">
                  <li><span class="et-check">✓</span> Keep your photo fresh — update it each season for better bookings</li>
                  <li><span class="et-check">✓</span> Adjust pricing based on demand and feedback from past travelers</li>
                  <li><span class="et-check">✓</span> Refine your description with details guests asked about most</li>
                  <li><span class="et-check">✓</span> Keep availability dates current so the listing stays bookable</li>
                </ul>
              </div>
            </section>
          </aside>
        </div>
      </main>

      <!-- Toast -->
      <transition name="et-fade">
        <div v-if="toast" class="et-toast" :class="`et-toast--${toast.kind}`">
          <div class="et-toast-icon">✓</div>
          <div>
            <div class="et-toast-title">{{ toast.message }}</div>
            <div v-if="toast.description" class="et-toast-desc">{{ toast.description }}</div>
          </div>
        </div>
      </transition>
    </template>
  </div>
</template>

<style scoped>
.et-page {
  --et-primary: #f59e0b;
  --et-primary-hover: #d97706;
  --et-accent: #15803d;
  --et-bg: #fafaf9;
  --et-card: #ffffff;
  --et-border: #e7e5e4;
  --et-text: #1c1917;
  --et-muted: #78716c;
  --et-danger: #dc2626;
  --et-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04);
  --et-radius: 16px;

  min-height: 100vh;
  background: var(--et-bg);
  color: var(--et-text);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
}

.et-loading {
  min-height: 100vh;
  display: flex; align-items: center; justify-content: center; gap: 12px;
  color: var(--et-muted); font-size: 14px;
}
.et-spinner {
  width: 20px; height: 20px; border-radius: 50%;
  border: 2px solid var(--et-border); border-top-color: var(--et-primary);
  animation: et-spin 0.8s linear infinite;
}
.et-spinner--sm { width: 14px; height: 14px; border-width: 2px; }
@keyframes et-spin { to { transform: rotate(360deg); } }

.et-header {
  border-bottom: 1px solid var(--et-border);
  background: rgba(255,255,255,0.7);
  backdrop-filter: blur(8px);
  position: sticky; top: 0; z-index: 10;
}
.et-header-inner {
  max-width: 1200px; margin: 0 auto; padding: 16px 24px;
  display: flex; align-items: center; justify-content: space-between;
}
.et-brand { display: flex; align-items: center; gap: 10px; }
.et-logo {
  width: 32px; height: 32px; border-radius: 10px;
  background: var(--et-primary); color: white;
  display: flex; align-items: center; justify-content: center;
}
.et-logo svg { width: 18px; height: 18px; }
.et-brand-name { font-weight: 600; font-size: 17px; letter-spacing: -0.01em; }
.et-header-meta { font-size: 13px; color: var(--et-muted); }

.et-main { max-width: 1200px; margin: 0 auto; padding: 32px 24px; }

.et-back {
  display: inline-flex; align-items: center; gap: 6px;
  background: none; border: none; cursor: pointer; padding: 0; margin-bottom: 16px;
  color: var(--et-muted); font-size: 14px; transition: color 0.15s;
}
.et-back:hover { color: var(--et-text); }
.et-back svg { width: 16px; height: 16px; }

.et-title-row {
  display: flex; flex-wrap: wrap; align-items: flex-start; justify-content: space-between;
  gap: 16px; margin-bottom: 32px;
}
.et-title-row h1 { font-size: 30px; font-weight: 700; letter-spacing: -0.02em; margin: 0; }
.et-title-row p { color: var(--et-muted); margin: 8px 0 0; font-size: 15px; }
.et-id-pill {
  background: #f5f5f4; color: var(--et-muted);
  padding: 6px 12px; border-radius: 999px; font-size: 12px; font-weight: 500;
}

.et-grid { display: grid; gap: 32px; grid-template-columns: 1fr; }
@media (min-width: 1024px) { .et-grid { grid-template-columns: 1fr 1fr; } }

.et-form { display: flex; flex-direction: column; gap: 24px; }

.et-card {
  background: var(--et-card);
  border: 1px solid var(--et-border);
  border-radius: var(--et-radius);
  box-shadow: var(--et-shadow);
  overflow: hidden;
}
.et-card-header { padding: 20px 24px; }
.et-card-header--muted { background: #f5f5f4; border-bottom: 1px solid var(--et-border); }
.et-card-header h3 { margin: 0; font-size: 15px; font-weight: 600; }
.et-card-header p { margin: 4px 0 0; font-size: 13px; color: var(--et-muted); }
.et-card-body { padding: 0 24px 24px; }
.et-stack > * + * { margin-top: 16px; }
.et-row { display: grid; gap: 16px; grid-template-columns: 1fr; }
@media (min-width: 560px) { .et-row { grid-template-columns: 1fr 1fr; } }

.et-field { display: flex; flex-direction: column; gap: 6px; }
.et-field label { font-size: 13px; font-weight: 500; }
.et-field input,
.et-field select,
.et-field textarea {
  width: 100%; box-sizing: border-box;
  padding: 9px 12px;
  border: 1px solid var(--et-border);
  border-radius: 8px; background: transparent;
  font-size: 14px; font-family: inherit; color: var(--et-text);
  transition: border-color 0.15s, box-shadow 0.15s;
}
.et-field textarea { resize: vertical; min-height: 70px; }
.et-field input:focus,
.et-field select:focus,
.et-field textarea:focus {
  outline: none;
  border-color: var(--et-primary);
  box-shadow: 0 0 0 3px rgba(245,158,11,0.15);
}
.has-error { border-color: var(--et-danger) !important; }
.et-error { color: var(--et-danger); font-size: 12.5px; font-weight: 500; margin: 0; }

.et-dropzone {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding: 40px 20px; border: 2px dashed var(--et-border);
  border-radius: 12px; background: #fafaf9; cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
}
.et-dropzone:hover { background: #f5f5f4; }
.et-dropzone.is-dragging { border-color: var(--et-primary); background: rgba(245,158,11,0.05); }
.et-dropzone-icon { width: 40px; height: 40px; color: var(--et-muted); margin-bottom: 12px; }
.et-dropzone-title { margin: 0; font-size: 14px; font-weight: 500; }
.et-dropzone-hint { margin: 4px 0 0; font-size: 12px; color: var(--et-muted); }

.et-image-wrap { position: relative; border-radius: 12px; overflow: hidden; }
.et-image-wrap img { display: block; width: 100%; aspect-ratio: 16/9; object-fit: cover; }
.et-image-btn {
  position: absolute; background: rgba(0,0,0,0.6); color: white; border: none;
  backdrop-filter: blur(4px); cursor: pointer; transition: background 0.15s;
}
.et-image-btn:hover { background: rgba(0,0,0,0.8); }
.et-image-btn--icon {
  top: 8px; right: 8px; width: 32px; height: 32px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
}
.et-image-btn--icon svg { width: 16px; height: 16px; }
.et-image-btn--label {
  bottom: 8px; right: 8px; padding: 6px 12px; border-radius: 999px;
  font-size: 12px; font-weight: 500;
}

.et-actions {
  display: flex; flex-direction: column-reverse; gap: 12px;
  justify-content: space-between; align-items: stretch;
}
@media (min-width: 560px) {
  .et-actions { flex-direction: row; align-items: center; }
}
.et-actions-right { display: flex; flex-direction: column-reverse; gap: 12px; }
@media (min-width: 560px) { .et-actions-right { flex-direction: row; } }

.et-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  padding: 0 16px; height: 38px; border-radius: 8px;
  font-size: 14px; font-weight: 500; cursor: pointer; border: 1px solid transparent;
  font-family: inherit; transition: background 0.15s, border-color 0.15s, color 0.15s;
}
.et-btn:disabled { opacity: 0.6; cursor: not-allowed; }
.et-btn--primary { background: var(--et-primary); color: white; }
.et-btn--primary:hover:not(:disabled) { background: var(--et-primary-hover); }
.et-btn--outline { background: white; border-color: var(--et-border); color: var(--et-text); }
.et-btn--outline:hover:not(:disabled) { background: #f5f5f4; }
.et-btn--danger-ghost { background: transparent; color: var(--et-danger); }
.et-btn--danger-ghost:hover:not(:disabled) { background: rgba(220,38,38,0.08); }

/* Preview */
.et-preview { position: relative; }
@media (min-width: 1024px) {
  .et-preview { position: sticky; top: 96px; align-self: flex-start; }
}
.et-preview-body { padding: 0; }
.et-preview-image {
  position: relative; aspect-ratio: 16/9; background: #f5f5f4;
}
.et-preview-image img { width: 100%; height: 100%; object-fit: cover; display: block; }
.et-preview-empty {
  width: 100%; height: 100%; display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 8px; color: var(--et-muted);
}
.et-preview-empty svg { width: 48px; height: 48px; opacity: 0.4; }
.et-preview-empty span { font-size: 13px; }
.et-chip {
  position: absolute; top: 12px; left: 12px;
  background: rgba(0,0,0,0.6); color: white; padding: 4px 12px;
  border-radius: 999px; font-size: 11px; font-weight: 500; backdrop-filter: blur(4px);
}
.et-preview-content { padding: 20px; display: flex; flex-direction: column; gap: 12px; }
.et-preview-content h4 { margin: 0; font-size: 18px; font-weight: 600; line-height: 1.3; }
.et-preview-meta {
  display: flex; align-items: center; gap: 6px;
  color: var(--et-muted); font-size: 13px;
}
.et-preview-meta svg { width: 14px; height: 14px; }
.et-preview-meta--right { margin-left: auto; }
.et-preview-meta--small { font-size: 12px; }
.et-preview-desc { margin: 0; font-size: 13.5px; color: var(--et-muted); line-height: 1.55; }
.et-preview-footer {
  display: flex; align-items: center; gap: 16px;
  border-top: 1px solid var(--et-border); padding-top: 12px;
}
.et-price { display: flex; align-items: baseline; gap: 4px; }
.et-price strong { font-size: 18px; font-weight: 700; }
.et-price span { font-size: 12px; color: var(--et-muted); }

.et-card--tips { margin-top: 24px; }
.et-tips { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
.et-tips li {
  display: flex; align-items: flex-start; gap: 8px;
  font-size: 13.5px; color: var(--et-muted); line-height: 1.5;
}
.et-check { color: var(--et-accent); font-weight: 700; flex-shrink: 0; }

/* Toast */
.et-toast {
  position: fixed; bottom: 24px; right: 24px; z-index: 100;
  background: white; border: 1px solid var(--et-border);
  border-radius: 12px; padding: 14px 18px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.12);
  display: flex; align-items: flex-start; gap: 12px; max-width: 360px;
}
.et-toast-icon {
  width: 24px; height: 24px; border-radius: 50%;
  background: var(--et-accent); color: white;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px; font-weight: 700; flex-shrink: 0;
}
.et-toast-title { font-size: 14px; font-weight: 600; }
.et-toast-desc { font-size: 13px; color: var(--et-muted); margin-top: 2px; }
.et-fade-enter-active, .et-fade-leave-active { transition: opacity 0.2s, transform 0.2s; }
.et-fade-enter-from, .et-fade-leave-to { opacity: 0; transform: translateY(8px); }
</style>
