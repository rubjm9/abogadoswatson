"use client";

import { Container } from "@/components/ui/container";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

export function Footer() {
    const t = useTranslations("Footer");

    return (
        <footer className="border-t border-slate-200 bg-slate-50 py-12">
            <Container className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div>
                    <h3 className="mb-4 font-serif text-lg font-bold text-[#0F172A]">{t('title')}</h3>
                    <p className="text-sm text-slate-600">
                        {t('description')}
                    </p>
                    <p className="mt-4 text-[11px] text-slate-500">{t('email')}</p>
                </div>
                <div>
                    <h4 className="mb-4 font-bold text-[#0F172A] uppercase tracking-widest text-[10px]">{t('legalServices.title')}</h4>
                    <ul className="space-y-2 text-sm text-slate-600">
                        <li><Link href="/servicios/vivir" className="hover:text-[#701218] transition-colors">{t('legalServices.living')}</Link></li>
                        <li><Link href="/servicios/trabajar" className="hover:text-[#701218] transition-colors">{t('legalServices.working')}</Link></li>
                        <li><Link href="/servicios/negocios" className="hover:text-[#701218] transition-colors">{t('legalServices.business')}</Link></li>
                        <li><Link href="/servicios/nacionalidad" className="hover:text-[#701218] transition-colors">{t('legalServices.citizenship')}</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="mb-4 font-bold text-[#0F172A] uppercase tracking-widest text-[10px]">{t('defense.title')}</h4>
                    <ul className="space-y-2 text-sm text-slate-600">
                        <li><Link href="/servicios/defensa-juridica" className="hover:text-[#701218] transition-colors">{t('defense.legalDefense')}</Link></li>
                        <li><Link href="/contacto" className="hover:text-[#701218] transition-colors">{t('defense.consultDenial')}</Link></li>
                    </ul>
                </div>
            </Container>
        </footer>
    );
}
