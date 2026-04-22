import { getDoc, getDocs, query, where } from "firebase/firestore/lite";
import {
  influencerDocRef,
  influencersCollectionRef,
  reviewsCollectionRef,
} from "@/shared/lib/firebase-collections";
import type { ReviewCardItem } from "@/shared/components/ui/review-card";

export type PublicInfluencerProfile = {
  id: string;
  fullName: string;
  avatarUrl: string;
  handle: string;
  location: string;
  categories: string[];
  bio: string;
  followers: string;
  avgReach: string;
  engagementRate: string;
  estimatedPrice: string;
  completedServices: number;
  languages: string[];
  portfolio: string[];
  averageRating?: number;
  totalReviews: number;
  instagramConnected: boolean;
  instagramMetrics?: {
    monthlyReach: string;
    storyViews: string;
    demographics: {
      age: string;
      gender: string;
      topCountries: string[];
    };
  };
  reviews: ReviewCardItem[];
};

function toSlug(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
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

function formatPercent(value: number) {
  return `${value}%`;
}

async function findInfluencerUidBySlug(slug: string) {
  const snap = await getDocs(query(influencersCollectionRef()));
  const match = snap.docs.find((doc) => {
    const fullName = (doc.data().full_name ?? "").trim();
    return toSlug(fullName) === slug;
  });
  return match?.id ?? null;
}

async function listReviewsForInfluencer(influencerUid: string): Promise<ReviewCardItem[]> {
  const snap = await getDocs(query(reviewsCollectionRef(), where("influencer_id", "==", influencerUid)));

  const rows: ReviewCardItem[] = snap.docs.map((docSnap) => {
    const data = docSnap.data();
    return {
      id: docSnap.id,
      companyName: "Empresa",
      rating: data.rating,
      comment: data.comment,
      date: data.created_at?.toDate ? data.created_at.toDate().toISOString() : new Date().toISOString(),
      campaign: "Colaboración",
    };
  });

  return rows.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPublicInfluencerProfileBySlug(slug: string): Promise<PublicInfluencerProfile | null> {
  const influencerUid = await findInfluencerUidBySlug(slug);
  if (!influencerUid) return null;

  const [influencerSnap, reviews] = await Promise.all([
    getDoc(influencerDocRef(influencerUid)),
    listReviewsForInfluencer(influencerUid),
  ]);

  if (!influencerSnap.exists()) return null;
  const influencer = influencerSnap.data();

  const fullName = (influencer.full_name || "").trim() || "Perfil sin nombre";
  const category = (influencer.category || "").trim();
  const followersCount = influencer.metrics.instagram_followers || 0;
  const engagement = influencer.metrics.engagement || 0;
  const reelPrice = influencer.prices.ig_reel || 0;
  const avgRating = reviews.length > 0 ? reviews.reduce((acc, item) => acc + item.rating, 0) / reviews.length : undefined;

  return {
    id: influencerUid,
    fullName,
    avatarUrl: "",
    handle: `@${toSlug(fullName)}`,
    location: influencer.location || "Sin ubicación",
    categories: category ? [category] : ["Sin categoría"],
    bio: `${fullName} comparte contenido en ${category || "redes sociales"}.`,
    followers: formatCompactNumber(followersCount),
    avgReach: formatCompactNumber(Math.round(followersCount * 0.5)),
    engagementRate: formatPercent(engagement),
    estimatedPrice: formatUsd(reelPrice),
    completedServices: reviews.length,
    languages: ["Español"],
    portfolio: [],
    averageRating: avgRating,
    totalReviews: reviews.length,
    instagramConnected: followersCount > 0,
    instagramMetrics: followersCount > 0
      ? {
          monthlyReach: formatCompactNumber(Math.round(followersCount * 2.8)),
          storyViews: `${formatCompactNumber(Math.round(followersCount * 0.2))} promedio`,
          demographics: {
            age: "18-34 años",
            gender: "Audiencia mixta",
            topCountries: [influencer.location || "Sin datos"],
          },
        }
      : undefined,
    reviews,
  };
}
