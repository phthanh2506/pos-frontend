import { apiRequest } from './api'
import { useAuthStore } from '../stores/auth'

export async function login(email: string, password: string) {
  const res = await apiRequest('/auth/login', { method: 'POST', body: { email, password } })
  if (res.ok && res.data?.token) {
    const store = useAuthStore()
    store.setAuth(res.data.token, res.data.user ?? { email })
  }
  return res
}

export async function register(email: string, password: string) {
  const res = await apiRequest('/auth/register', { method: 'POST', body: { email, password } })
  return res
}

export async function forgotPassword(email: string) {
  return apiRequest('/auth/forgot', { method: 'POST', body: { email } })
}

export async function resetPassword(token: string, password: string) {
  return apiRequest('/auth/reset', { method: 'POST', body: { token, password } })
}

export async function fetchCurrentUser() {
  const res = await apiRequest('/auth', { method: 'GET' })
  if (res.ok && res.data?.user) {
    const store = useAuthStore()
    store.user = res.data.user
  }
  return res
}

export async function logout() {
  const store = useAuthStore()
  const res = await apiRequest('/auth/logout', { method: 'POST' })
  if (res.ok) {
    store.clearAuth()
  }
  return res
}

export default { login, register, forgotPassword, resetPassword, fetchCurrentUser, logout }