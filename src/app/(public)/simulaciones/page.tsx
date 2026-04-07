import Link from "next/link";
import { businessScenarios } from "@/shared/lib/mock-scenarios";

export default function SimulationsPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-6">
      <section className="rounded-3xl border border-black/10 bg-white p-7 sm:p-9">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0d0c15]/60">
          Simulador de negocio
        </p>
        <h1 className="mt-3 text-3xl font-black text-[#0d0c15] sm:text-4xl">
          Escenarios visuales del MVP
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-[#0d0c15]/72 sm:text-base">
          Prueba estados criticos del flujo real sin backend: creditos, negociacion, cierre y
          cumplimiento de servicio.
        </p>

        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          {businessScenarios.map((scenario) => (
            <article key={scenario.slug} className="rounded-2xl border border-black/10 bg-[#f4f4f4] p-5">
              <h2 className="text-xl font-bold text-[#0d0c15]">{scenario.title}</h2>
              <p className="mt-2 text-sm text-[#0d0c15]/75">{scenario.description}</p>
              <p className="mt-2 text-xs font-medium text-[#0d0c15]/70">Impacto: {scenario.impact}</p>
              <Link
                href={scenario.route}
                className="mt-4 inline-flex rounded-full bg-[#0d0c15] px-4 py-2 text-sm font-semibold text-white"
              >
                Ver simulacion
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
