"use client";

import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export function Hero() {
    const t = useTranslations("HomePage");

    return (
        <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-white pt-20">
            {/* Background Narrative Texture - World Map & Connectivity */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {/* Ambient Light */}
                <div className="absolute -top-[30%] -left-[20%] w-[80%] h-[160%] bg-gradient-to-br from-amber-50/40 via-slate-50/30 to-transparent blur-[120px] -rotate-12 opacity-70" />

                {/* Custom SVG World Map Background (Spain Centered & Zoomed Out) */}
                <svg
                    className="absolute inset-0 w-full h-full opacity-[0.2]"
                    viewBox="0 0 1000 500"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid slice"
                >
                    {/* Meridians and Parallels - Global Grid */}
                    <g stroke="#94a3b8" strokeWidth="0.5" strokeOpacity="0.4">
                        {[0, 100, 200, 300, 400, 500].map(y => (
                            <path key={`p-${y}`} d={`M0 ${y} Q 500 ${y - 20} 1000 ${y}`} />
                        ))}
                        {[100, 200, 300, 400, 500, 600, 700, 800, 900].map(x => (
                            <path key={`m-${x}`} d={`M${x} 0 Q ${x + 50} 250 ${x} 500`} />
                        ))}
                    </g>

                    {/* Recognizable Continental Outlines (Line Art) */}
                    <g stroke="#cbd5e1" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                        {/* Europe & Africa (Centered) */}
                        <path d="M480 120 L 490 115 L 510 110 L 530 115 L 550 130 L 540 160 L 560 180 L 540 200 L 550 250 L 530 350 L 500 450 L 450 420 L 420 350 L 440 300 L 410 250 L 420 200 L 450 180 L 470 170 Z" />

                        {/* Americas (Left) */}
                        <path d="M100 80 L 150 70 L 220 120 L 200 200 L 150 220 L 180 300 L 220 450 L 180 480 L 120 400 L 140 300 L 80 200 L 60 100 Z" />

                        {/* Asia & Australia (Right) */}
                        <path d="M650 100 L 750 80 L 850 120 L 950 150 L 920 250 L 850 300 L 880 400 L 820 450 L 780 400 L 800 300 L 700 250 L 620 200 L 630 150 Z" />
                        <path d="M850 350 A 20 20 0 1 0 890 350 A 20 20 0 1 0 850 350" /> {/* Australia simplified */}
                    </g>

                    {/* International Mobility Paths - Connecting to Spain */}
                    <g stroke="#701218" strokeWidth="1" strokeDasharray="5 5" className="opacity-50">
                        {/* America to Spain */}
                        <path d="M180 220 Q 300 150 480 180">
                            <animate attributeName="stroke-dashoffset" from="100" to="0" dur="20s" repeatCount="indefinite" />
                        </path>
                        {/* Asia to Spain */}
                        <path d="M850 200 Q 650 120 480 180">
                            <animate attributeName="stroke-dashoffset" from="0" to="100" dur="25s" repeatCount="indefinite" />
                        </path>
                    </g>

                    {/* Focal Point - Spain (Strategic geographic location) */}
                    <g className="animate-pulse">
                        <circle cx="480" cy="183" r="6" fill="#701218" fillOpacity="0.2" />
                        <circle cx="480" cy="183" r="3" fill="#701218" />
                    </g>
                </svg>

                {/* Bottom transition gradient */}
                <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-white to-transparent z-10" />
            </div>

            <Container className="relative z-10 grid gap-12 lg:grid-cols-2 lg:gap-8 items-center py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-2xl"
                >
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        <span className="inline-block px-0 mb-6 text-xs font-bold tracking-[0.2em] text-[#701218] uppercase border-b-2 border-[#701218]/20 pb-1">
                            {t('subtitle')}
                        </span>
                    </motion.div>

                    <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-8">
                        {t('title')}
                    </h1>

                    <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-xl leading-relaxed font-medium">
                        {t('description')}
                    </p>

                    <div className="mt-12 flex flex-col sm:flex-row gap-5">
                        <Button asChild size="lg" className="h-16 px-10 text-xs font-bold uppercase tracking-widest bg-[#701218] text-white hover:bg-[#590e13] transition-all rounded-none shadow-xl shadow-[#701218]/10">
                            <Link href="/contacto">{t('ctaMain')}</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="h-16 px-10 text-xs font-bold uppercase tracking-widest bg-transparent text-slate-900 border-slate-200 hover:bg-slate-50 hover:border-slate-400 transition-all rounded-none">
                            <Link href="/servicios">{t('ctaSecondary')}</Link>
                        </Button>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
                    className="relative hidden lg:block"
                >
                    <div className="relative aspect-[4/5] w-full max-w-md ml-auto overflow-hidden shadow-2xl rounded-sm">
                        <img
                            src="/images/hero-main-human.png"
                            alt="Profesional internacional en España"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-slate-900/5 mix-blend-multiply" />
                        <div className="absolute inset-0 border-[20px] border-white/10" />
                    </div>

                    {/* Floating Authority Badge */}
                    <div className="absolute -bottom-6 -left-6 bg-white p-8 shadow-2xl border border-slate-100 max-w-[240px]">
                        <p className="text-[#701218] font-bold text-3xl font-serif mb-1">15+</p>
                        <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500 leading-tight">
                            Años de experiencia en derecho de extranjería técnico
                        </p>
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}
