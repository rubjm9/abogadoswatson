"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth-helpers";
import { findClientByEmail, insertClient } from "@/lib/db/clients";
import { insertCase } from "@/lib/db/cases";

const BUCKET = "service-images";

export type ServiceRow = {
  id: string;
  slug: string;
  name: string;
  summary: string | null;
  description: string | null;
  image_url: string | null;
  price: number;
  stripe_price_id: string | null;
  active: boolean;
  created_at: string;
  updated_at: string;
};

export type ServiceOrderRow = {
  id: string;
  service_id: string;
  email: string | null;
  stripe_session_id: string | null;
  amount: number;
  amount_paid?: number;
  status: string;
  created_at: string;
  case_id: string | null;
};

/** Contratación para listado: orden + nombre del servicio */
export type ContratacionRow = ServiceOrderRow & { service_name: string };

export type ServiceInsert = {
  slug: string;
  name: string;
  summary?: string | null;
  description?: string | null;
  image_url?: string | null;
  price: number;
  stripe_price_id?: string | null;
  active?: boolean;
};

export type ServiceUpdate = Partial<Omit<ServiceInsert, "slug">> & { slug?: string };

/** Lista todos los servicios (admin). */
export async function getServices(): Promise<ServiceRow[]> {
  await requireAdmin();
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as ServiceRow[];
}

/** Obtiene un servicio por ID (admin). */
export async function getServiceById(id: string): Promise<ServiceRow | null> {
  await requireAdmin();
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase.from("services").select("*").eq("id", id).single();
  if (error) {
    if (error.code === "PGRST116") return null;
    throw new Error(error.message);
  }
  return data as ServiceRow;
}

/** Obtiene el servicio asociado a un expediente (vía service_orders). No requiere admin. */
export async function getServiceForCase(caseId: string): Promise<ServiceRow | null> {
  const supabase = createServerSupabaseClient();
  const { data: order, error } = await supabase
    .from("service_orders")
    .select("service_id")
    .eq("case_id", caseId)
    .limit(1)
    .maybeSingle();
  if (error || !order) return null;
  const { data: service, error: svcError } = await supabase
    .from("services")
    .select("*")
    .eq("id", order.service_id)
    .single();
  if (svcError || !service) return null;
  return service as ServiceRow;
}

/** Obtiene un servicio activo por slug (público, para la página de contratar). */
export async function getServiceBySlug(slug: string): Promise<ServiceRow | null> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("slug", slug)
    .eq("active", true)
    .single();
  if (error) {
    if (error.code === "PGRST116") return null;
    throw new Error(error.message);
  }
  return data as ServiceRow;
}

/** Sube un archivo al bucket y devuelve la URL pública. */
export async function uploadServiceImage(file: File): Promise<string> {
  await requireAdmin();
  const supabase = createServerSupabaseClient();
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${ext}`;
  const buf = await file.arrayBuffer();
  const { error } = await supabase.storage.from(BUCKET).upload(path, buf, {
    contentType: file.type,
    upsert: false,
  });
  if (error) throw new Error(error.message);
  const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return urlData.publicUrl;
}

/** Crea un servicio. imageUrl puede venir de uploadServiceImage o ser null. */
export async function createService(payload: ServiceInsert): Promise<ServiceRow> {
  await requireAdmin();
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("services")
    .insert({
      slug: payload.slug,
      name: payload.name,
      summary: payload.summary ?? null,
      description: payload.description ?? null,
      image_url: payload.image_url ?? null,
      price: payload.price,
      stripe_price_id: payload.stripe_price_id ?? null,
      active: payload.active ?? true,
    })
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data as ServiceRow;
}

/** Actualiza un servicio. */
export async function updateService(id: string, payload: ServiceUpdate): Promise<ServiceRow> {
  await requireAdmin();
  const supabase = createServerSupabaseClient();
  const update: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (payload.slug !== undefined) update.slug = payload.slug;
  if (payload.name !== undefined) update.name = payload.name;
  if (payload.summary !== undefined) update.summary = payload.summary;
  if (payload.description !== undefined) update.description = payload.description;
  if (payload.image_url !== undefined) update.image_url = payload.image_url;
  if (payload.price !== undefined) update.price = payload.price;
  if (payload.stripe_price_id !== undefined) update.stripe_price_id = payload.stripe_price_id;
  if (payload.active !== undefined) update.active = payload.active;

  const { data, error } = await supabase.from("services").update(update).eq("id", id).select().single();
  if (error) throw new Error(error.message);
  return data as ServiceRow;
}

/** Elimina un servicio. */
export async function deleteService(id: string): Promise<void> {
  await requireAdmin();
  const supabase = createServerSupabaseClient();
  const { error } = await supabase.from("services").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export type CreateServiceFormState = { error?: string; success?: boolean };
export type UpdateServiceFormState = { error?: string; success?: boolean };

/** Crea un servicio desde FormData (nombre, slug, descripción, imagen, precio, activo). */
export async function createServiceFromForm(
  _prev: CreateServiceFormState,
  formData: FormData
): Promise<CreateServiceFormState> {
  try {
    await requireAdmin();
    const name = (formData.get("name") as string)?.trim();
    const slug = (formData.get("slug") as string)?.trim().toLowerCase().replace(/\s+/g, "-");
    const summary = (formData.get("summary") as string)?.trim() || null;
    const description = (formData.get("description") as string)?.trim() || null;
    const price = Number(formData.get("price"));
    const active = formData.get("active") === "on" || formData.get("active") === "true";
    const imageFile = formData.get("image") as File | null;

    if (!name || !slug) return { error: "Nombre y slug son obligatorios." };
    if (Number.isNaN(price) || price < 0) return { error: "Precio debe ser un número válido." };

    let image_url: string | null = null;
    if (imageFile && imageFile.size > 0) {
      image_url = await uploadServiceImage(imageFile);
    }

    await createService({
      name,
      slug,
      summary,
      description,
      image_url,
      price,
      active,
    });
    return { success: true };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Error al crear el servicio." };
  }
}

/** Actualiza un servicio desde FormData. */
export async function updateServiceFromForm(
  serviceId: string,
  _prev: UpdateServiceFormState,
  formData: FormData
): Promise<UpdateServiceFormState> {
  try {
    await requireAdmin();
    const name = (formData.get("name") as string)?.trim();
    const slug = (formData.get("slug") as string)?.trim().toLowerCase().replace(/\s+/g, "-");
    const summary = (formData.get("summary") as string)?.trim() || null;
    const description = (formData.get("description") as string)?.trim() || null;
    const price = Number(formData.get("price"));
    const active = formData.get("active") === "on" || formData.get("active") === "true";
    const imageFile = formData.get("image") as File | null;

    if (!name || !slug) return { error: "Nombre y slug son obligatorios." };
    if (Number.isNaN(price) || price < 0) return { error: "Precio debe ser un número válido." };

    const current = await getServiceById(serviceId);
    if (!current) return { error: "Servicio no encontrado." };

    let image_url: string | null = current.image_url;
    if (imageFile && imageFile.size > 0) {
      image_url = await uploadServiceImage(imageFile);
    }

    await updateService(serviceId, {
      name,
      slug,
      summary,
      description,
      image_url,
      price,
      active,
    });
    return { success: true };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Error al actualizar el servicio." };
  }
}

/** Lista contrataciones (órdenes) con nombre del servicio (admin). */
export async function getContrataciones(): Promise<ContratacionRow[]> {
  await requireAdmin();
  const supabase = createServerSupabaseClient();
  const { data: orders, error: ordersError } = await supabase
    .from("service_orders")
    .select("*")
    .order("created_at", { ascending: false });
  if (ordersError) throw new Error(ordersError.message);
  const list = (orders ?? []) as ServiceOrderRow[];
  if (list.length === 0) return [];
  const serviceIds = [...new Set(list.map((o) => o.service_id))];
  const { data: services } = await supabase.from("services").select("id, name").in("id", serviceIds);
  const nameById = new Map((services ?? []).map((s: { id: string; name: string }) => [s.id, s.name]));
  return list.map((o) => ({
    ...o,
    service_name: nameById.get(o.service_id) ?? "—",
  }));
}

/** Crea una orden pendiente (usado desde la API de checkout). */
export async function createServiceOrder(params: {
  service_id: string;
  email: string | null;
  stripe_session_id: string | null;
  amount: number;
  case_id?: string | null;
}): Promise<ServiceOrderRow> {
  const supabase = createServerSupabaseClient();
  const row: Record<string, unknown> = {
    service_id: params.service_id,
    email: params.email,
    stripe_session_id: params.stripe_session_id ?? null,
    amount: params.amount,
    status: "PENDING",
  };
  if (params.case_id != null) row.case_id = params.case_id;
  const { data, error } = await supabase.from("service_orders").insert(row).select().single();
  if (error) throw new Error(error.message);
  return data as ServiceOrderRow;
}

/** Crea una contratación manual (admin): orden en Supabase con case_id. */
export async function createManualServiceOrder(params: {
  service_id: string;
  email: string | null;
  amount: number;
  amount_paid?: number;
  case_id: string;
}): Promise<ServiceOrderRow> {
  await requireAdmin();
  const supabase = createServerSupabaseClient();
  const amountPaid = params.amount_paid ?? 0;
  const { data, error } = await supabase
    .from("service_orders")
    .insert({
      service_id: params.service_id,
      email: params.email,
      stripe_session_id: null,
      amount: params.amount,
      amount_paid: amountPaid,
      status: "PAID",
      case_id: params.case_id,
    })
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data as ServiceOrderRow;
}

/** Obtiene una orden por stripe_session_id (para webhook). */
export async function getOrderBySessionId(stripeSessionId: string): Promise<ServiceOrderRow | null> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("service_orders")
    .select("*")
    .eq("stripe_session_id", stripeSessionId)
    .single();
  if (error || !data) return null;
  return data as ServiceOrderRow;
}

/** Marca una orden como pagada y crea expediente + cliente si aplica (webhook). */
export async function markOrderPaidBySessionId(stripeSessionId: string): Promise<void> {
  const supabase = createServerSupabaseClient();
  const order = await getOrderBySessionId(stripeSessionId);
  if (!order) {
    const { error } = await supabase
      .from("service_orders")
      .update({ status: "PAID" })
      .eq("stripe_session_id", stripeSessionId);
    if (error) throw new Error(error.message);
    return;
  }

  let caseId: string | null = null;
  const email = order.email?.trim().toLowerCase();
  if (email) {
    const { data: serviceRow } = await supabase
      .from("services")
      .select("name")
      .eq("id", order.service_id)
      .single();
    const serviceName = (serviceRow as { name?: string } | null)?.name ?? "Servicio";

    let client = await findClientByEmail(email);
    if (!client) {
      client = await insertClient({
        firstName: "Cliente",
        lastName: email.split("@")[0] || "Web",
        email,
      });
    }

    const newCase = await insertCase({
      title: `Contratación - ${serviceName} - ${client.firstName} ${client.lastName}`,
      status: "OPEN",
      clientId: client.id,
    });
    caseId = newCase.id;
  }

  const update: Record<string, unknown> = { status: "PAID" };
  if (caseId) update.case_id = caseId;
  const { error } = await supabase
    .from("service_orders")
    .update(update)
    .eq("stripe_session_id", stripeSessionId);
  if (error) throw new Error(error.message);
}
