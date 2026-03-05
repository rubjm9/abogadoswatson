import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

/**
 * Cliente Supabase para uso en el navegador (opcional).
 * Usa la anon key; las políticas RLS protegen los datos. La anon key está
 * diseñada para ser pública; no expone datos por sí sola.
 * Si no usas Supabase en el cliente, no hace falta definir NEXT_PUBLIC_SUPABASE_ANON_KEY.
 */
export function createBrowserSupabaseClient(): SupabaseClient {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Cliente navegador Supabase: define NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY en .env (la anon key es segura para el navegador; RLS protege los datos)."
    );
  }
  return createClient(supabaseUrl, supabaseAnonKey);
}
