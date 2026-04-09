import { NextRequest, NextResponse } from "next/server";
import { adminServerTimestamp, getAdminServices } from "@/shared/lib/firebase-admin";

type RequestBody = {
  chatId: string;
  contactId: string;
  contactName: string;
  text: string;
};

async function getUidFromBearer(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.slice("Bearer ".length).trim();
  if (!token) return null;

  const { adminAuth } = getAdminServices();
  const decoded = await adminAuth.verifyIdToken(token);
  return decoded.uid;
}

export async function POST(request: NextRequest) {
  try {
    const uid = await getUidFromBearer(request);
    if (!uid) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { adminDb } = getAdminServices();
    const body = (await request.json()) as RequestBody;
    const chatId = body.chatId?.trim();
    const contactId = body.contactId?.trim();
    const contactName = body.contactName?.trim();
    const text = body.text?.trim();

    if (!chatId || !contactId || !contactName || !text) {
      return NextResponse.json({ error: "Payload invalido" }, { status: 400 });
    }

    const chatRef = adminDb.collection("chats").doc(chatId);
    const chatSnap = await chatRef.get();
    const userSnap = await adminDb.collection("users").doc(uid).get();
    const userName = (userSnap.data()?.username as string | undefined)?.trim() || `Usuario ${uid.slice(0, 6)}`;

    if (!chatSnap.exists) {
      await chatRef.set({
        participants: [uid, contactId],
        participant_names: {
          [uid]: userName,
          [contactId]: contactName,
        },
        is_unlocked: true,
        last_message: text,
        updated_at: adminServerTimestamp(),
      });
    } else {
      const participants = (chatSnap.data()?.participants as string[] | undefined) ?? [];
      if (!participants.includes(uid)) {
        return NextResponse.json({ error: "No autorizado en este chat" }, { status: 403 });
      }

      await chatRef.set(
        {
          last_message: text,
          updated_at: adminServerTimestamp(),
          participant_names: {
            [uid]: userName,
            [contactId]: contactName,
          },
        },
        { merge: true }
      );
    }

    await chatRef.collection("messages").add({
      sender_id: uid,
      text,
      timestamp: adminServerTimestamp(),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error interno" },
      { status: 500 }
    );
  }
}
