"use client";

import * as React from "react";
import { Link, usePathname } from "@/navigation";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "./language-switcher";
import { serviceCategories } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
    isLightMode?: boolean;
}

export function MobileMenu({ isLightMode = true }: MobileMenuProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [expandedCategory, setExpandedCategory] = React.useState<string | null>(null);
    const t = useTranslations("Navigation");
    const tServices = useTranslations("ServicesPage");
    const pathname = usePathname();

    const navCategories = serviceCategories.map((cat) => ({
        title: tServices(`categories.${cat.key}.title`),
        services: cat.services.map((svc) => ({
            title: tServices(`categories.${cat.key}.services.${svc.key}.title`),
            href: svc.href,
        })),
    }));

    // Close menu when pathname changes
    React.useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    // Prevent scroll when menu is open
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isOpen]);

    return (
        <div className="md:hidden">
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(true)}
                className={isLightMode ? "text-slate-700" : "text-white"}
            >
                <Menu className="h-6 w-6" />
            </Button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Menu Panel & Backdrop combined for reliability */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 z-[70] w-full h-[100dvh] bg-white/95 flex flex-col overflow-hidden"
                            style={{
                                backdropFilter: "blur(24px)",
                                WebkitBackdropFilter: "blur(24px)"
                            }}
                        >
                            {/* Header (Clean & Opaque) */}
                            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-white shrink-0">
                                <Link href="/">
                                    <span onClick={() => setIsOpen(false)}>
                                        <img
                                            src="/images/logo-horizontal.png"
                                            alt="Abogados Watson"
                                            className="h-8 w-auto"
                                        />
                                    </span>
                                </Link>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setIsOpen(false)}
                                    className="text-slate-900"
                                >
                                    <X className="h-6 w-6" />
                                </Button>
                            </div>

                            {/* Content (Scrollable) */}
                            <div className="flex-1 overflow-y-auto px-6">
                                <div className="max-w-md mx-auto space-y-10 py-10">
                                    {/* Services Section */}
                                    <div className="space-y-6">
                                        <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400">
                                            {t('services')}
                                        </h3>
                                        <div className="grid gap-8">
                                            {navCategories.map((category) => (
                                                <div key={category.title} className="space-y-4">
                                                    <h4 className="text-sm font-bold text-slate-900 border-l-2 border-[#701218] pl-4">
                                                        {category.title}
                                                    </h4>
                                                    <div className="grid gap-3 pl-4">
                                                        {category.services.map((service) => (
                                                            <Link
                                                                key={service.title}
                                                                href={service.href}
                                                                className="text-base font-medium text-slate-600 hover:text-[#701218] py-1 block transition-colors"
                                                            >
                                                                {service.title}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Main Links */}
                                    <div className="space-y-6 border-t border-slate-100 pt-10">
                                        <Link href="/sobre-nosotros" className="block text-xl font-bold text-slate-900 hover:text-[#701218] transition-colors">
                                            {t('about')}
                                        </Link>
                                    </div>

                                    {/* Language Selector */}
                                    <div className="pt-6 border-t border-slate-100 flex items-center justify-between pb-12">
                                        <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                                            Idioma
                                        </span>
                                        <LanguageSwitcher />
                                    </div>
                                </div>
                            </div>

                            {/* Footer (Action) */}
                            <div className="p-6 bg-white border-t border-slate-100 shrink-0">
                                <Button asChild className="w-full h-16 bg-[#701218] hover:bg-[#590e13] text-white uppercase tracking-[0.3em] text-xs font-bold shadow-xl">
                                    <Link href="/contacto">{t('contact')}</Link>
                                </Button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
