import type { RouteRecordRaw } from "vue-router";
import InfluencerDashboardView from "../views/InfluencerDashboardView.vue";
import InfluencerProfileView from "../views/InfluencerProfileView.vue";
import InfluencerProposalsView from "../views/InfluencerProposalsView.vue";
import InfluencerProfileSetupView from "../views/InfluencerProfileSetupView.vue";

export const influencerRoutes: RouteRecordRaw[] = [
  {
    path: "/onboarding/influencer",
    name: "influencer-onboarding",
    component: InfluencerProfileSetupView
  },
  {
    path: "/influencer",
    name: "influencer-dashboard",
    component: InfluencerDashboardView,
  },
  {
    path: "/influencer/profile",
    name: "influencer-profile",
    component: InfluencerProfileView,
  },
  {
    path: "/influencer/proposals",
    name: "influencer-proposals",
    component: InfluencerProposalsView,
  },
];
