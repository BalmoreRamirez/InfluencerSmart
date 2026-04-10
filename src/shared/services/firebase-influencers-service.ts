import { getDocs, query } from "firebase/firestore/lite";
import { influencersCollectionRef } from "@/shared/lib/firebase-collections";

export type PublicInfluencerCard = {
  id: string;
  name: string;
  category: string;
  country: string;
  followers: string;
  followersCount: number;
  price: string;
  priceUsd: number;
  engagement: string;
  rating: string;
};

function toCountry(location: string) {
  const parts = location
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  return parts.at(-1) ?? "Sin país";
}

function formatCompactNumber(value: number) {
  return new Intl.NumberFormat("es", {
    notation: "compact",
    maximumFractionDigits: 1,
  })
    .format(value)
    .toLowerCase();
}

function formatUsd(value: number) {
  return `$${value} USD`;
}

function formatEngagement(value: number) {
  return `${value}%`;
}

export async function listPublicInfluencers(): Promise<PublicInfluencerCard[]> {
  const snap = await getDocs(query(influencersCollectionRef()));

  return snap.docs.map((doc) => {
    const data = doc.data();
    const followersCount = data.metrics.instagram_followers || 0;
    const priceUsd = data.prices.ig_reel || 0;
    const engagementRate = data.metrics.engagement || 0;

    return {
      id: doc.id,
      name: data.full_name.trim() || "Perfil sin nombre",
      category: data.category.trim() || "Sin categoría",
      country: toCountry(data.location),
      followers: formatCompactNumber(followersCount),
      followersCount,
      price: formatUsd(priceUsd),
      priceUsd,
      engagement: formatEngagement(engagementRate),
      rating: "0.0",
    };
  });
}
