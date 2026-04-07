import Link from "next/link";

export default function InfluencerOverdueServiceScenarioPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-10 sm:px-6">
      <section className="rounded-3xl border border-black/10 bg-white p-7 sm:p-9">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0d0c15]/55">
          Escenario simulado
        </p>
        <h1 className="mt-2 text-3xl font-black text-[#0d0c15]">Servicio vencido</h1>

        <div className="mt-5 rounded-2xl border border-[#fed97b] bg-[#fed97b]/35 p-4">
          <p className="text-sm font-semibold text-[#0d0c15]">Entrega vencida hace 3 dias</p>
          <p className="mt-1 text-sm text-[#0d0c15]/75">
            La colaboracion &quot;Review del modelo X&quot; no fue marcada como completada.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <InfoCard label="Marca" value="BytePhones" />
          <InfoCard label="Monto" value="$420 USD" />
          <InfoCard label="Estado" value="Vencido" />
        </div>

        <article className="mt-5 rounded-2xl border border-black/10 bg-[#f4f4f4] p-5">
          <h2 className="text-lg font-bold text-[#0d0c15]">Acciones sugeridas</h2>
          <ul className="mt-2 space-y-1.5 text-sm text-[#0d0c15]/75">
            <li>- Notificar a la empresa con nueva fecha estimada.</li>
            <li>- Adjuntar avance parcial de contenido.</li>
            <li>- Marcar servicio como en revision para evitar impacto reputacional.</li>
          </ul>
          <button
            type="button"
            className="mt-4 rounded-xl bg-[#0d0c15] px-4 py-2.5 text-sm font-semibold text-white"
          >
            Actualizar estado del servicio
          </button>
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
