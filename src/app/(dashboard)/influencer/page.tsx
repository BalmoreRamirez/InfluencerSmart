import Link from "next/link";
import { MetricCard } from "@/shared/components/ui/metric-card";
import { influencerMetrics, influencerServiceHistory } from "@/shared/lib/mock-data";

function getStatusBadgeClass(status: string) {
  switch (status.toLowerCase()) {
    case "completado":
      return "bg-emerald-100 text-emerald-800";
    case "en revision":
      return "bg-amber-100 text-amber-800";
    case "pagado":
      return "bg-sky-100 text-sky-800";
    case "programado":
      return "bg-violet-100 text-violet-800";
    default:
      return "bg-[#f4f4f4] text-[#0d0c15]";
  }
}

export default function InfluencerDashboardPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-6">
      <section className="rounded-3xl border border-black/10 bg-white p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0d0c15]/55">
              Panel Influencer
            </p>
            <h1 className="mt-2 text-3xl font-black text-[#0d0c15] sm:text-4xl">
              Gestiona tu perfil y tus servicios
            </h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/influencer/perfil"
              className="rounded-full border border-black/15 px-4 py-2 text-sm font-semibold text-[#0d0c15]"
            >
              Ver perfil
            </Link>
            <Link
              href="/servicios"
              className="rounded-full bg-[#0d0c15] px-4 py-2 text-sm font-semibold text-white"
            >
              Registrar servicio
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
        <h2 className="text-2xl font-bold text-[#0d0c15]">Historial de servicios</h2>

        <div className="mt-4 space-y-3 md:hidden">
          {influencerServiceHistory.map((row) => (
            <article key={row.brand + row.campaign} className="rounded-2xl border border-black/10 p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-bold text-[#0d0c15]">{row.brand}</p>
                  <p className="text-sm text-[#0d0c15]/75">{row.campaign}</p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusBadgeClass(row.status)}`}
                >
                  {row.status}
                </span>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-[#0d0c15]/75">
                <p>
                  <span className="font-semibold text-[#0d0c15]">Monto:</span> {row.amount}
                </p>
                <p>
                  <span className="font-semibold text-[#0d0c15]">Entrega:</span> {row.deliveryDate}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-4 hidden overflow-x-auto md:block">
          <table className="min-w-[760px] text-left text-sm">
            <thead>
              <tr className="border-b border-black/10 text-[#0d0c15]/65">
                <th className="px-2 py-2">Marca</th>
                <th className="px-2 py-2">Campana</th>
                <th className="px-2 py-2">Monto</th>
                <th className="px-2 py-2">Entrega</th>
                <th className="px-2 py-2">Estado</th>
              </tr>
            </thead>
            <tbody>
              {influencerServiceHistory.map((row) => (
                <tr key={row.brand + row.campaign} className="border-b border-black/6">
                  <td className="px-2 py-3 text-[#0d0c15]">{row.brand}</td>
                  <td className="px-2 py-3 text-[#0d0c15]/75">{row.campaign}</td>
                  <td className="px-2 py-3 font-semibold text-[#0d0c15]">{row.amount}</td>
                  <td className="px-2 py-3 text-[#0d0c15]/75">{row.deliveryDate}</td>
                  <td className="px-2 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusBadgeClass(row.status)}`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
