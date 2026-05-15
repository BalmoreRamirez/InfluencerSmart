import { http } from "../../../app/services/http";

export const influencerApi = {
  getSummary() {
    return http.get("/influencer/summary");
  }
};
