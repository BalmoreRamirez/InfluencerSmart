"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authenticateMockUser, mockUsers, saveMockSession } from "@/shared/lib/mock-auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function fillDemoCredentials(userEmail: string, userPassword: string) {
    setEmail(userEmail);
    setPassword(userPassword);
    setError("");
  }

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const user = authenticateMockUser(email, password);
    if (!user) {
      setError("Credenciales invalidas. Revisa email y contrasena de prueba.");
      setLoading(false);
      return;
    }

    saveMockSession(user);
    router.push(user.redirectTo);
  }

  return (
    <main className="mx-auto w-full max-w-md px-5 py-10 sm:px-6">
      <section className="rounded-3xl border border-black/10 bg-white p-7 shadow-[0_12px_35px_rgba(13,12,21,0.1)]">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0d0c15]/55">
          Acceso
        </p>
        <h1 className="mt-3 text-3xl font-black text-[#0d0c15]">Iniciar sesion</h1>
        <p className="mt-2 text-sm text-[#0d0c15]/70">
          Accede como influencer o representante de empresa.
        </p>

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {mockUsers.map((user) => (
            <button
              key={user.email}
              type="button"
              onClick={() => fillDemoCredentials(user.email, user.password)}
              className="rounded-xl border border-black/15 bg-[#f4f4f4] px-3 py-2 text-left text-xs font-semibold text-[#0d0c15] hover:bg-[#ececec]"
            >
              Usar perfil {user.role}
            </button>
          ))}
        </div>

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <label className="block text-sm font-medium text-[#0d0c15]">
            Correo
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="correo@empresa.com"
              className="mt-1 w-full rounded-xl border border-black/15 bg-white px-3 py-2.5 outline-none ring-[#c1b8ff] focus:ring-2"
            />
          </label>
          <label className="block text-sm font-medium text-[#0d0c15]">
            Contrasena
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="********"
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
            className="w-full rounded-xl bg-[#0d0c15] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#1f1c30]"
          >
            {loading ? "Validando..." : "Entrar"}
          </button>
        </form>

        <p className="mt-5 text-sm text-[#0d0c15]/70">
          No tienes cuenta?{" "}
          <Link href="/registro" className="font-semibold text-[#0d0c15] underline">
            Registrate aqui
          </Link>
        </p>
      </section>
    </main>
  );
}
