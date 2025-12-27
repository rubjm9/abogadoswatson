"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { Users, Heart, ShieldCheck, Scale, Landmark, Home, ArrowRight, FileText, Info } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { useTranslations } from "next-intl";

export default function FamiliaPage() {
    const t = useTranslations("FamiliaPage");
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

            {/* DIFERENCIACIÓN DE REGÍMENES */}
            <section className="py-24 bg-white">
                <Container>
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">{t('regimes.title')}</h2>
                        <p className="text-slate-600">{t('regimes.subtitle')}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Régimen General */}
                        <div className="p-10 rounded-2xl border border-slate-100 bg-slate-50 hover:border-[#701218]/30 transition-all">
                            <Scale className="w-12 h-12 text-[#701218] mb-6" />
                            <h3 className="text-2xl font-serif font-bold mb-4">{t('regimes.general.title')}</h3>
                            <p className="text-sm text-[#701218] font-bold mb-4 uppercase tracking-wider">{t('regimes.general.subtitle')}</p>
                            <p className="text-slate-600 mb-6 leading-relaxed">
                                {t('regimes.general.description')}
                            </p>
                            <ul className="space-y-3 mb-8 text-sm">
                                {t.raw('regimes.general.features').map((feature: string, idx: number) => (
                                    <li key={idx} className="flex gap-3 text-slate-700">
                                        <ShieldCheck className="w-4 h-4 text-[#701218] shrink-0 mt-0.5" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Régimen Comunitario */}
                        <div className="p-10 rounded-2xl border border-slate-100 bg-slate-50 hover:border-[#701218]/30 transition-all">
                            <Users className="w-12 h-12 text-[#701218] mb-6" />
                            <h3 className="text-2xl font-serif font-bold mb-4">{t('regimes.community.title')}</h3>
                            <p className="text-sm text-[#701218] font-bold mb-4 uppercase tracking-wider">{t('regimes.community.subtitle')}</p>
                            <p className="text-slate-600 mb-6 leading-relaxed">
                                {t('regimes.community.description')}
                            </p>
                            <ul className="space-y-3 mb-8 text-sm">
                                {t.raw('regimes.community.features').map((feature: string, idx: number) => (
                                    <li key={idx} className="flex gap-3 text-slate-700">
                                        <ShieldCheck className="w-4 h-4 text-[#701218] shrink-0 mt-0.5" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </Container>
            </section>

            {/* LÍMITES REALES Y REQUISITOS TÉCNICOS */}
            <section className="py-24 bg-slate-900 text-white">
                <Container>
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">{t('requirements.title')}</h2>
                            <p className="text-slate-400 mb-8 leading-relaxed">
                                {t('requirements.description')}
                            </p>

                            <div className="space-y-6">
                                <div className="flex gap-4 p-6 bg-white/5 rounded-xl border border-white/10">
                                    <Landmark className="w-6 h-6 text-[#701218] shrink-0" />
                                    <div>
                                        <h4 className="font-bold mb-1">{t('requirements.income.title')}</h4>
                                        <p className="text-sm text-slate-400">
                                            {t('requirements.income.description')}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-4 p-6 bg-white/5 rounded-xl border border-white/10">
                                    <Home className="w-6 h-6 text-[#701218] shrink-0" />
                                    <div>
                                        <h4 className="font-bold mb-1">{t('requirements.housing.title')}</h4>
                                        <p className="text-sm text-slate-400">
                                            {t('requirements.housing.description')}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-4 p-6 bg-white/5 rounded-xl border border-white/10">
                                    <Heart className="w-6 h-6 text-[#701218] shrink-0" />
                                    <div>
                                        <h4 className="font-bold mb-1">{t('requirements.dependency.title')}</h4>
                                        <p className="text-sm text-slate-400">
                                            {t('requirements.dependency.description')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-[#701218]" />
                                {t('requirements.documentation.title')}
                            </h3>
                            <div className="space-y-4 text-sm text-slate-300">
                                <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                                    <p className="font-bold text-white mb-1">{t('requirements.documentation.familyBond.title')}</p>
                                    <p>{t('requirements.documentation.familyBond.description')}</p>
                                </div>
                                <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                                    <p className="font-bold text-white mb-1">{t('requirements.documentation.means.title')}</p>
                                    <p>{t('requirements.documentation.means.description')}</p>
                                </div>
                                <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                                    <p className="font-bold text-white mb-1">{t('requirements.documentation.insurance.title')}</p>
                                    <p>{t('requirements.documentation.insurance.description')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* INFO ALERT BOX */}
            <section className="py-12 bg-white">
                <Container>
                    <div className="p-6 bg-[#701218]/5 border border-[#701218]/20 rounded-xl flex gap-4 items-center">
                        <Info className="w-6 h-6 text-[#701218] shrink-0" />
                        <p className="text-sm text-slate-700 leading-relaxed">
                            <strong>{t('info.title')}</strong> {t('info.description')}
                        </p>
                    </div>
                </Container>
            </section>

            {/* CTA SECCIÓN */}
            <section className="py-24 bg-slate-50 border-t border-slate-100">
                <Container className="text-center">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">{t('cta.title')}</h2>
                    <p className="text-slate-600 mb-12 max-w-2xl mx-auto">{t('cta.description')}</p>

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
