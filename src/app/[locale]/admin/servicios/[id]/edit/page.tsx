import { Link } from "@/navigation";
import { notFound } from "next/navigation";
import { getServiceById } from "@/actions/services";
import { ServiceForm } from "../../service-form";
import { updateServiceFromForm } from "@/actions/services";
import { RequirementsSection } from "../requirements-section";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function EditServicioPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = await getServiceById(id);
  if (!service) notFound();

  const boundUpdateAction = updateServiceFromForm.bind(null, id);

  return (
    <div className="space-y-8">
      <header className="border-b border-slate-200 pb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/servicios" className="flex items-center gap-1 text-slate-600 hover:text-slate-900">
            <ChevronLeft className="h-4 w-4" /> Volver a servicios
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight mt-2 text-slate-900">Editar servicio</h1>
        <p className="text-slate-500 mt-1">{service.name}</p>
      </header>
      <ServiceForm action={boundUpdateAction} service={service} />
      <RequirementsSection serviceId={id} />
    </div>
  );
}
