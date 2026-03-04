-- case_id debe ser TEXT para referenciar "Case"(id) que usa cuid (string).
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'service_orders'
    AND column_name = 'case_id' AND data_type != 'text'
  ) THEN
    ALTER TABLE public.service_orders
      ALTER COLUMN case_id TYPE TEXT USING case_id::text;
  END IF;
END $$;
