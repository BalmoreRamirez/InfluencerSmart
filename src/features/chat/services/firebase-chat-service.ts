import {
  addDoc,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore/lite";
import { chatsCollectionRef, chatDocRef, chatMessagesCollectionRef } from "@/shared/lib/firebase-collections";

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
