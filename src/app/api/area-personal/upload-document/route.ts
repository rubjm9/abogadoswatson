import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { findClientByEmail } from "@/lib/db/clients";
import { findCaseById } from "@/lib/db/cases";
import { insertDocument } from "@/lib/db/documents";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

const CLIENT_DOCS_BUCKET = "client-documents";
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export async function POST(request: Request) {
  try {
    const session = await auth();
    const email = session?.user?.email;
    if (!email) {
      return NextResponse.json({ success: false, error: "No autenticado" }, { status: 401 });
    }
    const client = await findClientByEmail(email);
    if (!client) {
      return NextResponse.json({ success: false, error: "Cliente no encontrado" }, { status: 403 });
    }

    const formData = await request.formData();
    const caseId = formData.get("caseId") as string | null;
    const slotLabel = formData.get("slotLabel") as string | null;
    const file = formData.get("file") as File | null;

    if (!caseId || !slotLabel || !file || file.size === 0) {
      return NextResponse.json(
        { success: false, error: "Faltan caseId, slotLabel o archivo" },
        { status: 400 }
      );
    }
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: "El archivo no puede superar 10 MB" },
        { status: 400 }
      );
    }

    const caseItem = await findCaseById(caseId);
    if (!caseItem || caseItem.clientId !== client.id) {
      return NextResponse.json({ success: false, error: "No autorizado" }, { status: 403 });
    }

    const supabase = createServerSupabaseClient();
    const ext = file.name.split(".").pop() || "pdf";
    const path = `${caseId}/${slotLabel.replace(/\s+/g, "-")}-${Date.now()}.${ext}`;
    const buf = await file.arrayBuffer();
    const { error: uploadError } = await supabase.storage
      .from(CLIENT_DOCS_BUCKET)
      .upload(path, buf, { contentType: file.type, upsert: false });

    if (uploadError) {
      return NextResponse.json({ success: false, error: uploadError.message }, { status: 500 });
    }

    const { data: urlData } = supabase.storage.from(CLIENT_DOCS_BUCKET).getPublicUrl(path);
    await insertDocument({
      title: slotLabel,
      url: urlData.publicUrl,
      type: "EVIDENCE",
      caseId,
      slot_label: slotLabel,
    });

    revalidatePath(`/area-personal/expedientes/${caseId}`);
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Upload document error:", e);
    return NextResponse.json(
      { success: false, error: e instanceof Error ? e.message : "Error al subir" },
      { status: 500 }
    );
  }
}
