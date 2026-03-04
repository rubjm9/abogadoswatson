import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { AreaPersonalSidebar } from "@/components/layout/area-personal-sidebar";

export default async function AreaPersonalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  if (session.user.role !== "CLIENTE") {
    redirect("/admin");
  }

  return (
    <div className="flex h-screen bg-slate-50">
      <AreaPersonalSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
