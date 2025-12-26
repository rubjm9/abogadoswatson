'use server'

import { prisma } from '@/lib/prisma'
import { CaseSchema } from '@/lib/validations'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

export async function getCases() {
    try {
        const cases = await prisma.case.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                client: true,
                lawyer: true
            }
        })
        return { success: true, data: cases }
    } catch (_error) {
        return { success: false, error: 'Failed to fetch cases' }
    }
}

export async function getCaseById(id: string) {
    try {
        const caseItem = await prisma.case.findUnique({
            where: { id },
            include: {
                client: true,
                lawyer: true,
                documents: true,
                invoices: true
            }
        })
        if (!caseItem) return { success: false, error: 'Case not found' }
        return { success: true, data: caseItem }
    } catch (_error) {
        return { success: false, error: 'Failed to fetch case' }
    }
}

export async function createCase(data: z.infer<typeof CaseSchema>) {
    const result = CaseSchema.safeParse(data)

    if (!result.success) {
        return { success: false, error: result.error.flatten() }
    }

    try {
        const caseItem = await prisma.case.create({
            data: result.data
        })
        revalidatePath('/cases')
        return { success: true, data: caseItem }
    } catch (_error) {
        return { success: false, error: 'Failed to create case' }
    }
}

export async function updateCase(id: string, data: Partial<z.infer<typeof CaseSchema>>) {
    const result = CaseSchema.partial().safeParse(data)

    if (!result.success) {
        return { success: false, error: result.error.flatten() }
    }

    try {
        const caseItem = await prisma.case.update({
            where: { id },
            data: result.data
        })
        revalidatePath('/cases')
        revalidatePath(`/cases/${id}`)
        return { success: true, data: caseItem }
    } catch (_error) {
        return { success: false, error: 'Failed to update case' }
    }
}

export async function deleteCase(id: string) {
    try {
        await prisma.case.delete({
            where: { id }
        })
        revalidatePath('/cases')
        return { success: true }
    } catch (_error) {
        return { success: false, error: 'Failed to delete case' }
    }
}
