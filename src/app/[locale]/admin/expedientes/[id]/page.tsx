import { Link } from "@/navigation";
import { notFound } from "next/navigation";
import { getCaseById } from "@/actions/cases";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default async function AdminExpedienteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getCaseById(id);
  if (!result.success || !result.data) notFound();
  const caseItem = result.data;

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
    </div>
  );
}
