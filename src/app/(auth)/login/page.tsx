"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/shared/stores/auth-store";

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const session = useAuthStore((state) => state.session);
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const hydrateSession = useAuthStore((state) => state.hydrateSession);
  const authError = useAuthStore((state) => state.authError);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isHydrated) {
      hydrateSession();
    }
  }, [hydrateSession, isHydrated]);

  useEffect(() => {
    if (!isHydrated || !session) return;
    const redirectTo = session.onboardingComplete
      ? (session.role === "influencer" ? "/influencer" : "/empresa")
      : (session.role === "influencer" ? "/influencer/perfil" : "/empresa/perfil");
    router.push(redirectTo);
  }, [isHydrated, session, router]);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(email, password);
      setLoading(false);
    } catch (loginError) {
      const message = loginError instanceof Error ? loginError.message : "Error al iniciar sesion.";
      setError(message);
      setLoading(false);
    }
  }

  if (!isHydrated || session) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-[#c1b8ff] border-t-transparent" />
          <p className="mt-4 text-sm text-[#0d0c15]/60">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="mx-auto w-full max-w-md px-5 py-10 sm:px-6">
      <section className="rounded-3xl border border-black/10 bg-white p-7 shadow-[0_12px_35px_rgba(13,12,21,0.1)]">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0d0c15]/55">
          Acceso
        </p>
        <h1 className="mt-3 text-3xl font-black text-[#0d0c15]">Iniciar sesión</h1>
        <p className="mt-2 text-sm text-[#0d0c15]/70">
          Accede como influencer o representante de empresa.
        </p>

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <label className="block text-sm font-medium text-[#0d0c15]">
            Correo
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="correo@empresa.com"
              required
              className="mt-1 w-full rounded-xl border border-black/15 bg-white px-3 py-2.5 outline-none ring-[#c1b8ff] focus:ring-2"
            />
          </label>
          <label className="block text-sm font-medium text-[#0d0c15]">
            Contraseña
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="********"
              required
              className="mt-1 w-full rounded-xl border border-black/15 bg-white px-3 py-2.5 outline-none ring-[#c1b8ff] focus:ring-2"
            />
          </label>
          {error ? (
            <p className="rounded-xl border border-[#fed97b] bg-[#fed97b]/30 px-3 py-2 text-sm text-[#0d0c15]">
              {error}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#0d0c15] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1f1c30] disabled:opacity-50"
          >
            {loading ? "Validando..." : "Entrar"}
          </button>
        </form>

        <p className="mt-5 text-sm text-[#0d0c15]/70">
          ¿No tienes cuenta?{" "}
          <Link href="/registro" className="font-semibold text-[#0d0c15] underline">
            Regístrate aquí
          </Link>
        </p>
      </section>

      {/* Estado de configuracion */}
      <div className="mt-6 rounded-2xl border border-black/10 bg-[#f4f4f4] p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#0d0c15]/60">
          Configuracion de autenticacion
        </p>
        <div className="mt-3 space-y-2 text-sm text-[#0d0c15]/80">
          <p>Este login usa Firebase Authentication.</p>
          {authError ? <p className="text-xs text-red-700">{authError}</p> : null}
        </div>
      </div>
    </main>
  );
}
