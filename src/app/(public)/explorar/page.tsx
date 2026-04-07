"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { influencers } from "@/shared/lib/mock-data";

export default function ExplorePage() {
  const [filters, setFilters] = useState({
    country: "Todos",
    category: "Todas",
    minFollowers: "0",
    maxPrice: "10000",
  });

  const countries = ["Todos", ...Array.from(new Set(influencers.map((i) => i.country)))];
  const categories = ["Todas", ...Array.from(new Set(influencers.map((i) => i.category)))];

  const filteredInfluencers = useMemo(() => {
    return influencers.filter((profile) => {
      const matchesCountry =
        filters.country === "Todos" || profile.country === filters.country;
      const matchesCategory =
        filters.category === "Todas" || profile.category === filters.category;

      const followersNum = parseFloat(profile.followers.replace("k", "")) * 1000;
      const matchesFollowers = followersNum >= parseFloat(filters.minFollowers);

      const priceNum = parseFloat(profile.price.replace("$", "").replace(" USD", ""));
      const matchesPrice = priceNum <= parseFloat(filters.maxPrice);

      return matchesCountry && matchesCategory && matchesFollowers && matchesPrice;
    });
  }, [filters]);

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
          <FilterSelect
            label="Pais"
            value={filters.country}
            options={countries}
            onChange={(value) => setFilters({ ...filters, country: value })}
          />
          <FilterSelect
            label="Categoria"
            value={filters.category}
            options={categories}
            onChange={(value) => setFilters({ ...filters, category: value })}
          />
          <FilterInput
            label="Seguidores min"
            type="number"
            value={filters.minFollowers}
            onChange={(value) => setFilters({ ...filters, minFollowers: value })}
            placeholder="0"
          />
          <FilterInput
            label="Precio max (USD)"
            type="number"
            value={filters.maxPrice}
            onChange={(value) => setFilters({ ...filters, maxPrice: value })}
            placeholder="10000"
          />
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-[#0d0c15]/60">
            {filteredInfluencers.length} influencer{filteredInfluencers.length !== 1 ? "s" : ""}{" "}
            encontrado{filteredInfluencers.length !== 1 ? "s" : ""}
          </p>
          <button
            onClick={() =>
              setFilters({
                country: "Todos",
                category: "Todas",
                minFollowers: "0",
                maxPrice: "10000",
              })
            }
            className="rounded-full px-3 py-1.5 text-xs font-semibold text-[#0d0c15]/70 hover:bg-white"
          >
            Limpiar filtros
          </button>
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredInfluencers.map((profile) => (
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
            <div className="flex items-center gap-1 text-sm text-[#0d0c15]/70">
              <span>Rating:</span>
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={`${
                    i < Math.floor(parseFloat(profile.rating))
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
              <span className="ml-1">({profile.rating})</span>
            </div>
            <div className="mt-4 flex gap-2">
              <Link
                href="/influencer/valeria"
                className="flex-1 rounded-full border border-black/15 px-4 py-2 text-center text-sm font-semibold text-[#0d0c15] hover:bg-[#f4f4f4]"
              >
                Ver perfil
              </Link>
              <Link
                href="/chat"
                className="flex-1 rounded-full bg-[#0d0c15] px-4 py-2 text-center text-sm font-semibold text-white hover:bg-[#1f1c30]"
              >
                Contactar
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

type FilterSelectProps = {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
};

function FilterSelect({ label, value, options, onChange }: FilterSelectProps) {
  return (
    <label className="text-sm font-medium text-[#0d0c15]">
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-xl border border-black/12 bg-white px-3 py-2.5 text-sm text-[#0d0c15]"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

type FilterInputProps = {
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
};

function FilterInput({ label, type, value, onChange, placeholder }: FilterInputProps) {
  return (
    <label className="text-sm font-medium text-[#0d0c15]">
      {label}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full rounded-xl border border-black/12 bg-white px-3 py-2.5 text-sm text-[#0d0c15]"
      />
    </label>
  );
}
