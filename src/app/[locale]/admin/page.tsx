import { getLocale } from "next-intl/server";
import { redirect } from "@/navigation";

export default async function AdminPage() {
  const locale = await getLocale();
  redirect({ href: "/admin/servicios", locale });
}
