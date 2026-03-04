-- Requisitos por servicio (documentos y formularios que el cliente debe aportar)
CREATE TABLE IF NOT EXISTS public.service_requirements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id UUID NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('document', 'form')),
  label TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  form_schema JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_service_requirements_service_id ON public.service_requirements(service_id);

-- Respuestas de formularios por expediente
CREATE TABLE IF NOT EXISTS public.case_form_data (
  id TEXT PRIMARY KEY,
  case_id TEXT NOT NULL REFERENCES "Case"(id) ON DELETE CASCADE,
  slot_label TEXT NOT NULL,
  form_data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_case_form_data_case_id ON public.case_form_data(case_id);

-- slot_label en Document (para vincular documento con requisito)
ALTER TABLE "Document" ADD COLUMN IF NOT EXISTS slot_label TEXT;
