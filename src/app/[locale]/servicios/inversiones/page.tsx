import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { Landmark, ShieldCheck, Scale, Building2, Gavel, ArrowRight, CheckCircle2, FileSearch, Eye, Users } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Inversores y Emprendedores Extranjeros en España | Abogados Watson",
    description: "Servicios legales de alta especialización para inversores extranjeros y emprendedores. Golden Visa, Due Diligence legal y protección patrimonial en España.",
    keywords: ["Inversores y Emprendedores Extranjeros España", "Golden Visa España", "Protección Patrimonial", "Due Diligence Legal España", "Visado de Emprendedor"]
};

export default function InversionesPage() {
    return (
        <main className="min-h-screen bg-slate-50 text-slate-900">
            <Breadcrumbs items={[{ label: "Inversión y Negocios", href: "/servicios/negocios" }, { label: "Inversores y Emprendedores" }]} />

            {/* HERO SECTION - Premium & Secure */}
            <section className="relative py-24 bg-slate-900 overflow-hidden text-white">
                <div className="absolute inset-0 bg-slate-900/95 z-10" />
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#C5A059]/20 to-transparent z-20" />

                <Container className="relative z-30">
                    <div className="max-w-4xl">
                        <span className="text-[#C5A059] font-bold tracking-widest uppercase text-xs mb-4 block">
                            High-Net-Worth & Business Mobility
                        </span>
                        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
                            Protección Juridica para Inversores y Emprendedores Globales
                        </h1>
                        <p className="text-xl text-slate-300 leading-relaxed mb-8 max-w-2xl">
                            Aseguramos tu patrimonio y tus proyectos en España. Especialistas en **Due Diligence legal** y gestión de residencias por inversión (Golden Visa) con un enfoque en la seguridad a largo plazo.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Button asChild size="lg" className="bg-[#701218] hover:bg-[#5a0e13] h-14 px-8 font-bold uppercase tracking-widest text-xs">
                                <Link href="/contacto">Analizar seguridad jurídica de mi inversión</Link>
                            </Button>
                        </div>
                    </div>
                </Container>
            </section>

            {/* DUE DILIGENCE Y PROTECCIÓN PATRIMONIAL */}
            <section className="py-24 bg-white">
                <Container>
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        {/* Due Diligence */}
                        <div className="p-10 rounded-2xl border border-slate-100 bg-slate-50">
                            <FileSearch className="w-12 h-12 text-[#C5A059] mb-6" />
                            <h2 className="text-2xl font-serif font-bold mb-4">Due Diligence Legal Inmobiliaria y Mercantil</h2>
                            <p className="text-slate-600 mb-6 leading-relaxed">
                                Antes de comprometer capital, verificamos la realidad jurídica de activos y estructuras. Minimizamos riesgos registrales, cargas ocultas y contingencias fiscales.
                            </p>
                            <ul className="space-y-4 text-sm text-slate-700">
                                <li className="flex gap-3">
                                    <ShieldCheck className="w-5 h-5 text-[#C5A059] shrink-0" />
                                    <span><strong>Verificación Registral:</strong> Análisis exhaustivo de cargas, servidumbres y titularidades en el Registro de la Propiedad.</span>
                                </li>
                                <li className="flex gap-3">
                                    <ShieldCheck className="w-5 h-5 text-[#C5A059] shrink-0" />
                                    <span><strong>Auditoría Normativa:</strong> Cumplimiento de licencias, normativa urbanística y regulaciones específicas de inversión extranjera.</span>
                                </li>
                                <li className="flex gap-3">
                                    <ShieldCheck className="w-5 h-5 text-[#C5A059] shrink-0" />
                                    <span><strong>Estructura Segura:</strong> Diseño de la forma de adquisición para optimizar la protección del inversor.</span>
                                </li>
                            </ul>
                        </div>

                        {/* Protección Patrimonial */}
                        <div className="p-10 rounded-2xl border border-slate-100 bg-slate-50">
                            <Landmark className="w-12 h-12 text-[#C5A059] mb-6" />
                            <h2 className="text-2xl font-serif font-bold mb-4">Blindaje y Protección Patrimonial</h2>
                            <p className="text-slate-600 mb-6 leading-relaxed">
                                Implementamos estrategias legales para salvaguardar tus activos internacionales y locales bajo el marco jurídico español y europeo.
                            </p>
                            <ul className="space-y-4 text-sm text-slate-700">
                                <li className="flex gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-[#C5A059] shrink-0" />
                                    <span><strong>Planificación Sucesoria:</strong> Protocolos familiares y testamentos transfronterizos.</span>
                                </li>
                                <li className="flex gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-[#C5A059] shrink-0" />
                                    <span><strong>Estructuración Societaria:</strong> Creación de holdings y vehículos de inversión protegidos.</span>
                                </li>
                                <li className="flex gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-[#C5A059] shrink-0" />
                                    <span><span><strong>Cumplimiento (UGE):</strong> Mantenimiento de los requisitos de inversión para la vigencia de tu residencia.</span></span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Container>
            </section>

            {/* RESOLUCIÓN DE CONFLICTOS Y DEFENSA */}
            <section className="py-24 bg-slate-900 text-white">
                <Container>
                    <div className="max-w-4xl mx-auto bg-white/5 p-12 rounded-3xl border border-white/10 backdrop-blur-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
                            <Gavel className="w-32 h-32 text-[#C5A059]" />
                        </div>
                        <div className="relative z-10">
                            <h2 className="text-3xl font-serif font-bold mb-6">Defensa Ante Conflictos Administrativos</h2>
                            <p className="text-slate-400 mb-8 leading-relaxed max-w-2xl">
                                Las inversiones de alto valor a veces enfrentan bloqueos registrales o denegaciones arbitrarias por parte de la administración. Nuestro equipo de **Litigación y Defensa Jurídica** interviene ante cualquier obstáculo legal.
                            </p>
                            <Button asChild variant="outline" className="border-[#C5A059] text-[#C5A059] hover:bg-[#C5A059] hover:text-white">
                                <Link href="/servicios/defensa-juridica" className="flex items-center gap-2">
                                    Ver Defensa Jurídica Inversionista <ArrowRight className="w-4 h-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </Container>
            </section>

            {/* SECCIÓN ENTIDADES Y PROYECTOS EMPRENDEDORES */}
            <section className="py-24 bg-white">
                <Container>
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                                    <Building2 className="w-8 h-8 text-[#C5A059] mb-4" />
                                    <h4 className="font-bold text-sm mb-2">Visado de Emprendedor</h4>
                                    <p className="text-[10px] text-slate-500 uppercase tracking-widest">Ley 14/2013</p>
                                </div>
                                <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                                    <Scale className="w-8 h-8 text-[#C5A059] mb-4" />
                                    <h4 className="font-bold text-sm mb-2">Inversión Mobiliaria</h4>
                                    <p className="text-[10px] text-slate-500 uppercase tracking-widest">Fondos y Capital</p>
                                </div>
                                <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                                    <Eye className="w-8 h-8 text-[#C5A059] mb-4" />
                                    <h4 className="font-bold text-sm mb-2">Verificación Técnica</h4>
                                    <p className="text-[10px] text-slate-500 uppercase tracking-widest">Pre-Inversión</p>
                                </div>
                                <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                                    <Users className="w-8 h-8 text-[#C5A059] mb-4" />
                                    <h4 className="font-bold text-sm mb-2">Gestión de Family Office</h4>
                                    <p className="text-[10px] text-slate-500 uppercase tracking-widest">Estructura Global</p>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Desarrollo de Proyectos de Interés Económico</h2>
                            <p className="text-slate-600 mb-8 leading-relaxed">
                                No solo gestionamos el visado; validamos la viabilidad legal y técnica de tu plan de negocio en España ante Enisa y otros organismos reguladores.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex gap-3 text-sm text-slate-700 items-start">
                                    <CheckCircle2 className="w-5 h-5 text-[#C5A059] shrink-0" />
                                    <span>Análisis de carácter innovador y escalabilidad para la Ley de Startups.</span>
                                </li>
                                <li className="flex gap-3 text-sm text-slate-700 items-start">
                                    <CheckCircle2 className="w-5 h-5 text-[#C5A059] shrink-0" />
                                    <span>Asesoramiento en la obtención de financiación pública y beneficios fiscales.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Container>
            </section>

            {/* FINAL CTA - High Intent */}
            <section className="py-24 bg-slate-50 border-t border-slate-100">
                <Container className="text-center">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Invierte con certezas, no con suposiciones</h2>
                    <p className="text-[#C5A059] font-bold text-sm uppercase tracking-widest mb-12">Consultoría legal de alto nivel para capital internacional</p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg" className="bg-[#701218] hover:bg-[#5a0e13] h-14 px-8 font-bold uppercase tracking-widest text-xs">
                            <Link href="/contacto">Analizar seguridad jurídica de mi inversión</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="border-slate-300 h-14 px-8 font-bold uppercase tracking-widest text-xs">
                            <Link href="/contacto">Consulta sobre Golden Visa</Link>
                        </Button>
                    </div>
                </Container>
            </section>
        </main>
    );
}
