import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { LOGOUT } from "./store/actions/types";
import apiService from "./apiService";

import ElementUI from "element-ui";
import AppPage from "@/layouts/AppPage.vue";
import AppPageContent from "@/layouts/AppPageContent.vue";

import "element-ui/lib/theme-chalk/index.css";
import "@/assets/scss/base.scss";

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(AppPage.name, AppPage);
Vue.use(AppPageContent.name, AppPageContent);

const UNAUTHORIZED_STATUS = 401;
const UNKNOWN_STATUS = 408;

apiService.client.interceptors.request.use(
  config => {
    const { headers } = config;
    return {
      ...config,
      headers: {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`
      }
    };
  },
  error => error
);
apiService.client.interceptors.response.use(
  response => (response && response.data ? response.data : response) || {},
  error => {
    const status = error.response ? error.response.status : UNKNOWN_STATUS;

    if (status === UNAUTHORIZED_STATUS) {
      return store
        .dispatch(LOGOUT)
        .then(() => router.replace({ name: "login" }));
    }

    // eslint-disable-next-line
    console.warn("error in interceptors", status, error.response, error);

    return Promise.reject(error);
  }
);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
