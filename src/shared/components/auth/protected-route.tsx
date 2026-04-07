"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getMockSession, type MockRole } from "@/shared/lib/mock-auth";

type ProtectedRouteProps = {
  children: React.ReactNode;
  allowedRole: MockRole;
};

export function ProtectedRoute({ children, allowedRole }: ProtectedRouteProps) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const session = getMockSession();

    if (!session) {
      // No hay sesión, redirigir a login
      router.push("/login");
      return;
    }

    if (session.role !== allowedRole) {
      // Rol incorrecto, redirigir a su dashboard
      const redirectTo = session.role === "influencer" ? "/influencer" : "/empresa";
      router.push(redirectTo);
      return;
    }

    // Autorizado
    setIsAuthorized(true);
    setIsLoading(false);
  }, [router, allowedRole]);

  if (isLoading || !isAuthorized) {
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
