import { Link, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/features/auth/services/AuthProvider'
import styles from './MainLayout.module.css'
import { SettingButton } from '@/shared/components/SettingButton'

export function MainLayout() {
  const { user, logout } = useAuthStore(s => ({ user: s.user, logout: s.logout }))

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.headerInner}>
            <div className={styles.brand}>
              <div className={styles.brandLogo}>CyberTIP</div>
            </div>

            <div className={styles.right}>
              <div className={styles.userText}>{user ? user.name : 'Unknown'}</div>
              <SettingButton onClick={() => logout()} className={styles.signOutBtn}>
                Setting
              </SettingButton>
              <button onClick={() => logout()} className={styles.signOutBtn}>
                Sign out
              </button>
            </div>
          </div>
        </div>
      </header>
      <div className={styles.sidebar}>
        <nav className={styles.nav}>
          <Link to="/dashboard" className={styles.link}>Dashboard</Link>
          <Link to="/alerts" className={styles.link}>Alerts</Link>
          <Link to="/ioc" className={styles.link}>IOC</Link>
          <Link to="/user-profile" className={styles.link}>User Profile</Link>
        </nav>
      </div>

      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  )
}

export default MainLayout
