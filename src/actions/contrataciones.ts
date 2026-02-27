"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-helpers";
import { getServiceById, createManualServiceOrder } from "@/actions/services";
import { revalidatePath } from "next/cache";

export type CreateContratacionManualInput = {
  service_id: string;
  amount: number;
  email: string;
  firstName: string;
  lastName: string;
};

export async function createContratacionManual(
  input: CreateContratacionManualInput
): Promise<{ success: true } | { success: false; error: string }> {
  try {
    await requireAdmin();

    const { service_id, amount, email, firstName, lastName } = input;
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail || !firstName?.trim() || !lastName?.trim()) {
      return { success: false, error: "Email, nombre y apellidos son obligatorios." };
    }
    if (amount <= 0 || Number.isNaN(amount)) {
      return { success: false, error: "El importe debe ser mayor que 0." };
    }

    const service = await getServiceById(service_id);
    if (!service) return { success: false, error: "Servicio no encontrado." };

    let client = await prisma.client.findUnique({
      where: { email: trimmedEmail },
    });
    if (!client) {
      client = await prisma.client.create({
        data: {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: trimmedEmail,
        },
      });
    }

    const caseTitle = `Contratación - ${service.name} - ${client.firstName} ${client.lastName}`;
    const newCase = await prisma.case.create({
      data: {
        title: caseTitle,
        status: "OPEN",
        clientId: client.id,
      },
    });

    await createManualServiceOrder({
      service_id,
      email: trimmedEmail,
      amount,
      case_id: newCase.id,
    });

    revalidatePath("/admin/contrataciones");
    revalidatePath("/admin/expedientes");
    return { success: true };
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : "Error al crear la contratación.",
    };
  }
}
