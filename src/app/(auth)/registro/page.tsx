"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type AppRole } from "@/shared/lib/firebase-collections";
import { useAuthStore } from "@/shared/stores/auth-store";

export default function RegisterPage() {
  const router = useRouter();
  const register = useAuthStore((state) => state.register);
  const session = useAuthStore((state) => state.session);
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const hydrateSession = useAuthStore((state) => state.hydrateSession);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<AppRole>("influencer");
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

  async function handleRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await register({
        username,
        email,
        password,
        role,
      });
      router.push(role === "influencer" ? "/influencer/perfil" : "/empresa/perfil");
    } catch (registerError) {
      const message =
        registerError instanceof Error
          ? registerError.message
          : "No se pudo completar el registro.";
      setError(message);
      setLoading(false);
    }
  }

  if (!isHydrated || session) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-[#c0e2ff] border-t-transparent" />
          <p className="mt-4 text-sm text-[#0c1117]/60">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="mx-auto w-full max-w-4xl px-5 py-10 sm:px-6">
      <section className="rounded-3xl border border-[#5d7932]/18 bg-white p-7 sm:p-9">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0c1117]/55">
          Registro
        </p>
        <h1 className="mt-3 text-3xl font-black text-[#0c1117] sm:text-4xl">
          Crea tu cuenta en minutos
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-[#0c1117]/72 sm:text-base">
          Elige el tipo de cuenta y continua con onboarding orientado a tu flujo.
        </p>

        <form onSubmit={handleRegister} className="mt-7 grid gap-4">
          <label className="text-sm font-semibold text-[#0c1117]">
            Username unico
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="valeriatech"
              required
              className="mt-1 w-full rounded-xl border border-[#5d7932]/24 px-3 py-2.5 text-sm outline-none ring-[#c0e2ff] focus:ring-2"
            />
          </label>
          <label className="text-sm font-semibold text-[#0c1117]">
            Correo
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="correo@dominio.com"
              required
              className="mt-1 w-full rounded-xl border border-[#5d7932]/24 px-3 py-2.5 text-sm outline-none ring-[#c0e2ff] focus:ring-2"
            />
          </label>
          <label className="text-sm font-semibold text-[#0c1117]">
            Contrasena
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              minLength={6}
              required
              className="mt-1 w-full rounded-xl border border-[#5d7932]/24 px-3 py-2.5 text-sm outline-none ring-[#c0e2ff] focus:ring-2"
            />
          </label>
          <fieldset className="rounded-2xl border border-[#5d7932]/18 p-4">
            <legend className="px-1 text-xs font-semibold uppercase tracking-wide text-[#0c1117]/60">
              Tipo de cuenta
            </legend>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              <label className="flex items-center gap-2 rounded-xl border border-[#5d7932]/18 px-3 py-2 text-sm">
                <input
                  type="radio"
                  name="role"
                  checked={role === "influencer"}
                  onChange={() => setRole("influencer")}
                />
                Influencer
              </label>
              <label className="flex items-center gap-2 rounded-xl border border-[#5d7932]/18 px-3 py-2 text-sm">
                <input
                  type="radio"
                  name="role"
                  checked={role === "empresa"}
                  onChange={() => setRole("empresa")}
                />
                Empresa
              </label>
            </div>
          </fieldset>

          {error ? (
            <p className="rounded-xl border border-[#d8ff85] bg-[#d8ff85]/30 px-3 py-2 text-sm text-[#0c1117]">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex justify-center rounded-full bg-[#0c1117] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#244124] disabled:opacity-50"
          >
            {loading ? "Creando cuenta..." : "Crear cuenta"}
          </button>
        </form>

        <p className="mt-6 text-sm text-[#0c1117]/70">
          Ya tienes cuenta?{" "}
          <Link href="/login" className="font-semibold text-[#0c1117] underline">
            Inicia sesion
          </Link>
        </p>
      </section>
    </main>
  );
}
