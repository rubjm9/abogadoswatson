"use client";

import { useFormState } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ServiceRow } from "@/actions/services";
import type { CreateServiceFormState, UpdateServiceFormState } from "@/actions/services";

type ServiceFormProps = {
  action: (
    prev: CreateServiceFormState | UpdateServiceFormState,
    formData: FormData
  ) => Promise<CreateServiceFormState | UpdateServiceFormState>;
  service?: ServiceRow | null;
};

export function ServiceForm({ action, service }: ServiceFormProps) {
  const isEdit = !!service;
  const [state, formAction] = useFormState(action, {});

  return (
    <form action={formAction} className="space-y-6 max-w-xl">
      {state?.error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
          {state.error}
        </p>
      )}
      <div className="space-y-2">
        <Label htmlFor="name">Nombre</Label>
        <Input
          id="name"
          name="name"
          required
          defaultValue={service?.name}
          placeholder="Ej. Consultoría inicial"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="slug">Slug (URL)</Label>
        <Input
          id="slug"
          name="slug"
          required
          defaultValue={service?.slug}
          placeholder="consultoria-inicial"
        />
        <p className="text-xs text-slate-500">
          Solo minúsculas, números y guiones. Se usa en la URL de contratación.
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Descripción</Label>
        <textarea
          id="description"
          name="description"
          rows={3}
          defaultValue={service?.description ?? ""}
          placeholder="Breve descripción del servicio"
          className="flex w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:border-[#701218] focus-visible:ring-2 focus-visible:ring-[#701218] focus-visible:ring-offset-2"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="image">Imagen</Label>
        <Input id="image" name="image" type="file" accept="image/*" />
        {isEdit && service?.image_url && (
          <p className="text-xs text-slate-500 mt-1">
            Actual:{" "}
            <a
              href={service.image_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#701218] underline"
            >
              Ver imagen
            </a>
            . Deja vacío para mantenerla.
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="price">Precio (€)</Label>
        <Input
          id="price"
          name="price"
          type="number"
          step="0.01"
          min="0"
          required
          defaultValue={service?.price ?? ""}
          placeholder="99.00"
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="active"
          name="active"
          defaultChecked={service?.active ?? true}
          className="h-4 w-4 rounded border-slate-300 text-[#701218] focus:ring-[#701218]"
        />
        <Label htmlFor="active">Servicio activo (visible en la página de contratar)</Label>
      </div>
      <Button type="submit" variant="brown">
        {isEdit ? "Guardar cambios" : "Crear servicio"}
      </Button>
    </form>
  );
}
