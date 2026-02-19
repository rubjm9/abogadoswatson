# Supabase – Contratación de servicios

## Tablas

Ejecuta el SQL en **Supabase Dashboard → SQL Editor** (o con `supabase db push` si usas CLI):

- `migrations/001_services_and_orders.sql` – crea `services` y `service_orders`.

## Storage: bucket para fotos

1. En **Supabase Dashboard → Storage** crea un bucket llamado `service-images`.
2. Configuración recomendada:
   - **Public**: sí (para que las URLs de las imágenes se vean en la página pública).
   - Políticas: escritura solo desde el backend (service role). La lectura pública se obtiene al marcar el bucket como público.

Si el bucket es público, las URLs devueltas por `getPublicUrl()` serán accesibles sin auth.
