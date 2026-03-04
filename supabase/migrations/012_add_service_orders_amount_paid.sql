-- Cantidad abonada (pagos parciales) en contrataciones
ALTER TABLE public.service_orders
ADD COLUMN IF NOT EXISTS amount_paid NUMERIC(10, 2) NOT NULL DEFAULT 0;

COMMENT ON COLUMN public.service_orders.amount_paid IS 'Importe ya abonado por el cliente (puede ser parcial)';
