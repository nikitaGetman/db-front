import Vue from "vue";
import Vuex from "vuex";

import apiService from "@/apiService";

import mutations from "./mutations";
import modules from "./modules";
import actions from "./actions";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations,
  actions,
  modules,
  getters: {
    apiService() {
      return apiService;
    }
  }
});
