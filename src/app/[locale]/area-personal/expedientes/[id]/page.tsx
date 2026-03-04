import { notFound } from "next/navigation";
import { getExpedienteForClient } from "@/actions/area-personal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { ChevronLeft } from "lucide-react";
import { DocumentUploadZone } from "./document-upload-zone";
import { FormSlot } from "./form-slot";

export default async function AreaPersonalExpedientePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getExpedienteForClient(id);
  if (!result.success || !result.data) notFound();
  const { data } = result;

  return (
    <div className="space-y-8">
      <div>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/area-personal" className="flex items-center gap-1 text-slate-600">
            <ChevronLeft className="h-4 w-4" /> Volver
          </Link>
        </Button>
        <h2 className="text-3xl font-bold tracking-tight mt-2">{data.title}</h2>
        <p className="text-slate-500 mt-1">
          {data.service?.name && `Servicio: ${data.service.name}`}
          {data.service?.name && " · "}
          Estado: {data.status}
        </p>
      </div>

      {data.requirements && data.requirements.length > 0 ? (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Documentos y formularios requeridos</h3>
          {data.requirements.map((req) => (
            <Card key={req.id}>
              <CardHeader>
                <CardTitle className="text-base">{req.label}</CardTitle>
                <p className="text-sm text-slate-500">
                  {req.type === "document" ? "Sube el archivo" : "Rellena el formulario"}
                </p>
              </CardHeader>
              <CardContent>
                {req.type === "document" ? (
                  <DocumentUploadZone
                    caseId={id}
                    slotLabel={req.label}
                    existingDoc={data.documents?.find((d) => d.slot_label === req.label)}
                  />
                ) : (
                  <FormSlot
                    caseId={id}
                    slotLabel={req.label}
                    formSchema={req.form_schema}
                    existingData={data.formData?.find((f) => f.slot_label === req.label)?.form_data}
                  />
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-8">
            <p className="text-slate-500 text-center">
              Este expediente no tiene requisitos de documentos definidos.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
