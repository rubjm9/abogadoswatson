"use client";

import { useRef, useEffect } from "react";
import { Container } from "@/components/ui/container";
import { useTranslations } from "next-intl";

const TRUSTINDEX_LOADER_URL =
  "https://cdn.trustindex.io/loader.js?64570a466b55384afe8637385ac";

/** Busca el widget de Trustindex en el DOM (suele inyectarse en body). */
function findTrustindexWidget(): Element | null {
  const byClass = document.querySelector(".ti-widget, [class*='trustindex'], [id*='trustindex']");
  if (byClass) return byClass;
  const scripts = document.querySelectorAll("script[src*='trustindex.io']");
  for (const script of scripts) {
    const next = script.nextElementSibling;
    if (next && (next.className?.includes("ti-") || next.id?.includes("trustindex"))) return next;
  }
  return null;
}

export function TrustindexReviews() {
  const t = useTranslations("HomePage");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (container.querySelector("script[data-trustindex]")) return;

    const script = document.createElement("script");
    script.src = TRUSTINDEX_LOADER_URL;
    script.async = true;
    script.defer = true;
    script.setAttribute("data-trustindex", "1");
    container.appendChild(script);

    const moveWidgetIntoContainer = () => {
      const widget = findTrustindexWidget();
      if (widget && container && !container.contains(widget)) {
        container.appendChild(widget);
      }
    };

    const interval = setInterval(moveWidgetIntoContainer, 500);
    const timeout = setTimeout(() => clearInterval(interval), 15000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
      script.remove();
    };
  }, []);

  return (
    <section
      className="py-24 bg-slate-50 border-t border-slate-200"
      aria-label={t("trustindex.ariaLabel")}
    >
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-[#0F172A] mb-2">
            {t("trustindex.title")}
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto">
            {t("trustindex.subtitle")}
          </p>
        </div>
        <div
          ref={containerRef}
          className="min-h-[200px] flex justify-center items-start"
        />
      </Container>
    </section>
  );
}
