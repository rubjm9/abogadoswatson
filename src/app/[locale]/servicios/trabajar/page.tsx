import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { Briefcase, Building2, UserCheck, Zap, ShieldAlert, ArrowRight, Lightbulb } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Visado de Trabajo y Talento en España | Abogados Watson",
    description: "Gestión experta de autorizaciones para profesionales cualificados, emprendedores y traslados corporativos ante la UGE. Agilidad legal para tu carrera.",
};

export default function TrabajarPage() {
    const services = [
        {
            title: "Profesionales Cualificados (PAC)",
            subtitle: "Talento de alta cualificación",
            desc: "Tramitación de autorizaciones para perfiles directivos, técnicos o graduados de universidades prestigiosas ante la UGE.",
            icon: UserCheck
        },
        {
            title: "Movilidad Corporativa",
            subtitle: "Soluciones para Empresas",
            desc: "Gestión legal para el traslado de empleados entre centros de una misma empresa o grupo empresarial nacional e internacional.",
            icon: Briefcase
        },
        {
            title: "Emprendedores",
            subtitle: "Ley de Startups",
            desc: "Asesoramiento para lanzar proyectos empresariales de carácter innovador y especial interés económico para España.",
            icon: Lightbulb
        },
        {
            title: "Inversores (Ley 14/2013)",
            subtitle: "Movilidad por inversión",
            desc: "Autorizaciones para proyectos empresariales, capital o inversión en activos financieros. Gestionamos tu perfil inversor y tu patrimonio inmobiliario.",
            icon: Building2
        },
        {
            title: "Unidad de Grandes Empresas",
            subtitle: "Tramitación ante la UGE-CE",
            desc: "Gestión directa ante el órgano especializado para agilizar procesos de talento internacional con criterios técnicos precisos.",
            icon: Zap
        }
    ];

    return (
        <main className="min-h-screen bg-slate-50 text-slate-900">
            <Breadcrumbs items={[{ label: "Trabajar y Talento" }]} />

            {/* SECCIÓN 1 — HERO */}
            <section className="relative py-24 bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/80 z-10" />
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#701218]/20 to-transparent z-20" />

                <Container className="relative z-10">
                    <div className="max-w-3xl">
                        <span className="text-[#701218] font-bold tracking-widest uppercase text-xs mb-4 block">
                            Carrera Profesional
                        </span>
                        <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
                            Impulsa tu carrera y talento profesional en España
                        </h1>
                        <p className="text-sm text-[#701218] font-bold mb-4 bg-[#701218]/10 px-3 py-1 rounded-sm inline-block">
                            Autorizaciones de trabajo por cuenta propia, ajena y Ley de Startups
                        </p>
                        <p className="text-xl text-slate-300 leading-relaxed max-w-2xl">
                            Acompañamos a profesionales y empresas en la gestión del talento global. Aseguramos la legalidad de tu actividad profesional con un enfoque en la agilidad y el cumplimiento normativo.
                        </p>
                    </div>
                </Container>
            </section>

            {/* SECCIÓN 2 — QUÉ SITUACIONES CUBRIMOS */}
            <section className="py-24">
                <Container>
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-serif font-bold mb-2">Servicios para el talento</h2>
                        <p className="text-[#701218] font-bold text-sm uppercase tracking-widest mb-6">Soluciones para perfiles profesionales y emprendedores</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((item, i) => (
                            <div key={i} className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:border-[#701218]/30 transition-all group">
                                <item.icon className="w-8 h-8 text-[#701218] mb-6" />
                                <h3 className="text-lg font-serif font-bold mb-1 leading-tight">{item.title}</h3>
                                <p className="text-[10px] font-bold text-[#701218] uppercase tracking-wider mb-4">{item.subtitle}</p>
                                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                                {(item.title === "Profesionales Cualificados (PAC)" || item.title === "Movilidad Corporativa") && (
                                    <div className="mt-4 pt-4 border-t border-slate-50">
                                        <Link href="/servicios/corporativo" className="text-xs font-bold text-[#701218] flex items-center gap-1 hover:translate-x-1 transition-transform">
                                            Soluciones B2B y requisitos <ArrowRight className="w-3 h-3" />
                                        </Link>
                                    </div>
                                )}
                                {item.title === "Emprendedores" && (
                                    <div className="mt-4 pt-4 border-t border-slate-50">
                                        <Link href="/servicios/inversiones" className="text-xs font-bold text-[#701218] flex items-center gap-1 hover:translate-x-1 transition-transform">
                                            Ley de Startups y visados <ArrowRight className="w-3 h-3" />
                                        </Link>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* SECCIÓN 3 — CÓMO TE AYUDAMOS */}
            <section className="py-24 bg-white border-y border-slate-200">
                <Container>
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-serif font-bold mb-2">Especialización en Talento</h2>
                            <p className="text-[#701218] font-bold text-sm uppercase tracking-widest mb-8">Gestión técnica ante la Unidad de Grandes Empresas (UGE)</p>
                            <p className="text-slate-600 leading-relaxed mb-6">
                                La clave del éxito en autorizaciones profesionales reside en la correcta categorización del perfil y la empresa. En **Abogados Watson**, dominamos los criterios de la UGE para garantizar procesos rápidos y reducir tiempos de espera significativos.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "Clasificación profesional estratégica (PAC vs Régimen General).",
                                    "Asesoramiento a departamentos de recursos humanos (B2B).",
                                    "Elaboración de planes de negocio para emprendedores e inversores.",
                                    "Gestión integral de la documentación corporativa y personal."
                                ].map((text, i) => (
                                    <li key={i} className="flex gap-3 items-start text-sm text-slate-700">
                                        <ArrowRight className="w-4 h-4 text-[#701218] mt-0.5 flex-shrink-0" />
                                        {text}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-8">
                                <Link href="/servicios/negocios" className="text-sm font-bold text-[#701218] flex items-center gap-2 hover:translate-x-1 transition-transform">
                                    Explorar servicios de Inversión y Negocios <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-square bg-slate-50 rounded-3xl overflow-hidden border border-slate-200 flex items-center justify-center p-12">
                                <Briefcase className="w-32 h-32 text-slate-200" />
                                <div className="absolute inset-0 bg-gradient-to-br from-[#701218]/5 to-transparent" />
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* SECCIÓN 4 — RELACIÓN CON DEFENSA JURÍDICA */}
            <section className="py-24 bg-slate-50">
                <Container>
                    <div className="max-w-4xl mx-auto bg-white p-12 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-10">
                        <div className="w-16 h-16 bg-[#701218]/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <ShieldAlert className="w-8 h-8 text-[#701218]" />
                        </div>
                        <div className="flex-grow text-center md:text-left">
                            <h3 className="text-xl font-serif font-bold mb-2 text-slate-900">¿Resolución desfavorable?</h3>
                            <p className="text-sm text-slate-600 leading-relaxed mb-4">
                                En procesos de talento, una denegación puede impactar en tu carrera o negocio. Disponemos de recursos técnicos para revertir decisiones administrativas erróneas y proteger tu movilidad profesional.
                            </p>
                            <Link href="/servicios/defensa-juridica" className="text-[#701218] font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all justify-center md:justify-start">
                                Consultar opciones de Defensa Jurídica <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </Container>
            </section>

            {/* SECCIÓN 5 — CTA SOBRIO */}
            <section className="py-24 bg-white">
                <Container className="text-center">
                    <h2 className="text-3xl font-serif font-bold mb-2">Desbloquea tu futuro profesional</h2>
                    <p className="text-[#701218] font-bold text-sm uppercase tracking-widest mb-10">Evaluación técnica de perfil profesional y empresarial</p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg" className="bg-[#701218] hover:bg-[#5a0e13] h-14 px-8 font-bold uppercase tracking-widest text-xs">
                            <Link href="/contacto">Evaluar viabilidad legal</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="border-slate-300 h-14 px-8 font-bold uppercase tracking-widest text-xs">
                            <Link href="/contacto">Diagnóstico jurídico de tu caso</Link>
                        </Button>
                    </div>
                </Container>
            </section>
        </main>
    );
}
