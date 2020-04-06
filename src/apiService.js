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
  getMeProfile(type) {
    if (type === "user") return this.client.get("/user/me/");
    else return this.client.get("/service/me/");
  },
  fetchServices() {
    return this.client.get("/service/list/");
  },
  fetchDataFields() {
    return this.client.get("/user/fields/");
  },
  fetchSelectedDataFields() {
    return this.client.get("/service/permissions/");
  },
  fetchAuthedUsers() {
    return this.client.get("/service/users/");
  },
  authenticateService(service) {
    return this.client.post("/service/assign/", { service: service.id });
  }
};

export default apiService;
