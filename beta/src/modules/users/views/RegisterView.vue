<template>
  <DefaultLayout>
    <div class="mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 py-14">
      <div class="rounded-3xl border border-brand-mist bg-white p-10 shadow-lg">
        <div class="space-y-3">
          <p class="text-sm font-semibold uppercase tracking-wide text-brand-primary">Registro</p>
          <h1 class="text-3xl font-semibold text-brand-ink">Crear cuenta</h1>
          <p class="text-sm text-slate-600">
            Empieza como {{ roleLabel }} y completa tu perfil para activar las propuestas.
          </p>
        </div>

        <form class="mt-8 grid gap-4 space-y-6" @submit.prevent="handleCreate">
          <FloatLabel>
            <Dropdown
              v-model="role"
              :options="roleOptions"
              optionLabel="label"
              optionValue="value"
              placeholder=" "
              class="w-full"
            />
            <label>Rol</label>
          </FloatLabel>

          <FloatLabel>
            <InputText id="register-fullname" v-model="fullName" placeholder=" " class="w-full" />
            <label for="register-fullname">Nombre completo</label>
          </FloatLabel>

          <FloatLabel>
            <InputText id="register-email" v-model="email" placeholder=" " type="email" class="w-full" />
            <label for="register-email">Correo</label>
          </FloatLabel>

          <FloatLabel>
            <InputText id="register-username" v-model="username" placeholder=" " class="w-full" />
            <label for="register-username">Nombre de usuario</label>
          </FloatLabel>

          <FloatLabel>
            <Password id="register-password" v-model="password" :feedback="false" :toggleMask="true" class="w-full" />
            <label for="register-password">Contraseña</label>
          </FloatLabel>

          <Button class="mt-2 self-start" label="Crear cuenta" rounded type="submit" />
        </form>

        <div class="mt-6 text-sm text-slate-500">
          Ya tienes cuenta?
          <RouterLink class="font-semibold text-brand-primary" to="/login">
            Iniciar sesion
          </RouterLink>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { computed, watch } from "vue";
import { useLocalStorage } from "@vueuse/core";
import { RouterLink, useRoute, useRouter } from "vue-router";
import Button from "primevue/button";
import FloatLabel from "primevue/floatlabel";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import Password from "primevue/password";
import DefaultLayout from "../../../layouts/DefaultLayout.vue";

const router = useRouter();
const route = useRoute();

const role = useLocalStorage("signup.role", route.query.role === "influencer" ? "influencer" : "company");
const fullName = useLocalStorage("signup.fullName", "");
const email = useLocalStorage("signup.email", "");
const username = useLocalStorage("signup.username", "");
const password = useLocalStorage("signup.password", "");

watch(
  () => route.query.role,
  (value) => {
    role.value = value === "influencer" ? "influencer" : "company";
  }
);

const roleLabel = computed(() => (role.value === "company" ? "empresa" : "influencer"));

const roleOptions = [
  { label: "Empresa", value: "company" },
  { label: "Influencer", value: "influencer" }
];

const handleCreate = () => {
  localStorage.setItem("signup.role", role.value);
  localStorage.setItem(
    "signup.data",
    JSON.stringify({
      role: role.value,
      fullName: fullName.value,
      email: email.value,
      username: username.value,
      password: password.value
    })
  );
  router.push("/login");
};
</script>
