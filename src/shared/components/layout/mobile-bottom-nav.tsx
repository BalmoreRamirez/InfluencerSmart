"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const mobileItems = [
  { href: "/", label: "Inicio" },
  { href: "/explorar", label: "Explorar" },
  { href: "/chat", label: "Chat" },
  { href: "/influencer/perfil", label: "Perfil" },
];

export function MobileBottomNav() {
  const pathname = usePathname();

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
            <Link
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`flex min-h-11 items-center justify-center rounded-xl px-2 text-center text-xs font-semibold transition ${
                isActive(item.href)
                  ? "bg-[#0d0c15] text-white"
                  : "text-[#0d0c15]/85 hover:bg-[#f4f4f4]"
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
