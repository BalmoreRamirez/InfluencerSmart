<template>
  <DefaultLayout>
    <main class="relative bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden">
      <!-- Decorative blurred shapes (subtle) -->
      <div class="pointer-events-none absolute -top-24 -left-28 h-[340px] w-[340px] rounded-full bg-gradient-to-r from-teal-300 to-indigo-400 opacity-12 blur-2xl" />
      <div class="pointer-events-none absolute -bottom-32 -right-28 h-[300px] w-[300px] rounded-full bg-gradient-to-r from-indigo-300 to-teal-400 opacity-10 blur-xl" />
      <nav class="sticky top-0 z-30 bg-white/90 backdrop-blur-sm border-b border-white/10">
        <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3">
          <div class="flex items-center gap-3">
            <div class="h-8 w-8 rounded-md bg-gradient-to-r from-teal-400 to-indigo-600 shadow-md"></div>
            <span class="font-semibold text-slate-900">Influencer Smart App</span>
          </div>
          <div class="hidden gap-6 text-sm font-medium text-slate-700 md:flex">
            <button class="hover:text-teal-600" @click.prevent="scrollTo('how')">Cómo funciona</button>
            <button class="hover:text-teal-600" @click.prevent="scrollTo('features')">Características</button>
            <button class="hover:text-teal-600" @click.prevent="scrollTo('monetization')">Monetización</button>
            <button class="hover:text-teal-600" @click.prevent="scrollTo('onboarding')">Onboarding</button>
          </div>
          <div class="flex items-center gap-3">
            <div class="md:hidden">
              <button @click="mobileOpen = !mobileOpen" aria-label="Abrir menú" class="inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100">
                <svg v-if="!mobileOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <RouterLink to="/login" class="hidden text-sm text-slate-700 hover:text-teal-600 md:inline">Login</RouterLink>
            <RouterLink to="/register" class="hidden rounded-full bg-gradient-to-r from-teal-700 to-indigo-700 px-3 py-1 text-sm font-semibold text-white hover:from-teal-800 hover:to-indigo-800 md:inline">Registro</RouterLink>
          </div>
        </div>

        <Transition
          enter-active-class="transition ease-out duration-200"
          enter-from-class="transform -translate-y-4 opacity-0"
          enter-to-class="transform translate-y-0 opacity-100"
          leave-active-class="transition ease-in duration-150"
          leave-from-class="transform translate-y-0 opacity-100"
          leave-to-class="transform -translate-y-4 opacity-0"
        >
          <div v-if="mobileOpen" class="md:hidden border-t bg-white/95">
            <div class="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-4">
              <button class="text-left text-sm text-slate-700" @click="scrollTo('how'); mobileOpen=false">Cómo funciona</button>
              <button class="text-left text-sm text-slate-700" @click="scrollTo('features'); mobileOpen=false">Características</button>
              <button class="text-left text-sm text-slate-700" @click="scrollTo('monetization'); mobileOpen=false">Monetización</button>
              <button class="text-left text-sm text-slate-700" @click="scrollTo('onboarding'); mobileOpen=false">Onboarding</button>
              <div class="mt-2 flex gap-3">
                <RouterLink to="/login" class="text-sm text-slate-700">Login</RouterLink>
                <RouterLink to="/register" class="rounded-full bg-indigo-600 px-3 py-1 text-sm font-semibold text-white">Registro</RouterLink>
              </div>
            </div>
          </div>
        </Transition>
      </nav>
      <!-- Hero -->
      <section id="how" :ref="hero.el" :class="hero.visible ? 'mx-auto w-full max-w-7xl px-6 py-16 lg:py-20 opacity-100 translate-y-0 transition duration-700' : 'mx-auto w-full max-w-7xl px-6 py-16 lg:py-20 opacity-0 translate-y-6'">
        <div class="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div class="space-y-6">
            <div class="bg-white/95 rounded-2xl p-6 lg:p-8 shadow-lg">
            <span class="inline-block rounded-full bg-indigo-100/60 px-3 py-1 text-sm font-semibold text-indigo-700">
              Lanzamiento beta — Acceso prioritario
            </span>
            <h1 class="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              Centraliza tu influencer marketing
            </h1>
            <p class="text-lg text-slate-600">
              Encuentra, negocia y gestiona campañas con influencers en Latinoamérica — todo en
              una plataforma pensada para equipos y creadores.
            </p>

            <div class="flex flex-wrap gap-4 items-center">
              <RouterLink to="/register?role=company">
                <Button label="Soy empresa" class="p-button-rounded bg-gradient-to-r from-teal-700 to-indigo-700 text-white shadow-lg" />
              </RouterLink>

              <RouterLink to="/register?role=influencer">
                <Button label="Soy influencer" class="p-button-outlined p-button-rounded text-teal-600 border-teal-300" />
              </RouterLink>

              <form @submit.prevent="handleLead" class="ml-0 sm:ml-4 flex items-center gap-2">
                <input v-model="leadEmail" type="email" required placeholder="Tu email" class="rounded-full bg-white px-3 py-2 text-sm shadow-sm placeholder-slate-400 border border-slate-100" />
                <Button type="submit" label="Solicitar demo" class="p-button-sm p-button-rounded bg-gradient-to-r from-teal-700 to-indigo-700 text-white shadow" />
              </form>
              <p v-if="leadSaved" class="ml-3 text-sm text-green-600">Gracias — te contactamos pronto.</p>
            </div>

            <div class="mt-6 flex gap-8 text-sm text-slate-500">
              <div>
                <p class="text-xl font-semibold text-slate-900">+10 nichos</p>
                <p>Segmentación avanzada</p>
              </div>
              <div>
                <p class="text-xl font-semibold text-slate-900">Chat integrado</p>
                <p>Negociaciones en contexto</p>
              </div>
            </div>
            </div>
          </div>

          <div class="relative rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 p-6 lg:p-8 shadow-2xl">
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" alt="equipo trabajando" class="absolute -right-8 top-6 hidden h-48 w-48 rounded-lg object-cover shadow-2xl sm:block" />
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-semibold text-indigo-700">Cómo funciona</p>
                <p class="mt-2 text-sm text-slate-700">Proceso simple y transparente</p>
              </div>
              <div class="inline-flex items-center gap-3 rounded-md bg-indigo-100/50 px-3 py-1 text-sm font-medium text-indigo-700">
                Flujo V1
              </div>
            </div>

            <ol class="mt-6 space-y-4 text-sm text-slate-700">
              <li class="flex gap-3">
                <span class="mt-1 h-3 w-3 rounded-full bg-indigo-600"></span>
                Registro y onboarding por rol
              </li>
              <li class="flex gap-3">
                <span class="mt-1 h-3 w-3 rounded-full bg-indigo-600"></span>
                Descubrimiento y filtros por nicho y alcance
              </li>
              <li class="flex gap-3">
                <span class="mt-1 h-3 w-3 rounded-full bg-indigo-600"></span>
                Chat y propuesta estructurada
              </li>
            </ol>
          </div>
        </div>
      </section>

      <!-- Features -->
      <section id="features" :ref="features.el" :class="features.visible ? 'mx-auto max-w-7xl px-6 pb-20 opacity-100 translate-y-0 transition duration-700 delay-150' : 'mx-auto max-w-7xl px-6 pb-20 opacity-0 translate-y-6'">
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div class="rounded-2xl bg-white p-4 sm:p-6 shadow-sm border border-slate-100">
            <h3 class="text-lg font-semibold text-slate-900">Discovery Inteligente</h3>
            <p class="mt-2 text-sm text-slate-600">Filtra por nicho, engagement y ubicación para encontrar los mejores creadores.</p>
          </div>
          <div class="rounded-2xl bg-white p-4 sm:p-6 shadow-sm border border-slate-100">
            <h3 class="text-lg font-semibold text-slate-900">Propuestas Estructuradas</h3>
            <p class="mt-2 text-sm text-slate-600">Envía propuestas con entregables, fechas y tarifas claras dentro del chat.</p>
          </div>
          <div class="rounded-2xl bg-white p-4 sm:p-6 shadow-sm border border-slate-100">
            <h3 class="text-lg font-semibold text-slate-900">Control por Créditos</h3>
            <p class="mt-2 text-sm text-slate-600">Gestiona accesos y solicita pagos fuera de la plataforma en esta versión.</p>
          </div>
        </div>
      </section>

      <!-- Testimonials / Trust -->
      <section class="mx-auto max-w-7xl px-6 pb-24">
        <div class="rounded-2xl bg-gradient-to-r from-indigo-800 to-teal-600 p-8 text-white shadow-2xl">
          <div class="grid gap-6 lg:grid-cols-3 lg:items-center">
            <div>
              <h3 class="text-2xl font-bold">Empresas y creadores confían en nosotros</h3>
              <p class="mt-2 text-sm text-indigo-100">Historias reales de crecimiento y campañas exitosas en la región.</p>
            </div>
            <div class="lg:col-span-2">
              <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end">
                <blockquote class="rounded-lg bg-white/10 p-4 text-sm italic">“La plataforma aceleró la búsqueda de talentos y redujo el tiempo de negociación” — Agencia MX</blockquote>
                <blockquote class="rounded-lg bg-white/10 p-4 text-sm italic">“Más visibilidad y propuestas mejor estructuradas” — Creatora AR</blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- Monetization & Trust -->
      <section id="monetization" class="mx-auto max-w-7xl px-6 pb-12">
        <div class="grid gap-6 lg:grid-cols-3">
          <div class="rounded-2xl bg-white/5 backdrop-blur-sm p-6 shadow-lg border border-white/10">
            <p class="text-sm font-semibold text-slate-800">Bono de bienvenida</p>
            <p class="mt-2 text-3xl font-bold text-white">$10</p>
            <p class="mt-1 text-sm text-slate-600">Créditos al completar el onboarding (empresas).</p>
          </div>
          <div class="rounded-2xl bg-white/5 backdrop-blur-sm p-6 shadow-lg border border-white/10">
            <p class="text-sm font-semibold text-slate-800">Umbral mínimo</p>
            <p class="mt-2 text-3xl font-bold text-white">$5</p>
            <p class="mt-1 text-sm text-slate-600">Chats bloqueados en modo lectura si el saldo cae por debajo.</p>
          </div>
          <div class="rounded-2xl bg-white/5 backdrop-blur-sm p-6 shadow-lg flex items-center gap-4 border border-white/10">
            <div class="h-12 w-12 flex-none rounded-md bg-white/20 p-2">
              <svg viewBox="0 0 100 32" class="h-full w-full" xmlns="http://www.w3.org/2000/svg" fill="none">
                <rect width="100" height="32" rx="6" fill="#6772E5" />
                <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="12">Stripe</text>
              </svg>
            </div>
            <div>
              <p class="text-sm font-semibold text-slate-800">Pagos & Suscripciones</p>
              <p class="mt-1 text-sm text-slate-600">Integración con Stripe para suscripciones y compra de créditos.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Onboarding summary + Proposal mock -->
      <section id="onboarding" class="mx-auto max-w-7xl px-6 pb-12">
        <div class="grid gap-8 lg:grid-cols-2 lg:items-start">
          <div class="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <h3 class="text-lg font-semibold text-slate-900">Onboarding por rol</h3>
            <p class="mt-2 text-sm text-slate-600">Registro rápido (username, email, password, role) y pasos finales por rol.</p>
            <ul class="mt-4 space-y-3 text-sm text-slate-600">
              <li><strong>Empresa:</strong> companyName, companyCode, industry, address, minimumThreshold.</li>
              <li><strong>Influencer:</strong> fullName, niche, socialAccounts, servicePricing, profilePhoto.</li>
            </ul>
          </div>

          <div class="rounded-2xl bg-white p-6 shadow-lg">
            <h3 class="text-lg font-semibold text-slate-900">Mock: Propuesta en chat</h3>
            <div class="mt-4 grid gap-3">
              <div class="rounded-md border border-slate-100 p-4">
                <p class="text-sm text-slate-700">Empresa • 2h ago</p>
                <div class="mt-2 rounded-md bg-slate-50 p-3">
                  <p class="text-sm text-slate-900 font-medium">Propuesta: Video IG + Story</p>
                  <p class="text-sm text-slate-600 mt-1">Tarifa: $120 — Entregables: 1 post + 2 stories — Fecha: 2026-06-01</p>
                  <div class="mt-3 flex gap-2">
                    <Button label="Aceptar" class="p-button-rounded p-button-sm bg-green-600" />
                    <Button label="Contraoferta" class="p-button-rounded p-button-sm p-button-outlined" />
                  </div>
                </div>
              </div>
              <p class="text-xs text-slate-500">Nota: en V1 el pago del acuerdo se ejecuta fuera de la plataforma.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Structured sections as requested -->
      <!-- Social proof -->
      <section id="social" class="mx-auto max-w-7xl px-6 pb-12">
        <div class="flex w-full items-center justify-between gap-4">
          <div class="flex items-center gap-6">
            <div class="h-10 w-24 rounded-md bg-white/10" />
            <div class="h-10 w-24 rounded-md bg-white/10" />
            <div class="h-10 w-24 rounded-md bg-white/10" />
          </div>
          <div class="text-sm text-slate-600">Confían: agencias, marcas y creadores de LATAM</div>
        </div>
      </section>

      <!-- Problema / Solución -->
      <section id="problem" class="mx-auto max-w-7xl px-6 pb-12">
        <div class="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
          <div class="grid gap-6 lg:grid-cols-2 lg:items-center">
            <div>
              <h3 class="text-2xl font-bold text-slate-900">El problema</h3>
              <p class="mt-2 text-sm text-slate-600">Las negociaciones con influencers son dispersas: mensajes en múltiples apps, pagos fuera de flujo y falta de métricas estandarizadas.</p>
            </div>
            <div>
              <h3 class="text-2xl font-bold text-teal-600">Nuestra solución</h3>
              <p class="mt-2 text-sm text-slate-600">Un espacio único para descubrir talentos, negociar entregables y estructurar propuestas con trazabilidad.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Features -->
      <section id="features" :ref="features.el" :class="features.visible ? 'mx-auto max-w-7xl px-6 pb-20 opacity-100 translate-y-0 transition duration-700 delay-150' : 'mx-auto max-w-7xl px-6 pb-20 opacity-0 translate-y-6'">
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="f in featuresData" :key="f.title" class="rounded-2xl bg-white p-4 sm:p-6 shadow-sm border border-slate-100">
            <h3 class="text-lg font-semibold text-slate-900">{{ f.title }}</h3>
            <p class="mt-2 text-sm text-slate-600">{{ f.desc }}</p>
          </div>
        </div>
      </section>

      <!-- How it works -->
      <section id="how-it-works" class="mx-auto max-w-7xl px-6 pb-12">
        <div class="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
          <h3 class="text-xl font-semibold text-slate-900">Cómo funciona</h3>
          <ol class="mt-4 list-decimal pl-6 text-sm text-slate-600 space-y-2">
            <li>Regístrate y completa tu perfil según rol.</li>
            <li>Descubre y filtra creadores por nicho y alcance.</li>
            <li>Negocia en el chat con propuestas estructuradas.</li>
            <li>Aprobación y ejecución fuera de la plataforma (V1).</li>
          </ol>
        </div>
      </section>

      <!-- Screenshots -->
      <section id="screenshots" class="mx-auto max-w-7xl px-6 pb-12">
        <div class="grid gap-4 sm:grid-cols-3">
          <img v-for="(s, i) in screenshots" :key="i" :src="s" class="rounded-lg shadow-md object-cover h-48 w-full" />
        </div>
      </section>

      <!-- Pricing -->
      <section id="pricing" class="mx-auto max-w-7xl px-6 pb-12">
        <div class="grid gap-6 sm:grid-cols-3">
          <div v-for="plan in pricing" :key="plan.name" class="rounded-2xl bg-white p-6 shadow-sm border border-slate-100 text-center">
            <p class="text-sm text-slate-600">{{ plan.name }}</p>
            <p class="mt-2 text-3xl font-bold text-slate-900">{{ plan.price }}</p>
            <p class="mt-2 text-sm text-slate-600">{{ plan.desc }}</p>
            <div class="mt-4">
              <Button :label="plan.cta" class="p-button-rounded bg-gradient-to-r from-teal-700 to-indigo-700 text-white" />
            </div>
          </div>
        </div>
      </section>

      <!-- Testimonials -->
      <section id="testimonials" class="mx-auto max-w-7xl px-6 pb-12">
        <div class="grid gap-6 lg:grid-cols-3">
          <blockquote v-for="t in testimonials" :key="t.by" class="rounded-lg bg-white p-4 shadow-sm border border-slate-100 text-sm text-slate-700">“{{ t.text }}” — <strong>{{ t.by }}</strong></blockquote>
        </div>
      </section>

      <!-- FAQ -->
      <section id="faq" class="mx-auto max-w-7xl px-6 pb-12">
        <div class="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
          <h3 class="text-xl font-semibold text-slate-900">Preguntas frecuentes</h3>
          <div class="mt-4 space-y-3">
            <div v-for="q in faqs" :key="q.q">
              <p class="text-sm font-medium text-slate-800">{{ q.q }}</p>
              <p class="text-sm text-slate-600">{{ q.a }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Final CTA -->
      <section id="final-cta" class="mx-auto max-w-7xl px-6 pb-12">
        <div class="rounded-3xl bg-gradient-to-r from-teal-700 to-indigo-700 p-8 text-white shadow-2xl">
          <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h4 class="text-2xl font-semibold">Listo para comenzar?</h4>
              <p class="text-sm">Crea tu cuenta o solicita una demo personalizada.</p>
            </div>
            <div class="flex gap-4">
              <RouterLink to="/register"><Button label="Crear cuenta" class="p-button-rounded bg-white text-teal-600" /></RouterLink>
              <RouterLink to="/login"><Button label="Solicitar demo" class="p-button-rounded p-button-outlined text-white border-white/40" /></RouterLink>
            </div>
          </div>
        </div>
      </section>

      <!-- Four questions (static answers) -->
      <section id="four-questions" class="mx-auto max-w-7xl px-6 pb-24">
        <div class="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
          <h3 class="text-xl font-semibold text-slate-900">Resumen rápido</h3>
          <div class="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <p class="text-sm font-semibold text-slate-800">¿Qué hacemos?</p>
              <p class="text-sm text-slate-600">Centralizamos el proceso de influencer marketing: descubrimiento, negociación y propuesta.</p>
            </div>
            <div>
              <p class="text-sm font-semibold text-slate-800">¿Para quién es?</p>
              <p class="text-sm text-slate-600">Para empresas, agencias y creadores que buscan profesionalizar campañas en LATAM.</p>
            </div>
            <div>
              <p class="text-sm font-semibold text-slate-800">¿Por qué confiar?</p>
              <p class="text-sm text-slate-600">Propuestas estructuradas, chat en contexto y trazabilidad en negociaciones.</p>
            </div>
            <div>
              <p class="text-sm font-semibold text-slate-800">¿Qué hago ahora?</p>
              <p class="text-sm text-slate-600">Crea una cuenta o solicita una demo — comienza a probar con tu primer proyecto.</p>
            </div>
          </div>
        </div>
      </section>

    </main>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import DefaultLayout from "../../../layouts/DefaultLayout.vue";
import Button from "primevue/button";
import { useReveal } from "../composables/useReveal";
import { ref } from "vue";

const hero = useReveal<HTMLElement>();
const features = useReveal<HTMLElement>();

const leadEmail = ref("");
const leadSaved = ref(false);

const featuresData = [
  { title: "Discovery Inteligente", desc: "Filtra por nicho, engagement y ubicación para encontrar los mejores creadores." },
  { title: "Propuestas Estructuradas", desc: "Envía propuestas con entregables, fechas y tarifas claras dentro del chat." },
  { title: "Chat Contextual", desc: "Negociaciones y acuerdos con historial y archivos adjuntos." },
];

const screenshots = [
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
];

const pricing = [
  { name: "Free", price: "$0", desc: "Prueba básica para 1 proyecto", cta: "Empieza gratis" },
  { name: "Pro", price: "$29", desc: "Pro para equipos pequeños", cta: "Probar Pro" },
  { name: "Enterprise", price: "Contact", desc: "Soporte y onboarding dedicado", cta: "Contactar" },
];

const testimonials = [
  { text: "Aceleró nuestra búsqueda de talento", by: "Agencia MX" },
  { text: "Mejor estructura en la negociación", by: "Creatora AR" },
  { text: "Ahorro de tiempo en la gestión", by: "Brand CO" },
];

const faqs = [
  { q: "¿Puedo integrar pagos?", a: "Sí, integración con Stripe para pagos y créditos en futuras versiones." },
  { q: "¿Dónde se guardan los acuerdos?", a: "Los historiales de chat y propuestas quedan guardados en la plataforma." },
];

function handleLead() {
  try {
    const existing = JSON.parse(localStorage.getItem("leads") || "[]");
    existing.push({ email: leadEmail.value, date: new Date().toISOString() });
    localStorage.setItem("leads", JSON.stringify(existing));
    leadSaved.value = true;
    leadEmail.value = "";
    setTimeout(() => (leadSaved.value = false), 4000);
  } catch (e) {
    console.error(e);
  }
}

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

const mobileOpen = ref(false);
</script>

