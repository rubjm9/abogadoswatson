"use server";

import { requireAdmin } from "@/lib/auth-helpers";
import {
  findUsers,
  findUserById,
  createUser,
  updateUser,
  updateUserPassword,
  deleteUser,
} from "@/lib/db/users";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function getUsers() {
  try {
    await requireAdmin();
    const users = await findUsers();
    return { success: true as const, data: users };
  } catch (e) {
    return { success: false as const, error: (e as Error).message, data: [] };
  }
}

export async function getUserById(id: string) {
  try {
    await requireAdmin();
    const user = await findUserById(id);
    if (!user) return { success: false as const, error: "Usuario no encontrado" };
    return { success: true as const, data: user };
  } catch (e) {
    return { success: false as const, error: (e as Error).message };
  }
}

export async function createUserAction(data: {
  email: string;
  password: string;
  name?: string | null;
  role?: string;
}) {
  try {
    await requireAdmin();
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await createUser({
      ...data,
      password: hashedPassword,
      role: data.role ?? "CLIENTE",
    });
    revalidatePath("/admin/usuarios");
    return { success: true as const, data: user };
  } catch (e) {
    return { success: false as const, error: (e as Error).message };
  }
}

export async function updateUserAction(
  id: string,
  data: Partial<{ name: string | null; email: string; role: string }>
) {
  try {
    await requireAdmin();
    await updateUser(id, data);
    revalidatePath("/admin/usuarios");
    revalidatePath(`/admin/usuarios/${id}`);
    return { success: true as const };
  } catch (e) {
    return { success: false as const, error: (e as Error).message };
  }
}

export async function updateUserPasswordAction(id: string, newPassword: string) {
  try {
    await requireAdmin();
    if (newPassword.length < 6) {
      return { success: false as const, error: "La contraseña debe tener al menos 6 caracteres" };
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await updateUserPassword(id, hashedPassword);
    revalidatePath("/admin/usuarios");
    revalidatePath(`/admin/usuarios/${id}`);
    return { success: true as const };
  } catch (e) {
    return { success: false as const, error: (e as Error).message };
  }
}

export async function deleteUserAction(id: string) {
  try {
    await requireAdmin();
    await deleteUser(id);
    revalidatePath("/admin/usuarios");
    return { success: true as const };
  } catch (e) {
    return { success: false as const, error: (e as Error).message };
  }
}
