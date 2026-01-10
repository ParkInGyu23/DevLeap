import { axiosInstance } from "./axiosInstance";
import type { formPops } from "../types/auth.d";

export const signupAPI = (data: formPops) => {
  return axiosInstance.post("/register", data);
};

export const loginApi = (data: Pick<formPops, "email" | "password">) => {
  return axiosInstance.post("/login", data);
};

export const logoutApi = () => {
  return axiosInstance.post("/logout");
};

export const tokenApi = () => {
  return axiosInstance.post("/token");
};
