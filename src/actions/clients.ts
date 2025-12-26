'use server'

import { prisma } from '@/lib/prisma'
import { ClientSchema } from '@/lib/validations'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

export async function getClients() {
    try {
        const clients = await prisma.client.findMany({
            orderBy: { createdAt: 'desc' }
        })
        return { success: true, data: clients }
    } catch (_error) {
        return { success: false, error: 'Failed to fetch clients' }
    }
}

export async function getClientById(id: string) {
    try {
        const client = await prisma.client.findUnique({
            where: { id },
            include: { cases: true, invoices: true }
        })
        if (!client) return { success: false, error: 'Client not found' }
        return { success: true, data: client }
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
        const client = await prisma.client.create({
            data: result.data
        })
        revalidatePath('/clients')
        return { success: true, data: client }
    } catch (_error) {
        return { success: false, error: 'Failed to create client' }
    }
}

export async function updateClient(id: string, data: Partial<z.infer<typeof ClientSchema>>) {
    // Use partial schema for updates
    const result = ClientSchema.partial().safeParse(data)

    if (!result.success) {
        return { success: false, error: result.error.flatten() }
    }

    try {
        const client = await prisma.client.update({
            where: { id },
            data: result.data
        })
        revalidatePath('/clients')
        revalidatePath(`/clients/${id}`)
        return { success: true, data: client }
    } catch (_error) {
        return { success: false, error: 'Failed to update client' }
    }
}

export async function deleteClient(id: string) {
    try {
        await prisma.client.delete({
            where: { id }
        })
        revalidatePath('/clients')
        return { success: true }
    } catch (_error) {
        return { success: false, error: 'Failed to delete client' }
    }
}
