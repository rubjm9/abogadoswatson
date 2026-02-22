"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  const [state, formAction] = useActionState(action, {});

  return (
    <form action={formAction} className="max-w-xl">
      {state?.error && (
        <div className="mb-6 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </div>
      )}
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <div className="space-y-6">
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
            <Label htmlFor="summary">Resumen</Label>
            <Textarea
              id="summary"
              name="summary"
              rows={2}
              defaultValue={service?.summary ?? ""}
              placeholder="Una línea o dos para mostrar bajo el título en la página del servicio"
              className="resize-y"
            />
            <p className="text-xs text-slate-500">
              Texto breve que aparece bajo el título en la página del servicio.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              name="description"
              rows={5}
              defaultValue={service?.description ?? ""}
              placeholder="Descripción detallada del servicio para la sección de contenido"
              className="resize-y"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Imagen</Label>
            <Input id="image" name="image" type="file" accept="image/*" />
            {isEdit && service?.image_url && (
              <div className="mt-2 flex items-center gap-3">
                <div className="relative h-20 w-28 overflow-hidden rounded-md border border-slate-200 bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={service.image_url}
                    alt={service.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="text-xs text-slate-500">
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
              </div>
            )}
            {!isEdit && (
              <p className="text-xs text-slate-500">
                Recomendado: imagen horizontal, mínimo 1200×600 px.
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
        </div>
        <div className="mt-8">
          <Button type="submit" variant="brown" className="w-full sm:w-auto">
            {isEdit ? "Guardar cambios" : "Crear servicio"}
          </Button>
        </div>
      </div>
    </form>
  );
}
