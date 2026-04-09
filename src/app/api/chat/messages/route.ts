import { NextRequest, NextResponse } from "next/server";
import { getAdminServices } from "@/shared/lib/firebase-admin";

type ChatRole = "influencer" | "empresa";

type MessageRow = {
  id: string;
  by: ChatRole;
  senderName: string;
  senderProfileImage: string;
  text: string;
  at: string;
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
    const uid = await getUidFromBearer(request);
    if (!uid) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const chatId = request.nextUrl.searchParams.get("chatId")?.trim();
    const roleParam = request.nextUrl.searchParams.get("role");
    const currentUserRole: ChatRole = roleParam === "influencer" ? "influencer" : "empresa";

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

    const messagesSnap = await chatRef.collection("messages").orderBy("timestamp", "asc").get();
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
      };
    });

    return NextResponse.json({ ok: true, rows });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error interno" },
      { status: 500 }
    );
  }
}

