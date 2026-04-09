"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/shared/stores/auth-store";
import { useChatStore } from "@/shared/stores/chat-store";

const publicNavItems = [{ href: "/", label: "Inicio" }];
const companyNavItems = [{ href: "/explorar", label: "Explorar" }];

function MessageIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none">
      <path
        d="M6 7.5h12c1.1 0 2 .9 2 2v7c0 1.1-.9 2-2 2H8l-4 3v-12c0-1.1.9-2 2-2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M8.5 11.25h7M8.5 14h4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function MainNav() {
  const router = useRouter();
  const session = useAuthStore((state) => state.session);
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const hydrateSession = useAuthStore((state) => state.hydrateSession);
  const logout = useAuthStore((state) => state.logout);
  const conversations = useChatStore((state) => state.conversations);
  const initializeChat = useChatStore((state) => state.initializeChat);
  const disconnectChat = useChatStore((state) => state.disconnectChat);

  useEffect(() => {
    if (!isHydrated) {
      hydrateSession();
    }
  }, [hydrateSession, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;

    if (!session) {
      disconnectChat();
      return;
    }

    initializeChat({
      userId: session.uid,
      userName: session.username,
      role: session.role,
    });
  }, [disconnectChat, initializeChat, isHydrated, session]);

  async function handleLogout() {
    await logout();
    router.push("/");
    router.refresh();
  }

  const sessionAvatarUrl = session?.profileImage?.trim()
    ? session.profileImage
    : session?.role === "influencer"
      ? "/avatars/influencer-example.svg"
      : "/avatars/company-example.svg";

  const sessionRoleLabel = session?.role === "influencer" ? "Influencer" : "Empresa";
  const unreadMessages = conversations.reduce((total, item) => total + item.unread, 0);
  const unreadLabel = unreadMessages > 99 ? "99+" : String(unreadMessages);
  const navItems = session?.role === "empresa" ? [...publicNavItems, ...companyNavItems] : publicNavItems;

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
            <Link
              href="/chat"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-[#0d0c15]/80 transition hover:bg-[#f4f4f4] hover:text-[#0d0c15]"
            >
              <MessageIcon />
              Mensajes
              {unreadMessages > 0 ? (
                <span className="rounded-full bg-[#fed97b] px-2 py-0.5 text-xs font-bold text-[#0d0c15]">
                  {unreadLabel}
                </span>
              ) : null}
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            {session ? (
              <>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#c1b8ff]/30 px-3 py-1.5 text-sm font-medium text-[#0d0c15]">
                  <Image
                    src={sessionAvatarUrl}
                    alt={`Perfil de ${sessionRoleLabel}`}
                    width={28}
                    height={28}
                    className="h-7 w-7 rounded-full border border-black/10 object-cover"
                  />
                  {sessionRoleLabel}
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
              <Link
                href="/chat"
                className="inline-flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium text-[#0d0c15]/80 transition hover:bg-[#f4f4f4]"
              >
                <span className="inline-flex items-center gap-2">
                  <MessageIcon />
                  Mensajes
                </span>
                {unreadMessages > 0 ? (
                  <span className="rounded-full bg-[#fed97b] px-2 py-0.5 text-xs font-bold text-[#0d0c15]">
                    {unreadLabel}
                  </span>
                ) : null}
              </Link>
            </nav>
            <div className="mt-2 grid gap-1 border-t border-black/10 pt-2">
              {session ? (
                <>
                  <div className="flex items-center justify-center gap-2 rounded-xl bg-[#c1b8ff]/20 px-4 py-2.5 text-center text-sm font-medium text-[#0d0c15]">
                    <Image
                      src={sessionAvatarUrl}
                      alt={`Perfil de ${sessionRoleLabel}`}
                      width={28}
                      height={28}
                      className="h-7 w-7 rounded-full border border-black/10 object-cover"
                    />
                    {sessionRoleLabel}
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
