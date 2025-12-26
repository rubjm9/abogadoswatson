import { CreateCaseForm } from "@/components/cases/create-case-form"

export default function NewCasePage() {
    return (
        <div className="space-y-8 max-w-2xl">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Nuevo Caso</h2>
                <p className="text-slate-500">Cree un nuevo expediente para un cliente.</p>
            </div>

            <div className="rounded-lg border border-slate-200 p-8 bg-white">
                <CreateCaseForm />
            </div>
        </div>
    )
}
