

<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import {
  getMe,
  updateMe,
  getGuideProfile,
  updateGuideProfile
} from '@/services/authService'

// ---------- Mock state ----------
const loading = ref(true)
const error = ref(null)
const saving = ref(false)
const toast = reactive({ show: false, type: 'success', message: '' })

const user = reactive({
  firstName: '',
  lastName: '',
  email: '',
  roles: [],
})

const guide = reactive({
  tourGuideId: '',
  phoneNumber: '',
  bio: '',
  isAvailable: false,
})

// ---------- Derived ----------
const isGuide = computed(() =>
  user.roles?.some((r) => r.toLowerCase().includes('guide'))
)

const initials = computed(() => {
  const a = (user.firstName || '').trim()[0] || ''
  const b = (user.lastName || '').trim()[0] || ''
  return (a + b).toUpperCase() || '?'
})

const fullName = computed(() => {
  const n = `${user.firstName || ''} ${user.lastName || ''}`.trim()
  return n || 'Unnamed Traveler'
})

const completion = computed(() => {
  const baseFields = [user.firstName, user.lastName, user.email]
  const guideFields = isGuide.value
    ? [guide.phoneNumber, guide.bio]
    : []
  const all = [...baseFields, ...guideFields]
  const filled = all.filter((v) => (v ?? '').toString().trim().length > 0).length
  return Math.round((filled / all.length) * 100)
})

async function loadProfile() {
  loading.value = true
  error.value = null

  try {
    const userResponse = await getMe()

    Object.assign(user, {
      firstName: userResponse.firstName,
      lastName: userResponse.lastName,
      email: userResponse.email,
      roles: userResponse.roles || []
    })

    if (
      userResponse.roles?.some(
        role => role.toLowerCase() === 'guide'
      )
    ) {
      const guideResponse = await getGuideProfile()

      Object.assign(guide, guideResponse)
    }
  }
  catch (err) {
    error.value = err.message || 'Unable to load profile'
  }
  finally {
    loading.value = false
  }
}

onMounted(async () => {
  await loadProfile()
})

// ---------- Actions ----------
function showToast(message, type = 'success') {
  toast.message = message
  toast.type = type
  toast.show = true
  setTimeout(() => (toast.show = false), 2800)
}

async function saveChanges() {
  saving.value = true

  try {
    await updateMe({
      firstName: user.firstName,
      lastName: user.lastName
    })

    if (isGuide.value) {
      await updateGuideProfile({
        phoneNumber: guide.phoneNumber,
        bio: guide.bio
      })
    }

    showToast('Profile updated successfully')
  }
  catch (err) {
    showToast(err.message || 'Failed to update profile', 'error')
  }
  finally {
    saving.value = false
  }
}

// Reset toast on unmount-ish
watch(() => toast.show, () => {})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-amber-50/60 via-white to-white text-slate-800">
    <!-- Decorative top band -->
    <div class="h-2 w-full bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400" />

    <main class="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <!-- Page title -->
      <header class="mb-6 sm:mb-8">
        <p class="text-xs font-semibold uppercase tracking-[0.18em] text-orange-600">
          Explore Gambia
        </p>
        <h1 class="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          My Profile
        </h1>
        <p class="mt-1 text-sm text-slate-500">
          Manage your account details and guide information.
        </p>
      </header>

      <!-- ERROR STATE -->
      <section
        v-if="error && !loading"
        class="rounded-2xl border border-orange-100 bg-white p-8 text-center shadow-sm"
        role="alert"
      >
        <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
          <svg class="h-6 w-6 text-orange-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m0 3.75h.008M10.34 3.94 2.7 17.3a1.875 1.875 0 0 0 1.66 2.78h15.28a1.875 1.875 0 0 0 1.66-2.78L13.66 3.94a1.875 1.875 0 0 0-3.32 0Z"/>
          </svg>
        </div>
        <h2 class="mt-4 text-lg font-semibold text-slate-900">Something went wrong</h2>
        <p class="mt-1 text-sm text-slate-500">{{ error }}</p>
        <button
          @click="loadProfile"
          class="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:shadow-md hover:brightness-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
        >
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992V4.355M2.985 19.644v-4.992h4.992m0 0-3.181-3.183a8.25 8.25 0 0 1 13.803-3.7L19.5 4.5m-2.516 14.144L19.5 16.5m-1.531-1.318-3.181 3.183a8.25 8.25 0 0 1-13.803-3.7"/>
          </svg>
          Try again
        </button>
      </section>

      <!-- LOADING SKELETON -->
      <section v-else-if="loading" class="space-y-6" aria-busy="true" aria-live="polite">
        <div class="rounded-2xl border border-amber-100 bg-white p-6 shadow-sm sm:p-8">
          <div class="flex flex-col items-center gap-5 sm:flex-row sm:items-center">
            <div class="h-20 w-20 animate-pulse rounded-full bg-amber-100" />
            <div class="flex-1 space-y-3 text-center sm:text-left">
              <div class="mx-auto h-5 w-40 animate-pulse rounded bg-amber-100 sm:mx-0" />
              <div class="mx-auto h-4 w-56 animate-pulse rounded bg-amber-50 sm:mx-0" />
              <div class="mx-auto h-3 w-full max-w-md animate-pulse rounded bg-amber-50 sm:mx-0" />
            </div>
          </div>
        </div>
        <div class="rounded-2xl border border-amber-100 bg-white p-6 shadow-sm sm:p-8">
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div v-for="i in 4" :key="i" class="h-14 animate-pulse rounded-xl bg-amber-50" />
          </div>
        </div>
      </section>

      <!-- CONTENT -->
      <section v-else class="space-y-6">
        <!-- HEADER CARD -->
        <div
          class="overflow-hidden rounded-2xl border border-amber-100 bg-white shadow-sm"
        >
          <div class="relative h-24 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 sm:h-28">
            <div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(circle at 20% 20%, white 1px, transparent 1px); background-size: 16px 16px;" />
          </div>

          <div class="px-6 pb-6 sm:px-8 sm:pb-8">
            <div class="-mt-12 flex flex-col items-center gap-4 sm:-mt-14 sm:flex-row sm:items-end sm:gap-6">
              <!-- Avatar -->
              <div
                class="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-amber-400 to-orange-600 text-2xl font-bold text-white shadow-md sm:h-28 sm:w-28 sm:text-3xl"
                aria-label="User initials"
              >
                {{ initials }}
              </div>

              <!-- Identity -->
              <div class="flex-1 text-center sm:pb-1 sm:text-left">
                <h2 class="text-xl font-bold text-slate-900 sm:text-2xl">
                  {{ fullName }}
                </h2>
                <p class="mt-0.5 flex items-center justify-center gap-1.5 text-sm text-slate-500 sm:justify-start">
                  <svg class="h-4 w-4 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"/>
                  </svg>
                  {{ user.email || '—' }}
                </p>

                <!-- Role badges -->
                <div class="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
                  <span
                    v-for="role in user.roles"
                    :key="role"
                    class="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-orange-700"
                  >
                    <span class="h-1.5 w-1.5 rounded-full bg-orange-500" />
                    {{ role }}
                  </span>
                  <span
                    v-if="!user.roles?.length"
                    class="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-500"
                  >
                    No roles assigned
                  </span>
                </div>
              </div>
            </div>

            <!-- Completion -->
            <div class="mt-6 rounded-xl bg-amber-50/60 p-4">
              <div class="flex items-center justify-between text-sm">
                <span class="font-semibold text-slate-700">Profile completion</span>
                <span class="font-bold text-orange-600">{{ completion }}%</span>
              </div>
              <div
                class="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-white ring-1 ring-amber-100"
                role="progressbar"
                :aria-valuenow="completion"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <div
                  class="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-600 transition-all duration-700 ease-out"
                  :style="{ width: completion + '%' }"
                />
              </div>
              <p v-if="isGuide" class="mt-2 text-xs text-slate-500">
                Complete your profile so travelers and the Explore Gambia team can recognize you.
              </p>
            </div>
          </div>
        </div>

        <!-- ACCOUNT INFORMATION CARD -->
        <div class="rounded-2xl border border-amber-100 bg-white p-6 shadow-sm sm:p-8">
          <div class="mb-5 flex items-center gap-3">
            <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 text-orange-600">
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25a7.5 7.5 0 0 1 15 0v.75H4.5v-.75Z"/>
              </svg>
            </span>
            <div>
              <h3 class="text-base font-semibold text-slate-900 sm:text-lg">Account information</h3>
              <p class="text-xs text-slate-500">Your personal details on Explore Gambia.</p>
            </div>
          </div>

          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label class="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">First name</label>
              <input
                v-model="user.firstName"
                type="text"
                placeholder="Awa"
                class="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 hover:border-amber-300 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200"
              />
            </div>
            <div>
              <label class="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">Last name</label>
              <input
                v-model="user.lastName"
                type="text"
                placeholder="Touray"
                class="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 hover:border-amber-300 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200"
              />
            </div>
            <div class="sm:col-span-2">
              <label class="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">Email</label>
              <div class="relative">
                <input
                  :value="user.email"
                  type="email"
                  readonly
                  class="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 pr-24 text-sm text-slate-700"
                />
                <span class="absolute right-2 top-1/2 -translate-y-1/2 rounded-md bg-amber-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-orange-700">
                  Read only
                </span>
              </div>
            </div>
            <div class="sm:col-span-2">
              <label class="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">Roles</label>
              <div class="flex flex-wrap gap-2 rounded-xl border border-dashed border-amber-200 bg-amber-50/40 p-3">
                <span
                  v-for="role in user.roles"
                  :key="role"
                  class="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-orange-700 shadow-sm ring-1 ring-amber-200"
                >
                  {{ role }}
                </span>
                <span v-if="!user.roles?.length" class="text-xs text-slate-500">
                  No roles assigned yet.
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- GUIDE INFORMATION CARD -->
        <div
          v-if="isGuide"
          class="rounded-2xl border border-amber-100 bg-white p-6 shadow-sm sm:p-8"
        >
          <div class="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div class="flex items-center gap-3">
              <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-sm">
                <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"/>
                </svg>
              </span>
              <div>
                <h3 class="text-base font-semibold text-slate-900 sm:text-lg">Guide information</h3>
                <p class="text-xs text-slate-500">
                  
                </p>
              </div>
            </div>

            <!-- Availability toggle -->
            <label class="inline-flex select-none items-center gap-3">
              <span class="text-sm font-medium text-slate-700">
                {{ guide.isAvailable ? 'Available for tours' : 'Currently unavailable' }}
              </span>
              <button
                type="button"
                role="switch"
                :aria-checked="guide.isAvailable"
                @click="guide.isAvailable = !guide.isAvailable"
                :class="[
                  'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2',
                  guide.isAvailable ? 'bg-gradient-to-r from-amber-500 to-orange-600' : 'bg-slate-200',
                ]"
              >
                <span
                  :class="[
                    'inline-block h-5 w-5 transform rounded-full bg-white shadow ring-1 ring-black/5 transition',
                    guide.isAvailable ? 'translate-x-5' : 'translate-x-0.5',
                  ]"
                />
              </button>
            </label>
          </div>

          <div class="grid grid-cols-1 gap-4">
            <div>
              <label class="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">Phone number</label>
              <div class="relative">
                <span class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-amber-500">
                  <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106a1.125 1.125 0 0 0-1.173.417l-.97 1.293a.75.75 0 0 1-.93.22 12.07 12.07 0 0 1-5.594-5.594.75.75 0 0 1 .22-.93l1.293-.97a1.125 1.125 0 0 0 .417-1.173L8.382 3.102A1.125 1.125 0 0 0 7.29 2.25H5.92A2.25 2.25 0 0 0 3.67 4.5"/>
                  </svg>
                </span>
                <input
                  v-model="guide.phoneNumber"
                  type="tel"
                  placeholder="+220 700 0000"
                  class="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3.5 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 hover:border-amber-300 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200"
                />
              </div>
            </div>

            <div>
              <label class="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">Bio</label>
              <textarea
                v-model="guide.bio"
                rows="5"
                maxlength="500"
                placeholder="Tell travelers about your guiding experience, languages, and favorite places in The Gambia..."
                class="w-full resize-y rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm leading-relaxed text-slate-900 shadow-sm transition placeholder:text-slate-400 hover:border-amber-300 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200"
              />
              <div class="mt-1 flex justify-between text-xs text-slate-400">
                <span>Share what makes your tours special.</span>
                <span>{{ (guide.bio || '').length }} / 500</span>
              </div>
            </div>
          </div>

          <!-- Save -->
          
        </div>

      
        <!-- EMPTY GUIDE STATE (non-guides) -->
        <div
          v-else
          class="rounded-2xl border border-dashed border-amber-200 bg-amber-50/40 p-8 text-center"
        >
          <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-sm">
            <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6"/>
            </svg>
          </div>
          <h3 class="mt-4 text-base font-semibold text-slate-900">Become a Tour Guide</h3>
          <p class="mx-auto mt-1 max-w-md text-sm text-slate-500">
            Share your love for The Gambia with travelers from around the world. Apply to become a verified Explore Gambia guide.
          </p>
        </div>

          <!-- Save Buttons For Everyone -->
<div
  class="rounded-2xl border border-amber-100 bg-white p-6 shadow-sm"
>
  <div class="flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:justify-end">
    <button
      type="button"
      @click="loadProfile"
      class="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-amber-300 hover:text-orange-600"
    >
      Reset
    </button>

    <button
      type="button"
      :disabled="saving"
      @click="saveChanges"
      class="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm disabled:opacity-70"
    >
      {{ saving ? 'Saving...' : 'Save Changes' }}
    </button>
  </div>
</div>
      </section>
    </main>

    <!-- TOAST -->
    <div
      aria-live="polite"
      class="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-4 sm:bottom-6"
    >
      <transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="translate-y-3 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="translate-y-3 opacity-0"
      >
        <div
          v-if="toast.show"
          class="pointer-events-auto flex items-center gap-3 rounded-xl border border-amber-100 bg-white px-4 py-3 shadow-lg ring-1 ring-black/5"
          role="status"
        >
          <span
            :class="[
              'flex h-8 w-8 items-center justify-center rounded-full text-white',
              toast.type === 'success'
                ? 'bg-gradient-to-br from-amber-500 to-orange-600'
                : 'bg-red-500',
            ]"
          >
            <svg v-if="toast.type === 'success'" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/>
            </svg>
            <svg v-else class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/>
            </svg>
          </span>
          <p class="text-sm font-medium text-slate-800">{{ toast.message }}</p>
        </div>
      </transition>
    </div>
  </div>
</template>

