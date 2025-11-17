type ApiResponse = { ok: boolean; data?: any; error?: string }

import { handleMockRequest } from './mock'
import { useLoadingStore } from '../stores/loading'

export async function apiRequest(path: string, opts: { method?: string; body?: any } = {}): Promise<ApiResponse> {
  const method = (opts.method || 'GET').toUpperCase()
  const useMock = import.meta.env.VITE_USE_MOCK === 'true'

  let token: string | null = null
  try {
    token = localStorage.getItem('auth.token')
  } catch {
    token = null
  }

  let loading: ReturnType<typeof useLoadingStore> | null = null
  try {
    loading = useLoadingStore()
  } catch {
    loading = null
  }

  const doMockRequest = async (): Promise<ApiResponse> => {
    const mockBody = opts.body ? { ...opts.body } : undefined
    const mockHeaders: Record<string, string> = {}
    if (token) mockHeaders['Authorization'] = `Bearer ${token}`
    if (loading) loading.start()
    try {
      return await handleMockRequest(path, method, mockBody, mockHeaders)
    } finally {
      if (loading) loading.stop()
    }
  }

  const doRealRequest = async (): Promise<ApiResponse> => {
    if (loading) loading.start()
    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' }
      if (token) headers['Authorization'] = `Bearer ${token}`

      const res = await fetch(path, {
        method,
        headers,
        body: opts.body ? JSON.stringify(opts.body) : undefined
      })
      const data = await res.json().catch(() => null)
      if (!res.ok) return { ok: false, error: data?.message || res.statusText }
      return { ok: true, data }
    } catch (err: any) {
      return { ok: false, error: err?.message || 'Network error' }
    } finally {
      if (loading) loading.stop()
    }
  }


  return useMock ? await doMockRequest() : await doRealRequest()

}

export default { apiRequest }
