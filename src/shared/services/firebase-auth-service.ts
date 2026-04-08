import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type Unsubscribe,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import {
  Timestamp,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { auth, isFirebaseEnabled } from "@/shared/lib/firebase";
import {
  companyDocRef,
  influencerDocRef,
  toAppRole,
  toFirebaseRole,
  usernameDocRef,
  userDocRef,
  type AppRole,
  type UserDoc,
} from "@/shared/lib/firebase-collections";

export type AuthSession = {
  uid: string;
  email: string;
  role: AppRole;
  username: string;
  profileImage: string;
  onboardingComplete: boolean;
  loginAt: string;
};

export type RegisterInput = {
  username: string;
  email: string;
  password: string;
  role: AppRole;
};

function ensureFirebaseAuth() {
  if (!isFirebaseEnabled || !auth) {
    throw new Error("Firebase Auth no esta configurado. Revisa tu .env.");
  }

  return auth;
}

function toFriendlyAuthError(error: unknown) {
  if (!(error instanceof FirebaseError)) {
    return error instanceof Error ? error : new Error("Ocurrio un error inesperado.");
  }

  switch (error.code) {
    case "permission-denied":
      return new Error(
        "Firebase bloqueo esta operacion por reglas de Firestore. Publica firestore.rules e intenta de nuevo."
      );
    case "auth/email-already-in-use":
      return new Error("Ese correo ya esta registrado.");
    case "auth/invalid-email":
      return new Error("El correo no tiene un formato valido.");
    case "auth/weak-password":
      return new Error("La contrasena es muy debil. Usa al menos 6 caracteres.");
    default:
      return new Error(error.message || "No se pudo completar la operacion en Firebase.");
  }
}

function getDefaultProfileImage(role: AppRole) {
  return role === "influencer"
    ? "https://i.pravatar.cc/320?img=32"
    : "https://picsum.photos/seed/company-default/320/320";
}

function inferRoleFromEmail(email: string): AppRole {
  const normalized = email.toLowerCase();
  if (normalized.includes("empresa") || normalized.includes("company")) {
    return "empresa";
  }
  return "influencer";
}

async function provisionMissingUserDocs(uid: string, email: string) {
  const role = inferRoleFromEmail(email);
  const usernameBase = email
    .split("@")[0]
    .replace(/[^a-zA-Z0-9._-]/g, "-")
    .toLowerCase();
  const username = `${usernameBase}-${uid.slice(0, 6)}`;
  const profileImage = getDefaultProfileImage(role);

  await reserveUsername(username, uid);

  await setDoc(userDocRef(uid), {
    username,
    email: email.trim().toLowerCase(),
    role: toFirebaseRole(role),
    profile_image: profileImage,
    onboarding_complete: false,
    created_at: serverTimestamp() as unknown as Timestamp,
  });

  if (role === "influencer") {
    await setDoc(influencerDocRef(uid), {
      full_name: "",
      birth_date: null,
      dui: "",
      location: "",
      category: "",
      is_premium: false,
      metrics: {
        instagram_followers: 0,
        tiktok_followers: 0,
        engagement: 0,
      },
      prices: {
        ig_reel: 0,
        ig_photo: 0,
        tk_video: 0,
      },
    });
  } else {
    await setDoc(companyDocRef(uid), {
      company_name: "",
      category: "",
      description: "",
      products: [],
      address: "",
      company_code: "",
      country: "",
      credits: 0,
    });
  }
}

function toSession(uid: string, doc: UserDoc): AuthSession {
  return {
    uid,
    email: doc.email,
    role: toAppRole(doc.role),
    username: doc.username,
    profileImage: doc.profile_image,
    onboardingComplete: doc.onboarding_complete,
    loginAt: new Date().toISOString(),
  };
}

function normalizeUsername(username: string) {
  return username.trim().toLowerCase();
}

async function assertUsernameIsAvailable(username: string) {
  const normalized = normalizeUsername(username);
  const snap = await getDoc(usernameDocRef(normalized));

  if (snap.exists()) {
    throw new Error("El username ya esta en uso.");
  }

  return normalized;
}

async function reserveUsername(username: string, uid: string) {
  await setDoc(usernameDocRef(username), {
    uid,
    created_at: serverTimestamp() as unknown as Timestamp,
  });
}

export async function fetchUserSessionByUid(uid: string): Promise<AuthSession | null> {
  const userSnap = await getDoc(userDocRef(uid));
  if (!userSnap.exists()) return null;

  return toSession(uid, userSnap.data());
}

export async function loginWithEmailPassword(email: string, password: string) {
  try {
    const firebaseAuth = ensureFirebaseAuth();
    const credential = await signInWithEmailAndPassword(firebaseAuth, email.trim(), password);
    let session = await fetchUserSessionByUid(credential.user.uid);

    if (!session) {
      await provisionMissingUserDocs(credential.user.uid, credential.user.email ?? email);
      session = await fetchUserSessionByUid(credential.user.uid);
    }

    if (!session) {
      throw new Error("No se pudo crear el perfil en Firestore para esta cuenta.");
    }

    return session;
  } catch (error) {
    throw toFriendlyAuthError(error);
  }
}

export async function registerWithEmailPassword(input: RegisterInput) {
  let createdUid: string | null = null;

  try {
    const firebaseAuth = ensureFirebaseAuth();
    const username = await assertUsernameIsAvailable(input.username);
    const credential = await createUserWithEmailAndPassword(
      firebaseAuth,
      input.email.trim(),
      input.password
    );

    const uid = credential.user.uid;
    createdUid = uid;
    const role = toFirebaseRole(input.role);
    const profileImage = getDefaultProfileImage(input.role);

    await reserveUsername(username, uid);

    await setDoc(userDocRef(uid), {
      username,
      email: input.email.trim().toLowerCase(),
      role,
      profile_image: profileImage,
      onboarding_complete: false,
      created_at: serverTimestamp() as unknown as Timestamp,
    });

    if (input.role === "influencer") {
      await setDoc(influencerDocRef(uid), {
        full_name: "",
        birth_date: null,
        dui: "",
        location: "",
        category: "",
        is_premium: false,
        metrics: {
          instagram_followers: 0,
          tiktok_followers: 0,
          engagement: 0,
        },
        prices: {
          ig_reel: 0,
          ig_photo: 0,
          tk_video: 0,
        },
      });
    } else {
      await setDoc(companyDocRef(uid), {
        company_name: "",
        category: "",
        description: "",
        products: [],
        address: "",
        company_code: "",
        country: "",
        credits: 0,
      });
    }
    return {
      uid,
      email: input.email.trim().toLowerCase(),
      role: input.role,
      username,
      profileImage,
      onboardingComplete: false,
      loginAt: new Date().toISOString(),
    } satisfies AuthSession;
  } catch (error) {
    if (createdUid && auth?.currentUser?.uid === createdUid) {
      // Evita dejar cuentas huerfanas en Auth si falla la provision en Firestore.
      await auth.currentUser.delete().catch(() => undefined);
    }
    throw toFriendlyAuthError(error);
  }
}

export async function logoutFirebaseSession() {
  const firebaseAuth = ensureFirebaseAuth();
  await signOut(firebaseAuth);
}

export function subscribeToAuthSessionChange(
  onResolved: (session: AuthSession | null) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  const firebaseAuth = ensureFirebaseAuth();

  return onAuthStateChanged(
    firebaseAuth,
    async (user) => {
      if (!user) {
        onResolved(null);
        return;
      }

      try {
        const session = await fetchUserSessionByUid(user.uid);
        onResolved(session);
      } catch (error) {
        onError?.(error as Error);
        onResolved(null);
      }
    },
    (error) => {
      onError?.(error as Error);
      onResolved(null);
    }
  );
}

