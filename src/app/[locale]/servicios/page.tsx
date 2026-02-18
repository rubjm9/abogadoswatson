"use client";

import { Container } from "@/components/ui/container";
import { useTranslations } from "next-intl";
import { Globe2, Briefcase, Building2, Users, Gavel } from "lucide-react";
import { Link } from "@/navigation";

export default function ServicesPage() {
    const t = useTranslations("ServicesPage");
    const tNav = useTranslations("Navigation");
    
    const serviceCategories = [
        {
            key: "residence",
            icon: Globe2,
            services: ["students", "nomads", "family"]
        },
        {
            key: "work",
            icon: Briefcase,
            services: ["qualified", "corporate", "descendants", "entrepreneurs"]
        },
        {
            key: "citizenship",
            icon: Users,
            services: ["grandchildren", "residence", "nature"]
        },
        {
            key: "business",
            icon: Building2,
            services: ["investment", "realEstate", "inmobiliario"]
        }
    ];

    return (
        <main className="bg-slate-50 min-h-screen">
            <Container className="py-20">
                <div className="max-w-3xl mb-16">
                    <h1 className="mb-6 font-serif text-5xl font-bold text-[#0F172A]">{tNav('services')}</h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        {t('description')}
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
                    {serviceCategories.map((category) => (
                        <div key={category.key} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 rounded-xl bg-[#701218]/10">
                                    <category.icon className="w-8 h-8 text-[#701218]" />
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#701218] mb-1">{t(`categories.${category.key}.subtitle`)}</p>
                                    <h2 className="text-2xl font-serif font-bold text-[#0F172A]">{t(`categories.${category.key}.title`)}</h2>
                                </div>
                            </div>
                            <ul className="space-y-6 flex-grow">
                                {category.services.map((serviceKey) => (
                                    <li key={serviceKey} className="group">
                                        <h3 className="font-bold text-[#0F172A] mb-1 group-hover:text-[#701218] transition-colors">{t(`categories.${category.key}.services.${serviceKey}.title`)}</h3>
                                        <p className="text-sm text-slate-600 leading-relaxed">{t(`categories.${category.key}.services.${serviceKey}.description`)}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <section className="mt-20 p-10 bg-[#701218] rounded-2xl text-white">
                    <div className="grid md:grid-cols-3 gap-8 items-center">
                        <div className="md:col-span-2">
                            <div className="flex items-center gap-3 mb-4">
                                <Gavel className="w-10 h-10" />
                                <h2 className="text-3xl font-serif font-bold text-white">{t('legalDefense.title')}</h2>
                            </div>
                            <p className="text-white/80 text-lg mb-0">
                                {t('legalDefense.description')}
                            </p>
                        </div>
                        <div className="flex justify-md-end">
                            <Link href="/contacto" className="inline-flex h-12 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-[#701218] shadow transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50">
                                {t('legalDefense.button')}
                            </Link>
                        </div>
                    </div>
                </section>
            </Container>
        </main>
    );
}
