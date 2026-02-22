import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/actions/services";
import { Container } from "@/components/ui/container";
import { ContratarButton } from "./contratar-button";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ShieldCheck, Sparkles } from "lucide-react";

export default async function ContratarPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Hero: misma estructura que páginas de servicios (pt-32 pb-24) */}
      <section className="relative pt-32 pb-24 bg-slate-900 overflow-hidden text-white">
        {service.image_url ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={service.image_url}
              alt={service.name}
              className="absolute inset-0 w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-slate-900/80 z-10" />
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#701218]/20 to-transparent z-20" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-[#701218]/30 z-10" />
        )}

        <Container className="relative z-20">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 text-[#C5A059] font-bold tracking-widest uppercase text-xs mb-4 block">
              <Sparkles className="h-3.5 w-3.5" />
              Servicio contratable
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
              {service.name}
            </h1>
            {service.summary ? (
              <p className="text-xl text-slate-300 leading-relaxed mb-8 max-w-2xl">
                {service.summary}
              </p>
            ) : null}
            <p className="text-2xl md:text-3xl font-bold text-white/90">
              {Number(service.price).toFixed(2)} €
              <span className="text-lg font-normal text-slate-300 ml-2">(pago único)</span>
            </p>
          </div>
        </Container>
      </section>

      <Breadcrumbs items={[{ label: service.name }]} />

      {/* Contenido: descripción + card lateral con CTA */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Columna principal: descripción */}
            <div className="lg:col-span-7">
              {service.description ? (
                <div className="prose prose-slate prose-lg max-w-none">
                  <div className="rounded-2xl border border-slate-200 bg-white p-8 md:p-10 shadow-sm">
                    <h2 className="text-xl font-serif font-bold text-[#0F172A] mb-6 mt-0">
                      Descripción del servicio
                    </h2>
                    <p className="text-slate-600 leading-relaxed whitespace-pre-line mb-0">
                      {service.description}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-slate-200 bg-white p-8 md:p-10 shadow-sm">
                  <p className="text-slate-500 italic">
                    Sin descripción adicional. Contrata este servicio para recibir asistencia profesional.
                  </p>
                </div>
              )}

              {/* Confianza */}
              <div className="mt-10 flex items-center gap-3 text-slate-500 text-sm">
                <ShieldCheck className="h-5 w-5 text-[#701218] shrink-0" />
                <span>Pago seguro con Stripe. Sin permanencia.</span>
              </div>
            </div>

            {/* Card fija: precio + CTA */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-24 rounded-2xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/50">
                <div className="mb-6">
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-1">
                    Precio
                  </p>
                  <p className="text-3xl font-bold text-[#701218]">
                    {Number(service.price).toFixed(2)} €
                  </p>
                  <p className="text-sm text-slate-500 mt-1">Pago único · IVA incluido si aplica</p>
                </div>
                <ContratarButton slug={service.slug} />
                <p className="mt-4 text-xs text-slate-500 text-center">
                  Serás redirigido al pago seguro de Stripe.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
