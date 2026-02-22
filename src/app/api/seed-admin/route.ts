import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

/**
 * One-off: crea o actualiza el usuario admin.
 * Solo funciona si SEED_ADMIN_SECRET está definido y coincide con el header x-seed-secret.
 * Ejemplo: curl -X POST http://localhost:3000/api/seed-admin -H "x-seed-secret: TU_SECRET"
 */
export async function POST(request: NextRequest) {
  const secret = process.env.SEED_ADMIN_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "SEED_ADMIN_SECRET no configurado" },
      { status: 501 }
    );
  }

  const provided = request.headers.get("x-seed-secret");
  if (provided !== secret) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const email = "ruben@abogadoswatson.com";
  const password = "majidibros";
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.upsert({
      where: { email },
      update: {
        password: hashedPassword,
        role: "ADMIN",
      },
      create: {
        email,
        password: hashedPassword,
        role: "ADMIN",
        name: "Ruben",
      },
    });
    return NextResponse.json({
      ok: true,
      message: "Usuario creado/actualizado",
      email: user.email,
      role: user.role,
    });
  } catch (e) {
    console.error("seed-admin error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Error al crear usuario" },
      { status: 500 }
    );
  }
}
