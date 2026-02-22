-- Añade el campo resumen (descripción corta) para mostrar bajo el título en la página de contratar.
-- Requisito: la tabla public.services debe existir (ejecutar antes 001_services_and_orders.sql).
ALTER TABLE public.services
  ADD COLUMN IF NOT EXISTS summary TEXT;
