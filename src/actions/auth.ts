'use server';

import { auth, signIn, signOut } from '@/auth';
import { findUserByEmail, createUser } from '@/lib/db/users';
import { LoginSchema, RegisterSchema } from '@/lib/definitions';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { AuthError } from 'next-auth';

export async function login(data: z.infer<typeof LoginSchema> & { callbackUrl?: string }) {
    const result = LoginSchema.safeParse(data);

    if (!result.success) {
        return { success: false, error: result.error.flatten() };
    }

    const callbackUrl = typeof data.callbackUrl === 'string' && data.callbackUrl ? data.callbackUrl : '/admin';

    try {
        await signIn('credentials', {
            email: result.data.email,
            password: result.data.password,
            callbackUrl,
            redirect: false,
        });
        // En NextAuth v5, si signIn no lanza, la autenticación fue exitosa
        return { success: true };
    } catch (error) {
        // #region agent log
        const err = error as { type?: string; message?: string; name?: string; cause?: unknown };
        const cause = err?.cause as { type?: string; message?: string; name?: string } | undefined;
        fetch('http://127.0.0.1:7244/ingest/6680d23b-a0d9-43b5-91d3-5b41af8bd2a6', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': 'd235c0' },
            body: JSON.stringify({
                sessionId: 'd235c0',
                location: 'auth.ts:login catch',
                message: 'Login catch v2',
                data: {
                    isAuthError: error instanceof AuthError,
                    type: err?.type,
                    name: err?.name,
                    message: err?.message?.slice(0, 120),
                    causeType: cause?.type,
                    causeName: cause?.name,
                    causeMessage: typeof cause?.message === 'string' ? cause.message.slice(0, 200) : String(cause).slice(0, 200),
                },
                timestamp: Date.now(),
            }),
        }).catch(() => {});
        // #endregion
        const authError = error instanceof AuthError ? error : null;
        if (authError?.type === 'CredentialsSignin') {
            return { success: false, error: 'Invalid credentials' };
        }
        if (authError) {
            return { success: false, error: 'Something went wrong' };
        }
        throw error;
    }
}

export async function register(data: z.infer<typeof RegisterSchema>) {
    const result = RegisterSchema.safeParse(data);

    if (!result.success) {
        return { success: false, error: result.error.flatten() };
    }

    try {
        // Check if user already exists
        const existingUser = await findUserByEmail(result.data.email);

        if (existingUser) {
            return { success: false, error: 'User already exists' };
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(result.data.password, 10);

        // Create user
        const user = await createUser({
            name: result.data.name,
            email: result.data.email,
            password: hashedPassword,
        });

        return { success: true, data: { id: user.id, email: user.email } };
    } catch (err) {
        console.error('Register error:', err);
        const message = err instanceof Error ? err.message : 'Failed to create user';
        return { success: false, error: process.env.NODE_ENV === 'development' ? message : 'Failed to create user' };
    }
}

export async function logout() {
    try {
        await signOut({ redirect: false });
        return { success: true };
    } catch (_error) {
        return { success: false, error: 'Failed to logout' };
    }
}

export async function logoutAndRedirect() {
    await signOut({ redirect: false });
    const { redirect } = await import('next/navigation');
    redirect('/');
}
