import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import keycloak, { initializeKeycloak } from "./keycloak";

interface AuthContextType {
  authenticated: boolean;
  loading: boolean;
  token?: string;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string>();

  useEffect(() => {
    let mounted = true;

    const initialize = async () => {
      try {
        const isAuthenticated = await initializeKeycloak();

        if (!mounted) {
          return;
        }

        setAuthenticated(isAuthenticated);
        setToken(keycloak.token);
      } catch (error) {
        console.error("Keycloak initialization failed:", error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initialize();

    return () => {
      mounted = false;
    };
  }, []);

  const login = async () => {
    await keycloak.login();
  };

  const logout = async () => {
    await keycloak.logout({
      redirectUri: window.location.origin,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        loading,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider",
    );
  }

  return context;
}