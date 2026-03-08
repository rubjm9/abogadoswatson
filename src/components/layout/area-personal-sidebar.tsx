"use client";

import { Link } from "@/navigation";
import { usePathname } from "next/navigation";
import { LayoutDashboard, User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { imagePath } from "@/lib/constants";
import { logoutAndRedirect } from "@/actions/auth";

const items = [
  { title: "Inicio", href: "/area-personal", icon: LayoutDashboard },
  { title: "Perfil", href: "/area-personal/profile", icon: User },
];

export function AreaPersonalSidebar() {
  const pathname = usePathname();

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
          {items.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
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
          })}
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
