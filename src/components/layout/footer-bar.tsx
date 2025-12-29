"use client";

import { Container } from "@/components/ui/container";
import { Link } from "@/navigation";

export function FooterBar() {
    const currentYear = new Date().getFullYear();

    return (
        <div className="border-t border-slate-200 bg-slate-50 py-4">
            <Container>
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-600">
                    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
                        <Link href="/aviso-legal" className="hover:text-[#701218] transition-colors">
                            Aviso Legal
                        </Link>
                        <Link href="/privacidad" className="hover:text-[#701218] transition-colors">
                            Privacidad
                        </Link>
                        <Link href="/cookies" className="hover:text-[#701218] transition-colors">
                            Política de Cookies
                        </Link>
                    </div>
                    <div className="text-slate-500">
                        Abogados Watson © {currentYear}
                    </div>
                </div>
            </Container>
        </div>
    );
}


