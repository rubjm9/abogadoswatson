"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { Home, Users, GraduationCap, Globe2, RefreshCw, ShieldAlert, CheckCircle2, ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { useTranslations } from "next-intl";

export default function VivirEnEspañaPage() {
    const t = useTranslations("VivirPage");
    
    const services = [
        { key: "nomads", icon: Globe2, featured: true },
        { key: "students", icon: GraduationCap },
        { key: "family", icon: Users },
        { key: "nonlucrative", icon: Home },
        { key: "roots", icon: CheckCircle2 },
        { key: "renewals", icon: RefreshCw }
    ];

    return (
        <main className="min-h-screen bg-slate-50 text-slate-900">
            {/* SECCIÓN 1 — HERO */}
            <section className="relative pt-24 pb-24 bg-slate-900 overflow-hidden">
                <Breadcrumbs items={[{ label: t('breadcrumb') }]} className="relative z-30 text-white" />
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
                        <p className="text-xl text-slate-300 leading-relaxed max-w-2xl">
                            {t('hero.description')}
                        </p>
                    </div>
                </Container>
            </section>

            {/* SECCIÓN 2 — QUÉ SITUACIONES CUBRIMOS */}
            <section className="py-24">
                <Container>
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-serif font-bold mb-2">{t('services.title')}</h2>
                        <p className="text-[#701218] font-bold text-sm uppercase tracking-widest mb-6">{t('services.subtitle')}</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((item) => (
                            <div key={item.key} className={`bg-white p-8 rounded-xl shadow-sm border transition-all group ${item.featured ? 'border-[#701218]/50 ring-1 ring-[#701218]/20' : 'border-slate-100'}`}>
                                <item.icon className="w-8 h-8 text-[#701218] mb-6" />
                                <h3 className="text-lg font-serif font-bold mb-1 leading-tight">{t(`services.items.${item.key}.title`)}</h3>
                                <p className="text-[10px] font-bold text-[#701218] uppercase tracking-wider mb-4">{t(`services.items.${item.key}.subtitle`)}</p>
                                <p className="text-sm text-slate-600 leading-relaxed">{t(`services.items.${item.key}.description`)}</p>
                                {item.key === "students" && (
                                    <div className="mt-4 pt-4 border-t border-slate-50">
                                        <Link href="/servicios/estudiantes" className="text-xs font-bold text-[#701218] flex items-center gap-1 hover:translate-x-1 transition-transform">
                                            {t('services.items.students.link')} <ArrowRight className="w-3 h-3" />
                                        </Link>
                                    </div>
                                )}
                                {item.key === "family" && (
                                    <div className="mt-4 pt-4 border-t border-slate-50">
                                        <Link href="/servicios/familia" className="text-xs font-bold text-[#701218] flex items-center gap-1 hover:translate-x-1 transition-transform">
                                            {t('services.items.family.link')} <ArrowRight className="w-3 h-3" />
                                        </Link>
                                    </div>
                                )}
                                {item.featured && (
                                    <div className="mt-4 pt-4 border-t border-slate-50 flex flex-col gap-3">
                                        <span className="text-[10px] font-bold text-[#701218] uppercase tracking-widest">{t('services.items.nomads.priority')}</span>
                                        <Link href="/servicios/nomadas" className="text-xs font-bold text-[#701218] flex items-center gap-1 hover:translate-x-1 transition-transform">
                                            {t('services.items.nomads.link')} <ArrowRight className="w-3 h-3" />
                                        </Link>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* SECCIÓN 3 — CÓMO TE AYUDAMOS */}
            <section className="py-24 bg-white border-y border-slate-200">
                <Container>
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-serif font-bold mb-2">{t('commitment.title')}</h2>
                            <p className="text-[#701218] font-bold text-sm uppercase tracking-widest mb-8">{t('commitment.subtitle')}</p>
                            <p className="text-slate-600 leading-relaxed mb-6">
                                {t('commitment.description')}
                            </p>
                            <ul className="space-y-4">
                                {t.raw('commitment.features').map((text: string, i: number) => (
                                    <li key={i} className="flex gap-3 items-start text-sm text-slate-700">
                                        <ArrowRight className="w-4 h-4 text-[#701218] mt-0.5 flex-shrink-0" />
                                        {text}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="relative">
                            <div className="aspect-square bg-slate-50 rounded-3xl overflow-hidden border border-slate-200 flex items-center justify-center p-12">
                                <Globe2 className="w-32 h-32 text-slate-200" />
                                <div className="absolute inset-0 bg-gradient-to-br from-[#701218]/5 to-transparent" />
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* SECCIÓN 4 — RELACIÓN CON DEFENSA JURÍDICA */}
            <section className="py-24 bg-slate-50">
                <Container>
                    <div className="max-w-4xl mx-auto bg-white p-12 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-10">
                        <div className="w-16 h-16 bg-[#701218]/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <ShieldAlert className="w-8 h-8 text-[#701218]" />
                        </div>
                        <div className="flex-grow text-center md:text-left">
                            <h3 className="text-xl font-serif font-bold mb-2 text-slate-900">{t('defense.title')}</h3>
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

            {/* SECCIÓN 5 — CTA SOBRIO */}
            <section className="py-24 bg-white">
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
                </Container>
            </section>
        </main>
    );
}
