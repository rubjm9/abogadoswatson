# Solución de problemas con Supabase

## Configurar .env con el proyecto correcto

La URL y las dos claves deben ser **del mismo proyecto** (el que ves en la URL del Dashboard).

**Paso 1 – Abrir la API del proyecto**

1. Entra en [Supabase Dashboard](https://supabase.com/dashboard).
2. Abre el proyecto donde ejecutas las migraciones (la URL del navegador tendrá algo como `.../project/XXXXXXXX`).
3. En el menú izquierdo: **Project Settings** (icono de engranaje).
4. En el menú interno: **API**.

**Paso 2 – Copiar las claves**

En la sección **Project API keys** verás varias claves. Necesitas dos:

| En el Dashboard suele decir | Variable en tu .env | Dónde usarla |
|-----------------------------|---------------------|--------------|
| **anon** / **public** / "Publishable" | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Cliente (navegador). Puede ser pública. |
| **service_role** / "secret" | `SUPABASE_SERVICE_ROLE_KEY` | Solo servidor. No exponer. |

- **anon/public:** haz clic en "Reveal" si está oculta, copia el valor (empieza por `eyJ...`) y pégalo en `.env` en `NEXT_PUBLIC_SUPABASE_ANON_KEY=...`.
- **service_role:** igual, copia y pégalo en `SUPABASE_SERVICE_ROLE_KEY=...`.

**Paso 3 – Comprobar la URL**

En la misma página **API** verás **Project URL**. Debe coincidir con `NEXT_PUBLIC_SUPABASE_URL` en tu `.env` (por ejemplo `https://oejzzudbrhjnqeefsqmb.supabase.co`). Si no coincide, cambia la URL en `.env` por la del Dashboard.

**Resumen:** Las tres variables deben ser del **mismo** proyecto: misma URL, anon key de ese proyecto, service_role key de ese proyecto.

---

## Error: "invalid input syntax for type uuid" al crear contratación manual

La columna `service_orders.case_id` debe ser TEXT (para CUID). Ejecuta la migración **011** (`011_ensure_service_orders_case_id_text.sql`) en el SQL Editor.

---

## Error: "Could not find the table 'public.Client' in the schema cache"

**Causa:** La tabla no existe o la caché de PostgREST está desactualizada.

**Solución:**

1. **Ejecutar la migración 005** en el SQL Editor de Supabase:
   - Abre `supabase/migrations/005_prisma_tables_to_supabase.sql`
   - Copia todo el contenido y ejecútalo en Supabase > SQL Editor

2. **Refrescar la caché del esquema** (si la tabla existe pero sigue el error):
   - En Supabase > SQL Editor, ejecuta:
   ```sql
   NOTIFY pgrst, 'reload schema';
   ```
   - PostgREST mantiene una caché del esquema; al crear tablas con SQL manual hay que notificarle para que recargue. Deberías ver "Success. No rows returned".

## Error: "relation 'public.services' does not exist"

Ejecuta las migraciones **en orden**: 001 → 002 → 003 → 005 → 006 → 007.

## Error: "Could not find the table 'public.service_requirements' in the schema cache" (PGRST205)

1. **Comprobar que la tabla existe**  
   En Supabase > SQL Editor ejecuta:
   ```sql
   SELECT table_name FROM information_schema.tables
   WHERE table_schema = 'public' AND table_name = 'service_requirements';
   ```
   - Si **no devuelve ninguna fila**: ejecuta la migración **007** (crea la tabla).
   - Si **sí devuelve una fila**: la tabla existe; el problema es la caché de PostgREST.

2. **Refrescar la caché**  
   En el SQL Editor:
   ```sql
   NOTIFY pgrst, 'reload schema';
   ```
   Si el error sigue apareciendo, pasa al paso 3.

3. **Dar permisos y reintentar**  
   Ejecuta la migración **009** (`009_grants_service_requirements.sql`) en el SQL Editor.  
   Vuelve a ejecutar `NOTIFY pgrst, 'reload schema';` y recarga la app.

4. **Si sigue fallando: reiniciar el proyecto**  
   En Supabase Dashboard: **Project Settings** > **General** > **Restart project**.  
   Así PostgREST arranca de nuevo y recarga el esquema desde cero.

## Requisitos: "Cargando requisitos..." infinito

Sigue los pasos de la sección anterior (tabla `service_requirements` en la caché).
