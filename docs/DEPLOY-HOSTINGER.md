# Despliegue en Hostinger

## Checklist: las imágenes no se ven

Si el build termina bien pero el logo y las imágenes no cargan en producción, revisa en este orden:

1. **Todo el tráfico va a Node**  
   El dominio (o subdominio) debe hacer **proxy inverso** a `http://127.0.0.1:PUERTO` donde corre `next start`. Si Apache/Nginx intenta servir `/images/` como archivos del disco, verás 404 o 500. Toda petición (HTML, `/_next/*`, `/images/*`) debe ser atendida por la app Next.js.

2. **La carpeta `public/` está en el deploy**  
   En el mismo directorio donde está `.next/` debe existir la carpeta `public/` con `public/images/` y dentro los archivos (p. ej. `aw-logo-horizontal-white.png`, `hero-main-human.png`). El comando `next start` se debe ejecutar desde ese directorio (el raíz del proyecto).

3. **Si la app corre en un subpath**  
   Si la URL de la app es algo como `https://tudominio.com/mi-app` (y no la raíz del dominio), define en el **entorno de build** la variable:
   - `NEXT_PUBLIC_BASE_PATH=/mi-app`  
   Vuelve a hacer build y deploy. Así las rutas de imágenes y assets quedarán bajo `/mi-app/images/...`.

4. **Comprobar en el navegador**  
   Abre DevTools → pestaña **Network**. Recarga la página y busca la petición al logo (p. ej. `aw-logo-horizontal-white.png`). Mira la **URL completa** que se pide y el **estado** (200, 404, 500). Eso indica si el fallo es de proxy, de ruta o de que falta `public/`.

## 404 en abogadoswatson.com/images/aw-logo-horizontal.png (proxy no envía a Node)

Si `public/` y `.next/` están en el mismo directorio (ej. `/nodejs/`) y aun así ves **404** en `https://abogadoswatson.com/images/aw-logo-horizontal.png`, la petición **no está llegando a la app Node**: Apache/Nginx está intentando servir `/images/` como archivos del disco y no encuentra nada.

**Solución:** Hacer que **todas** las peticiones del dominio (incluido `/images/*`, `/_next/*`, etc.) se reenvíen (proxy) al proceso Node donde corre `next start`.

### Si Hostinger usa Apache (.htaccess)

En la raíz del dominio (donde Apache sirve abogadoswatson.com), crea o edita `.htaccess` con algo como (sustituye `3000` por el puerto donde corre tu app Node):

```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ http://127.0.0.1:3000/$1 [P,L]
```

Eso reenvía al Node todo lo que no sea un archivo o carpeta existente en disco. Si quieres que **todo** pase por Node (recomendado para que `/images/` lo sirva Next.js), usa:

```apache
RewriteEngine On
RewriteRule ^(.*)$ http://127.0.0.1:3000/$1 [P,L]
```

Necesitas que Apache tenga activos `mod_rewrite`, `mod_proxy` y `mod_proxy_http`. En el panel de Hostinger (Node.js / aplicación) suele haber una opción tipo “Proxy” o “Redirigir al puerto”; asegúrate de que esté activada y que el puerto coincida con el de `next start`.

### Si el panel de Hostinger tiene “Application URL” o “Proxy”

Configura el proxy para que el **dominio completo** (o “/”) apunte a `http://127.0.0.1:PUERTO`. No dejes que solo la ruta “/” vaya a Node y el resto lo sirva Apache: así `/images/` nunca llegaría a Next y seguirías con 404.

### Comprobar

Tras guardar la configuración, reinicia si hace falta y recarga `https://abogadoswatson.com/images/aw-logo-horizontal.png`. Debe devolver la imagen (200). Si sigue 404, la petición sigue yendo a Apache y no al proceso Node.

## "Could not find a production build in the '.next' directory"

Si el **build** termina bien pero al **arrancar** aparece ese error, suele ser que en Hostinger la fase de build y la de start no comparten el mismo directorio (o `.next` no se conserva entre una y otra).

**Solución:** Usar un único comando que haga build y luego start en el mismo proceso:

- **Comando de inicio en Hostinger:** `npm run start:hostinger`

Ese script ejecuta `next build` y después `node scripts/start-with-logs.js` en el mismo directorio, así que `.next` existirá cuando arranque el servidor. Desventaja: cada reinicio de la app hará un build completo (~10–20 s). Si en el panel puedes configurar que el build se ejecute antes del start y en el mismo entorno, entonces usa `npm run start` y deja el build como paso aparte.

## Errores 500 en CSS/JS y 404 en imágenes

Si ves **500 (Internal Server Error)** en archivos como `*.css`, `*.js` o `/images/logo-horizontal.png`, y **404** en `/images/hero-main-human.png`, casi siempre significa que **las peticiones no las está sirviendo la app Node (Next.js)**.

En Hostinger, el dominio suele estar delante de Apache o Nginx. Si el servidor web no envía el tráfico a `next start`, intenta servir las URLs como archivos y falla (500) o no encuentra la ruta (404).

### Qué hacer

1. **Proxy inverso a Node**
   - La app debe ejecutarse con `npm run build` y luego `npm run start` (o `next start`) en un puerto (ej. 3000).
   - **Todas** las peticiones del sitio (HTML, `/_next/static/*`, `/images/*`, rutas de la app) deben ir al proceso Node, no a carpetas estáticas de Apache/Nginx.
   - En el panel de Hostinger (o en tu configuración de Nginx/Apache), configura el **proxy** para que el dominio (o subdominio) apunte a `http://127.0.0.1:3000` (o el puerto que uses). No sirvas solo archivos estáticos desde disco.

2. **Mismo directorio para `.next` y `public`**
   - El directorio desde el que ejecutas `next start` debe contener:
     - `.next/` (salida de `npm run build`)
     - `public/` (con `public/images/`, etc.)
   - Si el deploy solo sube `.next` y no `public/`, las rutas `/images/*` fallarán (404).

3. **Imágenes en el repo**
   - Asegúrate de que `public/images/` esté en el repositorio y se suba en el deploy. Incluye al menos:
     - `aw-logo-horizontal.png`
     - `aw-logo-horizontal-white.png`
     - `hero-main-human.png`
     - `nationality.png`
     - y cualquier otra imagen que use la web.

4. **Variables de entorno (solo si aplica)**
   - **`NEXT_PUBLIC_BASE_PATH`**: si la app se sirve en un subpath (ej. `https://dominio.com/mi-app`), pon `NEXT_PUBLIC_BASE_PATH=/mi-app` en el entorno de **build** y vuelve a construir. En local y cuando la app está en la raíz del dominio, no la definas.
   - **`NEXT_PUBLIC_STATIC_BASE`**: en local y Vercel no la definas. En Hostinger solo ponla (ej. `/public`) si los estáticos se sirven en otra URL; si todo va por proxy a Node, déjala sin definir.

### Resumen

| Síntoma | Causa habitual | Solución |
|--------|-----------------|----------|
| 500 en `.css`, `.js`, `/images/...` | El servidor web (Apache/Nginx) intenta servir esas rutas en vez de Node | Configurar proxy inverso hacia `next start` (puerto 3000) |
| 404 en `/images/hero-main-human.png` | Falta `public/` en el deploy o no está en el mismo directorio que `.next` | Incluir carpeta `public/` en el deploy y ejecutar `next start` desde ese directorio |
| Imágenes 404 y la app está en un subpath (ej. `/mi-app`) | Las rutas se piden en la raíz (`/images/...`) en vez de bajo el subpath | Definir `NEXT_PUBLIC_BASE_PATH=/mi-app` en build y volver a desplegar |
| ChunkLoadError en consola | Consecuencia de que los chunks JS devuelvan 500 | Misma solución: que todo el tráfico pase por la app Node |
