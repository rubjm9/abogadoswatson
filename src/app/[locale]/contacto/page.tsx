import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";

export default function ContactPage() {
    const t = useTranslations("Navigation");

    return (
        <Container className="py-20">
            <div className="grid gap-12 lg:grid-cols-2">
                <div>
                    <h1 className="mb-6 font-serif text-4xl font-bold">{t('contact')}</h1>
                    <p className="mb-8 text-slate-600">
                        Contáctanos para resolver tus dudas sobre inmigración y movilidad internacional.
                    </p>
                    <div className="rounded-lg bg-slate-100 p-8">
                        <h3 className="mb-4 font-bold">Oficina Central</h3>
                        <p className="text-sm text-slate-600">Calle Velázquez, Madrid</p>
                        <p className="text-sm text-slate-600">info@abogadoswatson.com</p>
                    </div>
                </div>

                <form className="space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium">Nombre</label>
                            <Input id="name" placeholder="Tu nombre" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">Email</label>
                            <Input id="email" type="email" placeholder="tu@email.com" />
                        </div>
                    </div>

                    <Button type="submit" className="w-full bg-[#701218] hover:bg-[#590e13] text-white">
                        Enviar Mensaje
                    </Button>
                </form>
            </div>
        </Container>
    );
}
