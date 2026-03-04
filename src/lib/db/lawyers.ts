import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { LawyerRow } from "@/lib/db-types";
import { createId } from "@paralleldrive/cuid2";

function getClient() {
  return createServerSupabaseClient();
}

export async function findLawyers(): Promise<LawyerRow[]> {
  const supabase = getClient();
  const { data, error } = await supabase
    .from("Lawyer")
    .select("*")
    .order("createdAt", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as LawyerRow[];
}

export async function findLawyerById(id: string): Promise<LawyerRow | null> {
  const supabase = getClient();
  const { data, error } = await supabase.from("Lawyer").select("*").eq("id", id).maybeSingle();
  if (error) throw new Error(error.message);
  return data as LawyerRow | null;
}

export async function findLawyerByEmail(email: string): Promise<LawyerRow | null> {
  const supabase = getClient();
  const { data, error } = await supabase
    .from("Lawyer")
    .select("*")
    .eq("email", email.trim().toLowerCase())
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data as LawyerRow | null;
}

export async function insertLawyer(data: {
  firstName: string;
  lastName: string;
  email: string;
  specialty?: string | null;
}): Promise<LawyerRow> {
  const supabase = getClient();
  const id = createId();
  const row = {
    id,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email.trim().toLowerCase(),
    specialty: data.specialty ?? null,
  };
  const { data: inserted, error } = await supabase.from("Lawyer").insert(row).select().single();
  if (error) throw new Error(error.message);
  return inserted as LawyerRow;
}

export async function updateLawyer(
  id: string,
  data: Partial<{
    firstName: string;
    lastName: string;
    email: string;
    specialty: string | null;
  }>
): Promise<LawyerRow> {
  const supabase = getClient();
  const update: Record<string, unknown> = { ...data, updatedAt: new Date().toISOString() };
  if (data.email) update.email = data.email.trim().toLowerCase();
  const { data: updated, error } = await supabase.from("Lawyer").update(update).eq("id", id).select().single();
  if (error) throw new Error(error.message);
  return updated as LawyerRow;
}

export async function deleteLawyer(id: string): Promise<void> {
  const supabase = getClient();
  const { error } = await supabase.from("Lawyer").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
