<template>
  <DefaultLayout>
    <div class="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-12">
      <header class="space-y-3">
        <p class="text-sm font-semibold uppercase tracking-wide text-brand-primary">
          Onboarding influencer
        </p>
        <h1 class="text-3xl font-semibold text-brand-ink">Completa tu perfil</h1>
        <p class="text-sm text-slate-600">
          Necesitamos esta informacion para habilitar propuestas y negociaciones.
        </p>
      </header>

      <form class="grid gap-6 rounded-3xl border border-brand-mist bg-white p-8 shadow-sm">
        <div class="grid gap-4 md:grid-cols-2">
          <label class="grid gap-2 text-sm text-slate-600">
            Nombre completo
            <input
              v-model="form.fullName"
              class="rounded-xl border border-brand-mist px-4 py-3 text-sm focus:border-brand-primary focus:outline-none"
              placeholder="Tu nombre"
              type="text"
            />
          </label>
          <label class="grid gap-2 text-sm text-slate-600">
            Fecha de nacimiento
            <input
              v-model="form.birthDate"
              class="rounded-xl border border-brand-mist px-4 py-3 text-sm focus:border-brand-primary focus:outline-none"
              type="date"
            />
          </label>
        </div>

        <div class="grid gap-4 md:grid-cols-2">
          <label class="grid gap-2 text-sm text-slate-600">
            DUI
            <InputMask
              v-model="form.dui"
              class="rounded-xl border border-brand-mist px-4 py-3 text-sm focus:border-brand-primary focus:outline-none"
              mask="99999999-9"
              placeholder="00000000-0"
            />
          </label>
          <label class="grid gap-2 text-sm text-slate-600">
            Pais
            <select
              v-model="form.country"
              class="rounded-xl border border-brand-mist bg-white px-4 py-3 text-sm focus:border-brand-primary focus:outline-none"
            >
              <option value="">Selecciona un pais</option>
              <option value="Belice">Belice</option>
              <option value="Guatemala">Guatemala</option>
              <option value="El Salvador">El Salvador</option>
              <option value="Honduras">Honduras</option>
              <option value="Nicaragua">Nicaragua</option>
              <option value="Costa Rica">Costa Rica</option>
              <option value="Panama">Panama</option>
            </select>
          </label>
        </div>

        <label class="grid gap-2 text-sm text-slate-600">
          Ciudad
          <input
            v-model="form.city"
            class="rounded-xl border border-brand-mist px-4 py-3 text-sm focus:border-brand-primary focus:outline-none"
            placeholder="Ciudad"
            type="text"
          />
        </label>

        <div class="grid gap-4 md:grid-cols-2">
          <label class="grid gap-2 text-sm text-slate-600">
            Foto (archivo)
            <FileUpload
              mode="basic"
              name="profilePhoto"
              accept="image/*"
              :auto="true"
              :customUpload="true"
              chooseLabel="Subir foto"
              chooseIcon="pi pi-upload"
              @uploader="onPhotoSelected"
              class="p-button-outlined w-full"
            />
          </label>
          <div class="flex items-center justify-center rounded-2xl border border-dashed border-brand-mist p-4">
            <img
              v-if="form.photoDataUrl"
              :src="form.photoDataUrl"
              alt="Foto de perfil"
              class="h-24 w-24 rounded-full object-cover"
            />
            <span v-else class="text-xs text-slate-500">Vista previa</span>
          </div>
          <label class="grid gap-2 text-sm text-slate-600">
            Nicho
            <input
              v-model="form.niche"
              class="rounded-xl border border-brand-mist px-4 py-3 text-sm focus:border-brand-primary focus:outline-none"
              placeholder="Moda, fitness, tech"
              type="text"
            />
          </label>
        </div>

        <label class="grid gap-2 text-sm text-slate-600">
          Bio
          <textarea
            v-model="form.bio"
            class="min-h-[120px] rounded-xl border border-brand-mist px-4 py-3 text-sm focus:border-brand-primary focus:outline-none"
            placeholder="Cuenta quien eres y que tipo de contenido produces"
          ></textarea>
        </label>

        <div class="grid gap-4">
          <label class="grid gap-2 text-sm text-slate-600">
            Disponibilidad
            <input
              v-model="form.availability"
              class="rounded-xl border border-brand-mist px-4 py-3 text-sm focus:border-brand-primary focus:outline-none"
              placeholder="Tiempo completo, fines de semana"
              type="text"
            />
          </label>
        </div>

        <div class="grid gap-4 md:grid-cols-2">
          <label class="grid gap-2 text-sm text-slate-600">
            Instagram seguidores
            <input
              v-model="form.instagramFollowers"
              class="rounded-xl border border-brand-mist px-4 py-3 text-sm focus:border-brand-primary focus:outline-none"
              placeholder="25000"
              type="number"
            />
          </label>
          <label class="grid gap-2 text-sm text-slate-600">
            Instagram engagement
            <input
              v-model="form.instagramEngagement"
              class="rounded-xl border border-brand-mist px-4 py-3 text-sm focus:border-brand-primary focus:outline-none"
              placeholder="4.8%"
              type="text"
            />
          </label>
        </div>

        <div class="grid gap-4 md:grid-cols-2">
          <label class="grid gap-2 text-sm text-slate-600">
            TikTok seguidores
            <input
              v-model="form.tiktokFollowers"
              class="rounded-xl border border-brand-mist px-4 py-3 text-sm focus:border-brand-primary focus:outline-none"
              placeholder="14000"
              type="number"
            />
          </label>
          <label class="grid gap-2 text-sm text-slate-600">
            YouTube seguidores
            <input
              v-model="form.youtubeFollowers"
              class="rounded-xl border border-brand-mist px-4 py-3 text-sm focus:border-brand-primary focus:outline-none"
              placeholder="5400"
              type="number"
            />
          </label>
        </div>

        <div class="grid gap-4 md:grid-cols-3">
          <label class="grid gap-2 text-sm text-slate-600">
            Tarifa post
            <input
              v-model="form.ratePost"
              class="rounded-xl border border-brand-mist px-4 py-3 text-sm focus:border-brand-primary focus:outline-none"
              placeholder="$"
              type="text"
            />
          </label>
          <label class="grid gap-2 text-sm text-slate-600">
            Tarifa story
            <input
              v-model="form.rateStory"
              class="rounded-xl border border-brand-mist px-4 py-3 text-sm focus:border-brand-primary focus:outline-none"
              placeholder="$"
              type="text"
            />
          </label>
          <label class="grid gap-2 text-sm text-slate-600">
            Tarifa video
            <input
              v-model="form.rateVideo"
              class="rounded-xl border border-brand-mist px-4 py-3 text-sm focus:border-brand-primary focus:outline-none"
              placeholder="$"
              type="text"
            />
          </label>
        </div>

        <div class="grid gap-4">
          <label class="grid gap-2 text-sm text-slate-600">
            Cuentas sociales (separadas por coma)
            <input
              v-model="form.socialAccounts"
              class="rounded-xl border border-brand-mist px-4 py-3 text-sm focus:border-brand-primary focus:outline-none"
              placeholder="instagram.com/tuusuario, tiktok.com/@tuusuario"
              type="text"
            />
          </label>
          <label class="grid gap-2 text-sm text-slate-600">
            Servicios y precios (separados por coma)
            <input
              v-model="form.servicePricing"
              class="rounded-xl border border-brand-mist px-4 py-3 text-sm focus:border-brand-primary focus:outline-none"
              placeholder="Post:$100, Story:$50, Video:$200"
              type="text"
            />
          </label>
          <label class="grid gap-2 text-sm text-slate-600">
            Plataformas disponibles (separadas por coma)
            <input
              v-model="form.availablePlatforms"
              class="rounded-xl border border-brand-mist px-4 py-3 text-sm focus:border-brand-primary focus:outline-none"
              placeholder="Instagram, TikTok, YouTube"
              type="text"
            />
          </label>
        </div>

        <div class="flex flex-wrap gap-4">
          <button
            class="rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-primary/20"
            type="button"
            @click="completeProfile"
          >
            Guardar y continuar
          </button>
          <button
            class="rounded-full border border-brand-primary px-6 py-3 text-sm font-semibold text-brand-primary"
            type="button"
            @click="skipForNow"
          >
            Hacerlo despues
          </button>
        </div>
      </form>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { useLocalStorage } from "@vueuse/core";
import { useRouter } from "vue-router";
import DefaultLayout from "../../../layouts/DefaultLayout.vue";
import InputMask from "primevue/inputmask";
import FileUpload from "primevue/fileupload";

const router = useRouter();
const form = useLocalStorage("profile.influencer.form", {
  fullName: "",
  birthDate: "",
  dui: "",
  country: "",
  city: "",
  niche: "",
  bio: "",
  socialAccounts: "",
  servicePricing: "",
  availablePlatforms: "",
  availability: "",
  photoDataUrl: "",
  instagramFollowers: "",
  instagramEngagement: "",
  tiktokFollowers: "",
  youtubeFollowers: "",
  ratePost: "",
  rateStory: "",
  rateVideo: ""
});

const normalizeList = (value: string) =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const isProfileComplete = () => {
  return (
    form.value.fullName.trim() &&
    form.value.birthDate &&
    form.value.dui.trim() &&
    form.value.country.trim() &&
    form.value.city.trim() &&
    form.value.niche.trim() &&
    form.value.bio.trim() &&
    normalizeList(form.value.socialAccounts).length > 0 &&
    normalizeList(form.value.servicePricing).length > 0 &&
    normalizeList(form.value.availablePlatforms).length > 0 &&
    form.value.availability.trim() &&
    form.value.photoDataUrl
  );
};

const completeProfile = () => {
  const payload = {
    fullName: form.value.fullName,
    birthDate: form.value.birthDate,
    dui: form.value.dui,
    country: form.value.country,
    city: form.value.city,
    niche: form.value.niche,
    bio: form.value.bio,
    socialAccounts: normalizeList(form.value.socialAccounts),
    servicePricing: normalizeList(form.value.servicePricing),
    availablePlatforms: normalizeList(form.value.availablePlatforms),
    availability: form.value.availability,
    profilePhoto: form.value.photoDataUrl
  };

  localStorage.setItem("profile.influencer.data", JSON.stringify(payload));
  localStorage.setItem("profile.influencer.complete", String(Boolean(isProfileComplete())));
  router.push("/influencer");
};

const skipForNow = () => {
  router.push("/influencer");
};

const onPhotoSelected = (event: { files?: File[] }) => {
  const file = event.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    form.value.photoDataUrl = String(reader.result ?? "");
  };
  reader.readAsDataURL(file);
};
</script>
