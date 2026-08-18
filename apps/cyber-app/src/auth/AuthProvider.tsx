import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import keycloak from "./keycloak";

interface AuthContextType {
  authenticated: boolean;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  token?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string>();

  useEffect(() => {
    const initializeKeycloak = async () => {
      try {
        const authenticated = await keycloak.init({
          onLoad: "check-sso",
          pkceMethod: "S256",
          checkLoginIframe: false,
        });

        setAuthenticated(authenticated);
        setToken(keycloak.token);
      } catch (error) {
        console.error("Keycloak initialization failed:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeKeycloak();
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
        login,
        logout,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}