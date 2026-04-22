import { NextRequest, NextResponse } from "next/server";
import {
  adminServerTimestamp,
  getAdminServices,
  getMissingFirebaseAdminEnv,
  isFirebaseAdminConfigured,
} from "@/shared/lib/firebase-admin";

type RequestBody = {
  campaignName?: string;
  context?: string;
  objectives?: string;
  timeline?: string;
  targetAudience?: string;
  resources?: string;
};

type BriefRow = {
  id: string;
  campaignName: string;
  context: string;
  objectives: string;
  timeline: string;
  targetAudience: string;
  resources: string;
  createdAtLabel: string;
  createdAtMs: number;
};

function formatDateLabel(value: Date) {
  return value.toLocaleString("es-MX", {
    day: "2-digit",
    month: "short",
    year: "numeric",
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

async function assertCompanyUser(adminDb: FirebaseFirestore.Firestore, uid: string) {
  const userSnap = await adminDb.collection("users").doc(uid).get();
  if (!userSnap.exists || userSnap.data()?.role !== "company") {
    throw new Error("Solo las cuentas de empresa pueden gestionar briefs.");
  }
}

function readCompanyCredits(data: FirebaseFirestore.DocumentData | undefined) {
  return typeof data?.credits === "number" ? data.credits : null;
}

function toBriefRow(id: string, data: FirebaseFirestore.DocumentData): BriefRow {
  const createdAtDate = data.created_at?.toDate ? data.created_at.toDate() : new Date(0);
  const createdAtMs = createdAtDate.getTime();

  return {
    id,
    campaignName: (data.campaign_name as string | undefined)?.trim() ?? "",
    context: (data.context as string | undefined)?.trim() ?? "",
    objectives: (data.objectives as string | undefined)?.trim() ?? "",
    timeline: (data.timeline as string | undefined)?.trim() ?? "",
    targetAudience: (data.target_audience as string | undefined)?.trim() ?? "",
    resources: (data.resources as string | undefined)?.trim() ?? "",
    createdAtMs,
    createdAtLabel: createdAtMs > 0 ? formatDateLabel(createdAtDate) : "Sin fecha",
  };
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

    const { adminDb } = getAdminServices();
    await assertCompanyUser(adminDb, uid);

    const [companySnap, briefsSnap] = await Promise.all([
      adminDb.collection("companies").doc(uid).get(),
      adminDb.collection("campaign_briefs").where("company_id", "==", uid).get(),
    ]);

    const rows = briefsSnap.docs
      .map((doc) => toBriefRow(doc.id, doc.data()))
      .sort((a, b) => b.createdAtMs - a.createdAtMs);

    const rawCredits = readCompanyCredits(companySnap.data());
    const shouldBootstrapCredits = rawCredits === null || (rawCredits === 0 && briefsSnap.empty);
    const credits = shouldBootstrapCredits ? 100 : rawCredits;

    if (shouldBootstrapCredits) {
      await adminDb.collection("companies").doc(uid).set(
        {
          credits: 100,
          updated_at: adminServerTimestamp(),
        },
        { merge: true }
      );
    }

    return NextResponse.json({
      ok: true,
      credits,
      rows,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error interno" },
      { status: 500 }
    );
  }
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

    const { adminDb } = getAdminServices();
    await assertCompanyUser(adminDb, uid);

    const body = (await request.json()) as RequestBody;

    const campaignName = body.campaignName?.trim() ?? "";
    const context = body.context?.trim() ?? "";
    const objectives = body.objectives?.trim() ?? "";
    const timeline = body.timeline?.trim() ?? "";
    const targetAudience = body.targetAudience?.trim() ?? "";
    const resources = body.resources?.trim() ?? "";

    if (!campaignName || !context || !objectives || !timeline || !targetAudience || !resources) {
      return NextResponse.json(
        { error: "Completa los 5 pasos del brief antes de guardarlo." },
        { status: 400 }
      );
    }

    const briefRef = adminDb.collection("campaign_briefs").doc();
    await briefRef.set({
      company_id: uid,
      campaign_name: campaignName,
      context,
      objectives,
      timeline,
      target_audience: targetAudience,
      resources,
      created_at: adminServerTimestamp(),
      updated_at: adminServerTimestamp(),
    });

    const now = new Date();
    const brief: BriefRow = {
      id: briefRef.id,
      campaignName,
      context,
      objectives,
      timeline,
      targetAudience,
      resources,
      createdAtMs: now.getTime(),
      createdAtLabel: formatDateLabel(now),
    };

    return NextResponse.json({
      ok: true,
      brief,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error interno" },
      { status: 500 }
    );
  }
}
