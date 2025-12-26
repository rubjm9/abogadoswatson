"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { motion } from "framer-motion";
import { Globe2, Briefcase, Building2, Users } from "lucide-react";

const services = [
    {
        icon: Globe2,
        title: "Establecer tu residencia",
        description: "Vivir en España: Visados de estudio, nómadas digitales y reagrupación familiar.",
        href: "/servicios"
    },
    {
        icon: Briefcase,
        title: "Trabajar y talento",
        description: "Tu carrera profesional: Profesionales altamente cualificados y emprendedores.",
        href: "/servicios"
    },
    {
        icon: Users,
        title: "Obtener tu pasaporte",
        description: "Nacionalidad Española: Ley de nietos, nacionalidad por residencia y carta de naturaleza.",
        href: "/servicios"
    },
    {
        icon: Building2,
        title: "Inversiones y Negocios",
        description: "Crecer en España: Visado de emprendedor y asesoramiento legal inmobiliario.",
        href: "/servicios"
    }
];

export function ServicesPreview() {
    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden">
            <Container>
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl font-serif font-bold text-slate-900 sm:text-4xl mb-4">
                        Soluciones Legales Globales
                    </h2>
                    <p className="text-slate-600">
                        Simplificamos la burocracia para que tú te centres en tu nuevo futuro.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -5 }}
                            className="group bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:border-[#701218]/30 hover:shadow-md transition-all"
                        >
                            <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#701218]/10 transition-colors">
                                <service.icon className="w-6 h-6 text-slate-700 group-hover:text-[#701218] transition-colors" />
                            </div>
                            <h3 className="text-xl font-serif font-bold text-slate-900 mb-3 group-hover:text-[#701218] transition-colors">
                                {service.title}
                            </h3>
                            <p className="text-slate-600 text-sm leading-relaxed mb-6">
                                {service.description}
                            </p>
                            <Link href={service.href} className="text-sm font-semibold text-[#701218] flex items-center gap-1 group-hover:gap-2 transition-all">
                                Más información <span>→</span>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <Button asChild variant="outline" className="border-slate-300 hover:border-slate-900">
                        <Link href="/servicios">Ver todos los servicios</Link>
                    </Button>
                </div>
            </Container>
        </section>
    );
}
