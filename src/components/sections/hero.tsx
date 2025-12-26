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
            {/* Background Narrative Texture - World Map & Connectivity (Premium Hybrid) */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-white">
                {/* Cinematic Light & Depth */}
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,#f8fafc_0%,transparent_100%)] opacity-100" />
                <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[140%] bg-gradient-to-br from-amber-50/20 via-white to-transparent blur-[120px] -rotate-12 opacity-80" />

                {/* Advanced SVG World Map */}
                <svg
                    className="absolute inset-0 w-full h-full opacity-[0.25] mix-blend-multiply"
                    viewBox="0 0 1000 500"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid slice"
                >
                    <defs>
                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="2" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                        <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.2" />
                            <stop offset="50%" stopColor="#cbd5e1" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.2" />
                        </linearGradient>
                    </defs>

                    {/* Meridians and Parallels - Cinematic Grid */}
                    <g stroke="url(#mapGradient)" strokeWidth="0.3">
                        {[0, 100, 200, 300, 400, 500].map(y => (
                            <path key={`p-${y}`} d={`M0 ${y} Q 500 ${y - 30} 1000 ${y}`} />
                        ))}
                        {[50, 150, 250, 350, 450, 550, 650, 750, 850, 950].map(x => (
                            <path key={`m-${x}`} d={`M${x} -100 Q ${x + 80} 250 ${x} 600`} />
                        ))}
                    </g>

                    {/* Continental Outlines with Depth */}
                    <g stroke="#94a3b8" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.6">
                        {/* Europe & Africa (Centered Focus) */}
                        <path d="M485 125 L 495 120 L 515 115 L 535 120 L 555 135 L 545 165 L 565 185 L 545 205 L 555 255 L 535 355 L 505 455 L 455 425 L 425 355 L 445 305 L 415 255 L 425 205 L 455 185 L 475 175 Z" filter="url(#glow)" />

                        {/* Americas (Left - Slightly Blurry) */}
                        <path d="M100 80 L 150 70 L 220 120 L 205 205 L 155 225 L 185 305 L 225 455 L 185 485 L 125 405 L 145 305 L 85 205 L 65 105 Z" opacity="0.4" />

                        {/* Asia & Australia (Right) */}
                        <path d="M655 105 L 755 85 L 855 125 L 955 155 L 925 255 L 855 305 L 885 405 L 825 455 L 785 405 L 805 305 L 705 255 L 625 205 L 635 155 Z" opacity="0.4" />
                    </g>

                    {/* Animated Connection Glows */}
                    <g stroke="#701218" strokeWidth="1.5" strokeDasharray="6 30" opacity="0.6">
                        <motion.path
                            d="M180 220 Q 300 120 480 183"
                            animate={{ strokeDashoffset: [300, 0] }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.path
                            d="M850 200 Q 650 90 480 183"
                            animate={{ strokeDashoffset: [0, 300] }}
                            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                        />
                    </g>

                    {/* High-Authority Focal Point (Spain) */}
                    <g filter="url(#glow)">
                        <motion.circle
                            cx="482" cy="184" r="10" fill="#701218" fillOpacity="0.1"
                            animate={{ r: [8, 12, 8] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <circle cx="482" cy="184" r="5" fill="#701218" fillOpacity="0.3" />
                        <circle cx="482" cy="184" r="2.5" fill="#701218" />
                    </g>
                </svg>

                {/* Texture Overlay (Grain) */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
                />

                {/* Bottom transition gradient */}
                <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-white via-white/80 to-transparent z-10" />
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
