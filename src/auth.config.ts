import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { LoginSchema } from '@/lib/definitions';
import { findUserByEmail } from '@/lib/db/users';
import bcrypt from 'bcryptjs';

export const authConfig: NextAuthConfig = {
    secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnAdmin = nextUrl.pathname.includes('/admin');
            const isOnAreaPersonal = nextUrl.pathname.includes('/area-personal');

            if (isOnAdmin || isOnAreaPersonal) {
                if (isLoggedIn) return true;
                return false;
            }
            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id as string;
                session.user.role = token.role as string;
            }
            return session;
        },
    },
    providers: [
        Credentials({
            async authorize(credentials) {
                // #region agent log
                fetch('http://127.0.0.1:7244/ingest/6680d23b-a0d9-43b5-91d3-5b41af8bd2a6', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': 'd235c0' },
                    body: JSON.stringify({ sessionId: 'd235c0', location: 'auth.config.ts:authorize start', message: 'authorize called', data: { hasEmail: !!credentials?.email }, timestamp: Date.now() }),
                }).catch(() => {});
                // #endregion
                try {
                    const validatedFields = LoginSchema.safeParse(credentials);

                    if (validatedFields.success) {
                        const { email, password } = validatedFields.data;

                        const user = await findUserByEmail(email);
                        // #region agent log
                        fetch('http://127.0.0.1:7244/ingest/6680d23b-a0d9-43b5-91d3-5b41af8bd2a6', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': 'd235c0' },
                            body: JSON.stringify({ sessionId: 'd235c0', location: 'auth.config.ts:authorize after findUser', message: 'findUserByEmail result', data: { userFound: !!user, hasPassword: !!(user?.password) }, timestamp: Date.now() }),
                        }).catch(() => {});
                        // #endregion
                        if (!user || !user.password) return null;

                        const passwordsMatch = await bcrypt.compare(password, user.password);
                        // #region agent log
                        fetch('http://127.0.0.1:7244/ingest/6680d23b-a0d9-43b5-91d3-5b41af8bd2a6', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': 'd235c0' },
                            body: JSON.stringify({ sessionId: 'd235c0', location: 'auth.config.ts:authorize bcrypt', message: 'bcrypt result', data: { passwordsMatch }, timestamp: Date.now() }),
                        }).catch(() => {});
                        // #endregion
                        if (passwordsMatch) {
                            return {
                                id: user.id,
                                name: user.name,
                                email: user.email,
                                role: user.role,
                            };
                        }
                    }

                    return null;
                } catch (e) {
                    // #region agent log
                    const err = e as { message?: string; name?: string };
                    fetch('http://127.0.0.1:7244/ingest/6680d23b-a0d9-43b5-91d3-5b41af8bd2a6', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': 'd235c0' },
                        body: JSON.stringify({ sessionId: 'd235c0', location: 'auth.config.ts:authorize error', message: 'authorize threw', data: { name: err?.name, message: err?.message?.slice(0, 200) }, timestamp: Date.now() }),
                    }).catch(() => {});
                    // #endregion
                    throw e;
                }
            },
        }),
    ],
};
