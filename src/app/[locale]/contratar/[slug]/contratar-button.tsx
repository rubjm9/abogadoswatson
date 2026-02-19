"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";

type Props = { slug: string };

export function ContratarButton({ slug }: Props) {
  const locale = useLocale();
  const [loading, setLoading] = useState(false);

  async function handleContratar() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, locale }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al crear la sesión de pago");
      if (data.url) window.location.href = data.url;
      else throw new Error("No se recibió URL de pago");
    } catch (e) {
      alert(e instanceof Error ? e.message : "Error al procesar. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      type="button"
      variant="brown"
      size="lg"
      onClick={handleContratar}
      disabled={loading}
      className="h-14 px-8 font-bold uppercase tracking-widest text-xs"
    >
      {loading ? "Preparando pago…" : "Contratar"}
    </Button>
  );
}
