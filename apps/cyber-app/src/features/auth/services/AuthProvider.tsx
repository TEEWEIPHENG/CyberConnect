import { useEffect, useState, type ReactNode } from 'react'
import type { KeycloakInitOptions, KeycloakTokenParsed } from 'keycloak-js'
import { keycloak } from '@/features/auth/services/keycloak'
import { setAccessToken } from '@/shared/services/httpClient'
import type { LoginResponse } from '@/features/auth/types/login.types'
import { AuthContext, type AuthState } from '@/features/auth/services/authContext'

function createUserFromToken(tokenParsed: KeycloakTokenParsed | undefined): LoginResponse['user'] | null {
  if (!tokenParsed) return null

  const username = tokenParsed.preferred_username ?? tokenParsed.email ?? 'user'
  const name = tokenParsed.name ?? username
  const rawRoles = (tokenParsed as any)?.realm_access?.roles as string[] | undefined
  const role = rawRoles?.[0] ?? (tokenParsed.role as string | undefined) ?? 'user'

  return {
    id: tokenParsed.sub ?? '',
    username,
    name,
    role,
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<LoginResponse['user'] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const initOptions: KeycloakInitOptions = {
      onLoad: 'check-sso',
      pkceMethod: 'S256',
      checkLoginIframe: false,
      silentCheckSsoRedirectUri: `${window.location.origin}/keycloak-silent-check-sso.html`,
    }

    keycloak
      .init(initOptions)
      .then((authenticated) => {
        setIsAuthenticated(authenticated)
        if (authenticated && keycloak.token) {
          setAccessToken(keycloak.token)
          setUser(createUserFromToken(keycloak.tokenParsed as KeycloakTokenParsed | undefined))
        } else {
          setUser(null)
          setAccessToken(null)
        }
      })
      .catch((err) => {
        console.error('Keycloak initialization failed', err)
        setError('Authentication initialization failed')
        setUser(null)
        setAccessToken(null)
        setIsAuthenticated(false)
      })
      .finally(() => {
        setLoading(false)
      })

    const refreshInterval = window.setInterval(() => {
      if (!keycloak.authenticated) {
        return
      }

      keycloak
        .updateToken(30)
        .then((refreshed) => {
          if (refreshed && keycloak.token) {
            setAccessToken(keycloak.token)
          }
        })
        .catch(() => {
          setUser(null)
          setIsAuthenticated(false)
          setAccessToken(null)
        })
    }, 10000)

    return () => {
      window.clearInterval(refreshInterval)
    }
  }, [])

  async function login() {
    setLoading(true)
    setError(null)

    try {
      await keycloak.login({ redirectUri: window.location.origin })
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
    setIsAuthenticated(false)
    setAccessToken(null)
    void keycloak.logout({ redirectUri: window.location.origin })
  }

  const value: AuthState = {
    isAuthenticated,
    user,
    loading,
    error,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext
