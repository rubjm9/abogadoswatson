import { getTranslations } from 'next-intl/server';
import { Link } from '@/navigation';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { ShieldX, Home, ArrowLeft } from 'lucide-react';
import { auth } from '@/auth';

export default async function UnauthorizedPage() {
    const session = await auth();
    const t = await getTranslations('ErrorPages.unauthorized');

    return (
        <main className="pt-24 min-h-screen bg-white">
            <Container className="py-24">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="space-y-8">
                        {/* Icono */}
                        <div className="flex justify-center mb-8">
                            <div className="relative">
                                <div className="absolute inset-0 bg-red-100 rounded-full blur-3xl" />
                                <div className="relative bg-red-50 p-8 rounded-full">
                                    <ShieldX className="w-16 h-16 text-red-600" />
                                </div>
                            </div>
                        </div>

                        {/* Título */}
                        <div className="space-y-4">
                            <h1 className="font-serif text-5xl md:text-6xl font-bold text-slate-900">
                                403
                            </h1>
                            <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900">
                                {t('title')}
                            </h2>
                            <p className="text-lg text-slate-600 leading-relaxed max-w-md mx-auto">
                                {t('description')}
                            </p>
                        </div>

                        {/* Acciones */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                            {session ? (
                                <Button
                                    asChild
                                    className="bg-[#701218] hover:bg-[#590e13] text-white px-8 py-6 h-auto uppercase tracking-widest text-[11px] font-bold shadow-lg shadow-[#701218]/10 transition-all duration-300 hover:-translate-y-1"
                                >
                                    <Link href="/dashboard">
                                        <ArrowLeft className="mr-2 h-4 w-4 inline" />
                                        {t('backDashboard')}
                                    </Link>
                                </Button>
                            ) : (
                                <Button
                                    asChild
                                    className="bg-[#701218] hover:bg-[#590e13] text-white px-8 py-6 h-auto uppercase tracking-widest text-[11px] font-bold shadow-lg shadow-[#701218]/10 transition-all duration-300 hover:-translate-y-1"
                                >
                                    <Link href="/">
                                        <Home className="mr-2 h-4 w-4 inline" />
                                        {t('backHome')}
                                    </Link>
                                </Button>
                            )}
                            <Button
                                asChild
                                variant="outline"
                                className="border-slate-200 px-8 py-6 h-auto uppercase tracking-widest text-[11px] font-bold hover:bg-slate-50 transition-all duration-300"
                            >
                                <Link href="/contacto">
                                    {t('contact')}
                                </Link>
                            </Button>
                        </div>

                        {/* Información adicional */}
                        <div className="pt-12 border-t border-slate-100">
                            <p className="text-sm text-slate-500 max-w-md mx-auto">
                                {t('helpText')}
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
        </main>
    );
}

