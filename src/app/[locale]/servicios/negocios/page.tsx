import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { Landmark, Building, FileCheck, ShieldCheck, ShieldAlert, ArrowRight, TrendingUp } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Inversión Inmobiliaria y Negocios en España | Asesoría Legal",
    description: "Protege tu inversión patrimonial en España. Due Diligence legal, compraventa segura y constitución de sociedades para inversores extranjeros.",
};

export default function NegociosPage() {
    const services = [
        {
            title: "Compraventa Inmobiliaria",
            subtitle: "Asesoramiento legal en inversiones",
            desc: "Seguridad jurídica total en la adquisición de inmuebles en España, desde la reserva hasta la escritura pública con total transparencia.",
            icon: Building
        },
        {
            title: "Due Diligence Legal",
            subtitle: "Compra con ojos de experto",
            desc: "Auditoría técnica y jurídica profunda para garantizar que el activo que estás adquiriendo está libre de cargas y vicios ocultos.",
            icon: FileCheck
        },
        {
            title: "Constitución de Sociedades",
            subtitle: "Derecho Mercantil",
            desc: "Creación y estructura legal de empresas para inversores extranjeros que desean operar en el mercado español con garantías.",
            icon: Landmark
        },
        {
            title: "Gestión de NIE e Identificación",
            subtitle: "Certificados para no residentes",
            desc: "Obtención ágil de números de identificación necesarios para cualquier transacción económica o inversión en España.",
            icon: ShieldCheck
        },
        {
            title: "Planificación Fiscal Inmobiliaria",
            subtitle: "Optimización de inversión",
            desc: "Análisis del impacto impositivo de tus inversiones para asegurar la máxima eficiencia legal en territorio nacional.",
            icon: TrendingUp
        }
    ];

    return (
        <main className="min-h-screen bg-slate-50 text-slate-900">
            <Breadcrumbs items={[{ label: "Inversión y Negocios" }]} />

            {/* SECCIÓN 1 — HERO */}
            <section className="relative py-24 bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/80 z-10" />
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#701218]/20 to-transparent z-20" />

                <Container className="relative z-10">
                    <div className="max-w-3xl">
                        <span className="text-[#701218] font-bold tracking-widest uppercase text-xs mb-4 block">
                            Inversión y Patrimonio
                        </span>
                        <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
                            Invierte y haz crecer tu patrimonio en España con protección legal
                        </h1>
                        <p className="text-sm text-[#701218] font-bold mb-4 bg-[#701218]/10 px-3 py-1 rounded-sm inline-block">
                            Asesoramiento jurídico mercantil e inmobiliario para extranjeros
                        </p>
                        <p className="text-xl text-slate-300 leading-relaxed max-w-2xl">
                            Transformamos la inversión en seguridad jurídica. Protegemos tus activos y facilitamos tu entrada en el mercado español con un rigor técnico impecable.
                        </p>
                    </div>
                </Container>
            </section>

            {/* SECCIÓN 2 — QUÉ SITUACIONES CUBRIMOS */}
            <section className="py-24">
                <Container>
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-serif font-bold mb-2">Servicios de inversión</h2>
                        <p className="text-[#701218] font-bold text-sm uppercase tracking-widest mb-6">Protección legal en transacciones inmobiliarias y mercantiles</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((item, i) => (
                            <div key={i} className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:border-[#701218]/30 transition-all group">
                                <item.icon className="w-8 h-8 text-[#701218] mb-6" />
                                <h3 className="text-lg font-serif font-bold mb-1 leading-tight">{item.title}</h3>
                                <p className="text-[10px] font-bold text-[#701218] uppercase tracking-wider mb-4">{item.subtitle}</p>
                                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                                {item.title === "Inversión Directa e Inmobiliaria" && (
                                    <div className="mt-4 pt-4 border-t border-slate-50">
                                        <Link href="/servicios/inversiones" className="text-xs font-bold text-[#701218] flex items-center gap-1 hover:translate-x-1 transition-transform">
                                            Seguridad jurídica y Golden Visa <ArrowRight className="w-3 h-3" />
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
                            <h2 className="text-3xl font-serif font-bold mb-2">Garantía del Inversor</h2>
                            <p className="text-[#701218] font-bold text-sm uppercase tracking-widest mb-8">Estrategia legal para la seguridad de tus activos</p>
                            <p className="text-slate-600 leading-relaxed mb-6">
                                El proceso de inversión en España requiere una supervisión constante. En **Abogados Watson**, acompañamos al inversor desde la intención de compra hasta la inscripción registral. Ofrecemos una **coordinación 360º** que incluye Notaría, Registro y Planificación Fiscal.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "Auditoría técnica (Due Diligence) de activos inmobiliarios.",
                                    "Negociación y redacción de contratos con terceros.",
                                    "Coordinación notarial y registral completa.",
                                    "Representación legal para inversores no residentes."
                                ].map((text, i) => (
                                    <li key={i} className="flex gap-3 items-start text-sm text-slate-700">
                                        <ArrowRight className="w-4 h-4 text-[#701218] mt-0.5 flex-shrink-0" />
                                        {text}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="relative">
                            <div className="aspect-square bg-slate-50 rounded-3xl overflow-hidden border border-slate-200 flex items-center justify-center p-12">
                                <Building className="w-32 h-32 text-slate-200" />
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
                            <h3 className="text-xl font-serif font-bold mb-2 text-slate-900">¿Inversión en riesgo?</h3>
                            <p className="text-sm text-slate-600 leading-relaxed mb-4">
                                Protegemos tus activos ante cualquier conflicto administrativo, de licencias o incumplimientos contractuales. Nuestra unidad de defensa jurídica está preparada para actuar con rigor técnico.
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
                    <h2 className="text-3xl font-serif font-bold mb-2">Asegura tu inversión hoy</h2>
                    <p className="text-[#701218] font-bold text-sm uppercase tracking-widest mb-10">Análisis inicial de mercado y diagnóstico jurídico de inversión</p>

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
