"use client";

import { Container } from "@/components/ui/container";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const testimonials = [
    {
        contentKey: "testimonials.testimonial1.content",
        authorKey: "testimonials.testimonial1.author",
        roleKey: "testimonials.testimonial1.role",
        rating: 5
    },
    {
        contentKey: "testimonials.testimonial2.content",
        authorKey: "testimonials.testimonial2.author",
        roleKey: "testimonials.testimonial2.role",
        rating: 5
    },
    {
        contentKey: "testimonials.testimonial3.content",
        authorKey: "testimonials.testimonial3.author",
        roleKey: "testimonials.testimonial3.role",
        rating: 5
    }
];

export function Testimonials() {
    const t = useTranslations("HomePage");

    return (
        <section className="py-24 bg-slate-50 border-t border-slate-200">
            <Container>
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4">{t('testimonials.title')}</h2>
                    <div className="flex justify-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-[#701218] text-[#701218]" />
                        ))}
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 italic relative transition-all duration-300"
                        >
                            <div className="text-4xl text-[#701218]/20 font-serif absolute top-4 left-6">&quot;</div>
                            <p className="text-slate-700 mb-6 relative z-10">{t(testimonial.contentKey)}</p>
                            <div>
                                <div className="font-bold text-slate-900">{t(testimonial.authorKey)}</div>
                                <div className="text-sm text-[#701218]">{t(testimonial.roleKey)}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
