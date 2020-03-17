export default function notAuth({ from, next, store }) {
  const { isAuthenticated } = store.getters;

  if (!isAuthenticated) {
    next();
    return;
  }

  next(from);
}
