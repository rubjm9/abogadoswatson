import Link from "next/link"
import { getCases } from "@/actions/cases"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default async function CasesPage() {
    const response = await getCases()
    const cases = response.success ? response.data : []

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Casos</h2>
                    <p className="text-slate-500">Gestión de expedientes y trámites.</p>
                </div>
                <Button asChild>
                    <Link href="/dashboard/cases/new">
                        <Plus className="mr-2 h-4 w-4" /> Nuevo Caso
                    </Link>
                </Button>
            </div>

            <div className="rounded-md border border-slate-200">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Título</TableHead>
                            <TableHead>Cliente</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead>Fecha</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {cases?.map((c) => (
                            <TableRow key={c.id}>
                                <TableCell className="font-medium">{c.title}</TableCell>
                                <TableCell>{c.client ? `${c.client.firstName} ${c.client.lastName}` : 'N/A'}</TableCell>
                                <TableCell>
                                    <span
                                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${c.status === "OPEN"
                                            ? "bg-green-100 text-green-800"
                                            : c.status === "IN_PROGRESS"
                                                ? "bg-blue-100 text-blue-800"
                                                : c.status === "CLOSED"
                                                    ? "bg-slate-100 text-slate-800"
                                                    : "bg-yellow-100 text-yellow-800"
                                            }`}
                                    >
                                        {c.status}
                                    </span>
                                </TableCell>
                                <TableCell>{new Date(c.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="sm" asChild>
                                        <Link href={`#`}>Ver</Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
