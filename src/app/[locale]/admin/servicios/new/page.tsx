import { Link } from "@/navigation";
import { ServiceForm } from "../service-form";
import { createServiceFromForm } from "@/actions/services";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NewServicioPage() {
  return (
    <div className="space-y-8">
      <header className="border-b border-slate-200 pb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/servicios" className="flex items-center gap-1 text-slate-600 hover:text-slate-900">
            <ChevronLeft className="h-4 w-4" /> Volver a servicios
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight mt-2 text-slate-900">Nuevo servicio</h1>
        <p className="text-slate-500 mt-1">Añade un servicio contratable.</p>
      </header>
      <ServiceForm action={createServiceFromForm} />
    </div>
  );
}
