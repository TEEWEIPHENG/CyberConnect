import { createBrowserRouter, Navigate } from 'react-router'
import { LoginPage } from '@/features/auth/pages/LoginPage'
import { ProtectedRoute } from './ProtectedRoute'
import MainLayout from '@/layouts/MainLayout'
import { Dashboard } from '@/features/dashboard/Dashboard'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <ProtectedRoute />, // guard wrapper
    children: [
      {
        element: <MainLayout />,
        children: [
          { index: true, element: <Navigate to="/dashboard" replace /> },
          { path: 'dashboard', element: <Dashboard /> },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />,
  },
])