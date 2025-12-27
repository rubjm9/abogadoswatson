"use client";

import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { useTranslations } from "next-intl";

export default function AvisoLegalPage() {
    const t = useTranslations("AvisoLegalPage");
    
    return (
        <main className="min-h-screen bg-slate-50 text-slate-900 pb-24">
            <Breadcrumbs items={[{ label: t('breadcrumb') }]} />

            <section className="py-20 bg-white border-b border-slate-200">
                <Container>
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-4xl font-serif font-bold mb-8">{t('title')}</h1>
                        <p className="text-slate-600 mb-12 italic">
                            {t('lastUpdate')}
                        </p>

                        <div className="prose prose-slate max-w-none space-y-12">
                            <div>
                                <h2 className="text-xl font-bold mb-4 uppercase tracking-wider text-[#701218]">{t('sections.holder.title')}</h2>
                                <p className="leading-relaxed" dangerouslySetInnerHTML={{ __html: t.raw('sections.holder.description') }} />
                                <ul className="mt-4 space-y-2 list-none pl-0">
                                    <li><strong>{t('sections.holder.items.name')}</strong> {t('sections.holder.items.nameValue')}</li>
                                    <li><strong>{t('sections.holder.items.address')}</strong> {t('sections.holder.items.addressValue')}</li>
                                    <li><strong>{t('sections.holder.items.email')}</strong> {t('sections.holder.items.emailValue')}</li>
                                    <li><strong>{t('sections.holder.items.regulation')}</strong> {t('sections.holder.items.regulationValue')}</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold mb-4 uppercase tracking-wider text-[#701218]">{t('sections.terms.title')}</h2>
                                <p className="leading-relaxed">
                                    {t('sections.terms.description')}
                                </p>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold mb-4 uppercase tracking-wider text-[#701218]">{t('sections.intellectual.title')}</h2>
                                <p className="leading-relaxed">
                                    {t('sections.intellectual.description')}
                                </p>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold mb-4 uppercase tracking-wider text-[#701218]">{t('sections.liability.title')}</h2>
                                <p className="leading-relaxed">
                                    {t('sections.liability.description')}
                                </p>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold mb-4 uppercase tracking-wider text-[#701218]">{t('sections.jurisdiction.title')}</h2>
                                <p className="leading-relaxed">
                                    {t('sections.jurisdiction.description')}
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </main>
    );
}
