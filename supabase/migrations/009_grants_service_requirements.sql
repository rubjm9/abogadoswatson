-- Si la tabla existe pero PostgREST no la ve (PGRST205), asegurar permisos
-- y que los roles que usa la API puedan acceder.
GRANT SELECT, INSERT, UPDATE, DELETE ON public.service_requirements TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.service_requirements TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.service_requirements TO authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.case_form_data TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.case_form_data TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.case_form_data TO authenticated;
