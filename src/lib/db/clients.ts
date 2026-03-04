import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { ClientRow } from "@/lib/db-types";
import { createId } from "@paralleldrive/cuid2";

function getClient() {
  return createServerSupabaseClient();
}

export async function findClients(): Promise<ClientRow[]> {
  const supabase = getClient();
  const { data, error } = await supabase
    .from("Client")
    .select("*")
    .order("createdAt", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as ClientRow[];
}

export async function findClientById(id: string): Promise<ClientRow | null> {
  const supabase = getClient();
  const { data, error } = await supabase.from("Client").select("*").eq("id", id).maybeSingle();
  if (error) throw new Error(error.message);
  return data as ClientRow | null;
}

export async function findClientByEmail(email: string): Promise<ClientRow | null> {
  const supabase = getClient();
  const { data, error } = await supabase
    .from("Client")
    .select("*")
    .eq("email", email.trim().toLowerCase())
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data as ClientRow | null;
}

export async function insertClient(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  address?: string | null;
}): Promise<ClientRow> {
  const supabase = getClient();
  const id = createId();
  const row = {
    id,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email.trim().toLowerCase(),
    phone: data.phone ?? null,
    address: data.address ?? null,
  };
  const { data: inserted, error } = await supabase.from("Client").insert(row).select().single();
  if (error) throw new Error(error.message);
  return inserted as ClientRow;
}

export async function updateClient(
  id: string,
  data: Partial<{
    firstName: string;
    lastName: string;
    email: string;
    phone: string | null;
    address: string | null;
  }>
): Promise<ClientRow> {
  const supabase = getClient();
  const update: Record<string, unknown> = { ...data, updatedAt: new Date().toISOString() };
  if (data.email) update.email = data.email.trim().toLowerCase();
  const { data: updated, error } = await supabase
    .from("Client")
    .update(update)
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return updated as ClientRow;
}

export async function deleteClient(id: string): Promise<void> {
  const supabase = getClient();
  const { error } = await supabase.from("Client").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
