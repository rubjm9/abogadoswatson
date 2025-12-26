import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { Users, Heart, ShieldCheck, Scale, Landmark, Home, ArrowRight, FileText, Info } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Reagrupación Familiar España: Guía Legal y Requisitos | Abogados Watson",
    description: "Reúne a tu familia en España con seguridad jurídica. Diferencias entre régimen general y comunitario, requisitos de ingresos y vivienda.",
    keywords: ["Reagrupación Familiar España", "reagrupación régimen general", "reagrupación régimen comunitario", "tarjeta familiar de ciudadano de la unión"]
};

export default function FamiliaPage() {
    return (
        <main className="min-h-screen bg-slate-50 text-slate-900">
            <Breadcrumbs items={[{ label: "Vivir en España", href: "/servicios/vivir" }, { label: "Reagrupación Familiar" }]} />

            {/* HERO SECTION */}
            <section className="relative py-24 bg-slate-900 overflow-hidden text-white">
                <div className="absolute inset-0 bg-slate-900/90 z-10" />
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#701218]/20 to-transparent z-20" />

                <Container className="relative z-30">
                    <div className="max-w-4xl">
                        <span className="text-[#701218] font-bold tracking-widest uppercase text-xs mb-4 block">
                            Derecho a la Vida Familiar
                        </span>
                        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
                            Reagrupación Familiar en España: Seguridad para tu familia
                        </h1>
                        <p className="text-xl text-slate-300 leading-relaxed mb-8 max-w-2xl">
                            Entendemos que la unión familiar es tu prioridad. Gestionamos tu expediente con **rigor jurídico** para asegurar que el reencuentro no se vea truncado por errores administrativos.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Button asChild size="lg" className="bg-[#701218] hover:bg-[#5a0e13] h-14 px-8 font-bold uppercase tracking-widest text-xs">
                                <Link href="/contacto">Revisión de viabilidad familiar</Link>
                            </Button>
                        </div>
                    </div>
                </Container>
            </section>

            {/* DIFERENCIACIÓN DE REGÍMENES */}
            <section className="py-24 bg-white">
                <Container>
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Régimen General vs. Régimen Comunitario</h2>
                        <p className="text-slate-600">Es fundamental identificar correctamente el marco legal aplicable a tu situación familiar.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Régimen General */}
                        <div className="p-10 rounded-2xl border border-slate-100 bg-slate-50 hover:border-[#701218]/30 transition-all">
                            <Scale className="w-12 h-12 text-[#701218] mb-6" />
                            <h3 className="text-2xl font-serif font-bold mb-4">Régimen General</h3>
                            <p className="text-sm text-[#701218] font-bold mb-4 uppercase tracking-wider">Para residentes no comunitarios</p>
                            <p className="text-slate-600 mb-6 leading-relaxed">
                                Aplicable a extranjeros con residencia legal en España que desean traer a sus familiares. Requiere haber residido al menos 1 año (para reagrupar a cónyuge e hijos) o ser residente de larga duración (para ascendientes).
                            </p>
                            <ul className="space-y-3 mb-8 text-sm">
                                <li className="flex gap-3 text-slate-700">
                                    <ShieldCheck className="w-4 h-4 text-[#701218] shrink-0 mt-0.5" />
                                    <span>Vínculo familiar: Cónyuge, hijos menores de 18 y ascendientes mayores de 65.</span>
                                </li>
                                <li className="flex gap-3 text-slate-700">
                                    <ShieldCheck className="w-4 h-4 text-[#701218] shrink-0 mt-0.5" />
                                    <span>Solicitud inicial en España por parte del reagrupante.</span>
                                </li>
                            </ul>
                        </div>

                        {/* Régimen Comunitario */}
                        <div className="p-10 rounded-2xl border border-slate-100 bg-slate-50 hover:border-[#701218]/30 transition-all">
                            <Users className="w-12 h-12 text-[#701218] mb-6" />
                            <h3 className="text-2xl font-serif font-bold mb-4">Régimen Comunitario</h3>
                            <p className="text-sm text-[#701218] font-bold mb-4 uppercase tracking-wider">Familiares de ciudadanos UE / Arraigo Familiar</p>
                            <p className="text-slate-600 mb-6 leading-relaxed">
                                Para familiares de ciudadanos españoles o de otros Estados UE. Incluye la **Tarjeta de Familiar de Ciudadano de la Unión** y el nuevo **Arraigo Familiar** para cuidadores o hijos de españoles de origen.
                            </p>
                            <ul className="space-y-3 mb-8 text-sm">
                                <li className="flex gap-3 text-slate-700">
                                    <ShieldCheck className="w-4 h-4 text-[#701218] shrink-0 mt-0.5" />
                                    <span>Familiares: Cónyuge, pareja de hecho, hijos menores de 21 y ascendientes a cargo.</span>
                                </li>
                                <li className="flex gap-3 text-slate-700">
                                    <ShieldCheck className="w-4 h-4 text-[#701218] shrink-0 mt-0.5" />
                                    <span>Tramitación directa en España tras la entrada del familiar.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Container>
            </section>

            {/* LÍMITES REALES Y REQUISITOS TÉCNICOS */}
            <section className="py-24 bg-slate-900 text-white">
                <Container>
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Límites Reales: Ingresos y Vivienda</h2>
                            <p className="text-slate-400 mb-8 leading-relaxed">
                                La administración aplica criterios matemáticos estrictos. No basta con el deseo de estar juntos; hay que demostrar capacidad material para el sostenimiento.
                            </p>

                            <div className="space-y-6">
                                <div className="flex gap-4 p-6 bg-white/5 rounded-xl border border-white/10">
                                    <Landmark className="w-6 h-6 text-[#701218] shrink-0" />
                                    <div>
                                        <h4 className="font-bold mb-1">Ingresos Económicos (IPREM)</h4>
                                        <p className="text-sm text-slate-400">
                                            Régimen General: 150% del IPREM para el primer familiar (aprox. 900€) y 50% extra por cada familiar adicional.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-4 p-6 bg-white/5 rounded-xl border border-white/10">
                                    <Home className="w-6 h-6 text-[#701218] shrink-0" />
                                    <div>
                                        <h4 className="font-bold mb-1">Adecuación de Vivienda</h4>
                                        <p className="text-sm text-slate-400">
                                            Es obligatorio presentar un **Informe de Vivienda Adecuada** emitido por la Comunidad Autónoma o Ayuntamiento.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-4 p-6 bg-white/5 rounded-xl border border-white/10">
                                    <Heart className="w-6 h-6 text-[#701218] shrink-0" />
                                    <div>
                                        <h4 className="font-bold mb-1">Dependencia Económica</h4>
                                        <p className="text-sm text-slate-400">
                                            Para ascendientes, se debe probar que viven a cargo del reagrupante mediante envíos de dinero regulares (generalmente últimos 12 meses).
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-[#701218]" />
                                Documentación Crítica
                            </h3>
                            <div className="space-y-4 text-sm text-slate-300">
                                <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                                    <p className="font-bold text-white mb-1">Vínculo Familiar</p>
                                    <p>Certificados de matrimonio o nacimiento debidamente apostillados o legalizados y traducidos.</p>
                                </div>
                                <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                                    <p className="font-bold text-white mb-1">Medios de Vida</p>
                                    <p>Contrato de trabajo, nóminas y última declaración de la Renta (IRPF).</p>
                                </div>
                                <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                                    <p className="font-bold text-white mb-1">Seguro Médico</p>
                                    <p>En régimen comunitario, es vital contar con un seguro privado sin carencias ni copagos si no se trabaja.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* INFO ALERT BOX */}
            <section className="py-12 bg-white">
                <Container>
                    <div className="p-6 bg-[#701218]/5 border border-[#701218]/20 rounded-xl flex gap-4 items-center">
                        <Info className="w-6 h-6 text-[#701218] shrink-0" />
                        <p className="text-sm text-slate-700 leading-relaxed">
                            <strong>Nota importante:</strong> Los plazos de resolución varían según la Oficina de Extranjería, pero el silencio administrativo suele ser negativo a los 45-90 días. Una presentación perfecta reduce el riesgo de requerimientos que alarguen el proceso.
                        </p>
                    </div>
                </Container>
            </section>

            {/* CTA SECCIÓN */}
            <section className="py-24 bg-slate-50 border-t border-slate-100">
                <Container className="text-center">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Asegura el futuro de los tuyos</h2>
                    <p className="text-slate-600 mb-12 max-w-2xl mx-auto">Revisamos tu situación económica y documental antes de la presentación para garantizar la resolución favorable.</p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg" className="bg-[#701218] hover:bg-[#5a0e13] h-14 px-8 font-bold uppercase tracking-widest text-xs">
                            <Link href="/contacto">Revisión de viabilidad familiar</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="border-slate-300 h-14 px-8 font-bold uppercase tracking-widest text-xs">
                            <Link href="/contacto">Consultar requisitos IPREM</Link>
                        </Button>
                    </div>
                </Container>
            </section>
        </main>
    );
}
