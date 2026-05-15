import { defineStore } from "pinia";

export const useInfluencerStore = defineStore("influencer", {
  state: () => ({
    profileCompletion: 0.65,
    activeProposals: 4,
    closedCampaigns: 12
  })
});

