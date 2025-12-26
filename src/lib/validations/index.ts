import { z } from 'zod';
import { CaseStatus, DocumentType } from '@prisma/client';

export const ClientSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    address: z.string().optional(),
});

export const LawyerSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    specialty: z.string().optional(),
});

export const CaseSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    status: z.nativeEnum(CaseStatus).default('OPEN'),
    clientId: z.string().min(1, "Client ID is required"),
    lawyerId: z.string().optional(),
});

export const DocumentSchema = z.object({
    title: z.string().min(1, "Title is required"),
    url: z.string().url("Invalid URL"),
    type: z.nativeEnum(DocumentType).default('OTHER'),
    caseId: z.string().min(1, "Case ID is required"),
});

export const InvoiceSchema = z.object({
    amount: z.coerce.number().positive("Amount must be positive"),
    dueDate: z.coerce.date(),
    paid: z.boolean().default(false),
    caseId: z.string().optional(),
    clientId: z.string().min(1, "Client ID is required"),
});
