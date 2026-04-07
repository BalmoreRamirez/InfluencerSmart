import Link from "next/link";

export default function CompanyCampaignClosedScenarioPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-10 sm:px-6">
      <section className="rounded-3xl border border-black/10 bg-white p-7 sm:p-9">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0d0c15]/55">
          Escenario simulado
        </p>
        <h1 className="mt-2 text-3xl font-black text-[#0d0c15]">Campana cerrada con exito</h1>

        <div className="mt-5 rounded-2xl border border-[#c1b8ff] bg-[#c1b8ff]/35 p-4">
          <p className="text-sm font-semibold text-[#0d0c15]">Estado: Acuerdo confirmado</p>
          <p className="mt-1 text-sm text-[#0d0c15]/75">
            Influencer y empresa aceptaron terminos, monto y entregables.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <InfoCard label="Influencer" value="Valeria Tech" />
          <InfoCard label="Monto" value="$650 USD" />
          <InfoCard label="Entrega" value="20 Abr 2026" />
        </div>

        <article className="mt-5 rounded-2xl border border-black/10 bg-[#f4f4f4] p-5">
          <h2 className="text-lg font-bold text-[#0d0c15]">Siguiente paso</h2>
          <p className="mt-2 text-sm text-[#0d0c15]/75">
            Se habilita seguimiento de entregables y evidencias del servicio en el dashboard.
          </p>
        </article>

        <Link href="/simulaciones" className="mt-6 inline-flex text-sm font-semibold text-[#0d0c15] underline">
          Volver a simulaciones
        </Link>
      </section>
    </main>
  );
}

type InfoCardProps = {
  label: string;
  value: string;
};

function InfoCard({ label, value }: InfoCardProps) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-[#0d0c15]/60">{label}</p>
      <p className="mt-1 text-lg font-bold text-[#0d0c15]">{value}</p>
    </div>
  );
}
