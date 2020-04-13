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
    return this.client.get("/user/all-fields/");
  },
  fetchUserValues() {
    return this.client.get("/user/fields/");
  },
  setUserValue({ field, value }) {
    return this.client.post("/field/", { field, value });
  },
  fetchSelectedDataFields() {
    return this.client.get("/service/permissions/");
  },
  fetchAuthedUsers() {
    return this.client.get("/service/users/");
  },
  fetchAuthedServices() {
    return this.client.get("/user/services/");
  },
  authenticateService(service) {
    return this.client.post("/service/assign/", { service: service.service });
  },
  deleteService(service) {
    return this.client.post("/service/delete/", { service });
  },
  fetchDataGroups() {
    return this.client.get("/user/data-groups/");
  },
  setPermissions(data) {
    return this.client.post("/service/permissions/", data);
  }
};

export default apiService;
