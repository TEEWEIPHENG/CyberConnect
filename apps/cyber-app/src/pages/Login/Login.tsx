import { useAuth } from "../../auth/AuthProvider";

export default function Login() {
  const { login } = useAuth();

  return (
    <div>
      <h1>CyberConnect</h1>
      <p>Cybersecurity Management Platform</p>

      <button onClick={login}>
        Sign in
      </button>
    </div>
  );
}