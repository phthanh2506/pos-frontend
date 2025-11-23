import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/HelloWorld.vue'
import { fetchCurrentUser, logout } from '../services/auth'
import { useAuthStore } from '../stores/auth'

interface Route {
  path: string,
  name: string,
  component: any,
  meta: {
    layout: string,
    need_authenticate?: boolean
  }
}

const routes: Route[] = [
  { path: '/', name: 'Home', component: Home, meta: { layout: 'default', need_authenticate: true } },
  { path: '/login', name: 'Login', component: () => import('../pages/Login.vue'), meta: { layout: 'auth', need_authenticate: false } },
  { path: '/register', name: 'Register', component: () => import('../pages/Register.vue'), meta: { layout: 'auth', need_authenticate: false } },
  { path: '/forgot', name: 'ForgotPassword', component: () => import('../pages/ForgotPassword.vue'), meta: { layout: 'auth', need_authenticate: false } },
  { path: '/reset/:token', name: 'ResetPassword', component: () => import('../pages/ResetPassword.vue'), meta: { layout: 'auth', need_authenticate: false } },
  { path: '/:pathMatch(.*)*', name: 'Error', component: () => import('../pages/Error.vue'), meta: { layout: 'default' } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

router.beforeEach(async (to) => {
  const authStore = useAuthStore()
  await fetchCurrentUser();
  if (!authStore.user) await logout();
  if (to.meta.need_authenticate && !authStore.user) {
    return { path: '/login' }
  } else if (to.meta.need_authenticate === false && authStore.user) {
    return { path: '/' }
  }
  return true
})
