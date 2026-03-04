import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { InvoiceRow } from "@/lib/db-types";
import { createId } from "@paralleldrive/cuid2";

function getClient() {
  return createServerSupabaseClient();
}

export async function findInvoicesByClientId(clientId: string): Promise<InvoiceRow[]> {
  const supabase = getClient();
  const { data, error } = await supabase.from("Invoice").select("*").eq("clientId", clientId);
  if (error) throw new Error(error.message);
  return (data ?? []) as InvoiceRow[];
}

export async function findInvoicesByCaseId(caseId: string): Promise<InvoiceRow[]> {
  const supabase = getClient();
  const { data, error } = await supabase
    .from("Invoice")
    .select("*")
    .eq("caseId", caseId)
    .order("createdAt", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as InvoiceRow[];
}

export async function insertInvoice(data: {
  amount: number;
  dueDate: Date;
  paid?: boolean;
  caseId?: string | null;
  clientId: string;
}): Promise<InvoiceRow> {
  const supabase = getClient();
  const id = createId();
  const row = {
    id,
    amount: data.amount,
    dueDate: data.dueDate.toISOString(),
    paid: data.paid ?? false,
    caseId: data.caseId ?? null,
    clientId: data.clientId,
  };
  const { data: inserted, error } = await supabase.from("Invoice").insert(row).select().single();
  if (error) throw new Error(error.message);
  return inserted as InvoiceRow;
}

export async function updateInvoice(
  id: string,
  data: Partial<{
    amount: number;
    dueDate: Date;
    paid: boolean;
    caseId: string | null;
    clientId: string;
  }>
): Promise<InvoiceRow> {
  const supabase = getClient();
  const update: Record<string, unknown> = { ...data, updatedAt: new Date().toISOString() };
  if (data.dueDate) update.dueDate = data.dueDate.toISOString();
  const { data: updated, error } = await supabase.from("Invoice").update(update).eq("id", id).select().single();
  if (error) throw new Error(error.message);
  return updated as InvoiceRow;
}
