
"use client";

import { useRef, useState } from "react";
import { ImagePlus, LoaderCircle, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { ExperienceGalleryItem } from "@/app/admin/(protected)/experience/actions";

type Props = {
  gallery: ExperienceGalleryItem[];
  onChange: (items: ExperienceGalleryItem[]) => void;
  onRemove: (item: ExperienceGalleryItem) => void;
};

const MAX_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export default function ExperienceGalleryUploader({
  gallery,
  onChange,
  onRemove,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleUpload(files: FileList | null) {
    if (!files?.length) return;

    setError("");
    setUploading(true);

    const supabase = createClient();
    const uploaded: ExperienceGalleryItem[] = [];

    try {
      for (const file of Array.from(files)) {
        if (!ALLOWED_TYPES.includes(file.type)) {
          throw new Error(`${file.name}: format gambar tidak didukung.`);
        }

        if (file.size > MAX_SIZE) {
          throw new Error(`${file.name}: ukuran maksimal 10 MB.`);
        }

        const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
        const path = `experience/${crypto.randomUUID()}.${extension}`;

        const { error: uploadError } = await supabase.storage
          .from("portfolio-media")
          .upload(path, file, {
            cacheControl: "3600",
            upsert: false,
            contentType: file.type,
          });

        if (uploadError) {
          throw new Error(`${file.name}: ${uploadError.message}`);
        }

        const { data } = supabase.storage
          .from("portfolio-media")
          .getPublicUrl(path);

        uploaded.push({
          src: data.publicUrl,
          path,
          alt: file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
        });
      }

      onChange([...gallery, ...uploaded]);
    } catch (err) {
      if (uploaded.length) {
        await supabase.storage
          .from("portfolio-media")
          .remove(uploaded.map((item) => item.path));
      }

      setError(
        err instanceof Error ? err.message : "Upload gambar gagal."
      );
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-medium text-[#334155]">
          Experience Gallery
        </p>
        <p className="mt-1 text-xs text-[#94A3B8]">
          JPEG, PNG, atau WebP. Maksimal 10 MB per gambar.
        </p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        className="hidden"
        onChange={(event) => handleUpload(event.target.files)}
      />

      <button
        type="button"
        disabled={uploading}
        onClick={() => inputRef.current?.click()}
        className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#CBD5E1] bg-[#F8FAFC] px-5 py-8 transition hover:border-[#2563EB] hover:bg-blue-50 disabled:opacity-60"
      >
        {uploading ? (
          <LoaderCircle size={28} className="animate-spin text-[#2563EB]" />
        ) : (
          <ImagePlus size={28} className="text-[#2563EB]" />
        )}

        <span className="text-sm font-semibold text-[#0B1F3A]">
          {uploading ? "Uploading..." : "Click to upload images"}
        </span>

        <span className="text-xs text-[#94A3B8]">
          You can select multiple images
        </span>
      </button>

      {error && (
        <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {error}
        </p>
      )}

      {gallery.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((item, index) => (
            <div
              key={item.path}
              className="overflow-hidden rounded-xl border border-[#E2E8F0] bg-white"
            >
              <div className="relative aspect-video bg-[#F1F5F9]">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="h-full w-full object-cover"
                />

                <button
                  type="button"
                  onClick={() => onRemove(item)}
                  aria-label="Remove image"
                  className="absolute right-2 top-2 rounded-lg bg-white p-2 text-red-600 shadow hover:bg-red-50"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="p-3">
                <label className="mb-1 block text-xs font-medium text-[#64748B]">
                  Image {index + 1} — Alt Text
                </label>

                <input
                  value={item.alt}
                  onChange={(event) =>
                    onChange(
                      gallery.map((current, i) =>
                        i === index
                          ? { ...current, alt: event.target.value }
                          : current
                      )
                    )
                  }
                  placeholder="Describe this image"
                  className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm outline-none focus:border-[#2563EB]"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
