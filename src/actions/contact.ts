'use server';

import { z } from 'zod';

// Schema de validación para el formulario de contacto
const ContactFormSchema = z.object({
    name: z.string()
        .min(2, 'El nombre debe tener al menos 2 caracteres')
        .max(100, 'El nombre es demasiado largo'),
    email: z.string()
        .email('Por favor ingrese un correo electrónico válido')
        .max(255, 'El correo electrónico es demasiado largo'),
    phone: z.string()
        .optional()
        .refine((val) => !val || val === '' || /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/.test(val), {
            message: 'Por favor ingrese un número de teléfono válido'
        }),
    message: z.string()
        .min(10, 'El mensaje debe tener al menos 10 caracteres')
        .max(2000, 'El mensaje es demasiado largo'),
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;

export async function submitContactForm(data: ContactFormData) {
    // Validar datos
    const result = ContactFormSchema.safeParse(data);

    if (!result.success) {
        return {
            success: false,
            error: result.error.flatten().fieldErrors,
        };
    }

    try {
        // TODO: Implementar envío de email
        // Por ahora, solo validamos y retornamos éxito
        // Ejemplo de integración futura con Resend:
        // await sendEmail({
        //     to: 'info@abogadoswatson.com',
        //     subject: `Nueva consulta de ${result.data.name}`,
        //     html: `...`
        // });

        // TODO: Opcionalmente guardar en base de datos
        // await prisma.contactSubmission.create({
        //     data: result.data
        // });

        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 500));

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

