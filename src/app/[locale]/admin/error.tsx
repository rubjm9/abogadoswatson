"use client";

import { useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <div className="flex w-full max-w-md flex-col items-center gap-6 text-center">
        <div className="bg-red-50 p-4 rounded-full">
          <AlertCircle className="h-8 w-8 text-red-600" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Algo salió mal</h3>
          <p className="text-sm text-slate-500">
            No se pudieron cargar los datos. Por favor intente nuevamente.
          </p>
        </div>
        <Button onClick={() => reset()}>Intentar de nuevo</Button>
      </div>
    </div>
  );
}
