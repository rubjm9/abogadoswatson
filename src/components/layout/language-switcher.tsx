"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
    isLightMode?: boolean;
}

export function LanguageSwitcher({ isLightMode = true }: LanguageSwitcherProps) {
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
            className={cn(
                "font-medium uppercase transition-colors",
                isLightMode
                    ? "text-slate-700 hover:text-slate-900 hover:bg-slate-100/50"
                    : "text-white hover:text-white/80 hover:bg-white/10"
            )}
        >
            {locale === "es" ? "EN" : "ES"}
        </Button>
    );
}
