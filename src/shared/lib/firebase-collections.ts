import {
  collection,
  doc,
  type CollectionReference,
  type DocumentReference,
  type Timestamp,
} from "firebase/firestore";
import { db } from "@/shared/lib/firebase";

export type FirebaseRole = "influencer" | "company";
export type AppRole = "influencer" | "empresa";

export type UserDoc = {
  username: string;
  email: string;
  role: FirebaseRole;
  profile_image: string;
  onboarding_complete: boolean;
  created_at: Timestamp | null;
};

export type InfluencerDoc = {
  full_name: string;
  birth_date: Timestamp | null;
  dui: string;
  location: string;
  category: string;
  is_premium: boolean;
  metrics: {
    instagram_followers: number;
    tiktok_followers: number;
    engagement: number;
  };
  prices: {
    ig_reel: number;
    ig_photo: number;
    tk_video: number;
  };
};

export type CompanyDoc = {
  company_name: string;
  category: string;
  description: string;
  products: string[];
  address: string;
  company_code: string;
  country: string;
  credits: number;
};

export type ChatDoc = {
  participants: [string, string];
  participant_names?: Record<string, string>;
  participant_images?: Record<string, string>;
  is_unlocked: boolean;
  last_message: string;
  last_sender_id?: string;
  unread_counts?: Record<string, number>;
  updated_at: Timestamp | null;
};

export type MessageDoc = {
  sender_id: string;
  sender_name?: string;
  sender_profile_image?: string;
  text: string;
  timestamp: Timestamp | null;
};

export type ReviewDoc = {
  influencer_id: string;
  company_id: string;
  rating: number;
  comment: string;
  created_at: Timestamp | null;
};

export type UsernameDoc = {
  uid: string;
  created_at: Timestamp | null;
};

function requireDb() {
  if (!db) {
    throw new Error("Firebase Firestore no esta configurado.");
  }

  return db;
}

export function toFirebaseRole(role: AppRole): FirebaseRole {
  return role === "empresa" ? "company" : "influencer";
}

export function toAppRole(role: FirebaseRole): AppRole {
  return role === "company" ? "empresa" : "influencer";
}

export function buildChatId(companyUid: string, influencerUid: string) {
  return `${companyUid}_${influencerUid}`;
}

export function usersCollectionRef() {
  return collection(requireDb(), "users") as CollectionReference<UserDoc>;
}

export function usernamesCollectionRef() {
  return collection(requireDb(), "usernames") as CollectionReference<UsernameDoc>;
}

export function usernameDocRef(username: string) {
  return doc(usernamesCollectionRef(), username) as DocumentReference<UsernameDoc>;
}

export function userDocRef(uid: string) {
  return doc(usersCollectionRef(), uid) as DocumentReference<UserDoc>;
}

export function influencersCollectionRef() {
  return collection(requireDb(), "influencers") as CollectionReference<InfluencerDoc>;
}

export function influencerDocRef(uid: string) {
  return doc(influencersCollectionRef(), uid) as DocumentReference<InfluencerDoc>;
}

export function companiesCollectionRef() {
  return collection(requireDb(), "companies") as CollectionReference<CompanyDoc>;
}

export function companyDocRef(uid: string) {
  return doc(companiesCollectionRef(), uid) as DocumentReference<CompanyDoc>;
}

export function chatsCollectionRef() {
  return collection(requireDb(), "chats") as CollectionReference<ChatDoc>;
}

export function chatDocRef(chatId: string) {
  return doc(chatsCollectionRef(), chatId) as DocumentReference<ChatDoc>;
}

export function chatMessagesCollectionRef(chatId: string) {
  return collection(chatDocRef(chatId), "messages") as CollectionReference<MessageDoc>;
}

export function reviewsCollectionRef() {
  return collection(requireDb(), "reviews") as CollectionReference<ReviewDoc>;
}
