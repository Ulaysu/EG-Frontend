<template>
  <div class="w-full max-w-md mx-auto bg-white shadow-2xl rounded-2xl border-0">
    <div class="space-y-3 text-center pb-6 px-6 pt-8">
      <h1 class="text-3xl font-bold text-slate-800 text-balance">Welcome Back</h1>
      <p class="text-slate-500 text-base leading-relaxed text-pretty">
        Sign in to continue exploring authentic Gambian tours & experiences.
      </p>
    </div>

    <div class="space-y-6 px-6 pb-8">
      <form class="space-y-4" @submit.prevent="handleSubmit">
        <div class="space-y-2">
          <label for="email" class="text-slate-700 font-medium block">
            Email
          </label>
          <div class="relative">
            <Mail class="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              v-model="email"
              class="pl-10 block w-full rounded-lg border border-slate-200 focus:border-amber-500 focus:ring-amber-500/20 h-12"
            />
          </div>
        </div>

        <div class="space-y-2">
          <label for="password" class="text-slate-700 font-medium block">
            Password
          </label>
          <div class="relative">
            <Lock class="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              v-model="password"
              class="pl-10 block w-full rounded-lg border border-slate-200 focus:border-amber-500 focus:ring-amber-500/20 h-12"
            />
          </div>
        </div>

        <button
          type="submit"
          class="w-full h-12 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
        >
          Sign In
        </button>
      </form>

      <div class="relative">
        <hr class="bg-slate-200 h-px border-0 my-8" />
        <span class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-sm text-slate-500">
          or continue with
        </span>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <button
          type="button"
          class="h-12 border border-slate-200 hover:border-amber-300 hover:bg-amber-50 transition-colors duration-200 bg-transparent rounded-lg flex items-center justify-center text-slate-700"
        >
          <Chrome class="h-4 w-4 mr-2" />
          Google
        </button>
        <button
          type="button"
          class="h-12 border border-slate-200 hover:border-amber-300 hover:bg-amber-50 transition-colors duration-200 bg-transparent rounded-lg flex items-center justify-center text-slate-700"
        >
          <div class="w-4 h-4 mr-2 bg-blue-600 rounded-sm flex items-center justify-center text-white text-xs font-bold">
            f
          </div>
          Facebook
        </button>
      </div>

      <div class="text-center">
        <p class="text-slate-600">
          Don't have an account?
          <a href="#" class="text-amber-600 hover:text-amber-700 font-semibold hover:underline transition-colors">
            Create one
          </a>
        </p>
      </div>

      <div class="pt-4 border-t border-slate-100">
        <div class="flex items-center justify-center space-x-6 text-sm text-slate-500">
          <div class="flex items-center space-x-1">
            <Check class="h-4 w-4 text-green-500" />
            <span>Secure login</span>
          </div>
          <div class="flex items-center space-x-1">
            <Check class="h-4 w-4 text-green-500" />
            <span>24/7 Support</span>
          </div>
          <div class="flex items-center space-x-1">
            <Check class="h-4 w-4 text-green-500" />
            <span>Trusted by local guides</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Mail, Lock, Check, Chrome } from 'lucide-vue-next';

// State management with `ref`
const email = ref('');
const password = ref('');

// A method to handle form submission
const handleSubmit = () => {
  console.log('Form submitted!');
  console.log('Email:', email.value);
  console.log('Password:', password.value);
  // Add your login logic here
};
</script>