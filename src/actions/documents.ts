'use server'

import * as dbDocuments from '@/lib/db/documents'
import { DocumentSchema } from '@/lib/validations'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

export async function getDocumentsByCaseId(caseId: string) {
    try {
        const documents = await dbDocuments.findDocumentsByCaseId(caseId)
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
        const document = await dbDocuments.insertDocument({
            ...result.data,
            slot_label: result.data.slot_label ?? undefined,
        })
        revalidatePath('/admin/expedientes')
        return { success: true, data: document }
    } catch (_error) {
        return { success: false, error: 'Failed to create document' }
    }
}

export async function deleteDocument(id: string) {
    try {
        const doc = await dbDocuments.findDocumentById(id)
        if (!doc) return { success: false, error: 'Document not found' }
        await dbDocuments.deleteDocument(id)
        revalidatePath('/admin/expedientes')
        return { success: true }
    } catch (_error) {
        return { success: false, error: 'Failed to delete document' }
    }
}
