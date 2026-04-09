import { auth } from "@/shared/lib/firebase";

type SendViaApiPayload = {
  chatId: string;
  contactId: string;
  contactName: string;
  text: string;
};

type SendViaApiResponse = {
  ok: boolean;
  chatId: string;
  contactId: string;
  contactName: string;
};

async function getAuthToken() {
  const currentUser = auth?.currentUser;
  if (!currentUser) {
    throw new Error("No hay sesión activa");
  }

  return currentUser.getIdToken();
}

export async function sendMessageViaApi(payload: SendViaApiPayload) {
  const token = await getAuthToken();

  const response = await fetch("/api/chat/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const data = (await response.json().catch(() => null)) as { error?: string } | null;
    throw new Error(data?.error ?? "No se pudo enviar el mensaje.");
  }

  return (await response.json()) as SendViaApiResponse;
}
