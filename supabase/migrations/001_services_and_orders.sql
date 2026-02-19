-- Tablas para la sección de contratación de servicios.
-- Ejecutar en el SQL Editor del proyecto Supabase o con Supabase CLI.

-- Tabla de servicios contratables
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  price NUMERIC(10, 2) NOT NULL,
  stripe_price_id TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tabla de órdenes (vinculadas a Stripe)
CREATE TABLE IF NOT EXISTS public.service_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id UUID NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
  email TEXT,
  stripe_session_id TEXT,
  amount NUMERIC(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'PAID', 'CANCELLED')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_service_orders_service_id ON public.service_orders(service_id);
CREATE INDEX IF NOT EXISTS idx_service_orders_stripe_session_id ON public.service_orders(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_services_slug_active ON public.services(slug) WHERE active = true;

-- Trigger para actualizar updated_at en services
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS services_updated_at ON public.services;
CREATE TRIGGER services_updated_at
  BEFORE UPDATE ON public.services
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- RLS: permitir lectura pública de services activos (para la página de contratar)
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Servicios activos son legibles por todos"
  ON public.services FOR SELECT
  USING (active = true);
-- INSERT/UPDATE/DELETE solo vía service role (backend), que bypasea RLS.

-- RLS: service_orders solo accesibles con service role (backend)
ALTER TABLE public.service_orders ENABLE ROW LEVEL SECURITY;
-- Sin políticas; el backend usa service role y bypasea RLS.
