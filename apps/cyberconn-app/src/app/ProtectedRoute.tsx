import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/features/auth/services/AuthProvider'

export function ProtectedRoute() {
  const isAuthenticated = useAuthStore(s => s.isAuthenticated)
  const location = useLocation()

  if (!isAuthenticated) {
    // preserve the page they tried to visit
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
}