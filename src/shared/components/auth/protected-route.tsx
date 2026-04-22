"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { type AppRole } from "@/shared/lib/firebase-collections";
import { useAuthStore } from "@/features/auth/stores/auth-store";

type ProtectedRouteProps = {
  children: React.ReactNode;
  allowedRole: AppRole;
};

export function ProtectedRoute({ children, allowedRole }: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const session = useAuthStore((state) => state.session);
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const hydrateSession = useAuthStore((state) => state.hydrateSession);

  useEffect(() => {
    if (!isHydrated) {
      hydrateSession();
    }
  }, [hydrateSession, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;

    if (!session) {
      // No hay sesión, redirigir a login
      if (pathname !== "/login") {
        router.replace("/login");
      }
      return;
    }

    if (session.role !== allowedRole) {
      // Rol incorrecto, redirigir a su dashboard
      const redirectTo = session.role === "influencer" ? "/influencer" : "/empresa";
      if (pathname !== redirectTo) {
        router.replace(redirectTo);
      }
      return;
    }

    if (!session.onboardingComplete) {
      const onboardingPath = session.role === "influencer" ? "/influencer/perfil" : "/empresa/perfil";
      if (pathname !== onboardingPath) {
        router.replace(onboardingPath);
        return;
      }
    }

    // Autorizado
  }, [router, pathname, allowedRole, session, isHydrated]);

  const isAuthorized = Boolean(session && session.role === allowedRole);

  if (!isHydrated || !isAuthorized) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-[#c0e2ff] border-t-transparent" />
          <p className="mt-4 text-sm text-[#0c1117]/60">Verificando acceso...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
