import Vue from "vue";
import Router from "vue-router";
import Login from "./Pages/Auth/Login";
import Users from "./Pages/Users";
import UserChange from "./Pages/Add&ChangeUser";
import PageNotFound from "./Pages/PageNotFound";
import store from "./store";
Vue.use(Router);
export default function() {
  const router = new Router({
    mode: "history",
    routes: [
      {
        path: "/",
        name: "home",
        component: Login,
        meta: {
          notAuth: true,
        },
      },
      {
        path: "/users",
        name: "users",
        component: Users,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/addNewUser",
        name: "addNewUser",
        component: UserChange,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/user/:id",
        name: "edit-user",
        component: UserChange,
        meta: {
          requiresAuth: true,
        },
      },
      { path: "*", component: PageNotFound },
    ],
  });

  router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (store.getters.user == false) {
        next({
          path: "/",
          params: { nextUrl: to.fullPath },
        });
      } else next();
    } else if (to.matched.some((record) => record.meta.notAuth)) {
      if (store.getters.user != false) {
        next({
          path: "/users",
          params: { nextUrl: to.fullPath },
        });
      } else next();
    } else {
      next();
    }
  });

  return router;
}
