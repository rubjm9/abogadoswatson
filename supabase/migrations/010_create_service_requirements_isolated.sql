-- Crea service_requirements de forma aislada para evitar rollback
-- por dependencias no resueltas (ej. si "Case" no existía al correr 007)

CREATE TABLE IF NOT EXISTS public.service_requirements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id UUID NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('document', 'form')),
  label TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  form_schema JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_service_requirements_service_id
  ON public.service_requirements(service_id);

-- Permisos para que PostgREST (y la API) puedan acceder
GRANT SELECT, INSERT, UPDATE, DELETE ON public.service_requirements TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.service_requirements TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.service_requirements TO anon;

-- Recargar caché de PostgREST
NOTIFY pgrst, 'reload schema';
