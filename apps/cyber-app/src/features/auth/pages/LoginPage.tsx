import type { FormEvent } from 'react'
import { useNavigate, useLocation } from 'react-router'
import { useAuthStore } from '@/features/auth/services/useAuthStore'
import { PrimaryButton } from '@/shared/components/PrimaryButton'
import styles from './LoginPage.module.css'

interface LocationState {
  from?: {
    pathname?: string
  }
}

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as LocationState | null)?.from?.pathname ?? '/dashboard'

  const { login, loading, error } = useAuthStore((s) => ({
    login: s.login,
    loading: s.loading,
    error: s.error,
  }))

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    await login()
    navigate(from, { replace: true })
  }

  return (
    <>
      <div className={styles.loginContainer}>

        <h2 className={styles.title}>Sign in to CyberTIP</h2>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <p className={styles.loginHint}>
            You will be redirected to Keycloak for authentication.
          </p>
          {error && <div className={styles.errorMessage}>{error}</div>}
          <div>
            <PrimaryButton type="submit" disabled={loading}>
              {loading ? 'Redirecting...' : 'Sign in with Keycloak'}
            </PrimaryButton>
          </div>
        </form>
        <p>
          Need access? <a href="mailto:admin@cyberconnect.local">Contact administrator</a>
        </p>
      </div>
    </>
  )
}