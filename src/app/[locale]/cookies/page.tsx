import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Política de Cookies | Abogados Watson",
    description: "Información detallada sobre el uso de cookies en el sitio web de Abogados Watson.",
};

export default function CookiesPage() {
    return (
        <main className="min-h-screen bg-slate-50 text-slate-900 pb-24">
            <Breadcrumbs items={[{ label: "Política de Cookies" }]} />

            <section className="py-20">
                <Container>
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-4xl font-serif font-bold mb-8">Política de Cookies</h1>

                        <div className="prose prose-slate max-w-none space-y-10 text-slate-700 bg-white p-12 rounded-2xl border border-slate-200">
                            <p className="leading-relaxed">
                                Este sitio web utiliza cookies para mejorar la experiencia del usuario y analizar el tráfico de navegación. En cumplimiento de la **LSSI-CE**, le informamos de qué son y cómo las gestionamos.
                            </p>

                            <div>
                                <h2 className="text-xl font-bold mb-4 uppercase tracking-wider text-[#701218]">¿Qué es una cookie?</h2>
                                <p>
                                    Una cookie es un pequeño archivo de texto que se descarga en su navegador cuando accede a determinadas páginas web. Permite a la web almacenar y recuperar información sobre sus hábitos de navegación o sobre su equipo.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold mb-4 uppercase tracking-wider text-[#701218]">Tipos de Cookies que utilizamos</h2>
                                <div className="space-y-4">
                                    <div className="p-4 bg-slate-50 rounded-lg border-l-4 border-[#701218]">
                                        <h3 className="font-bold text-sm mb-1 uppercase tracking-tighter">1. Cookies Técnicas</h3>
                                        <p className="text-xs text-slate-600">Necesarias para el correcto funcionamiento del sitio, como la gestión de sesiones o la elección del idioma.</p>
                                    </div>
                                    <div className="p-4 bg-slate-50 rounded-lg border-l-4 border-[#701218]">
                                        <h3 className="font-bold text-sm mb-1 uppercase tracking-tighter">2. Cookies Analíticas</h3>
                                        <p className="text-xs text-slate-600">Nos permiten cuantificar el número de usuarios y realizar la medición y análisis estadístico de la utilización que hacen los usuarios del servicio ofertado.</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold mb-4 uppercase tracking-wider text-[#701218]">Gestión de Cookies</h2>
                                <p>
                                    Usted puede permitir, bloquear o eliminar las cookies instaladas en su equipo mediante la configuración de las opciones del navegador instalado en su ordenador:
                                </p>
                                <ul className="list-disc pl-6 mt-4 text-xs space-y-1">
                                    <li><strong>Chrome:</strong> Configuración - Privacidad y seguridad - Cookies.</li>
                                    <li><strong>Firefox:</strong> Ajustes - Privacidad y seguridad - Cookies y datos del sitio.</li>
                                    <li><strong>Safari:</strong> Preferencias - Privacidad - Bloquear todas las cookies.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </main>
    );
}
