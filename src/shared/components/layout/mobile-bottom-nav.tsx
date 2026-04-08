"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useChatStore } from "@/shared/stores/chat-store";

const mobileItems = [
  { href: "/", label: "Inicio" },
  { href: "/explorar", label: "Explorar" },
  { href: "/chat", label: "Chat" },
  { href: "/influencer/perfil", label: "Perfil" },
];

function MessageIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5" fill="none">
      <path
        d="M6 7.5h12c1.1 0 2 .9 2 2v7c0 1.1-.9 2-2 2H8l-4 3v-12c0-1.1.9-2 2-2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MobileBottomNav() {
  const pathname = usePathname();
  const conversations = useChatStore((state) => state.conversations);
  const unreadMessages = conversations.reduce((total, item) => total + item.unread, 0);
  const unreadLabel = unreadMessages > 99 ? "99+" : String(unreadMessages);

  function isActive(href: string) {
    if (href === "/") {
      return pathname === "/";
    }

    if (href === "/influencer/perfil") {
      return pathname.startsWith("/influencer") || pathname.startsWith("/empresa/perfil");
    }

    return pathname.startsWith(href);
  }

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-white/95 px-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] pt-2 backdrop-blur md:hidden">
      <ul className="grid grid-cols-4 gap-1">
        {mobileItems.map((item) => (
          <li key={item.href}>
            {(() => {
              const active = isActive(item.href);
              const isChatItem = item.href === "/chat";
              return (
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`flex min-h-11 items-center justify-center rounded-xl px-2 text-center text-xs font-semibold transition ${
                active
                  ? "bg-[#0d0c15] text-white"
                  : "text-[#0d0c15]/85 hover:bg-[#f4f4f4]"
              }`}
            >
              {isChatItem ? (
                <span className="inline-flex items-center gap-1">
                  <MessageIcon />
                  {item.label}
                  {unreadMessages > 0 ? (
                    <span
                      className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                        active ? "bg-white/25 text-white" : "bg-[#fed97b] text-[#0d0c15]"
                      }`}
                    >
                      {unreadLabel}
                    </span>
                  ) : null}
                </span>
              ) : (
                item.label
              )}
            </Link>
              );
            })()}
          </li>
        ))}
      </ul>
    </nav>
  );
}
