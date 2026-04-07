import { serviceFormDefaults } from "@/shared/lib/mock-data";

export default function ServicesRegistryPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 sm:py-10">
      <section className="rounded-3xl border border-black/10 bg-white p-5 sm:p-8 lg:p-9">
        <h1 className="text-2xl font-black text-[#0d0c15] sm:text-3xl">Registrar servicio</h1>
        <p className="mt-2 text-sm text-[#0d0c15]/70">
          Guarda cada colaboracion cerrada para mantener tu historial profesional.
        </p>

        <form className="mt-6 grid gap-4">
          <Field label="Marca / Empresa" placeholder="Ej. GlowFit" defaultValue={serviceFormDefaults.brand} />
          <Field
            label="Nombre de campana"
            placeholder="Lanzamiento SmartBottle"
            defaultValue={serviceFormDefaults.campaign}
          />
          <Field
            label="Fecha de entrega"
            placeholder="2026-04-20"
            type="date"
            defaultValue={serviceFormDefaults.deliveryDate}
          />
          <Field label="Monto acordado" placeholder="$650" defaultValue={serviceFormDefaults.amount} />
          <label className="text-sm font-medium text-[#0d0c15]">
            Detalle del servicio
            <textarea
              rows={4}
              placeholder="Contenido entregado, formato, links y resultados esperados..."
              defaultValue={serviceFormDefaults.description}
              className="mt-1 w-full rounded-xl border border-black/15 px-3 py-2.5 outline-none ring-[#c1b8ff] focus:ring-2"
            />
          </label>
          <button
            type="button"
            className="mt-2 w-full rounded-xl bg-[#0d0c15] px-4 py-2.5 text-sm font-semibold text-white sm:w-auto"
          >
            Guardar registro
          </button>
        </form>
      </section>
    </main>
  );
}

type FieldProps = {
  label: string;
  placeholder: string;
  type?: "text" | "date";
  defaultValue?: string;
};

function Field({ label, placeholder, type = "text", defaultValue }: FieldProps) {
  return (
    <label className="text-sm font-medium text-[#0d0c15]">
      {label}
      <input
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="mt-1 min-h-11 w-full rounded-xl border border-black/15 px-3 py-2.5 outline-none ring-[#c1b8ff] focus:ring-2"
      />
    </label>
  );
}
