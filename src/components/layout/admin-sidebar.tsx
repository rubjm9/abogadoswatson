"use client";

import { Link } from "@/navigation";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Briefcase, User, ShoppingBag, FileText, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { imagePath } from "@/lib/constants";
import { logoutAndRedirect } from "@/actions/auth";

const baseItems = [
  { title: "Inicio", href: "/admin", icon: LayoutDashboard },
  { title: "Expedientes", href: "/admin/expedientes", icon: Briefcase },
  { title: "Perfil", href: "/admin/profile", icon: User },
];

const adminOnlyItems = [
  { title: "Contrataciones", href: "/admin/contrataciones", icon: FileText },
  { title: "Servicios", href: "/admin/servicios", icon: ShoppingBag },
];

export function AdminSidebar({ role }: { role?: string | null }) {
  const pathname = usePathname();
  const isAdmin = role === "ADMIN";
  const items = [...baseItems, ...(isAdmin ? adminOnlyItems : [])];

  return (
    <div className="flex h-full w-64 flex-col bg-slate-900 text-white">
      <div className="flex h-20 items-center justify-center border-b border-slate-800 px-4">
        <Link href="/" className="block w-full max-w-[180px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imagePath("logo-horizontal-white.png")}
            alt="Abogados Watson"
            className="h-10 w-auto object-contain object-center"
          />
        </Link>
      </div>
      <div className="flex-1 px-4 py-6">
        <nav className="flex flex-col gap-2">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href || pathname?.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-slate-800",
                  isActive ? "bg-slate-800 text-white" : "text-slate-400"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.title}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="border-t border-slate-800 p-4">
        <form action={logoutAndRedirect}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Cerrar sesión
          </button>
        </form>
      </div>
    </div>
  );
}
