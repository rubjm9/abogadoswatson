"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, Suspense } from "react";

/** ID de medición GA4 - Abogados Watson. Puede sobreescribirse con NEXT_PUBLIC_GA_MEASUREMENT_ID */
const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-VB1Y316LWW";

const isProduction = process.env.NODE_ENV === "production";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

/** Envía page_view a GA4 en cada cambio de ruta (SPA). */
function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!GA_MEASUREMENT_ID || typeof window.gtag !== "function") return;
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: pathname ?? window.location.pathname,
    });
  }, [pathname]);

  return null;
}

export function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID || !isProduction) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
    </>
  );
}
