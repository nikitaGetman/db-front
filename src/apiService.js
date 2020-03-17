import axios from "axios";
import { BASE_URL } from "./config";

const client = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});

const apiService = {
  client,
  login({ username, password }) {
    console.log("CALL LOGIN");
    return this.client.post("/auth/login/", { username, password });
  },
  getMeProfile() {
    return this.client.get("/me/");
  }
};

export default apiService;
