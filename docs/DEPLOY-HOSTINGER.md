# Despliegue en Hostinger

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

4. **Variable `NEXT_PUBLIC_STATIC_BASE`**
   - **En local y Vercel:** no la definas (Next sirve `public/` en la raíz: `/images/...`).
   - **En Hostinger:** solo ponla (ej. `/public`) si el servidor está configurado para servir estáticos en esa URL. Si todo va por proxy a Node, déjala sin definir.

### Resumen

| Síntoma | Causa habitual | Solución |
|--------|-----------------|----------|
| 500 en `.css`, `.js`, `/images/...` | El servidor web (Apache/Nginx) intenta servir esas rutas en vez de Node | Configurar proxy inverso hacia `next start` (puerto 3000) |
| 404 en `/images/hero-main-human.png` | Falta `public/` en el deploy o no está en el mismo directorio que `.next` | Incluir carpeta `public/` en el deploy y ejecutar `next start` desde ese directorio |
| ChunkLoadError en consola | Consecuencia de que los chunks JS devuelvan 500 | Misma solución: que todo el tráfico pase por la app Node |
