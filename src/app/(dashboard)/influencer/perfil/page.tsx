"use client";

import { FormEvent, useState } from "react";
import { influencerProfile } from "@/shared/lib/mock-data";

const influencerProfileStorageKey = "influencer-smart:influencer-profile";

const initialForm = {
  fullName: influencerProfile.fullName,
  handle: influencerProfile.handle,
  location: influencerProfile.location,
  estimatedPrice: influencerProfile.estimatedPrice,
  bio: influencerProfile.bio,
  followers: influencerProfile.followers,
  avgReach: influencerProfile.avgReach,
  engagementRate: influencerProfile.engagementRate,
  completedServices: String(influencerProfile.completedServices),
  categories: influencerProfile.categories.join(", "),
  languages: influencerProfile.languages.join(", "),
  portfolio: influencerProfile.portfolio.join("\n"),
};

function getInitialForm() {
  if (typeof window === "undefined") {
    return initialForm;
  }

  try {
    const raw = window.localStorage.getItem(influencerProfileStorageKey);
    if (!raw) {
      return initialForm;
    }
    const parsed = JSON.parse(raw) as typeof initialForm;
    return { ...initialForm, ...parsed };
  } catch {
    return initialForm;
  }
}

export default function InfluencerProfilePage() {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState(getInitialForm);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    localStorage.setItem(influencerProfileStorageKey, JSON.stringify(form));
    setSaved(true);
  }

  function categoriesList() {
    return form.categories
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  function languagesList() {
    return form.languages
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  function portfolioList() {
    return form.portfolio
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-black/10 bg-white p-5 sm:p-8 lg:p-9"
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0d0c15]/55">
              Perfil Influencer
            </p>
            <h1 className="mt-2 text-2xl font-black text-[#0d0c15] sm:text-3xl">{form.fullName}</h1>
            <p className="mt-1 text-sm font-medium text-[#0d0c15]/75">{form.handle}</p>
            <p className="text-sm text-[#0d0c15]/70">{form.location}</p>
          </div>
          <span className="rounded-full bg-[#c1b8ff] px-3 py-1 text-xs font-semibold text-[#0d0c15] sm:self-auto">
            {form.estimatedPrice} por colaboracion
          </span>
        </div>

        {saved ? (
          <p className="mt-4 rounded-xl border border-[#c1b8ff] bg-[#c1b8ff]/30 px-3 py-2 text-sm font-medium text-[#0d0c15]">
            Cambios guardados en modo simulacion.
          </p>
        ) : null}

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <Field
            label="Nombre completo"
            value={form.fullName}
            onChange={(value) => setForm((prev) => ({ ...prev, fullName: value }))}
          />
          <Field
            label="Handle"
            value={form.handle}
            onChange={(value) => setForm((prev) => ({ ...prev, handle: value }))}
          />
          <Field
            label="Ubicacion"
            value={form.location}
            onChange={(value) => setForm((prev) => ({ ...prev, location: value }))}
          />
          <Field
            label="Precio estimado"
            value={form.estimatedPrice}
            onChange={(value) => setForm((prev) => ({ ...prev, estimatedPrice: value }))}
          />
        </div>

        <label className="mt-4 block text-sm font-semibold text-[#0d0c15]">
          Bio
          <textarea
            rows={3}
            value={form.bio}
            onChange={(event) => setForm((prev) => ({ ...prev, bio: event.target.value }))}
            className="mt-1 w-full rounded-xl border border-black/15 px-3 py-2.5 text-sm outline-none ring-[#c1b8ff] focus:ring-2"
          />
        </label>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <InfoCard label="Seguidores" value={form.followers} />
          <InfoCard label="Alcance promedio" value={form.avgReach} />
          <InfoCard label="Engagement" value={form.engagementRate} />
          <InfoCard label="Servicios" value={form.completedServices} />
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Field
            label="Seguidores"
            value={form.followers}
            onChange={(value) => setForm((prev) => ({ ...prev, followers: value }))}
          />
          <Field
            label="Alcance promedio"
            value={form.avgReach}
            onChange={(value) => setForm((prev) => ({ ...prev, avgReach: value }))}
          />
          <Field
            label="Engagement"
            value={form.engagementRate}
            onChange={(value) => setForm((prev) => ({ ...prev, engagementRate: value }))}
          />
          <Field
            label="Servicios completados"
            value={form.completedServices}
            onChange={(value) => setForm((prev) => ({ ...prev, completedServices: value }))}
          />
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <article className="rounded-2xl border border-black/10 bg-[#f4f4f4] p-5">
            <h2 className="text-lg font-bold text-[#0d0c15]">Categorias</h2>
            <label className="mt-3 block text-xs font-semibold uppercase tracking-wide text-[#0d0c15]/60">
              Separadas por coma
              <input
                value={form.categories}
                onChange={(event) => setForm((prev) => ({ ...prev, categories: event.target.value }))}
                className="mt-1 w-full rounded-xl border border-black/15 bg-white px-3 py-2 text-sm outline-none ring-[#c1b8ff] focus:ring-2"
              />
            </label>
            <div className="mt-3 flex flex-wrap gap-2">
              {categoriesList().map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#0d0c15] break-words"
                >
                  {item}
                </span>
              ))}
            </div>
            <h3 className="mt-5 text-sm font-bold text-[#0d0c15]">Idiomas</h3>
            <input
              value={form.languages}
              onChange={(event) => setForm((prev) => ({ ...prev, languages: event.target.value }))}
              className="mt-1 w-full rounded-xl border border-black/15 bg-white px-3 py-2 text-sm outline-none ring-[#c1b8ff] focus:ring-2"
            />
            <p className="mt-2 text-sm text-[#0d0c15]/75">{languagesList().join(" | ")}</p>
          </article>

          <article className="rounded-2xl border border-black/10 bg-[#f4f4f4] p-5">
            <h2 className="text-lg font-bold text-[#0d0c15]">Portafolio destacado</h2>
            <textarea
              rows={4}
              value={form.portfolio}
              onChange={(event) => setForm((prev) => ({ ...prev, portfolio: event.target.value }))}
              className="mt-3 w-full rounded-xl border border-black/15 bg-white px-3 py-2 text-sm outline-none ring-[#c1b8ff] focus:ring-2"
            />
            <ul className="mt-3 space-y-2 text-sm text-[#0d0c15]/78">
              {portfolioList().map((project) => (
                <li key={project} className="break-words">
                  - {project}
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full rounded-xl bg-[#0d0c15] px-5 py-2.5 text-sm font-semibold text-white sm:w-auto"
          >
            Guardar cambios
          </button>
        </div>
      </form>
    </main>
  );
}

type FieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

function Field({ label, value, onChange }: FieldProps) {
  return (
    <label className="text-sm font-semibold text-[#0d0c15]">
      {label}
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1 w-full rounded-xl border border-black/15 px-3 py-2.5 text-sm outline-none ring-[#c1b8ff] focus:ring-2"
      />
    </label>
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
      <p className="mt-1 text-xl font-black text-[#0d0c15]">{value}</p>
    </div>
  );
}
