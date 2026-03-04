'use server'

import * as dbInvoices from '@/lib/db/invoices'
import { InvoiceSchema } from '@/lib/validations'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

export async function getInvoicesByCaseId(caseId: string) {
    try {
        const invoices = await dbInvoices.findInvoicesByCaseId(caseId)
        return { success: true, data: invoices }
    } catch (_error) {
        return { success: false, error: 'Failed to fetch invoices' }
    }
}

export async function createInvoice(data: z.infer<typeof InvoiceSchema>) {
    const result = InvoiceSchema.safeParse(data)

    if (!result.success) {
        return { success: false, error: result.error.flatten() }
    }

    try {
        const invoice = await dbInvoices.insertInvoice({
            ...result.data,
            dueDate: result.data.dueDate,
        })
        revalidatePath('/admin/expedientes')
        return { success: true, data: invoice }
    } catch (_error) {
        return { success: false, error: 'Failed to create invoice' }
    }
}

export async function updateInvoice(id: string, data: Partial<z.infer<typeof InvoiceSchema>>) {
    const result = InvoiceSchema.partial().safeParse(data)

    if (!result.success) {
        return { success: false, error: result.error.flatten() }
    }

    try {
        const invoice = await dbInvoices.updateInvoice(id, result.data)
        revalidatePath('/admin/expedientes')
        return { success: true, data: invoice }
    } catch (_error) {
        return { success: false, error: 'Failed to update invoice' }
    }
}
