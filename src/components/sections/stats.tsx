"use client";

import { Container } from "@/components/ui/container";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";

const stats = [
    { labelKey: "stats.years", value: "15+" },
    { labelKey: "stats.cases", value: "2,500+" },
    { labelKey: "stats.countries", value: "30+" },
    { labelKey: "stats.satisfaction", value: "99%" },
];

export function Stats() {
    const t = useTranslations("HomePage");
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section className="bg-slate-900 py-12 border-y border-slate-800">
            <Container>
                <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            className="text-center"
                        >
                            <div className="text-3xl lg:text-4xl font-serif font-bold text-white mb-2">
                                {stat.value}
                            </div>
                            <div className="text-sm text-slate-400 uppercase tracking-wider font-medium">
                                {t(stat.labelKey)}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
