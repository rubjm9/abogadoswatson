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

export function MobileMenu() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [expandedCategory, setExpandedCategory] = React.useState<string | null>(null);
    const t = useTranslations("Navigation");
    const pathname = usePathname();

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
                className="text-slate-700"
            >
                <Menu className="h-6 w-6" />
            </Button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Full Screen Backdrop with Strong Blur (Captures the whole page) */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-[60] bg-white/40"
                            style={{
                                backdropFilter: "blur(60px)",
                                WebkitBackdropFilter: "blur(60px)"
                            }}
                        />

                        {/* Menu Panel (Above the backdrop) */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 z-[70] w-full h-[100dvh] flex flex-col overflow-hidden pointer-events-none"
                        >
                            {/* Header (Opaque) */}
                            <div className="flex items-center justify-between p-6 border-b border-slate-200/50 bg-white shadow-sm shrink-0 pointer-events-auto">
                                <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#701218]">Menú</span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setIsOpen(false)}
                                    className="text-slate-900"
                                >
                                    <X className="h-6 w-6" />
                                </Button>
                            </div>

                            {/* Content (Opaque-ish and scrollable) */}
                            <div className="flex-1 overflow-y-auto px-6 py-4 pointer-events-auto bg-white/10 backdrop-blur-sm">
                                <div className="max-w-md mx-auto space-y-10 py-6">
                                    {/* Services Section */}
                                    <div className="space-y-4">
                                        <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400">
                                            {t('services')}
                                        </h3>
                                        <div className="grid gap-6">
                                            {serviceCategories.map((category) => (
                                                <div key={category.title} className="space-y-3">
                                                    <h4 className="text-sm font-bold text-slate-900 border-l-2 border-[#701218] pl-3">
                                                        {category.title}
                                                    </h4>
                                                    <div className="grid gap-2 pl-3">
                                                        {category.services.map((service) => (
                                                            <Link
                                                                key={service.title}
                                                                href={service.href}
                                                                className="text-sm font-medium text-slate-600 hover:text-[#701218] py-1 block"
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
                                    <div className="space-y-4 border-t border-slate-100 pt-8">
                                        <Link href="/sobre-nosotros" className="block text-xl font-bold text-slate-900 hover:text-[#701218]">
                                            {t('about')}
                                        </Link>
                                        <Link href="/blog" className="block text-xl font-bold text-slate-900 hover:text-[#701218]">
                                            {t('blog')}
                                        </Link>
                                    </div>

                                    {/* Language Selector */}
                                    <div className="pt-6 border-t border-slate-100 flex items-center justify-between pb-8">
                                        <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                                            Idioma
                                        </span>
                                        <LanguageSwitcher />
                                    </div>
                                </div>
                            </div>

                            {/* Footer (Fixed Opaque) */}
                            <div className="p-6 bg-white border-t border-slate-200 shrink-0 pointer-events-auto">
                                <Button asChild className="w-full h-14 bg-[#701218] hover:bg-[#500d11] text-white rounded-none uppercase tracking-[0.3em] text-xs font-bold shadow-xl">
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
