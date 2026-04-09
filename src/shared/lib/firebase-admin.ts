import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { FieldValue, getFirestore } from "firebase-admin/firestore";

function ensureEnv(name: string) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Falta variable de entorno: ${name}`);
  }
  return value;
}

function getAdminApp() {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  return initializeApp({
    credential: cert({
      projectId: ensureEnv("FIREBASE_PROJECT_ID"),
      clientEmail: ensureEnv("FIREBASE_CLIENT_EMAIL"),
      privateKey: ensureEnv("FIREBASE_PRIVATE_KEY").replace(/\\n/g, "\n"),
    }),
  });
}

export const adminServerTimestamp = FieldValue.serverTimestamp;

export function getAdminServices() {
  const adminApp = getAdminApp();
  return {
    adminAuth: getAuth(adminApp),
    adminDb: getFirestore(adminApp),
  };
}
