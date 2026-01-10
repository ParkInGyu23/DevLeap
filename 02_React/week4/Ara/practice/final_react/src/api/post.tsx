import type { formPops } from "../types/post.d";
import { axiosInstance } from "./axiosInstance";

export const writeApi = (data: formPops) => {
  return axiosInstance.post("/posts", data);
};

export const deleteApi = (id: string) => {
  return axiosInstance.delete(`/posts/${id}`);
};
