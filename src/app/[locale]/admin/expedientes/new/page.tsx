import { redirect } from "next/navigation";

/** Los expedientes se crean desde Contrataciones (nueva contratación). */
export default function AdminNewExpedientePage() {
  redirect("/admin/contrataciones/nueva");
}
