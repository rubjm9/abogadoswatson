import { Container } from "@/components/ui/container";
import { useTranslations } from "next-intl";
import { Globe2, Briefcase, Building2, Users, Gavel } from "lucide-react";
import { Link } from "@/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Servicios Jurídicos de Extranjería y Movilidad | Abogados Watson",
    description: "Soluciones legales integrales para vivir, trabajar o invertir en España. Gestión técnica de residencia, nacionalidad y defensa jurídica.",
};

const serviceCategories = [
    {
        title: "Establecer tu residencia",
        subtitle: "Vivir en España",
        icon: Globe2,
        services: [
            { title: "Estudiantes", description: "Gestión de visados iniciales, prórrogas y modificación a permiso de trabajo." },
            { title: "Nómadas Digitales", description: "Residencia para teletrabajadores internacionales y freelancers remotos." },
            { title: "Reagrupación Familiar", description: "Procesos para traer a familiares de residentes legales en España." },
        ]
    },
    {
        title: "Trabajar y talento",
        subtitle: "Tu carrera profesional",
        icon: Briefcase,
        services: [
            { title: "Profesionales Altamente Cualificados", description: "Permisos rápidos para perfiles técnicos, directivos y graduados." },
            { title: "Traslados Intraempresariales", description: "Movilidad de trabajadores dentro de la misma estructura empresarial internacional." },
            { title: "Emprendedores", description: "Visado para el lanzamiento de proyectos innovadores en territorio español." },
        ]
    },
    {
        title: "Obtener tu pasaporte",
        subtitle: "Nacionalidad Española",
        icon: Users,
        services: [
            { title: "Ley de Nietos (LMD)", description: "Nacionalidad para hijos y nietos de españoles de origen." },
            { title: "Nacionalidad por Residencia", description: "Tramitación tras cumplir el periodo legal de estancia en España." },
            { title: "Carta de Naturaleza", description: "Procesos excepcionales de concesión de ciudadanía por el Gobierno." },
        ]
    },
    {
        title: "Inversiones y Negocios",
        subtitle: "Crecer en España",
        icon: Building2,
        services: [
            { title: "Inversión en Negocios", description: "Asesoramiento legal para la creación o adquisición de empresas." },
            { title: "Inmuebles", description: "Due diligence técnica y legal para la compra segura de activos inmobiliarios." },
        ]
    }
];

export default function ServicesPage() {
    const t = useTranslations("Navigation");
    return (
        <main className="bg-slate-50 min-h-screen">
            <Container className="py-20">
                <div className="max-w-3xl mb-16">
                    <h1 className="mb-6 font-serif text-5xl font-bold text-slate-900">{t('services')}</h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        Soluciones legales diseñadas para tu movilidad internacional.
                        Simplificamos la complejidad jurídica para que puedas enfocarte en tus objetivos.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
                    {serviceCategories.map((category) => (
                        <div key={category.title} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 rounded-xl bg-[#701218]/10">
                                    <category.icon className="w-8 h-8 text-[#701218]" />
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#701218] mb-1">{category.subtitle}</p>
                                    <h2 className="text-2xl font-serif font-bold text-slate-900">{category.title}</h2>
                                </div>
                            </div>
                            <ul className="space-y-6 flex-grow">
                                {category.services.map((service) => (
                                    <li key={service.title} className="group">
                                        <h3 className="font-bold text-slate-900 mb-1 group-hover:text-[#701218] transition-colors">{service.title}</h3>
                                        <p className="text-sm text-slate-600 leading-relaxed">{service.description}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <section className="mt-20 p-10 bg-[#701218] rounded-2xl text-white">
                    <div className="grid md:grid-cols-3 gap-8 items-center">
                        <div className="md:col-span-2">
                            <div className="flex items-center gap-3 mb-4">
                                <Gavel className="w-10 h-10" />
                                <h2 className="text-3xl font-serif font-bold">Defensa Jurídica</h2>
                            </div>
                            <p className="text-white/80 text-lg mb-0">
                                ¿Han denegado tu solicitud? Gestionamos recursos administrativos y contenciosos para proteger tus derechos frente a la administración.
                            </p>
                        </div>
                        <div className="flex justify-md-end">
                            <Link href="/contacto" className="inline-flex h-12 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-[#701218] shadow transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50">
                                Contactar ahora
                            </Link>
                        </div>
                    </div>
                </section>
            </Container>
        </main>
    );
}
