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

    // Redirigir www -> sin www (301)
    const host = nextUrl.hostname;
    if (host.startsWith('www.')) {
        const noWww = new URL(nextUrl);
        noWww.hostname = host.slice(4);
        return NextResponse.redirect(noWww, 301);
    }

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
    const localeForRedirect = isLocale(firstSegment) ? firstSegment : 'es';

    // Redirigir /dashboard y /dashboard/* a /admin y /admin/*
    if (pathname.includes('/dashboard')) {
        const newPath = pathname.replace(/\/dashboard/g, '/admin');
        return NextResponse.redirect(new URL(newPath, nextUrl.origin), 301);
    }

    // Redirigir /admin/cases a /admin/expedientes (legacy)
    if (pathname.includes('/admin/cases')) {
        const newPath = pathname.replace(/\/admin\/cases/g, '/admin/expedientes');
        return NextResponse.redirect(new URL(newPath, nextUrl.origin), 301);
    }

    // Panel único: /admin (requiere login)
    const isOnAdmin = pathname.includes('/admin');
    const isOnAdminServicios = pathname.includes('/admin/servicios');
    const isOnAdminContrataciones = pathname.includes('/admin/contrataciones');
    const isOnAdminUsuarios = pathname.includes('/admin/usuarios');
    const isOnAreaPersonal = pathname.includes('/area-personal');

    if (isOnAdmin && !isLoggedIn) {
        const loginUrl = new URL(`/${localeForRedirect}/login`, nextUrl);
        loginUrl.searchParams.set('callbackUrl', pathname);
        return NextResponse.redirect(loginUrl);
    }

    if (isOnAreaPersonal && !isLoggedIn) {
        const loginUrl = new URL(`/${localeForRedirect}/login`, nextUrl);
        loginUrl.searchParams.set('callbackUrl', pathname);
        return NextResponse.redirect(loginUrl);
    }

    // CLIENTE que intenta acceder a /admin -> redirigir a /area-personal
    if (isLoggedIn && req.auth?.user?.role === 'CLIENTE' && isOnAdmin) {
        return NextResponse.redirect(new URL(`/${localeForRedirect}/area-personal`, nextUrl));
    }

    // ADMIN o ABOGADO que intenta acceder a /area-personal -> redirigir a /admin
    if (isLoggedIn && (req.auth?.user?.role === 'ADMIN' || req.auth?.user?.role === 'ABOGADO') && isOnAreaPersonal) {
        return NextResponse.redirect(new URL(`/${localeForRedirect}/admin`, nextUrl));
    }

    // Solo ADMIN puede acceder a /admin/servicios, /admin/contrataciones y /admin/usuarios
    if (isLoggedIn && req.auth?.user?.role !== 'ADMIN' && (isOnAdminServicios || isOnAdminContrataciones || isOnAdminUsuarios)) {
        return NextResponse.redirect(new URL(`/${localeForRedirect}/unauthorized`, nextUrl));
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
