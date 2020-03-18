import axios from "axios";
import { BASE_URL } from "./config";

const client = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});

const apiService = {
  client,
  userLogin({ username, password }) {
    return this.client.post("/user/login/", { username, password });
  },
  serviceLogin({ username, password }) {
    return this.client.post("/service/login/", { username, password });
  },
  getMeProfile() {
    return this.client.get("/me/");
  }
};

export default apiService;
