"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/shared/stores/auth-store";

export default function Home() {
  const router = useRouter();
  const session = useAuthStore((state) => state.session);
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const hydrateSession = useAuthStore((state) => state.hydrateSession);

  useEffect(() => {
    if (!isHydrated) {
      hydrateSession();
    }
  }, [hydrateSession, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;

    if (session) {
      // Si hay sesión activa, redirigir a su dashboard
      const redirectTo = session.role === "influencer" ? "/influencer" : "/empresa";
      router.push(redirectTo);
    }
  }, [router, session, isHydrated]);

  if (!isHydrated || session) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#c1b8ff] border-t-transparent mx-auto" />
          <p className="mt-4 text-sm text-[#0d0c15]/60">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 justify-center px-5 py-10 sm:px-8 sm:py-12">
      <main className="w-full max-w-6xl space-y-8">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl border border-black/10 bg-gradient-to-br from-white to-[#f4f4f4] p-8 shadow-[0_14px_50px_rgba(13,12,21,0.12)] sm:p-12">
          <div className="pointer-events-none absolute -left-24 -top-24 h-56 w-56 rounded-full bg-[#c1b8ff]/40 blur-3xl" />
          <div className="pointer-events-none absolute -right-16 top-0 h-52 w-52 rounded-full bg-[#fed97b]/50 blur-3xl" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#0d0c15] px-4 py-2 text-xs font-semibold text-white">
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
              PLATAFORMA MVP
            </div>
            
            <h1 className="mt-6 max-w-3xl text-4xl font-black leading-tight text-[#0d0c15] sm:text-6xl">
              Conecta tu marca con los mejores{" "}
              <span className="bg-gradient-to-r from-[#c1b8ff] to-[#fed97b] bg-clip-text text-transparent">
                influencers
              </span>
            </h1>
            
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#0d0c15]/75 sm:text-xl">
              La plataforma que conecta empresas con influencers para crear campañas exitosas.
              Busca, negocia y gestiona todo en un solo lugar.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/registro"
                className="rounded-full bg-[#0d0c15] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#1f1c30] hover:shadow-xl sm:px-8 sm:text-base"
              >
                Empezar gratis →
              </Link>
              <Link
                href="/explorar"
                className="rounded-full border-2 border-[#0d0c15] px-6 py-3 text-sm font-semibold text-[#0d0c15] transition hover:bg-[#0d0c15] hover:text-white sm:px-8 sm:text-base"
              >
                Ver influencers
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="grid gap-4 sm:grid-cols-3">
          <StatCard number="20+" label="Influencers activos" />
          <StatCard number="15+" label="Categorías disponibles" />
          <StatCard number="100%" label="Gratis para empezar" />
        </section>

        {/* Features Section */}
        <section className="rounded-3xl border border-black/10 bg-white p-8 sm:p-10">
          <h2 className="text-center text-3xl font-black text-[#0d0c15] sm:text-4xl">
            ¿Cómo funciona?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-[#0d0c15]/70">
            Tres simples pasos para conectar tu marca con influencers
          </p>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <FeatureCard
              number="1"
              title="Busca y filtra"
              description="Encuentra influencers por país, categoría, seguidores y presupuesto. Revisa sus métricas y portfolio."
              icon="🔍"
            />
            <FeatureCard
              number="2"
              title="Conecta y negocia"
              description="Envía mensajes directos, comparte tu brief y negocia términos. Sistema de créditos simple."
              icon="💬"
            />
            <FeatureCard
              number="3"
              title="Colabora y crece"
              description="Gestiona tus campañas, da seguimiento y deja reviews. Todo en un solo dashboard."
              icon="🚀"
            />
          </div>
        </section>

        {/* For Who Section */}
        <section className="grid gap-6 lg:grid-cols-2">
          <RoleCard
            title="Para Influencers"
            description="Monetiza tu contenido y conecta con marcas que valoran tu trabajo"
            features={[
              "Perfil público optimizado",
              "Conecta tu Instagram",
              "Recibe propuestas directas",
              "Sistema de reviews",
              "Chat integrado",
            ]}
            ctaText="Crear perfil de influencer"
            ctaHref="/registro"
            accentColor="bg-[#c1b8ff]"
          />
          <RoleCard
            title="Para Empresas"
            description="Encuentra el talento perfecto para tus campañas de marketing"
            features={[
              "Búsqueda avanzada con filtros",
              "Ver métricas reales",
              "Sistema de créditos",
              "Reviews verificadas",
              "Dashboard de campañas",
            ]}
            ctaText="Registrar empresa"
            ctaHref="/registro"
            accentColor="bg-[#fed97b]"
          />
        </section>

        {/* CTA Final */}
        <section className="rounded-3xl border border-black/10 bg-gradient-to-br from-[#0d0c15] to-[#1f1c30] p-8 text-center sm:p-12">
          <h2 className="text-3xl font-black text-white sm:text-4xl">
            ¿Listo para empezar?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            Únete a nuestra plataforma y comienza a crear colaboraciones exitosas hoy mismo.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/registro"
              className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-[#0d0c15] shadow-lg transition hover:bg-gray-100 sm:text-base"
            >
              Crear cuenta gratis
            </Link>
            <Link
              href="/login"
              className="rounded-full border-2 border-white px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/10 sm:text-base"
            >
              Iniciar sesión
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6 text-center shadow-sm">
      <p className="text-3xl font-black text-[#0d0c15] sm:text-4xl">{number}</p>
      <p className="mt-2 text-sm font-medium text-[#0d0c15]/70">{label}</p>
    </div>
  );
}

function FeatureCard({
  number,
  title,
  description,
  icon,
}: {
  number: string;
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="relative rounded-2xl border border-black/10 bg-[#f4f4f4] p-6">
      <div className="absolute -left-3 -top-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#0d0c15] text-sm font-bold text-white">
        {number}
      </div>
      <div className="text-4xl">{icon}</div>
      <h3 className="mt-4 text-xl font-bold text-[#0d0c15]">{title}</h3>
      <p className="mt-2 text-sm text-[#0d0c15]/70">{description}</p>
    </div>
  );
}

function RoleCard({
  title,
  description,
  features,
  ctaText,
  ctaHref,
  accentColor,
}: {
  title: string;
  description: string;
  features: string[];
  ctaText: string;
  ctaHref: string;
  accentColor: string;
}) {
  return (
    <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm sm:p-8">
      <div className={`h-2 w-20 rounded-full ${accentColor}`} />
      <h3 className="mt-4 text-2xl font-black text-[#0d0c15]">{title}</h3>
      <p className="mt-2 text-sm text-[#0d0c15]/70">{description}</p>
      <ul className="mt-6 space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm text-[#0d0c15]/80">
            <span className="mt-1 text-green-600">✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Link
        href={ctaHref}
        className="mt-6 inline-block w-full rounded-xl bg-[#0d0c15] px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#1f1c30]"
      >
        {ctaText}
      </Link>
    </div>
  );
}
