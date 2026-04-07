"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getMockSession, clearMockSession } from "@/shared/lib/mock-auth";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/explorar", label: "Explorar" },
];

export function MainNav() {
  const router = useRouter();
  const [session, setSession] = useState<ReturnType<typeof getMockSession>>(null);

  useEffect(() => {
    setSession(getMockSession());
  }, []);

  function handleLogout() {
    clearMockSession();
    setSession(null);
    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-white backdrop-blur-lg">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#0d0c15]" />
          <span className="text-base font-black tracking-tight text-[#0d0c15]">
            InfluencerSmart
          </span>
        </Link>

        {/* Navigation + Auth - Right aligned */}
        <div className="hidden items-center gap-6 lg:flex">
          <nav className="flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-[#0d0c15]/80 transition hover:text-[#0d0c15]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {session ? (
              <>
                <span className="rounded-full bg-[#c1b8ff]/30 px-4 py-2 text-sm font-medium text-[#0d0c15]">
                  {session.role === "influencer" ? "🎨 Influencer" : "🏢 Empresa"}
                </span>
                <button
                  onClick={handleLogout}
                  className="rounded-full border border-black/15 px-5 py-2 text-sm font-semibold text-[#0d0c15] transition hover:bg-[#f4f4f4]"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-full border border-black/15 px-5 py-2 text-sm font-semibold text-[#0d0c15] transition hover:bg-[#f4f4f4]"
                >
                  Iniciar sesión
                </Link>
                <Link
                  href="/registro"
                  className="rounded-full bg-[#0d0c15] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#1f1c30]"
                >
                  Empezar
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <details className="group relative lg:hidden">
          <summary className="list-none rounded-full border border-black/15 px-4 py-2 text-sm font-semibold text-[#0d0c15] cursor-pointer">
            Menú
          </summary>
          <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-black/10 bg-white p-2 shadow-[0_12px_35px_rgba(13,12,21,0.16)]">
            <nav className="grid gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-4 py-2.5 text-sm font-medium text-[#0d0c15]/80 transition hover:bg-[#f4f4f4]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-2 grid gap-1 border-t border-black/10 pt-2">
              {session ? (
                <>
                  <div className="rounded-xl bg-[#c1b8ff]/20 px-4 py-2.5 text-center text-sm font-medium text-[#0d0c15]">
                    {session.role === "influencer" ? "🎨 Influencer" : "🏢 Empresa"}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="rounded-xl px-4 py-2.5 text-sm font-semibold text-[#0d0c15] transition hover:bg-[#f4f4f4]"
                  >
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="rounded-xl px-4 py-2.5 text-sm font-semibold text-[#0d0c15] transition hover:bg-[#f4f4f4]"
                  >
                    Iniciar sesión
                  </Link>
                  <Link
                    href="/registro"
                    className="rounded-xl bg-[#0d0c15] px-4 py-2.5 text-center text-sm font-semibold text-white"
                  >
                    Empezar
                  </Link>
                </>
              )}
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}
