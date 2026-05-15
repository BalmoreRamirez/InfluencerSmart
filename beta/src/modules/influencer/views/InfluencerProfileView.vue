<template>
  <InfluencerLayout>
    <Toast position="top-right" />
    <div class="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-12">
      <nav class="flex flex-wrap gap-3 text-sm font-semibold text-slate-500">
        <RouterLink class="rounded-full border border-brand-mist px-4 py-2" to="/influencer">
          Dashboard
        </RouterLink>
        <RouterLink
          class="rounded-full border border-brand-primary px-4 py-2 text-brand-primary"
          to="/influencer/profile"
        >
          Completar perfil
        </RouterLink>
        <RouterLink class="rounded-full border border-brand-mist px-4 py-2" to="/influencer/proposals">
          Ver propuestas
        </RouterLink>
      </nav>

      <header class="space-y-3">
        <p class="text-sm font-semibold uppercase tracking-wide text-brand-primary">Perfil</p>
        <h1 class="text-3xl font-semibold text-brand-ink">Completar perfil</h1>
        <p class="text-sm text-slate-600">
          Actualiza tu informacion profesional y tarifas base.
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
          <div class="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-brand-mist p-4">
            <img
              v-if="form.photoDataUrl"
              :src="form.photoDataUrl"
              alt="Foto de perfil"
              class="h-24 w-24 rounded-full object-cover"
            />
            <span v-else class="text-xs text-slate-500">Vista previa</span>
            <button
              v-if="form.photoDataUrl"
              class="rounded-full border border-brand-accent px-3 py-1 text-xs font-semibold text-brand-accent"
              type="button"
              @click="removePhoto"
            >
              Eliminar foto
            </button>
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
            @click="saveProfile"
          >
            Guardar cambios
          </button>
          <span class="text-sm text-slate-500">
            {{ profileComplete ? "Perfil completo" : "Se guarda en localStorage." }}
          </span>
        </div>
      </form>
    </div>
  </InfluencerLayout>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useLocalStorage } from "@vueuse/core";
import { RouterLink } from "vue-router";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import InputMask from "primevue/inputmask";
import FileUpload from "primevue/fileupload";
import InfluencerLayout from "../../../layouts/InfluencerLayout.vue";

const toast = useToast();
const defaultForm = {
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
};

const form = useLocalStorage("profile.influencer.form", { ...defaultForm });
const profileComplete = useLocalStorage("profile.influencer.complete", false);

onMounted(() => {
  const stored = localStorage.getItem("profile.influencer.data");
  if (!stored) return;
  const data = JSON.parse(stored) as Partial<typeof defaultForm>;
  form.value = { ...defaultForm, ...data };
});

const saveProfile = () => {
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
  profileComplete.value = Boolean(isProfileComplete());
  localStorage.setItem("profile.influencer.complete", String(profileComplete.value));

  toast.add({
    severity: profileComplete.value ? "success" : "warn",
    summary: profileComplete.value ? "Perfil completo" : "Perfil guardado",
    detail: profileComplete.value
      ? "Tu perfil cumple con todos los requisitos."
      : "Aun faltan campos para completar el perfil.",
    life: 2500
  });
};

const onPhotoSelected = (event: { files?: File[] }) => {
  const file = event.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    form.value.photoDataUrl = String(reader.result ?? "");
    toast.add({
      severity: "info",
      summary: "Foto actualizada",
      detail: "La foto se actualizo correctamente.",
      life: 2000
    });
  };
  reader.readAsDataURL(file);
};

const removePhoto = () => {
  form.value.photoDataUrl = "";
  toast.add({
    severity: "warn",
    summary: "Foto eliminada",
    detail: "Se elimino la foto del perfil.",
    life: 2000
  });
};

const normalizeList = (value: unknown) => {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }
  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
};

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
</script>
