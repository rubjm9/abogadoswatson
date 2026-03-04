import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { DocumentRow } from "@/lib/db-types";
import { createId } from "@paralleldrive/cuid2";

function getClient() {
  return createServerSupabaseClient();
}

export async function findDocumentById(id: string): Promise<DocumentRow | null> {
  const supabase = getClient();
  const { data, error } = await supabase.from("Document").select("*").eq("id", id).maybeSingle();
  if (error) throw new Error(error.message);
  return data as DocumentRow | null;
}

export async function findDocumentsByCaseId(caseId: string): Promise<DocumentRow[]> {
  const supabase = getClient();
  const { data, error } = await supabase
    .from("Document")
    .select("*")
    .eq("caseId", caseId)
    .order("createdAt", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as DocumentRow[];
}

export async function insertDocument(data: {
  title: string;
  url: string;
  type?: string;
  caseId: string;
  slot_label?: string | null;
}): Promise<DocumentRow> {
  const supabase = getClient();
  const id = createId();
  const row = {
    id,
    title: data.title,
    url: data.url,
    type: data.type ?? "OTHER",
    caseId: data.caseId,
    slot_label: data.slot_label ?? null,
  };
  const { data: inserted, error } = await supabase.from("Document").insert(row).select().single();
  if (error) throw new Error(error.message);
  return inserted as DocumentRow;
}

export async function deleteDocument(id: string): Promise<void> {
  const supabase = getClient();
  const { error } = await supabase.from("Document").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
