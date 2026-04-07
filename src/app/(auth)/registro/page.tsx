import Link from "next/link";

const roles = [
  {
    title: "Soy Influencer",
    description:
      "Crea tu perfil, conecta Instagram, sube tu portafolio y registra servicios cerrados.",
    href: "/influencer",
    color: "bg-[#c1b8ff]",
  },
  {
    title: "Soy Empresa",
    description:
      "Busca influencers por filtros, envia brief por chat y gestiona creditos para contactar.",
    href: "/empresa",
    color: "bg-[#fed97b]",
  },
];

export default function RegisterPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-5 py-10 sm:px-6">
      <section className="rounded-3xl border border-black/10 bg-white p-7 sm:p-9">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0d0c15]/55">
          Registro
        </p>
        <h1 className="mt-3 text-3xl font-black text-[#0d0c15] sm:text-4xl">
          Crea tu cuenta en minutos
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-[#0d0c15]/72 sm:text-base">
          Elige el tipo de cuenta y continua con onboarding orientado a tu flujo.
        </p>

        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          {roles.map((role) => (
            <article key={role.title} className="rounded-2xl border border-black/10 p-5">
              <div className={`h-2 w-20 rounded-full ${role.color}`} />
              <h2 className="mt-3 text-xl font-bold text-[#0d0c15]">{role.title}</h2>
              <p className="mt-2 text-sm text-[#0d0c15]/70">{role.description}</p>
              <Link
                href={role.href}
                className="mt-4 inline-flex rounded-full bg-[#0d0c15] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1f1c30]"
              >
                Continuar
              </Link>
            </article>
          ))}
        </div>

        <p className="mt-6 text-sm text-[#0d0c15]/70">
          Ya tienes cuenta?{" "}
          <Link href="/login" className="font-semibold text-[#0d0c15] underline">
            Inicia sesion
          </Link>
        </p>
      </section>
    </main>
  );
}
