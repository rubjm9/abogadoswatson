import { Container } from "@/components/ui/container";
import { CheckCircle2 } from "lucide-react";

export default function GraciasPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center">
      <Container>
        <div className="max-w-md mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-[#0F172A] mb-2">
            Pago realizado correctamente
          </h1>
          <p className="text-slate-600">
            Gracias por contratar nuestro servicio. Nos pondremos en contacto contigo a la mayor brevedad.
          </p>
        </div>
      </Container>
    </main>
  );
}
