"use server";

import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { findCasesByClientEmail } from "@/lib/db/cases";
import { findCaseById } from "@/lib/db/cases";
import { findClientByEmail } from "@/lib/db/clients";
import { getServiceForCase } from "@/actions/services";
import { getRequirementsByServiceId } from "@/actions/service-requirements";
import { findDocumentsByCaseId } from "@/lib/db/documents";
import { findFormDataByCaseId } from "@/lib/db/case-form-data";
import { insertDocument } from "@/lib/db/documents";
import { upsertFormData } from "@/lib/db/case-form-data";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const CLIENT_DOCS_BUCKET = "client-documents";

export type ExpedienteWithProgress = Awaited<ReturnType<typeof findCasesByClientEmail>>[number] & {
  progressCompleted: number;
  progressTotal: number;
};

export async function getMyExpedientes() {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) return { success: false as const, error: "No autenticado", data: [] };
  try {
    const cases = await findCasesByClientEmail(email);
    const withProgress: ExpedienteWithProgress[] = [];
    for (const c of cases) {
      const expResult = await getExpedienteForClient(c.id);
      const requirements = expResult.success && expResult.data ? expResult.data.requirements ?? [] : [];
      const documents = expResult.success && expResult.data ? expResult.data.documents ?? [] : [];
      const formData = expResult.success && expResult.data ? expResult.data.formData ?? [] : [];
      const total = requirements.length;
      const completed = requirements.filter((r) => {
        if (r.type === "document") return documents.some((d) => d.slot_label === r.label);
        return formData.some((f) => f.slot_label === r.label);
      }).length;
      withProgress.push({ ...c, progressCompleted: completed, progressTotal: total });
    }
    return { success: true as const, data: withProgress };
  } catch (e) {
    return { success: false as const, error: (e as Error).message, data: [] };
  }
}

export async function getExpedienteForClient(caseId: string) {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) return { success: false, error: "No autenticado" };
  const client = await findClientByEmail(email);
  if (!client) return { success: false, error: "Cliente no encontrado" };
  const caseItem = await findCaseById(caseId);
  if (!caseItem) return { success: false, error: "Expediente no encontrado" };
  if (caseItem.clientId !== client.id) return { success: false, error: "No autorizado" };
  const service = await getServiceForCase(caseId);
  const [requirements, documents, formData] = await Promise.all([
    service ? getRequirementsByServiceId(service.id) : Promise.resolve([]),
    findDocumentsByCaseId(caseId),
    findFormDataByCaseId(caseId),
  ]);
  return {
    success: true,
    data: {
      ...caseItem,
      service,
      requirements,
      documents,
      formData,
    },
  };
}

export async function uploadDocumentForCase(
  caseId: string,
  slotLabel: string,
  file: File
): Promise<{ success: true } | { success: false; error: string }> {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) return { success: false, error: "No autenticado" };
  const client = await findClientByEmail(email);
  if (!client) return { success: false, error: "Cliente no encontrado" };
  const caseItem = await findCaseById(caseId);
  if (!caseItem || caseItem.clientId !== client.id) return { success: false, error: "No autorizado" };

  try {
    const supabase = createServerSupabaseClient();
    const ext = file.name.split(".").pop() || "pdf";
    const path = `${caseId}/${slotLabel.replace(/\s+/g, "-")}-${Date.now()}.${ext}`;
    const buf = await file.arrayBuffer();
    const { error: uploadError } = await supabase.storage
      .from(CLIENT_DOCS_BUCKET)
      .upload(path, buf, { contentType: file.type, upsert: false });
    if (uploadError) return { success: false, error: uploadError.message };
    const { data: urlData } = supabase.storage.from(CLIENT_DOCS_BUCKET).getPublicUrl(path);
    await insertDocument({
      title: slotLabel,
      url: urlData.publicUrl,
      type: "EVIDENCE",
      caseId,
      slot_label: slotLabel,
    });
    revalidatePath(`/area-personal/expedientes/${caseId}`);
    return { success: true };
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
}

export async function saveFormData(
  caseId: string,
  slotLabel: string,
  formData: Record<string, unknown>
): Promise<{ success: true } | { success: false; error: string }> {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) return { success: false, error: "No autenticado" };
  const client = await findClientByEmail(email);
  if (!client) return { success: false, error: "Cliente no encontrado" };
  const caseItem = await findCaseById(caseId);
  if (!caseItem || caseItem.clientId !== client.id) return { success: false, error: "No autorizado" };

  try {
    await upsertFormData(caseId, slotLabel, formData);
    revalidatePath(`/area-personal/expedientes/${caseId}`);
    revalidatePath("/area-personal");
    return { success: true };
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
}
