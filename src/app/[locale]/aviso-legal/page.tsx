import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Aviso Legal | Abogados Watson",
    description: "Información legal, términos de uso y propiedad intelectual de Abogados Watson.",
};

export default function AvisoLegalPage() {
    return (
        <main className="min-h-screen bg-slate-50 text-slate-900 pb-24">
            <Breadcrumbs items={[{ label: "Aviso Legal" }]} />

            <section className="py-20 bg-white border-b border-slate-200">
                <Container>
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-4xl font-serif font-bold mb-8">Aviso Legal</h1>
                        <p className="text-slate-600 mb-12 italic">
                            Última actualización: 26 de diciembre de 2025
                        </p>

                        <div className="prose prose-slate max-w-none space-y-12">
                            <div>
                                <h2 className="text-xl font-bold mb-4 uppercase tracking-wider text-[#701218]">1. Información Titular</h2>
                                <p className="leading-relaxed">
                                    En cumplimiento de lo previsto en la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa que el titular de este sitio web es **Abogados Watson** (en adelante, "el Despacho").
                                </p>
                                <ul className="mt-4 space-y-2 list-none pl-0">
                                    <li><strong>Denominación Social:</strong> Watson & Asociados Jurídicos S.L. (Ejemplo)</li>
                                    <li><strong>Domicilio Social:</strong> Paseo de la Castellana, Madrid, España</li>
                                    <li><strong>Email de contacto:</strong> info@abogadoswatson.com</li>
                                    <li><strong>Normativa Profesional:</strong> El ejercicio de la abogacía se rige por el Estatuto General de la Abogacía Española y el Código Deontológico de la Abogacía Española.</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold mb-4 uppercase tracking-wider text-[#701218]">2. Condiciones de Uso</h2>
                                <p className="leading-relaxed">
                                    El acceso y uso de este sitio web atribuye la condición de usuario, implicando la aceptación plena y sin reservas de todas las disposiciones incluidas en este Aviso Legal. Los contenidos de este sitio tienen una finalidad meramente informativa y no constituyen, bajo ninguna circunstancia, la prestación de un servicio de asesoramiento jurídico de carácter profesional.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold mb-4 uppercase tracking-wider text-[#701218]">3. Propiedad Intelectual e Industrial</h2>
                                <p className="leading-relaxed">
                                    La totalidad de los contenidos de este sitio web, incluyendo a título enunciativo pero no limitativo, textos, imágenes, logotipos, iconos, diseño gráfico y código fuente, son propiedad de Abogados Watson o de terceros que han autorizado su uso. Queda prohibida cualquier reproducción, distribución o transformación de estos contenidos sin la autorización expresa y por escrito del titular.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold mb-4 uppercase tracking-wider text-[#701218]">4. Limitación de Responsabilidad</h2>
                                <p className="leading-relaxed">
                                    El Despacho no se hace responsable de los errores u omisiones de los que pudieran adolecer los contenidos de este sitio web ni de otros contenidos a los que se pueda acceder a través del mismo. Los enlaces externos se proporcionan con fines informativos y no implican relación ni aprobación alguna por parte del Despacho.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold mb-4 uppercase tracking-wider text-[#701218]">5. Jurisdicción y Ley Aplicable</h2>
                                <p className="leading-relaxed">
                                    Para la resolución de todas las controversias o cuestiones relacionadas con el presente sitio web o de las actividades en él desarrolladas, será de aplicación la legislación española, a la que se someten expresamente las partes, siendo competentes para la resolución de todos los conflictos derivados o relacionados con su uso los Juzgados y Tribunales de Madrid.
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </main>
    );
}
