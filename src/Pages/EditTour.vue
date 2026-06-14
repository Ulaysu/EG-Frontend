

<script setup>
import { ref, computed, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import {
  getMyTourById,
  updateTour
} from '@/services/toursService'
import { uploadImage } from '@/services/mediaService'

const emit = defineEmits(['updated', 'cancel'])

const route = useRoute()

// ---------- Form State ----------
const form = reactive({
  title: '',
  description: '',
  location: '',
  price: '',
  maxParticipants: '',
  startDate: '',
  endDate: '',
})

const submitError = ref('')
const imageUrl = ref('')
const imageFile = ref(null)
const imagePreview = ref('')
const isDragging = ref(false)
const isSubmitting = ref(false)
const showSuccess = ref(false)
const errors = reactive({})
const fileInput = ref(null)

// ---------- Load Existing Tour ----------
async function loadTour() {
  try {
    isSubmitting.value = true

    const tourId = route.params.id

    const tour = await getMyTourById(tourId)

    form.title = tour.title
    form.description = tour.description
    form.location = tour.location
    form.price = tour.price
    form.maxParticipants = tour.maxParticipants

    form.startDate = tour.startDate
      ? tour.startDate.split('T')[0]
      : ''

    form.endDate = tour.endDate
      ? tour.endDate.split('T')[0]
      : ''

    imageUrl.value = tour.imageUrl
    imagePreview.value = tour.imageUrl
  }
  catch (error) {
    submitError.value =
      error.message || 'Failed to load tour.'
  }
  finally {
    isSubmitting.value = false
  }
}

onMounted(loadTour)

// ---------- Image Handling ----------
async function handleFiles(files) {
  const file = files?.[0]

  if (!file) return

  if (!file.type.startsWith('image/')) {
    errors.image = 'Please upload a valid image file.'
    return
  }

  if (file.size > 8 * 1024 * 1024) {
    errors.image = 'Image must be smaller than 8MB.'
    return
  }

  delete errors.image

  imageFile.value = file

  const reader = new FileReader()

  reader.onload = (e) => {
    imagePreview.value = e.target.result
  }

  reader.readAsDataURL(file)

  try {
    isSubmitting.value = true

    const uploadedUrl = await uploadImage(file)

    imageUrl.value = uploadedUrl
  }
  catch {
    errors.image =
      'Image upload failed. Try again.'
  }
  finally {
    isSubmitting.value = false
  }
}

function onFileChange(e) {
  handleFiles(e.target.files)
}

function onDrop(e) {
  isDragging.value = false
  handleFiles(e.dataTransfer.files)
}

function onDragOver(e) {
  e.preventDefault()
  isDragging.value = true
}

function onDragLeave() {
  isDragging.value = false
}

function openFilePicker() {
  fileInput.value?.click()
}

function changeImage() {
  openFilePicker()
}

// ---------- Validation ----------
function validate() {
  Object.keys(errors).forEach(key => delete errors[key])

  if (!form.title.trim()) {
    errors.title = 'Tour title is required.'
  }
  else if (form.title.length < 4) {
    errors.title =
      'Title must be at least 4 characters.'
  }

  if (!form.description.trim()) {
    errors.description = 'Description is required.'
  }
  else if (form.description.length < 20) {
    errors.description =
      'Please write at least 20 characters.'
  }

  if (!form.location.trim()) {
    errors.location = 'Location is required.'
  }

  if (!form.price || Number(form.price) <= 0) {
    errors.price = 'Enter a valid price.'
  }

  if (
    !form.maxParticipants ||
    Number(form.maxParticipants) < 1
  ) {
    errors.maxParticipants =
      'At least 1 participant.'
  }

  if (!form.startDate) {
    errors.startDate =
      'Start date is required.'
  }

  if (!form.endDate) {
    errors.endDate =
      'End date is required.'
  }

  if (
    form.startDate &&
    form.endDate &&
    form.endDate < form.startDate
  ) {
    errors.endDate =
      'End date must be after start date.'
  }

  if (!imageUrl.value) {
    errors.image =
      'Please upload a cover image.'
  }

  return Object.keys(errors).length === 0
}

// ---------- Submit ----------
async function onSubmit() {
  if (!validate()) return

  isSubmitting.value = true
  submitError.value = ''

  try {
    const payload = {
      title: form.title,
      description: form.description,
      location: form.location,
      price: Number(form.price),
      maxParticipants: Number(
        form.maxParticipants
      ),
      startDate: form.startDate,
      endDate: form.endDate,
      imageUrl: imageUrl.value
    }

    const result = await updateTour(
      route.params.id,
      payload
    )

    emit('updated', result)

    showSuccess.value = true

    setTimeout(() => {
      showSuccess.value = false
    }, 4000)
  }
  catch (error) {
    submitError.value =
      error.message || 'Failed to update tour.'
  }
  finally {
    isSubmitting.value = false
  }
}

function onCancel() {
  emit('cancel')
}

// ---------- Preview Helpers ----------
const previewPrice = computed(() =>
  form.price
    ? `$${Number(form.price).toLocaleString()}`
    : '$0'
)
</script>

<template>
  <div class="et-page">
    <!-- Success toast -->
    <transition name="et-toast">
      <div v-if="showSuccess" class="et-toast" role="status">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 6L9 17l-5-5" />
        </svg>
        <span>Tour Edited successfully!</span>
      </div>
    </transition>

    <div class="et-container">
      <!-- Header -->
      <header class="et-header">
        <span class="et-eyebrow">Explore Gambia · Host</span>
        <h1 class="et-title">Edit Tour</h1>
        <p class="et-subtitle">Update your tour details at any time.</p>
      </header>

      <form class="et-grid" @submit.prevent="onSubmit" novalidate>
        <!-- LEFT COLUMN -->
        <section class="et-card et-image-card">
          <h2 class="et-card-title">Cover image</h2>
          <p class="et-card-hint">A great photo is the first thing travelers will see.</p>

          <div
            class="et-dropzone"
            :class="{ 'is-dragging': isDragging, 'has-image': imagePreview, 'has-error': errors.image }"
            @click="!imagePreview && openFilePicker()"
            @dragover="onDragOver"
            @dragleave="onDragLeave"
            @drop.prevent="onDrop"
          >
            <template v-if="!imagePreview">
              <div class="et-drop-inner">
                <div class="et-drop-icon">
                  <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="9" cy="9" r="2" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                </div>
                <p class="et-drop-title">Drag & drop your photo here</p>
                <p class="et-drop-sub">or <span class="et-link">browse from your device</span></p>
                <p class="et-drop-meta">JPG, PNG · up to 8MB</p>
              </div>
            </template>
            <template v-else>
              <img :src="imagePreview" alt="Tour cover preview" class="et-preview-img" />
              <button type="button" class="et-change-btn" @click.stop="changeImage">
                Change photo
              </button>
            </template>

            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              class="et-file-input"
              @change="onFileChange"
            />
          </div>
          <p v-if="errors.image" class="et-error">{{ errors.image }}</p>
        </section>

        <!-- RIGHT COLUMN -->
        <section class="et-card et-form-card">
          <h2 class="et-card-title">Tour details</h2>
          <p class="et-card-hint">Tell travelers what makes your experience unique.</p>

          <div class="et-field">
            <label for="title">Tour title</label>
            <input
              id="title" type="text" v-model="form.title"
              placeholder="e.g. Sunset Dolphin Cruise in Tanji"
              :class="{ 'is-invalid': errors.title }"
            />
            <span v-if="errors.title" class="et-error">{{ errors.title }}</span>
          </div>

          <div class="et-field">
            <label for="desc">Description</label>
            <textarea
              id="desc" v-model="form.description" rows="4"
              placeholder="Describe the highlights, what's included, and what travelers can expect..."
              :class="{ 'is-invalid': errors.description }"
            />
            <span v-if="errors.description" class="et-error">{{ errors.description }}</span>
          </div>

          <div class="et-field">
            <label for="location">Location</label>
            <input
              id="location" type="text" v-model="form.location"
              placeholder="e.g. Banjul, The Gambia"
              :class="{ 'is-invalid': errors.location }"
            />
            <span v-if="errors.location" class="et-error">{{ errors.location }}</span>
          </div>

          <div class="et-row">
            <div class="et-field">
              <label for="price">Price per person (USD)</label>
              <input
                id="price" type="number" min="0" v-model="form.price"
                placeholder="1500"
                :class="{ 'is-invalid': errors.price }"
              />
              <span v-if="errors.price" class="et-error">{{ errors.price }}</span>
            </div>
            <div class="et-field">
              <label for="max">Max participants</label>
              <input
                id="max" type="number" min="1" v-model="form.maxParticipants"
                placeholder="12"
                :class="{ 'is-invalid': errors.maxParticipants }"
              />
              <span v-if="errors.maxParticipants" class="et-error">{{ errors.maxParticipants }}</span>
            </div>
          </div>

          <div class="et-row">
            <div class="et-field">
              <label for="start">Start date</label>
              <input
                id="start" type="date" v-model="form.startDate"
                :class="{ 'is-invalid': errors.startDate }"
              />
              <span v-if="errors.startDate" class="et-error">{{ errors.startDate }}</span>
            </div>
            <div class="et-field">
              <label for="end">End date</label>
              <input
                id="end" type="date" v-model="form.endDate"
                :class="{ 'is-invalid': errors.endDate }"
              />
              <span v-if="errors.endDate" class="et-error">{{ errors.endDate }}</span>
            </div>
          </div>
        </section>

        <!-- LIVE PREVIEW -->
        <section class="et-card et-preview-card">
          <h2 class="et-card-title">Live preview</h2>
          <p class="et-card-hint">This is how travelers will see your tour.</p>

          <article class="et-tour-card">
            <div class="et-tour-image">
              <img v-if="imagePreview" :src="imagePreview" alt="Tour preview" />
              <div v-else class="et-tour-image-empty">
                <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
                <span>No image yet</span>
              </div>
              <span class="et-tour-badge">Gambia</span>
            </div>
            <div class="et-tour-body">
              <div class="et-tour-location">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {{ form.location || 'Add a location' }}
              </div>
              <h3 class="et-tour-title">{{ form.title || 'Your tour title appears here' }}</h3>
              <p class="et-tour-desc">
                {{ form.description || 'A short description of your experience will appear here as you type.' }}
              </p>
              <div class="et-tour-footer">
                <div class="et-tour-price">
                  <strong>{{ previewPrice }}</strong>
                  <span>/ person</span>
                </div>
                <div class="et-tour-meta">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 00-3-3.87" />
                    <path d="M16 3.13a4 4 0 010 7.75" />
                  </svg>
                  Up to {{ form.maxParticipants || 0 }}
                </div>
              </div>
            </div>
          </article>
        </section>

        <!-- ACTIONS -->
        <div class="et-actions">
          <button type="button" class="et-btn et-btn-secondary" @click="onCancel" :disabled="isSubmitting">
            Cancel
          </button>
          <button type="submit" class="et-btn et-btn-primary" :disabled="isSubmitting">
            <span v-if="isSubmitting" class="et-spinner" />
            {{ isSubmitting ? 'Saving...' : 'Save Changes' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.et-page {
  --et-primary: #f59e0b;
  --et-primary-dark: #d97706;
  --et-primary-soft: #fff7ed;
  --et-accent: #15803d;
  --et-accent-soft: #ecfdf5;
  --et-text: #0f172a;
  --et-muted: #64748b;
  --et-border: #e5e7eb;
  --et-bg: #fafaf7;
  --et-card: #ffffff;
  --et-danger: #dc2626;
  --et-shadow-sm: 0 1px 2px rgba(15, 23, 42, 0.04);
  --et-shadow: 0 4px 16px -4px rgba(15, 23, 42, 0.08), 0 2px 6px -2px rgba(15, 23, 42, 0.04);
  --et-radius: 16px;

  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, Roboto, Helvetica, Arial, sans-serif;
  background: var(--et-bg);
  color: var(--et-text);
  min-height: 100vh;
  padding: 32px 16px 64px;
  -webkit-font-smoothing: antialiased;
}

.et-container { max-width: 1180px; margin: 0 auto; }

/* Header */
.et-header { margin-bottom: 32px; }
.et-eyebrow {
  display: inline-block;
  font-size: 12px; font-weight: 600; letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--et-primary-dark);
  background: var(--et-primary-soft);
  padding: 6px 12px; border-radius: 999px;
  margin-bottom: 14px;
}
.et-title {
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 700; letter-spacing: -0.02em;
  margin: 0 0 8px;
}
.et-subtitle {
  font-size: 16px; color: var(--et-muted); margin: 0; max-width: 560px;
}

/* Grid */
.et-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}
.et-image-card { grid-column: 1; }
.et-form-card { grid-column: 2; grid-row: span 2; }
.et-preview-card { grid-column: 1; }
.et-actions { grid-column: 1 / -1; }

@media (max-width: 900px) {
  .et-grid { grid-template-columns: 1fr; }
  .et-image-card, .et-form-card, .et-preview-card { grid-column: 1; grid-row: auto; }
}

/* Cards */
.et-card {
  background: var(--et-card);
  border: 1px solid var(--et-border);
  border-radius: var(--et-radius);
  box-shadow: var(--et-shadow);
  padding: 24px;
}
.et-card-title { font-size: 18px; font-weight: 600; margin: 0 0 4px; }
.et-card-hint { font-size: 14px; color: var(--et-muted); margin: 0 0 20px; }

/* Dropzone */
.et-dropzone {
  position: relative;
  border: 2px dashed var(--et-border);
  border-radius: 12px;
  background: #fafafa;
  min-height: 280px;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  overflow: hidden;
}
.et-dropzone:hover { border-color: var(--et-primary); background: var(--et-primary-soft); }
.et-dropzone.is-dragging { border-color: var(--et-primary); background: var(--et-primary-soft); transform: scale(1.01); }
.et-dropzone.has-image { padding: 0; cursor: default; border-style: solid; background: #000; }
.et-dropzone.has-error { border-color: var(--et-danger); }

.et-drop-inner { text-align: center; padding: 24px; }
.et-drop-icon {
  width: 64px; height: 64px; border-radius: 50%;
  background: var(--et-primary-soft); color: var(--et-primary-dark);
  display: inline-flex; align-items: center; justify-content: center;
  margin-bottom: 16px;
}
.et-drop-title { font-size: 16px; font-weight: 600; margin: 0 0 4px; }
.et-drop-sub { font-size: 14px; color: var(--et-muted); margin: 0 0 12px; }
.et-link { color: var(--et-primary-dark); font-weight: 600; }
.et-drop-meta { font-size: 12px; color: var(--et-muted); margin: 0; }
.et-file-input { display: none; }

.et-preview-img { width: 100%; height: 100%; min-height: 280px; max-height: 360px; object-fit: cover; display: block; }
.et-change-btn {
  position: absolute; bottom: 12px; right: 12px;
  background: rgba(255,255,255,0.95);
  border: none; padding: 8px 14px; border-radius: 999px;
  font-size: 13px; font-weight: 600; cursor: pointer;
  box-shadow: var(--et-shadow-sm);
  transition: background 0.2s;
}
.et-change-btn:hover { background: #fff; }

/* Form fields */
.et-field { display: flex; flex-direction: column; margin-bottom: 18px; }
.et-field:last-child { margin-bottom: 0; }
.et-field label { font-size: 14px; font-weight: 600; margin-bottom: 6px; color: var(--et-text); }
.et-field input, .et-field textarea {
  font: inherit; font-size: 15px;
  padding: 11px 14px;
  border: 1px solid var(--et-border);
  border-radius: 10px;
  background: #fff; color: var(--et-text);
  transition: border-color 0.15s, box-shadow 0.15s;
  width: 100%; box-sizing: border-box;
}
.et-field textarea { resize: vertical; min-height: 100px; font-family: inherit; }
.et-field input:focus, .et-field textarea:focus {
  outline: none;
  border-color: var(--et-primary);
  box-shadow: 0 0 0 4px rgba(245, 158, 11, 0.15);
}
.et-field input.is-invalid, .et-field textarea.is-invalid { border-color: var(--et-danger); }
.et-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 18px; }
.et-row .et-field { margin-bottom: 0; }
@media (max-width: 520px) { .et-row { grid-template-columns: 1fr; } }

.et-error { color: var(--et-danger); font-size: 13px; margin-top: 6px; display: block; }

/* Tour preview card */
.et-tour-card {
  border: 1px solid var(--et-border);
  border-radius: 14px;
  overflow: hidden;
  background: #fff;
  transition: transform 0.2s, box-shadow 0.2s;
}
.et-tour-card:hover { transform: translateY(-2px); box-shadow: var(--et-shadow); }
.et-tour-image { position: relative; aspect-ratio: 16 / 10; background: #f3f4f6; }
.et-tour-image img { width: 100%; height: 100%; object-fit: cover; display: block; }
.et-tour-image-empty {
  width: 100%; height: 100%;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 8px; color: #cbd5e1; font-size: 13px;
}
.et-tour-badge {
  position: absolute; top: 12px; left: 12px;
  background: var(--et-accent); color: #fff;
  padding: 4px 10px; border-radius: 999px;
  font-size: 11px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase;
}
.et-tour-body { padding: 18px; }
.et-tour-location {
  display: inline-flex; align-items: center; gap: 5px;
  font-size: 13px; color: var(--et-accent); font-weight: 600; margin-bottom: 6px;
}
.et-tour-title {
  font-size: 18px; font-weight: 600; margin: 0 0 8px;
  line-height: 1.3;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}
.et-tour-desc {
  font-size: 14px; color: var(--et-muted); line-height: 1.5; margin: 0 0 16px;
  display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
}
.et-tour-footer {
  display: flex; justify-content: space-between; align-items: center;
  padding-top: 14px; border-top: 1px solid var(--et-border);
}
.et-tour-price strong { font-size: 18px; color: var(--et-text); }
.et-tour-price span { font-size: 13px; color: var(--et-muted); margin-left: 2px; }
.et-tour-meta {
  display: inline-flex; align-items: center; gap: 5px;
  font-size: 13px; color: var(--et-muted);
}

/* Actions */
.et-actions {
  display: flex; justify-content: flex-end; gap: 12px;
  padding-top: 8px;
}
@media (max-width: 520px) {
  .et-actions { flex-direction: column-reverse; }
  .et-actions .et-btn { width: 100%; }
}

.et-btn {
  font: inherit; font-size: 15px; font-weight: 600;
  padding: 12px 24px; border-radius: 10px;
  border: 1px solid transparent; cursor: pointer;
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  transition: all 0.15s ease;
  min-height: 46px;
}
.et-btn:disabled { opacity: 0.6; cursor: not-allowed; }
.et-btn-primary {
  background: var(--et-primary); color: #fff;
  box-shadow: 0 4px 12px -2px rgba(245, 158, 11, 0.4);
}
.et-btn-primary:hover:not(:disabled) { background: var(--et-primary-dark); transform: translateY(-1px); }
.et-btn-secondary {
  background: #fff; color: var(--et-text); border-color: var(--et-border);
}
.et-btn-secondary:hover:not(:disabled) { background: #f9fafb; border-color: #d1d5db; }

.et-spinner {
  width: 16px; height: 16px;
  border: 2px solid rgba(255,255,255,0.4);
  border-top-color: #fff;
  border-radius: 50%;
  animation: et-spin 0.7s linear infinite;
}
@keyframes et-spin { to { transform: rotate(360deg); } }

/* Toast */
.et-toast {
  position: fixed; top: 24px; right: 24px; z-index: 100;
  background: var(--et-accent); color: #fff;
  padding: 12px 18px; border-radius: 12px;
  display: inline-flex; align-items: center; gap: 10px;
  font-size: 14px; font-weight: 600;
  box-shadow: 0 10px 30px -8px rgba(21, 128, 61, 0.45);
}
.et-toast-enter-from, .et-toast-leave-to { opacity: 0; transform: translateY(-12px); }
.et-toast-enter-active, .et-toast-leave-active { transition: all 0.25s ease; }
</style>
