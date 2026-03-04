"use client";

import { useState, useEffect } from "react";
import { saveFormData } from "@/actions/area-personal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileCheck } from "lucide-react";

type FormField = {
  name: string;
  label?: string;
  type?: string;
  required?: boolean;
};

type FormSchema = {
  fields?: FormField[];
};

export function FormSlot({
  caseId,
  slotLabel,
  formSchema,
  existingData,
}: {
  caseId: string;
  slotLabel: string;
  formSchema: Record<string, unknown> | null;
  existingData?: Record<string, unknown> | null;
}) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (existingData && typeof existingData === "object") {
      const init: Record<string, string> = {};
      for (const [k, v] of Object.entries(existingData)) {
        if (typeof v === "string") init[k] = v;
        else if (v != null) init[k] = String(v);
      }
      setValues(init);
    }
  }, [existingData]);

  const schema = formSchema as FormSchema | null;
  const fields = schema?.fields ?? [];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const result = await saveFormData(caseId, slotLabel, values);
    setSaving(false);
    if (result.success) {
      setSaved(true);
    } else {
      setError(result.error);
    }
  }

  if (fields.length === 0) {
    return (
      <p className="text-sm text-slate-500">
        Este formulario no tiene campos definidos. Contacta con el administrador.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((f) => (
        <div key={f.name}>
          <Label htmlFor={f.name}>
            {f.label ?? f.name}
            {f.required && " *"}
          </Label>
          {f.type === "textarea" ? (
            <Textarea
              id={f.name}
              value={values[f.name] ?? ""}
              onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))}
              required={f.required}
              className="mt-1"
              rows={3}
            />
          ) : (
            <Input
              id={f.name}
              type={f.type === "email" ? "email" : f.type === "number" ? "number" : "text"}
              value={values[f.name] ?? ""}
              onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))}
              required={f.required}
              className="mt-1"
            />
          )}
        </div>
      ))}
      {saved && (
        <p className="text-sm text-green-600 flex items-center gap-1">
          <FileCheck className="h-4 w-4" /> Guardado
        </p>
      )}
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button type="submit" disabled={saving}>
        {saving ? "Guardando..." : "Guardar"}
      </Button>
    </form>
  );
}
