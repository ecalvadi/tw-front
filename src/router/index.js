import { createWebHistory, createRouter } from "vue-router";

const routes =  [
  {
    path: "/",
    component: () => import('../components/LandingView.vue'),
  },
  {
    path: "/login",
    component: () => import('../components/LoginView.vue'),
  },
  {
    path: "/logout",
    component: () => import('../components/LogoutView.vue'),
  },
  {
    path: "/home",
    component: () => import('../components/HomeView.vue'),
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: routes,
  linkActiveClass: 'active'
})

export default router;
