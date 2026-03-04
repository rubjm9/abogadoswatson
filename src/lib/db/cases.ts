import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { CaseRow, ClientRow, UserRow, DocumentRow, InvoiceRow } from "@/lib/db-types";
import { createId } from "@paralleldrive/cuid2";

function getClient() {
  return createServerSupabaseClient();
}

export type CaseWithRelations = CaseRow & {
  client?: ClientRow | null;
  /** Usuario con rol ABOGADO asignado (Case.lawyerId = User.id). */
  lawyer?: UserRow | null;
  documents?: DocumentRow[];
  invoices?: InvoiceRow[];
};

export async function findCases(): Promise<CaseWithRelations[]> {
  const supabase = getClient();
  const { data: cases, error } = await supabase
    .from("Case")
    .select("*")
    .order("createdAt", { ascending: false });
  if (error) throw new Error(error.message);
  const result: CaseWithRelations[] = [];
  for (const c of cases ?? []) {
    const [clientRes, lawyerRes] = await Promise.all([
      supabase.from("Client").select("*").eq("id", c.clientId).maybeSingle(),
      c.lawyerId ? supabase.from("User").select("*").eq("id", c.lawyerId).maybeSingle() : { data: null },
    ]);
    result.push({
      ...c,
      client: clientRes.data as ClientRow | null,
      lawyer: lawyerRes.data as UserRow | null,
    } as CaseWithRelations);
  }
  return result;
}

export async function findCaseById(id: string): Promise<CaseWithRelations | null> {
  const supabase = getClient();
  const { data: caseItem, error } = await supabase.from("Case").select("*").eq("id", id).maybeSingle();
  if (error) throw new Error(error.message);
  if (!caseItem) return null;
  const [clientRes, lawyerRes, docsRes, invRes] = await Promise.all([
    supabase.from("Client").select("*").eq("id", caseItem.clientId).maybeSingle(),
    caseItem.lawyerId ? supabase.from("User").select("*").eq("id", caseItem.lawyerId).maybeSingle() : { data: null },
    supabase.from("Document").select("*").eq("caseId", id).order("createdAt", { ascending: false }),
    supabase.from("Invoice").select("*").eq("caseId", id),
  ]);
  return {
    ...caseItem,
    client: clientRes.data as ClientRow | null,
    lawyer: lawyerRes.data as UserRow | null,
    documents: (docsRes.data ?? []) as DocumentRow[],
    invoices: (invRes.data ?? []) as InvoiceRow[],
  } as CaseWithRelations;
}

export async function findCasesByClientEmail(email: string): Promise<CaseWithRelations[]> {
  const supabase = getClient();
  const { data: client } = await supabase
    .from("Client")
    .select("id")
    .eq("email", email.trim().toLowerCase())
    .maybeSingle();
  if (!client) return [];
  const { data: cases, error } = await supabase
    .from("Case")
    .select("*")
    .eq("clientId", client.id)
    .order("createdAt", { ascending: false });
  if (error) throw new Error(error.message);
  const result: CaseWithRelations[] = [];
  for (const c of cases ?? []) {
    const [clientRes, lawyerRes] = await Promise.all([
      supabase.from("Client").select("*").eq("id", c.clientId).maybeSingle(),
      c.lawyerId ? supabase.from("User").select("*").eq("id", c.lawyerId).maybeSingle() : { data: null },
    ]);
    result.push({
      ...c,
      client: clientRes.data as ClientRow | null,
      lawyer: lawyerRes.data as UserRow | null,
    } as CaseWithRelations);
  }
  return result;
}

/** Expedientes asignados al usuario (por email) con rol ABOGADO. lawyerId = User.id. */
export async function findCasesByLawyerEmail(email: string): Promise<CaseWithRelations[]> {
  const supabase = getClient();
  const { data: user } = await supabase
    .from("User")
    .select("id")
    .eq("email", email.trim().toLowerCase())
    .maybeSingle();
  if (!user) return [];
  const { data: cases, error } = await supabase
    .from("Case")
    .select("*")
    .eq("lawyerId", user.id)
    .order("createdAt", { ascending: false });
  if (error) throw new Error(error.message);
  const result: CaseWithRelations[] = [];
  for (const c of cases ?? []) {
    const [clientRes, lawyerRes] = await Promise.all([
      supabase.from("Client").select("*").eq("id", c.clientId).maybeSingle(),
      c.lawyerId ? supabase.from("User").select("*").eq("id", c.lawyerId).maybeSingle() : { data: null },
    ]);
    result.push({
      ...c,
      client: clientRes.data as ClientRow | null,
      lawyer: lawyerRes.data as UserRow | null,
    } as CaseWithRelations);
  }
  return result;
}

export async function insertCase(data: {
  title: string;
  description?: string | null;
  status?: string;
  clientId: string;
  lawyerId?: string | null;
}): Promise<CaseRow> {
  const supabase = getClient();
  const id = createId();
  const row = {
    id,
    title: data.title,
    description: data.description ?? null,
    status: data.status ?? "OPEN",
    clientId: data.clientId,
    lawyerId: data.lawyerId ?? null,
  };
  const { data: inserted, error } = await supabase.from("Case").insert(row).select().single();
  if (error) throw new Error(error.message);
  return inserted as CaseRow;
}

export async function updateCase(
  id: string,
  data: Partial<{
    title: string;
    description: string | null;
    status: string;
    clientId: string;
    lawyerId: string | null;
  }>
): Promise<CaseRow> {
  const supabase = getClient();
  const update: Record<string, unknown> = { ...data, updatedAt: new Date().toISOString() };
  if ("lawyerId" in data && data.lawyerId === undefined) update.lawyerId = null;
  const { data: updated, error } = await supabase.from("Case").update(update).eq("id", id).select().single();
  if (error) throw new Error(error.message);
  return updated as CaseRow;
}

export async function deleteCase(id: string): Promise<void> {
  const supabase = getClient();
  const { error } = await supabase.from("Case").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
