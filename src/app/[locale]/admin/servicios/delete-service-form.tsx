"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteService } from "@/actions/services";
import { useRouter } from "next/navigation";

export function DeleteServiceForm({
  serviceId,
  serviceName,
}: {
  serviceId: string;
  serviceName: string;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleDelete() {
    if (!confirm(`¿Eliminar el servicio "${serviceName}"? Esta acción no se puede deshacer.`)) return;
    startTransition(async () => {
      await deleteService(serviceId);
      router.refresh();
    });
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={handleDelete}
      disabled={isPending}
      className="text-red-600 hover:text-red-700 hover:bg-red-50"
      aria-label={`Eliminar ${serviceName}`}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}
