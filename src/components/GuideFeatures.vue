<template>
     <!-- Features for Tour Guides -->
  <section id="guides" class="py-16 bg-gradient-to-br from-amber-50 to-orange-50">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <div class="mb-4 inline-block bg-orange-100 text-orange-800 px-4 py-1.5 rounded-full">
          For Tour Guides
        </div>
        <h2 class="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
          Grow Your Tour Business with Explore Gambia
        </h2>
        <p class="text-lg text-slate-600 max-w-2xl mx-auto">
          Join our community of verified guides and connect with travelers from around the world.
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <!-- Guide Feature 1 -->
        <div class="bg-white hover:shadow-xl transition-shadow duration-300 rounded-xl p-6">
          <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
            <Megaphone class="w-8 h-8 text-orange-600" />

          </div>
          <h3 class="text-xl font-bold text-slate-800 mb-2">List & Promote Tours</h3>
          <p class="text-slate-600 mb-4">
            Create attractive listings for your tours and experiences with photos, descriptions, and pricing.
          </p>
          <ul class="space-y-2 text-slate-600">
            <li class="flex items-center text-slate-600">
                <CheckCircle class="w-4 h-4 text-green-500 mr-2" />
                <span>Easy-to-use listing tools</span>
            </li>
            <li class="flex items-center text-slate-600">
                <CheckCircle class="w-4 h-4 text-green-500 mr-2" />
                <span>Photo gallery uploads</span></li>
            <li class="flex items-center text-slate-600">
                <CheckCircle class="w-4 h-4 text-green-500 mr-2" />
                <span>scheduling options</span> 
            </li>
          </ul>
        </div>

        <!-- Guide Feature 2 -->
        <div class="bg-white hover:shadow-xl transition-shadow duration-300 rounded-xl p-6">
          <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
            <CreditCard class="w-8 h-8 text-orange-600" />  
          </div>
          <h3 class="text-xl font-bold text-slate-800 mb-2">Receive Payments Online</h3>
          <p class="text-slate-600 mb-4">
            Get paid securely and promptly for your services through our trusted payment system.
          </p>
          <ul class="space-y-2">
                  <li class="flex items-center text-slate-600">
                    <CheckCircle class="w-4 h-4 text-green-500 mr-2" />
                    <span>Multiple payout methods</span>
                  </li>
                  <li class="flex items-center text-slate-600">
                    <CheckCircle class="w-4 h-4 text-green-500 mr-2" />
                    <span>Weekly payment processing</span>
                  </li>
                  <li class="flex items-center text-slate-600">
                    <CheckCircle class="w-4 h-4 text-green-500 mr-2" />
                    <span>Transparent fee structure</span>
                  </li>
                </ul>
        </div>

        <!-- Guide Feature 3 -->
        <div class="bg-white hover:shadow-xl transition-shadow duration-300 rounded-xl p-6">
          <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
            <TrendingUp class="w-8 h-8 text-orange-600" />
          </div>
          <h3 class="text-xl font-bold text-slate-800 mb-2">Premium Exposure</h3>
          <p class="text-slate-600 mb-4">
            Get featured in our promotions and gain visibility with travelers planning their Gambian adventure.
          </p>
          <ul class="space-y-2 text-slate-600">
            <li class="flex items-center text-slate-600">
                <CheckCircle class="w-4 h-4 text-green-500 mr-2" />
                <span>Featured listings</span>
            </li>
            <li class="flex items-center text-slate-600">
                <CheckCircle class="w-4 h-4 text-green-500 mr-2" />
                <span>Social media promotion</span></li>
            <li class="flex items-center text-slate-600">
                <CheckCircle class="w-4 h-4 text-green-500 mr-2" />
                <span>Marketing support</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="text-center mt-12">
        <button class="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg rounded-full">
          Become a Guide Partner
        </button>
      </div>
    </div>
  </section>

</template>
<script setup>
      import { Globe,
  MapPin,
  Star,
  CreditCard,
  MessageCircle,
  Languages,
  Megaphone,
  CheckCircle,
  TrendingUp,
  ChevronRight,
  Menu,
  Search,
  Calendar,
  Users,
  Heart, } from 'lucide-vue-next'
</script>