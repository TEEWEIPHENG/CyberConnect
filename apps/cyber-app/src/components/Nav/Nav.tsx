import { useAuth } from "../../auth/AuthProvider";

export function Nav() {
  const { logout } = useAuth();

  return (
    <>
      <h1>CyberConnect Dashboard</h1>

      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/assets">Assets</a></li>
          <li><a href="/vulnerabilities">Vulnerabilities</a></li>
          <li><a href="/reports">Reports</a></li>
          <li><a href="/osint">OSINT</a></li>
          <li><a href="/integrations">Integrations</a></li>
          <li><a href="/profile">Profile</a></li>
        </ul>
      </nav>
      <button onClick={logout}>
        Logout
      </button>
    </>
  )
}