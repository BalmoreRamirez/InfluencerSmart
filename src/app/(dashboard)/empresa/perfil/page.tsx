"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { ProtectedRoute } from "@/shared/components/auth/protected-route";
import { useAuthStore } from "@/features/auth/stores/auth-store";
import {
  getCompanyOnboarding,
  saveCompanyOnboarding,
  type CompanyOnboardingInput,
} from "@/features/onboarding/services/firebase-onboarding-service";

const initialForm: CompanyOnboardingInput = {
  companyName: "",
  category: "",
  description: "",
  products: "",
  address: "",
  companyCode: "",
  country: "",
};

function CompanyProfileContent() {
  const session = useAuthStore((state) => state.session);
  const markOnboardingComplete = useAuthStore((state) => state.markOnboardingComplete);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState<CompanyOnboardingInput>(initialForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      if (!session?.uid) return;

      const profile = await getCompanyOnboarding(session.uid);
      if (!profile) return;

      setForm({
        companyName: profile.company_name,
        category: profile.category,
        description: profile.description,
        products: profile.products.join(", "),
        address: profile.address,
        companyCode: profile.company_code,
        country: profile.country,
      });
    }

    loadProfile();
  }, [session?.uid]);

  function validateForm() {
    if (!form.companyName.trim()) return "El nombre de empresa es requerido";
    if (!form.category.trim()) return "El rubro de la empresa es requerido";
    if (!form.description.trim()) return "La descripcion de productos/servicios es requerida";
    if (!form.address.trim()) return "El domicilio fisico es requerido";
    if (!form.companyCode.trim()) return "El codigo de empresa es requerido";
    if (!form.country.trim()) return "El pais es requerido";
    return null;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaved(false);
    setError("");

    const formError = validateForm();
    if (formError) {
      setError(formError);
      return;
    }

    try {
      if (!session?.uid) throw new Error("No hay sesion activa");

      setLoading(true);
      await saveCompanyOnboarding(session.uid, form);
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
          <div className="flex items-center gap-4">
            <Image
              src={session?.profileImage ?? "https://picsum.photos/seed/company-default/320/320"}
              alt={`Logo o foto de perfil de ${form.companyName}`}
              width={80}
              height={80}
              className="h-16 w-16 rounded-full border border-[#5d7932]/18 object-cover sm:h-20 sm:w-20"
            />
            <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0c1117]/55">
              Onboarding Empresa
            </p>
            <h1 className="mt-2 text-2xl font-black text-[#0c1117] sm:text-3xl">{form.companyName}</h1>
            <p className="mt-1 text-sm text-[#0c1117]/75">{form.category}</p>
            <p className="text-sm text-[#0c1117]/70">
              {form.country || "Completa tu pais"}
            </p>
            </div>
          </div>
          <span className="rounded-full bg-[#d8ff85] px-3 py-1 text-xs font-semibold text-[#0c1117]">
            Paso 2: Completar perfil
          </span>
        </div>

        {saved ? (
          <p className="mt-4 rounded-xl border border-[#d8ff85] bg-[#d8ff85]/35 px-3 py-2 text-sm font-medium text-[#0c1117]">
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
            label="Nombre de empresa"
            value={form.companyName}
            onChange={(value) => setForm((prev) => ({ ...prev, companyName: value }))}
          />
          <Field
            label="Rubro"
            value={form.category}
            onChange={(value) => setForm((prev) => ({ ...prev, category: value }))}
          />
          <Field
            label="Codigo empresa (NIT o NRC)"
            value={form.companyCode}
            onChange={(value) => setForm((prev) => ({ ...prev, companyCode: value }))}
          />
          <Field
            label="Pais"
            value={form.country}
            onChange={(value) => setForm((prev) => ({ ...prev, country: value }))}
          />
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Field
            label="Productos/servicios (separados por coma)"
            value={form.products}
            onChange={(value) => setForm((prev) => ({ ...prev, products: value }))}
          />
          <Field
            label="Domicilio fisico"
            value={form.address}
            onChange={(value) => setForm((prev) => ({ ...prev, address: value }))}
          />
        </div>

        <label className="mt-4 block text-sm font-semibold text-[#0c1117]">
          Descripcion de productos/servicios
          <textarea
            rows={3}
            value={form.description}
            onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
            className="mt-1 w-full rounded-xl border border-[#5d7932]/24 px-3 py-2.5 text-sm outline-none ring-[#c0e2ff] focus:ring-2"
          />
        </label>

        <div className="mt-6">
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl btn-primary px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50 sm:w-auto"
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
};

function Field({ label, value, onChange }: FieldProps) {
  return (
    <label className="text-sm font-semibold text-[#0c1117]">
      {label}
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1 w-full rounded-xl border border-[#5d7932]/24 px-3 py-2.5 text-sm outline-none ring-[#c0e2ff] focus:ring-2"
      />
    </label>
  );
}


export default function CompanyProfilePage() {
  return (
    <ProtectedRoute allowedRole="empresa">
      <CompanyProfileContent />
    </ProtectedRoute>
  );
}
