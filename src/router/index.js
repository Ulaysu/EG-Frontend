import { createRouter, createWebHistory } from 'vue-router';
const routes = [
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
export default router;