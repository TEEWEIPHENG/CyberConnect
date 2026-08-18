import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: import.meta.env.VITE_KEYCLOAK_URL,
  realm: import.meta.env.VITE_KEYCLOAK_REALM,
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
});

let initializationPromise: Promise<boolean> | null = null;

export function initializeKeycloak(): Promise<boolean> {
  if (!initializationPromise) {
    initializationPromise = keycloak.init({
      onLoad: "check-sso",
      pkceMethod: "S256",
      checkLoginIframe: false,
    });
  }

  return initializationPromise;
}

export default keycloak;