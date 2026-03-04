'use server'

import { auth } from '@/auth'
import * as dbCases from '@/lib/db/cases'
import { CaseSchema } from '@/lib/validations'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

export async function getCases() {
    try {
        const session = await auth()
        const role = session?.user?.role
        if (role === 'ABOGADO' && session?.user?.email) {
            const cases = await dbCases.findCasesByLawyerEmail(session.user.email)
            return { success: true, data: cases }
        }
        const cases = await dbCases.findCases()
        return { success: true, data: cases }
    } catch (_error) {
        return { success: false, error: 'Failed to fetch cases' }
    }
}

export async function getCaseById(id: string) {
    try {
        const session = await auth()
        const caseItem = await dbCases.findCaseById(id)
        if (!caseItem) return { success: false, error: 'Case not found' }
        if (session?.user?.role === 'ABOGADO' && session?.user?.email) {
            const lawyerCases = await dbCases.findCasesByLawyerEmail(session.user.email)
            const canAccess = lawyerCases.some((c) => c.id === id)
            if (!canAccess) return { success: false, error: 'No autorizado' }
        }
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
        const caseItem = await dbCases.insertCase(result.data)
        revalidatePath('/admin/expedientes')
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
        const caseItem = await dbCases.updateCase(id, result.data)
        revalidatePath('/admin/expedientes')
        revalidatePath(`/admin/expedientes/${id}`)
        return { success: true, data: caseItem }
    } catch (_error) {
        return { success: false, error: 'Failed to update case' }
    }
}

export async function deleteCase(id: string) {
    try {
        await dbCases.deleteCase(id)
        revalidatePath('/admin/expedientes')
        return { success: true }
    } catch (_error) {
        return { success: false, error: 'Failed to delete case' }
    }
}
