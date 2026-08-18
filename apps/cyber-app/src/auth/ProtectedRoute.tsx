import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({
  children,
}: ProtectedRouteProps) {
  const { authenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}