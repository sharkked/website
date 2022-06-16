import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/vue/views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("@/vue/views/AboutView.vue"),
    },
    {
      path: '/p',
      name: 'accounts',
      component: () => import('@/vue/views/AccountsView.vue')
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import('@/vue/views/ChatView.vue')
    }
  ],
});

export default router;
