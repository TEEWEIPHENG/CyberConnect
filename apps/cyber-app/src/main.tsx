import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { router } from './app/router'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './features/auth/services/AuthProvider'
import { ThemeProvider } from '@/shared/context/ThemeContext'
import "@/shared/styles/theme.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
)
