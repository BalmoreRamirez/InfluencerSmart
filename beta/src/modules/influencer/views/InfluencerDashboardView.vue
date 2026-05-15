<template>
  <InfluencerLayout>
    <div class="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-12">
      <header class="flex flex-wrap items-center justify-between gap-6">
        <div>
          <p class="text-sm font-semibold uppercase tracking-wide text-brand-primary">Panel</p>
          <h1 class="text-3xl font-semibold text-brand-ink">Dashboard influencer</h1>
          <p class="mt-2 text-sm text-slate-600">
            Gestiona tu perfil, propuestas y negociaciones activas.
          </p>
        </div>
        <div class="flex flex-wrap gap-3">
          <RouterLink
            class="rounded-full bg-brand-primary px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-brand-primary/20"
            to="/influencer/profile"
          >
            {{ profileComplete ? "Perfil completo" : "Completar perfil" }}
          </RouterLink>
          <RouterLink
            class="rounded-full border border-brand-primary px-5 py-2 text-sm font-semibold text-brand-primary"
            to="/influencer/proposals"
          >
            Ver propuestas
          </RouterLink>
          <button
            class="rounded-full border border-brand-accent px-5 py-2 text-sm font-semibold text-brand-accent"
            type="button"
            @click="logout"
          >
            Cerrar sesion
          </button>
        </div>
      </header>

      <section class="grid gap-6 lg:grid-cols-3">
        <div class="rounded-2xl border border-brand-mist bg-white p-6 shadow-sm">
          <p class="text-sm font-semibold text-slate-500">Propuestas activas</p>
          <p class="mt-4 text-3xl font-semibold text-brand-ink">4</p>
          <p class="mt-2 text-sm text-slate-500">2 nuevas esta semana</p>
        </div>
        <div class="rounded-2xl border border-brand-mist bg-white p-6 shadow-sm">
          <p class="text-sm font-semibold text-slate-500">Campanas negociadas</p>
          <p class="mt-4 text-3xl font-semibold text-brand-ink">12</p>
          <p class="mt-2 text-sm text-slate-500">Tasa de cierre 68%</p>
        </div>
        <div class="rounded-2xl border border-brand-mist bg-white p-6 shadow-sm">
          <p class="text-sm font-semibold text-slate-500">Metricas clave</p>
          <p class="mt-4 text-3xl font-semibold text-brand-ink">5.1%</p>
          <p class="mt-2 text-sm text-slate-500">Engagement promedio</p>
        </div>
      </section>

      <section class="rounded-3xl border border-brand-mist bg-white p-6 shadow-sm">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 class="text-lg font-semibold text-brand-ink">Datos del perfil</h2>
            <p class="mt-2 text-sm text-slate-600">
              Resumen de la informacion registrada en el onboarding.
            </p>
          </div>
          <span
            class="rounded-full border border-brand-mist px-3 py-1 text-xs font-semibold text-slate-500"
          >
            {{ profileComplete ? "Perfil completo" : "Perfil incompleto" }}
          </span>
        </div>

        <div v-if="profileData" class="mt-6 grid gap-4 md:grid-cols-2">
          <div class="rounded-2xl border border-brand-mist/60 bg-slate-50 p-4">
            <p class="text-xs font-semibold uppercase text-slate-500">Identidad</p>
            <p class="mt-2 text-sm text-slate-700">Nombre: {{ profileData.fullName }}</p>
            <p class="text-sm text-slate-700">Nacimiento: {{ profileData.birthDate }}</p>
            <p class="text-sm text-slate-700">DUI: {{ profileData.dui }}</p>
          </div>
          <div class="rounded-2xl border border-brand-mist/60 bg-slate-50 p-4">
            <p class="text-xs font-semibold uppercase text-slate-500">Ubicacion</p>
            <p class="mt-2 text-sm text-slate-700">Pais: {{ profileData.country }}</p>
            <p class="text-sm text-slate-700">Ciudad: {{ profileData.city }}</p>
            <p class="text-sm text-slate-700">Disponibilidad: {{ profileData.availability }}</p>
          </div>
          <div class="rounded-2xl border border-brand-mist/60 bg-slate-50 p-4">
            <p class="text-xs font-semibold uppercase text-slate-500">Perfil</p>
            <p class="mt-2 text-sm text-slate-700">Nicho: {{ profileData.niche }}</p>
            <p class="text-sm text-slate-700">Bio: {{ profileData.bio }}</p>
          </div>
          <div class="rounded-2xl border border-brand-mist/60 bg-slate-50 p-4">
            <p class="text-xs font-semibold uppercase text-slate-500">Cuentas sociales</p>
            <p class="mt-2 text-sm text-slate-700">{{ formatList(profileData.socialAccounts) }}</p>
          </div>
          <div class="rounded-2xl border border-brand-mist/60 bg-slate-50 p-4">
            <p class="text-xs font-semibold uppercase text-slate-500">Servicios</p>
            <p class="mt-2 text-sm text-slate-700">{{ formatList(profileData.servicePricing) }}</p>
          </div>
          <div class="rounded-2xl border border-brand-mist/60 bg-slate-50 p-4">
            <p class="text-xs font-semibold uppercase text-slate-500">Plataformas</p>
            <p class="mt-2 text-sm text-slate-700">{{ formatList(profileData.availablePlatforms) }}</p>
          </div>
          <div class="rounded-2xl border border-brand-mist/60 bg-slate-50 p-4">
            <p class="text-xs font-semibold uppercase text-slate-500">Foto de perfil</p>
            <div class="mt-3 flex items-center gap-4">
              <img
                v-if="profileData.profilePhoto"
                :src="profileData.profilePhoto"
                alt="Foto de perfil"
                class="h-20 w-20 rounded-full object-cover"
              />
              <span v-else class="text-sm text-slate-500">Sin foto</span>
            </div>
          </div>
        </div>

        <div v-else class="mt-6 text-sm text-slate-600">
          Aun no hay datos guardados en el perfil.
        </div>
      </section>

      <section class="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div class="rounded-3xl border border-brand-mist bg-white p-6 shadow-sm">
          <h2 class="text-lg font-semibold text-brand-ink">Checklist rapido</h2>
          <ul class="mt-4 space-y-3 text-sm text-slate-600">
            <li class="flex items-start gap-3">
              <span class="mt-1 h-2 w-2 rounded-full bg-brand-success"></span>
              Completar perfil con foto, nicho y disponibilidad.
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-1 h-2 w-2 rounded-full bg-brand-warn"></span>
              Definir tarifas base por tipo de publicacion.
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-1 h-2 w-2 rounded-full bg-brand-accent"></span>
              Revisar propuestas pendientes y responder a tiempo.
            </li>
          </ul>
        </div>
        <div class="rounded-3xl border border-brand-sky/40 bg-brand-sky/10 p-6">
          <h2 class="text-lg font-semibold text-brand-ink">Estado del perfil</h2>
          <p class="mt-3 text-sm text-slate-600">
            {{
              profileComplete
                ? "Tu perfil esta completo y listo para nuevas propuestas."
                : "Completa tu perfil para desbloquear todas las propuestas de empresas."
            }}
          </p>
          <div class="mt-6 rounded-2xl bg-white px-4 py-3 text-sm text-slate-600">
            {{ profileComplete ? "100% completado" : "65% completado" }}
          </div>
        </div>
      </section>
    </div>
  </InfluencerLayout>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useLocalStorage } from "@vueuse/core";
import { RouterLink, useRouter } from "vue-router";
import InfluencerLayout from "../../../layouts/InfluencerLayout.vue";

const router = useRouter();
const profileComplete = useLocalStorage("profile.influencer.complete", false);
const profileData = ref<null | {
  fullName: string;
  birthDate: string;
  dui: string;
  country: string;
  city: string;
  niche: string;
  bio: string;
  socialAccounts: string[];
  servicePricing: string[];
  availablePlatforms: string[];
  availability: string;
  profilePhoto: string;
}>(null);

const normalizeList = (value: unknown) => {
  if (Array.isArray(value)) return value.map((item) => String(item).trim()).filter(Boolean);
  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
};

const isProfileComplete = (data: Record<string, unknown>) => {
  return (
    String(data.fullName ?? "").trim() &&
    String(data.birthDate ?? "").trim() &&
    String(data.dui ?? "").trim() &&
    String(data.country ?? "").trim() &&
    String(data.city ?? "").trim() &&
    String(data.niche ?? "").trim() &&
    String(data.bio ?? "").trim() &&
    normalizeList(data.socialAccounts).length > 0 &&
    normalizeList(data.servicePricing).length > 0 &&
    normalizeList(data.availablePlatforms).length > 0 &&
    String(data.availability ?? "").trim() &&
    String(data.profilePhoto ?? "").trim()
  );
};

onMounted(() => {
  const stored = localStorage.getItem("profile.influencer.data");
  if (!stored) {
    profileComplete.value = false;
    return;
  }
  const data = JSON.parse(stored) as Record<string, unknown>;
  profileData.value = {
    fullName: String(data.fullName ?? ""),
    birthDate: String(data.birthDate ?? ""),
    dui: String(data.dui ?? ""),
    country: String(data.country ?? ""),
    city: String(data.city ?? ""),
    niche: String(data.niche ?? ""),
    bio: String(data.bio ?? ""),
    socialAccounts: normalizeList(data.socialAccounts),
    servicePricing: normalizeList(data.servicePricing),
    availablePlatforms: normalizeList(data.availablePlatforms),
    availability: String(data.availability ?? ""),
    profilePhoto: String(data.profilePhoto ?? "")
  };
  profileComplete.value = Boolean(isProfileComplete(data));
  localStorage.setItem("profile.influencer.complete", String(profileComplete.value));
});

const formatList = (items: string[]) => (items.length ? items.join(", ") : "-");
const logout = () => {
  localStorage.removeItem("session.role");
  router.push("/");
};
</script>
