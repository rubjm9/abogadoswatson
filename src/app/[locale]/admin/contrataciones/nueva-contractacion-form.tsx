"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createContratacionManual } from "@/actions/contrataciones";

type Service = { id: string; name: string };

export function NuevaContratacionForm({ services }: { services: Service[] }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [serviceId, setServiceId] = useState<string>("");

  async function handleSubmit(formData: FormData) {
    setError(null);
    if (!serviceId) {
      setError("Seleccione un servicio.");
      return;
    }
    const result = await createContratacionManual({
      service_id: serviceId,
      amount: Number(formData.get("amount")),
      email: (formData.get("email") as string)?.trim() ?? "",
      firstName: (formData.get("firstName") as string)?.trim() ?? "",
      lastName: (formData.get("lastName") as string)?.trim() ?? "",
    });
    if (result.success) {
      router.push("/admin/contrataciones");
      router.refresh();
      return;
    }
    setError(result.error);
  }

  return (
    <form action={handleSubmit} className="space-y-6 max-w-xl">
      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="service_id">Servicio</Label>
        <Select name="service_id" required value={serviceId} onValueChange={setServiceId}>
          <SelectTrigger id="service_id">
            <SelectValue placeholder="Seleccione un servicio" />
          </SelectTrigger>
          <SelectContent>
            {services.map((s) => (
              <SelectItem key={s.id} value={s.id}>
                {s.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="amount">Importe (€)</Label>
        <Input
          id="amount"
          name="amount"
          type="number"
          step="0.01"
          min="0"
          required
          placeholder="99.00"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">Nombre del cliente</Label>
          <Input id="firstName" name="firstName" required placeholder="Nombre" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Apellidos del cliente</Label>
          <Input id="lastName" name="lastName" required placeholder="Apellidos" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email del cliente</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          placeholder="cliente@email.com"
        />
        <p className="text-xs text-slate-500">
          Si ya existe un cliente con este email, se reutilizará y se creará el expediente a su nombre.
        </p>
      </div>
      <Button type="submit" variant="brown">
        Crear contratación y expediente
      </Button>
    </form>
  );
}
