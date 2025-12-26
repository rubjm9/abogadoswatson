import { Loader2 } from "lucide-react"

export default function DashboardLoading() {
    return (
        <div className="flex h-full w-full items-center justify-center p-8">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-slate-500" />
                <p className="text-sm text-slate-500">Cargando datos del dashboard...</p>
            </div>
        </div>
    )
}
