"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { GraduationCap, Briefcase, RefreshCw, Landmark, ArrowRight, ShieldCheck, Clock, FileText, Globe2 } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { useTranslations } from "next-intl";

export default function EstudiantesPage() {
    const t = useTranslations("EstudiantesPage");
    return (
        <main className="min-h-screen bg-slate-50 text-slate-900">
            {/* HERO SECTION */}
            <section className="relative pt-24 pb-24 bg-slate-900 overflow-hidden text-white">
                <Breadcrumbs items={[{ label: t('breadcrumb.parent'), href: "/servicios/vivir" }, { label: t('breadcrumb.current') }]} className="relative z-30" />
                <div className="absolute inset-0 bg-slate-900/90 z-10" />
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#701218]/20 to-transparent z-20" />

                <Container className="relative z-30">
                    <div className="max-w-4xl">
                        <span className="text-[#701218] font-bold tracking-widest uppercase text-xs mb-4 block">
                            {t('hero.badge')}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
                            {t('hero.title')}
                        </h1>
                        <p className="text-xl text-slate-300 leading-relaxed mb-8 max-w-2xl">
                            {t('hero.description')}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Button asChild size="lg" className="bg-[#701218] hover:bg-[#5a0e13] h-14 px-8 font-bold uppercase tracking-widest text-xs">
                                <Link href="/contacto">{t('hero.cta')}</Link>
                            </Button>
                        </div>
                    </div>
                </Container>
            </section>

            {/* TRABAJO COMPATIBLE & RENOVACIONES */}
            <section className="py-24 bg-white">
                <Container>
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        {/* Trabajo Compatible */}
                        <div className="p-10 rounded-2xl border border-slate-100 bg-slate-50">
                            <Briefcase className="w-12 h-12 text-[#701218] mb-6" />
                            <h2 className="text-2xl font-serif font-bold mb-4">{t('work.title')}</h2>
                            <p className="text-slate-600 mb-6 leading-relaxed">
                                {t('work.description')}
                            </p>
                            <ul className="space-y-4 text-sm text-slate-700 mb-8">
                                {t.raw('work.features').map((feature: { label: string; text: string }, idx: number) => (
                                    <li key={idx} className="flex gap-3">
                                        <ShieldCheck className="w-5 h-5 text-[#701218] shrink-0" />
                                        <span><strong>{feature.label}:</strong> {feature.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Renovaciones y Prórrogas */}
                        <div className="p-10 rounded-2xl border border-slate-100 bg-slate-50">
                            <RefreshCw className="w-12 h-12 text-[#701218] mb-6" />
                            <h2 className="text-2xl font-serif font-bold mb-4">{t('renewal.title')}</h2>
                            <p className="text-slate-600 mb-6 leading-relaxed">
                                {t('renewal.description')}
                            </p>
                            <ul className="space-y-4 text-sm text-slate-700">
                                {t.raw('renewal.features').map((feature: { label: string; text: string }, idx: number) => (
                                    <li key={idx} className="flex gap-3">
                                        {idx === 0 && <Clock className="w-5 h-5 text-[#701218] shrink-0" />}
                                        {idx === 1 && <FileText className="w-5 h-5 text-[#701218] shrink-0" />}
                                        {idx === 2 && <Landmark className="w-5 h-5 text-[#701218] shrink-0" />}
                                        <span><strong>{feature.label}:</strong> {feature.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </Container>
            </section>

            {/* PUENTE HACIA RESIDENCIA Y NACIONALIDAD */}
            <section className="py-24 bg-slate-900 text-white">
                <Container>
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">{t('bridge.title')}</h2>
                        <p className="text-slate-400">{t('bridge.subtitle')}</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Búsqueda de Empleo */}
                        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all text-center">
                            <h3 className="text-xl font-serif font-bold mb-4">{t('bridge.jobSearch.title')}</h3>
                            <p className="text-sm text-slate-400 mb-6">{t('bridge.jobSearch.description')}</p>
                            <span className="text-xs font-bold text-[#701218] uppercase tracking-widest">{t('bridge.jobSearch.badge')}</span>
                        </div>

                        {/* Modificación a Residencia */}
                        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all text-center">
                            <h3 className="text-xl font-serif font-bold mb-4">{t('bridge.modification.title')}</h3>
                            <p className="text-sm text-slate-400 mb-6">{t('bridge.modification.description')}</p>
                            <Link href="/servicios/nomadas" className="text-xs font-bold text-[#701218] uppercase tracking-widest hover:underline">{t('bridge.modification.link')}</Link>
                        </div>

                        {/* Nacionalidad */}
                        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all text-center">
                            <h3 className="text-xl font-serif font-bold mb-4">{t('bridge.citizenship.title')}</h3>
                            <p className="text-sm text-slate-400 mb-6">{t('bridge.citizenship.description')}</p>
                            <Link href="/servicios/nacionalidad" className="text-xs font-bold text-[#701218] uppercase tracking-widest hover:underline">{t('bridge.citizenship.link')}</Link>
                        </div>
                    </div>
                </Container>
            </section>

            {/* CTA SECCIÓN */}
            <section className="py-24 bg-white border-t border-slate-100">
                <Container className="text-center">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">{t('cta.title')}</h2>
                    <p className="text-[#701218] font-bold text-sm uppercase tracking-widest mb-12">{t('cta.subtitle')}</p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg" className="bg-[#701218] hover:bg-[#5a0e13] h-14 px-8 font-bold uppercase tracking-widest text-xs">
                            <Link href="/contacto">{t('cta.button1')}</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="border-slate-300 h-14 px-8 font-bold uppercase tracking-widest text-xs">
                            <Link href="/contacto">{t('cta.button2')}</Link>
                        </Button>
                    </div>
                </Container>
            </section>
        </main>
    );
}
