'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { useRouter } from 'next/navigation';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';
import { register } from '@/actions/auth';
import { useState } from 'react';

export default function RegistroPage() {
  const t = useTranslations('RegisterPage');
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setError(null);
    const name = (formData.get('name') as string)?.trim();
    const email = (formData.get('email') as string)?.trim();
    const password = formData.get('password') as string;
    const passwordConfirm = formData.get('passwordConfirm') as string;

    if (!name) {
      setError(t('nameRequired'));
      return;
    }
    if (password.length < 6) {
      setError(t('passwordMin'));
      return;
    }
    if (password !== passwordConfirm) {
      setError(t('passwordMismatch'));
      return;
    }

    const result = await register({ name, email, password });

    if (result.success) {
      router.push('/login?registered=1');
      router.refresh();
      return;
    }

    if (typeof result.error === 'string') {
      setError(result.error === 'User already exists' ? t('alreadyExists') : result.error);
      return;
    }
    if (result.error?.fieldErrors) {
      const first = Object.values(result.error.fieldErrors).flat()[0];
      setError(first ?? t('alreadyExists'));
    } else {
      setError(t('alreadyExists'));
    }
  }

  return (
    <main className="pt-24 min-h-screen bg-white">
      <Container className="py-24">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#701218]/10 text-[#701218] mb-4">
                <UserPlus className="w-7 h-7" />
              </div>
              <h1 className="font-serif text-2xl md:text-3xl font-bold text-slate-900">
                {t('title')}
              </h1>
              <p className="text-slate-600 mt-2">{t('description')}</p>
            </div>

            <form action={handleSubmit} className="space-y-4">
              {error && (
                <p
                  className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2"
                  role="alert"
                >
                  {error}
                </p>
              )}
              <div className="space-y-2">
                <Label htmlFor="name">{t('name')}</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Su nombre"
                />
              </div>
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
                  autoComplete="new-password"
                  minLength={6}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="passwordConfirm">{t('passwordConfirm')}</Label>
                <Input
                  id="passwordConfirm"
                  name="passwordConfirm"
                  type="password"
                  required
                  autoComplete="new-password"
                  minLength={6}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-[#701218] hover:bg-[#590e13] text-white uppercase tracking-widest text-[11px] font-bold"
              >
                {t('submit')}
              </Button>
            </form>

            <p className="text-center text-sm text-slate-600">
              <Link href="/login" className="text-[#701218] font-medium hover:underline">
                {t('backToLogin')}
              </Link>
            </p>
          </motion.div>
        </div>
      </Container>
    </main>
  );
}
