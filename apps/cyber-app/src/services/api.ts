import axios from "axios";
import keycloak from "../auth/keycloak";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(async (config) => {
  if (keycloak.authenticated) {
    try {
      await keycloak.updateToken(30);

      if (keycloak.token) {
        config.headers.Authorization = `Bearer ${keycloak.token}`;
      }
    } catch (error) {
      console.error("Failed to refresh Keycloak token", error);
    }
  }

  return config;
});

export default api;