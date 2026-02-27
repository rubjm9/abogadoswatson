'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { useRouter, useSearchParams } from 'next/navigation';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, Home, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { login } from '@/actions/auth';
import { useState } from 'react';

export default function LoginPage() {
    const t = useTranslations('ErrorPages.login');
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') ?? '/admin';
    const registered = searchParams.get('registered') === '1';
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(formData: FormData) {
        setError(null);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const result = await login({ email, password });
        if (result.success) {
            router.push(callbackUrl);
            router.refresh();
            return;
        }
        if (typeof result.error === 'string') {
            setError(result.error);
            return;
        }
        if (result.error?.fieldErrors) {
            const first = Object.values(result.error.fieldErrors).flat()[0];
            setError(first ?? t('invalidCredentials'));
        } else {
            setError(t('invalidCredentials'));
        }
    }

    return (
        <main className="pt-24 min-h-screen bg-white">
            <Container className="py-24">
                <div className="max-w-2xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        {/* Encabezado acogedor */}
                        <div className="flex justify-center mb-6">
                            <div className="relative">
                                <div className="absolute inset-0 bg-[#701218]/10 rounded-full blur-2xl" />
                                <div className="relative bg-slate-50 border border-slate-100 p-6 rounded-full">
                                    <Lock className="w-12 h-12 text-[#701218]" strokeWidth={1.5} />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2 mb-8">
                            <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-900">
                                {t('welcomeTitle')}
                            </h1>
                            <p className="text-slate-600 max-w-sm mx-auto">
                                {t('welcomeDescription')}
                            </p>
                        </div>

                        {/* Formulario */}
                        <div className="max-w-sm mx-auto text-left">
                            <form action={handleSubmit} className="space-y-4">
                                {registered && (
                                    <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-md px-3 py-2" role="status">
                                        {t('registerSuccess')}
                                    </p>
                                )}
                                {error && (
                                    <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2" role="alert">
                                        {error}
                                    </p>
                                )}
                                <div className="space-y-2">
                                    <Label htmlFor="email">{t('email')}</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        autoComplete="email"
                                        placeholder="tu@email.com"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">{t('password')}</Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        autoComplete="current-password"
                                        minLength={6}
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full bg-[#701218] hover:bg-[#590e13] text-white uppercase tracking-widest text-[11px] font-bold"
                                >
                                    {t('submit')}
                                </Button>
                                <p className="text-center text-sm text-slate-600 pt-2">
                                    <Link href="/registro" className="text-[#701218] font-medium hover:underline">
                                        {t('createAccount')}
                                    </Link>
                                </p>
                            </form>
                        </div>

                        {/* Acciones */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                            <Button
                                asChild
                                variant="outline"
                                className="border-slate-200 px-8 py-6 h-auto uppercase tracking-widest text-[11px] font-bold hover:bg-slate-50 transition-all duration-300"
                            >
                                <Link href="/">
                                    <Home className="mr-2 h-4 w-4 inline" />
                                    {t('backHome')}
                                </Link>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                className="border-slate-200 px-8 py-6 h-auto uppercase tracking-widest text-[11px] font-bold hover:bg-slate-50 transition-all duration-300"
                            >
                                <Link href="/contacto">
                                    <Mail className="mr-2 h-4 w-4 inline" />
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
                    </motion.div>
                </div>
            </Container>
        </main>
    );
}

