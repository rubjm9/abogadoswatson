"use client";

import Script from "next/script";

const CLIENTIFY_PIXEL_ID = "aU3HoeCdEt0I6E93";
const CLIENTIFY_SCRIPT_URL = `https://analyticsplusdev.clientify.net/analytics_plus/pixel/${CLIENTIFY_PIXEL_ID}`;

/**
 * Clientify CRM analytics. Carga el pixel en todas las páginas con lazyOnload
 * para no bloquear el render ni competir con recursos críticos.
 */
export function ClientifyAnalytics() {
  return (
    <Script
      src={CLIENTIFY_SCRIPT_URL}
      strategy="lazyOnload"
    />
  );
}
