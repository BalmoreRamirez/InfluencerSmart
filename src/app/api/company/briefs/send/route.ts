import { NextRequest, NextResponse } from "next/server";
import {
  adminServerTimestamp,
  getAdminServices,
  getMissingFirebaseAdminEnv,
  isFirebaseAdminConfigured,
} from "@/shared/lib/firebase-admin";

type RequestBody = {
  briefId?: string;
  contactId?: string;
  contactName?: string;
};

type BriefPayload = {
  campaign_name: string;
  context: string;
  objectives: string;
  timeline: string;
  target_audience: string;
  resources: string;
  company_id: string;
};

type ContactInfo = {
  uid: string;
  displayName: string;
  profileImage: string;
};

function createRoomId(a: string, b: string) {
  return [a.trim().toLowerCase(), b.trim().toLowerCase()].sort().join("::");
}

function toSlug(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function buildBriefMessage(brief: BriefPayload) {
  return [
    `Brief de campana: ${brief.campaign_name}`,
    `1) Contexto relevante\n${brief.context}`,
    `2) Objetivos y metricas\n${brief.objectives}`,
    `3) Cronograma e hitos\n${brief.timeline}`,
    `4) Publico objetivo\n${brief.target_audience}`,
    `5) Recursos y enlaces\n${brief.resources}`,
    "Si te interesa, podemos iniciar la negociacion por este chat.",
  ].join("\n\n");
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

async function resolveContact(
  adminDb: FirebaseFirestore.Firestore,
  contactId: string,
  contactName: string
): Promise<ContactInfo> {
  const byId = await adminDb.collection("users").doc(contactId).get();
  if (byId.exists) {
    return {
      uid: contactId,
      displayName: (byId.data()?.username as string | undefined)?.trim() || contactName,
      profileImage: (byId.data()?.profile_image as string | undefined)?.trim() || "",
    };
  }

  const rawSlug = contactId.startsWith("influencer-") ? contactId.slice("influencer-".length) : contactId;
  const expectedSlug = toSlug(rawSlug || contactName);

  const usersSnap = await adminDb.collection("users").where("username", "==", expectedSlug).limit(1).get();
  if (!usersSnap.empty) {
    const userDoc = usersSnap.docs[0];
    return {
      uid: userDoc.id,
      displayName: (userDoc.data().username as string | undefined)?.trim() || contactName,
      profileImage: (userDoc.data().profile_image as string | undefined)?.trim() || "",
    };
  }

  const influencerQuery = await adminDb
    .collection("influencers")
    .where("full_name", "==", contactName)
    .limit(1)
    .get();
  const match = influencerQuery.docs[0];

  if (!match) {
    throw new Error("No se encontro el influencer de destino.");
  }

  const targetUid = match.id;
  const targetUserSnap = await adminDb.collection("users").doc(targetUid).get();

  return {
    uid: targetUid,
    displayName:
      (targetUserSnap.data()?.username as string | undefined)?.trim() ||
      ((match.data().full_name as string | undefined)?.trim() ?? contactName),
    profileImage: (targetUserSnap.data()?.profile_image as string | undefined)?.trim() || "",
  };
}

export async function POST(request: NextRequest) {
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

    const body = (await request.json()) as RequestBody;
    const briefId = body.briefId?.trim();
    const contactId = body.contactId?.trim();
    const contactName = body.contactName?.trim();

    if (!briefId || !contactId || !contactName) {
      return NextResponse.json({ error: "Payload invalido" }, { status: 400 });
    }

    const { adminDb } = getAdminServices();
    const senderUserSnap = await adminDb.collection("users").doc(uid).get();
    if (!senderUserSnap.exists || senderUserSnap.data()?.role !== "company") {
      return NextResponse.json({ error: "Solo las empresas pueden enviar briefs." }, { status: 403 });
    }

    const target = await resolveContact(adminDb, contactId, contactName);
    if (target.uid === uid) {
      return NextResponse.json({ error: "No puedes enviarte mensajes a ti mismo." }, { status: 400 });
    }

    const senderName =
      (senderUserSnap.data()?.username as string | undefined)?.trim() || `Usuario ${uid.slice(0, 6)}`;
    const senderProfileImage = (senderUserSnap.data()?.profile_image as string | undefined)?.trim() || "";

    const companyRef = adminDb.collection("companies").doc(uid);
    const briefRef = adminDb.collection("campaign_briefs").doc(briefId);
    const chatId = createRoomId(uid, target.uid);
    const chatRef = adminDb.collection("chats").doc(chatId);
    const messageRef = chatRef.collection("messages").doc();

    const result = await adminDb.runTransaction(async (tx) => {
      const [companySnap, briefSnap, chatSnap] = await Promise.all([
        tx.get(companyRef),
        tx.get(briefRef),
        tx.get(chatRef),
      ]);

      if (!companySnap.exists) {
        throw new Error("No se encontro el perfil de empresa.");
      }

      const credits = typeof companySnap.data()?.credits === "number" ? companySnap.data()!.credits : 100;
      if (credits < 1) {
        throw new Error("Saldo insuficiente. Necesitas al menos $1 para enviar un brief.");
      }

      if (!briefSnap.exists) {
        throw new Error("El brief seleccionado no existe.");
      }

      const briefData = briefSnap.data() as BriefPayload;
      if (briefData.company_id !== uid) {
        throw new Error("No autorizado para enviar este brief.");
      }

      const briefText = buildBriefMessage(briefData);
      const existingUnread = (chatSnap.data()?.unread_counts as Record<string, number> | undefined) ?? {};
      const nextUnreadForTarget = (existingUnread[target.uid] ?? 0) + 1;

      if (!chatSnap.exists) {
        tx.set(chatRef, {
          participants: [uid, target.uid],
          participant_names: {
            [uid]: senderName,
            [target.uid]: target.displayName,
          },
          participant_images: {
            [uid]: senderProfileImage,
            [target.uid]: target.profileImage,
          },
          is_unlocked: true,
          last_message: briefText,
          last_sender_id: uid,
          unread_counts: {
            [uid]: 0,
            [target.uid]: nextUnreadForTarget,
          },
          updated_at: adminServerTimestamp(),
        });
      } else {
        const participants = (chatSnap.data()?.participants as string[] | undefined) ?? [];
        if (!participants.includes(uid)) {
          throw new Error("No autorizado en este chat.");
        }

        tx.set(
          chatRef,
          {
            last_message: briefText,
            last_sender_id: uid,
            unread_counts: {
              ...existingUnread,
              [uid]: 0,
              [target.uid]: nextUnreadForTarget,
            },
            updated_at: adminServerTimestamp(),
            participant_names: {
              [uid]: senderName,
              [target.uid]: target.displayName,
            },
            participant_images: {
              [uid]: senderProfileImage,
              [target.uid]: target.profileImage,
            },
          },
          { merge: true }
        );
      }

      tx.set(messageRef, {
        sender_id: uid,
        sender_name: senderName,
        sender_profile_image: senderProfileImage,
        text: briefText,
        timestamp: adminServerTimestamp(),
      });

      const creditsRemaining = Number((credits - 1).toFixed(2));
      tx.set(
        companyRef,
        {
          credits: creditsRemaining,
          updated_at: adminServerTimestamp(),
        },
        { merge: true }
      );

      return {
        chatId,
        contactId: target.uid,
        contactName: target.displayName,
        creditsRemaining,
      };
    });

    return NextResponse.json({
      ok: true,
      ...result,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error interno" },
      { status: 500 }
    );
  }
}
