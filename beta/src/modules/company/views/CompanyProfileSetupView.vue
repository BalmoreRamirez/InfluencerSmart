<template>
  <DefaultLayout>
    <div class="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-12">
      <header class="space-y-3">
        <p class="text-sm font-semibold uppercase tracking-wide text-brand-primary">
          Onboarding empresa
        </p>
        <h1 class="text-3xl font-semibold text-brand-ink">Completa tu perfil</h1>
        <p class="text-sm text-slate-600">
          Esta informacion nos ayuda a recomendar influencers y campañas relevantes.
        </p>
      </header>

      <form class="grid gap-6 rounded-3xl border border-brand-mist bg-white p-8 shadow-sm">
        <div class="grid gap-4 md:grid-cols-2">
          <label class="grid gap-2 text-sm text-slate-600">
            Nombre de la empresa
            <input
              v-model="form.companyName"
              class="rounded-xl border border-brand-mist px-4 py-3 text-sm focus:border-brand-primary focus:outline-none"
              placeholder="Empresa SA"
              type="text"
            />
          </label>
          <label class="grid gap-2 text-sm text-slate-600">
            Industria
            <input
              v-model="form.industry"
              class="rounded-xl border border-brand-mist px-4 py-3 text-sm focus:border-brand-primary focus:outline-none"
              placeholder="Retail, fintech, salud"
              type="text"
            />
          </label>
        </div>

        <label class="grid gap-2 text-sm text-slate-600">
          Descripcion de la marca
          <textarea
            v-model="form.description"
            class="min-h-[120px] rounded-xl border border-brand-mist px-4 py-3 text-sm focus:border-brand-primary focus:outline-none"
            placeholder="Que hace tu marca y que tipo de campañas buscas"
          ></textarea>
        </label>

        <div class="grid gap-4 md:grid-cols-3">
          <label class="grid gap-2 text-sm text-slate-600">
            Ubicacion
            <input
              v-model="form.location"
              class="rounded-xl border border-brand-mist px-4 py-3 text-sm focus:border-brand-primary focus:outline-none"
              placeholder="Ciudad, pais"
              type="text"
            />
          </label>
          <label class="grid gap-2 text-sm text-slate-600">
            Sitio web
            <input
              v-model="form.website"
              class="rounded-xl border border-brand-mist px-4 py-3 text-sm focus:border-brand-primary focus:outline-none"
              placeholder="https://"
              type="url"
            />
          </label>
          <label class="grid gap-2 text-sm text-slate-600">
            Tamano del equipo
            <input
              v-model="form.teamSize"
              class="rounded-xl border border-brand-mist px-4 py-3 text-sm focus:border-brand-primary focus:outline-none"
              placeholder="11-50"
              type="text"
            />
          </label>
        </div>

        <label class="grid gap-2 text-sm text-slate-600">
          Contacto principal
          <input
            v-model="form.contactEmail"
            class="rounded-xl border border-brand-mist px-4 py-3 text-sm focus:border-brand-primary focus:outline-none"
            placeholder="marketing@empresa.com"
            type="email"
          />
        </label>

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

const router = useRouter();
const form = useLocalStorage("profile.company.form", {
  companyName: "",
  industry: "",
  description: "",
  location: "",
  website: "",
  teamSize: "",
  contactEmail: ""
});

const completeProfile = () => {
  localStorage.setItem("profile.company.complete", "true");
  localStorage.setItem("profile.company.data", JSON.stringify(form.value));
  router.push("/company");
};

const skipForNow = () => {
  router.push("/company");
};
</script>
