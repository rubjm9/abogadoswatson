-- Vincula contrataciones (service_orders) con expedientes (Case en Prisma).
-- Si Prisma usa la misma BD, la tabla es "Case". Si no, case_id es solo UUID sin FK.
ALTER TABLE public.service_orders
  ADD COLUMN IF NOT EXISTS case_id UUID;
