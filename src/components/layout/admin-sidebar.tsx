"use client";

import { Link } from "@/navigation";
import { usePathname } from "next/navigation";
import { ShoppingBag, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { logoutAndRedirect } from "@/actions/auth";

const adminSidebarItems = [
  {
    title: "Servicios",
    href: "/admin/servicios",
    icon: ShoppingBag,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col bg-slate-900 text-white">
      <div className="flex h-20 items-center justify-center border-b border-slate-800 px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="text-xl">Abogados Watson</span>
        </Link>
      </div>
      <div className="flex-1 px-4 py-6">
        <nav className="flex flex-col gap-2">
          {adminSidebarItems.map((item) => {
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
