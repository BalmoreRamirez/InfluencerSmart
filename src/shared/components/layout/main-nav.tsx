import Link from "next/link";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/explorar", label: "Explorar" },
  { href: "/simulaciones", label: "Simulaciones" },
  { href: "/registro", label: "Registro" },
  { href: "/influencer", label: "Panel Influencer" },
  { href: "/empresa", label: "Panel Empresa" },
  { href: "/chat", label: "Chat" },
];

export function MainNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#0d0c15]" />
          <span className="text-base font-black tracking-tight text-[#0d0c15]">
            InfluencerSmart
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1.5 text-sm font-medium text-[#0d0c15]/80 transition hover:bg-[#f4f4f4] hover:text-[#0d0c15]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/login"
            className="rounded-full border border-black/15 px-3 py-1.5 text-xs font-semibold text-[#0d0c15] hover:bg-[#f4f4f4] sm:text-sm"
          >
            Iniciar sesion
          </Link>
          <Link
            href="/registro"
            className="rounded-full bg-[#0d0c15] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#1f1c30] sm:text-sm"
          >
            Empezar
          </Link>
        </div>

        <details className="group relative md:hidden">
          <summary className="list-none rounded-full border border-black/15 px-3 py-1.5 text-xs font-semibold text-[#0d0c15]">
            Menu
          </summary>
          <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-black/10 bg-white p-2 shadow-[0_12px_35px_rgba(13,12,21,0.16)]">
            <nav className="grid gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-3 py-2 text-sm font-medium text-[#0d0c15]/80 hover:bg-[#f4f4f4]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-2 grid gap-1 border-t border-black/10 pt-2">
              <Link
                href="/login"
                className="rounded-xl px-3 py-2 text-sm font-semibold text-[#0d0c15] hover:bg-[#f4f4f4]"
              >
                Iniciar sesion
              </Link>
              <Link
                href="/registro"
                className="rounded-xl bg-[#0d0c15] px-3 py-2 text-center text-sm font-semibold text-white"
              >
                Empezar
              </Link>
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}
