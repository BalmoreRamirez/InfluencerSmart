<template>
  <CompanyLayout>
    <div class="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-12">
      <header class="space-y-3">
        <p class="text-sm font-semibold uppercase tracking-wide text-brand-primary">Panel</p>
        <h1 class="text-3xl font-semibold text-brand-ink">Dashboard empresa</h1>
        <p class="text-sm text-slate-600">
          Gestiona propuestas, conversaciones y tu pipeline de campañas.
        </p>
      </header>

      <section class="grid gap-6 lg:grid-cols-3">
        <div class="rounded-2xl border border-brand-mist bg-white p-6 shadow-sm">
          <p class="text-sm font-semibold text-slate-500">Conversaciones activas</p>
          <p class="mt-4 text-3xl font-semibold text-brand-ink">6</p>
          <p class="mt-2 text-sm text-slate-500">3 en negociacion</p>
        </div>
        <div class="rounded-2xl border border-brand-mist bg-white p-6 shadow-sm">
          <p class="text-sm font-semibold text-slate-500">Propuestas enviadas</p>
          <p class="mt-4 text-3xl font-semibold text-brand-ink">15</p>
          <p class="mt-2 text-sm text-slate-500">Ultimos 30 dias</p>
        </div>
        <div class="rounded-2xl border border-brand-mist bg-white p-6 shadow-sm">
          <p class="text-sm font-semibold text-slate-500">Credito disponible</p>
          <p class="mt-4 text-3xl font-semibold text-brand-ink">$120</p>
          <p class="mt-2 text-sm text-slate-500">Umbral minimo $5</p>
        </div>
      </section>
    </div>
  </CompanyLayout>
</template>

<script setup lang="ts">
import CompanyLayout from "../../../layouts/CompanyLayout.vue";
</script>

