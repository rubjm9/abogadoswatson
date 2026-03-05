"use client";

import Script from "next/script";
import { Container } from "@/components/ui/container";
import { useTranslations } from "next-intl";

const TRUSTINDEX_LOADER_URL =
  "https://cdn.trustindex.io/loader.js?64570a466b55384afe8637385ac";

export function TrustindexReviews() {
  const t = useTranslations("HomePage");

  return (
    <section
      className="py-24 bg-white border-t border-slate-200"
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
        <div className="min-h-[200px] flex justify-center items-start">
          <Script
            src={TRUSTINDEX_LOADER_URL}
            strategy="lazyOnload"
            defer
            async
          />
        </div>
      </Container>
    </section>
  );
}
