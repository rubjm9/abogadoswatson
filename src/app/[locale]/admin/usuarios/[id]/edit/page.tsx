import { Link } from "@/navigation";
import { notFound } from "next/navigation";
import { getUserById } from "@/actions/users";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { EditarUsuarioForm } from "../editar-usuario-form";

export default async function AdminEditarUsuarioPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getUserById(id);
  if (!result.success || !result.data) notFound();
  const user = result.data;

  return (
    <div className="space-y-8">
      <header className="border-b border-slate-200 pb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/usuarios" className="flex items-center gap-1 text-slate-600 hover:text-slate-900">
            <ChevronLeft className="h-4 w-4" /> Volver a usuarios
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight mt-2 text-slate-900">Editar usuario</h1>
        <p className="text-slate-500 mt-1">{user.email}</p>
      </header>
      <EditarUsuarioForm user={user} />
    </div>
  );
}
