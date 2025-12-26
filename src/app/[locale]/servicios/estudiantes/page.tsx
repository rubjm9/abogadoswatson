import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { GraduationCap, Briefcase, RefreshCw, Landmark, ArrowRight, ShieldCheck, Clock, FileText, Globe2 } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Visado de Estudiante España: Guía Legal y Residencia | Abogados Watson",
    description: "Tramita tu visado de estudiante en España con éxito. Expertos en autorizaciones iniciales, prórrogas y transición a residencia y nacionalidad.",
    keywords: ["visado de estudiante España", "estudiar en España", "prórroga estancia estudios", "trabajar con visado de estudiante"]
};

export default function EstudiantesPage() {
    return (
        <main className="min-h-screen bg-slate-50 text-slate-900">
            <Breadcrumbs items={[{ label: "Vivir en España", href: "/servicios/vivir" }, { label: "Estudiantes" }]} />

            {/* HERO SECTION */}
            <section className="relative py-24 bg-slate-900 overflow-hidden text-white">
                <div className="absolute inset-0 bg-slate-900/90 z-10" />
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#701218]/20 to-transparent z-20" />

                <Container className="relative z-30">
                    <div className="max-w-4xl">
                        <span className="text-[#701218] font-bold tracking-widest uppercase text-xs mb-4 block">
                            Formación & Movilidad Legal
                        </span>
                        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
                            Visado de Estudiante en España: Tu puerta a Europa
                        </h1>
                        <p className="text-xl text-slate-300 leading-relaxed mb-8 max-w-2xl">
                            Mucho más que una estancia académica. Gestionamos tu **autorización inicial** y diseñamos tu estrategia legal para convertir tus estudios en una residencia estable.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Button asChild size="lg" className="bg-[#701218] hover:bg-[#5a0e13] h-14 px-8 font-bold uppercase tracking-widest text-xs">
                                <Link href="/contacto">Evaluar mi viabilidad académica</Link>
                            </Button>
                        </div>
                    </div>
                </Container>
            </section>

            {/* TRABAJO COMPATIBLE & RENOVACIONES */}
            <section className="py-24 bg-white">
                <Container>
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        {/* Trabajo Compatible */}
                        <div className="p-10 rounded-2xl border border-slate-100 bg-slate-50">
                            <Briefcase className="w-12 h-12 text-[#701218] mb-6" />
                            <h2 className="text-2xl font-serif font-bold mb-4">Trabajar con Visado de Estudiante</h2>
                            <p className="text-slate-600 mb-6 leading-relaxed">
                                Desde la última reforma, los estudiantes en España cuentan con una autorización de trabajo automática y compatible con sus estudios.
                            </p>
                            <ul className="space-y-4 text-sm text-slate-700 mb-8">
                                <li className="flex gap-3">
                                    <ShieldCheck className="w-5 h-5 text-[#701218] shrink-0" />
                                    <span><strong>Hasta 30 horas semanales:</strong> Trabajo por cuenta ajena o propia siempre que no interfiera con el horario lectivo.</span>
                                </li>
                                <li className="flex gap-3">
                                    <ShieldCheck className="w-5 h-5 text-[#701218] shrink-0" />
                                    <span><strong>Sin restricciones geográficas:</strong> Posibilidad de trabajar en cualquier parte del territorio nacional.</span>
                                </li>
                                <li className="flex gap-3">
                                    <ShieldCheck className="w-5 h-5 text-[#701218] shrink-0" />
                                    <span><strong>Vigencia automática:</strong> Tu TIE de estudios habilita para trabajar sin trámites adicionales en la mayoría de casos.</span>
                                </li>
                            </ul>
                        </div>

                        {/* Renovaciones y Prórrogas */}
                        <div className="p-10 rounded-2xl border border-slate-100 bg-slate-50">
                            <RefreshCw className="w-12 h-12 text-[#701218] mb-6" />
                            <h2 className="text-2xl font-serif font-bold mb-4">Renovación y Prórroga de Estancia</h2>
                            <p className="text-slate-600 mb-6 leading-relaxed">
                                Mantener tu estatus legal requiere una planificación rigurosa de los tiempos de renovación para evitar periodos de irregularidad.
                            </p>
                            <ul className="space-y-4 text-sm text-slate-700">
                                <li className="flex gap-3">
                                    <Clock className="w-5 h-5 text-[#701218] shrink-0" />
                                    <span><strong>Plazo de 60 días:</strong> Debes iniciar la prórroga 60 días antes o hasta 90 días después de la caducidad.</span>
                                </li>
                                <li className="flex gap-3">
                                    <FileText className="w-5 h-5 text-[#701218] shrink-0" />
                                    <span><strong>Aprovechamiento académico:</strong> Certificado de superación de estudios previos y nueva matrícula en centro autorizado.</span>
                                </li>
                                <li className="flex gap-3">
                                    <Landmark className="w-5 h-5 text-[#701218] shrink-0" />
                                    <span><strong>Medios económicos:</strong> Acreditación de fondos suficientes para la nueva etapa formativa.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Container>
            </section>

            {/* PUENTE HACIA RESIDENCIA Y NACIONALIDAD */}
            <section className="py-24 bg-slate-900 text-white">
                <Container>
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">El puente hacia tu futuro en España</h2>
                        <p className="text-slate-400">Diseñamos tu transición legal desde el primer día de estudios.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Búsqueda de Empleo */}
                        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all text-center">
                            <h3 className="text-xl font-serif font-bold mb-4">Búsqueda de Empleo</h3>
                            <p className="text-sm text-slate-400 mb-6">Tras finalizar grado o master, tienes 1 año para buscar trabajo o emprender sin necesidad de visado previo.</p>
                            <span className="text-xs font-bold text-[#701218] uppercase tracking-widest">Opción Post-Grado</span>
                        </div>

                        {/* Modificación a Residencia */}
                        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all text-center">
                            <h3 className="text-xl font-serif font-bold mb-4">Modificación Directa</h3>
                            <p className="text-sm text-slate-400 mb-6">Paso directo a residencia y trabajo si cuentas con una oferta laboral firme, sin esperas de 3 años.</p>
                            <Link href="/servicios/nomadas" className="text-xs font-bold text-[#701218] uppercase tracking-widest hover:underline">O ver Nómada Digital</Link>
                        </div>

                        {/* Nacionalidad */}
                        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all text-center">
                            <h3 className="text-xl font-serif font-bold mb-4">Nacionalidad</h3>
                            <p className="text-sm text-slate-400 mb-6">Aunque los años de estudio no computan para nacionalidad, te ayudamos a "empezar el reloj" lo antes posible.</p>
                            <Link href="/servicios/nacionalidad" className="text-xs font-bold text-[#701218] uppercase tracking-widest hover:underline">Ver Nacionalidad</Link>
                        </div>
                    </div>
                </Container>
            </section>

            {/* CTA SECCIÓN */}
            <section className="py-24 bg-white border-t border-slate-100">
                <Container className="text-center">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">¿Preparado para tu etapa en España?</h2>
                    <p className="text-[#701218] font-bold text-sm uppercase tracking-widest mb-12">Asesoría técnica para expedientes de extranjería complejos</p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg" className="bg-[#701218] hover:bg-[#5a0e13] h-14 px-8 font-bold uppercase tracking-widest text-xs">
                            <Link href="/contacto">Iniciar mi expediente de estudiante</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="border-slate-300 h-14 px-8 font-bold uppercase tracking-widest text-xs">
                            <Link href="/contacto">Consulta técnica sobre prórrogas</Link>
                        </Button>
                    </div>
                </Container>
            </section>
        </main>
    );
}
