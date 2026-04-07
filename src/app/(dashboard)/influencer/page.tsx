"use client";

import Link from "next/link";
import { MetricCard } from "@/shared/components/ui/metric-card";
import { influencerMetrics, conversations } from "@/shared/lib/mock-data";
import { ProtectedRoute } from "@/shared/components/auth/protected-route";

function InfluencerDashboardContent() {
  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-6">
      <section className="rounded-3xl border border-black/10 bg-white p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0d0c15]/55">
              Panel Influencer
            </p>
            <h1 className="mt-2 text-3xl font-black text-[#0d0c15] sm:text-4xl">
              Gestiona tu perfil y colaboraciones
            </h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/influencer/perfil"
              className="rounded-full border border-black/15 px-4 py-2 text-sm font-semibold text-[#0d0c15] hover:bg-[#f4f4f4]"
            >
              Editar perfil
            </Link>
            <Link
              href="/chat"
              className="rounded-full bg-[#0d0c15] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1f1c30]"
            >
              Ver mensajes
            </Link>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {influencerMetrics.map((metric) => (
            <MetricCard
              key={metric.label}
              label={metric.label}
              value={metric.value}
              hint={metric.hint}
            />
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-3xl border border-black/10 bg-white p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-[#0d0c15]">Colaboraciones activas</h2>
        <p className="mt-1 text-sm text-[#0d0c15]/70">
          Mantén el contacto con las empresas interesadas
        </p>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {conversations.map((conv) => (
            <article
              key={conv.name}
              className="rounded-2xl border border-black/10 p-4 hover:bg-[#f4f4f4] transition"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-bold text-[#0d0c15]">{conv.name}</p>
                  <p className="mt-1 text-sm text-[#0d0c15]/75">{conv.last}</p>
                </div>
                {conv.unread > 0 ? (
                  <span className="rounded-full bg-[#fed97b] px-2.5 py-1 text-xs font-bold text-[#0d0c15]">
                    {conv.unread}
                  </span>
                ) : null}
              </div>
              <Link
                href="/chat"
                className="mt-3 inline-block text-xs font-semibold text-[#0d0c15] underline"
              >
                Abrir conversación →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-3xl border border-black/10 bg-[#f4f4f4] p-6 sm:p-8">
        <h2 className="text-xl font-bold text-[#0d0c15]">Consejos para destacar</h2>
        <ul className="mt-4 space-y-2 text-sm text-[#0d0c15]/80">
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
