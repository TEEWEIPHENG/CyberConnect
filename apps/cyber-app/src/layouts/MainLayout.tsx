import { Link, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/features/auth/services/useAuthStore'
import styles from './MainLayout.module.css'

export function MainLayout() {
  const { user, logout } = useAuthStore(s => ({ user: s.user, logout: s.logout }))

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.headerInner}>
            <div className={styles.brand}>
              <div className={styles.brandTitle}>CyberTIP</div>
              <nav className={styles.nav}>
                <Link to="/dashboard" className={styles.link}>Dashboard</Link>
                <Link to="/alerts" className={styles.link}>Alerts</Link>
                <Link to="/ioc" className={styles.link}>IOC</Link>
              </nav>
            </div>

            <div className={styles.right}>
              <div className={styles.userText}>{user ? user.name : 'Guest'}</div>
              <button onClick={() => logout()} className={styles.signOutBtn}>
                Sign out
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
