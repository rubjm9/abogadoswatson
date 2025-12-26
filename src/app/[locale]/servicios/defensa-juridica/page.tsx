import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { Gavel, ShieldCheck, Scale, FileSearch, Clock, AlertTriangle, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Recursos y Defensa Jurídica en Extranjería | Abogados Watson",
    description: "Defensa técnica legal ante denegaciones de residencia, nacionalidad y retrasos administrativos. Recursos de reposición y contenciosos.",
};

export default function DefensaJuridicaPage() {
    return (
        <main className="min-h-screen bg-slate-50 text-slate-900">
            {/* SECCIÓN 1 — HERO (Confianza) */}
            <section className="relative py-24 bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/80 z-10" />
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#701218]/20 to-transparent z-20" />

                <Container className="relative z-10">
                    <div className="max-w-3xl">
                        <span className="text-[#701218] font-bold tracking-widest uppercase text-xs mb-4 block">
                            Seguridad Jurídica
                        </span>
                        <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
                            Soluciones cuando tu proceso legal se detiene o es denegado
                        </h1>
                        <p className="text-sm text-[#701218] font-bold mb-4 bg-[#701218]/10 px-3 py-1 rounded-sm inline-block">
                            Recursos administrativos y contencioso-administrativos en extranjería
                        </p>
                        <p className="text-xl text-slate-300 leading-relaxed max-w-2xl">
                            Una resolución negativa o un retraso excesivo no es el final del camino. Es el momento de aplicar una **defensa técnica** sólida para proteger tus derechos y reconducir tu **expediente** hacia el éxito.
                        </p>
                    </div>
                </Container>
            </section>

            {/* SECCIÓN 2 — CUÁNDO NECESITAS DEFENSA */}
            <section className="py-24 border-b border-slate-200">
                <Container>
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-serif font-bold mb-2">Casos en los que actuamos</h2>
                        <p className="text-[#701218] font-bold text-sm uppercase tracking-widest mb-6">Escenarios de intervención legal especializada</p>
                        <p className="text-slate-600">Identificamos el obstáculo jurídico exacto para aplicar la herramienta de defensa más efectiva.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: AlertTriangle,
                                title: "Denegación de residencia o nacionalidad",
                                subtitle: "Resolución administrativa negativa",
                                desc: "Analizamos los motivos de la denegación para revertirla mediante la vía administrativa o judicial."
                            },
                            {
                                icon: Clock,
                                title: "Retrasos injustificados",
                                subtitle: "Silencio administrativo",
                                desc: "Cuando el plazo legal de respuesta ha vencido, el silencio administrativo permite actuar para forzar una decisión."
                            },
                            {
                                icon: FileSearch,
                                title: "Requerimientos complejos",
                                subtitle: "Solicitudes de subsanación técnica",
                                desc: "Atendemos peticiones de documentación adicional que bloquean la continuidad de tu proceso legal."
                            },
                            {
                                icon: ShieldCheck,
                                title: "Expedientes sancionadores",
                                subtitle: "Procedimientos de expulsión",
                                desc: "Defensa técnica inmediata ante órdenes de salida obligatoria o sanciones administrativas graves."
                            }
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
                                <item.icon className="w-8 h-8 text-[#701218] mb-6" />
                                <h3 className="text-lg font-serif font-bold mb-2 leading-tight">{item.title}</h3>
                                <p className="text-[10px] font-bold text-[#701218] uppercase tracking-wider mb-4">{item.subtitle}</p>
                                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* SECCIÓN 3 — CÓMO ACTUAMOS */}
            <section className="py-24 bg-white">
                <Container>
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-serif font-bold mb-2">Nuestro protocolo de defensa</h2>
                            <p className="text-[#701218] font-bold text-sm uppercase tracking-widest mb-8">Método jurídico enfocado a la resolución de conflictos</p>

                            <div className="space-y-8">
                                {[
                                    {
                                        step: "01",
                                        title: "Análisis integral del expediente",
                                        desc: "Auditamos toda la documentación presentada y la resolución recibida para detectar fallos de forma o fondo."
                                    },
                                    {
                                        step: "02",
                                        title: "Elección de la vía estratégica",
                                        desc: "Determinamos si es más eficaz actuar en vía administrativa (ante el mismo órgano) o vía judicial (ante los tribunales)."
                                    },
                                    {
                                        step: "03",
                                        title: "Preparación técnica del Recurso",
                                        desc: "Redactamos la fundamentación jurídica basada en jurisprudencia y normativa vigente para garantizar el rigor."
                                    },
                                    {
                                        step: "04",
                                        title: "Seguimiento y Medidas Cautelares",
                                        desc: "Monitorizamos cada paso y solicitamos la suspensión de efectos negativos de la resolución cuando la ley lo permite."
                                    }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-6">
                                        <span className="text-4xl font-serif font-bold text-slate-100">{item.step}</span>
                                        <div>
                                            <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                                            <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-slate-50 p-12 rounded-3xl border border-slate-200">
                            <Scale className="w-16 h-16 text-[#701218] mb-8" />
                            <h3 className="text-2xl font-serif font-bold mb-4">Un enfoque realista</h3>
                            <p className="text-slate-600 leading-relaxed mb-6">
                                En **Abogados Watson**, no basamos nuestra defensa en promesas de éxito garantizado, sino en un análisis riguroso de la viabilidad.
                            </p>
                            <p className="text-slate-600 leading-relaxed">
                                Si un expediente tiene escasas posibilidades legales, te lo informaremos con honestidad antes de iniciar cualquier procedimiento oneroso.
                            </p>
                        </div>
                    </div>
                </Container>
            </section>

            {/* SECCIÓN 4 — TIPOS DE RECURSOS */}
            <section className="py-24 bg-slate-50">
                <Container>
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-serif font-bold mb-2">Vías de reclamación</h2>
                        <p className="text-[#701218] font-bold text-sm uppercase tracking-widest mb-6">Instrumentos procesales para la defensa de tus derechos</p>
                        <p className="text-slate-600">Explicamos las herramientas legales que utilizaremos para reconducir tu situación.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            {
                                title: "Segunda oportunidad administrativa",
                                subtitle: "Recurso de Reposición",
                                desc: "Es una apelación ante el mismo organismo que dictó la resolución para que reconsideren su decisión en un plazo corto."
                            },
                            {
                                title: "Revisión por órgano superior",
                                subtitle: "Recurso de Alzada",
                                desc: "Se interpone ante el superior jerárquico del órgano que denegó tu solicitud para buscar una visión jurídica diferente."
                            },
                            {
                                title: "Intervención de los Tribunales",
                                subtitle: "Recurso Contencioso-Administrativo",
                                desc: "Iniciamos la vía judicial ante los jueces españoles para que evalúen la legalidad de la resolución de extranjería."
                            },
                            {
                                title: "Protección durante el proceso",
                                subtitle: "Medidas Cautelares",
                                desc: "Solicitamos la suspensión temporal de los efectos de una denegación para que puedas mantener tus derechos mientras se resuelve el juicio."
                            }
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-10 rounded-2xl border border-slate-200">
                                <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                                <p className="text-xs font-bold text-[#701218] uppercase tracking-widest mb-4">{item.subtitle}</p>
                                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* SECCIÓN 5 — GARANTÍAS DEL DESPACHO */}
            <section className="py-24 bg-white">
                <Container>
                    <div className="bg-slate-900 text-white rounded-3xl p-12 lg:p-20 overflow-hidden relative">
                        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-4xl font-serif font-bold mb-6">Por qué confiar en nuestra defensa</h2>
                                <div className="space-y-6">
                                    {[
                                        "Especialización exclusiva en litigios de extranjería y nacionalidad.",
                                        "Transparencia absoluta sobre las posibilidades reales de éxito.",
                                        "Rigor técnico en la redacción de fundamentos jurídicos.",
                                        "Información constante sobre el estado de tu Recurso."
                                    ].map((text, i) => (
                                        <div key={i} className="flex gap-4 items-start">
                                            <CheckCircle2 className="w-6 h-6 text-[#701218] flex-shrink-0" />
                                            <p className="text-slate-300">{text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="hidden lg:block">
                                <div className="aspect-square bg-[#701218]/10 rounded-full flex items-center justify-center border border-[#701218]/20">
                                    <Scale className="w-32 h-32 text-[#701218]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* SECCIÓN 6 — CTA SOBRIO */}
            <section className="py-24 bg-slate-50 border-t border-slate-200">
                <Container className="text-center">
                    <h2 className="text-3xl font-serif font-bold mb-2">Evaluemos tu situación legal</h2>
                    <p className="text-[#701218] font-bold text-sm uppercase tracking-widest mb-10">Diagnóstico técnico previo a la interposición de recursos</p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg" className="bg-[#701218] hover:bg-[#5a0e13] h-14 px-8 font-bold uppercase tracking-widest text-xs">
                            <Link href="/contacto">Evaluar viabilidad del recurso</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="border-slate-300 h-14 px-8 font-bold uppercase tracking-widest text-xs">
                            <Link href="/contacto">Revisión legal de tu expediente</Link>
                        </Button>
                    </div>
                    <p className="mt-8 text-xs text-slate-500 max-w-lg mx-auto leading-relaxed">
                        Este diagnóstico inicial nos permite determinar si existe una base sólida para actuar. No iniciamos procesos sin una estrategia clara.
                    </p>
                </Container>
            </section>
        </main>
    );
}
