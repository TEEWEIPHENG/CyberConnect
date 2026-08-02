import { createContext } from 'react'
import type { LoginResponse, LoginRequest } from '@/features/auth/types/login.types'

export type AuthState = {
  isAuthenticated: boolean
  user: LoginResponse['user'] | null
  loading: boolean
  error: string | null
  login: (credentials: LoginRequest) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthState | undefined>(undefined)
