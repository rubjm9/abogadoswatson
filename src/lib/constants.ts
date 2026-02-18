import { Briefcase, Globe2, GraduationCap, Users, Building2, Gavel, Home, LucideIcon } from "lucide-react";

export interface Service {
    title: string;
    href: string;
    description: string;
    icon: LucideIcon;
}

export interface ServiceCategory {
    title: string;
    subtitle: string;
    services: Service[];
}

export const serviceCategories: ServiceCategory[] = [
    {
        title: "Establecer tu residencia",
        subtitle: "Vivir en España",
        services: [
            { title: "Estudiantes", href: "/servicios/estudiantes", description: "Visados, prórrogas y búsqueda de empleo.", icon: GraduationCap },
            { title: "Nómadas Digitales", href: "/servicios/nomadas", description: "Teletrabajo internacional en España.", icon: Globe2 },
            { title: "Reagrupación Familiar", href: "/servicios/familia", description: "Trae a tus seres queridos contigo.", icon: Users },
        ]
    },
    {
        title: "Trabajar y talento",
        subtitle: "Tu carrera profesional",
        services: [
            { title: "Profesionales (PAC)", href: "/servicios/corporativo", description: "Altamente cualificados y traslados.", icon: Briefcase },
            { title: "Descendientes", href: "/servicios/trabajar", description: "Búsqueda de empleo para hijos y nietos.", icon: Users },
            { title: "Inversores", href: "/servicios/inversiones", description: "Inversión y emprendimiento internacional.", icon: Building2 },
        ]
    },
    {
        title: "Obtener tu pasaporte",
        subtitle: "Nacionalidad Española",
        services: [
            { title: "Nacionalidad", href: "/servicios/nacionalidad", description: "Tramitación técnica de nacionalidad española.", icon: GraduationCap },
        ]
    },
    {
        title: "Defensa Jurídica",
        subtitle: "Solucionar denegaciones",
        services: [
            { title: "Protección Jurídica", href: "/servicios/defensa-juridica", description: "Defensa ante denegaciones y conflictos.", icon: Gavel },
        ]
    },
    {
        title: "Derecho Inmobiliario",
        subtitle: "Compraventa y asesoramiento",
        services: [
            { title: "Derecho Inmobiliario", href: "/servicios/inmobiliario", description: "Asesoramiento integral en compraventa y gestión de inmuebles.", icon: Home },
        ]
    }
];
