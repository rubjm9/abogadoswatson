import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createId } from "@paralleldrive/cuid2";

export type CaseFormDataRow = {
  id: string;
  case_id: string;
  slot_label: string;
  form_data: Record<string, unknown>;
  created_at: string;
  updated_at: string;
};

export async function findFormDataByCaseAndSlot(
  caseId: string,
  slotLabel: string
): Promise<CaseFormDataRow | null> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("case_form_data")
    .select("*")
    .eq("case_id", caseId)
    .eq("slot_label", slotLabel)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data as CaseFormDataRow | null;
}

export async function upsertFormData(
  caseId: string,
  slotLabel: string,
  formData: Record<string, unknown>
): Promise<CaseFormDataRow> {
  const supabase = createServerSupabaseClient();
  const existing = await findFormDataByCaseAndSlot(caseId, slotLabel);
  const now = new Date().toISOString();

  if (existing) {
    const { data, error } = await supabase
      .from("case_form_data")
      .update({ form_data: formData, updated_at: now })
      .eq("id", existing.id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data as CaseFormDataRow;
  }

  const id = createId();
  const { data, error } = await supabase
    .from("case_form_data")
    .insert({
      id,
      case_id: caseId,
      slot_label: slotLabel,
      form_data: formData,
    })
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data as CaseFormDataRow;
}

export async function findFormDataByCaseId(caseId: string): Promise<CaseFormDataRow[]> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("case_form_data")
    .select("*")
    .eq("case_id", caseId);
  if (error) throw new Error(error.message);
  return (data ?? []) as CaseFormDataRow[];
}
