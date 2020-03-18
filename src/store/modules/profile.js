// import { throwError } from "@/store/utils";
// import { LOADING, LOADED, SET_MODEL } from "@/store/mutations/types";
// import { LOGOUT } from "@/store/actions/types";

// export const FETCH_PROFILE = "fetchProfile";
// export const MODULE_NAME = "profile";

// export default {
//   state: {
//     loading: false,
//     model: {
//       empty: true
//     }
//   },
//   getters: {
//     isProfileLoaded({ model }) {
//       return model && !model.empty;
//     }
//   },
//   actions: {
//     [FETCH_PROFILE]: ({ commit, getters }) => {
//       commit(LOADING, MODULE_NAME);
//       return getters.apiService
//         .getMeProfile()
//         .then(model => {
//           commit(SET_MODEL, { name: MODULE_NAME, model });
//         })
//         .catch(throwError(commit, "Ошибка получения профиля"))
//         .finally(() => commit(LOADED, MODULE_NAME));
//     },
//     [LOGOUT]: ({ commit }) => {
//       const model = {
//         empty: true
//       };
//       commit(SET_MODEL, { name: MODULE_NAME, model });
//     }
//   }
// };
