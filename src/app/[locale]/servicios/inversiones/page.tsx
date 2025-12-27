"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { Landmark, ShieldCheck, Scale, Building2, Gavel, ArrowRight, CheckCircle2, FileSearch, Eye, Users } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { useTranslations } from "next-intl";

export default function InversionesPage() {
    const t = useTranslations("InversionesPage");
    return (
        <main className="min-h-screen bg-slate-50 text-slate-900">
            {/* HERO SECTION - Premium & Secure */}
            <section className="relative pt-24 pb-24 bg-slate-900 overflow-hidden text-white">
                <img
                    src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1920&q=80"
                    alt={t('hero.imageAlt') || 'Inversiones y negocios'}
                    className="absolute inset-0 w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-slate-900/80 z-10" />
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#C5A059]/20 to-transparent z-20" />

                <Container className="relative z-10">
                    <div className="max-w-4xl">
                        <span className="text-[#C5A059] font-bold tracking-widest uppercase text-xs mb-4 block">
                            {t('hero.badge')}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
                            {t('hero.title')}
                        </h1>
                        <p className="text-xl text-slate-300 leading-relaxed mb-8 max-w-2xl" dangerouslySetInnerHTML={{ __html: t.raw('hero.description') }} />
                        <div className="flex flex-wrap gap-4">
                            <Button asChild size="lg" className="bg-[#701218] hover:bg-[#5a0e13] h-14 px-8 font-bold uppercase tracking-widest text-xs">
                                <Link href="/contacto">{t('hero.cta')}</Link>
                            </Button>
                        </div>
                    </div>
                </Container>
            </section>

            <Breadcrumbs items={[{ label: "Inversión y Negocios", href: "/servicios/negocios" }, { label: "Inversores y Emprendedores" }]} />

            {/* DUE DILIGENCE Y PROTECCIÓN PATRIMONIAL */}
            <section className="py-24 bg-white">
                <Container>
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        {/* Due Diligence */}
                        <div className="p-10 rounded-2xl border border-slate-100 bg-slate-50">
                            <FileSearch className="w-12 h-12 text-[#C5A059] mb-6" />
                            <h2 className="text-2xl font-serif font-bold mb-4">{t('dueDiligence.title')}</h2>
                            <p className="text-slate-600 mb-6 leading-relaxed">
                                {t('dueDiligence.description')}
                            </p>
                            <ul className="space-y-4 text-sm text-slate-700">
                                {t.raw('dueDiligence.features').map((feature: { label: string; text: string }, idx: number) => (
                                    <li key={idx} className="flex gap-3">
                                        <ShieldCheck className="w-5 h-5 text-[#C5A059] shrink-0" />
                                        <span><strong>{feature.label}:</strong> {feature.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Protección Patrimonial */}
                        <div className="p-10 rounded-2xl border border-slate-100 bg-slate-50">
                            <Landmark className="w-12 h-12 text-[#C5A059] mb-6" />
                            <h2 className="text-2xl font-serif font-bold mb-4">{t('protection.title')}</h2>
                            <p className="text-slate-600 mb-6 leading-relaxed">
                                {t('protection.description')}
                            </p>
                            <ul className="space-y-4 text-sm text-slate-700">
                                {t.raw('protection.features').map((feature: { label: string; text: string }, idx: number) => (
                                    <li key={idx} className="flex gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-[#C5A059] shrink-0" />
                                        <span><strong>{feature.label}:</strong> {feature.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </Container>
            </section>

            {/* RESOLUCIÓN DE CONFLICTOS Y DEFENSA */}
            <section className="py-24 bg-slate-900 text-white">
                <Container>
                    <div className="max-w-4xl mx-auto bg-white/5 p-12 rounded-3xl border border-white/10 backdrop-blur-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
                            <Gavel className="w-32 h-32 text-[#C5A059]" />
                        </div>
                        <div className="relative z-10">
                            <h2 className="text-3xl font-serif font-bold mb-6">{t('defense.title')}</h2>
                            <p className="text-slate-400 mb-8 leading-relaxed max-w-2xl" dangerouslySetInnerHTML={{ __html: t.raw('defense.description') }} />
                            <Button asChild variant="outline" className="border-[#C5A059] text-[#C5A059] hover:bg-[#C5A059] hover:text-white">
                                <Link href="/servicios/defensa-juridica" className="flex items-center gap-2">
                                    {t('defense.link')} <ArrowRight className="w-4 h-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </Container>
            </section>

            {/* SECCIÓN ENTIDADES Y PROYECTOS EMPRENDEDORES */}
            <section className="py-24 bg-white">
                <Container>
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                                    <Building2 className="w-8 h-8 text-[#C5A059] mb-4" />
                                    <h4 className="font-bold text-sm mb-2">{t('projects.items.entrepreneur.title')}</h4>
                                    <p className="text-[10px] text-slate-500 uppercase tracking-widest">{t('projects.items.entrepreneur.subtitle')}</p>
                                </div>
                                <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                                    <Scale className="w-8 h-8 text-[#C5A059] mb-4" />
                                    <h4 className="font-bold text-sm mb-2">{t('projects.items.financial.title')}</h4>
                                    <p className="text-[10px] text-slate-500 uppercase tracking-widest">{t('projects.items.financial.subtitle')}</p>
                                </div>
                                <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                                    <Eye className="w-8 h-8 text-[#C5A059] mb-4" />
                                    <h4 className="font-bold text-sm mb-2">{t('projects.items.verification.title')}</h4>
                                    <p className="text-[10px] text-slate-500 uppercase tracking-widest">{t('projects.items.verification.subtitle')}</p>
                                </div>
                                <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                                    <Users className="w-8 h-8 text-[#C5A059] mb-4" />
                                    <h4 className="font-bold text-sm mb-2">{t('projects.items.familyOffice.title')}</h4>
                                    <p className="text-[10px] text-slate-500 uppercase tracking-widest">{t('projects.items.familyOffice.subtitle')}</p>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">{t('projects.title')}</h2>
                            <p className="text-slate-600 mb-8 leading-relaxed">
                                {t('projects.description')}
                            </p>
                            <ul className="space-y-4">
                                {t.raw('projects.features').map((text: string, idx: number) => (
                                    <li key={idx} className="flex gap-3 text-sm text-slate-700 items-start">
                                        <CheckCircle2 className="w-5 h-5 text-[#C5A059] shrink-0" />
                                        <span>{text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </Container>
            </section>

            {/* FINAL CTA - High Intent */}
            <section className="py-24 bg-slate-50 border-t border-slate-100">
                <Container className="text-center">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">{t('cta.title')}</h2>
                    <p className="text-[#C5A059] font-bold text-sm uppercase tracking-widest mb-12">{t('cta.subtitle')}</p>

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
