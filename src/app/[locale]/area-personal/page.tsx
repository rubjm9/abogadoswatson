import { getMyExpedientes } from "@/actions/area-personal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { Briefcase } from "lucide-react";

export default async function AreaPersonalPage() {
  const result = await getMyExpedientes();
  const cases = result.success ? result.data : [];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Mi área personal</h2>
        <p className="text-slate-500">Tus expedientes y documentos.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mis expedientes</CardTitle>
          <p className="text-sm text-slate-500">
            Aquí aparecen los expedientes asociados a tus contrataciones.
          </p>
        </CardHeader>
        <CardContent>
          {cases.length === 0 ? (
            <p className="text-slate-500 py-8 text-center">
              No tienes expedientes aún. Cuando contrates un servicio, aparecerá aquí.
            </p>
          ) : (
            <div className="space-y-4">
              {cases.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4"
                >
                  <div className="flex items-center gap-3">
                    <Briefcase className="h-5 w-5 text-slate-500" />
                    <div>
                      <p className="font-medium">{c.title}</p>
                      <p className="text-sm text-slate-500">
                        Estado: {c.status}
                        {"progressTotal" in c && c.progressTotal > 0
                          ? ` · Progreso: ${c.progressCompleted}/${c.progressTotal} requisitos`
                          : ""}
                      </p>
                    </div>
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/area-personal/expedientes/${c.id}`}>
                      Ver detalle
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
