"use server";

import { findClientByEmail, findClientById, insertClient, updateClient } from "@/lib/db/clients";
import { insertCase } from "@/lib/db/cases";
import { requireAdmin } from "@/lib/auth-helpers";
import { getServiceById, createManualServiceOrder } from "@/actions/services";
import { revalidatePath } from "next/cache";

export type CreateContratacionManualInput = {
  service_id: string;
  amount: number;
  /** Si se indica, se usa el cliente existente y opcionalmente se actualizan sus datos. */
  client_id?: string | null;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string | null;
  address?: string | null;
};

export async function createContratacionManual(
  input: CreateContratacionManualInput
): Promise<{ success: true } | { success: false; error: string }> {
  try {
    await requireAdmin();

    const { service_id, amount, client_id, email, firstName, lastName, phone, address } = input;
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail || !firstName?.trim() || !lastName?.trim()) {
      return { success: false, error: "Email, nombre y apellidos son obligatorios." };
    }
    if (amount <= 0 || Number.isNaN(amount)) {
      return { success: false, error: "El importe debe ser mayor que 0." };
    }

    const service = await getServiceById(service_id);
    if (!service) return { success: false, error: "Servicio no encontrado." };

    let client;
    if (client_id) {
      client = await findClientById(client_id);
      if (!client) return { success: false, error: "Cliente seleccionado no encontrado." };
      const needsUpdate =
        client.firstName !== firstName.trim() ||
        client.lastName !== lastName.trim() ||
        client.email !== trimmedEmail ||
        (phone !== undefined && client.phone !== (phone?.trim() || null)) ||
        (address !== undefined && client.address !== (address?.trim() || null));
      if (needsUpdate) {
        client = await updateClient(client_id, {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: trimmedEmail,
          phone: phone?.trim() || null,
          address: address?.trim() || null,
        });
      }
    } else {
      client = await findClientByEmail(trimmedEmail);
      if (!client) {
        client = await insertClient({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: trimmedEmail,
          phone: phone?.trim() || null,
          address: address?.trim() || null,
        });
      } else {
        const needsUpdate =
          client.firstName !== firstName.trim() ||
          client.lastName !== lastName.trim() ||
          (phone !== undefined && client.phone !== (phone?.trim() || null)) ||
          (address !== undefined && client.address !== (address?.trim() || null));
        if (needsUpdate) {
          client = await updateClient(client.id, {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            phone: phone?.trim() || null,
            address: address?.trim() || null,
          });
        }
      }
    }

    const caseTitle = `Contratación - ${service.name} - ${client.firstName} ${client.lastName}`;
    const newCase = await insertCase({
      title: caseTitle,
      status: "OPEN",
      clientId: client.id,
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
