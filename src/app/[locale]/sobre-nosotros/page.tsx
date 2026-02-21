"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Shield, Target, Users, ArrowRight } from "lucide-react";

export default function AboutPage() {
    const t = useTranslations("AboutPage");

    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, ease: "easeOut" as const }
    };

    const staggering = {
        animate: {
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <main className="pt-20 bg-white">
            {/* Hero Section */}
            <section className="relative py-24 bg-white overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 skew-x-12 translate-x-1/4" />
                </div>

                <Container className="relative z-10">
                    <motion.div {...fadeIn} className="max-w-3xl">
                        <span className="inline-block px-0 mb-6 text-xs font-bold tracking-[0.2em] text-[#701218] uppercase border-b-2 border-[#701218]/20 pb-1">
                            {t('hero.subtitle')}
                        </span>
                        <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight text-[#0F172A] leading-[1.1] mb-8">
                            {t('hero.title')}
                        </h1>
                        <p className="text-xl text-slate-600 max-w-xl leading-relaxed italic border-l-4 border-[#701218]/20 pl-6">
                            {t('hero.description')}
                        </p>
                    </motion.div>
                </Container>
            </section>

            {/* Who We Are / Intro */}
            <section className="py-24 bg-slate-50">
                <Container>
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="font-serif text-4xl font-bold text-[#0F172A] leading-tight">
                                {t('intro.title')}
                            </h2>
                            <div className="mt-8 w-20 h-1 bg-[#701218]" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="space-y-6 text-lg text-slate-600 leading-relaxed"
                        >
                            <p>{t('intro.p1')}</p>
                            <p>{t('intro.p2')}</p>
                        </motion.div>
                    </div>
                </Container>
            </section>

            {/* Methodology / Values */}
            <section className="py-24 bg-white">
                <Container>
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="font-serif text-4xl font-bold text-[#0F172A] mb-4">{t('methodology.title')}</h2>
                        <p className="text-[#701218] font-bold tracking-widest uppercase text-xs">
                            {t('methodology.subtitle')}
                        </p>
                    </div>

                    <motion.div
                        variants={staggering}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-3 gap-8"
                    >
                        {[
                            { icon: Shield, key: 'item1' },
                            { icon: Target, key: 'item2' },
                            { icon: Users, key: 'item3' }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                variants={fadeIn}
                                className="p-8 bg-slate-50 border border-slate-200 rounded-lg hover:shadow-xl transition-all duration-300 group"
                            >
                                <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center mb-6 shadow-sm group-hover:bg-[#701218]/10 transition-colors duration-300">
                                    <item.icon className="w-6 h-6 text-[#701218]" />
                                </div>
                                <h3 className="font-serif text-xl font-bold text-[#0F172A] mb-4">
                                    {t(`methodology.${item.key}.title`)}
                                </h3>
                                <p className="text-slate-600 leading-relaxed">
                                    {t(`methodology.${item.key}.description`)}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </Container>
            </section>

            {/* Team Section — sin fotografías: avatar con inicial */}
            <section className="py-24 bg-slate-50">
                <Container>
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="font-serif text-4xl font-bold text-[#0F172A] mb-4">{t('team.title')}</h2>
                        <p className="text-slate-600">
                            {t('team.subtitle')}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {t.raw('team.members').map((member: { name: string; role: string; bio: string }, index: number) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.08 }}
                                className="bg-white border border-slate-100 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col"
                            >
                                <div
                                    className="w-16 h-16 rounded-full bg-[#701218]/10 flex items-center justify-center mb-6 flex-shrink-0"
                                    aria-hidden
                                >
                                    <span className="font-serif text-2xl font-bold text-[#701218]">
                                        {member.name.trim().charAt(0)}
                                    </span>
                                </div>
                                <h3 className="font-serif text-xl font-bold text-[#0F172A] mb-1">
                                    {member.name}
                                </h3>
                                <p className="text-[#701218] font-bold text-xs uppercase tracking-widest mb-4">
                                    {member.role}
                                </p>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    {member.bio}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* CTA Final */}
            <section className="py-24 bg-white">
                <Container>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-slate-50 p-12 md:p-20 text-center relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#701218]/5 rounded-full -mr-16 -mt-16" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#701218]/5 rounded-full -ml-16 -mb-16" />

                        <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#0F172A] mb-6">
                            {t('cta.title')}
                        </h2>
                        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
                            {t('cta.description')}
                        </p>
                        <Button asChild size="lg" className="h-16 px-10 text-xs font-bold uppercase tracking-widest bg-[#701218] text-white hover:bg-[#590e13] shadow-xl shadow-[#701218]/10 group">
                            <Link href="/contacto" className="flex items-center gap-3">
                                {t('cta.button')}
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>
                    </motion.div>
                </Container>
            </section>
        </main>
    );
}

