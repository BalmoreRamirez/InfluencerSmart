import { NextRequest, NextResponse } from "next/server";
import { adminServerTimestamp, getAdminServices } from "@/shared/lib/firebase-admin";

type RequestBody = {
  chatId?: string;
  contactId: string;
  contactName: string;
  text: string;
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

async function resolveContact(adminDb: FirebaseFirestore.Firestore, contactId: string, contactName: string) {
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

  const usersSnap = await adminDb
    .collection("users")
    .where("username", "==", expectedSlug)
    .limit(1)
    .get();
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
    throw new Error("No se encontró el influencer de destino.");
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
    const contactId = body.contactId?.trim();
    const contactName = body.contactName?.trim();
    const text = body.text?.trim();

    if (!contactId || !contactName || !text) {
      return NextResponse.json({ error: "Payload invalido" }, { status: 400 });
    }

  const target = await resolveContact(adminDb, contactId, contactName);
    if (target.uid === uid) {
      return NextResponse.json({ error: "No puedes enviarte mensajes a ti mismo." }, { status: 400 });
    }

    const chatId = createRoomId(uid, target.uid);

    const chatRef = adminDb.collection("chats").doc(chatId);
    const chatSnap = await chatRef.get();
    const userSnap = await adminDb.collection("users").doc(uid).get();
    const userName = (userSnap.data()?.username as string | undefined)?.trim() || `Usuario ${uid.slice(0, 6)}`;
    const userProfileImage = (userSnap.data()?.profile_image as string | undefined)?.trim() || "";
    const existingUnread = (chatSnap.data()?.unread_counts as Record<string, number> | undefined) ?? {};
    const nextUnreadForTarget = (existingUnread[target.uid] ?? 0) + 1;

    if (!chatSnap.exists) {
      await chatRef.set({
        participants: [uid, target.uid],
        participant_names: {
          [uid]: userName,
          [target.uid]: target.displayName,
        },
        participant_images: {
          [uid]: userProfileImage,
          [target.uid]: target.profileImage,
        },
        is_unlocked: true,
        last_message: text,
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
        return NextResponse.json({ error: "No autorizado en este chat" }, { status: 403 });
      }

      await chatRef.set(
        {
          last_message: text,
          last_sender_id: uid,
          unread_counts: {
            ...existingUnread,
            [uid]: 0,
            [target.uid]: nextUnreadForTarget,
          },
          updated_at: adminServerTimestamp(),
          participant_names: {
            [uid]: userName,
            [target.uid]: target.displayName,
          },
          participant_images: {
            [uid]: userProfileImage,
            [target.uid]: target.profileImage,
          },
        },
        { merge: true }
      );
    }

    await chatRef.collection("messages").add({
      sender_id: uid,
      sender_name: userName,
      sender_profile_image: userProfileImage,
      text,
      timestamp: adminServerTimestamp(),
    });

    return NextResponse.json({
      ok: true,
      chatId,
      contactId: target.uid,
      contactName: target.displayName,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error interno" },
      { status: 500 }
    );
  }
}
