import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getServiceBySlug } from "@/actions/services";
import { createServiceOrder } from "@/actions/services";

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  return new Stripe(key);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const slug = body.slug as string | undefined;
    const locale = (body.locale as string) || "es";

    if (!slug?.trim()) {
      return NextResponse.json(
        { error: "Falta el slug del servicio." },
        { status: 400 }
      );
    }

    const service = await getServiceBySlug(slug.trim());
    if (!service || !service.active) {
      return NextResponse.json(
        { error: "Servicio no encontrado o no disponible." },
        { status: 404 }
      );
    }

    const origin = request.headers.get("origin") || request.nextUrl.origin;
    const base = `${origin}/${locale}`;
    const successUrl = `${base}/contratar/${service.slug}/gracias?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${base}/contratar/${service.slug}`;

    const amountCents = Math.round(Number(service.price) * 100);
    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            unit_amount: amountCents,
            product_data: {
              name: service.name,
              description: service.description || undefined,
              images: service.image_url ? [service.image_url] : undefined,
            },
          },
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        service_id: service.id,
        service_slug: service.slug,
      },
    });

    await createServiceOrder({
      service_id: service.id,
      email: null,
      stripe_session_id: session.id,
      amount: Number(service.price),
    });

    const url = session.url ?? null;
    if (!url) {
      return NextResponse.json(
        { error: "No se pudo obtener la URL de pago." },
        { status: 500 }
      );
    }
    return NextResponse.json({ url });
  } catch (e) {
    console.error("Checkout session error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Error al crear la sesión de pago." },
      { status: 500 }
    );
  }
}
