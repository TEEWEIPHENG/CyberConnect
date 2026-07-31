import axios from "@/shared/services/httpClient";
import type { LoginRequest, LoginResponse } from "../types/login.types";

export const authApi = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await axios.post<LoginResponse>(
      "/auth/login",
      data
    );
    return response.data;
  },

  refreshToken: async (token: string) => {
    const response = await axios.post("/auth/refresh", {
      token,
    });
    return response.data;
  },

  logout: async () => {
    return axios.post("/auth/logout");
  },
};