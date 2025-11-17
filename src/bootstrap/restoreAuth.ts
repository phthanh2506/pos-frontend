import { useAuthStore } from '../stores/auth'
import Logger from '../utils/logger'

export async function restoreAuth() {
  try {
    const auth = useAuthStore()
    if (auth && typeof auth.restoreFromStorage === 'function') {
      auth.restoreFromStorage()
      try {
        const mod = await import('../services/auth')
        if (mod && typeof mod.fetchCurrentUser === 'function') {
          await mod.fetchCurrentUser()
        }
      } catch (e: any) {
        Logger.error(`Failed to fetch current user after restoring auth state: ${e.toString()}`)
      }
    }
  } catch (e: any) {
    Logger.error(`restoreAuth failed: ${(e as Error).toString()}`);
  }
}

export default restoreAuth
