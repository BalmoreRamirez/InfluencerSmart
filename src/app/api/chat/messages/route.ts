import { NextRequest, NextResponse } from "next/server";
import {
  getAdminServices,
  getMissingFirebaseAdminEnv,
  isFirebaseAdminConfigured,
} from "@/shared/lib/firebase-admin";

type ChatRole = "influencer" | "empresa";

type MessageRow = {
  id: string;
  by: ChatRole;
  senderName: string;
  senderProfileImage: string;
  text: string;
  at: string;
  timestampMs: number;
};

function formatHourLabel(value: Date) {
  return value.toLocaleTimeString("es-MX", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

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

export async function GET(request: NextRequest) {
  try {
    if (!isFirebaseAdminConfigured()) {
      return NextResponse.json(
        {
          error: `Firebase Admin no configurado. Faltan: ${getMissingFirebaseAdminEnv().join(", ")}`,
        },
        { status: 503 }
      );
    }

    const uid = await getUidFromBearer(request);
    if (!uid) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const chatId = request.nextUrl.searchParams.get("chatId")?.trim();
    const roleParam = request.nextUrl.searchParams.get("role");
    const currentUserRole: ChatRole = roleParam === "influencer" ? "influencer" : "empresa";
    const parsedLimit = Number(request.nextUrl.searchParams.get("limit") ?? "40");
    const limitCount = Number.isFinite(parsedLimit) ? Math.max(1, Math.min(100, parsedLimit)) : 40;

    if (!chatId) {
      return NextResponse.json({ error: "chatId es requerido" }, { status: 400 });
    }

    const { adminDb } = getAdminServices();
    const chatRef = adminDb.collection("chats").doc(chatId);
    const chatSnap = await chatRef.get();
    if (!chatSnap.exists) {
      return NextResponse.json({ ok: true, rows: [] });
    }

    const participants = (chatSnap.data()?.participants as string[] | undefined) ?? [];
    if (!participants.includes(uid)) {
      return NextResponse.json({ error: "No autorizado en este chat" }, { status: 403 });
    }

    const messagesSnap = await chatRef.collection("messages").orderBy("timestamp", "desc").limit(limitCount).get();
    const rows: MessageRow[] = messagesSnap.docs.map((doc) => {
      const data = doc.data();
      const ownMessage = data.sender_id === uid;
      const by: ChatRole = ownMessage
        ? currentUserRole
        : currentUserRole === "empresa"
          ? "influencer"
          : "empresa";

      return {
        id: doc.id,
        by,
        senderName: (data.sender_name as string | undefined) ?? (ownMessage ? "Tú" : "Contacto"),
        senderProfileImage: (data.sender_profile_image as string | undefined) ?? "",
        text: (data.text as string | undefined) ?? "",
        at: data.timestamp?.toDate ? formatHourLabel(data.timestamp.toDate()) : "--:--",
        timestampMs: data.timestamp?.toDate ? data.timestamp.toDate().getTime() : 0,
      };
    }).sort((a, b) => a.timestampMs - b.timestampMs);

    return NextResponse.json({ ok: true, rows });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error interno" },
      { status: 500 }
    );
  }
}
