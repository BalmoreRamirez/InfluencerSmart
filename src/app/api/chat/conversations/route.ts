import { NextRequest, NextResponse } from "next/server";
import { getAdminServices } from "@/shared/lib/firebase-admin";

type ConversationRow = {
  chatId: string;
  contactId: string;
  contactName: string;
  last: string;
  unread: number;
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

function fallbackContactLabel(uid: string) {
  return `Contacto ${uid.slice(0, 6)}`;
}

export async function GET(request: NextRequest) {
  try {
    const uid = await getUidFromBearer(request);
    if (!uid) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { adminDb } = getAdminServices();
    const snap = await adminDb.collection("chats").where("participants", "array-contains", uid).get();

    const rows: Array<ConversationRow & { updatedAtMs: number }> = snap.docs
      .map((doc) => {
        const data = doc.data();
        const participants = Array.isArray(data.participants) ? (data.participants as string[]) : [];
        if (!participants.includes(uid)) return null;

        const contactId = participants.find((id) => id !== uid) ?? uid;
        const participantNames = (data.participant_names as Record<string, string> | undefined) ?? {};
        const updatedAtMs = data.updated_at?.toMillis ? data.updated_at.toMillis() : 0;

        return {
          chatId: doc.id,
          contactId,
          contactName: participantNames[contactId] ?? fallbackContactLabel(contactId),
          last: typeof data.last_message === "string" ? data.last_message : "",
          unread: data.last_sender_id && data.last_sender_id !== uid ? 1 : 0,
          updatedAtMs,
        };
      })
      .filter((row): row is ConversationRow & { updatedAtMs: number } => Boolean(row))
      .sort((a, b) => b.updatedAtMs - a.updatedAtMs);

    return NextResponse.json({
      ok: true,
      rows: rows.map((row) => ({
        chatId: row.chatId,
        contactId: row.contactId,
        contactName: row.contactName,
        last: row.last,
        unread: row.unread,
      })),
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error interno" },
      { status: 500 }
    );
  }
}
