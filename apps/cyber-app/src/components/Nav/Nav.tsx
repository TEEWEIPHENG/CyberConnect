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
          <li><a href="/profile">Profile</a></li>
        </ul>
      </nav>
      <button onClick={logout}>
        Logout
      </button>
    </>
  )
}