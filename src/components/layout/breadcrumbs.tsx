import { ChevronRight, Home } from "lucide-react";
import { Link } from "@/navigation";
import { Container } from "@/components/ui/container";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
    className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
    return (
        <nav className={`py-3 ${className || ''}`}>
            <Container>
                <ol className="flex items-center space-x-2 text-xs font-medium text-slate-300">
                    <li className="flex items-center">
                        <Link href="/" className="hover:text-white transition-colors flex items-center">
                            <Home className="w-3.5 h-3.5" />
                        </Link>
                    </li>
                    <li className="flex items-center">
                        <ChevronRight className="w-3 h-3 mx-1 text-slate-400" />
                        <Link href="/servicios" className="hover:text-white transition-colors">
                            Servicios
                        </Link>
                    </li>
                    {items.map((item, index) => (
                        <li key={index} className="flex items-center">
                            <ChevronRight className="w-3 h-3 mx-1 text-slate-400" />
                            {item.href && index < items.length - 1 ? (
                                <Link href={item.href} className="hover:text-white transition-colors">
                                    {item.label}
                                </Link>
                            ) : (
                                <span className="text-white font-semibold truncate max-w-[150px] md:max-w-none">
                                    {item.label}
                                </span>
                            )}
                        </li>
                    ))}
                </ol>
            </Container>
        </nav>
    );
}
