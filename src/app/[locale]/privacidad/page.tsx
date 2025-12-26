import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Política de Privacidad | Abogados Watson",
    description: "Información sobre el tratamiento de datos personales y cumplimiento del RGPD en Abogados Watson.",
};

export default function PrivacidadPage() {
    return (
        <main className="min-h-screen bg-white text-slate-900 pb-24">
            <Breadcrumbs items={[{ label: "Privacidad" }]} />

            <section className="py-20">
                <Container>
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-4xl font-serif font-bold mb-8">Política de Privacidad</h1>
                        <p className="text-slate-600 mb-12 italic">
                            Última actualización: 26 de diciembre de 2025
                        </p>

                        <div className="prose prose-slate max-w-none space-y-12 text-slate-700">
                            <p className="leading-relaxed">
                                De conformidad con el **Reglamento (UE) 2016/679 (RGPD)** y la **Ley Orgánica 3/2018 (LOPDGDD)**, Abogados Watson informa a continuación sobre su política de protección de datos personales.
                            </p>

                            <div>
                                <h2 className="text-xl font-bold mb-4 uppercase tracking-wider text-[#701218]">1. Responsable del Tratamiento</h2>
                                <p><strong>Identidad:</strong> Watson & Asociados Jurídicos S.L.</p>
                                <p><strong>Email DP para ejercicio de derechos:</strong> legal@abogadoswatson.com</p>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold mb-4 uppercase tracking-wider text-[#701218]">2. Finalidad del Tratamiento</h2>
                                <p>Tratamos la información que nos facilita con las siguientes finalidades:</p>
                                <ul className="list-disc pl-6 space-y-2 mt-2">
                                    <li>Gestión de la relación profesional y ejecución del encargo jurídico.</li>
                                    <li>Atención de consultas y solicitudes de información recibidas a través de formularios.</li>
                                    <li>Cumplimiento de obligaciones legales derivadas de la normativa de prevención de blanqueo de capitales.</li>
                                    <li>Envío de comunicaciones informativas relacionadas con el ámbito legal, siempre que contemos con su consentimiento expreso.</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold mb-4 uppercase tracking-wider text-[#701218]">3. Legitimación</h2>
                                <p>La base legal para el tratamiento de su datos es:</p>
                                <ul className="list-disc pl-6 space-y-2 mt-2">
                                    <li>La **relación contractual** para la gestión de servicios jurídicos.</li>
                                    <li>El **interés legítimo** para responder a consultas.</li>
                                    <li>El **consentimiento** del interesado para el envío de información comercial.</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold mb-4 uppercase tracking-wider text-[#701218]">4. Conservación de Datos</h2>
                                <p>
                                    Los datos personales proporcionados se conservarán mientras se mantenga la relación profesional o durante los años necesarios para cumplir con las obligaciones legales (específicamente 5 años en materia tributaria y mercantil, y hasta 10 años en prevención de blanqueo de capitales).
                                </p>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold mb-4 uppercase tracking-wider text-[#701218]">5. Sus Derechos</h2>
                                <p>Como titular de los datos, usted puede ejercer en cualquier momento sus derechos de:</p>
                                <ul className="list-disc pl-6 space-y-1 mt-2">
                                    <li>Acceso a sus datos personales.</li>
                                    <li>Rectificación de datos inexactos.</li>
                                    <li>Supresión (derecho al olvido).</li>
                                    <li>Limitación del tratamiento.</li>
                                    <li>Oposición al tratamiento.</li>
                                    <li>Portabilidad de los datos.</li>
                                </ul>
                                <p className="mt-4">
                                    Para ejercer estos derechos, puede enviar un correo electrónico a **legal@abogadoswatson.com**, adjuntando copia de su DNI o documento equivalente para verificar su identidad.
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </main>
    );
}
