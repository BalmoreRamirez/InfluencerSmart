"use client";

import { FormEvent, useState } from "react";
import { companyProfile } from "@/shared/lib/mock-data";

const companyProfileStorageKey = "influencer-smart:company-profile";

const initialForm = {
  name: companyProfile.name,
  industry: companyProfile.industry,
  country: companyProfile.country,
  city: companyProfile.city,
  contactName: companyProfile.contactName,
  monthlyBudget: companyProfile.monthlyBudget,
  availableCredits: String(companyProfile.availableCredits),
  activeCampaigns: String(companyProfile.activeCampaigns),
  about: companyProfile.about,
  goals: companyProfile.goals.join("\n"),
  preferredCategories: companyProfile.preferredCategories.join(", "),
};

function getInitialForm() {
  if (typeof window === "undefined") {
    return initialForm;
  }

  try {
    const raw = window.localStorage.getItem(companyProfileStorageKey);
    if (!raw) {
      return initialForm;
    }
    const parsed = JSON.parse(raw) as typeof initialForm;
    return { ...initialForm, ...parsed };
  } catch {
    return initialForm;
  }
}

export default function CompanyProfilePage() {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState(getInitialForm);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    localStorage.setItem(companyProfileStorageKey, JSON.stringify(form));
    setSaved(true);
  }

  function goalsList() {
    return form.goals
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  function categoriesList() {
    return form.preferredCategories
      .split(",")
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
              Perfil Empresa
            </p>
            <h1 className="mt-2 text-2xl font-black text-[#0d0c15] sm:text-3xl">{form.name}</h1>
            <p className="mt-1 text-sm text-[#0d0c15]/75">{form.industry}</p>
            <p className="text-sm text-[#0d0c15]/70">
              {form.city}, {form.country}
            </p>
          </div>
          <span className="rounded-full bg-[#fed97b] px-3 py-1 text-xs font-semibold text-[#0d0c15]">
            Contacto: {form.contactName}
          </span>
        </div>

        {saved ? (
          <p className="mt-4 rounded-xl border border-[#fed97b] bg-[#fed97b]/35 px-3 py-2 text-sm font-medium text-[#0d0c15]">
            Cambios guardados en modo simulacion.
          </p>
        ) : null}

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <Field
            label="Nombre de empresa"
            value={form.name}
            onChange={(value) => setForm((prev) => ({ ...prev, name: value }))}
          />
          <Field
            label="Industria"
            value={form.industry}
            onChange={(value) => setForm((prev) => ({ ...prev, industry: value }))}
          />
          <Field
            label="Ciudad"
            value={form.city}
            onChange={(value) => setForm((prev) => ({ ...prev, city: value }))}
          />
          <Field
            label="Pais"
            value={form.country}
            onChange={(value) => setForm((prev) => ({ ...prev, country: value }))}
          />
          <Field
            label="Persona de contacto"
            value={form.contactName}
            onChange={(value) => setForm((prev) => ({ ...prev, contactName: value }))}
          />
          <Field
            label="Presupuesto mensual"
            value={form.monthlyBudget}
            onChange={(value) => setForm((prev) => ({ ...prev, monthlyBudget: value }))}
          />
        </div>

        <label className="mt-4 block text-sm font-semibold text-[#0d0c15]">
          Descripcion
          <textarea
            rows={3}
            value={form.about}
            onChange={(event) => setForm((prev) => ({ ...prev, about: event.target.value }))}
            className="mt-1 w-full rounded-xl border border-black/15 px-3 py-2.5 text-sm outline-none ring-[#c1b8ff] focus:ring-2"
          />
        </label>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <InfoCard label="Presupuesto mensual" value={form.monthlyBudget} />
          <InfoCard label="Creditos" value={form.availableCredits} />
          <InfoCard label="Campanas activas" value={form.activeCampaigns} />
          <InfoCard label="Industria" value={form.industry} />
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Field
            label="Creditos"
            value={form.availableCredits}
            onChange={(value) => setForm((prev) => ({ ...prev, availableCredits: value }))}
          />
          <Field
            label="Campanas activas"
            value={form.activeCampaigns}
            onChange={(value) => setForm((prev) => ({ ...prev, activeCampaigns: value }))}
          />
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <article className="rounded-2xl border border-black/10 bg-[#f4f4f4] p-5">
            <h2 className="text-lg font-bold text-[#0d0c15]">Objetivos de marketing</h2>
            <textarea
              rows={4}
              value={form.goals}
              onChange={(event) => setForm((prev) => ({ ...prev, goals: event.target.value }))}
              className="mt-3 w-full rounded-xl border border-black/15 bg-white px-3 py-2 text-sm outline-none ring-[#c1b8ff] focus:ring-2"
            />
            <ul className="mt-3 space-y-2 text-sm text-[#0d0c15]/78">
              {goalsList().map((goal) => (
                <li key={goal} className="break-words">
                  - {goal}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-black/10 bg-[#f4f4f4] p-5">
            <h2 className="text-lg font-bold text-[#0d0c15]">Categorias preferidas</h2>
            <input
              value={form.preferredCategories}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, preferredCategories: event.target.value }))
              }
              className="mt-3 w-full rounded-xl border border-black/15 bg-white px-3 py-2 text-sm outline-none ring-[#c1b8ff] focus:ring-2"
            />
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
