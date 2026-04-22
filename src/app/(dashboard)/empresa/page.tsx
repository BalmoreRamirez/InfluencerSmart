"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ProtectedRoute } from "@/shared/components/auth/protected-route";
import { MetricCard } from "@/shared/components/ui/metric-card";
import { listPublicInfluencers, type PublicInfluencerCard } from "@/features/influencer/services/firebase-influencers-service";
import { getCompanyOnboarding } from "@/features/onboarding/services/firebase-onboarding-service";
import { useAuthStore } from "@/features/auth/stores/auth-store";

function CompanyDashboardContent() {
  const session = useAuthStore((state) => state.session);
  const [influencers, setInfluencers] = useState<PublicInfluencerCard[]>([]);
  const [credits, setCredits] = useState(0);
  const [campaignText, setCampaignText] = useState("");

  useEffect(() => {
    listPublicInfluencers()
      .then((rows) => setInfluencers(rows.slice(0, 4)))
      .catch(() => setInfluencers([]));
  }, []);

  useEffect(() => {
    async function loadCompany() {
      if (!session?.uid) return;
      const company = await getCompanyOnboarding(session.uid);
      if (!company) return;

      setCredits(company.credits || 0);
      setCampaignText(company.description || "");
    }

    loadCompany().catch(() => undefined);
  }, [session?.uid]);

  const companyMetrics = useMemo(
    () => [
      { label: "Créditos disponibles", value: String(credits), hint: "1 crédito por nuevo chat" },
      { label: "Influencers sugeridos", value: String(influencers.length), hint: "Desde base de datos" },
      { label: "Respuestas 24h", value: "En progreso", hint: "Métricas en tiempo real" },
      { label: "Perfil empresa", value: campaignText ? "Completo" : "Pendiente", hint: "Onboarding" },
    ],
    [campaignText, credits, influencers.length]
  );

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-6">
      <section className="rounded-3xl border border-[#5d7932]/18 bg-white p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0c1117]/55">
              Panel Empresa
            </p>
            <h1 className="mt-2 text-3xl font-black text-[#0c1117] sm:text-4xl">
              Busca talento y activa campanas
            </h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/empresa/perfil"
              className="rounded-full btn-secondary px-4 py-2 text-sm font-semibold text-[#0c1117]"
            >
              Ver perfil
            </Link>
            <Link
              href="/explorar"
              className="rounded-full btn-primary px-4 py-2 text-sm font-semibold text-white"
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
        <article className="rounded-3xl border border-[#5d7932]/18 bg-white p-6">
          <h2 className="text-xl font-bold text-[#0c1117]">Top sugeridos</h2>
          <ul className="mt-4 space-y-3">
            {influencers.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between rounded-2xl bg-[#edf4ea] px-3 py-2.5"
              >
                <div>
                  <p className="text-sm font-semibold text-[#0c1117]">{item.name}</p>
                  <p className="text-xs text-[#0c1117]/70">
                    Engagement: {item.engagement} | Nicho: {item.category}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-[#0c1117]">{item.price}</p>
                  <Link
                    href={`/chat?contactId=${encodeURIComponent(item.id)}&contactName=${encodeURIComponent(item.name)}`}
                    className="text-xs font-semibold text-[#0c1117] underline"
                  >
                    Contactar
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-3xl border border-[#5d7932]/18 bg-white p-6">
          <h2 className="text-xl font-bold text-[#0c1117]">Nuevo brief de campana</h2>
          <form className="mt-4 space-y-3">
            <input
              defaultValue="Objetivo de campaña"
              className="w-full rounded-xl border border-[#5d7932]/24 px-3 py-2.5 text-sm outline-none ring-[#c0e2ff] focus:ring-2"
            />
            <textarea
              rows={4}
              defaultValue={campaignText}
              className="w-full rounded-xl border border-[#5d7932]/24 px-3 py-2.5 text-sm outline-none ring-[#c0e2ff] focus:ring-2"
            />
            <button
              type="button"
              className="rounded-xl btn-primary px-4 py-2.5 text-sm font-semibold text-white"
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
