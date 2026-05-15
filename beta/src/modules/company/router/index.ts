import type { RouteRecordRaw } from "vue-router";
import CompanyDashboardView from "../views/CompanyDashboardView.vue";
import CompanyProfileSetupView from "../views/CompanyProfileSetupView.vue";

export const companyRoutes: RouteRecordRaw[] = [
  {
    path: "/onboarding/company",
    name: "company-onboarding",
    component: CompanyProfileSetupView
  },
  {
    path: "/company",
    name: "company-dashboard",
    component: CompanyDashboardView
  }
];

