
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { deleteLearningRecord } from "@/app/admin/(protected)/learning/actions";

export default function LearningDeleteButton({
  id,
}: {
  id: string;
}) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this learning record? This action cannot be undone."
    );

    if (!confirmed) return;

    setDeleting(true);
    setError("");

    try {
      const result = await deleteLearningRecord(id);

      if (result?.error) {
        setError(result.error);
        return;
      }

      router.refresh();
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Failed to delete learning record."
      );
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleDelete}
        disabled={deleting}
        className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2.5 text-sm text-red-600 transition hover:bg-red-50 disabled:opacity-50"
      >
        <Trash2 size={16} />
        {deleting ? "Deleting..." : "Delete"}
      </button>

      {error && (
        <p className="mt-1 max-w-40 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
