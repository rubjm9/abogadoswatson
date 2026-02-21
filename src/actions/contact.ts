'use server';

import { z } from 'zod';
import { Resend } from 'resend';

// Schema de validación para el formulario de contacto
const ContactFormSchema = z.object({
    name: z.string()
        .min(2, 'El nombre debe tener al menos 2 caracteres')
        .max(100, 'El nombre es demasiado largo'),
    email: z.string()
        .email('Por favor ingrese un correo electrónico válido')
        .max(255, 'El correo electrónico es demasiado largo'),
    phonePrefix: z.string().optional(),
    phone: z.string().optional(),
    message: z.string()
        .min(10, 'El mensaje debe tener al menos 10 caracteres')
        .max(2000, 'El mensaje es demasiado largo'),
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;

const CONTACT_EMAIL_TO = ['info@abogadoswatson.com', 'ruben@abogadoswatson.com'] as const;

export async function submitContactForm(data: ContactFormData) {
    const result = ContactFormSchema.safeParse(data);

    if (!result.success) {
        return {
            success: false,
            error: result.error.flatten().fieldErrors,
        };
    }

    const { name, email, message, phonePrefix, phone } = result.data;
    const fullPhone = [phonePrefix, phone].filter(Boolean).join(' ').trim();

    try {
        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
            console.error('RESEND_API_KEY no configurada');
            return {
                success: false,
                error: 'Hubo un problema al enviar su mensaje. Por favor intente nuevamente.',
            };
        }

        const resend = new Resend(apiKey);
        const from = process.env.RESEND_FROM ?? 'Abogados Watson <onboarding@resend.dev>';

        const html = `
            <h2>Nueva consulta desde el formulario de contacto</h2>
            <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            ${fullPhone ? `<p><strong>Teléfono:</strong> ${escapeHtml(fullPhone)}</p>` : ''}
            <p><strong>Mensaje:</strong></p>
            <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
        `;

        const { error } = await resend.emails.send({
            from,
            to: [...CONTACT_EMAIL_TO],
            subject: `Nueva consulta de ${name}`,
            html,
        });

        if (error) {
            console.error('Resend error:', error);
            return {
                success: false,
                error: 'Hubo un problema al enviar su mensaje. Por favor intente nuevamente.',
            };
        }

        return {
            success: true,
            message: 'Mensaje enviado correctamente',
        };
    } catch (error) {
        console.error('Error al enviar formulario de contacto:', error);
        return {
            success: false,
            error: 'Hubo un problema al enviar su mensaje. Por favor intente nuevamente.',
        };
    }
}

function escapeHtml(text: string): string {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

