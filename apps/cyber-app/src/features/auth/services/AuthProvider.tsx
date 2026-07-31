import { createContext, useContext, useState, type ReactNode } from 'react'
import { authApi } from './authApi'
import { setAccessToken } from '@/shared/services/httpClient'
import type { LoginResponse, LoginRequest } from '@/features/auth/types/login.types'

type AuthState = {
  isAuthenticated: boolean
  user: LoginResponse['user'] | null
  loading: boolean
  error: string | null
  login: (credentials: LoginRequest) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthState | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<LoginResponse['user'] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function login(credentials: LoginRequest) {
    setLoading(true)
    setError(null)
    try {
      // const res = await authApi.login(credentials)
      // Mock response for now
      const res: LoginResponse = {
        user: {
          id: '123',
          username: credentials.username,
          name: credentials.username,
          role: 'user',
        },
        accessToken: 'mocked-jwt-token',
        refreshToken: 'mocked-refresh-token',
      }

      setUser(res.user)
      // persist token and configure http client
      setAccessToken(res.accessToken)
    } catch (err: any) {
      setError(err?.message ?? 'Login failed')
      throw err
    } finally {
      setLoading(false)
    }
  }

  function logout() {
    setUser(null)
    localStorage.removeItem('accessToken')
  }

  const value: AuthState = {
    isAuthenticated: !!localStorage.getItem('accessToken') || !!user,
    user,
    loading,
    error,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// selector-friendly hook: accepts optional selector function to mimic Zustand-like usage
export function useAuthStore<T = AuthState>(selector?: (s: AuthState) => T): T {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuthStore must be used within an AuthProvider')
  return selector ? selector(ctx) : (ctx as unknown as T)
}

export default AuthContext
