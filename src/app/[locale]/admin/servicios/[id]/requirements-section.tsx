"use client";

import { useState, useEffect } from "react";
import { getRequirementsByServiceId } from "@/actions/service-requirements";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Plus, Trash2 } from "lucide-react";
import type { ServiceRequirementRow } from "@/actions/service-requirements";

export function RequirementsSection({ serviceId }: { serviceId: string }) {
  const [requirements, setRequirements] = useState<ServiceRequirementRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [newLabel, setNewLabel] = useState("");
  const [newType, setNewType] = useState<"document" | "form">("document");

  useEffect(() => {
    setLoadError(null);
    getRequirementsByServiceId(serviceId)
      .then((r) => {
        setRequirements(r);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error cargando requisitos:", err);
        setLoading(false);
        setLoadError(err instanceof Error ? err.message : "Error al cargar. ¿Ejecutaste la migración 007 en Supabase?");
      });
  }, [serviceId]);

  async function handleAdd() {
    if (!newLabel.trim()) return;
    const { createRequirement } = await import("@/actions/service-requirements");
    await createRequirement({
      service_id: serviceId,
      type: newType,
      label: newLabel.trim(),
      sort_order: requirements.length,
    });
    setNewLabel("");
    const updated = await getRequirementsByServiceId(serviceId);
    setRequirements(updated);
  }

  async function handleDelete(id: string) {
    const { deleteRequirement } = await import("@/actions/service-requirements");
    await deleteRequirement(id);
    setRequirements((prev) => prev.filter((r) => r.id !== id));
  }

  if (loading) return <p className="text-sm text-slate-500">Cargando requisitos...</p>;
  if (loadError) {
    return (
      <Card>
        <CardContent className="py-6">
          <p className="text-sm text-red-600">{loadError}</p>
          <p className="text-xs text-slate-500 mt-2">
            Si ya ejecutaste 007 y <code className="bg-slate-100 px-1 rounded">NOTIFY pgrst, &apos;reload schema&apos;;</code> y sigue fallando, ejecuta la migración 009 (GRANTs) y en Supabase Dashboard reinicia el proyecto: Project Settings &gt; General &gt; Restart project.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Requisitos del servicio</CardTitle>
        <p className="text-sm text-slate-500">
          Documentos y formularios que el cliente debe aportar.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Ej: Fotocopia del DNI"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
          />
          <Select value={newType} onValueChange={(v) => setNewType(v as "document" | "form")}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="document">Documento</SelectItem>
              <SelectItem value="form">Formulario</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleAdd} size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <ul className="space-y-2">
          {requirements.map((r) => (
            <li
              key={r.id}
              className="flex items-center justify-between rounded border border-slate-200 px-3 py-2"
            >
              <span>
                {r.label}{" "}
                <span className="text-xs text-slate-500">({r.type})</span>
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="text-red-600 hover:text-red-700"
                onClick={() => handleDelete(r.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
