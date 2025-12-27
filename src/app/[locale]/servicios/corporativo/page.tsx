"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { Briefcase, Building2, ShieldCheck, Zap, Users, ArrowRight, Building, Globe, CheckCircle2 } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { useTranslations } from "next-intl";

export default function CorporativoPage() {
    const t = useTranslations("CorporativoPage");
    return (
        <main className="min-h-screen bg-slate-50 text-slate-900">
            {/* HERO SECTION - B2B Focus */}
            <section className="relative pt-24 pb-24 bg-slate-900 overflow-hidden text-white">
                <Breadcrumbs items={[{ label: t('breadcrumb.parent'), href: "/servicios/trabajar" }, { label: t('breadcrumb.current') }]} className="relative z-30" />
                <div className="absolute inset-0 bg-slate-900/95 z-10" />
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

            {/* DIFERENCIACIÓN TÉCNICA PAC vs ICT */}
            <section className="py-24 bg-white">
                <Container>
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">{t('solutions.title')}</h2>
                        <p className="text-slate-600">{t('solutions.subtitle')}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* PAC */}
                        <div className="p-10 rounded-2xl border border-slate-100 bg-slate-50 hover:border-[#701218]/30 transition-all group">
                            <Zap className="w-12 h-12 text-[#701218] mb-6" />
                            <h3 className="text-2xl font-serif font-bold mb-4">{t('solutions.pac.title')}</h3>
                            <p className="text-slate-600 mb-6 leading-relaxed text-sm">
                                {t('solutions.pac.description')}
                            </p>
                            <ul className="space-y-3 mb-8 text-sm">
                                {t.raw('solutions.pac.features').map((text: string, idx: number) => (
                                    <li key={idx} className="flex gap-3 text-slate-700">
                                        <CheckCircle2 className="w-4 h-4 text-[#701218] shrink-0 mt-0.5" />
                                        <span>{text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* ICT */}
                        <div className="p-10 rounded-2xl border border-slate-100 bg-slate-50 hover:border-[#701218]/30 transition-all group">
                            <Building2 className="w-12 h-12 text-[#701218] mb-6" />
                            <h3 className="text-2xl font-serif font-bold mb-4">{t('solutions.ict.title')}</h3>
                            <p className="text-slate-600 mb-6 leading-relaxed text-sm">
                                {t('solutions.ict.description')}
                            </p>
                            <ul className="space-y-3 mb-8 text-sm">
                                {t.raw('solutions.ict.features').map((text: string, idx: number) => (
                                    <li key={idx} className="flex gap-3 text-slate-700">
                                        <CheckCircle2 className="w-4 h-4 text-[#701218] shrink-0 mt-0.5" />
                                        <span>{text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </Container>
            </section>

            {/* AUTORIDAD ANTE LA UGE */}
            <section className="py-24 bg-slate-900 text-white">
                <Container>
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">{t('uge.title')}</h2>
                            <p className="text-slate-400 mb-8 leading-relaxed">
                                {t('uge.description')}
                            </p>

                            <div className="space-y-6">
                                <div className="flex gap-4 p-6 bg-white/5 rounded-xl border border-white/10">
                                    <ShieldCheck className="w-6 h-6 text-[#701218] shrink-0" />
                                    <div>
                                        <h4 className="font-bold mb-1">{t('uge.fastTrack.title')}</h4>
                                        <p className="text-sm text-slate-400">{t('uge.fastTrack.description')}</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 p-6 bg-white/5 rounded-xl border border-white/10">
                                    <Building className="w-6 h-6 text-[#701218] shrink-0" />
                                    <div>
                                        <h4 className="font-bold mb-1">{t('uge.audit.title')}</h4>
                                        <p className="text-sm text-slate-400">{t('uge.audit.description')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/5 p-10 rounded-3xl border border-white/10 backdrop-blur-sm">
                            <h3 className="text-xl font-bold mb-6">{t('uge.benefits.title')}</h3>
                            <ul className="space-y-5">
                                {t.raw('uge.benefits.items').map((item: string, i: number) => (
                                    <li key={i} className="flex gap-3 text-sm text-slate-300">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#701218] mt-1.5 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </Container>
            </section>

            {/* VÍNCULO CON NEGOCIOS */}
            <section className="py-24 bg-slate-50">
                <Container>
                    <div className="max-w-4xl mx-auto bg-white p-12 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-10">
                        <div className="w-16 h-16 bg-[#701218]/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <Globe className="w-8 h-8 text-[#701218]" />
                        </div>
                        <div className="flex-grow text-center md:text-left">
                            <h3 className="text-xl font-serif font-bold mb-2 text-slate-900">{t('business.title')}</h3>
                            <p className="text-sm text-slate-600 leading-relaxed mb-4">
                                {t('business.description')}
                            </p>
                            <Link href="/servicios/negocios" className="text-[#701218] font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all justify-center md:justify-start">
                                {t('business.link')} <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </Container>
            </section>

            {/* FINAL CTA - B2B Focus */}
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
