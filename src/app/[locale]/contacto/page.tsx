"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Mail, MessageCircle, ShieldCheck, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { submitContactForm } from "@/actions/contact";
import { toast } from "sonner";
import { useState } from "react";
import { WHATSAPP_URL } from "@/lib/constants";

// Prefijos internacionales habituales
const PHONE_PREFIXES = [
    { value: "+34", label: "España (+34)" },
    { value: "+1", label: "USA/Can (+1)" },
    { value: "+52", label: "México (+52)" },
    { value: "+57", label: "Colombia (+57)" },
    { value: "+54", label: "Argentina (+54)" },
    { value: "+58", label: "Venezuela (+58)" },
    { value: "+51", label: "Perú (+51)" },
    { value: "+56", label: "Chile (+56)" },
    { value: "+593", label: "Ecuador (+593)" },
    { value: "+49", label: "Alemania (+49)" },
    { value: "+33", label: "Francia (+33)" },
    { value: "+39", label: "Italia (+39)" },
    { value: "+44", label: "Reino Unido (+44)" },
    { value: "+55", label: "Brasil (+55)" },
    { value: "+91", label: "India (+91)" },
    { value: "+86", label: "China (+86)" },
    { value: "+81", label: "Japón (+81)" },
    { value: "+61", label: "Australia (+61)" },
    { value: "+31", label: "Países Bajos (+31)" },
    { value: "+351", label: "Portugal (+351)" },
] as const;

// Schema de validación
const createContactSchema = (t: any) => z.object({
    name: z.string()
        .min(2, t('ContactForm.validation.nameMin'))
        .max(100, 'El nombre es demasiado largo'),
    email: z.string()
        .email(t('ContactForm.validation.emailInvalid'))
        .min(1, t('ContactForm.validation.emailRequired')),
    phonePrefix: z.string().optional(),
    phone: z.string()
        .optional()
        .refine((val) => !val || val === '' || /^[0-9\s\-()]{6,20}$/.test(val), {
            message: t('ContactForm.validation.phoneInvalid')
        }),
    message: z.string()
        .min(10, t('ContactForm.validation.messageMin'))
        .max(2000, 'El mensaje es demasiado largo'),
});

type ContactFormData = z.infer<ReturnType<typeof createContactSchema>>;

export default function ContactPage() {
    const t = useTranslations("ContactPage");
    const tForm = useTranslations("ContactForm");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const schema = createContactSchema(tForm);
    const form = useForm<ContactFormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: '',
            email: '',
            phonePrefix: '+34',
            phone: '',
            message: '',
        },
        mode: 'onBlur', // Validar al perder el foco
    });

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true);
        try {
            const result = await submitContactForm(data);
            
            if (result.success) {
                toast.success(tForm('success.title'), {
                    description: tForm('success.message'),
                });
                form.reset();
            } else {
                // Manejar errores de validación del servidor
                if (typeof result.error === 'object' && result.error !== null) {
                    Object.entries(result.error).forEach(([field, messages]) => {
                        if (Array.isArray(messages) && messages.length > 0) {
                            form.setError(field as keyof ContactFormData, {
                                type: 'server',
                                message: messages[0],
                            });
                        }
                    });
                } else {
                    toast.error(tForm('error.title'), {
                        description: result.error || tForm('error.message'),
                    });
                }
            }
        } catch (error) {
            toast.error(tForm('error.title'), {
                description: tForm('error.message'),
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.8 }
    };

    return (
        <main className="pt-24 bg-white">
            {/* Hero Section */}
            <section className="py-24 border-b border-slate-50">
                <Container>
                    <motion.div {...fadeIn} className="max-w-3xl">
                        <h1 className="font-serif text-5xl md:text-6xl font-bold text-slate-900 mb-8 leading-tight">
                            {t('hero.title')}
                        </h1>
                        <p className="text-xl text-slate-600 leading-relaxed border-l-4 border-[#701218]/20 pl-6">
                            {t('hero.subtitle')}
                        </p>
                    </motion.div>
                </Container>
            </section>

            <section className="py-24">
                <Container>
                    <div className="grid lg:grid-cols-12 gap-16">
                        {/* Contact Methods */}
                        <div className="lg:col-span-5 space-y-12">
                            <motion.div {...fadeIn} transition={{ delay: 0.1 }}>
                                <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-[#701218] mb-10">
                                    Canales de comunicación
                                </h2>

                                <div className="space-y-10">
                                    {/* WhatsApp */}
                                    <div className="group">
                                        <div className="flex gap-6 items-start">
                                            <div className="w-12 h-12 bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-[#701218]/5 transition-colors">
                                                <MessageCircle className="w-6 h-6 text-[#701218]" />
                                            </div>
                                            <div>
                                                <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">
                                                    {t('methods.whatsapp.title')}
                                                </h3>
                                                <p className="text-slate-600 mb-6 leading-relaxed">
                                                    {t('methods.whatsapp.description')}
                                                </p>
                                                <Button 
                                                    asChild 
                                                    className="bg-[#701218] hover:bg-[#590e13] text-white px-8 py-6 h-auto uppercase tracking-widest text-[10px] font-bold shadow-lg shadow-[#701218]/10 transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#701218] focus:ring-offset-2"
                                                >
                                                    <a 
                                                        href={WHATSAPP_URL} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        aria-label={`${t('methods.whatsapp.title')} - ${t('methods.whatsapp.button')}`}
                                                    >
                                                        {t('methods.whatsapp.button')}
                                                    </a>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="group pt-10 border-t border-slate-50">
                                        <div className="flex gap-6 items-start">
                                            <div className="w-12 h-12 bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-slate-100 transition-colors">
                                                <Mail className="w-6 h-6 text-slate-400 group-hover:text-[#701218] transition-colors" />
                                            </div>
                                            <div>
                                                <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">
                                                    {t('methods.email.title')}
                                                </h3>
                                                <p className="text-slate-600 mb-4 leading-relaxed">
                                                    {t('methods.email.description')}
                                                </p>
                                                <a 
                                                    href="mailto:info@abogadoswatson.com" 
                                                    className="text-slate-900 font-bold hover:text-[#701218] transition-colors border-b-2 border-slate-100 pb-1 focus:outline-none focus:ring-2 focus:ring-[#701218] focus:ring-offset-2 rounded-sm"
                                                    aria-label={`${t('methods.email.title')}: info@abogadoswatson.com`}
                                                >
                                                    info@abogadoswatson.com
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Escríbenos por WhatsApp (mismo número que botón flotante) */}
                                    <div className="group pt-10 border-t border-slate-50">
                                        <div className="flex gap-6 items-start">
                                            <div className="w-12 h-12 bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-[#701218]/5 transition-colors">
                                                <MessageCircle className="w-6 h-6 text-[#701218]" />
                                            </div>
                                            <div>
                                                <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">
                                                    {t('methods.whatsappWrite.title')}
                                                </h3>
                                                <p className="text-slate-600 mb-6 leading-relaxed">
                                                    {t('methods.whatsappWrite.description')}
                                                </p>
                                                <Button 
                                                    asChild 
                                                    variant="outline"
                                                    className="border-[#701218] text-[#701218] hover:bg-[#701218]/5 px-6 py-5 h-auto uppercase tracking-widest text-[10px] font-bold focus:outline-none focus:ring-2 focus:ring-[#701218] focus:ring-offset-2"
                                                >
                                                    <a 
                                                        href={WHATSAPP_URL} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        aria-label={t('methods.whatsappWrite.button')}
                                                    >
                                                        {t('methods.whatsappWrite.button')}
                                                    </a>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-7">
                            <motion.div
                                {...fadeIn}
                                transition={{ delay: 0.3 }}
                                className="bg-slate-50 p-8 md:p-12 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#701218]/5 rounded-full -mr-16 -mt-16" />

                                <h2 className="font-serif text-3xl font-bold text-slate-900 mb-8 relative z-10">
                                    {t('form.title')}
                                </h2>

                                <form 
                                    onSubmit={form.handleSubmit(onSubmit)} 
                                    className="space-y-6 relative z-10" 
                                    noValidate
                                    aria-label={t('form.title')}
                                >
                                    {/* Región de alertas para lectores de pantalla */}
                                    <div 
                                        role="alert" 
                                        aria-live="polite" 
                                        aria-atomic="true" 
                                        className="sr-only"
                                    >
                                        {form.formState.isSubmitting && tForm('sending')}
                                        {form.formState.isSubmitSuccessful && tForm('success.message')}
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label 
                                                htmlFor="name"
                                                className="text-[10px] font-bold uppercase tracking-widest text-slate-500"
                                            >
                                                {t('form.name')} <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <Input
                                                    id="name"
                                                    {...form.register('name')}
                                                    placeholder={tForm('placeholders.name')}
                                                    className={`bg-white border-slate-200 h-14 focus:border-[#701218] ${
                                                        form.formState.errors.name ? 'border-red-500 focus:border-red-500' : ''
                                                    } ${
                                                        form.formState.touchedFields.name && !form.formState.errors.name ? 'border-green-500' : ''
                                                    }`}
                                                    aria-invalid={form.formState.errors.name ? 'true' : 'false'}
                                                    aria-describedby={form.formState.errors.name ? 'name-error' : undefined}
                                                />
                                                {form.formState.touchedFields.name && !form.formState.errors.name && (
                                                    <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                                                )}
                                                {form.formState.errors.name && (
                                                    <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" />
                                                )}
                                            </div>
                                            {form.formState.errors.name && (
                                                <p id="name-error" className="text-xs text-red-500 mt-1" role="alert">
                                                    {form.formState.errors.name.message}
                                                </p>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <label 
                                                htmlFor="email"
                                                className="text-[10px] font-bold uppercase tracking-widest text-slate-500"
                                            >
                                                {t('form.email')} <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    {...form.register('email')}
                                                    placeholder={tForm('placeholders.email')}
                                                    className={`bg-white border-slate-200 h-14 focus:border-[#701218] ${
                                                        form.formState.errors.email ? 'border-red-500 focus:border-red-500' : ''
                                                    } ${
                                                        form.formState.touchedFields.email && !form.formState.errors.email ? 'border-green-500' : ''
                                                    }`}
                                                    aria-invalid={form.formState.errors.email ? 'true' : 'false'}
                                                    aria-describedby={form.formState.errors.email ? 'email-error' : undefined}
                                                />
                                                {form.formState.touchedFields.email && !form.formState.errors.email && (
                                                    <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                                                )}
                                                {form.formState.errors.email && (
                                                    <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" />
                                                )}
                                            </div>
                                            {form.formState.errors.email && (
                                                <p id="email-error" className="text-xs text-red-500 mt-1" role="alert">
                                                    {form.formState.errors.email.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label 
                                            htmlFor="phone"
                                            className="text-[10px] font-bold uppercase tracking-widest text-slate-500"
                                        >
                                            {t('form.phone')}
                                        </label>
                                        <div className="flex gap-2">
                                            <Select
                                                value={form.watch('phonePrefix') ?? '+34'}
                                                onValueChange={(value) => form.setValue('phonePrefix', value)}
                                            >
                                                <SelectTrigger
                                                    id="phone-prefix"
                                                    className="w-[130px] h-14 bg-white border-slate-200 focus:border-[#701218] shrink-0"
                                                >
                                                    <SelectValue placeholder={tForm('placeholders.phonePrefix')} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {PHONE_PREFIXES.map((p) => (
                                                        <SelectItem key={p.value} value={p.value}>
                                                            {p.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <div className="relative flex-1">
                                                <Input
                                                    id="phone"
                                                    type="tel"
                                                    {...form.register('phone')}
                                                    placeholder={tForm('placeholders.phone')}
                                                    className={`bg-white border-slate-200 h-14 focus:border-[#701218] ${
                                                        form.formState.errors.phone ? 'border-red-500 focus:border-red-500' : ''
                                                    } ${
                                                        form.formState.touchedFields.phone && !form.formState.errors.phone && form.watch('phone') ? 'border-green-500' : ''
                                                    }`}
                                                    aria-invalid={form.formState.errors.phone ? 'true' : 'false'}
                                                    aria-describedby={form.formState.errors.phone ? 'phone-error' : undefined}
                                                />
                                                {form.formState.touchedFields.phone && !form.formState.errors.phone && form.watch('phone') && (
                                                    <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                                                )}
                                                {form.formState.errors.phone && (
                                                    <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" />
                                                )}
                                            </div>
                                        </div>
                                        {form.formState.errors.phone && (
                                            <p id="phone-error" className="text-xs text-red-500 mt-1" role="alert">
                                                {form.formState.errors.phone.message}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <label 
                                            htmlFor="message"
                                            className="text-[10px] font-bold uppercase tracking-widest text-slate-500"
                                        >
                                            {t('form.message')} <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <Textarea
                                                id="message"
                                                {...form.register('message')}
                                                placeholder={tForm('placeholders.message')}
                                                className={`bg-white border-slate-200 min-h-[160px] focus:border-[#701218] resize-none ${
                                                    form.formState.errors.message ? 'border-red-500 focus:border-red-500' : ''
                                                } ${
                                                    form.formState.touchedFields.message && !form.formState.errors.message ? 'border-green-500' : ''
                                                }`}
                                                aria-invalid={form.formState.errors.message ? 'true' : 'false'}
                                                aria-describedby={form.formState.errors.message ? 'message-error' : undefined}
                                            />
                                            {form.formState.touchedFields.message && !form.formState.errors.message && (
                                                <CheckCircle2 className="absolute right-3 top-3 w-5 h-5 text-green-500" />
                                            )}
                                            {form.formState.errors.message && (
                                                <XCircle className="absolute right-3 top-3 w-5 h-5 text-red-500" />
                                            )}
                                        </div>
                                        {form.formState.errors.message && (
                                            <p id="message-error" className="text-xs text-red-500 mt-1" role="alert">
                                                {form.formState.errors.message.message}
                                            </p>
                                        )}
                                    </div>

                                    <div className="pt-4">
                                        <Button 
                                            type="submit" 
                                            disabled={isSubmitting}
                                            className="w-full h-16 bg-slate-900 hover:bg-slate-800 text-white uppercase tracking-[0.2em] text-[11px] font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
                                            aria-label={t('form.submit')}
                                            aria-busy={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin inline" />
                                                    {tForm('sending')}
                                                </>
                                            ) : (
                                                t('form.submit')
                                            )}
                                        </Button>
                                    </div>

                                    <div className="pt-6 flex gap-4 items-start">
                                        <ShieldCheck className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                                        <p className="text-[11px] text-slate-500 leading-relaxed font-light">
                                            {t('form.privacy')}
                                        </p>
                                    </div>
                                </form>
                            </motion.div>
                        </div>
                    </div>
                </Container>
            </section>
        </main>
    );
}
