'use server'

import * as dbClients from '@/lib/db/clients'
import { ClientSchema } from '@/lib/validations'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

export async function getClients() {
    try {
        const clients = await dbClients.findClients()
        return { success: true, data: clients }
    } catch (_error) {
        return { success: false, error: 'Failed to fetch clients' }
    }
}

export async function getClientById(id: string) {
    try {
        const client = await dbClients.findClientById(id)
        if (!client) return { success: false, error: 'Client not found' }
        const [cases, invoices] = await Promise.all([
            import('@/lib/db/cases').then(m => m.findCases()).then(cs => cs.filter(c => c.clientId === id)),
            import('@/lib/db/invoices').then(m => m.findInvoicesByClientId(id)),
        ])
        return { success: true, data: { ...client, cases, invoices } }
    } catch (_error) {
        return { success: false, error: 'Failed to fetch client' }
    }
}

export async function createClient(data: z.infer<typeof ClientSchema>) {
    const result = ClientSchema.safeParse(data)

    if (!result.success) {
        return { success: false, error: result.error.flatten() }
    }

    try {
        const client = await dbClients.insertClient(result.data)
        revalidatePath('/clients')
        return { success: true, data: client }
    } catch (_error) {
        return { success: false, error: 'Failed to create client' }
    }
}

export async function updateClient(id: string, data: Partial<z.infer<typeof ClientSchema>>) {
    const result = ClientSchema.partial().safeParse(data)

    if (!result.success) {
        return { success: false, error: result.error.flatten() }
    }

    try {
        const client = await dbClients.updateClient(id, result.data)
        revalidatePath('/clients')
        revalidatePath(`/clients/${id}`)
        return { success: true, data: client }
    } catch (_error) {
        return { success: false, error: 'Failed to update client' }
    }
}

export async function deleteClient(id: string) {
    try {
        await dbClients.deleteClient(id)
        revalidatePath('/clients')
        return { success: true }
    } catch (_error) {
        return { success: false, error: 'Failed to delete client' }
    }
}
