"use client";

import * as React from "react";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "./language-switcher";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { MobileMenu } from "./mobile-menu";
import { serviceCategories } from "@/lib/constants";

export function Header() {
    const t = useTranslations("Navigation");
    const [isScrolled, setIsScrolled] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const logoSrc = "/images/logo-horizontal.png";

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 border-b",
                isScrolled
                    ? "border-slate-200 bg-white/90 backdrop-blur-md shadow-sm"
                    : "border-transparent bg-white/50 backdrop-blur-sm"
            )}
        >
            <Container className="flex h-20 items-center justify-between transition-all">
                <Link href="/" className="mr-8">
                    <img
                        src={logoSrc}
                        alt="Abogados Watson"
                        className="h-10 md:h-12 w-auto transition-all"
                    />
                </Link>

                <div className="hidden md:flex flex-1 items-center justify-center">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger
                                    className="bg-transparent focus:bg-transparent transition-colors text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                                >
                                    {t('services')}
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <div className="w-[600px] p-6 lg:w-[800px] bg-white text-slate-900 shadow-2xl border border-slate-100">
                                        <div className="grid grid-cols-2 gap-x-8 gap-y-10">
                                            {serviceCategories.map((category) => (
                                                <div key={category.title}>
                                                    <h4 className="text-[10px] uppercase tracking-widest text-[#701218] font-bold mb-4 px-3">
                                                        {category.subtitle}
                                                    </h4>
                                                    <ul className="space-y-1">
                                                        {category.services.map((service) => (
                                                            <ListItem
                                                                key={service.title}
                                                                title={service.title}
                                                                href={service.href}
                                                                icon={service.icon}
                                                            >
                                                                {service.description}
                                                            </ListItem>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link href="/sobre-nosotros" legacyBehavior passHref>
                                    <NavigationMenuLink
                                        className={cn(
                                            navigationMenuTriggerStyle(),
                                            "bg-transparent transition-colors text-slate-700 hover:text-slate-900"
                                        )}
                                    >
                                        {t('about')}
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link href="/blog" legacyBehavior passHref>
                                    <NavigationMenuLink
                                        className={cn(
                                            navigationMenuTriggerStyle(),
                                            "bg-transparent transition-colors text-slate-700 hover:text-slate-900"
                                        )}
                                    >
                                        {t('blog')}
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-4">
                        <LanguageSwitcher />
                        <Button asChild className="hidden md:inline-flex bg-[#701218] hover:bg-[#590e13] text-white">
                            <Link href="/contacto">{t('contact')}</Link>
                        </Button>
                    </div>
                    <MobileMenu />
                </div>
            </Container>
        </header>
    );
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a"> & { icon: LucideIcon; href: string }
>(({ className, title, children, icon: Icon, href, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <Link
                    ref={ref}
                    href={href}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-50 hover:text-accent-foreground focus:bg-slate-50 focus:text-accent-foreground group",
                        className
                    )}
                    {...props}
                >
                    <div className="flex items-center gap-2 mb-1">
                        <div className="p-1 rounded bg-[#701218]/10 group-hover:bg-[#701218] transition-colors">
                            <Icon className="w-4 h-4 text-[#701218] group-hover:text-white transition-colors" />
                        </div>
                        <div className="text-sm font-medium leading-none text-slate-900">{title}</div>
                    </div>
                    <p className="line-clamp-2 text-xs leading-snug text-slate-500 pl-8">
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"
