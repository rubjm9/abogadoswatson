'use server'

import { prisma } from '@/lib/prisma'
import { InvoiceSchema } from '@/lib/validations'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

export async function getInvoicesByCaseId(caseId: string) {
    try {
        const invoices = await prisma.invoice.findMany({
            where: { caseId },
            orderBy: { createdAt: 'desc' }
        })
        // Serialize Decimals to numbers for client safety
        const safeInvoices = invoices.map(inv => ({
            ...inv,
            amount: inv.amount.toNumber()
        }))
        return { success: true, data: safeInvoices }
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
        const invoice = await prisma.invoice.create({
            data: result.data
        })

        // Return safe object
        return {
            success: true,
            data: { ...invoice, amount: invoice.amount.toNumber() }
        }
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
        const invoice = await prisma.invoice.update({
            where: { id },
            data: result.data
        })

        revalidatePath(`/cases/${invoice.caseId}`)
        return {
            success: true,
            data: { ...invoice, amount: invoice.amount.toNumber() }
        }
    } catch (_error) {
        return { success: false, error: 'Failed to update invoice' }
    }
}
