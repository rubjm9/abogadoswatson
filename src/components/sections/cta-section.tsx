"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

export function CTASection() {
    const t = useTranslations("HomePage");

    return (
        <section className="py-24 bg-[#0F172A] relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] [background-image:url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')]" />
            <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-[#701218]/10 to-transparent" />

            <Container className="relative z-10">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-serif font-bold text-white sm:text-4xl mb-6">
                        {t('cta.title')}
                    </h2>
                    <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                        {t('cta.description')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg" className="bg-[#701218] text-white hover:bg-[#590e13] shadow-lg shadow-[#701218]/20">
                            <Link href="/contacto">{t('cta.button1')}</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="bg-transparent text-white border-slate-600 hover:bg-white hover:text-slate-900">
                            <Link href="/contacto">{t('cta.button2')}</Link>
                        </Button>
                    </div>
                </div>
            </Container>
        </section>
    );
}
