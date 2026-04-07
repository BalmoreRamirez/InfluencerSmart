"use client";

import Link from "next/link";
import { ProtectedRoute } from "@/shared/components/auth/protected-route";
import { MetricCard } from "@/shared/components/ui/metric-card";
import { campaignDraft, companyMetrics, suggestedInfluencers } from "@/shared/lib/mock-data";

function CompanyDashboardContent() {
  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-6">
      <section className="rounded-3xl border border-black/10 bg-white p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0d0c15]/55">
              Panel Empresa
            </p>
            <h1 className="mt-2 text-3xl font-black text-[#0d0c15] sm:text-4xl">
              Busca talento y activa campanas
            </h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/empresa/perfil"
              className="rounded-full border border-black/15 px-4 py-2 text-sm font-semibold text-[#0d0c15]"
            >
              Ver perfil
            </Link>
            <Link
              href="/explorar"
              className="rounded-full bg-[#0d0c15] px-4 py-2 text-sm font-semibold text-white"
            >
              Buscar influencers
            </Link>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {companyMetrics.map((metric) => (
            <MetricCard
              key={metric.label}
              label={metric.label}
              value={metric.value}
              hint={metric.hint}
            />
          ))}
        </div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        <article className="rounded-3xl border border-black/10 bg-white p-6">
          <h2 className="text-xl font-bold text-[#0d0c15]">Top sugeridos</h2>
          <ul className="mt-4 space-y-3">
            {suggestedInfluencers.map((item) => (
              <li
                key={item.name}
                className="flex items-center justify-between rounded-2xl bg-[#f4f4f4] px-3 py-2.5"
              >
                <div>
                  <p className="text-sm font-semibold text-[#0d0c15]">{item.name}</p>
                  <p className="text-xs text-[#0d0c15]/70">
                    Score de afinidad: {item.score}% | Nicho: {item.niche}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-[#0d0c15]">{item.price}</p>
                  <Link href="/chat" className="text-xs font-semibold text-[#0d0c15] underline">
                    Contactar
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-3xl border border-black/10 bg-white p-6">
          <h2 className="text-xl font-bold text-[#0d0c15]">Nuevo brief de campana</h2>
          <form className="mt-4 space-y-3">
            <input
              defaultValue={campaignDraft.objective}
              className="w-full rounded-xl border border-black/15 px-3 py-2.5 text-sm outline-none ring-[#c1b8ff] focus:ring-2"
            />
            <textarea
              rows={4}
              defaultValue={campaignDraft.details}
              className="w-full rounded-xl border border-black/15 px-3 py-2.5 text-sm outline-none ring-[#c1b8ff] focus:ring-2"
            />
            <button
              type="button"
              className="rounded-xl bg-[#0d0c15] px-4 py-2.5 text-sm font-semibold text-white"
            >
              Guardar y enviar por chat
            </button>
          </form>
        </article>
      </section>
    </main>
  );
}


export default function CompanyDashboardPage() {
  return (
    <ProtectedRoute allowedRole="empresa">
      <CompanyDashboardContent />
    </ProtectedRoute>
  );
}
