import createMiddleware from 'next-intl/middleware';
import { routing } from './navigation';
import { auth } from './auth';
import { NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    // Protected routes configuration
    const isOnDashboard = nextUrl.pathname.includes('/dashboard');
    const isOnAdmin = nextUrl.pathname.includes('/admin');
    const isProtectedRoute = isOnDashboard || isOnAdmin;

    // Role-based access control
    if (isProtectedRoute && !isLoggedIn) {
        const locale = nextUrl.pathname.split('/')[1] || 'es';
        return NextResponse.redirect(new URL(`/${locale}/login`, nextUrl));
    }

    if (isOnAdmin && isLoggedIn) {
        const userRole = req.auth?.user?.role;
        if (userRole !== 'ADMIN') {
            const locale = nextUrl.pathname.split('/')[1] || 'es';
            return NextResponse.redirect(new URL(`/${locale}/unauthorized`, nextUrl));
        }
    }

    // Ghost routes redirection to specific Service Hubs
    const pathParts = nextUrl.pathname.split('/'); // ['', locale, 'servicios', 'service']
    const locale = pathParts[1] || 'es';

    if (pathParts[2] === 'servicios') {
        const service = pathParts[3];
        const vivreRoutes: string[] = [];
        const trabajarRoutes: string[] = [];

        if (vivreRoutes.includes(service)) {
            return NextResponse.redirect(new URL(`/${locale}/servicios/vivir`, nextUrl));
        }
        if (trabajarRoutes.includes(service)) {
            return NextResponse.redirect(new URL(`/${locale}/servicios/trabajar`, nextUrl));
        }
    }

    // Apply intl middleware for all routes
    return intlMiddleware(req);
});

export const config = {
    // Match all pathnames except for static files and API routes
    // Exclude: api, _next/static, _next/image, images folder, and files with extensions
    matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico|.*\\..*).*)']
};
