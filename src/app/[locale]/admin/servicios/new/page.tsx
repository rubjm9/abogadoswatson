import { Link } from "@/navigation";
import { ServiceForm } from "../service-form";
import { createServiceFromForm } from "@/actions/services";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NewServicioPage() {
  return (
    <div className="space-y-8">
      <div>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/servicios" className="flex items-center gap-1 text-slate-600">
            <ChevronLeft className="h-4 w-4" /> Volver a servicios
          </Link>
        </Button>
        <h2 className="text-3xl font-bold tracking-tight mt-2">Nuevo servicio</h2>
        <p className="text-slate-500">Añade un servicio contratable.</p>
      </div>
      <ServiceForm action={createServiceFromForm} />
    </div>
  );
}
