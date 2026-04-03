import axios, { AxiosInstance } from "axios";

export const createHttpClient = (baseURL: string): AxiosInstance => {
  return axios.create({ baseURL, headers: { "Content-Type": "application/json" } });
};
