import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/features/auth/services/AuthProvider'
import { PrimaryButton } from '@/shared/components/PrimaryButton'
import { InputText } from '@/shared/components/InputText'
import { InputPassword } from '@/shared/components/InputPassword'
import styles from './LoginPage.module.css'

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as any)?.from?.pathname ?? '/dashboard'

  const { login, loading, error } = useAuthStore(s => ({
    login: s.login,
    loading: s.loading,
    error: s.error,
  }))

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      //bypass login for now
      await login({ username, password })
      
      navigate(from, { replace: true })
    } catch (err) {
      // error available from store
    }
  }

  return (
    <>
      <div className={styles.loginContainer}>

        <h2 className={styles.title}>Sign in to CyberTIP</h2>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div>
            <label className={styles.inputLabel}>Username</label>
            <div className={styles.inputWrapper}>
              <InputText
                aria-label="username"
                className={styles.inputField + ' ' + styles.usernameInput}
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Enter your username"
              />
            </div>
          </div>
          <div>
            <label className={styles.inputLabel}>Password</label>
            <div className={styles.inputWrapper}>
              <InputPassword
                aria-label="password"
                className={styles.inputField + ' ' + styles.passwordInput}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>
          </div>
          {error && <div className={styles.errorMessage}>{error}</div>}
          <div>
            <PrimaryButton
              type="submit"
              disabled={loading}
              className=""
            >
              {loading ? 'Signing...' : 'Sign In'}
            </PrimaryButton>
          </div>
        </form>
        <p className="">Need access? <a className="">Contact administrator</a></p>
      </div>
    </>
  )
}