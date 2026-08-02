import { useState, type ReactNode } from 'react'
import { setAccessToken } from '@/shared/services/httpClient'
import type { LoginResponse, LoginRequest } from '@/features/auth/types/login.types'
import { AuthContext, type AuthState } from '@/features/auth/services/authContext'

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
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Login failed'
      setError(message)
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

export default AuthContext
