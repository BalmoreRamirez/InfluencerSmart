import type { RouteRecordRaw } from "vue-router";
import RegisterView from "../views/RegisterView.vue";

export const usersRoutes: RouteRecordRaw[] = [
  {
    path: "/register",
    name: "register",
    component: RegisterView
  }
];
