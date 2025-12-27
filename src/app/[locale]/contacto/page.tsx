"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, MessageCircle, ShieldCheck } from "lucide-react";

export default function ContactPage() {
    const t = useTranslations("ContactPage");

    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.8 }
    };

    return (
        <main className="pt-20 bg-white">
            {/* Hero Section */}
            <section className="py-24 border-b border-slate-50">
                <Container>
                    <motion.div {...fadeIn} className="max-w-3xl">
                        <h1 className="font-serif text-5xl md:text-6xl font-bold text-slate-900 mb-8 leading-tight">
                            {t('hero.title')}
                        </h1>
                        <p className="text-xl text-slate-600 leading-relaxed border-l-4 border-[#701218]/20 pl-6">
                            {t('hero.subtitle')}
                        </p>
                    </motion.div>
                </Container>
            </section>

            <section className="py-24">
                <Container>
                    <div className="grid lg:grid-cols-12 gap-16">
                        {/* Contact Methods */}
                        <div className="lg:col-span-5 space-y-12">
                            <motion.div {...fadeIn} transition={{ delay: 0.1 }}>
                                <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-[#701218] mb-10">
                                    Canales de comunicación
                                </h2>

                                <div className="space-y-10">
                                    {/* WhatsApp */}
                                    <div className="group">
                                        <div className="flex gap-6 items-start">
                                            <div className="w-12 h-12 bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-[#701218]/5 transition-colors">
                                                <MessageCircle className="w-6 h-6 text-[#701218]" />
                                            </div>
                                            <div>
                                                <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">
                                                    {t('methods.whatsapp.title')}
                                                </h3>
                                                <p className="text-slate-600 mb-6 leading-relaxed">
                                                    {t('methods.whatsapp.description')}
                                                </p>
                                                <Button asChild className="bg-[#701218] hover:bg-[#590e13] text-white rounded-none px-8 py-6 h-auto uppercase tracking-widest text-[10px] font-bold shadow-lg shadow-[#701218]/10 transition-all hover:-translate-y-1">
                                                    <a href="https://wa.me/34637058570" target="_blank" rel="noopener noreferrer">
                                                        {t('methods.whatsapp.button')}
                                                    </a>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="group pt-10 border-t border-slate-50">
                                        <div className="flex gap-6 items-start">
                                            <div className="w-12 h-12 bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-slate-100 transition-colors">
                                                <Mail className="w-6 h-6 text-slate-400 group-hover:text-[#701218] transition-colors" />
                                            </div>
                                            <div>
                                                <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">
                                                    {t('methods.email.title')}
                                                </h3>
                                                <p className="text-slate-600 mb-4 leading-relaxed">
                                                    {t('methods.email.description')}
                                                </p>
                                                <a href="mailto:info@abogadoswatson.com" className="text-slate-900 font-bold hover:text-[#701218] transition-colors border-b-2 border-slate-100 pb-1">
                                                    info@abogadoswatson.com
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Office */}
                                    <div className="group pt-10 border-t border-slate-50">
                                        <div className="flex gap-6 items-start">
                                            <div className="w-12 h-12 bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-slate-100 transition-colors">
                                                <MapPin className="w-6 h-6 text-slate-400 group-hover:text-[#701218] transition-colors" />
                                            </div>
                                            <div>
                                                <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">
                                                    {t('methods.office.title')}
                                                </h3>
                                                <p className="text-slate-600 mb-2 leading-relaxed">
                                                    {t('methods.office.description')}
                                                </p>
                                                <p className="text-slate-900 font-bold">
                                                    {t('methods.office.address')}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-7">
                            <motion.div
                                {...fadeIn}
                                transition={{ delay: 0.3 }}
                                className="bg-slate-50 p-8 md:p-12 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#701218]/5 rounded-full -mr-16 -mt-16" />

                                <h2 className="font-serif text-3xl font-bold text-slate-900 mb-8 relative z-10">
                                    {t('form.title')}
                                </h2>

                                <form className="space-y-6 relative z-10">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{t('form.name')}</label>
                                            <Input className="bg-white border-slate-200 rounded-none h-14 focus:border-[#701218] transition-colors" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{t('form.email')}</label>
                                            <Input type="email" className="bg-white border-slate-200 rounded-none h-14 focus:border-[#701218] transition-colors" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{t('form.phone')}</label>
                                        <Input className="bg-white border-slate-200 rounded-none h-14 focus:border-[#701218] transition-colors" />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{t('form.message')}</label>
                                        <Textarea className="bg-white border-slate-200 rounded-none min-h-[160px] focus:border-[#701218] transition-colors resize-none" />
                                    </div>

                                    <div className="pt-4">
                                        <Button className="w-full h-16 bg-slate-900 hover:bg-slate-800 text-white rounded-none uppercase tracking-[0.2em] text-[11px] font-bold transition-all">
                                            {t('form.submit')}
                                        </Button>
                                    </div>

                                    <div className="pt-6 flex gap-4 items-start">
                                        <ShieldCheck className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                                        <p className="text-[11px] text-slate-500 leading-relaxed font-light">
                                            {t('form.privacy')}
                                        </p>
                                    </div>
                                </form>
                            </motion.div>
                        </div>
                    </div>
                </Container>
            </section>
        </main>
    );
}
