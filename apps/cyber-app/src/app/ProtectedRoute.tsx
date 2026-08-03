import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuthStore } from '@/features/auth/services/useAuthStore'

export function ProtectedRoute() {
  const isAuthenticated = useAuthStore(s => s.isAuthenticated)
  const location = useLocation()

  if (!isAuthenticated) {
    // preserve the page they tried to visit
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
}