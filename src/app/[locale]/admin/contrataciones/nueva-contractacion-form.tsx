"use client";

import { useState, useEffect } from "react";
import { useRouter } from "@/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createContratacionManual } from "@/actions/contrataciones";
import { cn } from "@/lib/utils";

type Service = { id: string; name: string; price: number };
type ClientOption = { id: string; firstName: string; lastName: string; email: string; phone: string; address: string };
type AbogadoOption = { id: string; name: string };

export function NuevaContratacionForm({
  services,
  clients,
  abogados = [],
}: {
  services: Service[];
  clients: ClientOption[];
  abogados?: AbogadoOption[];
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [serviceId, setServiceId] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [clientMode, setClientMode] = useState<"existing" | "new">("new");
  const [selectedClientId, setSelectedClientId] = useState<string>("");
  const [lawyerId, setLawyerId] = useState<string>("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const selectedService = services.find((s) => s.id === serviceId);
  const selectedClient = clients.find((c) => c.id === selectedClientId);

  useEffect(() => {
    if (selectedService != null) {
      setAmount(String(selectedService.price));
    }
  }, [selectedService?.id]);

  useEffect(() => {
    if (clientMode === "existing" && selectedClient) {
      setFirstName(selectedClient.firstName);
      setLastName(selectedClient.lastName);
      setEmail(selectedClient.email);
      setPhone(selectedClient.phone ?? "");
      setAddress(selectedClient.address ?? "");
    } else if (clientMode === "new") {
      setSelectedClientId("");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setAddress("");
    }
  }, [clientMode, selectedClientId, selectedClient]);

  async function handleSubmit(formData: FormData) {
    setError(null);
    if (!serviceId) {
      setError("Seleccione un servicio.");
      return;
    }
    const amt = Number(formData.get("amount"));
    const amtPaid = Number(formData.get("amount_paid"));
    const result = await createContratacionManual({
      service_id: serviceId,
      amount: amt,
      amount_paid: Number.isNaN(amtPaid) ? 0 : Math.max(0, amtPaid),
      lawyer_id: lawyerId || null,
      client_id: clientMode === "existing" && selectedClientId ? selectedClientId : null,
      email: (formData.get("email") as string)?.trim() ?? email,
      firstName: (formData.get("firstName") as string)?.trim() ?? firstName,
      lastName: (formData.get("lastName") as string)?.trim() ?? lastName,
      phone: (formData.get("phone") as string)?.trim() || null,
      address: (formData.get("address") as string)?.trim() || null,
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
        <Select
          name="service_id"
          required
          value={serviceId}
          onValueChange={(v) => {
            setServiceId(v);
            const svc = services.find((s) => s.id === v);
            if (svc != null) setAmount(String(svc.price));
          }}
        >
          <SelectTrigger id="service_id">
            <SelectValue placeholder="Seleccione un servicio" />
          </SelectTrigger>
          <SelectContent>
            {services.map((s) => (
              <SelectItem key={s.id} value={s.id}>
                {s.name}
                {s.price != null && !Number.isNaN(s.price) ? ` — ${Number(s.price).toFixed(2)} €` : ""}
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
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <p className="text-xs text-slate-500">
          Se rellena con el coste del servicio; puede modificarlo para esta contratación.
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="amount_paid">Cantidad abonada (€)</Label>
        <Input
          id="amount_paid"
          name="amount_paid"
          type="number"
          step="0.01"
          min="0"
          placeholder="0.00"
          defaultValue="0"
        />
        <p className="text-xs text-slate-500">Opcional. Para pagos parciales.</p>
      </div>

      <div className="space-y-4 border-t border-slate-200 pt-6">
        <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50/50 p-1">
          <button
            type="button"
            onClick={() => setClientMode("new")}
            className={cn(
              "rounded-md px-4 py-2 text-sm font-medium transition-colors",
              clientMode === "new"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            )}
          >
            Nuevo cliente
          </button>
          <button
            type="button"
            onClick={() => setClientMode("existing")}
            className={cn(
              "rounded-md px-4 py-2 text-sm font-medium transition-colors",
              clientMode === "existing"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            )}
          >
            Cliente existente
          </button>
        </div>
        {clientMode === "existing" && (
          <Select value={selectedClientId} onValueChange={setSelectedClientId}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccione un cliente" />
            </SelectTrigger>
            <SelectContent>
              {clients.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.firstName} {c.lastName} – {c.email}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">Nombre</Label>
          <Input
            id="firstName"
            name="firstName"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Nombre"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Apellidos</Label>
          <Input
            id="lastName"
            name="lastName"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Apellidos"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="cliente@email.com"
        />
        {clientMode === "new" && (
          <p className="text-xs text-slate-500">
            Si ya existe un cliente con este email, se reutilizará y se actualizarán sus datos si los modifica.
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Teléfono</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Opcional"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">Dirección</Label>
        <Textarea
          id="address"
          name="address"
          rows={2}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Opcional"
          className="resize-y"
        />
      </div>

      <div className="space-y-2 border-t border-slate-200 pt-6">
        <Label htmlFor="lawyer_id">Abogado asignado</Label>
        <Select name="lawyer_id" value={lawyerId || "__none__"} onValueChange={(v) => setLawyerId(v === "__none__" ? "" : v)}>
          <SelectTrigger id="lawyer_id" className="w-full sm:w-[280px]">
            <SelectValue placeholder="Ninguno" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="__none__">Ninguno</SelectItem>
            {abogados.map((a) => (
              <SelectItem key={a.id} value={a.id}>
                {a.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-slate-500">
          Opcional. El abogado verá este expediente en su panel.
          {abogados.length === 0 && " No hay usuarios con rol Abogado."}
        </p>
      </div>

      <Button type="submit" variant="brown">
        Crear contratación y expediente
      </Button>
    </form>
  );
}
