import Link from "next/link";

export default function CompanyNoCreditsScenarioPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-10 sm:px-6">
      <section className="rounded-3xl border border-black/10 bg-white p-7 sm:p-9">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0d0c15]/55">
          Escenario simulado
        </p>
        <h1 className="mt-2 text-3xl font-black text-[#0d0c15]">Empresa sin creditos</h1>

        <div className="mt-5 rounded-2xl border border-[#fed97b] bg-[#fed97b]/35 p-4">
          <p className="text-sm font-semibold text-[#0d0c15]">Creditos disponibles: 0</p>
          <p className="mt-1 text-sm text-[#0d0c15]/75">
            Para abrir un nuevo chat se requiere comprar un paquete de creditos.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <article className="rounded-2xl border border-black/10 bg-[#f4f4f4] p-5">
            <h2 className="text-lg font-bold text-[#0d0c15]">Intento de contacto</h2>
            <p className="mt-2 text-sm text-[#0d0c15]/75">
              El boton &quot;Enviar mensaje&quot; queda bloqueado y muestra CTA de compra.
            </p>
            <button
              type="button"
              className="mt-4 w-full rounded-xl bg-[#0d0c15]/45 px-4 py-2.5 text-sm font-semibold text-white"
            >
              Sin creditos disponibles
            </button>
          </article>

          <article className="rounded-2xl border border-black/10 bg-[#f4f4f4] p-5">
            <h2 className="text-lg font-bold text-[#0d0c15]">Accion recomendada</h2>
            <p className="mt-2 text-sm text-[#0d0c15]/75">
              Comprar paquete para continuar negociacion con influencers.
            </p>
            <button
              type="button"
              className="mt-4 w-full rounded-xl bg-[#0d0c15] px-4 py-2.5 text-sm font-semibold text-white"
            >
              Comprar 20 creditos - $49
            </button>
          </article>
        </div>

        <Link href="/simulaciones" className="mt-6 inline-flex text-sm font-semibold text-[#0d0c15] underline">
          Volver a simulaciones
        </Link>
      </section>
    </main>
  );
}
