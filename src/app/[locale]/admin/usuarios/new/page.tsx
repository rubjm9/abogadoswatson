import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { NuevoUsuarioForm } from "../nuevo-usuario-form";

export default function AdminNuevoUsuarioPage() {
  return (
    <div className="space-y-8">
      <header className="border-b border-slate-200 pb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/usuarios" className="flex items-center gap-1 text-slate-600 hover:text-slate-900">
            <ChevronLeft className="h-4 w-4" /> Volver a usuarios
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight mt-2 text-slate-900">Nuevo usuario</h1>
        <p className="text-slate-500 mt-1">Crea un usuario con email, contraseña y rol.</p>
      </header>
      <NuevoUsuarioForm />
    </div>
  );
}
