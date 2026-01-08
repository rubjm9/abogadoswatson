"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { CheckCircle2, FileText, ScrollText, Timer, ShieldAlert, ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { useTranslations } from "next-intl";

export default function NacionalidadPage() {
    const t = useTranslations("NacionalidadPage");

    const types = [
        {
            key: "residence",
            icon: Timer
        },
        {
            key: "option",
            icon: CheckCircle2
        },
        {
            key: "nature",
            icon: FileText
        }
    ];

    return (
        <main className="min-h-screen bg-slate-50 text-slate-900">
            {/* Hero Section */}
            <section className="relative pt-32 pb-24 bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/80 z-10" />
                <img
                    src="/images/nationality.png"
                    alt={t('hero.imageAlt')}
                    className="absolute inset-0 w-full h-full object-cover opacity-40"
                />
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#701218]/20 to-transparent z-20" />

                <Container className="relative z-10">
                    <div className="max-w-3xl">
                        <span className="text-[#C5A059] font-bold tracking-widest uppercase text-xs mb-4 block">
                            {t('hero.badge')}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
                            {t('hero.title')}
                        </h1>
                        <p className="text-sm text-[#C5A059] font-bold mb-4 bg-[#C5A059]/10 px-3 py-1 rounded-sm inline-block">
                            {t('hero.subtitle')}
                        </p>
                        <p className="text-xl text-slate-300 leading-relaxed max-w-2xl" dangerouslySetInnerHTML={{ __html: t.raw('hero.description') }} />
                    </div>
                </Container>
            </section>

            <Breadcrumbs items={[{ label: t('breadcrumb') }]} />

            {/* Content Blocks */}
            <section className="py-24">
                <Container>
                    <div className="grid gap-8 lg:grid-cols-2">
                        {types.map((type) => (
                            <div
                                key={type.key}
                                className="group bg-white p-10 rounded-2xl shadow-sm border border-slate-100 hover:border-[#701218]/30 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                            >
                                <div className="mb-6">
                                    <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center mb-6 border border-slate-100 group-hover:bg-[#701218] group-hover:border-[#701218] transition-all duration-300">
                                        <type.icon className="w-7 h-7 text-[#701218] group-hover:text-white transition-colors" />
                                    </div>
                                    <h2 className="text-2xl font-serif font-bold text-[#0F172A] mb-1 leading-tight">
                                        {t(`types.${type.key}.title`)}
                                    </h2>
                                    <p className="text-xs font-bold text-[#701218] uppercase tracking-wider mb-4">
                                        {t(`types.${type.key}.subtitle`)}
                                    </p>
                                </div>

                                <p className="text-slate-600 mb-8 leading-relaxed flex-grow">
                                    {t(`types.${type.key}.description`)}
                                </p>

                                <ul className="space-y-4 mb-10 border-t border-slate-50 pt-8">
                                    {t.raw(`types.${type.key}.features`).map((feature: string, idx: number) => (
                                        <li key={idx} className="flex items-start text-sm text-slate-700">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#701218] mr-3 mt-1.5 flex-shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <Button asChild variant="outline" className="w-full h-12 border-slate-200 hover:border-[#701218] hover:text-[#701218] group-hover:bg-slate-50 transition-all font-semibold uppercase tracking-widest text-[10px]">
                                    <Link href="/contacto">{t('cta.evaluate')}</Link>
                                </Button>
                            </div>
                        ))}
                    </div>

                    {/* Technical Support Section */}
                    <div className="mt-20 p-10 bg-white border border-slate-200 rounded-2xl">
                        <h3 className="text-xl font-serif font-bold text-[#0F172A] mb-6 flex items-center gap-2">
                            <span className="w-1 h-6 bg-[#701218] rounded-full" />
                            {t('technicalSupport.title')}
                        </h3>
                        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
                            <div>
                                <h4 className="font-bold text-[#701218] text-sm mb-2">{t('technicalSupport.silence.title')}</h4>
                                <p className="text-sm text-slate-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t.raw('technicalSupport.silence.description') }} />
                            </div>
                            <div>
                                <h4 className="font-bold text-[#701218] text-sm mb-2">{t('technicalSupport.exams.title')}</h4>
                                <p className="text-sm text-slate-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t.raw('technicalSupport.exams.description') }} />
                            </div>
                            <div>
                                <h4 className="font-bold text-[#701218] text-sm mb-2">{t('technicalSupport.requirements.title')}</h4>
                                <p className="text-sm text-slate-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t.raw('technicalSupport.requirements.description') }} />
                            </div>
                            <div>
                                <h4 className="font-bold text-[#701218] text-sm mb-2">{t('technicalSupport.custody.title')}</h4>
                                <p className="text-sm text-slate-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t.raw('technicalSupport.custody.description') }} />
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* SECCIÓN 4 — RELACIÓN CON DEFENSA JURÍDICA */}
            <section className="py-24 bg-slate-50 border-t border-slate-100">
                <Container>
                    <div className="max-w-4xl mx-auto bg-white p-12 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-10">
                        <div className="w-16 h-16 bg-[#701218]/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <ShieldAlert className="w-8 h-8 text-[#701218]" />
                        </div>
                        <div className="flex-grow text-center md:text-left">
                            <h3 className="text-xl font-serif font-bold mb-2 text-[#0F172A]">{t('defense.title')}</h3>
                            <p className="text-sm text-slate-600 leading-relaxed mb-4">
                                {t('defense.description')}
                            </p>
                            <Link href="/servicios/defensa-juridica" className="text-[#701218] font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all justify-center md:justify-start">
                                {t('defense.link')} <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </Container>
            </section>

            {/* CTA Bottom */}
            <section className="py-24 bg-[#701218] relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10" />
                <Container className="relative z-10 text-center text-white">
                    <h2 className="text-4xl font-serif font-bold mb-6 text-white">{t('cta.title')}</h2>
                    <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
                        {t('cta.description')}
                    </p>
                    <Button asChild size="lg" className="bg-white text-[#701218] hover:bg-slate-100 border-none shadow-2xl h-14 px-10 font-bold uppercase tracking-widest text-xs">
                        <Link href="/contacto">{t('cta.button')}</Link>
                    </Button>
                </Container>
            </section>
        </main>
    );
}
