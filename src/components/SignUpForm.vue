<template>
  <div class="w-full max-w-md mx-auto bg-white/95 backdrop-blur-sm shadow-2xl border border-slate-100 rounded-2xl">
    <div class="space-y-2 text-center pb-6 px-6 pt-8">
      <h1 class="text-2xl font-bold text-slate-800 text-balance">Join Explore Gambia</h1>
      <p class="text-slate-600 text-pretty">
        Sign up to discover authentic tours with trusted local guides
      </p>
      <p class="text-sm text-amber-600 font-medium">Unlock exclusive cultural experiences when you sign up</p>
    </div>

    <div class="space-y-6 px-6 pb-8">
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="space-y-2">
          <label for="fullName" class="text-sm font-medium text-slate-700 block">
            Full Name
          </label>
          <div class="relative">
            <User class="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Enter your full name"
              v-model="formData.fullName"
              autocomplete="name"
              :aria-invalid="Boolean(validationErrors.fullName)"
              aria-describedby="fullName-error"
              class="pl-10 block w-full rounded-lg border border-slate-200 bg-slate-50 focus:border-amber-500 focus:ring-amber-500 transition-colors h-12 !important"
            />
          </div>
          <p v-if="validationErrors.fullName" id="fullName-error" class="text-sm font-medium text-red-600">
            {{ validationErrors.fullName }}
          </p>
        </div>

        <div class="space-y-2">
          <label for="email" class="text-sm font-medium text-slate-700 block">
            Email
          </label>
          <div class="relative">
            <Mail class="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              v-model="formData.email"
              autocomplete="email"
              :aria-invalid="Boolean(validationErrors.email)"
              aria-describedby="signup-email-error"
              class="pl-10 block w-full rounded-lg border border-slate-200 bg-slate-50 focus:border-amber-500 focus:ring-amber-500 transition-colors h-12"
            />
          </div>
          <p v-if="validationErrors.email" id="signup-email-error" class="text-sm font-medium text-red-600">
            {{ validationErrors.email }}
          </p>
        </div>

        <div class="space-y-2">
          <label for="password" class="text-sm font-medium text-slate-700 block">
            Password
          </label>
          <div class="relative">
            <Lock class="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Create a secure password"
              v-model="formData.password"
              autocomplete="new-password"
              :aria-invalid="Boolean(validationErrors.password)"
              aria-describedby="signup-password-error"
              class="pl-10 block w-full rounded-lg border border-slate-200 bg-slate-50 focus:border-amber-500 focus:ring-amber-500 transition-colors h-12"
            />
          </div>
          <p v-if="validationErrors.password" id="signup-password-error" class="text-sm font-medium text-red-600">
            {{ validationErrors.password }}
          </p>
          <p class="text-xs text-slate-500">
            Your data is secure and used only to enhance your travel experience
          </p>
        </div>

        <div class="space-y-2">
          <label for="confirmPassword" class="text-sm font-medium text-slate-700 block">
            Confirm Password
          </label>
          <div class="relative">
            <Lock class="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              v-model="formData.confirmPassword"
              autocomplete="new-password"
              :aria-invalid="Boolean(validationErrors.confirmPassword)"
              aria-describedby="signup-confirm-password-error"
              class="pl-10 block w-full rounded-lg border border-slate-200 bg-slate-50 focus:border-amber-500 focus:ring-amber-500 transition-colors h-12"
            />
          </div>
          <p v-if="validationErrors.confirmPassword" id="signup-confirm-password-error" class="text-sm font-medium text-red-600">
            {{ validationErrors.confirmPassword }}
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
          class="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
        >
          {{ isLoading ? 'Creating account...' : 'Sign Up' }}
        </button>
      </form>

      <div class="space-y-4">
        <div class="relative">
          <hr class="bg-slate-200 h-px border-0 my-8" />
          <span class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-xs text-slate-500">
            Or sign up with
          </span>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <button
            type="button"
            class="h-12 border border-slate-200 hover:bg-slate-50 transition-colors bg-transparent rounded-lg flex items-center justify-center text-slate-700"
            @click="console.log('Google sign up')"
          >
            <svg class="w-4 h-4 mr-2" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google
          </button>
          <button
            type="button"
            class="h-12 border border-slate-200 hover:bg-slate-50 transition-colors bg-transparent rounded-lg flex items-center justify-center text-slate-700"
            @click="console.log('Facebook sign up')"
          >
            <svg class="w-4 h-4 mr-2" fill="#1877F2" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Facebook
          </button>
        </div>
      </div>

      <div class="pt-4 border-t border-slate-100">
        <div class="flex items-center justify-center space-x-6 text-xs text-slate-600">
          <div class="flex items-center space-x-1">
            <Check class="h-3 w-3 text-green-500" />
            <span>Verified Guides</span>
          </div>
          <div class="flex items-center space-x-1">
            <Check class="h-3 w-3 text-green-500" />
            <span>Secure Payments</span>
          </div>
          <div class="flex items-center space-x-1">
            <Check class="h-3 w-3 text-green-500" />
            <span>24/7 Support</span>
          </div>
        </div>
      </div>

      <div class="text-center text-sm text-slate-600">
        Already have an account?
        <router-link to="/login" class="text-amber-600 hover:text-amber-700 font-medium transition-colors">Sign in</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { User, Mail, Lock, Check } from 'lucide-vue-next';
import { useAuthStore } from '@/stores/authStore';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const formData = reactive({
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
});

const validationErrors = reactive({
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
});

const errorMessage = ref('');
const isLoading = ref(false);
const authStore = useAuthStore();
const router = useRouter();

const getNameParts = () => {
  const nameParts = formData.fullName.trim().split(/\s+/);

  return {
    firstName: nameParts[0] || '',
    lastName: nameParts.slice(1).join(' ')
  };
};

const validateForm = () => {
  validationErrors.fullName = '';
  validationErrors.email = '';
  validationErrors.password = '';
  validationErrors.confirmPassword = '';

  const { firstName, lastName } = getNameParts();

  if (!formData.fullName.trim()) {
    validationErrors.fullName = 'Full name is required.';
  } else if (!firstName || !lastName) {
    validationErrors.fullName = 'Enter both first and last name.';
  }

  if (!formData.email.trim()) {
    validationErrors.email = 'Email is required.';
  } else if (!emailPattern.test(formData.email.trim())) {
    validationErrors.email = 'Enter a valid email address.';
  }

  if (!formData.password) {
    validationErrors.password = 'Password is required.';
  } else if (formData.password.length < 6) {
    validationErrors.password = 'Password must be at least 6 characters.';
  }

  if (!formData.confirmPassword) {
    validationErrors.confirmPassword = 'Confirm password is required.';
  } else if (formData.confirmPassword !== formData.password) {
    validationErrors.confirmPassword = 'Passwords do not match.';
  }

  return !validationErrors.fullName
    && !validationErrors.email
    && !validationErrors.password
    && !validationErrors.confirmPassword;
};

const buildRegisterPayload = () => {
  const { firstName, lastName } = getNameParts();

  return {
    email: formData.email.trim(),
    password: formData.password,
    firstName,
    lastName,
    roles: ['user']
  };
};

const handleSubmit = async () => {
  errorMessage.value = '';

  if (!validateForm()) {
    return;
  }

  isLoading.value = true;

  try {
    await authStore.register(buildRegisterPayload());
    await router.replace(authStore.isAuthenticated ? '/home' : '/login');
  } catch (error) {
    errorMessage.value = error?.message || 'Unable to create your account. Please try again.';
  } finally {
    isLoading.value = false;
  }
};
</script>
