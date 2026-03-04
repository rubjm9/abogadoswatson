"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth-helpers";

export type ServiceRequirementRow = {
  id: string;
  service_id: string;
  type: "document" | "form";
  label: string;
  sort_order: number;
  form_schema: Record<string, unknown> | null;
  created_at: string;
};

export async function getRequirementsByServiceId(
  serviceId: string
): Promise<ServiceRequirementRow[]> {
  const supabase = createServerSupabaseClient();
  // #region agent log
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "MISSING";
  // Solo loguear el host (no keys) para comparar con el dashboard
  fetch('http://127.0.0.1:7244/ingest/6680d23b-a0d9-43b5-91d3-5b41af8bd2a6',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'699ce6'},body:JSON.stringify({sessionId:'699ce6',location:'service-requirements.ts:getRequirementsByServiceId',message:'supabase project URL in use',data:{supabaseUrl},hypothesisId:'wrong-project',timestamp:Date.now()})}).catch(()=>{});
  // #endregion
  const { data, error } = await supabase
    .from("service_requirements")
    .select("*")
    .eq("service_id", serviceId)
    .order("sort_order", { ascending: true });
  // #region agent log
  if (error) {
    fetch('http://127.0.0.1:7244/ingest/6680d23b-a0d9-43b5-91d3-5b41af8bd2a6',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'699ce6'},body:JSON.stringify({sessionId:'699ce6',location:'service-requirements.ts:getRequirementsByServiceId',message:'Supabase error loading service_requirements',data:{message:error.message,code:(error as { code?: string }).code,details:(error as { details?: string }).details,serviceId},hypothesisId:'schema-cache',timestamp:Date.now()})}).catch(()=>{});
  }
  // #endregion
  if (error) throw new Error(error.message);
  return (data ?? []) as ServiceRequirementRow[];
}

export async function createRequirement(data: {
  service_id: string;
  type: "document" | "form";
  label: string;
  sort_order?: number;
  form_schema?: Record<string, unknown> | null;
}): Promise<ServiceRequirementRow> {
  await requireAdmin();
  const supabase = createServerSupabaseClient();
  const defaultFormSchema =
    data.type === "form" && !data.form_schema
      ? { fields: [{ name: "valor", label: "Valor", type: "text", required: true }] }
      : data.form_schema ?? null;
  const { data: inserted, error } = await supabase
    .from("service_requirements")
    .insert({
      service_id: data.service_id,
      type: data.type,
      label: data.label,
      sort_order: data.sort_order ?? 0,
      form_schema: defaultFormSchema,
    })
    .select()
    .single();
  if (error) throw new Error(error.message);
  return inserted as ServiceRequirementRow;
}

export async function updateRequirement(
  id: string,
  data: Partial<{
    type: "document" | "form";
    label: string;
    sort_order: number;
    form_schema: Record<string, unknown> | null;
  }>
): Promise<ServiceRequirementRow> {
  await requireAdmin();
  const supabase = createServerSupabaseClient();
  const { data: updated, error } = await supabase
    .from("service_requirements")
    .update(data)
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return updated as ServiceRequirementRow;
}

export async function deleteRequirement(id: string): Promise<void> {
  await requireAdmin();
  const supabase = createServerSupabaseClient();
  const { error } = await supabase.from("service_requirements").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
