import { Link } from "@/navigation";
import { notFound } from "next/navigation";
import { getCaseById } from "@/actions/cases";
import { getServiceForCase } from "@/actions/services";
import { getRequirementsByServiceId } from "@/actions/service-requirements";
import { findFormDataByCaseId } from "@/lib/db/case-form-data";
import { Button } from "@/components/ui/button";
import { ChevronLeft, FileCheck, FileText } from "lucide-react";

export default async function AdminExpedienteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getCaseById(id);
  if (!result.success || !result.data) notFound();
  const caseItem = result.data;
  const service = await getServiceForCase(id);
  const requirements = service ? await getRequirementsByServiceId(service.id) : [];
  const formDataList = await findFormDataByCaseId(id);

  return (
    <div className="space-y-8">
      <div>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/expedientes" className="flex items-center gap-1 text-slate-600">
            <ChevronLeft className="h-4 w-4" /> Volver a expedientes
          </Link>
        </Button>
        <h2 className="text-3xl font-bold tracking-tight mt-2">{caseItem.title}</h2>
        <p className="text-slate-500 mt-1">
          Cliente: {caseItem.client ? `${caseItem.client.firstName} ${caseItem.client.lastName}` : "—"}
          {caseItem.client?.email && ` · ${caseItem.client.email}`}
        </p>
      </div>
      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <dl className="grid gap-2 text-sm">
          <div>
            <dt className="font-medium text-slate-500">Estado</dt>
            <dd>{caseItem.status}</dd>
          </div>
          {caseItem.description && (
            <div>
              <dt className="font-medium text-slate-500">Descripción</dt>
              <dd className="text-slate-700 whitespace-pre-wrap">{caseItem.description}</dd>
            </div>
          )}
        </dl>
      </div>

      {requirements.length > 0 && (
        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <h3 className="text-lg font-semibold mb-4">Documentos y formularios del cliente</h3>
          <div className="space-y-4">
            {requirements.map((req) => {
              const doc = caseItem.documents?.find((d) => d.slot_label === req.label);
              const formData = formDataList.find((f) => f.slot_label === req.label);
              const hasDoc = !!doc;
              const hasForm = !!formData;
              const completed = req.type === "document" ? hasDoc : hasForm;
              return (
                <div key={req.id} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                  <div className="flex items-center gap-2">
                    {req.type === "document" ? (
                      <FileText className="h-4 w-4 text-slate-500" />
                    ) : (
                      <FileCheck className="h-4 w-4 text-slate-500" />
                    )}
                    <span>{req.label}</span>
                  </div>
                  <span
                    className={`text-sm ${completed ? "text-green-600" : "text-slate-400"}`}
                  >
                    {req.type === "document" ? (
                      hasDoc ? (
                        <a href={doc!.url} target="_blank" rel="noopener noreferrer" className="underline">
                          Ver documento
                        </a>
                      ) : (
                        "Pendiente"
                      )
                    ) : hasForm ? (
                      <details className="inline">
                        <summary className="cursor-pointer underline">Completado</summary>
                        <pre className="mt-2 text-xs bg-slate-50 p-2 rounded max-w-md overflow-auto">
                          {JSON.stringify(formData.form_data, null, 2)}
                        </pre>
                      </details>
                    ) : (
                      "Pendiente"
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
