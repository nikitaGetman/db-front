import { throwError } from "@/store/utils";
import { LOADING, LOADED, SET_MODEL, SET_LIST } from "@/store/mutations/types";
import { LOGOUT } from "@/store/actions/types";

export const MODULE_NAME = "services";
export const FETCH_SERVICES = "fetchServices";
export const FETCH_DATA_FIELDS = "fetchDataFields";
export const FETCH_AUTHED_USERS = "fetchAuthedUserd";
export const FETCH_SELECTED_GROUPS = "fetchSelectedPermissions";
export const AUTHENTICATE_SERVICE = "authenticateService";
export const DELETE_SERVICE = "deleteService";
export const FETCH_AUTHED_SERVICES = "fetchAuthedServices";
export const FETCH_DATA_GROUPS = "fetchDataGroups";
export const SET_PERMISSION = "setPermissions";

export default {
  state: {
    loading: false,
    model: {},
    list: []
  },
  actions: {
    [FETCH_SERVICES]: ({ commit, getters }) => {
      commit(LOADING, MODULE_NAME);
      return getters.apiService
        .fetchServices()
        .then(data => {
          commit(SET_LIST, { name: MODULE_NAME, list: data.services || [] });
        })
        .catch(throwError(commit, "Ошибка получения списка сервисов"))
        .finally(() => commit(LOADED, MODULE_NAME));
    },
    [FETCH_DATA_FIELDS]: ({ commit, getters }) => {
      return getters.apiService
        .fetchDataFields()
        .then(data => data)
        .catch(throwError(commit, "Ошибка получения списка полей"));
    },
    [FETCH_SELECTED_GROUPS]: ({ commit, getters }) => {
      return getters.apiService
        .fetchSelectedDataFields()
        .then(data => data)
        .catch(throwError(commit, "Ошибка получения выбранных списка полей"));
    },
    [FETCH_AUTHED_USERS]: ({ commit, getters }) => {
      return getters.apiService
        .fetchAuthedUsers()
        .then(data => data)
        .catch(
          throwError(commit, "Ошибка получения авторизованных пользователей")
        );
    },
    [AUTHENTICATE_SERVICE]: ({ commit, getters }, service) => {
      commit(LOADING, MODULE_NAME);
      return getters.apiService
        .authenticateService(service)
        .then(data => data)
        .catch(throwError(commit, "Ошибка авторизации сервиса"))
        .finally(() => commit(LOADED, MODULE_NAME));
    },
    [DELETE_SERVICE]: ({ commit, getters }, service) => {
      return getters.apiService
        .deleteService(service)
        .then(data => data)
        .catch(throwError(commit, "Ошибка удаления сервиса"));
    },
    [FETCH_AUTHED_SERVICES]: ({ commit, getters }) => {
      return getters.apiService
        .fetchAuthedServices()
        .then(data => data)
        .catch(throwError(commit, "Ошибка получения списка сервисов"));
    },
    [FETCH_DATA_GROUPS]: ({ commit, getters }) => {
      return getters.apiService
        .fetchDataGroups()
        .then(data => data)
        .catch(throwError(commit, "Ошибка получения списка групп данных"));
    },
    [SET_PERMISSION]: ({ commit, getters }, data) => {
      return getters.apiService
        .setPermissions(data)
        .then(data => data)
        .catch(throwError(commit, "Ошибка установки прав"));
    },
    [LOGOUT]: ({ commit }) => {
      commit(SET_MODEL, { name: MODULE_NAME, model: {} });
      commit(SET_LIST, { name: MODULE_NAME, list: [] });
    }
  }
};
