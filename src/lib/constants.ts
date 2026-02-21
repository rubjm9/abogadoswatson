import type { LucideIcon } from "lucide-react";
import { Globe2, Briefcase, Building2, Users } from "lucide-react";

/** Número de WhatsApp para contacto (sin +). Usado en botón flotante y página de contacto. */
export const CONTACT_WHATSAPP_NUMBER = "34637058570";

export const WHATSAPP_URL = `https://wa.me/${CONTACT_WHATSAPP_NUMBER}`;

/** Categorías de servicios para navegación (header y menú móvil). Los textos se obtienen de ServicesPage.categories en i18n. */
export const serviceCategories: {
    key: string;
    icon: LucideIcon;
    services: { key: string; href: string }[];
}[] = [
    {
        key: "residence",
        icon: Globe2,
        services: [
            { key: "students", href: "/servicios/estudiantes" },
            { key: "nomads", href: "/servicios/nomadas" },
            { key: "family", href: "/servicios/familia" },
        ],
    },
    {
        key: "work",
        icon: Briefcase,
        services: [
            { key: "qualified", href: "/servicios/trabajar" },
            { key: "corporate", href: "/servicios/corporativo" },
            { key: "descendants", href: "/servicios/nacionalidad" },
            { key: "entrepreneurs", href: "/servicios/inversiones" },
        ],
    },
    {
        key: "citizenship",
        icon: Users,
        services: [
            { key: "grandchildren", href: "/servicios/nacionalidad" },
            { key: "residence", href: "/servicios/nacionalidad" },
            { key: "nature", href: "/servicios/nacionalidad" },
        ],
    },
    {
        key: "business",
        icon: Building2,
        services: [
            { key: "investment", href: "/servicios/inversiones" },
            { key: "realEstate", href: "/servicios/inversiones" },
            { key: "inmobiliario", href: "/servicios/inmobiliario" },
        ],
    },
];
