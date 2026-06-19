import { createRouter, createWebHistory } from 'vue-router';
import { getToken, getRefreshToken, isTokenValid, removeRefreshToken, removeToken } from '@/services/tokenService';

const guestOnlyRouteNames = new Set(['login', 'signup']);

const routes = [
  // PUBLIC ROUTES
  {
    path: '/',
    component: () => import('@/Layouts/PublicLayout.vue'),
    children: [
      { path: '', redirect: '/home' },

      { path: 'home', name: 'home', component: () => import('../components/Home.vue') },
      { path: 'tours', name: 'tour', component: () => import('../components/Tours.vue') },
      { path: 'tours/:id', name: 'tour-details', component: () => import('../Pages/TourDetails.vue') },

      { path: 'login', name: 'login', component: () => import('../components/LoginPage.vue') },
      { path: 'signup', name: 'signup', component: () => import('../components/SignUp.vue') },
    ]
  },

  // User

  {
    path: '/',
    component: () => import('@/Layouts/UserLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: 'profile', name: 'profile', component: () => import('../components/Profile.vue') },
      { path: 'dashboard', name: 'dashboard', component: () => import('../components/Dashboard.vue') },
      { path: 'bookings', name: 'bookings', component: () => import('../components/Bookings.vue') },

      { path: 'payment/success', name: 'payment-success', component: () => import('../components/PaymentSuccess.vue') },
      { path: 'payment/cancel', name: 'payment-cancel', component: () => import('../components/PaymentCancel.vue') },
    ]
  },

   // redirect compatibility routes
  {
    path: '/payment-success',
    redirect: (to) => ({ path: '/payment/success', query: to.query })
  },
  {
    path: '/payment-cancel',
    redirect: (to) => ({ path: '/payment/cancel', query: to.query })
  },

  // =========================
  // GUIDE LAYOUT
  // =========================
  {
    path: '/guide',
    component: () => import('@/Layouts/GuideLayout.vue'),
    meta: { requiresAuth: true, roles: ['guide'] },
    children: [
      { path: 'tours', name: 'guide-tours', component: () => import('../Pages/MyTours.vue') },
      { path: 'tours/create', name: 'create-tour', component: () => import('../Pages/CreateTour.vue') },
      { path: 'tours/edit/:id', name: 'edit-tour', component: () => import('../Pages/EditTour.vue') },
      { path: 'tours/:tourId/participants', name: 'tour-participants', component: () => import('../Pages/ViewParticipants.vue') },
      { path: 'tours/guidedetails/:id', name: 'guide-tour-details', component: () => import('../Pages/GuideTourDetails.vue') },
    ]
  },
  // =========================
  // ADMIN LAYOUT (YOUR LOVABLE DASHBOARD)
  // =========================
  {
    path: '/admin',
    component: () => import('@/Layouts/AdminLayout.vue'),
    meta: { requiresAuth: true, roles: ['Admin'] },
    children: [
      {
        path: 'dashboard',
        name: 'admin-dashboard',
        component: () => import('@/components/Dashboard.vue')
      },/*
      {
        path: 'bookings',
        name: 'admin-bookings',
        component: () => import('@/components/admin/Bookings.vue')
      },
      {
        path: 'payments',
        name: 'admin-payments',
        component: () => import('@/components/admin/Payments.vue')
      }*/
    ]
  },

  // =========================
  // 404 PAGE
  // =========================
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../components/NotFound.vue')
  }

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to) => {
    const token = getToken();
    const tokenRefresh = getRefreshToken();
    const tokenValid = isTokenValid();


    if(token && !tokenValid) {
      
        if(!tokenRefresh){
            removeToken();
            removeRefreshToken();

        }
    }

    if (to.meta.requiresAuth && !token) {
        return { path: '/login', query: { redirect: to.fullPath } };
    }

    if (token && guestOnlyRouteNames.has(to.name)) {
        return { path: '/home' };
    }

    return true;
});

export default router;
