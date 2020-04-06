import {
  saveStorageItem,
  loadStorageItem,
  removeStorageItem
} from "@/utils/storage";
import { throwError } from "@/store/utils";
import { LOADING, LOADED, SET_MODEL } from "@/store/mutations/types";
import { LOGOUT } from "@/store/actions/types";

export const MODULE_NAME = "auth";
export const TOKEN_KEY = "auth_token";
export const ACCOUNT_TYPE = "account_type";
export const USER_LOGIN = "userLogin";
export const FETCH_PROFILE = "fetchProfile";
export const SERVICE_LOGIN = "serviceLogin";

export default {
  state: {
    loading: false,
    model: {
      key: loadStorageItem(TOKEN_KEY) || null,
      empty: true
    }
  },
  getters: {
    isAuthenticated: state => {
      return !!(state.model || {}).key;
    },
    isProfileLoaded({ model }) {
      return model && !model.empty;
    },
    isUser: state => {
      return !!state.is_user;
    },
    isService: state => {
      return !state.is_user;
    },
    headers: (state, { isAuthenticated }) => {
      if (!isAuthenticated) return {};

      return {
        Authorization: `Bearer ${state.model.key}`
      };
    }
  },
  actions: {
    [USER_LOGIN]: ({ state, commit, getters }, { username, password }) => {
      commit(LOADING, MODULE_NAME);
      return getters.apiService
        .userLogin({ username, password })
        .then(model => {
          commit(SET_MODEL, {
            name: MODULE_NAME,
            model: { ...state.model, ...model }
          });
          saveStorageItem(TOKEN_KEY, model.key);
          saveStorageItem(ACCOUNT_TYPE, "user");
        })
        .catch(throwError(commit, "Ошибка входа (user login)"))
        .finally(() => commit(LOADED, MODULE_NAME));
    },
    [SERVICE_LOGIN]: ({ commit, getters }, { username, password }) => {
      commit(LOADING, MODULE_NAME);
      return getters.apiService
        .serviceLogin({ username, password })
        .then(model => {
          commit(SET_MODEL, {
            name: MODULE_NAME,
            model: { key: model.key, ...model.user }
          });
          saveStorageItem(TOKEN_KEY, model.key);
          saveStorageItem(ACCOUNT_TYPE, "service");
        })
        .catch(throwError(commit, "Ошибка входа (service login)"))
        .finally(() => commit(LOADED, MODULE_NAME));
    },
    [FETCH_PROFILE]: ({ commit, getters }) => {
      commit(LOADING, MODULE_NAME);
      const type = loadStorageItem(ACCOUNT_TYPE);
      return getters.apiService
        .getMeProfile(type)
        .then(data => {
          const model = data.user ? data.user[0] : data.service[0];
          commit(SET_MODEL, { name: MODULE_NAME, model });
        })
        .catch(throwError(commit, "Ошибка получения профиля"))
        .finally(() => commit(LOADED, MODULE_NAME));
    },
    [LOGOUT]: ({ commit }) => {
      const model = { key: null, empty: true };
      commit(SET_MODEL, { name: MODULE_NAME, model });
      removeStorageItem(TOKEN_KEY);
    }
  }
};
