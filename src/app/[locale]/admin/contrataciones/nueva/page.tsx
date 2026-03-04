import { Link } from "@/navigation";
import { getServices } from "@/actions/services";
import { getClients } from "@/actions/clients";
import { getLawyers } from "@/actions/lawyers";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { NuevaContratacionForm } from "../nueva-contractacion-form";

export default async function NuevaContratacionPage() {
  const [services, clientsRes, lawyersRes] = await Promise.all([
    getServices(),
    getClients(),
    getLawyers(),
  ]);
  const clients = clientsRes.success && clientsRes.data ? clientsRes.data : [];
  const lawyers = lawyersRes.success && lawyersRes.data ? lawyersRes.data : [];

  return (
    <div className="space-y-8">
      <div>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/contrataciones" className="flex items-center gap-1 text-slate-600">
            <ChevronLeft className="h-4 w-4" /> Volver a contrataciones
          </Link>
        </Button>
        <h2 className="text-3xl font-bold tracking-tight mt-2">Nueva contratación</h2>
        <p className="text-slate-500 mt-1">
          Registre una contratación (web o pago por otra vía). Se creará un expediente asociado.
        </p>
      </div>
      <div className="rounded-lg border border-slate-200 bg-white p-6 md:p-8">
        <NuevaContratacionForm
          services={services.map((s) => ({ id: s.id, name: s.name, price: Number(s.price) }))}
          clients={clients.map((c) => ({ id: c.id, firstName: c.firstName, lastName: c.lastName, email: c.email, phone: c.phone ?? "", address: c.address ?? "" }))}
          lawyers={lawyers.map((l) => ({ id: l.id, firstName: l.firstName, lastName: l.lastName }))}
        />
      </div>
    </div>
  );
}
