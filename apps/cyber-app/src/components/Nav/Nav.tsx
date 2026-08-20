import { useAuth } from "../../auth/AuthProvider";
import image from "../../assets/logo.png";
import styles from "./Nav.module.css";

export function Nav({ children }: { children: React.ReactNode }) {
  const { logout, userProfile } = useAuth();
  console.log("User Profile:", userProfile);
  return (
    <div className={styles.navContainer}>
      <div className={styles.header}>
        <img src={image} alt="CyberConnect Logo" className={styles.logo} />
        <div className={styles.userInfo}>
          <p>{userProfile?.firstName} {userProfile?.lastName}</p>
          <button onClick={logout} className={styles.logoutButton}>
            Logout
          </button>
        </div>
      </div>
      <div className={styles.navContent}>
        <nav className={styles.navLinks}>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/asset">Assets</a></li>
            <li><a href="/vulnerabilities">Vulnerabilities</a></li>
            <li><a href="/reports">Reports</a></li>
            <li><a href="/osint">OSINT</a></li>
            <li><a href="/integrations">Integrations</a></li>
            <li><a href="/profile">Profile</a></li>
          </ul>
        </nav>
        <div className={styles.content}>
          {children}
        </div>

      </div>
    </div>
  )
}