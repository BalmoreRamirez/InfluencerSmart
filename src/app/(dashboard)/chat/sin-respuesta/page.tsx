import Link from "next/link";

const pendingMessages = [
  { by: "empresa", text: "Hola, te comparto brief y presupuesto de campana.", at: "08:20" },
  { by: "empresa", text: "Podemos cerrar hoy si confirmas disponibilidad.", at: "11:45" },
  { by: "empresa", text: "Te envio recordatorio, seguimos interesados.", at: "18:10" },
];

export default function ChatNoReplyScenarioPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-10 sm:px-6">
      <section className="rounded-3xl border border-black/10 bg-white p-7 sm:p-9">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0d0c15]/55">
          Escenario simulado
        </p>
        <h1 className="mt-2 text-3xl font-black text-[#0d0c15]">Chat sin respuesta</h1>

        <div className="mt-5 rounded-2xl border border-[#fed97b] bg-[#fed97b]/35 p-4">
          <p className="text-sm font-semibold text-[#0d0c15]">SLA superado: 24h sin respuesta</p>
          <p className="mt-1 text-sm text-[#0d0c15]/75">
            Se recomienda enviar recordatorio automatico y sugerir perfiles alternativos.
          </p>
        </div>

        <article className="mt-6 rounded-2xl border border-black/10 bg-[#f4f4f4] p-5">
          <h2 className="text-lg font-bold text-[#0d0c15]">Mensajes enviados</h2>
          <div className="mt-4 space-y-2">
            {pendingMessages.map((message, index) => (
              <div key={message.text + index} className="rounded-xl bg-white px-3 py-2.5">
                <p className="text-sm text-[#0d0c15]">{message.text}</p>
                <p className="mt-1 text-xs text-[#0d0c15]/60">{message.at}</p>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="mt-4 rounded-xl bg-[#0d0c15] px-4 py-2.5 text-sm font-semibold text-white"
          >
            Enviar recordatorio automatico
          </button>
        </article>

        <Link href="/simulaciones" className="mt-6 inline-flex text-sm font-semibold text-[#0d0c15] underline">
          Volver a simulaciones
        </Link>
      </section>
    </main>
  );
}
