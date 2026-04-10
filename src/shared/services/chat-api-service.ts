import { auth } from "@/shared/lib/firebase";

type ChatRole = "influencer" | "empresa";

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

type ConversationViaApi = {
  chatId: string;
  contactId: string;
  contactName: string;
  last: string;
  unread: number;
};

type MessageViaApi = {
  id: string;
  by: ChatRole;
  senderName: string;
  senderProfileImage: string;
  text: string;
  at: string;
  timestampMs?: number;
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

export async function fetchConversationsViaApi() {
  const token = await getAuthToken();

  const response = await fetch("/api/chat/conversations", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const data = (await response.json().catch(() => null)) as { error?: string } | null;
    throw new Error(data?.error ?? "No se pudieron cargar las conversaciones.");
  }

  const data = (await response.json()) as {
    ok: boolean;
    rows: ConversationViaApi[];
  };

  return data.rows;
}

export async function fetchMessagesViaApi(chatId: string, role: ChatRole, limitCount = 40) {
  const token = await getAuthToken();

  const response = await fetch(
    `/api/chat/messages?chatId=${encodeURIComponent(chatId)}&role=${encodeURIComponent(role)}&limit=${encodeURIComponent(String(limitCount))}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const data = (await response.json().catch(() => null)) as { error?: string } | null;
    throw new Error(data?.error ?? "No se pudieron cargar los mensajes.");
  }

  const data = (await response.json()) as {
    ok: boolean;
    rows: MessageViaApi[];
  };

  return data.rows;
}

export async function markConversationReadViaApi(chatId: string) {
  const token = await getAuthToken();

  const response = await fetch("/api/chat/read", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ chatId }),
  });

  if (!response.ok) {
    const data = (await response.json().catch(() => null)) as { error?: string } | null;
    throw new Error(data?.error ?? "No se pudo marcar como leído.");
  }
}
