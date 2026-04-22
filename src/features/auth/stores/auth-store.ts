import { create } from "zustand";
import { isFirebaseEnabled } from "@/shared/lib/firebase";
import {
  loginWithEmailPassword,
  logoutFirebaseSession,
  registerWithEmailPassword,
  subscribeToAuthSessionChange,
  type AuthSession,
  type RegisterInput,
} from "@/features/auth/services/firebase-auth-service";

let authUnsubscribe: (() => void) | null = null;

type AuthState = {
  session: AuthSession | null;
  isHydrated: boolean;
  authError: string | null;
  hydrateSession: () => void;
  login: (email: string, password: string) => Promise<void>;
  register: (input: RegisterInput) => Promise<void>;
  logout: () => Promise<void>;
  markOnboardingComplete: () => void;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  session: null,
  isHydrated: false,
  authError: null,
  hydrateSession: () => {
    if (get().isHydrated) return;

    if (!isFirebaseEnabled) {
      set({
        session: null,
        isHydrated: true,
        authError: "Firebase no configurado. Revisa variables NEXT_PUBLIC_FIREBASE_*.",
      });
      return;
    }

    authUnsubscribe?.();
    authUnsubscribe = subscribeToAuthSessionChange(
      (session) => {
        set({
          session,
          isHydrated: true,
          authError: null,
        });
      },
      (error) => {
        set({
          session: null,
          isHydrated: true,
          authError: error.message,
        });
      }
    );
  },
  login: async (email, password) => {
    const session = await loginWithEmailPassword(email, password);
    set({
      session,
      isHydrated: true,
      authError: null,
    });
  },
  register: async (input) => {
    const session = await registerWithEmailPassword(input);
    set({
      session,
      isHydrated: true,
      authError: null,
    });
  },
  logout: async () => {
    await logoutFirebaseSession();

    set({
      session: null,
      isHydrated: true,
      authError: null,
    });
  },
  markOnboardingComplete: () => {
    set((state) => ({
      session: state.session ? { ...state.session, onboardingComplete: true } : null,
    }));
  },
}));
