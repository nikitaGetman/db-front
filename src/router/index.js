import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

import auth from "./middleware/auth";
import notFound from "./middleware/notFound";
import notAuth from "./middleware/notAuth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
    meta: {
      middleware: [notAuth]
    }
  },
  {
    path: "/register",
    name: "register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/Register.vue"),
    meta: {
      middleware: [notAuth]
    }
  },
  {
    path: "/",
    name: "dashboard",
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "../views/Dashboard.vue"),
    meta: {
      middleware: [auth]
    }
  },
  {
    path: "/settings",
    name: "settings",
    component: () =>
      import(/* webpackChunkName: "settings" */ "../views/Settings.vue"),
    meta: {
      middleware: [auth]
    }
  },
  {
    path: "/service",
    name: "service",
    component: () =>
      import(/* webpackChunkName: "service" */ "../views/Service.vue"),
    meta: {
      middleware: [auth]
    }
  },
  {
    path: "/404",
    name: "404",
    component: () =>
      import(/* webpackChunkName: "not-found" */ "@/views/NotFound.vue")
  },
  {
    path: "*",
    name: "not-found",
    redirect: { name: "404" }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export function createMiddlewarePipeline(context, middleware) {
  const nextMiddleware = middleware[0];
  const restMiddleware = middleware.slice(1);

  if (!nextMiddleware) {
    return context.next;
  }

  return redirectRoute => {
    if (redirectRoute !== undefined) {
      context.next(redirectRoute);
    } else {
      const nextPipeline = createMiddlewarePipeline(context, restMiddleware);
      nextMiddleware({ ...context, next: nextPipeline });
    }
  };
}

router.beforeEach((to, from, next) => {
  const middleware = to.matched.reduce(
    (guards, matchedRoute) => {
      const routeGuards = matchedRoute.meta.middleware
        ? matchedRoute.meta.middleware.filter(
            someGuard => !guards.includes(someGuard)
          )
        : [];

      return routeGuards.length ? [...guards, ...routeGuards] : guards;
    },
    [notFound]
  );

  createMiddlewarePipeline({ to, from, next, store }, middleware)();
});

export default router;
