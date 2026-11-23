
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle, Trash2, X } from "lucide-react";
import { deleteExperience } from "@/app/admin/(protected)/experience/actions";

type ExperienceDeleteButtonProps = {
  id: string;
  position: string;
};

export default function ExperienceDeleteButton({
  id,
  position,
}: ExperienceDeleteButtonProps) {
  const router = useRouter();
  const [isConfirming, setIsConfirming] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState("");

  function handleDelete() {
    setErrorMessage("");

    startTransition(async () => {
      const result = await deleteExperience(id);

      if (!result.success) {
        setErrorMessage(result.error || "Failed to delete experience.");
        return;
      }

      setIsConfirming(false);
      router.refresh();
    });
  }

  if (isConfirming) {
    return (
      <div className="flex flex-col gap-2 rounded-lg border border-red-200 bg-red-50 p-3 sm:flex-row sm:items-center">
        <div className="flex-1">
          <p className="text-sm font-semibold text-red-800">
            Delete this experience?
          </p>
          <p className="mt-1 text-xs text-red-700">
            {position} will be permanently deleted.
          </p>

          {errorMessage && (
            <p className="mt-2 text-xs font-medium text-red-700">
              {errorMessage}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setIsConfirming(false);
              setErrorMessage("");
            }}
            disabled={isPending}
            className="inline-flex items-center gap-1 rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-xs font-medium text-[#475569] transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={14} />
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? (
              <>
                <LoaderCircle size={14} className="animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 size={14} />
                Confirm Delete
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsConfirming(true)}
      className="inline-flex w-fit items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:border-red-300 hover:bg-red-50"
    >
      <Trash2 size={15} />
      Delete
    </button>
  );
}
