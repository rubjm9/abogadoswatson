# Despliegue en Hostinger

## Imágenes que no cargan

Next.js sirve la carpeta `public/` en la raíz del sitio. Las rutas `/images/logo.png` corresponden a `public/images/logo.png`.

### Causa más frecuente

**La carpeta `public/images/` (y los archivos de imagen) no está en el repositorio.**  
Si en local tienes `public/images/` con logos, hero, etc., pero no los has hecho commit, en Hostinger (despliegue desde GitHub) esa carpeta no existirá y las peticiones a `/images/...` devolverán 404.

### Qué hacer

1. **Incluir las imágenes en el repo**
   - Asegúrate de que exista `public/images/` con todos los assets que usa la web:
     - `logo-horizontal.svg`
     - `logo-horizontal-white.svg`
     - `hero-main-human.png`
     - `nationality.png`
     - y cualquier otra referida desde el código.
   - Haz commit y push:
     ```bash
     git add public/images/
     git commit -m "Add public images for deployment"
     git push
     ```
   - Vuelve a desplegar en Hostinger para que tome los nuevos archivos.

2. **Comprobar que el despliegue incluye `public`**
   - En Hostinger, el directorio desde el que se ejecuta `npm run start` debe contener tanto `.next/` como `public/`.
   - Si el panel o script de deploy solo copia `.next` o ciertos archivos, añade también la carpeta `public/` (o al menos `public/images/`).

3. **Cuándo usar `NEXT_PUBLIC_STATIC_BASE`**
   - **En local y en Vercel:** no la definas. Next sirve `public/` en la raíz, así que las URLs son `/images/...`. Si la pones en `/public`, las peticiones irían a `/public/images/...` y Next no tiene esa ruta (404).
   - **En Hostinger:** solo ponla si el panel/servidor está configurado para servir archivos estáticos en la URL literal `/public` (ej. `https://tudominio.com/public/images/logo.png`). Si no, déjala sin definir igual que en local.

### Resumen

| Dónde              | Qué debe pasar |
|--------------------|----------------|
| Repo (GitHub)      | Carpeta `public/images/` con todos los .png (y demás assets) commiteada. |
| Servidor Hostinger | Tras `npm run build`, el mismo directorio debe tener `public/` y `.next/`. El comando `npm run start` (o `next start`) sirve ambos. |
