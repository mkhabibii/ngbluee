import { createRouter, createWebHistory } from 'vue-router'
import MainPortfolio from '../views/MainPortfolio.vue'
import Login from '../views/admin/Login.vue'
import Dashboard from '../views/admin/Dashboard.vue'
import { supabase } from '../lib/supabase'

const routes = [
  { path: '/', component: MainPortfolio },
  { path: '/admin/login', component: Login },
  { 
    path: '/admin', 
    component: Dashboard,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Guard untuk memproteksi halaman admin
router.beforeEach(async (to, from, next) => {
  const { data: { session } } = await supabase.auth.getSession()
  if (to.meta.requiresAuth && !session) {
    next('/admin/login')
  } else {
    next()
  }
})

export default router
