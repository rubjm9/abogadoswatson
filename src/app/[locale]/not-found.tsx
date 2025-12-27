import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Home, Search, FileQuestion } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotFound() {
    const t = useTranslations('ErrorPages.notFound');

    return (
        <main className="pt-20 min-h-screen bg-white">
            <Container className="py-24">
                <div className="max-w-2xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        {/* Icono y número */}
                        <div className="flex justify-center mb-8">
                            <div className="relative">
                                <div className="absolute inset-0 bg-[#701218]/10 rounded-full blur-3xl" />
                                <div className="relative bg-[#701218]/5 p-8 rounded-full">
                                    <FileQuestion className="w-16 h-16 text-[#701218]" />
                                </div>
                            </div>
                        </div>

                        {/* Título */}
                        <div className="space-y-4">
                            <h1 className="font-serif text-6xl md:text-7xl font-bold text-slate-900">
                                404
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
                            <Button
                                asChild
                                className="bg-[#701218] hover:bg-[#590e13] text-white rounded-none px-8 py-6 h-auto uppercase tracking-widest text-[11px] font-bold shadow-lg shadow-[#701218]/10 transition-all hover:-translate-y-1"
                            >
                                <Link href="/">
                                    <Home className="mr-2 h-4 w-4 inline" />
                                    {t('backHome')}
                                </Link>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                className="border-slate-200 rounded-none px-8 py-6 h-auto uppercase tracking-widest text-[11px] font-bold hover:bg-slate-50 transition-all"
                            >
                                <Link href="/contacto">
                                    <Search className="mr-2 h-4 w-4 inline" />
                                    {t('contact')}
                                </Link>
                            </Button>
                        </div>

                        {/* Enlaces útiles */}
                        <div className="pt-12 border-t border-slate-100">
                            <p className="text-sm text-slate-500 mb-4">{t('helpfulLinks')}</p>
                            <div className="flex flex-wrap justify-center gap-4 text-sm">
                                <Link
                                    href="/"
                                    className="text-[#701218] hover:text-[#590e13] font-medium border-b border-transparent hover:border-[#701218] transition-colors"
                                >
                                    {t('links.home')}
                                </Link>
                                <Link
                                    href="/servicios"
                                    className="text-[#701218] hover:text-[#590e13] font-medium border-b border-transparent hover:border-[#701218] transition-colors"
                                >
                                    {t('links.services')}
                                </Link>
                                <Link
                                    href="/sobre-nosotros"
                                    className="text-[#701218] hover:text-[#590e13] font-medium border-b border-transparent hover:border-[#701218] transition-colors"
                                >
                                    {t('links.about')}
                                </Link>
                                <Link
                                    href="/contacto"
                                    className="text-[#701218] hover:text-[#590e13] font-medium border-b border-transparent hover:border-[#701218] transition-colors"
                                >
                                    {t('links.contact')}
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </Container>
        </main>
    );
}

