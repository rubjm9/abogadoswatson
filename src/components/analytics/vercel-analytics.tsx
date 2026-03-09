"use client";

import { Analytics } from "@vercel/analytics/next";

/**
 * Carga Vercel Analytics solo cuando tiene sentido (Vercel define NEXT_PUBLIC_VERCEL=1).
 * En Hostinger u otro hosting no se carga, evitando 404 en /_vercel/insights/script.js.
 * En Vercel: en Project Settings → Environment Variables añade NEXT_PUBLIC_VERCEL=1 si no está.
 */
export function VercelAnalytics() {
  if (process.env.NEXT_PUBLIC_VERCEL !== "1") {
    return null;
  }
  return <Analytics />;
}
