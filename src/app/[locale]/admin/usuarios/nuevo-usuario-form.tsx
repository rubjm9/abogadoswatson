"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserAction } from "@/actions/users";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function NuevoUsuarioForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [role, setRole] = useState<string>("CLIENTE");

  async function handleSubmit(formData: FormData) {
    setError(null);
    const email = (formData.get("email") as string)?.trim();
    const password = formData.get("password") as string;
    const name = (formData.get("name") as string)?.trim() || null;

    if (!email) {
      setError("El email es obligatorio.");
      return;
    }
    if (!password || password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    const result = await createUserAction({
      email,
      password,
      name,
      role,
    });

    if (result.success) {
      router.push("/admin/usuarios");
      router.refresh();
      return;
    }
    setError(result.error);
  }

  return (
    <form action={handleSubmit} className="space-y-6 max-w-xl">
      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required placeholder="usuario@email.com" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Contraseña</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          minLength={6}
          placeholder="Mínimo 6 caracteres"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="name">Nombre (opcional)</Label>
        <Input id="name" name="name" type="text" placeholder="Nombre del usuario" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="role">Rol</Label>
        <Select value={role} onValueChange={setRole}>
          <SelectTrigger id="role">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="CLIENTE">Cliente</SelectItem>
            <SelectItem value="ABOGADO">Abogado</SelectItem>
            <SelectItem value="ADMIN">Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" variant="brown">
        Crear usuario
      </Button>
    </form>
  );
}
