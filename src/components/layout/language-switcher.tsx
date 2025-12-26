"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
    isScrolled?: boolean;
}

export function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const toggleLocale = () => {
        const nextLocale = locale === "es" ? "en" : "es";
        router.replace(pathname, { locale: nextLocale });
    };

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={toggleLocale}
            className="font-medium uppercase transition-colors text-slate-700 hover:text-slate-900 hover:bg-slate-100/50"
        >
            {locale === "es" ? "EN" : "ES"}
        </Button>
    );
}
