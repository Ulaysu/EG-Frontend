<template>
    <section id="experiences" class="py-16 bg-gradient-to-br from-amber-50 to-orange-50">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <div class="mb-4 inline-block bg-orange-100 text-orange-800 px-4 py-1.5 rounded-full">
          Curated Experiences
        </div>
        <h2 class="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
          Discover Authentic Gambian Experiences
        </h2>
        <p class="text-lg text-slate-600 max-w-2xl mx-auto">
          From river cruises to cultural immersions, find the perfect experience for your Gambian adventure.
        </p>
      </div>

      <!-- Experience Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Experience Card 1 -->
        <div class="overflow-hidden bg-white rounded-lg shadow hover:shadow-xl transition-shadow duration-300">
          <img src="/src/assets/river-cruise.jpg" alt="River Cruise Experience" class="w-full h-48 object-cover" />
          <div class="p-5">
            <div class="flex justify-between items-center mb-3">
              <span class="text-sm font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                River Cruise
              </span>
              <div class="text-amber-500 text-sm font-medium">★ 4.9 (128)</div>
            </div>
            <h3 class="text-xl font-bold text-slate-800 mb-2">Gambia River Sunset Cruise</h3>
            <p class="text-slate-600 text-sm mb-4">
              Experience the magic of the Gambia River with our sunset cruise, complete with dinner and live music.
            </p>
            <div class="flex items-center justify-between">
              <div class="text-sm text-slate-700">📍 Banjul</div>
              <div class="text-lg font-bold text-amber-600">
                $45 <span class="text-sm font-normal text-slate-600">/ person</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Experience Card 2 -->
        <div class="overflow-hidden bg-white rounded-lg shadow hover:shadow-xl transition-shadow duration-300">
          <img src="/src/assets/dance.jpg" alt="Cultural Dance Experience" class="w-full h-48 object-cover" />
          <div class="p-5">
            <div class="flex justify-between items-center mb-3">
              <span class="text-sm font-semibold text-orange-700 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded">
                Cultural
              </span>
              <div class="text-amber-500 text-sm font-medium">★ 4.8 (93)</div>
            </div>
            <h3 class="text-xl font-bold text-slate-800 mb-2">Traditional Dance Workshop</h3>
            <p class="text-slate-600 text-sm mb-4">
              Learn traditional Gambian dances from expert performers in this interactive cultural workshop.
            </p>
            <div class="flex items-center justify-between">
              <div class="text-sm text-slate-700">📍 Serrekunda</div>
              <div class="text-lg font-bold text-amber-600">
                $30 <span class="text-sm font-normal text-slate-600">/ person</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Experience Card 3 -->
        <div class="overflow-hidden bg-white rounded-lg shadow hover:shadow-xl transition-shadow duration-300">
          <img src="/src/assets/bijilo.jpg" alt="Wildlife Safari Experience" class="w-full h-48 object-cover" />
          <div class="p-5">
            <div class="flex justify-between items-center mb-3">
              <span class="text-sm font-semibold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded">
                Wildlife
              </span>
              <div class="text-amber-500 text-sm font-medium">★ 4.7 (56)</div>
            </div>
            <h3 class="text-xl font-bold text-slate-800 mb-2">Bijilo Forest Park Safari</h3>
            <p class="text-slate-600 text-sm mb-4">
              Explore the famous Monkey Park and discover diverse wildlife with our expert naturalist guides.
            </p>
            <div class="flex items-center justify-between">
              <div class="text-sm text-slate-700">📍 Bijilo</div>
              <div class="text-lg font-bold text-amber-600">
                $35 <span class="text-sm font-normal text-slate-600">/ person</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center mt-12">
        <button class="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg">
          View All Experiences ➜
        </button>
      </div>
    </div>
  </section>

</template>
<script setup>
</script>