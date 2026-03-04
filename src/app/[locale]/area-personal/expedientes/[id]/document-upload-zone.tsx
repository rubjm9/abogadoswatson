"use client";

import { useRef, useState } from "react";
import { useRouter } from "@/navigation";
import { Button } from "@/components/ui/button";
import { Upload, FileCheck } from "lucide-react";
import type { DocumentRow } from "@/lib/db-types";

export function DocumentUploadZone({
  caseId,
  slotLabel,
  existingDoc,
}: {
  caseId: string;
  slotLabel: string;
  existingDoc?: DocumentRow | null;
}) {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [doc, setDoc] = useState(existingDoc);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    const formData = new FormData();
    formData.set("caseId", caseId);
    formData.set("slotLabel", slotLabel);
    formData.set("file", file);
    const res = await fetch("/api/area-personal/upload-document", {
      method: "POST",
      body: formData,
    });
    const data = (await res.json()) as { success: boolean; error?: string };
    setUploading(false);
    if (data.success && res.ok) {
      setDoc({ id: "new", title: slotLabel, url: "#", type: "EVIDENCE", caseId, slot_label: slotLabel } as DocumentRow);
      if (inputRef.current) inputRef.current.value = "";
      router.refresh();
    } else {
      setError(data.error || "Error al subir");
    }
  }

  return (
    <div className="space-y-2">
      {doc ? (
        <div className="flex items-center gap-2 text-sm text-green-600">
          <FileCheck className="h-4 w-4" />
          <span>Documento subido</span>
          {doc.url && doc.url !== "#" && (
            <a href={doc.url} target="_blank" rel="noopener noreferrer" className="underline">
              Ver
            </a>
          )}
        </div>
      ) : null}
      <div
        className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 p-8 transition-colors hover:border-slate-300"
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          className="hidden"
          onChange={handleFile}
          disabled={uploading}
        />
        {uploading ? (
          <p className="text-sm text-slate-500">Subiendo...</p>
        ) : (
          <>
            <Upload className="h-8 w-8 text-slate-400 mb-2" />
            <p className="text-sm text-slate-600">
              Arrastra un archivo o haz clic para subir
            </p>
            <p className="text-xs text-slate-400 mt-1">PDF, JPG, PNG, DOC o DOCX</p>
          </>
        )}
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {!doc && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
        >
          Seleccionar archivo
        </Button>
      )}
    </div>
  );
}
