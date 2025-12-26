import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { Globe2, ShieldCheck, Clock, AlertTriangle, ArrowRight, Briefcase, UserCheck, ShieldAlert } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Residencia Nómada Digital España: Guía Legal Completa | Abogados Watson",
    description: "Consigue tu residencia para nómadas digitales en España en menos de 90 días. Asesoría técnica para teletrabajadores internacionales por cuenta ajena y autónomos.",
    keywords: ["Residencia Nómada Digital España", "teletrabajadores internacionales", "trabajar en remoto desde España", "teletrabajador por cuenta ajena", "teletrabador autónomo"]
};

export default function NomadasPage() {
    return (
        <main className="min-h-screen bg-slate-50 text-slate-900">
            <Breadcrumbs items={[{ label: "Vivir en España", href: "/servicios/vivir" }, { label: "Nómadas Digitales" }]} />

            {/* HERO SECTION */}
            <section className="relative py-24 bg-slate-900 overflow-hidden text-white">
                <div className="absolute inset-0 bg-slate-900/90 z-10" />
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#701218]/20 to-transparent z-20" />

                <Container className="relative z-30">
                    <div className="max-w-4xl">
                        <span className="text-[#701218] font-bold tracking-widest uppercase text-xs mb-4 block">
                            Movilidad Internacional & Teletrabajo
                        </span>
                        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
                            Residencia para Nómadas Digitales en España
                        </h1>
                        <p className="text-xl text-slate-300 leading-relaxed mb-8 max-w-2xl">
                            Logramos tu residencia legal en menos de **90 días**. Gestión técnica ante la Unidad de Grandes Empresas (UGE-CE) para teletrabajadores internacionales y profesionales remotos.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Button asChild size="lg" className="bg-[#701218] hover:bg-[#5a0e13] h-14 px-8 font-bold uppercase tracking-widest text-xs">
                                <Link href="/contacto">Evaluar viabilidad legal de mi teletrabajo</Link>
                            </Button>
                        </div>
                    </div>
                </Container>
            </section>

            {/* DIFERENCIACIÓN TÉCNICA */}
            <section className="py-24 bg-white">
                <Container>
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Diferenciación de Perfiles Profesionales</h2>
                        <p className="text-slate-600">La clave del éxito reside en la correcta categorización de tu vínculo contractual.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Cuenta Ajena */}
                        <div className="p-10 rounded-2xl border border-slate-100 bg-slate-50 hover:border-[#701218]/30 transition-all group">
                            <Briefcase className="w-12 h-12 text-[#701218] mb-6" />
                            <h3 className="text-2xl font-serif font-bold mb-4">Teletrabajador por Cuenta Ajena</h3>
                            <p className="text-slate-600 mb-6 leading-relaxed">
                                Para empleados de empresas extranjeras que permiten el trabajo en remoto desde España. Requiere que la empresa tenga al menos 1 año de antigüedad y certifique la posibilidad de teletrabajo.
                            </p>
                            <ul className="space-y-3 mb-8 text-sm">
                                <li className="flex gap-3 text-slate-700">
                                    <UserCheck className="w-4 h-4 text-[#701218] shrink-0 mt-0.5" />
                                    <span>Certificado de cobertura de Seguridad Social o alta en España.</span>
                                </li>
                                <li className="flex gap-3 text-slate-700">
                                    <UserCheck className="w-4 h-4 text-[#701218] shrink-0 mt-0.5" />
                                    <span>Contrato laboral con antigüedad mínima de 3 meses.</span>
                                </li>
                            </ul>
                        </div>

                        {/* Cuenta Propia */}
                        <div className="p-10 rounded-2xl border border-slate-100 bg-slate-50 hover:border-[#701218]/30 transition-all group">
                            <Globe2 className="w-12 h-12 text-[#701218] mb-6" />
                            <h3 className="text-2xl font-serif font-bold mb-4">Teletrabajador Autónomo</h3>
                            <p className="text-slate-600 mb-6 leading-relaxed">
                                Para profesionales independientes (freelance) con clientes internacionales. Se permite trabajar para empresas en España siempre que no supere el 20% de la facturación total.
                            </p>
                            <ul className="space-y-3 mb-8 text-sm">
                                <li className="flex gap-3 text-slate-700">
                                    <UserCheck className="w-4 h-4 text-[#701218] shrink-0 mt-0.5" />
                                    <span>Acreditación de relación mercantil con clientes internacionales.</span>
                                </li>
                                <li className="flex gap-3 text-slate-700">
                                    <UserCheck className="w-4 h-4 text-[#701218] shrink-0 mt-0.5" />
                                    <span>Titulación universitaria o experiencia mínima de 3 años.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Container>
            </section>

            {/* RIESGOS REALES Y CRITERIOS UGE */}
            <section className="py-24 bg-slate-900 text-white">
                <Container>
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Riesgos Reales y Criterios UGE</h2>
                            <p className="text-slate-400 mb-8 leading-relaxed">
                                El proceso ante la Unidad de Grandes Empresas (UGE-CE) es riguroso. Un pequeño error en la interpretación de los criterios puede suponer el archivo del expediente o una denegación inmediata.
                            </p>

                            <div className="space-y-6">
                                <div className="flex gap-4 p-6 bg-white/5 rounded-xl border border-white/10">
                                    <AlertTriangle className="w-6 h-6 text-[#701218] shrink-0" />
                                    <div>
                                        <h4 className="font-bold mb-1">Insuficiencia de Medios Económicos</h4>
                                        <p className="text-sm text-slate-400">Es vital demostrar ingresos estables equivalentes al 200% del SMI (más porcentajes por familiares).</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 p-6 bg-white/5 rounded-xl border border-white/10">
                                    <ShieldAlert className="w-6 h-6 text-[#701218] shrink-0" />
                                    <div>
                                        <h4 className="font-bold mb-1">Conflictos de Seguridad Social</h4>
                                        <p className="text-sm text-slate-400">La falta de convenios bilaterales o certificados incorrectos es la causa #1 de requerimientos.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-[#701218]" />
                                Nuestra metodología de seguridad
                            </h3>
                            <ul className="space-y-4">
                                {[
                                    "Auditoría previa de documentación corporativa.",
                                    "Validación de títulos y apostillas internacionales.",
                                    "Redacción de certificados de empresa bajo estándares UGE.",
                                    "Presentación telemática con certificado profesional."
                                ].map((step, i) => (
                                    <li key={i} className="flex gap-3 text-sm text-slate-300">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#701218] mt-1.5 shrink-0" />
                                        {step}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </Container>
            </section>

            {/* INTERNAL LINKING A DEFENSA JURÍDICA */}
            <section className="py-24 bg-slate-50">
                <Container>
                    <div className="max-w-4xl mx-auto bg-white p-12 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-10">
                        <div className="w-16 h-16 bg-[#701218]/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <ShieldAlert className="w-8 h-8 text-[#701218]" />
                        </div>
                        <div className="flex-grow text-center md:text-left">
                            <h3 className="text-xl font-serif font-bold mb-2 text-slate-900">¿Denegación o renovación fallida?</h3>
                            <p className="text-sm text-slate-600 leading-relaxed mb-4">
                                Si tu solicitud de nómada digital ha sido denegada o tienes problemas en la renovación, nuestra unidad de litigios protege tus derechos ante la administración.
                            </p>
                            <Link href="/servicios/defensa-juridica" className="text-[#701218] font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all justify-center md:justify-start">
                                Ver opciones de Defensa Jurídica <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </Container>
            </section>

            {/* FINAL CTA SECCIÓN */}
            <section className="py-24 bg-white border-t border-slate-100">
                <Container className="text-center">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Empieza hoy tu vida en España</h2>
                    <p className="text-[#701218] font-bold text-sm uppercase tracking-widest mb-12">Diagnóstico inicial de viabilidad técnica gratuito</p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg" className="bg-[#701218] hover:bg-[#5a0e13] h-14 px-8 font-bold uppercase tracking-widest text-xs">
                            <Link href="/contacto">Evaluar viabilidad legal de mi teletrabajo</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="border-slate-300 h-14 px-8 font-bold uppercase tracking-widest text-xs">
                            <Link href="/contacto">Solicitar auditoría de documentos</Link>
                        </Button>
                    </div>
                    <p className="mt-10 text-xs text-slate-500 flex items-center justify-center gap-2">
                        <Clock className="w-3 h-3" /> Resolución en menos de 90 días naturales
                    </p>
                </Container>
            </section>
        </main>
    );
}
