import {
  Timestamp,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
  type FieldValue,
} from "firebase/firestore";
import { companyDocRef, influencerDocRef, userDocRef, type CompanyDoc, type InfluencerDoc } from "@/shared/lib/firebase-collections";

export type InfluencerOnboardingInput = {
  fullName: string;
  birthDate: string;
  dui: string;
  location: string;
  category: string;
  instagramFollowers: string;
  tiktokFollowers: string;
  engagement: string;
  igReel: string;
  igPhoto: string;
  tkVideo: string;
};

export type CompanyOnboardingInput = {
  companyName: string;
  category: string;
  description: string;
  products: string;
  address: string;
  companyCode: string;
  country: string;
};

export function isAdult(birthDateIso: string) {
  if (!birthDateIso) return false;

  const birth = new Date(birthDateIso);
  if (Number.isNaN(birth.getTime())) return false;

  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age -= 1;
  }

  return age >= 18;
}

export function isValidDui(dui: string) {
  return /^\d{8}-\d$/.test(dui.trim());
}

export async function getInfluencerOnboarding(uid: string) {
  const snap = await getDoc(influencerDocRef(uid));
  if (!snap.exists()) return null;
  return snap.data();
}

export async function getCompanyOnboarding(uid: string) {
  const snap = await getDoc(companyDocRef(uid));
  if (!snap.exists()) return null;
  return snap.data();
}

export async function saveInfluencerOnboarding(uid: string, input: InfluencerOnboardingInput) {
  const payload: InfluencerDoc = {
    full_name: input.fullName.trim(),
    birth_date: Timestamp.fromDate(new Date(input.birthDate)),
    dui: input.dui.trim(),
    location: input.location.trim(),
    category: input.category.trim(),
    is_premium: false,
    metrics: {
      instagram_followers: Number(input.instagramFollowers) || 0,
      tiktok_followers: Number(input.tiktokFollowers) || 0,
      engagement: Number(input.engagement) || 0,
    },
    prices: {
      ig_reel: Number(input.igReel) || 0,
      ig_photo: Number(input.igPhoto) || 0,
      tk_video: Number(input.tkVideo) || 0,
    },
  };

  await setDoc(influencerDocRef(uid), payload, { merge: true });
  await updateDoc(userDocRef(uid), {
    onboarding_complete: true,
    updated_at: serverTimestamp() as unknown as FieldValue,
  });
}

export async function saveCompanyOnboarding(uid: string, input: CompanyOnboardingInput) {
  const payload: CompanyDoc = {
    company_name: input.companyName.trim(),
    category: input.category.trim(),
    description: input.description.trim(),
    products: input.products
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
    address: input.address.trim(),
    company_code: input.companyCode.trim(),
    country: input.country.trim(),
    credits: 0,
  };

  await setDoc(companyDocRef(uid), payload, { merge: true });
  await updateDoc(userDocRef(uid), {
    onboarding_complete: true,
    updated_at: serverTimestamp() as unknown as FieldValue,
  });
}

