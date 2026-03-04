-- Asegurar que case_id acepte CUID (TEXT). Si la columna es UUID, falla el insert con "invalid input syntax for type uuid".
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'service_orders' AND column_name = 'case_id'
  ) THEN
    ALTER TABLE public.service_orders
      ALTER COLUMN case_id TYPE TEXT USING (case_id::TEXT);
  END IF;
END $$;
