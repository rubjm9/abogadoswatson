"use client";

import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { useTranslations } from "next-intl";

export default function CookiesPage() {
    const t = useTranslations("CookiesPage");
    
    return (
        <main className="min-h-screen bg-slate-50 text-slate-900 pb-24">
            <Breadcrumbs items={[{ label: t('breadcrumb') }]} />

            <section className="py-20">
                <Container>
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-4xl font-serif font-bold mb-8">{t('title')}</h1>

                        <div className="prose prose-slate max-w-none space-y-10 text-slate-700 bg-white p-12 rounded-2xl border border-slate-200">
                            <p className="leading-relaxed" dangerouslySetInnerHTML={{ __html: t.raw('intro') }} />

                            <div>
                                <h2 className="text-xl font-bold mb-4 uppercase tracking-wider text-[#701218]">{t('sections.what.title')}</h2>
                                <p>
                                    {t('sections.what.description')}
                                </p>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold mb-4 uppercase tracking-wider text-[#701218]">{t('sections.types.title')}</h2>
                                <div className="space-y-4">
                                    <div className="p-4 bg-slate-50 rounded-lg border-l-4 border-[#701218]">
                                        <h3 className="font-bold text-sm mb-1 uppercase tracking-tighter">{t('sections.types.technical.title')}</h3>
                                        <p className="text-xs text-slate-600">{t('sections.types.technical.description')}</p>
                                    </div>
                                    <div className="p-4 bg-slate-50 rounded-lg border-l-4 border-[#701218]">
                                        <h3 className="font-bold text-sm mb-1 uppercase tracking-tighter">{t('sections.types.analytical.title')}</h3>
                                        <p className="text-xs text-slate-600">{t('sections.types.analytical.description')}</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold mb-4 uppercase tracking-wider text-[#701218]">{t('sections.management.title')}</h2>
                                <p>
                                    {t('sections.management.description')}
                                </p>
                                <ul className="list-disc pl-6 mt-4 text-xs space-y-1">
                                    <li><strong>{t('sections.management.browsers.chrome')}</strong> {t('sections.management.browsers.chromeValue')}</li>
                                    <li><strong>{t('sections.management.browsers.firefox')}</strong> {t('sections.management.browsers.firefoxValue')}</li>
                                    <li><strong>{t('sections.management.browsers.safari')}</strong> {t('sections.management.browsers.safariValue')}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </main>
    );
}
