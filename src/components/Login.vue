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
              autocomplete="email"
              :aria-invalid="Boolean(validationErrors.email)"
              aria-describedby="email-error"
              class="pl-10 block w-full rounded-lg border border-slate-200 focus:border-amber-500 focus:ring-amber-500/20 heignt h-12"
            />
          </div>
          <p v-if="validationErrors.email" id="email-error" class="text-sm font-medium text-red-600">
            {{ validationErrors.email }}
          </p>
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
              autocomplete="current-password"
              :aria-invalid="Boolean(validationErrors.password)"
              aria-describedby="password-error"
              class="pl-10 block w-full rounded-lg border border-slate-200 focus:border-amber-500 focus:ring-amber-500/20 h-12"
            />
          </div>
          <p v-if="validationErrors.password" id="password-error" class="text-sm font-medium text-red-600">
            {{ validationErrors.password }}
          </p>
        </div>

        <div
          v-if="errorMessage"
          class="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
          role="alert"
        >
          {{ errorMessage }}
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="w-full h-12 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
        >
          {{ isLoading ? 'Signing in...' : 'Sign In' }}
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
          <RouterLink to="/signup" class="text-amber-600 hover:text-amber-700 font-semibold hover:underline transition-colors">
            Create one
          </RouterLink>
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
import { reactive, ref } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { Mail, Lock, Check, Chrome } from 'lucide-vue-next';
import { useAuthStore } from '@/stores/authStore';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const email = ref('');
const password = ref('');
const isLoading = ref(false);
const errorMessage = ref('');
const validationErrors = reactive({
  email: '',
  password: ''
});

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

const validateForm = () => {
  validationErrors.email = '';
  validationErrors.password = '';

  if (!email.value.trim()) {
    validationErrors.email = 'Email is required.';
  } else if (!emailPattern.test(email.value.trim())) {
    validationErrors.email = 'Enter a valid email address.';
  }

  if (!password.value) {
    validationErrors.password = 'Password is required.';
  } else if (password.value.length < 6) {
    validationErrors.password = 'Password must be at least 6 characters.';
  }

  return !validationErrors.email && !validationErrors.password;
};

const getRedirectPath = () => {
  const redirect = route.query.redirect;
  return typeof redirect === 'string' && redirect.startsWith('/') ? redirect : '/home';
};

const handleSubmit = async () => {
  errorMessage.value = '';

  if (!validateForm()) {
    return;
  }

  isLoading.value = true;

  try {
    await authStore.login(email.value.trim(), password.value);
    
    // Ensure we have the latest user data and roles
    await authStore.fetchMe();

    // Respect redirect query if one exists
    const redirect = route.query.redirect;
    if (typeof redirect === 'string' && redirect.startsWith('/')) {
      await router.replace(redirect);
      return;
    }

    // Role-based redirects
    if (authStore.user?.roles?.includes('Admin')) {
      await router.replace({ name: 'admin-dashboard' });
    }
    else if (authStore.user?.roles?.includes('Guide')) {
      await router.replace({ name: 'guide-tours' });
    }
    else {
      await router.replace({ name: 'home' });
    }
  } catch (error) {
    errorMessage.value = error?.message || 'Unable to sign in. Please try again.';
  } finally {
    isLoading.value = false;
  }
};
</script>
