"use client";

import { useRouter } from "@/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateCase } from "@/actions/cases";
import { User, UserX } from "lucide-react";

type AbogadoOption = { id: string; name: string };

export function AssignLawyerBlock({
  caseId,
  currentLawyerId,
  currentLawyerName,
  abogados,
}: {
  caseId: string;
  currentLawyerId: string | null;
  currentLawyerName: string | null;
  abogados: AbogadoOption[];
}) {
  const router = useRouter();
  const [value, setValue] = useState(currentLawyerId || "__none__");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "error"; text: string } | null>(null);

  async function handleAssign() {
    setMessage(null);
    setPending(true);
    const lawyerId = value === "__none__" ? undefined : value;
    const result = await updateCase(caseId, { lawyerId });
    setPending(false);
    if (result.success) {
      setMessage({ type: "ok", text: "Abogado actualizado." });
      router.refresh();
    } else {
      setMessage({ type: "error", text: "No se pudo actualizar." });
    }
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6">
      <h3 className="text-lg font-semibold mb-2">Abogado asignado</h3>
      {currentLawyerName ? (
        <p className="flex items-center gap-2 text-slate-700 mb-4">
          <User className="h-4 w-4 text-slate-500" />
          {currentLawyerName}
        </p>
      ) : (
        <p className="flex items-center gap-2 text-amber-700 text-sm font-medium mb-4">
          <UserX className="h-4 w-4" />
          Sin asignar
        </p>
      )}
      <div className="space-y-2">
        <Label htmlFor="lawyer_select">Asignar o cambiar abogado</Label>
        <div className="flex flex-wrap items-center gap-2">
          <Select value={value} onValueChange={setValue}>
            <SelectTrigger id="lawyer_select" className="w-[220px]">
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
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={handleAssign}
            disabled={pending || value === (currentLawyerId || "__none__")}
          >
            {pending ? "Guardando…" : "Guardar"}
          </Button>
        </div>
        {abogados.length === 0 && (
          <p className="text-xs text-slate-500">No hay usuarios con rol Abogado. Asígneles el rol en Gestionar usuarios.</p>
        )}
        {message && (
          <p className={`text-sm ${message.type === "ok" ? "text-green-600" : "text-red-600"}`}>
            {message.text}
          </p>
        )}
      </div>
    </div>
  );
}
