'use server'

import { prisma } from '@/lib/prisma'
import { LawyerSchema } from '@/lib/validations'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

export async function getLawyers() {
    try {
        const lawyers = await prisma.lawyer.findMany({
            orderBy: { createdAt: 'desc' }
        })
        return { success: true, data: lawyers }
    } catch (_error) {
        return { success: false, error: 'Failed to fetch lawyers' }
    }
}

export async function getLawyerById(id: string) {
    try {
        const lawyer = await prisma.lawyer.findUnique({
            where: { id },
            include: { cases: true }
        })
        if (!lawyer) return { success: false, error: 'Lawyer not found' }
        return { success: true, data: lawyer }
    } catch (_error) {
        return { success: false, error: 'Failed to fetch lawyer' }
    }
}

export async function createLawyer(data: z.infer<typeof LawyerSchema>) {
    const result = LawyerSchema.safeParse(data)

    if (!result.success) {
        return { success: false, error: result.error.flatten() }
    }

    try {
        const lawyer = await prisma.lawyer.create({
            data: result.data
        })
        revalidatePath('/lawyers')
        return { success: true, data: lawyer }
    } catch (_error) {
        return { success: false, error: 'Failed to create lawyer' }
    }
}

export async function updateLawyer(id: string, data: Partial<z.infer<typeof LawyerSchema>>) {
    const result = LawyerSchema.partial().safeParse(data)

    if (!result.success) {
        return { success: false, error: result.error.flatten() }
    }

    try {
        const lawyer = await prisma.lawyer.update({
            where: { id },
            data: result.data
        })
        revalidatePath('/lawyers')
        revalidatePath(`/lawyers/${id}`)
        return { success: true, data: lawyer }
    } catch (_error) {
        return { success: false, error: 'Failed to update lawyer' }
    }
}

export async function deleteLawyer(id: string) {
    try {
        await prisma.lawyer.delete({
            where: { id }
        })
        revalidatePath('/lawyers')
        return { success: true }
    } catch (_error) {
        return { success: false, error: 'Failed to delete lawyer' }
    }
}
