import { FETCH_PROFILE } from "@/store/modules/profile";

export default function auth({ next, store }) {
  const { isAuthenticated, isProfileLoaded } = store.getters;

  if (isAuthenticated) {
    if (!isProfileLoaded) {
      return store.dispatch(FETCH_PROFILE).finally(() => next());
    }
    return next();
  }
  return next({ name: "login" });
}
