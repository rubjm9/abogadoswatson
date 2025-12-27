"use client";

import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { useTranslations } from "next-intl";

export default function PrivacidadPage() {
    const t = useTranslations("PrivacidadPage");
    
    return (
        <main className="min-h-screen bg-white text-slate-900 pb-24">
            <Breadcrumbs items={[{ label: t('breadcrumb') }]} />

            <section className="py-20">
                <Container>
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-4xl font-serif font-bold mb-8">{t('title')}</h1>
                        <p className="text-slate-600 mb-12 italic">
                            {t('lastUpdate')}
                        </p>

                        <div className="prose prose-slate max-w-none space-y-12 text-slate-700">
                            <p className="leading-relaxed" dangerouslySetInnerHTML={{ __html: t.raw('intro') }} />

                            <div>
                                <h2 className="text-xl font-bold mb-4 uppercase tracking-wider text-[#701218]">{t('sections.responsible.title')}</h2>
                                <p><strong>{t('sections.responsible.identity')}</strong> {t('sections.responsible.identityValue')}</p>
                                <p><strong>{t('sections.responsible.email')}</strong> {t('sections.responsible.emailValue')}</p>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold mb-4 uppercase tracking-wider text-[#701218]">{t('sections.purpose.title')}</h2>
                                <p>{t('sections.purpose.description')}</p>
                                <ul className="list-disc pl-6 space-y-2 mt-2">
                                    {t.raw('sections.purpose.items').map((item: string, idx: number) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold mb-4 uppercase tracking-wider text-[#701218]">{t('sections.legitimization.title')}</h2>
                                <p>{t('sections.legitimization.description')}</p>
                                <ul className="list-disc pl-6 space-y-2 mt-2">
                                    {t.raw('sections.legitimization.items').map((item: string, idx: number) => (
                                        <li key={idx} dangerouslySetInnerHTML={{ __html: item }} />
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold mb-4 uppercase tracking-wider text-[#701218]">{t('sections.retention.title')}</h2>
                                <p>
                                    {t('sections.retention.description')}
                                </p>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold mb-4 uppercase tracking-wider text-[#701218]">{t('sections.rights.title')}</h2>
                                <p>{t('sections.rights.description')}</p>
                                <ul className="list-disc pl-6 space-y-1 mt-2">
                                    {t.raw('sections.rights.items').map((item: string, idx: number) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                                <p className="mt-4" dangerouslySetInnerHTML={{ __html: t.raw('sections.rights.exercise') }} />
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </main>
    );
}
