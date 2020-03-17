import Vue from "vue";
import { getStateProperty } from "@/store/utils";
import * as types from "./types";

export default {
  [types.ERROR]: (state, { title, message, error, status }) => {
    /* eslint-disable-next-line no-param-reassign */
    state.error = {
      title,
      message:
        message ||
        (error.response && error.response.data
          ? error.response.data.message
          : null) ||
        error.message ||
        "Непредвиденная ошибка.",
      code:
        error.response && error.response.data ? error.response.data.code : -100,
      status: status || (error.response ? error.response.status : 0),
      response: error.response,
      error
    };
  },
  [types.LOADING]: (state, name) => {
    const property = getStateProperty(state, name);
    property.loading = true;
  },
  [types.LOADED]: (state, name) => {
    const property = getStateProperty(state, name);
    property.loading = false;
  },
  [types.SET_LOCALE]: (state, locale) => {
    state.locale = locale;
  },
  [types.SET_MODEL]: (state, { name, model }) => {
    const property = getStateProperty(state, name);
    Vue.set(property, "model", model);
  },
  [types.UPDATE_MODEL]: (state, { name, model }) => {
    const property = getStateProperty(state, name);
    property.model = { ...property.model, ...model };
  },
  [types.SET_LIST]: (state, { name, list }) => {
    const property = getStateProperty(state, name);
    Vue.set(property, "list", list);
  },
  [types.ADD_LIST_ITEMS]: (state, { name, list }) => {
    const property = getStateProperty(state, name);
    property.list = property.list.concat(list);
  },
  [types.UPDATE_LIST_ITEM]: (state, { name, index, value }) => {
    const property = getStateProperty(state, name);
    Object.assign(property.list[index], value);
  },
  [types.SET_PARAMS]: (state, { name, params }) => {
    const property = getStateProperty(state, name);
    Vue.set(property, "params", params);
  },
  [types.UPDATE_PARAMS]: (state, { name, params }) => {
    const property = getStateProperty(state, name);
    property.params = { ...property.params, ...params };
  }
};
