import createMiddleware from 'next-intl/middleware';
import { routing } from './navigation';
import { auth } from './auth';
import { NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

// 301 redirects: sitio antiguo -> nueva web
const LEGACY_REDIRECTS: Record<string, string> = {
    contacta: 'contacto',
    colabora: 'contacto',
    extranjeria: 'servicios',
    civil: 'servicios',
    inmobiliario: 'servicios/inmobiliario',
};

export default auth((req) => {
    const { nextUrl } = req;
    const pathname = nextUrl.pathname;
    const pathParts = pathname.split('/').filter(Boolean); // ['contacta'] or ['es', 'contacta']

    const isLocale = (s: string) => routing.locales.includes(s as (typeof routing.locales)[number]);
    const firstSegment = pathParts.length > 0 ? pathParts[0] : '';
    const hasLocaleInPath = isLocale(firstSegment);
    const localeFromPath = hasLocaleInPath ? firstSegment : 'es'; // legacy URLs sin locale -> español
    const oldPath = hasLocaleInPath ? pathParts.slice(1).join('/') : pathParts.join('/');

    const newPath = oldPath ? LEGACY_REDIRECTS[oldPath.split('/')[0]] : null;
    if (newPath) {
        const targetPath = `/${localeFromPath}/${newPath}`;
        const res = NextResponse.redirect(new URL(targetPath, nextUrl.origin), 301);
        return res;
    }

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
    const segments = nextUrl.pathname.split('/'); // ['', locale, 'servicios', 'service']
    const locale = segments[1] || 'es';

    if (segments[2] === 'servicios') {
        const service = segments[3];
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
