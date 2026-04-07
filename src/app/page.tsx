import Link from "next/link";
import { companyFlow, influencerFlow, mvpCapabilities } from "@/shared/lib/mock-data";

export default function Home() {
  return (
    <div className="flex flex-1 justify-center px-5 py-10 sm:px-8 sm:py-12">
      <main className="w-full max-w-6xl space-y-8">
        <section className="relative overflow-hidden rounded-3xl border border-black/10 bg-white p-7 shadow-[0_14px_50px_rgba(13,12,21,0.12)] sm:p-10">
          <div className="pointer-events-none absolute -left-24 -top-24 h-56 w-56 rounded-full bg-[#c1b8ff]/65 blur-3xl" />
          <div className="pointer-events-none absolute -right-16 top-0 h-52 w-52 rounded-full bg-[#fed97b]/70 blur-3xl" />

          <p className="relative inline-flex rounded-full bg-[#f4f4f4] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#0d0c15]/70">
            InfluencerSmart
          </p>
          <h1 className="relative mt-4 max-w-3xl text-3xl font-black leading-tight text-[#0d0c15] sm:text-5xl">
            Conecta empresas e influencers para lanzar campanas con impacto real.
          </h1>
          <p className="relative mt-4 max-w-3xl text-base leading-7 text-[#0d0c15]/78 sm:text-lg">
            Plataforma para encontrar talento, negociar por chat y dar
            seguimiento completo a los servicios de promocion en un solo lugar.
          </p>

          <div className="relative mt-7 flex flex-wrap gap-3">
            <span className="rounded-full bg-[#0d0c15] px-5 py-2 text-sm font-semibold text-white">
              Matching inteligente
            </span>
            <span className="rounded-full bg-[#c1b8ff] px-5 py-2 text-sm font-semibold text-[#0d0c15]">
              Chat y negociacion
            </span>
            <span className="rounded-full bg-[#fed97b] px-5 py-2 text-sm font-semibold text-[#0d0c15]">
              Registro de servicios
            </span>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <FlowCard
            title="Flujo del Influencer"
            accentClassName="bg-[#c1b8ff]"
            items={influencerFlow}
          />
          <FlowCard
            title="Flujo de la Empresa"
            accentClassName="bg-[#fed97b]"
            items={companyFlow}
          />
        </section>

        <section className="rounded-3xl border border-black/10 bg-[#f4f4f4] p-7 sm:p-9">
          <h2 className="text-xl font-bold text-[#0d0c15] sm:text-2xl">
            Base funcional del MVP
          </h2>
          <div className="mt-4 grid gap-3 text-sm text-[#0d0c15]/80 sm:grid-cols-2">
            {mvpCapabilities.map((capability) => (
              <div key={capability} className="rounded-2xl bg-white p-4">
                {capability}
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/registro"
              className="rounded-full bg-[#0d0c15] px-4 py-2 text-sm font-semibold text-white"
            >
              Crear cuenta
            </Link>
            <Link
              href="/explorar"
              className="rounded-full bg-[#c1b8ff] px-4 py-2 text-sm font-semibold text-[#0d0c15]"
            >
              Explorar influencers
            </Link>
            <Link
              href="/empresa"
              className="rounded-full bg-[#fed97b] px-4 py-2 text-sm font-semibold text-[#0d0c15]"
            >
              Ver panel empresa
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

type FlowCardProps = {
  title: string;
  items: string[];
  accentClassName: string;
};

function FlowCard({ title, items, accentClassName }: FlowCardProps) {
  return (
    <article className="rounded-3xl border border-black/10 bg-white p-6 shadow-[0_8px_30px_rgba(13,12,21,0.08)] sm:p-8">
      <div className={`h-2 w-28 rounded-full ${accentClassName}`} />
      <h2 className="mt-4 text-2xl font-extrabold text-[#0d0c15]">{title}</h2>
      <ol className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm text-[#0d0c15]/80 sm:text-base">
            <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[#0d0c15]" />
            <span>{item}</span>
          </li>
        ))}
      </ol>
    </article>
  );
}
