"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { Gavel, ShieldCheck, Scale, FileSearch, Clock, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";

export default function DefensaJuridicaPage() {
    const t = useTranslations("DefensaJuridicaPage");
    
    const cases = [
        { key: "denial", icon: AlertTriangle },
        { key: "delays", icon: Clock },
        { key: "requirements", icon: FileSearch },
        { key: "sanctions", icon: ShieldCheck }
    ];
    
    const protocol = [
        { key: "analysis", step: "01" },
        { key: "strategy", step: "02" },
        { key: "preparation", step: "03" },
        { key: "monitoring", step: "04" }
    ];
    
    const appeals = [
        { key: "reposicion" },
        { key: "alzada" },
        { key: "contencioso" },
        { key: "cautelares" }
    ];
    return (
        <main className="min-h-screen bg-slate-50 text-slate-900">
            {/* SECCIÓN 1 — HERO (Confianza) */}
            <section className="relative pt-24 pb-24 bg-slate-900 overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&q=80"
                    alt={t('hero.imageAlt') || 'Defensa jurídica'}
                    className="absolute inset-0 w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-slate-900/80 z-10" />
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#701218]/20 to-transparent z-20" />

                <Container className="relative z-10">
                    <div className="max-w-3xl">
                        <span className="text-[#701218] font-bold tracking-widest uppercase text-xs mb-4 block">
                            {t('hero.badge')}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
                            {t('hero.title')}
                        </h1>
                        <p className="text-sm text-[#701218] font-bold mb-4 bg-[#701218]/10 px-3 py-1 rounded-sm inline-block">
                            {t('hero.subtitle')}
                        </p>
                        <p className="text-xl text-slate-300 leading-relaxed max-w-2xl" dangerouslySetInnerHTML={{ __html: t.raw('hero.description') }} />
                    </div>
                </Container>
            </section>

            {/* SECCIÓN 2 — CUÁNDO NECESITAS DEFENSA */}
            <section className="py-24 border-b border-slate-200">
                <Container>
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-serif font-bold mb-2">{t('cases.title')}</h2>
                        <p className="text-[#701218] font-bold text-sm uppercase tracking-widest mb-6">{t('cases.subtitle')}</p>
                        <p className="text-slate-600">{t('cases.description')}</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {cases.map((item) => (
                            <div key={item.key} className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
                                <item.icon className="w-8 h-8 text-[#701218] mb-6" />
                                <h3 className="text-lg font-serif font-bold mb-2 leading-tight">{t(`cases.items.${item.key}.title`)}</h3>
                                <p className="text-[10px] font-bold text-[#701218] uppercase tracking-wider mb-4">{t(`cases.items.${item.key}.subtitle`)}</p>
                                <p className="text-sm text-slate-600 leading-relaxed">{t(`cases.items.${item.key}.description`)}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* SECCIÓN 3 — CÓMO ACTUAMOS */}
            <section className="py-24 bg-white">
                <Container>
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-serif font-bold mb-2">{t('protocol.title')}</h2>
                            <p className="text-[#701218] font-bold text-sm uppercase tracking-widest mb-8">{t('protocol.subtitle')}</p>

                            <div className="space-y-8">
                                {protocol.map((item) => (
                                    <div key={item.key} className="flex gap-6">
                                        <span className="text-4xl font-serif font-bold text-slate-100">{item.step}</span>
                                        <div>
                                            <h4 className="font-bold text-slate-900 mb-1">{t(`protocol.steps.${item.key}.title`)}</h4>
                                            <p className="text-sm text-slate-600 leading-relaxed">{t(`protocol.steps.${item.key}.description`)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-slate-50 p-12 rounded-3xl border border-slate-200">
                            <Scale className="w-16 h-16 text-[#701218] mb-8" />
                            <h3 className="text-2xl font-serif font-bold mb-4">{t('realistic.title')}</h3>
                            <p className="text-slate-600 leading-relaxed mb-6">
                                {t('realistic.description1')}
                            </p>
                            <p className="text-slate-600 leading-relaxed">
                                {t('realistic.description2')}
                            </p>
                        </div>
                    </div>
                </Container>
            </section>

            {/* SECCIÓN 4 — TIPOS DE RECURSOS */}
            <section className="py-24 bg-slate-50">
                <Container>
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-serif font-bold mb-2">{t('appeals.title')}</h2>
                        <p className="text-[#701218] font-bold text-sm uppercase tracking-widest mb-6">{t('appeals.subtitle')}</p>
                        <p className="text-slate-600">{t('appeals.description')}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {appeals.map((item) => (
                            <div key={item.key} className="bg-white p-10 rounded-2xl border border-slate-200">
                                <h3 className="text-xl font-bold mb-1">{t(`appeals.types.${item.key}.title`)}</h3>
                                <p className="text-xs font-bold text-[#701218] uppercase tracking-widest mb-4">{t(`appeals.types.${item.key}.subtitle`)}</p>
                                <p className="text-sm text-slate-600 leading-relaxed">{t(`appeals.types.${item.key}.description`)}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* SECCIÓN 5 — GARANTÍAS DEL DESPACHO */}
            <section className="py-24 bg-white">
                <Container>
                    <div className="bg-slate-900 text-white rounded-3xl p-12 lg:p-20 overflow-hidden relative">
                        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-4xl font-serif font-bold mb-6">{t('guarantees.title')}</h2>
                                <div className="space-y-6">
                                    {t.raw('guarantees.items').map((text: string, i: number) => (
                                        <div key={i} className="flex gap-4 items-start">
                                            <CheckCircle2 className="w-6 h-6 text-[#701218] flex-shrink-0" />
                                            <p className="text-slate-300">{text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="hidden lg:block">
                                <div className="aspect-square bg-[#701218]/10 rounded-full flex items-center justify-center border border-[#701218]/20">
                                    <Scale className="w-32 h-32 text-[#701218]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* SECCIÓN 6 — CTA SOBRIO */}
            <section className="py-24 bg-slate-50 border-t border-slate-200">
                <Container className="text-center">
                    <h2 className="text-3xl font-serif font-bold mb-2">{t('cta.title')}</h2>
                    <p className="text-[#701218] font-bold text-sm uppercase tracking-widest mb-10">{t('cta.subtitle')}</p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg" className="bg-[#701218] hover:bg-[#5a0e13] h-14 px-8 font-bold uppercase tracking-widest text-xs">
                            <Link href="/contacto">{t('cta.button1')}</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="border-slate-300 h-14 px-8 font-bold uppercase tracking-widest text-xs">
                            <Link href="/contacto">{t('cta.button2')}</Link>
                        </Button>
                    </div>
                    <p className="mt-8 text-xs text-slate-500 max-w-lg mx-auto leading-relaxed">
                        {t('cta.description')}
                    </p>
                </Container>
            </section>
        </main>
    );
}
