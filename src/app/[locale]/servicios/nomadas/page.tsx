"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { Globe2, ShieldCheck, Clock, AlertTriangle, ArrowRight, Briefcase, UserCheck, ShieldAlert } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { useTranslations } from "next-intl";

export default function NomadasPage() {
    const t = useTranslations("NomadasPage");
    return (
        <main className="min-h-screen bg-slate-50 text-slate-900">
            {/* HERO SECTION */}
            <section className="relative pt-32 pb-24 bg-slate-900 overflow-hidden text-white">
                <img
                    src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1920&q=80"
                    alt={t('hero.imageAlt') || 'Nómada digital trabajando'}
                    className="absolute inset-0 w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-slate-900/80 z-10" />
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#701218]/20 to-transparent z-20" />

                <Container className="relative z-10">
                    <div className="max-w-4xl">
                        <span className="text-[#C5A059] font-bold tracking-widest uppercase text-xs mb-4 block">
                            {t('hero.badge')}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
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

            <Breadcrumbs items={[{ label: t('breadcrumb.parent'), href: "/servicios/vivir" }, { label: t('breadcrumb.current') }]} />

            {/* DIFERENCIACIÓN TÉCNICA */}
            <section className="py-24 bg-white">
                <Container>
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">{t('profiles.title')}</h2>
                        <p className="text-slate-600">{t('profiles.subtitle')}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Cuenta Ajena */}
                        <div className="p-10 rounded-2xl border border-slate-100 bg-slate-50 hover:border-[#701218]/30 transition-all group">
                            <Briefcase className="w-12 h-12 text-[#701218] mb-6" />
                            <h3 className="text-2xl font-serif font-bold mb-4 text-[#0F172A]">{t('profiles.employed.title')}</h3>
                            <p className="text-slate-600 mb-6 leading-relaxed">
                                {t('profiles.employed.description')}
                            </p>
                            <ul className="space-y-3 mb-8 text-sm">
                                {t.raw('profiles.employed.features').map((feature: string, idx: number) => (
                                    <li key={idx} className="flex gap-3 text-slate-700">
                                        <UserCheck className="w-4 h-4 text-[#701218] shrink-0 mt-0.5" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Cuenta Propia */}
                        <div className="p-10 rounded-2xl border border-slate-100 bg-slate-50 hover:border-[#701218]/30 transition-all group">
                            <Globe2 className="w-12 h-12 text-[#701218] mb-6" />
                            <h3 className="text-2xl font-serif font-bold mb-4 text-[#0F172A]">{t('profiles.selfEmployed.title')}</h3>
                            <p className="text-slate-600 mb-6 leading-relaxed">
                                {t('profiles.selfEmployed.description')}
                            </p>
                            <ul className="space-y-3 mb-8 text-sm">
                                {t.raw('profiles.selfEmployed.features').map((feature: string, idx: number) => (
                                    <li key={idx} className="flex gap-3 text-slate-700">
                                        <UserCheck className="w-4 h-4 text-[#701218] shrink-0 mt-0.5" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </Container>
            </section>

            {/* RIESGOS REALES Y CRITERIOS UGE */}
            <section className="py-24 bg-slate-900 text-white">
                <Container>
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-white">{t('risks.title')}</h2>
                            <p className="text-slate-400 mb-8 leading-relaxed">
                                {t('risks.description')}
                            </p>

                            <div className="space-y-6">
                                <div className="flex gap-4 p-6 bg-white/5 rounded-xl border border-white/10">
                                    <AlertTriangle className="w-6 h-6 text-[#C5A059] shrink-0" />
                                    <div>
                                        <h4 className="font-bold mb-1">{t('risks.economic.title')}</h4>
                                        <p className="text-sm text-slate-400">{t('risks.economic.description')}</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 p-6 bg-white/5 rounded-xl border border-white/10">
                                    <ShieldAlert className="w-6 h-6 text-[#C5A059] shrink-0" />
                                    <div>
                                        <h4 className="font-bold mb-1">{t('risks.socialSecurity.title')}</h4>
                                        <p className="text-sm text-slate-400">{t('risks.socialSecurity.description')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-[#C5A059]" />
                                {t('methodology.title')}
                            </h3>
                            <ul className="space-y-4">
                                {t.raw('methodology.steps').map((step: string, i: number) => (
                                    <li key={i} className="flex gap-3 text-sm text-slate-300">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059] mt-1.5 shrink-0" />
                                        {step}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </Container>
            </section>

            {/* INTERNAL LINKING A DEFENSA JURÍDICA */}
            <section className="py-24 bg-slate-50">
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

            {/* FINAL CTA SECCIÓN */}
            <section className="py-24 bg-white border-t border-slate-100">
                <Container className="text-center">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-[#0F172A]">{t('cta.title')}</h2>
                    <p className="text-[#701218] font-bold text-sm uppercase tracking-widest mb-12">{t('cta.subtitle')}</p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg" className="bg-[#701218] hover:bg-[#5a0e13] h-14 px-8 font-bold uppercase tracking-widest text-xs">
                            <Link href="/contacto">{t('cta.button1')}</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="border-slate-300 h-14 px-8 font-bold uppercase tracking-widest text-xs">
                            <Link href="/contacto">{t('cta.button2')}</Link>
                        </Button>
                    </div>
                    <p className="mt-10 text-xs text-slate-500 flex items-center justify-center gap-2">
                        <Clock className="w-3 h-3" /> {t('cta.timeline')}
                    </p>
                </Container>
            </section>
        </main>
    );
}
