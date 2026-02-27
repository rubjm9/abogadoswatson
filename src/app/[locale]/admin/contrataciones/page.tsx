import { Link } from "@/navigation";
import { getContrataciones } from "@/actions/services";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default async function AdminContratacionesPage() {
  const contrataciones = await getContrataciones();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Contrataciones</h2>
          <p className="text-slate-500">Pedidos de servicios (web y manuales).</p>
        </div>
        <Button asChild variant="brown">
          <Link href="/admin/contrataciones/nueva">
            <Plus className="mr-2 h-4 w-4" /> Nueva contratación
          </Link>
        </Button>
      </div>

      <div className="rounded-md border border-slate-200 bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fecha</TableHead>
              <TableHead>Servicio</TableHead>
              <TableHead>Email / Cliente</TableHead>
              <TableHead>Importe</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Expediente</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contrataciones.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-slate-500 py-8">
                  No hay contrataciones.
                </TableCell>
              </TableRow>
            ) : (
              contrataciones.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="text-slate-600">
                    {new Date(c.created_at).toLocaleDateString("es-ES", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="font-medium">{c.service_name}</TableCell>
                  <TableCell>{c.email ?? "—"}</TableCell>
                  <TableCell>{Number(c.amount).toFixed(2)} €</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        c.status === "PAID"
                          ? "bg-green-100 text-green-800"
                          : c.status === "PENDING"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-slate-100 text-slate-800"
                      }`}
                    >
                      {c.status === "PAID" ? "Pagado" : c.status === "PENDING" ? "Pendiente" : "Cancelado"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    {c.case_id ? (
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/admin/expedientes/${c.case_id}`}>Ver expediente</Link>
                      </Button>
                    ) : (
                      <span className="text-slate-400 text-sm">—</span>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
