import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/HelloWorld.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: () => import('../pages/Login.vue'), meta: { layout: 'auth' } },
  { path: '/register', name: 'Register', component: () => import('../pages/Register.vue'), meta: { layout: 'auth' } },
  { path: '/forgot', name: 'ForgotPassword', component: () => import('../pages/ForgotPassword.vue'), meta: { layout: 'auth' } },
  { path: '/reset/:token', name: 'ResetPassword', component: () => import('../pages/ResetPassword.vue'), meta: { layout: 'auth' } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

router.beforeEach((to) => {
  try {
    const token = localStorage.getItem('auth.token')
    const protectedAuthPaths = ['/login', '/register', '/forgot']
    if (token && protectedAuthPaths.includes(to.path)) {
      return { path: '/' }
    }
  } catch {}

  try {
    const layout = (to.meta?.layout as string) || 'default'
    const token = localStorage.getItem('auth.token')
    if (layout !== 'auth' && !token) {
      if (to.path !== '/login') return { path: '/login' }
    }
  } catch {}

  return true
})
