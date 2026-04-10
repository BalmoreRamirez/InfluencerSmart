"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/shared/stores/auth-store";
import { useChatStore } from "@/shared/stores/chat-store";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/explorar", label: "Explorar" },
];

function MessageIcon() {
  return <i className="bx bx-envelope text-[1.25rem] leading-none" aria-hidden="true" />;
}

function UserIcon() {
  return <i className="bx bx-user text-[1.25rem] leading-none" aria-hidden="true" />;
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
  const profileHref = session?.role === "influencer" ? "/influencer/perfil" : "/empresa/perfil";

  return (
    <header className="sticky top-0 z-40 border-b border-[#5d7932]/18 bg-white backdrop-blur-lg">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-6 py-4">
        {/* Logo */}
        <Link href="/" className="inline-flex items-center gap-2 justify-self-start">
          <span className="h-2.5 w-2.5 rounded-full bg-[#0c1117]" />
          <span className="text-base font-black tracking-tight text-[#0c1117]">
            InfluencerSmart
          </span>
        </Link>

        <nav className="hidden items-center justify-center gap-6 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-1 py-2 text-sm font-semibold text-[#0c1117]/80 transition hover:text-[#0c1117]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 justify-self-end lg:flex">
          <Link
            href="/chat"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-[#0c1117]/80 transition hover:bg-[#c0e2ff]/20 hover:text-[#0c1117]"
            aria-label="Mensajes"
          >
            <MessageIcon />
            {unreadMessages > 0 ? (
              <span className="absolute -right-0.5 -top-0.5 min-w-5 rounded-full bg-[#d8ff85] px-1.5 py-0.5 text-center text-[10px] font-bold leading-none text-[#0c1117]">
                {unreadLabel}
              </span>
            ) : null}
          </Link>

          {session ? (
            <div className="group relative">
              <button
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#0c1117]/80 transition hover:bg-[#c0e2ff]/20 hover:text-[#0c1117]"
                aria-label={`Perfil de ${sessionRoleLabel}`}
              >
                <UserIcon />
              </button>
              <div className="invisible absolute right-0 top-10 z-50 w-72 rounded-2xl border border-[#5d7932]/18 bg-white p-1 opacity-0 shadow-[0_12px_35px_rgba(13,12,21,0.16)] transition group-hover:visible group-hover:opacity-100">
                <div className="rounded-xl px-4 pb-4 pt-5 text-center">
                  <Image
                    src={sessionAvatarUrl}
                    alt={`Perfil de ${sessionRoleLabel}`}
                    width={72}
                    height={72}
                    className="mx-auto h-[72px] w-[72px] rounded-full border border-[#5d7932]/18 object-cover"
                  />
                  <p className="mt-3 text-base font-bold text-[#0c1117]">{session.username}</p>
                  <p className="mt-1 text-sm text-[#0c1117]/60">{session.email}</p>
                </div>
                <div className="border-t border-[#5d7932]/18 px-1 py-1">
                <Link
                  href={profileHref}
                  className="block rounded-xl px-3 py-2 text-sm font-medium text-[#0c1117]/85 transition hover:bg-[#c0e2ff]/20"
                >
                  Ver perfil
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-[#0c1117]/85 transition hover:bg-[#c0e2ff]/20"
                >
                  Cerrar sesión
                </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-full btn-secondary px-5 py-2 text-sm font-semibold text-[#0c1117] transition"
              >
                Iniciar sesión
              </Link>
              <Link
                href="/registro"
                className="rounded-full btn-primary px-5 py-2 text-sm font-semibold text-white transition"
              >
                Empezar
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <details className="group relative justify-self-end lg:hidden">
          <summary className="inline-flex cursor-pointer list-none items-center gap-2 rounded-full border border-[#5d7932]/22 bg-[#f5faf0] px-4 py-2 text-sm font-semibold text-[#0c1117]">
            <i className="bx bx-menu text-base leading-none" aria-hidden="true" />
            Menú
          </summary>
          <div className="fixed inset-0 z-50 bg-[#0c1117]/45 p-3">
            <div className="ml-auto w-[min(22rem,calc(100vw-1.5rem))] rounded-[1.75rem] border border-white/10 bg-[#0c1117] p-3 text-white shadow-[0_18px_45px_rgba(5,7,10,0.45)]">
              <div className="flex items-center justify-between border-b border-white/10 px-2 pb-3">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/65">Navegación</span>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white/80">
                  <i className="bx bx-x text-lg leading-none" aria-hidden="true" />
                </span>
              </div>

              {session ? (
                <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-3">
                  <div className="flex items-center gap-3">
                    <Image
                      src={sessionAvatarUrl}
                      alt={`Perfil de ${sessionRoleLabel}`}
                      width={44}
                      height={44}
                      className="h-11 w-11 rounded-full border border-white/15 object-cover"
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-white">{session.username}</p>
                      <p className="truncate text-xs text-white/60">{session.email}</p>
                    </div>
                  </div>
                </div>
              ) : null}

              <nav className="mt-3 grid gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-xl border border-white/10 px-4 py-3 text-sm font-medium text-white/90 transition hover:bg-white/10"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/chat"
                  className="inline-flex items-center justify-between rounded-xl border border-white/10 px-4 py-3 text-sm font-medium text-white/90 transition hover:bg-white/10"
                >
                  <span className="inline-flex items-center gap-2">
                    <MessageIcon />
                    Chat
                  </span>
                  {unreadMessages > 0 ? (
                    <span className="rounded-full bg-[#d8ff85] px-2 py-0.5 text-xs font-bold text-[#0c1117]">
                      {unreadLabel}
                    </span>
                  ) : null}
                </Link>
              </nav>

              <div className="mt-3 grid gap-2 border-t border-white/10 pt-3">
                {session ? (
                  <>
                    <Link
                      href={profileHref}
                      className="rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10"
                    >
                      Ver perfil
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="rounded-xl border border-[#d8ff85]/35 bg-[#d8ff85]/90 px-4 py-3 text-sm font-semibold text-[#0c1117] transition hover:bg-[#d8ff85]"
                    >
                      Cerrar sesión
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="rounded-xl border border-white/10 px-4 py-3 text-center text-sm font-semibold text-white/90 transition hover:bg-white/10"
                    >
                      Iniciar sesión
                    </Link>
                    <Link
                      href="/registro"
                      className="rounded-xl bg-[#d8ff85] px-4 py-3 text-center text-sm font-semibold text-[#0c1117]"
                    >
                      Empezar
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}
