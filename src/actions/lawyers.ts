'use server'

import * as dbLawyers from '@/lib/db/lawyers'
import { LawyerSchema } from '@/lib/validations'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

export async function getLawyers() {
    try {
        const lawyers = await dbLawyers.findLawyers()
        return { success: true, data: lawyers }
    } catch (_error) {
        return { success: false, error: 'Failed to fetch lawyers' }
    }
}

export async function getLawyerById(id: string) {
    try {
        const lawyer = await dbLawyers.findLawyerById(id)
        if (!lawyer) return { success: false, error: 'Lawyer not found' }
        const cases = await import('@/lib/db/cases').then(m => m.findCases()).then(cs => cs.filter(c => c.lawyerId === id))
        return { success: true, data: { ...lawyer, cases } }
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
        const lawyer = await dbLawyers.insertLawyer(result.data)
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
        const lawyer = await dbLawyers.updateLawyer(id, result.data)
        revalidatePath('/lawyers')
        revalidatePath(`/lawyers/${id}`)
        return { success: true, data: lawyer }
    } catch (_error) {
        return { success: false, error: 'Failed to update lawyer' }
    }
}

export async function deleteLawyer(id: string) {
    try {
        await dbLawyers.deleteLawyer(id)
        revalidatePath('/lawyers')
        return { success: true }
    } catch (_error) {
        return { success: false, error: 'Failed to delete lawyer' }
    }
}
