/**
 * Script one-off: crea usuario ruben@abogadoswatson.com con contraseña majidibros y rol ADMIN.
 * Ejecutar: npx tsx scripts/create-admin-user.ts
 * Asegúrate de que la base de datos esté en marcha (ej. npm run dev o tu servicio Postgres).
 */
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = 'ruben@abogadoswatson.com';
  const password = 'majidibros';
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      password: hashedPassword,
      role: 'ADMIN',
    },
    create: {
      email,
      password: hashedPassword,
      role: 'ADMIN',
      name: 'Ruben',
    },
  });

  console.log('Usuario creado/actualizado:', user.email, 'rol:', user.role);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
