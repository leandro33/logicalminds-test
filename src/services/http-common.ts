import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: "https://www.balldontlie.io/api/v1",
  headers: {
    "Content-type": "application/json",
  },
});

export default apiClient;
