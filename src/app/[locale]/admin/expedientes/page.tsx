import { Link } from "@/navigation";
import { getCases } from "@/actions/cases";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { UserX, User } from "lucide-react";

export default async function AdminExpedientesPage() {
  const response = await getCases();
  const cases = response.success ? response.data : [];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Expedientes</h2>
        <p className="text-slate-500">
          Servicio, documentos y trámites de cada expediente. Los nuevos expedientes se crean desde Contrataciones.
        </p>
      </div>

      <div className="rounded-md border border-slate-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Abogado asignado</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cases?.map((c) => (
              <TableRow key={c.id}>
                <TableCell className="font-medium">{c.title}</TableCell>
                <TableCell>{c.client ? `${c.client.firstName} ${c.client.lastName}` : "N/A"}</TableCell>
                <TableCell>
                  {c.lawyer ? (
                    <span className="inline-flex items-center gap-1.5 text-slate-700">
                      <User className="h-3.5 w-3.5 text-slate-500" />
                      {c.lawyer.name || c.lawyer.email}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                      <UserX className="h-3.5 w-3.5" />
                      Sin asignar
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      c.status === "OPEN"
                        ? "bg-green-100 text-green-800"
                        : c.status === "IN_PROGRESS"
                          ? "bg-blue-100 text-blue-800"
                          : c.status === "CLOSED"
                            ? "bg-slate-100 text-slate-800"
                            : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {c.status}
                  </span>
                </TableCell>
                <TableCell>{new Date(c.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/admin/expedientes/${c.id}`}>
                      {c.lawyer ? "Ver" : "Asignar"}
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
