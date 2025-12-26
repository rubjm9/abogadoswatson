import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";

export function CTASection() {
    return (
        <section className="py-24 bg-[#0F172A] relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03]" />
            <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-[#701218]/10 to-transparent" />

            <Container className="relative z-10">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-serif font-bold text-white sm:text-4xl mb-6">
                        ¿Listo para iniciar tu trámite?
                    </h2>
                    <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                        La primera consulta es el paso más importante. Analizaremos tu caso en detalle y diseñaremos la mejor estrategia legal para ti.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg" className="bg-[#701218] text-white hover:bg-[#590e13] shadow-lg shadow-[#701218]/20">
                            <Link href="/contacto">Reservar Cita Online</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="bg-transparent text-white border-slate-600 hover:bg-white hover:text-slate-900">
                            <Link href="/contacto">Contactar por Email</Link>
                        </Button>
                    </div>
                </div>
            </Container>
        </section>
    );
}
