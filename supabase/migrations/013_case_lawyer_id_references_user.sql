-- lawyerId en Case pasa a referenciar User.id (usuarios con rol ABOGADO), no Lawyer.
-- Eliminar la FK a Lawyer para poder guardar IDs de User.
ALTER TABLE "Case" DROP CONSTRAINT IF EXISTS "Case_lawyerId_fkey";
