import { auth } from "@/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AreaPersonalProfilePage() {
  const session = await auth();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Mi perfil</h2>
        <p className="text-slate-500">Datos de tu cuenta.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Información</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="space-y-2 text-sm">
            <div>
              <dt className="font-medium text-slate-500">Email</dt>
              <dd>{session?.user?.email ?? "—"}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-500">Nombre</dt>
              <dd>{session?.user?.name ?? "—"}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}
