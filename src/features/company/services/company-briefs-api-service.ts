import { auth } from "@/shared/lib/firebase";

export type CampaignBrief = {
  id: string;
  campaignName: string;
  context: string;
  objectives: string;
  timeline: string;
  targetAudience: string;
  resources: string;
  createdAtLabel: string;
  createdAtMs: number;
};

type ListBriefsResponse = {
  ok: boolean;
  credits: number;
  rows: CampaignBrief[];
};

type CreateBriefPayload = {
  campaignName: string;
  context: string;
  objectives: string;
  timeline: string;
  targetAudience: string;
  resources: string;
};

type CreateBriefResponse = {
  ok: boolean;
  brief: CampaignBrief;
};

type SendBriefPayload = {
  briefId: string;
  contactId: string;
  contactName: string;
};

type SendBriefResponse = {
  ok: boolean;
  chatId: string;
  contactId: string;
  contactName: string;
  creditsRemaining: number;
};

async function getAuthToken() {
  const currentUser = auth?.currentUser;
  if (!currentUser) {
    throw new Error("No hay sesion activa");
  }

  return currentUser.getIdToken();
}

export async function listCampaignBriefsViaApi() {
  const token = await getAuthToken();

  const response = await fetch("/api/company/briefs", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const data = (await response.json().catch(() => null)) as { error?: string } | null;
    throw new Error(data?.error ?? "No se pudieron cargar los briefs.");
  }

  const data = (await response.json()) as ListBriefsResponse;

  return {
    credits: data.credits,
    briefs: data.rows,
  };
}

export async function createCampaignBriefViaApi(payload: CreateBriefPayload) {
  const token = await getAuthToken();

  const response = await fetch("/api/company/briefs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const data = (await response.json().catch(() => null)) as { error?: string } | null;
    throw new Error(data?.error ?? "No se pudo crear el brief.");
  }

  const data = (await response.json()) as CreateBriefResponse;
  return data.brief;
}

export async function sendCampaignBriefViaApi(payload: SendBriefPayload) {
  const token = await getAuthToken();

  const response = await fetch("/api/company/briefs/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const data = (await response.json().catch(() => null)) as { error?: string } | null;
    throw new Error(data?.error ?? "No se pudo enviar el brief por chat.");
  }

  return (await response.json()) as SendBriefResponse;
}
