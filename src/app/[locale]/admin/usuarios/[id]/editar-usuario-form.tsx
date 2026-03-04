"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateUserAction, updateUserPasswordAction } from "@/actions/users";
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
import type { UserRow } from "@/lib/db-types";

export function EditarUsuarioForm({ user }: { user: UserRow }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState(user.name ?? "");
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  const [newPassword, setNewPassword] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);

    const updateResult = await updateUserAction(user.id, {
      name: name.trim() || null,
      email: email.trim().toLowerCase(),
      role,
    });

    if (!updateResult.success) {
      setError(updateResult.error);
      setSaving(false);
      return;
    }

    if (newPassword.length >= 6) {
      const pwdResult = await updateUserPasswordAction(user.id, newPassword);
      if (!pwdResult.success) {
        setError(pwdResult.error);
        setSaving(false);
        return;
      }
    }

    setSaving(false);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="name">Nombre (opcional)</Label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre del usuario"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="role">Rol</Label>
        <Select value={role} onValueChange={(v) => setRole(v as "ADMIN" | "ABOGADO" | "CLIENTE")}>
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
      <div className="space-y-2">
        <Label htmlFor="newPassword">Nueva contraseña (opcional)</Label>
        <Input
          id="newPassword"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          minLength={6}
          placeholder="Dejar vacío para dejar la contraseña actual"
        />
        <p className="text-xs text-slate-500">Solo rellena si quieres cambiar la contraseña.</p>
      </div>
      <Button type="submit" variant="brown" disabled={saving}>
        {saving ? "Guardando..." : "Guardar cambios"}
      </Button>
    </form>
  );
}
