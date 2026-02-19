import { Link } from "@/navigation";
import { notFound } from "next/navigation";
import { getServiceById } from "@/actions/services";
import { ServiceForm } from "../../service-form";
import { updateServiceFromForm } from "@/actions/services";
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
      <div>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/servicios" className="flex items-center gap-1 text-slate-600">
            <ChevronLeft className="h-4 w-4" /> Volver a servicios
          </Link>
        </Button>
        <h2 className="text-3xl font-bold tracking-tight mt-2">Editar servicio</h2>
        <p className="text-slate-500">{service.name}</p>
      </div>
      <ServiceForm action={boundUpdateAction} service={service} />
    </div>
  );
}
