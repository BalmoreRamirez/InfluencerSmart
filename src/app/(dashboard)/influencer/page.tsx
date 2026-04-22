"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { MetricCard } from "@/shared/components/ui/metric-card";
import { ProtectedRoute } from "@/shared/components/auth/protected-route";
import { getInfluencerOnboarding } from "@/features/onboarding/services/firebase-onboarding-service";
import { useAuthStore } from "@/features/auth/stores/auth-store";
import { useChatStore } from "@/features/chat/stores/chat-store";

function formatCompactNumber(value: number) {
  return new Intl.NumberFormat("es", {
    notation: "compact",
    maximumFractionDigits: 1,
  })
    .format(value)
    .toLowerCase();
}

function InfluencerDashboardContent() {
  const session = useAuthStore((state) => state.session);
  const liveConversations = useChatStore((state) => state.conversations);
  const totalUnread = liveConversations.reduce((total, item) => total + item.unread, 0);
  const [followers, setFollowers] = useState("0");
  const [engagement, setEngagement] = useState("0%");
  const [price, setPrice] = useState("$0 USD");

  useEffect(() => {
    async function loadProfile() {
      if (!session?.uid) return;
      const profile = await getInfluencerOnboarding(session.uid);
      if (!profile) return;

      setFollowers(formatCompactNumber(profile.metrics.instagram_followers || 0));
      setEngagement(`${profile.metrics.engagement || 0}%`);
      setPrice(`$${profile.prices.ig_reel || 0} USD`);
    }

    loadProfile().catch(() => undefined);
  }, [session?.uid]);

  const metrics = useMemo(
    () => [
      { label: "Seguidores IG", value: followers, hint: "Desde base de datos" },
      { label: "Tasa de respuesta", value: liveConversations.length > 0 ? "Activa" : "Sin chats", hint: "Estado en tiempo real" },
      { label: "Engagement", value: engagement, hint: "Métricas de onboarding" },
      { label: "Precio reel", value: price, hint: "Tarifa configurada" },
    ],
    [engagement, followers, liveConversations.length, price]
  );

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-6">
      <section className="rounded-3xl border border-[#5d7932]/18 bg-white p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0c1117]/55">
              Panel Influencer
            </p>
            <h1 className="mt-2 text-3xl font-black text-[#0c1117] sm:text-4xl">
              Gestiona tu perfil y colaboraciones
            </h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/influencer/perfil"
              className="rounded-full btn-secondary px-4 py-2 text-sm font-semibold text-[#0c1117]"
            >
              Editar perfil
            </Link>
            <Link
              href="/chat"
              className="rounded-full btn-primary px-4 py-2 text-sm font-semibold text-white"
            >
              Ver mensajes {totalUnread > 0 ? `(${totalUnread})` : ""}
            </Link>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <MetricCard
              key={metric.label}
              label={metric.label}
              value={metric.value}
              hint={metric.hint}
            />
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-3xl border border-[#5d7932]/18 bg-white p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-[#0c1117]">Colaboraciones activas</h2>
        <p className="mt-1 text-sm text-[#0c1117]/70">
          Mantén el contacto con las empresas interesadas
        </p>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {liveConversations.length === 0 ? (
            <article className="rounded-2xl border border-dashed border-[#5d7932]/24 p-4 text-sm text-[#0c1117]/70">
              Aún no tienes conversaciones registradas en tu base de datos.
            </article>
          ) : (
            liveConversations.map((conv) => (
              <article
                key={conv.id}
                className="rounded-2xl border border-[#5d7932]/18 p-4 transition"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-bold text-[#0c1117]">{conv.name}</p>
                    <p className="mt-1 text-sm text-[#0c1117]/75">{conv.last}</p>
                  </div>
                  {conv.unread > 0 ? (
                    <span className="rounded-full bg-[#d8ff85] px-2.5 py-1 text-xs font-bold text-[#0c1117]">
                      {conv.unread}
                    </span>
                  ) : null}
                </div>
                <Link
                  href="/chat"
                  className="mt-3 inline-block text-xs font-semibold text-[#0c1117] underline"
                >
                  Abrir conversación →
                </Link>
              </article>
            ))
          )}
        </div>
      </section>

      <section className="mt-6 rounded-3xl border border-[#5d7932]/18 bg-[#edf4ea] p-6 sm:p-8">
        <h2 className="text-xl font-bold text-[#0c1117]">Consejos para destacar</h2>
        <ul className="mt-4 space-y-2 text-sm text-[#0c1117]/80">
          <li>✓ Mantén tu perfil actualizado con contenido reciente</li>
          <li>✓ Responde mensajes de empresas en menos de 24 horas</li>
          <li>✓ Conecta tu Instagram para mostrar métricas reales</li>
          <li>✓ Completa servicios a tiempo para mejorar tu rating</li>
        </ul>
      </section>
    </main>
  );
}

export default function InfluencerDashboardPage() {
  return (
    <ProtectedRoute allowedRole="influencer">
      <InfluencerDashboardContent />
    </ProtectedRoute>
  );
}
