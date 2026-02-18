"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { Building2, FileCheck, FileText, Scale, ShieldAlert, ArrowRight, CheckCircle2 } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { useTranslations } from "next-intl";

export default function InmobiliarioPage() {
    const t = useTranslations("InmobiliarioPage");

    const steps = [
        { key: "registral", icon: FileCheck },
        { key: "legal", icon: Scale },
        { key: "contracts", icon: FileText },
        { key: "coordination", icon: Building2 },
        { key: "tax", icon: FileText },
        { key: "registration", icon: CheckCircle2 },
        { key: "utilities", icon: Building2 },
    ];

    return (
        <main className="min-h-screen bg-slate-50 text-slate-900">
            {/* HERO */}
            <section className="relative pt-32 pb-24 bg-slate-900 overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80"
                    alt={t("hero.imageAlt")}
                    className="absolute inset-0 w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-slate-900/80 z-10" />
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#701218]/20 to-transparent z-20" />

                <Container className="relative z-10">
                    <div className="max-w-3xl">
                        <span className="text-[#C5A059] font-bold tracking-widest uppercase text-xs mb-4 block">
                            {t("hero.badge")}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
                            {t("hero.title")}
                        </h1>
                        <p className="text-sm text-[#C5A059] font-bold mb-4 bg-[#C5A059]/10 px-3 py-1 rounded-sm inline-block">
                            {t("hero.subtitle")}
                        </p>
                        <p className="text-xl text-slate-300 leading-relaxed max-w-2xl" dangerouslySetInnerHTML={{ __html: t.raw("hero.description") }} />
                    </div>
                </Container>
            </section>

            <Breadcrumbs items={[{ label: t("breadcrumb") }]} />

            {/* QUÉ ES EL DERECHO INMOBILIARIO */}
            <section className="py-24">
                <Container>
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-2xl font-serif font-bold mb-6 text-[#0F172A]">{t("intro.title")}</h2>
                        <p className="text-slate-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t.raw("intro.description") }} />
                    </div>
                </Container>
            </section>

            {/* ASESORAMIENTO EN COMPRAVENTA */}
            <section className="py-24 bg-white border-y border-slate-200">
                <Container>
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-serif font-bold mb-2 text-[#0F172A]">{t("purchase.title")}</h2>
                        <p className="text-[#701218] font-bold text-sm uppercase tracking-widest mb-6">{t("purchase.subtitle")}</p>
                        <p className="text-slate-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t.raw("purchase.definition") }} />
                    </div>
                    <p className="text-center text-slate-700 max-w-2xl mx-auto mb-12 leading-relaxed" dangerouslySetInnerHTML={{ __html: t.raw("purchase.intro") }} />
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {steps.map((item) => (
                            <div key={item.key} className="bg-slate-50 p-8 rounded-xl border border-slate-100 hover:border-[#701218]/30 transition-all group">
                                <item.icon className="w-8 h-8 text-[#701218] mb-4" />
                                <p className="text-sm font-medium text-slate-800">{t(`purchase.steps.${item.key}`)}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* DEFENSA JURÍDICA */}
            <section className="py-24 bg-slate-50">
                <Container>
                    <div className="max-w-4xl mx-auto bg-white p-12 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-10">
                        <div className="w-16 h-16 bg-[#701218]/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <ShieldAlert className="w-8 h-8 text-[#701218]" />
                        </div>
                        <div className="flex-grow text-center md:text-left">
                            <h3 className="text-xl font-serif font-bold mb-2 text-[#0F172A]">{t("defense.title")}</h3>
                            <p className="text-sm text-slate-600 leading-relaxed mb-4">{t("defense.description")}</p>
                            <Link href="/servicios/defensa-juridica" className="text-[#701218] font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all justify-center md:justify-start">
                                {t("defense.link")} <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </Container>
            </section>

            {/* CTA */}
            <section className="py-24 bg-white">
                <Container className="text-center">
                    <h2 className="text-3xl font-serif font-bold mb-2 text-[#0F172A]">{t("cta.title")}</h2>
                    <p className="text-[#701218] font-bold text-sm uppercase tracking-widest mb-10">{t("cta.subtitle")}</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg" className="bg-[#701218] hover:bg-[#5a0e13] h-14 px-8 font-bold uppercase tracking-widest text-xs">
                            <Link href="/contacto">{t("cta.button1")}</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="border-slate-300 h-14 px-8 font-bold uppercase tracking-widest text-xs">
                            <Link href="/contacto">{t("cta.button2")}</Link>
                        </Button>
                    </div>
                </Container>
            </section>
        </main>
    );
}
