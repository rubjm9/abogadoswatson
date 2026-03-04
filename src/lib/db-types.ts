/** Enums (reemplazo de @prisma/client) */
export const CaseStatus = {
  OPEN: "OPEN",
  IN_PROGRESS: "IN_PROGRESS",
  CLOSED: "CLOSED",
  ARCHIVED: "ARCHIVED",
} as const;
export type CaseStatus = (typeof CaseStatus)[keyof typeof CaseStatus];

export const DocumentType = {
  ID: "ID",
  CONTRACT: "CONTRACT",
  COURT_NOTICE: "COURT_NOTICE",
  EVIDENCE: "EVIDENCE",
  OTHER: "OTHER",
} as const;
export type DocumentType = (typeof DocumentType)[keyof typeof DocumentType];

export const Role = {
  ADMIN: "ADMIN",
  ABOGADO: "ABOGADO",
  CLIENTE: "CLIENTE",
} as const;
export type Role = (typeof Role)[keyof typeof Role];

/** Tipos de filas (Supabase) */
export interface UserRow {
  id: string;
  name: string | null;
  email: string;
  password: string | null;
  role: Role;
  createdAt: string;
  updatedAt: string;
}

export interface ClientRow {
  id: string;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  address: string | null;
}

export interface LawyerRow {
  id: string;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  email: string;
  specialty: string | null;
}

export interface CaseRow {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string | null;
  status: CaseStatus;
  clientId: string;
  lawyerId: string | null;
}

export interface DocumentRow {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  url: string;
  type: DocumentType;
  caseId: string;
  slot_label?: string | null;
}

export interface InvoiceRow {
  id: string;
  createdAt: string;
  updatedAt: string;
  amount: number;
  dueDate: string;
  paid: boolean;
  caseId: string | null;
  clientId: string;
}
