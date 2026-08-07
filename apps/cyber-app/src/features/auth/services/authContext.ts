import { createContext } from 'react'
import type { LoginResponse } from '@/features/auth/types/login.types'

export type AuthState = {
  isAuthenticated: boolean
  user: LoginResponse['user'] | null
  loading: boolean
  error: string | null
  login: () => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthState | undefined>(undefined)
