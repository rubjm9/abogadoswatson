'use server';

import { signIn, signOut } from '@/auth';
import { prisma } from '@/lib/prisma';
import { LoginSchema, RegisterSchema } from '@/lib/definitions';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { AuthError } from 'next-auth';

export async function login(data: z.infer<typeof LoginSchema>) {
    const result = LoginSchema.safeParse(data);

    if (!result.success) {
        return { success: false, error: result.error.flatten() };
    }

    try {
        await signIn('credentials', {
            email: result.data.email,
            password: result.data.password,
            redirect: false,
        });

        return { success: true };
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { success: false, error: 'Invalid credentials' };
                default:
                    return { success: false, error: 'Something went wrong' };
            }
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
        const existingUser = await prisma.user.findUnique({
            where: { email: result.data.email },
        });

        if (existingUser) {
            return { success: false, error: 'User already exists' };
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(result.data.password, 10);

        // Create user
        const user = await prisma.user.create({
            data: {
                name: result.data.name,
                email: result.data.email,
                password: hashedPassword,
                // Default role is CLIENTE (set in schema)
            },
        });

        return { success: true, data: { id: user.id, email: user.email } };
    } catch (_error) {
        return { success: false, error: 'Failed to create user' };
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
