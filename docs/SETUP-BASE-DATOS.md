# Configuración de la base de datos (Prisma)

El **registro e inicio de sesión** usan **Prisma** y la tabla `User` en PostgreSQL. Supabase en este proyecto solo se usa para servicios contratables (tablas `services` y `service_orders`).

## Pasos para que el registro funcione

### 1. Variable `DATABASE_URL` en `.env`

Debe apuntar a una base de datos **PostgreSQL** válida:

- **PostgreSQL local o en la nube:**  
  `DATABASE_URL="postgresql://USUARIO:PASSWORD@HOST:PUERTO/NOMBRE_DB?schema=public"`

- **Supabase:** La conexión directa (puerto 5432) a veces falla con P1001. Usa el **connection pooler** en puerto **6543** (Session mode):
  1. En Supabase: **Settings** → **Database** → **Connection string**.
  2. Elige **URI** y la opción que use **port 6543** (Session pooler), no 5432.
  3. La URL será similar a:  
     `postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres`  
  4. Añade al final: `?pgbouncer=true` (recomendado por Supabase para pooler).

- Si usas **Prisma Postgres** o un proxy (`prisma+postgres://...`), asegúrate de que el entorno donde corre la app (Next.js) pueda resolver esa URL (red, variables, etc.).

### 2. Crear las tablas en la base de datos

**Opción A – Terminal (recomendado si funciona)**  
En la raíz del proyecto:

```bash
npx prisma db push
```

Si usas **Supabase con pooler (puerto 6543)** y el comando se queda colgado sin crear tablas:

1. Para la ejecución con **Ctrl+C**.
2. **Opción B – SQL manual:** Entra en **Supabase** → **SQL Editor** → **New query**, copia todo el contenido del archivo **`prisma/schema-base.sql`** del proyecto y ejecútalo. Así se crean todas las tablas (User, Case, Client, etc.) sin usar el pooler.

O, si usas migraciones:

```bash
npx prisma migrate deploy
```

Así se crean (entre otras) la tabla `User` que usa el registro.

### 3. Comprobar la conexión

En la misma terminal:

```bash
npx prisma db pull
```

Si no da error, la conexión y el schema están bien.

### 4. Ver el error real al registrar

En **desarrollo** (`npm run dev`), si el registro falla, la página mostrará el mensaje de error real (por ejemplo, de conexión o de constraint). Revisa también la **consola del servidor** (terminal donde corre `next dev`), donde se hace `console.error('Register error:', err)`.

### 5. Migraciones de Supabase (servicios contratables)

Las tablas de servicios (`services`, `service_orders`) **no se crean con Prisma**; hay que ejecutarlas en **Supabase** → **SQL Editor** en este orden:

1. **Primero:** copia y ejecuta todo el contenido de `supabase/migrations/001_services_and_orders.sql`. Así se crean las tablas `services` y `service_orders`.
2. **Después:** copia y ejecuta `supabase/migrations/002_add_services_summary.sql` para añadir la columna `summary` a `services`.

Si ejecutas 002 sin haber ejecutado 001, obtendrás el error `relation "public.services" does not exist`.

---

**Resumen:**  
- Usuarios = **Prisma** + PostgreSQL (`DATABASE_URL`).  
- Servicios contratables = **Supabase** (otras variables en `.env`).  
- Para registrar usuarios: `DATABASE_URL` correcta + `npx prisma db push` (o migraciones) ejecutado al menos una vez.  
- Para servicios: ejecutar las migraciones en `supabase/migrations/` en el proyecto Supabase cuando corresponda.
