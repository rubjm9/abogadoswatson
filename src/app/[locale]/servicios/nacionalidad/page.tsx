import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { CheckCircle2, FileText, ScrollText, Timer, ShieldAlert, ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Nacionalidad Española: Consigue tu Pasaporte con Expertos | Abogados Watson",
    description: "Expertos en expedientes de nacionalidad por residencia y búsqueda de empleo para descendientes. Desbloqueamos tu proceso con recursos contenciosos.",
};

export default function NacionalidadPage() {

    const types = [
        {
            title: "Búsqueda de empleo para descendientes",
            subtitle: "Hijos y nietos de españoles de origen",
            description: "Autorización especial que permite la búsqueda de empleo en España a hijos y nietos de españoles de origen, facilitando su integración y posterior acceso a la nacionalidad por residencia.",
            features: [
                "Para descendientes directos de españoles de origen",
                "Facilita la incorporación al mercado laboral español",
                "Vía estratégica para la futura ciudadanía"
            ],
            icon: ScrollText
        },
        {
            title: "Consolidar tu vida en España",
            subtitle: "Nacionalidad por Residencia",
            description: "La vía estándar para ciudadanos extranjeros con residencia legal continuada. El plazo general es de 10 años, reducido a 2 años para ciudadanos iberoamericanos y a 1 año para cónyuges de españoles.",
            features: [
                "Iberoamericanos, Guinea Ecuatorial, Filipinas: 2 años",
                "Cónyuges de españoles: 1 año de residencia legal",
                "Superación de pruebas CCSE (cultura) y DELE (idioma)"
            ],
            icon: Timer
        },
        {
            title: "Asegurar el futuro de tu familia",
            subtitle: "Nacionalidad por Opción",
            description: "Un trámite ágil diseñado para hijos de ciudadanos que han obtenido la nacionalidad española o para aquellos que estuvieron sujetos a la patria potestad de un español.",
            features: [
                "Menores de 20 años (generalmente)",
                "Sin tasas administrativas del Ministerio",
                "Inscripción directa en el Registro Civil"
            ],
            icon: CheckCircle2
        },
        {
            title: "Vía de concesión estratégica",
            subtitle: "Nacionalidad por Carta de Naturaleza",
            description: "Concesión otorgada por el Gobierno mediante Real Decreto tras valorar circunstancias excepcionales. Es una vía discrecional y graciable de alta complejidad jurídica.",
            features: [
                "Carácter graciable y discrecional",
                "Circunstancias excepcionales (deportivas, culturales, científicas)",
                "Tramitación directa ante el Ministerio de Justicia"
            ],
            icon: FileText
        }
    ];

    return (
        <main className="min-h-screen bg-slate-50 text-slate-900">
            <Breadcrumbs items={[{ label: "Nacionalidad Española" }]} />

            {/* Hero Section */}
            <section className="relative py-24 bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/80 z-10" />
                <img
                    src="/images/nationality.png"
                    alt="Pasaporte Español"
                    className="absolute inset-0 w-full h-full object-cover opacity-40"
                />
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#701218]/20 to-transparent z-20" />

                <Container className="relative z-10">
                    <div className="max-w-3xl">
                        <span className="text-[#701218] font-bold tracking-widest uppercase text-xs mb-4 block">
                            Derecho de Ciudadanía
                        </span>
                        <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
                            Obtén tu pasaporte español: Gestión técnica de nacionalidad
                        </h1>
                        <p className="text-sm text-[#701218] font-bold mb-4 bg-[#701218]/10 px-3 py-1 rounded-sm inline-block">
                            Expedientes de concesión de nacionalidad española por diversas vías legales
                        </p>
                        <p className="text-xl text-slate-300 leading-relaxed max-w-2xl">
                            Convertirse en ciudadano español es asegurar tu futuro en Europa. Digitalizamos todo el proceso con presentación telemática directa al Ministerio de Justicia para ganar meses de ventaja en tu **Resolución Favorable**.
                        </p>
                    </div>
                </Container>
            </section>

            {/* Content Blocks */}
            <section className="py-24">
                <Container>
                    <div className="grid gap-8 lg:grid-cols-2">
                        {types.map((type, index) => (
                            <div
                                key={index}
                                className="group bg-white p-10 rounded-2xl shadow-sm border border-slate-100 hover:border-[#701218]/30 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                            >
                                <div className="mb-6">
                                    <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center mb-6 border border-slate-100 group-hover:bg-[#701218] group-hover:border-[#701218] transition-all duration-300">
                                        <type.icon className="w-7 h-7 text-[#701218] group-hover:text-white transition-colors" />
                                    </div>
                                    <h2 className="text-2xl font-serif font-bold text-slate-900 mb-1 leading-tight">
                                        {type.title}
                                    </h2>
                                    <p className="text-xs font-bold text-[#701218] uppercase tracking-wider mb-4">
                                        {type.subtitle}
                                    </p>
                                </div>

                                <p className="text-slate-600 mb-8 leading-relaxed flex-grow">
                                    {type.description}
                                </p>

                                <ul className="space-y-4 mb-10 border-t border-slate-50 pt-8">
                                    {type.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start text-sm text-slate-700">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#701218] mr-3 mt-1.5 flex-shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <Button asChild variant="outline" className="w-full h-12 border-slate-200 hover:border-[#701218] hover:text-[#701218] group-hover:bg-slate-50 transition-all font-semibold uppercase tracking-widest text-[10px]">
                                    <Link href="/contacto">Evaluar viabilidad legal</Link>
                                </Button>
                            </div>
                        ))}
                    </div>

                    {/* Technical Support Section */}
                    <div className="mt-20 p-10 bg-white border border-slate-200 rounded-2xl">
                        <h3 className="text-xl font-serif font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <span className="w-1 h-6 bg-[#701218] rounded-full" />
                            Garantías del Expediente y Conceptos Clave
                        </h3>
                        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
                            <div>
                                <h4 className="font-bold text-[#701218] text-sm mb-2">Resolución Favorable y Silencio Administrativo</h4>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    Si tras un año desde la presentación del expediente no hay respuesta, se produce un <strong>Silencio Administrativo</strong> negativo. En este punto, recomendamos interponer un recurso contencioso para acelerar la decisión.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-bold text-[#701218] text-sm mb-2">Exámenes y Dispensas (CCSE/DELE)</h4>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    Evaluamos si cumples los requisitos para solicitar una <strong>Dispensa</strong> de los exámenes de integración y lengua en casos específicos debidamente acreditados.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-bold text-[#701218] text-sm mb-2">Atención a Requerimientos</h4>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    Un <strong>Requerimiento</strong> de la administración debe atenderse con precisión técnica absoluta para evitar el archivo o la denegación de tu solicitud.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-bold text-[#701218] text-sm mb-2">Seguridad en la Custodia</h4>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    Supervisamos la validez técnica de todos los documentos integrados en tu <strong>Expediente</strong> para asegurar el éxito del proceso administrativo.
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* SECCIÓN 4 — RELACIÓN CON DEFENSA JURÍDICA */}
            <section className="py-24 bg-slate-50 border-t border-slate-100">
                <Container>
                    <div className="max-w-4xl mx-auto bg-white p-12 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-10">
                        <div className="w-16 h-16 bg-[#701218]/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <ShieldAlert className="w-8 h-8 text-[#701218]" />
                        </div>
                        <div className="flex-grow text-center md:text-left">
                            <h3 className="text-xl font-serif font-bold mb-2 text-slate-900">¿Denegación o Silencio Administrativo?</h3>
                            <p className="text-sm text-slate-600 leading-relaxed mb-4">
                                Si tu expediente de nacionalidad ha sido denegado o ha superado el plazo legal sin respuesta, activamos la vía del recurso contencioso para acelerar la resolución favorable.
                            </p>
                            <Link href="/servicios/defensa-juridica" className="text-[#701218] font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all justify-center md:justify-start">
                                Consultar opciones de Defensa Jurídica <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </Container>
            </section>

            {/* CTA Bottom */}
            <section className="py-24 bg-[#701218] relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10" />
                <Container className="relative z-10 text-center text-white">
                    <h2 className="text-4xl font-serif font-bold mb-6">¿Preparado para tu diagnóstico jurídico?</h2>
                    <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Cada historial familiar y residencia es único. Analizamos la viabilidad técnica de tu expediente antes de iniciar cualquier trámite administrativo.
                    </p>
                    <Button asChild size="lg" className="bg-white text-[#701218] hover:bg-slate-100 border-none shadow-2xl h-14 px-10 font-bold uppercase tracking-widest text-xs">
                        <Link href="/contacto">Solicitar diagnóstico jurídico</Link>
                    </Button>
                </Container>
            </section>
        </main>
    );
}
