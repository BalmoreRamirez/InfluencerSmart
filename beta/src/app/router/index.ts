import { createRouter, createWebHistory } from "vue-router";
import LandingView from "../../modules/public/views/LandingView.vue";
import LoginView from "../../modules/auth/views/LoginView.vue";
import { influencerRoutes } from "../../modules/influencer/router";
import { companyRoutes } from "../../modules/company/router";
import { usersRoutes } from "../../modules/users/router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "landing", component: LandingView },
    { path: "/login", name: "login", component: LoginView },
    ...usersRoutes,
    ...influencerRoutes,
    ...companyRoutes
  ]
});

export default router;
