/**
 * Script one-off: crea usuario ruben@abogadoswatson.com con contraseña majidibros y rol ADMIN.
 * Ejecutar: npx tsx scripts/create-admin-user.ts
 * Requiere: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY en .env
 */
import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
import { createId } from "@paralleldrive/cuid2";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error("Falta NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function main() {
  const email = "ruben@abogadoswatson.com";
  const password = "majidibros";
  const hashedPassword = await bcrypt.hash(password, 10);

  const { data: existing } = await supabase.from("User").select("id").eq("email", email).maybeSingle();

  if (existing) {
    const { error } = await supabase
      .from("User")
      .update({ password: hashedPassword, role: "ADMIN", updatedAt: new Date().toISOString() })
      .eq("id", existing.id);
    if (error) throw new Error(error.message);
    console.log("Usuario actualizado:", email, "rol: ADMIN");
  } else {
    const id = createId();
    const { error } = await supabase.from("User").insert({
      id,
      email,
      password: hashedPassword,
      role: "ADMIN",
      name: "Ruben",
    });
    if (error) throw new Error(error.message);
    console.log("Usuario creado:", email, "rol: ADMIN");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
