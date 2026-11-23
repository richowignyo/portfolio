
"use client";

import {
  useEffect,
  useId,
  useState,
  type ReactNode,
  type FormEvent,
} from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Upload,
  X,
  Save,
} from "lucide-react";

import {
  createProject,
  updateProject,
  type ProjectPayload,
  type ProjectSectionPayload,
} from "@/app/admin/(protected)/projects/actions";

import { createClient } from "@/lib/supabase/client";
import ProjectSectionBuilder from "./ProjectSectionBuilder";

type ProjectInitialData = ProjectPayload & {
  id: string;
};

type ProjectFormProps = {
  mode: "create" | "edit";
  initialData?: ProjectInitialData;
};

type SectionFormData = ProjectSectionPayload & {
  localId: string;
};

const inputClass =
  "w-full rounded-lg border border-[#E2E8F0] bg-white px-4 py-3 text-sm text-[#0B1F3A] outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100";

const labelClass =
  "mb-2 block text-sm font-medium text-[#334155]";

const buttonSecondaryClass =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-[#E2E8F0] bg-white px-4 py-2.5 text-sm font-medium text-[#334155] transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function createUniqueSectionKey(
  value: string,
  usedKeys: Set<string>,
  fallback: string
) {
  const baseKey = slugify(value) || fallback;

  let uniqueKey = baseKey;
  let suffix = 2;

  while (usedKeys.has(uniqueKey.toLowerCase())) {
    uniqueKey = `${baseKey}-${suffix}`;
    suffix += 1;
  }

  // Key akan dimasukkan ke Set oleh handleSubmit
  // setelah validasi duplikat selesai.
  return uniqueKey;
}

function createEmptySection(order: number): SectionFormData {
  return {
    localId: crypto.randomUUID(),
    section_key: `section-${order + 1}`,
    title: "",
    subtitle: "",
    section_type: "content",
    content: [],
    display_order: order,
    is_visible: true,
  };
}

function FormSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-xl border border-[#E2E8F0] bg-white">
      <div className="border-b border-[#E2E8F0] px-6 py-5">
        <h2 className="font-semibold text-[#0B1F3A]">
          {title}
        </h2>

        {description && (
          <p className="mt-1 text-sm text-[#64748B]">
            {description}
          </p>
        )}
      </div>

      <div className="space-y-5 p-6">
        {children}
      </div>
    </section>
  );
}

function Field({
  label,
  children,
  required = false,
  hint,
}: {
  label: string;
  children: ReactNode;
  required?: boolean;
  hint?: string;
}) {
  const id = useId();

  return (
    <div>
      <label
        htmlFor={id}
        className={labelClass}
      >
        {label}{" "}
        {required && (
          <span className="text-red-500">*</span>
        )}
      </label>

      <div data-field-control={id}>
        {children}
      </div>

      {hint && (
        <p className="mt-1.5 text-xs text-[#94A3B8]">
          {hint}
        </p>
      )}
    </div>
  );
}

export default function ProjectForm({
  mode,
  initialData,
}: ProjectFormProps) {
  const router = useRouter();
  const supabase = createClient();

  // ==========================================
  // BASIC INFORMATION
  // ==========================================

  const [title, setTitle] = useState(
    initialData?.title ?? ""
  );

  const [slug, setSlug] = useState(
    initialData?.slug ?? ""
  );

  const [slugManuallyEdited, setSlugManuallyEdited] =
    useState(Boolean(initialData?.slug));

  const [category, setCategory] = useState(
    initialData?.category ?? ""
  );

  const [projectType, setProjectType] = useState(
    initialData?.project_type ?? ""
  );

  const [shortDescription, setShortDescription] =
    useState(initialData?.short_description ?? "");

  // ==========================================
  // PROJECT DETAILS
  // ==========================================

  const [startDate, setStartDate] = useState(
    initialData?.start_date ?? ""
  );

  const [endDate, setEndDate] = useState(
    initialData?.end_date ?? ""
  );

  const [role, setRole] = useState(
    initialData?.role ?? ""
  );

  const [overview, setOverview] = useState(
    initialData?.overview ?? ""
  );

  // ==========================================
  // TECH STACK
  // ==========================================

  const [techStack, setTechStack] = useState<string[]>(
    initialData?.tech_stack ?? []
  );

  const [newTechnology, setNewTechnology] = useState("");

  // ==========================================
  // THUMBNAIL
  // ==========================================

  const [thumbnailPath, setThumbnailPath] = useState(
    initialData?.thumbnail_path ?? ""
  );

  const [originalThumbnailPath] = useState(
    initialData?.thumbnail_path ?? ""
  );

  const [newUploadPaths, setNewUploadPaths] = useState<
    string[]
  >([]);

  const [thumbnailUploading, setThumbnailUploading] =
    useState(false);

  // ==========================================
  // PROJECT LINKS
  // ==========================================

  const [repositoryUrl, setRepositoryUrl] = useState(
    initialData?.repository_url ?? ""
  );

  const [demoUrl, setDemoUrl] = useState(
    initialData?.demo_url ?? ""
  );

  // ==========================================
  // PROJECT SECTIONS
  // ==========================================

  const [sections, setSections] = useState<
    SectionFormData[]
  >(
    (initialData?.sections ?? []).map(
      (section, index) => ({
        ...section,
        localId: crypto.randomUUID(),
        display_order: section.display_order ?? index,
        content: section.content ?? [],
      })
    )
  );

  // ==========================================
  // PUBLISHING SETTINGS
  // ==========================================

  const [displayOrder, setDisplayOrder] = useState(
    initialData?.display_order ?? 0
  );

  const [status, setStatus] = useState<
    "draft" | "published"
  >(initialData?.status ?? "draft");

  // ==========================================
  // FORM STATE
  // ==========================================

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // ==========================================
  // AUTO GENERATE SLUG
  // ==========================================

  useEffect(() => {
    if (!slugManuallyEdited) {
      setSlug(slugify(title));
    }
  }, [title, slugManuallyEdited]);

  // ==========================================
  // TECH STACK HANDLERS
  // ==========================================

  function addTechnology() {
    const value = newTechnology.trim();

    if (!value) return;

    const alreadyExists = techStack.some(
      (item) =>
        item.toLowerCase() === value.toLowerCase()
    );

    if (alreadyExists) {
      setNewTechnology("");
      return;
    }

    setTechStack((current) => [...current, value]);
    setNewTechnology("");
  }

  function removeTechnology(index: number) {
    setTechStack((current) =>
      current.filter((_, i) => i !== index)
    );
  }

  // ==========================================
  // SECTION HANDLERS
  // ==========================================

  function handleSectionsChange(
    updatedSections: SectionFormData[]
  ) {
    setSections(updatedSections);
  }

  // ==========================================
  // THUMBNAIL UPLOAD
  // ==========================================

  async function uploadThumbnail(file: File) {
    setError("");

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError(
        "Thumbnail harus berupa file JPG, PNG, atau WebP."
      );
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Ukuran thumbnail maksimal 10 MB.");
      return;
    }

    setThumbnailUploading(true);

    try {
      const extension =
        file.name.split(".").pop()?.toLowerCase() || "jpg";

      const folder = initialData?.id ?? "pending";

      const path = `projects/${folder}/${crypto.randomUUID()}.${extension}`;

      const { error: uploadError } = await supabase.storage
        .from("portfolio-media")
        .upload(path, file, {
          cacheControl: "3600",
          upsert: false,
          contentType: file.type,
        });

      if (uploadError) {
        throw uploadError;
      }

      setNewUploadPaths((current) => [
        ...current,
        path,
      ]);

      setThumbnailPath(path);
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Gagal mengunggah thumbnail."
      );
    } finally {
      setThumbnailUploading(false);
    }
  }

  // ==========================================
  // REMOVE NEW UPLOADS
  // ==========================================

  async function removeNewUploads() {
    if (newUploadPaths.length === 0) return;

    const { error: removeError } = await supabase.storage
      .from("portfolio-media")
      .remove(newUploadPaths);

    if (removeError) {
      console.error(
        "Failed to remove temporary uploads:",
        removeError
      );
      return;
    }

    setNewUploadPaths([]);
  }

  // ==========================================
  // CANCEL FORM
  // ==========================================

  async function handleCancel() {
    if (saving || thumbnailUploading) return;

    await removeNewUploads();

    router.push("/admin/projects");
  }

  // ==========================================
  // SUBMIT FORM
  // ==========================================

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (saving || thumbnailUploading) return;

    setError("");
    setSuccessMessage("");

    // ==========================================
    // BASIC VALIDATION
    // ==========================================

    if (!title.trim()) {
      setError("Judul project wajib diisi.");
      return;
    }

    if (!slug.trim()) {
      setError("Slug project wajib diisi.");
      return;
    }

    if (startDate && endDate && endDate < startDate) {
      setError(
        "Tanggal selesai tidak boleh lebih awal dari tanggal mulai."
      );
      return;
    }

    const normalizedSlug = slugify(slug);

    if (!normalizedSlug) {
      setError("Slug project tidak valid.");
      return;
    }

    // ==========================================
    // SECTION KEY VALIDATION
    // ==========================================

    const usedSectionKeys = new Set<string>();

    const normalizedSections: ProjectSectionPayload[] = [];

    for (let index = 0; index < sections.length; index++) {
      const section = sections[index];

      const originalKey = section.section_key?.trim() ?? "";

      const normalizedKey = originalKey
        ? slugify(originalKey)
        : "";

      const fallbackKey = `section-${index + 1}`;

      const sectionKey = normalizedKey
        ? normalizedKey
        : createUniqueSectionKey(
            fallbackKey,
            usedSectionKeys,
            fallbackKey
          );

      const normalizedComparisonKey = sectionKey.toLowerCase();

      if (usedSectionKeys.has(normalizedComparisonKey)) {
        const sectionName =
          section.title.trim() || `Section ${index + 1}`;

        setError(
          `Section key "${sectionKey}" digunakan lebih dari satu kali. Periksa section "${sectionName}" dan pastikan setiap section memiliki key yang berbeda.`
        );

        return;
      }

      usedSectionKeys.add(normalizedComparisonKey);

      normalizedSections.push({
        section_key: sectionKey,

        title: section.title.trim(),

        subtitle: section.subtitle.trim(),

        section_type: section.section_type || "content",

        // Keep structured JSON content unchanged.
        content: section.content,

        display_order: index,

        is_visible: section.is_visible,
      });
    }

    // ==========================================
    // PREPARE PAYLOAD
    // ==========================================

    const payload: ProjectPayload = {
      title: title.trim(),

      slug: normalizedSlug,

      category: category.trim(),

      short_description: shortDescription.trim(),

      project_type: projectType.trim(),

      start_date: startDate,

      end_date: endDate || null,

      role: role.trim(),

      overview: overview.trim(),

      tech_stack: techStack.filter(Boolean),

      thumbnail_path: thumbnailPath,

      repository_url: repositoryUrl.trim(),

      demo_url: demoUrl.trim(),

      display_order: Math.max(
        0,
        Number(displayOrder) || 0
      ),

      status,

      sections: normalizedSections,
    };

    setSaving(true);

    try {
      const result =
        mode === "edit" && initialData
          ? await updateProject(initialData.id, payload)
          : await createProject(payload);

      // ==========================================
      // HANDLE SERVER ACTION RESULT
      // ==========================================

      if (!result?.success) {
        setError(
          result?.error ||
            "Project gagal disimpan. Silakan coba kembali."
        );
        return;
      }

      // ==========================================
      // REMOVE OLD THUMBNAIL IF REPLACED
      // ==========================================

      if (
        originalThumbnailPath &&
        originalThumbnailPath !== thumbnailPath &&
        !originalThumbnailPath.startsWith("http")
      ) {
        const { error: removeError } = await supabase.storage
          .from("portfolio-media")
          .remove([originalThumbnailPath]);

        if (removeError) {
          console.error(
            "Failed to remove previous thumbnail:",
            removeError
          );
        }
      }

      // ==========================================
      // UPLOADS ARE NOW ASSOCIATED WITH THE PROJECT
      // ==========================================

      setNewUploadPaths([]);

      setSuccessMessage(
        mode === "edit"
          ? "Project berhasil diperbarui."
          : "Project berhasil ditambahkan."
      );

      router.push("/admin/projects");
    } catch (submitError) {
      console.error("Project submission error:", submitError);

      setError(
        submitError instanceof Error
          ? submitError.message
          : "Terjadi kesalahan saat menyimpan project."
      );
    } finally {
      setSaving(false);
    }
  }

  // ==========================================
  // THUMBNAIL PREVIEW URL
  // ==========================================

  const thumbnailUrl = thumbnailPath
    ? thumbnailPath.startsWith("http")
      ? thumbnailPath
      : supabase.storage
          .from("portfolio-media")
          .getPublicUrl(thumbnailPath).data.publicUrl
    : "";

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* HEADER */}

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <button
            type="button"
            onClick={handleCancel}
            disabled={saving || thumbnailUploading}
            className="mb-3 inline-flex items-center gap-2 text-sm text-[#64748B] transition hover:text-[#2563EB] disabled:opacity-50"
          >
            <ArrowLeft size={16} />
            Back to Projects
          </button>

          <h1 className="text-2xl font-bold text-[#0B1F3A]">
            {mode === "edit"
              ? "Edit Project"
              : "Add New Project"}
          </h1>

          <p className="mt-1 text-sm text-[#64748B]">
            {mode === "edit"
              ? "Update project information and content."
              : "Add a new project to your portfolio."}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleCancel}
            className={buttonSecondaryClass}
            disabled={saving || thumbnailUploading}
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving || thumbnailUploading}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save size={16} />

            {saving ? "Saving..." : "Save Project"}
          </button>
        </div>
      </div>

      {/* ERROR MESSAGE */}

      {error && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      {successMessage && (
        <div
          role="status"
          className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
        >
          {successMessage}
        </div>
      )}

      {/* BASIC INFORMATION */}

      <FormSection
        title="Basic Information"
        description="Main information displayed on your portfolio project."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Project Title" required>
            <input
              id="project-title"
              name="title"
              className={inputClass}
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
              placeholder="e.g. Retail Sales Inventory Intelligence"
              required
            />
          </Field>

          <Field
            label="Project Slug"
            required
            hint="Used in the project URL. Example: retail-sales-inventory-intelligence"
          >
            <input
              id="project-slug"
              name="slug"
              className={inputClass}
              value={slug}
              onChange={(event) => {
                setSlugManuallyEdited(true);
                setSlug(slugify(event.target.value));
              }}
              placeholder="project-slug"
              required
            />
          </Field>

          <Field label="Category">
            <input
              id="project-category"
              name="category"
              className={inputClass}
              value={category}
              onChange={(event) =>
                setCategory(event.target.value)
              }
              placeholder="e.g. Data Analytics"
            />
          </Field>

          <Field label="Project Type">
            <input
              id="project-type"
              name="project_type"
              className={inputClass}
              value={projectType}
              onChange={(event) =>
                setProjectType(event.target.value)
              }
              placeholder="e.g. Academic Project, Personal Project"
            />
          </Field>
        </div>

        <Field label="Short Description">
          <textarea
            id="short-description"
            name="short_description"
            className={inputClass}
            rows={3}
            value={shortDescription}
            onChange={(event) =>
              setShortDescription(event.target.value)
            }
            placeholder="A concise description of this project..."
          />
        </Field>
      </FormSection>

      {/* PROJECT DETAILS */}

      <FormSection
        title="Project Details"
        description="Project timeline, your contribution, and a more detailed overview."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Start Date">
            <input
              id="start-date"
              name="start_date"
              type="date"
              className={inputClass}
              value={startDate}
              onChange={(event) =>
                setStartDate(event.target.value)
              }
            />
          </Field>

          <Field
            label="End Date"
            hint="Leave empty if the project is ongoing."
          >
            <input
              id="end-date"
              name="end_date"
              type="date"
              className={inputClass}
              value={endDate}
              onChange={(event) =>
                setEndDate(event.target.value)
              }
            />
          </Field>

          <div className="md:col-span-2">
            <Field label="Your Role">
              <input
                id="project-role"
                name="role"
                className={inputClass}
                value={role}
                onChange={(event) =>
                  setRole(event.target.value)
                }
                placeholder="e.g. Data Analyst / Project Lead"
              />
            </Field>
          </div>
        </div>

        <Field label="Project Overview">
          <textarea
            id="project-overview"
            name="overview"
            className={inputClass}
            rows={6}
            value={overview}
            onChange={(event) =>
              setOverview(event.target.value)
            }
            placeholder="Explain the background, objectives, and scope of this project..."
          />
        </Field>
      </FormSection>

      {/* TECHNOLOGIES & TOOLS */}

      <FormSection
        title="Technologies & Tools"
        description="Add the tools, programming languages, and technologies used."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            id="new-technology"
            name="new_technology"
            className={inputClass}
            value={newTechnology}
            onChange={(event) =>
              setNewTechnology(event.target.value)
            }
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                addTechnology();
              }
            }}
            placeholder="e.g. Python, SQL, Power BI"
          />

          <button
            type="button"
            onClick={addTechnology}
            className={buttonSecondaryClass}
          >
            <Plus size={16} />
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {techStack.map((technology, index) => (
            <span
              key={`${technology}-${index}`}
              className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-2 text-sm font-medium text-[#2563EB]"
            >
              {technology}

              <button
                type="button"
                onClick={() => removeTechnology(index)}
                className="rounded-full hover:text-red-600"
                aria-label={`Remove ${technology}`}
              >
                <X size={14} />
              </button>
            </span>
          ))}

          {techStack.length === 0 && (
            <p className="text-sm text-[#94A3B8]">
              No technologies added yet.
            </p>
          )}
        </div>
      </FormSection>

      {/* PROJECT THUMBNAIL */}

      <FormSection
        title="Project Thumbnail"
        description="Upload a cover image for this project. Supported formats: JPG, PNG, WebP. Maximum 10 MB."
      >
        {thumbnailUrl && (
          <div className="relative max-w-md overflow-hidden rounded-xl border border-[#E2E8F0]">
            <img
              src={thumbnailUrl}
              alt="Project thumbnail preview"
              className="aspect-video w-full object-cover"
            />

            <button
              type="button"
              onClick={() => setThumbnailPath("")}
              className="absolute right-3 top-3 rounded-lg bg-white p-2 text-red-600 shadow transition hover:bg-red-50"
              aria-label="Remove thumbnail"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}

        {!thumbnailUrl && (
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#CBD5E1] bg-slate-50 px-6 py-10 text-center transition hover:border-[#2563EB] hover:bg-blue-50">
            <Upload
              size={28}
              className="mb-3 text-[#64748B]"
            />

            <span className="text-sm font-semibold text-[#334155]">
              {thumbnailUploading
                ? "Uploading thumbnail..."
                : "Click to upload thumbnail"}
            </span>

            <span className="mt-1 text-xs text-[#94A3B8]">
              JPG, PNG, or WebP up to 10 MB
            </span>

            <input
              id="project-thumbnail"
              name="thumbnail"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              disabled={thumbnailUploading}
              onChange={(event) => {
                const file = event.target.files?.[0];

                if (file) {
                  void uploadThumbnail(file);
                }

                event.target.value = "";
              }}
            />
          </label>
        )}
      </FormSection>

      {/* PROJECT LINKS */}

      <FormSection
        title="Project Links"
        description="Optional links to the source code and live project."
      >
        <Field label="Repository URL">
          <input
            id="repository-url"
            name="repository_url"
            type="url"
            className={inputClass}
            value={repositoryUrl}
            onChange={(event) =>
              setRepositoryUrl(event.target.value)
            }
            placeholder="https://github.com/username/repository"
          />
        </Field>

        <Field label="Live Demo URL">
          <input
            id="demo-url"
            name="demo_url"
            type="url"
            className={inputClass}
            value={demoUrl}
            onChange={(event) =>
              setDemoUrl(event.target.value)
            }
            placeholder="https://your-project.vercel.app"
          />
        </Field>
      </FormSection>

      {/* PROJECT SECTION BUILDER */}

      <FormSection
        title="Project Sections"
        description="Build detailed project content using text, images, tables, metrics, lists, callouts, and links."
      >
        <ProjectSectionBuilder
          sections={sections}
          onChange={handleSectionsChange}
          projectId={initialData?.id}
        />
      </FormSection>

      {/* PUBLISHING SETTINGS */}

      <FormSection
        title="Publishing Settings"
        description="Control the display order and publication status of this project."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <Field
            label="Display Order"
            hint="Lower numbers appear first."
          >
            <input
              id="display-order"
              name="display_order"
              type="number"
              min="0"
              className={inputClass}
              value={displayOrder}
              onChange={(event) =>
                setDisplayOrder(Number(event.target.value))
              }
            />
          </Field>

          <Field label="Publication Status">
            <select
              id="publication-status"
              name="status"
              className={inputClass}
              value={status}
              onChange={(event) =>
                setStatus(
                  event.target.value as "draft" | "published"
                )
              }
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </Field>
        </div>

        <div
          className={`rounded-lg border px-4 py-3 text-sm ${
            status === "published"
              ? "border-green-200 bg-green-50 text-green-700"
              : "border-amber-200 bg-amber-50 text-amber-700"
          }`}
        >
          {status === "published"
            ? "This project will be marked as published when saved."
            : "This project will remain a draft and will not be publicly displayed."}
        </div>
      </FormSection>

      {/* FORM ACTIONS */}

      <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
        <button
          type="button"
          onClick={handleCancel}
          className={buttonSecondaryClass}
          disabled={saving || thumbnailUploading}
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={saving || thumbnailUploading}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Save size={16} />

          {saving ? "Saving Project..." : "Save Project"}
        </button>
      </div>
    </form>
  );
}
