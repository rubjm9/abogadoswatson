"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { motion } from "framer-motion";
import { Globe2, Briefcase, Building2, Users } from "lucide-react";
import { useTranslations } from "next-intl";

const services = [
    {
        icon: Globe2,
        titleKey: "servicesPreview.service1.title",
        descriptionKey: "servicesPreview.service1.description",
        href: "/servicios"
    },
    {
        icon: Briefcase,
        titleKey: "servicesPreview.service2.title",
        descriptionKey: "servicesPreview.service2.description",
        href: "/servicios"
    },
    {
        icon: Users,
        titleKey: "servicesPreview.service3.title",
        descriptionKey: "servicesPreview.service3.description",
        href: "/servicios"
    },
    {
        icon: Building2,
        titleKey: "servicesPreview.service4.title",
        descriptionKey: "servicesPreview.service4.description",
        href: "/servicios"
    }
];

export function ServicesPreview() {
    const t = useTranslations("HomePage");

    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden">
            <Container>
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl font-serif font-bold text-slate-900 sm:text-4xl mb-4">
                        {t('servicesPreview.title')}
                    </h2>
                    <p className="text-slate-600">
                        {t('servicesPreview.subtitle')}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -5 }}
                            className="group bg-white p-8 rounded-lg shadow-sm border border-slate-200 hover:border-[#701218]/30 hover:shadow-md transition-all duration-300"
                        >
                            <div className="w-12 h-12 bg-slate-50 rounded-md flex items-center justify-center mb-6 group-hover:bg-[#701218]/10 transition-colors duration-300">
                                <service.icon className="w-6 h-6 text-slate-700 group-hover:text-[#701218] transition-colors" />
                            </div>
                            <h3 className="text-xl font-serif font-bold text-slate-900 mb-3 group-hover:text-[#701218] transition-colors">
                                {t(service.titleKey)}
                            </h3>
                            <p className="text-slate-600 text-sm leading-relaxed mb-6">
                                {t(service.descriptionKey)}
                            </p>
                            <Link href={service.href} className="text-sm font-semibold text-[#701218] flex items-center gap-1 group-hover:gap-2 transition-all">
                                {t('servicesPreview.moreInfo')} <span>→</span>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <Button asChild variant="outline" className="border-slate-300 hover:border-slate-900">
                        <Link href="/servicios">{t('servicesPreview.viewAll')}</Link>
                    </Button>
                </div>
            </Container>
        </section>
    );
}
