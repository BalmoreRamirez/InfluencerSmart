import {
  addDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
  type Unsubscribe,
} from "firebase/firestore";
import { chatsCollectionRef, chatDocRef, chatMessagesCollectionRef } from "@/shared/lib/firebase-collections";

type ChatRole = "influencer" | "empresa";

type ConversationRecord = {
  chatId: string;
  contactId: string;
  contactName: string;
  last: string;
  unread: number;
};

type ChatMessageRecord = {
  id: string;
  by: ChatRole;
  text: string;
  at: string;
};

function formatHourLabel(value: Date) {
  return value.toLocaleTimeString("es-MX", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function fallbackContactLabel(uid: string) {
  return `Contacto ${uid.slice(0, 6)}`;
}

export function subscribeUserConversations(
  userId: string,
  onData: (rows: ConversationRecord[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  const q = query(
    chatsCollectionRef(),
    where("participants", "array-contains", userId),
    orderBy("updated_at", "desc")
  );

  return onSnapshot(
    q,
    (snap) => {
      const rows: ConversationRecord[] = [];

      snap.forEach((item) => {
        const data = item.data();
        if (!Array.isArray(data.participants) || !data.participants.includes(userId)) return;

        const contactId = data.participants.find((id) => id !== userId) ?? userId;
        const participantNames = (data as { participant_names?: Record<string, string> }).participant_names;
        const contactName = participantNames?.[contactId] ?? fallbackContactLabel(contactId);

        rows.push({
          chatId: item.id,
          contactId,
          contactName,
          last: data.last_message ?? "",
          unread: 0,
        });
      });

      onData(rows);
    },
    (error) => {
      onError?.(error as Error);
    }
  );
}

export function subscribeChatMessages(
  chatId: string,
  currentUserId: string,
  currentUserRole: ChatRole,
  onData: (rows: ChatMessageRecord[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  const q = query(chatMessagesCollectionRef(chatId), orderBy("timestamp", "asc"));

  return onSnapshot(
    q,
    (snap) => {
      const rows = snap.docs.map((item) => {
        const data = item.data();
        const ownMessage = data.sender_id === currentUserId;
        const role: ChatRole = ownMessage
          ? currentUserRole
          : currentUserRole === "empresa"
            ? "influencer"
            : "empresa";

        return {
          id: item.id,
          by: role,
          text: data.text,
          at: data.timestamp?.toDate ? formatHourLabel(data.timestamp.toDate()) : "--:--",
        } satisfies ChatMessageRecord;
      });

      onData(rows);
    },
    (error) => {
      onError?.(error as Error);
    }
  );
}

export async function persistChatMessage(params: {
  chatId: string;
  userId: string;
  userName: string;
  contactId: string;
  contactName: string;
  text: string;
}) {
  const chatRef = chatDocRef(params.chatId);
  const existing = await getDoc(chatRef);

  if (!existing.exists()) {
    await setDoc(chatRef, {
      participants: [params.userId, params.contactId],
      participant_names: {
        [params.userId]: params.userName,
        [params.contactId]: params.contactName,
      },
      is_unlocked: true,
      last_message: params.text,
      updated_at: serverTimestamp(),
    });
  } else {
    await setDoc(
      chatRef,
      {
        last_message: params.text,
        updated_at: serverTimestamp(),
      },
      { merge: true }
    );
  }

  await addDoc(chatMessagesCollectionRef(params.chatId), {
    sender_id: params.userId,
    text: params.text,
    timestamp: serverTimestamp(),
  });
}

export async function ensureChatRecord(params: {
  chatId: string;
  userId: string;
  userName: string;
  contactId: string;
  contactName: string;
}) {
  const chatRef = doc(chatsCollectionRef(), params.chatId);
  const existing = await getDoc(chatRef);

  if (existing.exists()) return;

  await setDoc(chatRef, {
    participants: [params.userId, params.contactId],
    participant_names: {
      [params.userId]: params.userName,
      [params.contactId]: params.contactName,
    },
    is_unlocked: true,
    last_message: "",
    updated_at: serverTimestamp(),
  });
}

