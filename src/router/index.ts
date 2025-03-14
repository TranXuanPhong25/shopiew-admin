import { createRouter, createWebHistory } from 'vue-router'
import Default from "@/views/DefaultView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: Default
    },
    {
      path: '/category',
      name: "category view",
      component: () => import('@/views/category/CategoryView.vue')
    }
  ],
})

export default router
