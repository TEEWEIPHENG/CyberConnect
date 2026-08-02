import { useContext } from 'react'
import { AuthContext, type AuthState } from '@/features/auth/services/authContext'

export function useAuthStore<T = AuthState>(selector?: (s: AuthState) => T): T {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuthStore must be used within an AuthProvider')
  return selector ? selector(ctx) : (ctx as unknown as T)
}
