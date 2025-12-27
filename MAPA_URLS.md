# Mapa Visual de URLs - Abogados Watson

Este documento enumera todas las URLs existentes en la aplicación web, indicando el tipo de contenido y si está traducida al inglés.

## Tabla de URLs

| URL | Tipo de Contenido | Traducida al Inglés | Notas |
|-----|-------------------|---------------------|-------|
| `/` | Página principal (Home) | ✅ Sí | Usa componentes con traducciones |
| `/es` | Página principal (Español) | ✅ Sí | Locale español |
| `/en` | Página principal (Inglés) | ✅ Sí | Locale inglés |
| `/es/sobre-nosotros` | Página "Sobre Nosotros" | ✅ Sí | Usa `useTranslations("AboutPage")` |
| `/en/sobre-nosotros` | Página "About Us" | ✅ Sí | Traducción completa disponible |
| `/es/contacto` | Página de contacto | ✅ Sí | Usa `useTranslations("ContactPage")` |
| `/en/contacto` | Página "Contact" | ✅ Sí | Traducción completa disponible |
| `/es/servicios` | Listado de servicios | ⚠️ Parcial | Solo navegación traducida, contenido hardcodeado en español |
| `/en/servicios` | Listado de servicios | ❌ No | Contenido en español |
| `/es/servicios/nacionalidad` | Servicio: Nacionalidad | ❌ No | Contenido hardcodeado en español |
| `/en/servicios/nacionalidad` | Servicio: Nacionalidad | ❌ No | Contenido en español |
| `/es/servicios/estudiantes` | Servicio: Estudiantes | ❌ No | Contenido hardcodeado en español |
| `/en/servicios/estudiantes` | Servicio: Estudiantes | ❌ No | Contenido en español |
| `/es/servicios/nomadas` | Servicio: Nómadas Digitales | ❌ No | Contenido hardcodeado en español |
| `/en/servicios/nomadas` | Servicio: Nómadas Digitales | ❌ No | Contenido en español |
| `/es/servicios/trabajar` | Servicio: Trabajar | ❌ No | Contenido hardcodeado en español |
| `/en/servicios/trabajar` | Servicio: Trabajar | ❌ No | Contenido en español |
| `/es/servicios/vivir` | Servicio: Vivir | ❌ No | Contenido hardcodeado en español |
| `/en/servicios/vivir` | Servicio: Vivir | ❌ No | Contenido en español |
| `/es/servicios/inversiones` | Servicio: Inversiones | ❌ No | Contenido hardcodeado en español |
| `/en/servicios/inversiones` | Servicio: Inversiones | ❌ No | Contenido en español |
| `/es/servicios/negocios` | Servicio: Negocios | ❌ No | Contenido hardcodeado en español |
| `/en/servicios/negocios` | Servicio: Negocios | ❌ No | Contenido en español |
| `/es/servicios/corporativo` | Servicio: Corporativo | ❌ No | Contenido hardcodeado en español |
| `/en/servicios/corporativo` | Servicio: Corporativo | ❌ No | Contenido en español |
| `/es/servicios/familia` | Servicio: Familia | ❌ No | Contenido hardcodeado en español |
| `/en/servicios/familia` | Servicio: Familia | ❌ No | Contenido en español |
| `/es/servicios/defensa-juridica` | Servicio: Defensa Jurídica | ❌ No | Contenido hardcodeado en español |
| `/en/servicios/defensa-juridica` | Servicio: Defensa Jurídica | ❌ No | Contenido en español |
| `/es/aviso-legal` | Aviso Legal | ❌ No | Contenido hardcodeado en español |
| `/en/aviso-legal` | Aviso Legal | ❌ No | Contenido en español |
| `/es/privacidad` | Política de Privacidad | ❌ No | Contenido hardcodeado en español |
| `/en/privacidad` | Política de Privacidad | ❌ No | Contenido en español |
| `/es/cookies` | Política de Cookies | ❌ No | Contenido hardcodeado en español |
| `/en/cookies` | Política de Cookies | ❌ No | Contenido en español |
| `/es/login` | Página de Login | ✅ Sí | Usa `useTranslations("ErrorPages.login")` |
| `/en/login` | Página de Login | ✅ Sí | Traducción completa disponible |
| `/es/dashboard` | Panel de control | ❌ No | Contenido hardcodeado en español |
| `/en/dashboard` | Panel de control | ❌ No | Contenido en español |
| `/es/dashboard/cases` | Listado de casos | ❌ No | Contenido hardcodeado en español |
| `/en/dashboard/cases` | Listado de casos | ❌ No | Contenido en español |
| `/es/dashboard/cases/new` | Crear nuevo caso | ❌ No | Contenido hardcodeado en español |
| `/en/dashboard/cases/new` | Crear nuevo caso | ❌ No | Contenido en español |
| `/es/dashboard/profile` | Perfil de usuario | ❌ No | Contenido hardcodeado en español |
| `/en/dashboard/profile` | Perfil de usuario | ❌ No | Contenido en español |
| `/es/unauthorized` | Página no autorizada | ✅ Sí | Usa `useTranslations("ErrorPages.unauthorized")` |
| `/en/unauthorized` | Página no autorizada | ✅ Sí | Traducción completa disponible |
| `/es/test-404` | Página de prueba 404 | ❌ No | Página de prueba, contenido en español |
| `/en/test-404` | Página de prueba 404 | ❌ No | Página de prueba |
| `/api/auth/[...nextauth]` | API: Autenticación | N/A | Endpoint API, no requiere traducción |
| `/api/auth/signin` | API: Inicio de sesión | N/A | Endpoint API |
| `/api/auth/signout` | API: Cierre de sesión | N/A | Endpoint API |
| `/api/auth/callback` | API: Callback de autenticación | N/A | Endpoint API |
| `/api/auth/session` | API: Sesión actual | N/A | Endpoint API |
| `/api/auth/csrf` | API: Token CSRF | N/A | Endpoint API |

## Resumen por Categoría

### Páginas Públicas Traducidas ✅
- Página principal (`/`)
- Sobre Nosotros (`/sobre-nosotros`)
- Contacto (`/contacto`)
- Login (`/login`)
- Página no autorizada (`/unauthorized`)

### Páginas Públicas NO Traducidas ❌
- Listado de servicios (`/servicios`)
- Todas las páginas de servicios individuales:
  - Nacionalidad
  - Estudiantes
  - Nómadas Digitales
  - Trabajar
  - Vivir
  - Inversiones
  - Negocios
  - Corporativo
  - Familia
  - Defensa Jurídica
- Páginas legales:
  - Aviso Legal
  - Política de Privacidad
  - Política de Cookies

### Páginas del Dashboard (NO Traducidas) ❌
- Panel principal (`/dashboard`)
- Listado de casos (`/dashboard/cases`)
- Crear caso (`/dashboard/cases/new`)
- Perfil (`/dashboard/profile`)

### Endpoints API
- Rutas de autenticación bajo `/api/auth/[...nextauth]`

## Estado de Traducción

- **Total de URLs públicas**: 30+
- **URLs traducidas al inglés**: 5 (16.7%)
- **URLs sin traducir**: 25+ (83.3%)

## Recomendaciones

1. **Prioridad Alta**: Traducir todas las páginas de servicios individuales, ya que son contenido principal del sitio.
2. **Prioridad Media**: Traducir las páginas legales (Aviso Legal, Privacidad, Cookies) para cumplir con normativas internacionales.
3. **Prioridad Baja**: Traducir el dashboard, ya que es una herramienta interna.

## Notas Técnicas

- La aplicación usa `next-intl` para la internacionalización.
- Los locales configurados son: `es` (español) y `en` (inglés).
- El locale por defecto es `en`.
- Las páginas traducidas usan `useTranslations()` de `next-intl`.
- Las páginas no traducidas tienen contenido hardcodeado en español.

