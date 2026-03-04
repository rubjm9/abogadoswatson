import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { UserRow } from "@/lib/db-types";
import { createId } from "@paralleldrive/cuid2";

function getClient() {
  return createServerSupabaseClient();
}

export async function findUsers(): Promise<UserRow[]> {
  const supabase = getClient();
  const { data, error } = await supabase
    .from("User")
    .select("*")
    .order("createdAt", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as UserRow[];
}

export async function findUserById(id: string): Promise<UserRow | null> {
  const supabase = getClient();
  const { data, error } = await supabase.from("User").select("*").eq("id", id).maybeSingle();
  if (error) throw new Error(error.message);
  return data as UserRow | null;
}

export async function findUserByEmail(email: string): Promise<UserRow | null> {
  const supabase = getClient();
  const { data, error } = await supabase
    .from("User")
    .select("*")
    .eq("email", email.trim().toLowerCase())
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data as UserRow | null;
}

export async function createUser(data: {
  email: string;
  password: string;
  name?: string | null;
  role?: string;
}): Promise<UserRow> {
  const supabase = getClient();
  const id = createId();
  const row = {
    id,
    email: data.email.trim().toLowerCase(),
    password: data.password,
    name: data.name ?? null,
    role: data.role ?? "CLIENTE",
  };
  const { data: inserted, error } = await supabase.from("User").insert(row).select().single();
  if (error) throw new Error(error.message);
  return inserted as UserRow;
}

export async function upsertUser(data: {
  email: string;
  password: string;
  name?: string | null;
  role?: string;
}): Promise<UserRow> {
  const existing = await findUserByEmail(data.email);
  if (existing) {
    const supabase = getClient();
    const { data: updated, error } = await supabase
      .from("User")
      .update({
        password: data.password,
        name: data.name ?? existing.name,
        role: data.role ?? existing.role,
        updatedAt: new Date().toISOString(),
      })
      .eq("id", existing.id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return updated as UserRow;
  }
  return createUser(data);
}

export async function updateUser(
  id: string,
  data: Partial<{
    name: string | null;
    email: string;
    role: string;
  }>
): Promise<UserRow> {
  const supabase = getClient();
  const update: Record<string, unknown> = { updatedAt: new Date().toISOString() };
  if (data.name !== undefined) update.name = data.name;
  if (data.email !== undefined) update.email = data.email.trim().toLowerCase();
  if (data.role !== undefined) update.role = data.role;
  const { data: updated, error } = await supabase
    .from("User")
    .update(update)
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return updated as UserRow;
}

export async function updateUserPassword(id: string, hashedPassword: string): Promise<void> {
  const supabase = getClient();
  const { error } = await supabase
    .from("User")
    .update({ password: hashedPassword, updatedAt: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);
}

export async function deleteUser(id: string): Promise<void> {
  const supabase = getClient();
  const { error } = await supabase.from("User").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
