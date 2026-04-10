import { NextRequest, NextResponse } from "next/server";
import { getAdminServices } from "@/shared/lib/firebase-admin";

type RequestBody = {
  chatId?: string;
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

    const body = (await request.json()) as RequestBody;
    const chatId = body.chatId?.trim();
    if (!chatId) {
      return NextResponse.json({ error: "chatId es requerido" }, { status: 400 });
    }

    const { adminDb } = getAdminServices();
    const chatRef = adminDb.collection("chats").doc(chatId);
    const chatSnap = await chatRef.get();
    if (!chatSnap.exists) {
      return NextResponse.json({ ok: true });
    }

    const participants = (chatSnap.data()?.participants as string[] | undefined) ?? [];
    if (!participants.includes(uid)) {
      return NextResponse.json({ error: "No autorizado en este chat" }, { status: 403 });
    }

    const unreadCounts = (chatSnap.data()?.unread_counts as Record<string, number> | undefined) ?? {};
    if ((unreadCounts[uid] ?? 0) > 0) {
      await chatRef.set(
        {
          unread_counts: {
            ...unreadCounts,
            [uid]: 0,
          },
        },
        { merge: true }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error interno" },
      { status: 500 }
    );
  }
}

