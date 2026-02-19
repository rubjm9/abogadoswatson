import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/actions/services";
import { Container } from "@/components/ui/container";
import { ContratarButton } from "./contratar-button";

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
      <section className="pt-32 pb-24 bg-white border-b border-slate-100">
        <Container>
          <div className="max-w-2xl mx-auto">
            <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-sm">
              {service.image_url && (
                <div className="aspect-video w-full bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={service.image_url}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-8">
                <h1 className="text-3xl font-serif font-bold text-[#0F172A] mb-4">
                  {service.name}
                </h1>
                {service.description && (
                  <p className="text-slate-600 leading-relaxed mb-6 whitespace-pre-line">
                    {service.description}
                  </p>
                )}
                <p className="text-2xl font-bold text-[#701218] mb-8">
                  {Number(service.price).toFixed(2)} €
                </p>
                <ContratarButton slug={service.slug} />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
