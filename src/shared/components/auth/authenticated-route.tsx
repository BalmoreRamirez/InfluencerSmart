"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/shared/stores/auth-store";

type AuthenticatedRouteProps = {
  children: React.ReactNode;
};

export function AuthenticatedRoute({ children }: AuthenticatedRouteProps) {
  const router = useRouter();
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
      router.push("/login");
      return;
    }

    // Autorizado (cualquier rol)
  }, [router, session, isHydrated]);

  if (!isHydrated || !session) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-[#c1b8ff] border-t-transparent" />
          <p className="mt-4 text-sm text-[#0d0c15]/60">Verificando acceso...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
