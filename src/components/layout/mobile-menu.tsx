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
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-[60] bg-slate-950/20 backdrop-blur-sm"
                        />

                        {/* Menu Panel */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "tween", duration: 0.3 }}
                            className="fixed inset-0 z-[70] w-full h-full bg-white/80 backdrop-blur-2xl flex flex-col pt-20"
                        >
                            <div className="flex items-center justify-between p-6 border-b border-slate-200/50 absolute top-0 left-0 w-full bg-white/50">
                                <span className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Menú</span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setIsOpen(false)}
                                    className="text-slate-900"
                                >
                                    <X className="h-6 w-6" />
                                </Button>
                            </div>

                            <div className="flex-1 overflow-y-auto px-8 py-10 space-y-12">
                                {/* Services Section */}
                                <div className="space-y-6">
                                    <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#701218] opacity-70">
                                        {t('services')}
                                    </h3>
                                    <div className="grid gap-6">
                                        {serviceCategories.map((category) => (
                                            <div key={category.title} className="space-y-3">
                                                <h4 className="text-sm font-serif font-bold text-slate-900 border-l-2 border-[#701218] pl-3">
                                                    {category.title}
                                                </h4>
                                                <div className="grid gap-2 pl-4">
                                                    {category.services.map((service) => (
                                                        <Link
                                                            key={service.title}
                                                            href={service.href}
                                                            className="text-sm text-slate-600 hover:text-[#701218] py-1 block transition-colors"
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
                                <div className="space-y-6 border-t border-slate-200/50 pt-10">
                                    <Link href="/sobre-nosotros" className="block text-xl font-serif font-bold text-slate-900">
                                        {t('about')}
                                    </Link>
                                    <Link href="/blog" className="block text-xl font-serif font-bold text-slate-900">
                                        {t('blog')}
                                    </Link>
                                </div>

                                {/* Language Selector */}
                                <div className="pt-6 border-t border-slate-200/50 flex items-center justify-between group">
                                    <span className="text-sm font-bold uppercase tracking-widest text-slate-400 font-sans">
                                        Idioma
                                    </span>
                                    <LanguageSwitcher />
                                </div>
                            </div>

                            <div className="p-8 bg-white/50 border-t border-slate-200/50">
                                <Button asChild className="w-full h-16 bg-[#701218] hover:bg-[#500d11] text-white rounded-none uppercase tracking-[0.2em] text-xs font-bold shadow-xl shadow-[#701218]/20">
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
