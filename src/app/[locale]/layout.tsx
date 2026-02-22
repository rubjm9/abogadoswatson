import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "@/styles/globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ConditionalPublicShell } from "@/components/layout/conditional-public-shell";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
    metadataBase: new URL('http://localhost:3000'), // Change to production URL before deployment
    title: "Abogados Watson",
    description: "Especialistas en extranjería y movilidad internacional.",
};

export default async function RootLayout({
    children,
    params
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}>) {
    // Ensure that the incoming `locale` is valid
    const { locale } = await params;

    if (!['en', 'es'].includes(locale)) {
        notFound();
    }

    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    return (
        <html lang={locale} dir={locale === 'fa' ? 'rtl' : 'ltr'}>
            <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-slate-50 text-slate-900 flex min-h-screen flex-col`}>
                <NextIntlClientProvider messages={messages}>
                    <ConditionalPublicShell>
                        {children}
                    </ConditionalPublicShell>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
