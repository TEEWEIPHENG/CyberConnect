import { useAuth } from "../../auth/AuthProvider";

export default function Dashboard() {
  const { logout } = useAuth();

  return (
    <div>
      <h1>CyberConnect Dashboard</h1>

      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
}