<script setup>
import { CalendarDays, Compass, XCircle } from 'lucide-vue-next'
</script>

<template>
  <section class="min-h-screen bg-stone-50">
    <div class="mx-auto flex max-w-3xl flex-col items-center px-4 py-16 text-center sm:px-6 lg:px-8">
      <div class="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-600">
        <XCircle class="h-9 w-9" />
      </div>

      <h1 class="mt-6 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
        Payment cancelled
      </h1>
      <p class="mt-3 max-w-xl text-base leading-7 text-stone-600">
        Your checkout was cancelled and no card payment was completed. You can return to your bookings when you are ready.
      </p>

      <div class="mt-8 flex flex-col gap-3 sm:flex-row">
        <RouterLink
          to="/bookings"
          class="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
        >
          <CalendarDays class="h-4 w-4" />
          My Bookings
        </RouterLink>
        <RouterLink
          to="/tours"
          class="inline-flex items-center justify-center gap-2 rounded-lg border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-700 transition hover:border-stone-400 hover:bg-stone-50"
        >
          <Compass class="h-4 w-4" />
          Explore Tours
        </RouterLink>
      </div>
    </div>
  </section>
</template>
