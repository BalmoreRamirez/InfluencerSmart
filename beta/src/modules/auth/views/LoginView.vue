<template>
  <DefaultLayout>
    <div class="flex min-h-screen w-full items-center justify-center px-6 py-10">
      <div class="w-full max-w-2xl rounded-3xl border border-brand-mist bg-white p-10 shadow-lg">
        <div class="space-y-3">
          <p class="text-sm font-semibold uppercase tracking-wide text-brand-primary">Acceso</p>
          <h1 class="text-3xl font-semibold text-brand-ink">Iniciar sesion</h1>
          <p class="text-sm text-slate-600">
            Accede para gestionar tus campañas, propuestas y conversaciones activas.
          </p>
        </div>

        <p class="mt-3 rounded-2xl border border-brand-sky/40 bg-brand-sky/10 px-4 py-3 text-xs text-slate-600">
          Credenciales de prueba: admin@gmail.com, empresa@gmail.com, influencer@gmail.com
          (clave: 1234).
        </p>

        <div class="mt-4 flex flex-wrap gap-3 text-xs font-semibold text-brand-primary">
          <Button label="Admin" outlined rounded size="small" type="button" @click="fillCredentials('admin@gmail.com')" />
          <Button label="Empresa" outlined rounded size="small" type="button" @click="fillCredentials('empresa@gmail.com')" />
          <Button label="Influencer" outlined rounded size="small" type="button" @click="fillCredentials('influencer@gmail.com')" />
        </div>

        <form class="mt-8 grid gap-4 space-y-6" @submit.prevent="handleLogin">
          <FloatLabel>
            <InputText
              id="login-email"
              v-model="email"
              placeholder=" "
              type="email"
              class="w-full"
            />
            <label for="login-email">Correo</label>
          </FloatLabel>
          <FloatLabel>
            <Password
              id="login-password"
              v-model="password"
              placeholder=" "
              :feedback="false"
              toggleMask
              inputClass="w-full"
              class="w-full"
              inputId="login-password"
            />
            <label for="login-password">Contrasena</label>
          </FloatLabel>
          <Button class="mt-2 self-start" label="Entrar" rounded type="submit" />
        </form>

        <div class="mt-6 text-sm text-slate-500">
          No tienes cuenta?
          <RouterLink class="font-semibold text-brand-primary" to="/register">
            Crear cuenta
          </RouterLink>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { useLocalStorage } from "@vueuse/core";
import { RouterLink, useRouter } from "vue-router";
import Button from "primevue/button";
import FloatLabel from "primevue/floatlabel";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import DefaultLayout from "../../../layouts/DefaultLayout.vue";

const router = useRouter();
const email = useLocalStorage("login.email", "");
const password = useLocalStorage("login.password", "");

const roleByEmail = (value: string) => {
  if (value === "influencer@gmail.com") return "influencer";
  if (value === "empresa@gmail.com") return "company";
  if (value === "admin@gmail.com") return "admin";
  return "guest";
};

const handleLogin = () => {
  const role = roleByEmail(email.value.trim());
  localStorage.setItem("session.role", role);

  if (role === "influencer") {
    const completed = localStorage.getItem("profile.influencer.complete") === "true";
    router.push(completed ? "/influencer" : "/onboarding/influencer");
    return;
  }

  if (role === "company") {
    const completed = localStorage.getItem("profile.company.complete") === "true";
    router.push(completed ? "/company" : "/onboarding/company");
    return;
  }

  router.push("/");
};

const fillCredentials = (value: string) => {
  email.value = value;
  password.value = "1234";
};
</script>
