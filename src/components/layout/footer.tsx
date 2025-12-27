import { Container } from "@/components/ui/container";
import { Link } from "@/navigation";

export function Footer() {
    return (
        <footer className="border-t border-slate-200 bg-slate-50 py-12">
            <Container className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div>
                    <h3 className="mb-4 font-serif text-lg font-bold">ABOGADOS WATSON</h3>
                    <p className="text-sm text-slate-600">
                        Expertos en extranjería y movilidad internacional.
                    </p>
                    <p className="mt-4 text-[11px] text-slate-500">info@abogadoswatson.com</p>
                </div>
                <div>
                    <h4 className="mb-4 font-bold text-slate-900 uppercase tracking-widest text-[10px]">Servicios Jurídicos</h4>
                    <ul className="space-y-2 text-sm text-slate-600">
                        <li><Link href="/servicios/vivir" className="hover:text-[#701218] transition-colors">Vivir en España</Link></li>
                        <li><Link href="/servicios/trabajar" className="hover:text-[#701218] transition-colors">Trabajar y Talento</Link></li>
                        <li><Link href="/servicios/negocios" className="hover:text-[#701218] transition-colors">Inversión y Negocios</Link></li>
                        <li><Link href="/servicios/nacionalidad" className="hover:text-[#701218] transition-colors">Nacionalidad Española</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="mb-4 font-bold text-slate-900 uppercase tracking-widest text-[10px]">Defensa y Resolución</h4>
                    <ul className="space-y-2 text-sm text-slate-600">
                        <li><Link href="/servicios/defensa-juridica" className="hover:text-[#701218] transition-colors">Defensa Jurídica</Link></li>
                        <li><Link href="/contacto" className="hover:text-[#701218] transition-colors">Consultar Denegación</Link></li>
                    </ul>
                </div>
            </Container>
        </footer>
    );
}
