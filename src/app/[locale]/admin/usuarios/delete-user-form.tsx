"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteUserAction } from "@/actions/users";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export function DeleteUserForm({ userId, userEmail }: { userId: string; userEmail: string }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm(`¿Seguro que quieres eliminar a ${userEmail}? Esta acción no se puede deshacer.`)) return;
    setDeleting(true);
    const result = await deleteUserAction(userId);
    setDeleting(false);
    if (result.success) router.refresh();
    else alert(result.error);
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-red-600 hover:text-red-700"
      onClick={handleDelete}
      disabled={deleting}
      title="Eliminar usuario"
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}
