import Link from "next/link";
import { influencers, searchFilters } from "@/shared/lib/mock-data";

export default function ExplorePage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-6">
      <section className="rounded-3xl border border-black/10 bg-white p-6 sm:p-8">
        <h1 className="text-3xl font-black text-[#0d0c15] sm:text-4xl">
          Buscar influencers
        </h1>
        <p className="mt-2 text-sm text-[#0d0c15]/72 sm:text-base">
          Filtra por pais, categoria, seguidores y precio estimado.
        </p>

        <div className="mt-6 grid gap-3 rounded-2xl bg-[#f4f4f4] p-4 sm:grid-cols-4">
          <FilterInput label="Pais" value={searchFilters.country} />
          <FilterInput label="Categoria" value={searchFilters.category} />
          <FilterInput label="Seguidores" value={searchFilters.followers} />
          <FilterInput label="Precio" value={searchFilters.priceRange} />
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {influencers.map((profile) => (
          <article
            key={profile.name}
            className="rounded-2xl border border-black/10 bg-white p-5 shadow-[0_8px_24px_rgba(13,12,21,0.08)]"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#0d0c15]">{profile.name}</h2>
              <span className="rounded-full bg-[#c1b8ff] px-2.5 py-1 text-xs font-semibold text-[#0d0c15]">
                {profile.country}
              </span>
            </div>
            <p className="mt-2 text-sm text-[#0d0c15]/70">Categoria: {profile.category}</p>
            <p className="text-sm text-[#0d0c15]/70">Seguidores: {profile.followers}</p>
            <p className="text-sm text-[#0d0c15]/70">Precio estimado: {profile.price}</p>
            <p className="text-sm text-[#0d0c15]/70">Engagement: {profile.engagement}</p>
            <p className="text-sm text-[#0d0c15]/70">Rating: {profile.rating}/5</p>
            <Link
              href="/chat"
              className="mt-4 inline-flex rounded-full bg-[#0d0c15] px-4 py-2 text-sm font-semibold text-white"
            >
              Enviar mensaje
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}

type FilterInputProps = {
  label: string;
  value: string;
};

function FilterInput({ label, value }: FilterInputProps) {
  return (
    <label className="text-sm font-medium text-[#0d0c15]">
      {label}
      <input
        value={value}
        readOnly
        className="mt-1 w-full rounded-xl border border-black/12 bg-white px-3 py-2.5 text-sm text-[#0d0c15]/70"
      />
    </label>
  );
}
