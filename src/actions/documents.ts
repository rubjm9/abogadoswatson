'use server'

import { prisma } from '@/lib/prisma'
import { DocumentSchema } from '@/lib/validations'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

export async function getDocumentsByCaseId(caseId: string) {
    try {
        const documents = await prisma.document.findMany({
            where: { caseId },
            orderBy: { createdAt: 'desc' }
        })
        return { success: true, data: documents }
    } catch (_error) {
        return { success: false, error: 'Failed to fetch documents' }
    }
}

export async function createDocument(data: z.infer<typeof DocumentSchema>) {
    const result = DocumentSchema.safeParse(data)

    if (!result.success) {
        return { success: false, error: result.error.flatten() }
    }

    try {
        const document = await prisma.document.create({
            data: result.data
        })
        revalidatePath(`/cases/${data.caseId}`)
        return { success: true, data: document }
    } catch (_error) {
        return { success: false, error: 'Failed to create document' }
    }
}

export async function deleteDocument(id: string) {
    try {
        const document = await prisma.document.delete({
            where: { id }
        })
        revalidatePath(`/cases/${document.caseId}`)
        return { success: true }
    } catch (_error) {
        return { success: false, error: 'Failed to delete document' }
    }
}
