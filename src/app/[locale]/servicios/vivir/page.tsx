import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { Home, Users, GraduationCap, Globe2, RefreshCw, ShieldAlert, CheckCircle2, ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Residencia en España: Guía y Asesoría Legal | Abogados Watson",
    description: "Consigue tu residencia en España con seguridad. Expertos en visas de nómada digital, estudios y reagrupación familiar. Analizamos tu viabilidad legal.",
};

export default function VivirEnEspañaPage() {
    const services = [
        {
            title: "Nómadas Digitales en España",
            subtitle: "¿Eres nómada digital? Teletrabajo Internacional",
            desc: "Autorización para trabajadores por cuenta ajena y cuenta propia que trabajan en remoto desde España para empresas extranjeras. Gestión integral de residencia y beneficios fiscales.",
            icon: Globe2,
            featured: true
        },
        {
            title: "Estudiantes y Formación",
            subtitle: "Visado de Estudios",
            desc: "Gestión de estancias por estudios, prórrogas y planificación de tu futuro profesional hacia la residencia de larga duración o la nacionalidad española.",
            icon: GraduationCap
        },
        {
            title: "Reagrupación Familiar",
            subtitle: "Derecho a la vida en familia",
            desc: "Trámites para traer a tus seres queridos a España bajo el régimen general o comunitario con total seguridad jurídica.",
            icon: Users
        },
        {
            title: "Residencia No Lucrativa",
            subtitle: "Residir sin trabajar",
            desc: "Para ciudadanos que disponen de medios económicos suficientes para vivir en España sin realizar actividades laborales.",
            icon: Home
        },
        {
            title: "Arraigo y Circunstancias Excepcionales",
            subtitle: "Regularización administrativa",
            desc: "Procedimientos de arraigo social, laboral, familiar o para la formación. Evaluamos la viabilidad de tu expediente.",
            icon: CheckCircle2
        },
        {
            title: "Renovaciones y Larga Duración",
            subtitle: "Mantenimiento del estatus legal",
            desc: "Gestión de renovaciones de permisos y obtención de la residencia de larga duración tras 5 años de residencia legal y continuada.",
            icon: RefreshCw
        }
    ];

    return (
        <main className="min-h-screen bg-slate-50 text-slate-900">
            <Breadcrumbs items={[{ label: "Vivir en España" }]} />

            {/* SECCIÓN 1 — HERO */}
            <section className="relative py-24 bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/80 z-10" />
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#701218]/20 to-transparent z-20" />

                <Container className="relative z-10">
                    <div className="max-w-3xl">
                        <span className="text-[#701218] font-bold tracking-widest uppercase text-xs mb-4 block">
                            Movilidad Internacional
                        </span>
                        <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
                            Establecer tu residencia en España con seguridad jurídica
                        </h1>
                        <p className="text-sm text-[#701218] font-bold mb-4 bg-[#701218]/10 px-3 py-1 rounded-sm inline-block">
                            Gestión y asesoramiento integral en regímenes de extranjería
                        </p>
                        <p className="text-xl text-slate-300 leading-relaxed max-w-2xl">
                            Simplificamos la complejidad burocrática para que tu transición a España sea segura y eficiente. Resolvemos desde la obtención inicial del **expediente** hasta su mantenimiento a largo plazo.
                        </p>
                    </div>
                </Container>
            </section>

            {/* SECCIÓN 2 — QUÉ SITUACIONES CUBRIMOS */}
            <section className="py-24">
                <Container>
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-serif font-bold mb-2">Servicios de residencia</h2>
                        <p className="text-[#701218] font-bold text-sm uppercase tracking-widest mb-6">Soluciones adaptadas a tu perfil migratorio</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((item, i) => (
                            <div key={i} className={`bg-white p-8 rounded-xl shadow-sm border transition-all group ${item.featured ? 'border-[#701218]/50 ring-1 ring-[#701218]/20' : 'border-slate-100'}`}>
                                <item.icon className="w-8 h-8 text-[#701218] mb-6" />
                                <h3 className="text-lg font-serif font-bold mb-1 leading-tight">{item.title}</h3>
                                <p className="text-[10px] font-bold text-[#701218] uppercase tracking-wider mb-4">{item.subtitle}</p>
                                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                                {item.title === "Estudiantes y Formación" && (
                                    <div className="mt-4 pt-4 border-t border-slate-50">
                                        <Link href="/servicios/estudiantes" className="text-xs font-bold text-[#701218] flex items-center gap-1 hover:translate-x-1 transition-transform">
                                            Guía de visado y trabajo <ArrowRight className="w-3 h-3" />
                                        </Link>
                                    </div>
                                )}
                                {item.title === "Reagrupación Familiar" && (
                                    <div className="mt-4 pt-4 border-t border-slate-50">
                                        <Link href="/servicios/familia" className="text-xs font-bold text-[#701218] flex items-center gap-1 hover:translate-x-1 transition-transform">
                                            Guía de requisitos y plazos <ArrowRight className="w-3 h-3" />
                                        </Link>
                                    </div>
                                )}
                                {item.featured && (
                                    <div className="mt-4 pt-4 border-t border-slate-50 flex flex-col gap-3">
                                        <span className="text-[10px] font-bold text-[#701218] uppercase tracking-widest">Servicio Prioritario</span>
                                        <Link href="/servicios/nomadas" className="text-xs font-bold text-[#701218] flex items-center gap-1 hover:translate-x-1 transition-transform">
                                            Guía técnica y requisitos <ArrowRight className="w-3 h-3" />
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
                            <h2 className="text-3xl font-serif font-bold mb-2">Nuestro compromiso técnico</h2>
                            <p className="text-[#701218] font-bold text-sm uppercase tracking-widest mb-8">Metodología para una resolución favorable</p>
                            <p className="text-slate-600 leading-relaxed mb-6">
                                En **Abogados Watson**, no nos limitamos a presentar formularios. Auditamos tu documentación antes de presentarla para eliminar el riesgo de inadmisión o **requerimientos** innecesarios que dilaten tu proceso.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "Evaluación de viabilidad según normativa vigente.",
                                    "Preparación y revisión técnica de toda la documentación.",
                                    "Presentación telemática ágil ante las oficinas de extranjería.",
                                    "Seguimiento activo del estado del expediente hasta la resolución."
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
                                <Globe2 className="w-32 h-32 text-slate-200" />
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
                            <h3 className="text-xl font-serif font-bold mb-2 text-slate-900">¿Problemas con tu solicitud?</h3>
                            <p className="text-sm text-slate-600 leading-relaxed mb-4">
                                Si tu solicitud de residencia ha sido denegada o experimentas retrasos injustificados, contamos con una unidad especializada en recursos y apelaciones para proteger tu derecho a vivir en España.
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
                    <h2 className="text-3xl font-serif font-bold mb-2">Inicia tu proceso con seguridad</h2>
                    <p className="text-[#701218] font-bold text-sm uppercase tracking-widest mb-10">Diagnóstico jurídico de viabilidad para tu residencia</p>

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
