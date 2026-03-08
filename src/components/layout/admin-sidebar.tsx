"use client";

import { Link } from "@/navigation";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Briefcase, User, ShoppingBag, FileText, LogOut, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { imagePath } from "@/lib/constants";
import { logoutAndRedirect } from "@/actions/auth";

type NavItem = { title: string; href: string; icon: React.ComponentType<{ className?: string }>; adminOnly?: boolean };

const inicioItem: NavItem = { title: "Inicio", href: "/admin", icon: LayoutDashboard };

const groupExpedientesContratacionesServicios: NavItem[] = [
  { title: "Expedientes", href: "/admin/expedientes", icon: Briefcase },
  { title: "Contrataciones", href: "/admin/contrataciones", icon: FileText, adminOnly: true },
  { title: "Servicios", href: "/admin/servicios", icon: ShoppingBag, adminOnly: true },
];

const groupPerfilUsuarios: NavItem[] = [
  { title: "Perfil", href: "/admin/profile", icon: User },
  { title: "Gestionar usuarios", href: "/admin/usuarios", icon: Users, adminOnly: true },
];

function NavLink({
  item,
  pathname,
}: {
  item: NavItem;
  pathname: string;
}) {
  const Icon = item.icon;
  const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-[#5a0e13]",
        isActive ? "bg-[#5a0e13] text-white" : "text-white/80"
      )}
    >
      <Icon className="h-4 w-4" />
      {item.title}
    </Link>
  );
}

export function AdminSidebar({ role }: { role?: string | null }) {
  const pathname = usePathname();
  const isAdmin = role === "ADMIN";

  const filterItems = (items: NavItem[]) => items.filter((i) => !i.adminOnly || isAdmin);

  return (
    <div className="flex h-full w-64 flex-col bg-[#701218] text-white">
      <div className="flex h-20 items-center justify-center border-b border-[#5a0e13] px-4">
        <Link href="/" className="block w-full max-w-[180px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imagePath("aw-logo-horizontal-white.png")}
            alt="Abogados Watson"
            className="h-10 w-auto object-contain object-center"
          />
        </Link>
      </div>
      <div className="flex-1 px-4 py-6">
        <nav className="flex flex-col gap-2">
          <NavLink item={inicioItem} pathname={pathname} />
          <div className="mt-4 flex flex-col gap-2">
            <span className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/50">
              CLIENTES
            </span>
            {filterItems(groupExpedientesContratacionesServicios).map((item) => (
              <NavLink key={item.href} item={item} pathname={pathname} />
            ))}
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <span className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/50">
              USUARIOS
            </span>
            {filterItems(groupPerfilUsuarios).map((item) => (
              <NavLink key={item.href} item={item} pathname={pathname} />
            ))}
          </div>
        </nav>
      </div>
      <div className="border-t border-[#5a0e13] p-4">
        <form action={logoutAndRedirect}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-[#5a0e13] hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Cerrar sesión
          </button>
        </form>
      </div>
    </div>
  );
}
