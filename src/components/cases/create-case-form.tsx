"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { CaseStatus } from "@prisma/client"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { createCase } from "@/actions/cases"

const formSchema = z.object({
    title: z.string().min(1, "El título es requerido"),
    description: z.string().optional(),
    status: z.nativeEnum(CaseStatus),
    clientId: z.string().min(1, "El cliente es requerido"),
    lawyerId: z.string().optional(),
})

export function CreateCaseForm() {
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            status: CaseStatus.OPEN,
            clientId: "",
            lawyerId: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await createCase(values)
            // Show success message (toast) - omitted for brevity
            router.push("/dashboard/cases")
            router.refresh()
        } catch (error) {
            console.error(error)
            // Show error
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Título del Caso</FormLabel>
                            <FormControl>
                                <Input placeholder="Ej: Solicitud de Nacionalidad..." {...field} />
                            </FormControl>
                            <FormDescription>
                                Un nombre descriptivo para identificar el caso.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="clientId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>ID del Cliente</FormLabel>
                            <FormControl>
                                <Input placeholder="ID del cliente" {...field} />
                            </FormControl>
                            <FormDescription>
                                Ingrese el ID del cliente asociado a este caso.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid gap-8 md:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Descripción (Opcional)</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Detalles adicionales del caso..."
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Estado Inicial</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccione estado" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value={CaseStatus.OPEN}>Abierto</SelectItem>
                                        <SelectItem value={CaseStatus.IN_PROGRESS}>En Progreso</SelectItem>
                                        <SelectItem value={CaseStatus.CLOSED}>Cerrado</SelectItem>
                                        <SelectItem value={CaseStatus.ARCHIVED}>Archivado</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Crear Caso
                </Button>
            </form>
        </Form>
    )
}
