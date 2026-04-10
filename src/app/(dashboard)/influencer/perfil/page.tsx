"use client";

import { FormEvent, useEffect, useState } from "react";
import { ProtectedRoute } from "@/shared/components/auth/protected-route";
import { useAuthStore } from "@/shared/stores/auth-store";
import {
  getInfluencerOnboarding,
  isAdult,
  isValidDui,
  saveInfluencerOnboarding,
  type InfluencerOnboardingInput,
} from "@/shared/services/firebase-onboarding-service";

const initialForm: InfluencerOnboardingInput = {
  fullName: "",
  birthDate: "",
  dui: "",
  location: "",
  category: "",
  instagramFollowers: "0",
  tiktokFollowers: "0",
  engagement: "0",
  igReel: "0",
  igPhoto: "0",
  tkVideo: "0",
};

function InfluencerProfileContent() {
  const session = useAuthStore((state) => state.session);
  const markOnboardingComplete = useAuthStore((state) => state.markOnboardingComplete);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState<InfluencerOnboardingInput>(initialForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    async function loadProfile() {
      if (!session?.uid) return;

      const profile = await getInfluencerOnboarding(session.uid);
      if (!profile) return;

      setForm({
        fullName: profile.full_name ?? "",
        birthDate: profile.birth_date?.toDate().toISOString().slice(0, 10) ?? "",
        dui: profile.dui ?? "",
        location: profile.location ?? "",
        category: profile.category ?? "",
        instagramFollowers: String(profile.metrics.instagram_followers ?? 0),
        tiktokFollowers: String(profile.metrics.tiktok_followers ?? 0),
        engagement: String(profile.metrics.engagement ?? 0),
        igReel: String(profile.prices.ig_reel ?? 0),
        igPhoto: String(profile.prices.ig_photo ?? 0),
        tkVideo: String(profile.prices.tk_video ?? 0),
      });
    }

    loadProfile().catch(() => {
      setError("No se pudo cargar el perfil actual.");
    });
  }, [session?.uid]);

  function validateForm() {
    const newErrors: Record<string, string> = {};

    if (!form.fullName.trim()) {
      newErrors.fullName = "El nombre completo es requerido";
    }
    if (!form.birthDate || !isAdult(form.birthDate)) {
      newErrors.birthDate = "Debes ser mayor de edad";
    }
    if (!isValidDui(form.dui)) {
      newErrors.dui = "El DUI debe tener formato 12345678-9";
    }
    if (!form.location.trim()) {
      newErrors.location = "La ubicacion es requerida";
    }
    if (!form.category.trim()) {
      newErrors.category = "La categoria es requerida";
    }
    if (Number(form.instagramFollowers) < 0) {
      newErrors.instagramFollowers = "No puede ser negativo";
    }
    if (Number(form.tiktokFollowers) < 0) {
      newErrors.tiktokFollowers = "No puede ser negativo";
    }
    if (Number(form.engagement) < 0) {
      newErrors.engagement = "No puede ser negativo";
    }
    if (Number(form.igReel) < 0) {
      newErrors.igReel = "No puede ser negativo";
    }
    if (Number(form.igPhoto) < 0) {
      newErrors.igPhoto = "No puede ser negativo";
    }
    if (Number(form.tkVideo) < 0) {
      newErrors.tkVideo = "No puede ser negativo";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaved(false);
    setError("");

    if (!validateForm()) {
      return;
    }

    try {
      if (!session?.uid) throw new Error("No hay sesion activa");

      setLoading(true);
      await saveInfluencerOnboarding(session.uid, form);
      markOnboardingComplete();
      setSaved(true);
      setLoading(false);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError("No se pudo guardar el onboarding. Reintenta.");
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-[#5d7932]/18 bg-white p-5 sm:p-8 lg:p-9"
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0c1117]/55">
              Onboarding Influencer
            </p>
            <h1 className="mt-2 text-2xl font-black text-[#0c1117] sm:text-3xl">
              {form.fullName || "Completa tu perfil"}
            </h1>
            <p className="mt-1 text-sm text-[#0c1117]/70">{form.location || "Agrega tu ubicacion"}</p>
          </div>
          <span className="rounded-full bg-[#c0e2ff] px-3 py-1 text-xs font-semibold text-[#0c1117]">
            Paso 2: Completar perfil
          </span>
        </div>

        {saved ? (
          <p className="mt-4 rounded-xl border border-[#c0e2ff] bg-[#c0e2ff]/30 px-3 py-2 text-sm font-medium text-[#0c1117]">
            Perfil actualizado. Ya puedes usar la plataforma.
          </p>
        ) : null}

        {error ? (
          <p className="mt-4 rounded-xl border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        ) : null}

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <Field
            label="Nombre completo"
            value={form.fullName}
            onChange={(value) => setForm((prev) => ({ ...prev, fullName: value }))}
            error={errors.fullName}
          />
          <Field
            label="Fecha de nacimiento"
            value={form.birthDate}
            onChange={(value) => setForm((prev) => ({ ...prev, birthDate: value }))}
            type="date"
            error={errors.birthDate}
          />
          <Field
            label="DUI"
            value={form.dui}
            onChange={(value) => setForm((prev) => ({ ...prev, dui: value }))}
            error={errors.dui}
            placeholder="12345678-9"
          />
          <Field
            label="Ubicacion"
            value={form.location}
            onChange={(value) => setForm((prev) => ({ ...prev, location: value }))}
            error={errors.location}
          />
          <Field
            label="Categoria"
            value={form.category}
            onChange={(value) => setForm((prev) => ({ ...prev, category: value }))}
            error={errors.category}
          />
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Field
            label="Seguidores Instagram"
            value={form.instagramFollowers}
            onChange={(value) => setForm((prev) => ({ ...prev, instagramFollowers: value }))}
            type="number"
            error={errors.instagramFollowers}
          />
          <Field
            label="Seguidores TikTok"
            value={form.tiktokFollowers}
            onChange={(value) => setForm((prev) => ({ ...prev, tiktokFollowers: value }))}
            type="number"
            error={errors.tiktokFollowers}
          />
          <Field
            label="Engagement (%)"
            value={form.engagement}
            onChange={(value) => setForm((prev) => ({ ...prev, engagement: value }))}
            type="number"
            error={errors.engagement}
          />
          <Field
            label="Precio IG Reel (USD)"
            value={form.igReel}
            onChange={(value) => setForm((prev) => ({ ...prev, igReel: value }))}
            type="number"
            error={errors.igReel}
          />
          <Field
            label="Precio IG Foto (USD)"
            value={form.igPhoto}
            onChange={(value) => setForm((prev) => ({ ...prev, igPhoto: value }))}
            type="number"
            error={errors.igPhoto}
          />
          <Field
            label="Precio TikTok Video (USD)"
            value={form.tkVideo}
            onChange={(value) => setForm((prev) => ({ ...prev, tkVideo: value }))}
            type="number"
            error={errors.tkVideo}
          />
        </div>

        <div className="mt-6">
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#0c1117] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#244124] disabled:opacity-50 sm:w-auto"
          >
            {loading ? "Guardando..." : "Completar onboarding"}
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
  error?: string;
  type?: string;
  placeholder?: string;
};

function Field({ label, value, onChange, error, type = "text", placeholder }: FieldProps) {
  return (
    <label className="text-sm font-semibold text-[#0c1117]">
      {label}
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={`mt-1 w-full rounded-xl border px-3 py-2.5 text-sm outline-none focus:ring-2 ${
          error ? "border-red-400 ring-red-200" : "border-[#5d7932]/24 ring-[#c0e2ff]"
        }`}
      />
      {error ? <span className="mt-1 text-xs text-red-600">{error}</span> : null}
    </label>
  );
}

export default function InfluencerProfilePage() {
  return (
    <ProtectedRoute allowedRole="influencer">
      <InfluencerProfileContent />
    </ProtectedRoute>
  );
}
