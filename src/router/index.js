import { createRouter, createWebHistory } from 'vue-router';
import { getToken, getRefreshToken, isTokenValid, removeRefreshToken, removeToken } from '@/services/tokenService';

const guestOnlyRouteNames = new Set(['login', 'signup']);

const routes = [
{
    path: "/",
    redirect: "/home"
  },
  { path: "/home", 
    name: "home",
    component: () => import("../components/Home.vue") 
},
{
    path: "/login",
    name: "login",
    component: () => import("../components/LoginPage.vue")
},
{
    path: "/signup",
    name: "signup",
    component: () => import("../components/SignUp.vue")
},
{
    path: "/tours",
    name: "tour",
    component: () => import("../components/Tours.vue")
},
{
    path: "/tours/:id",
    name: "tour-details",
    component: () => import("../Pages/TourDetails.vue")
},
{
  path: '/tours/create',
  name: 'create-tour',
  component: () => import('../Pages/CreateTour.vue'),
  meta: {
    requiresAuth: true,
    roles: ['guide'] 
  }
},
{
    path: "/profile",
    name: "profile",
    component: () => import("../components/Profile.vue"),
    meta: { requiresAuth: true }
},
{
    path: "/dashboard",
    name: "dashboard",
    component: () => import("../components/Dashboard.vue"),
    meta: { requiresAuth: true }
},
{
    path: "/bookings",
    name: "bookings",
    component: () => import("../components/Bookings.vue"),
    meta: { requiresAuth: true }
},
{
    path: "/payment/success",
    name: "payment-success",
    component: () => import("../components/PaymentSuccess.vue"),
    meta: { requiresAuth: true }
},
{
    path: "/payment/cancel",
    name: "payment-cancel",
    component: () => import("../components/PaymentCancel.vue"),
    meta: { requiresAuth: true }
},
{
    path: "/payment-success",
    redirect: (to) => ({ path: "/payment/success", query: to.query })
},
{
    path: "/payment-cancel",
    redirect: (to) => ({ path: "/payment/cancel", query: to.query })
},

 // Catch-all route for 404 Not Found
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
