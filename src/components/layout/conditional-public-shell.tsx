"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FooterBar } from "@/components/layout/footer-bar";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { Toaster } from "@/components/ui/toaster";

export function ConditionalPublicShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "";

  const isBackend = pathname.includes("/admin");

  if (isBackend) {
    return (
      <>
        <main className="flex-1">{children}</main>
        <Toaster />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <FooterBar />
      <WhatsAppButton />
      <Toaster />
    </>
  );
}
