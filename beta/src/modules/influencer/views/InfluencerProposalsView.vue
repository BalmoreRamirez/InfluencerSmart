<template>
  <InfluencerLayout>
    <div class="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-12">
      <nav class="flex flex-wrap gap-3 text-sm font-semibold text-slate-500">
        <RouterLink class="rounded-full border border-brand-mist px-4 py-2" to="/influencer">
          Dashboard
        </RouterLink>
        <RouterLink class="rounded-full border border-brand-mist px-4 py-2" to="/influencer/profile">
          Completar perfil
        </RouterLink>
        <RouterLink
          class="rounded-full border border-brand-primary px-4 py-2 text-brand-primary"
          to="/influencer/proposals"
        >
          Ver propuestas
        </RouterLink>
      </nav>

      <header class="space-y-3">
        <p class="text-sm font-semibold uppercase tracking-wide text-brand-primary">Propuestas</p>
        <h1 class="text-3xl font-semibold text-brand-ink">Ver propuestas</h1>
        <p class="text-sm text-slate-600">
          Revisa las propuestas activas y responde a las negociaciones.
        </p>
      </header>

      <div class="flex flex-wrap gap-3 text-xs font-semibold text-slate-500">
        <button
          class="rounded-full border border-brand-mist px-4 py-2"
          type="button"
          @click="selectedStatus = 'all'"
        >
          Todas
        </button>
        <button
          class="rounded-full border border-brand-mist px-4 py-2"
          type="button"
          @click="selectedStatus = 'new'"
        >
          Nueva
        </button>
        <button
          class="rounded-full border border-brand-mist px-4 py-2"
          type="button"
          @click="selectedStatus = 'counter'"
        >
          Contraoferta
        </button>
        <button
          class="rounded-full border border-brand-mist px-4 py-2"
          type="button"
          @click="selectedStatus = 'accepted'"
        >
          Aceptada
        </button>
      </div>

      <section class="grid gap-4">
        <article
          v-for="proposal in filteredProposals"
          :key="proposal.id"
          class="rounded-3xl border border-brand-mist bg-white p-6 shadow-sm"
        >
          <div class="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p class="text-sm font-semibold text-brand-primary">{{ proposal.brand }}</p>
              <h2 class="text-xl font-semibold text-brand-ink">{{ proposal.campaign }}</h2>
              <p class="mt-2 text-sm text-slate-600">
                Entregables: {{ proposal.deliverables }} · Fecha limite: {{ proposal.dueDate }}
              </p>
            </div>
            <span
              class="rounded-full border border-brand-mist px-3 py-1 text-xs font-semibold text-slate-500"
            >
              {{ proposal.statusLabel }}
            </span>
          </div>

          <div class="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-600">
            <span>Presupuesto: {{ proposal.budget }}</span>
            <span>Plataforma: {{ proposal.platform }}</span>
          </div>

          <div class="mt-6 flex flex-wrap gap-3">
            <button
              class="rounded-full bg-brand-success px-4 py-2 text-xs font-semibold text-white"
              type="button"
              @click="updateStatus(proposal.id, 'accepted')"
            >
              Aceptar
            </button>
            <button
              class="rounded-full border border-brand-primary px-4 py-2 text-xs font-semibold text-brand-primary"
              type="button"
              @click="updateStatus(proposal.id, 'counter')"
            >
              Contraoferta
            </button>
            <button
              class="rounded-full border border-brand-accent px-4 py-2 text-xs font-semibold text-brand-accent"
              type="button"
              @click="updateStatus(proposal.id, 'declined')"
            >
              Rechazar
            </button>
          </div>
        </article>
      </section>
    </div>
  </InfluencerLayout>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useLocalStorage } from "@vueuse/core";
import { RouterLink } from "vue-router";
import InfluencerLayout from "../../../layouts/InfluencerLayout.vue";

type ProposalStatus = "new" | "accepted" | "counter" | "declined";
type ProposalFilter = ProposalStatus | "all";

type Proposal = {
  id: string;
  brand: string;
  campaign: string;
  deliverables: string;
  dueDate: string;
  budget: string;
  platform: string;
  status: ProposalStatus;
};

const proposalsStorage = useLocalStorage<Proposal[]>("influencer.proposals", [
  {
    id: "prop-001",
    brand: "Nova Cosmetics",
    campaign: "Lanzamiento verano",
    deliverables: "2 reels + 4 stories",
    dueDate: "15 Jun 2026",
    budget: "$450",
    platform: "Instagram",
    status: "new"
  },
  {
    id: "prop-002",
    brand: "FitLab",
    campaign: "Reto 30 dias",
    deliverables: "1 video + 3 stories",
    dueDate: "28 Jun 2026",
    budget: "$320",
    platform: "TikTok",
    status: "counter"
  }
]);

const statusLabel: Record<ProposalStatus, string> = {
  new: "Nueva",
  accepted: "Aceptada",
  counter: "Contraoferta",
  declined: "Rechazada"
};

const proposals = computed(() =>
  proposalsStorage.value.map((proposal) => ({
    ...proposal,
    statusLabel: statusLabel[proposal.status]
  }))
);

const selectedStatus = ref<ProposalFilter>("all");

const filteredProposals = computed(() => {
  if (selectedStatus.value === "all") return proposals.value;
  return proposals.value.filter((proposal) => proposal.status === selectedStatus.value);
});

const updateStatus = (id: string, status: ProposalStatus) => {
  proposalsStorage.value = proposalsStorage.value.map((proposal) =>
    proposal.id === id ? { ...proposal, status } : proposal
  );
};
</script>

