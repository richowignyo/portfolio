
"use client";

import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Trash2,
  Save,
  Send,
  LoaderCircle,
  ImagePlus,
  X,
  Image as ImageIcon,
} from "lucide-react";

import {
  createExperience,
  updateExperience,
  type ExperiencePayload,
  type ExperienceGalleryItem,
} from "@/app/admin/(protected)/experience/actions";

import { createClient } from "@/lib/supabase/client";

const inputClass =
  "w-full rounded-lg border border-[#E2E8F0] bg-white px-4 py-3 text-sm text-[#0B1F3A] outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100";

const labelClass =
  "mb-2 block text-sm font-medium text-[#334155]";

const MAX_IMAGE_SIZE = 10 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

type Metric = {
  value: string;
  label: string;
};

type ExperienceInitialData = Partial<ExperiencePayload> & {
  id: string;
};

type ExperienceFormProps = {
  initialData?: ExperienceInitialData;
};

export default function ExperienceForm({
  initialData,
}: ExperienceFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Supabase
  const supabase = createClient();

  // 01. Basic Information
  const [company, setCompany] = useState(
    initialData?.company ?? ""
  );

  const [position, setPosition] = useState(
    initialData?.position ?? ""
  );

  const [employmentType, setEmploymentType] = useState(
    initialData?.employment_type ?? "Internship"
  );

  const [location, setLocation] = useState(
    initialData?.location ?? ""
  );

  // 02. Employment Period
  const [startDate, setStartDate] = useState(
    initialData?.start_date ?? ""
  );

  const [endDate, setEndDate] = useState(
    initialData?.end_date ?? ""
  );

  const [isCurrent, setIsCurrent] = useState(
    initialData?.is_current ?? false
  );

  // 03. Experience Details
  const [summary, setSummary] = useState(
    initialData?.summary ?? ""
  );

  const [responsibilities, setResponsibilities] = useState<string[]>(
    initialData?.responsibilities?.length
      ? initialData.responsibilities
      : [""]
  );

  const [achievements, setAchievements] = useState<string[]>(
    initialData?.achievements?.length
      ? initialData.achievements
      : [""]
  );

  // 04. Metrics
  const [metrics, setMetrics] = useState<Metric[]>(
    initialData?.metrics?.length
      ? initialData.metrics
      : [{ value: "", label: "" }]
  );

  // 05. Technologies
  const [techStack, setTechStack] = useState<string[]>(
    initialData?.tech_stack?.length
      ? initialData.tech_stack
      : [""]
  );

  // 06. Gallery
  const [gallery, setGallery] = useState<ExperienceGalleryItem[]>(
    initialData?.gallery ?? []
  );

  // Track files uploaded during this editing session.
  // This allows cleanup if the user cancels the form.
  const [newlyUploadedPaths, setNewlyUploadedPaths] = useState<
    string[]
  >([]);

  // Existing or newly uploaded images removed from the gallery.
  // They are deleted from Storage only after a successful save.
  const [removedGallery, setRemovedGallery] = useState<
    ExperienceGalleryItem[]
  >([]);

  const [uploadingGallery, setUploadingGallery] = useState(false);

  // 07. Case Study & Evidence
  const [caseStudySlug, setCaseStudySlug] = useState(
    initialData?.case_study_slug ?? ""
  );

  const [evidenceUrl, setEvidenceUrl] = useState(
    initialData?.evidence_url ?? ""
  );

  const [evidenceLabel, setEvidenceLabel] = useState(
    initialData?.evidence_label ?? ""
  );

  const [confidentialityNote, setConfidentialityNote] = useState(
    initialData?.confidentiality_note ?? ""
  );

  // 08. Publishing
  const [displayOrder, setDisplayOrder] = useState(
    initialData?.display_order ?? 0
  );

  const [status, setStatus] = useState<"draft" | "published">(
    initialData?.status ?? "draft"
  );

  // Submission
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // --------------------------------------------------
  // Dynamic list helper
  // --------------------------------------------------

  function updateList(
    values: string[],
    setter: (values: string[]) => void,
    index: number,
    newValue: string
  ) {
    setter(
      values.map((item, i) =>
        i === index ? newValue : item
      )
    );
  }

  // --------------------------------------------------
  // Gallery upload
  // --------------------------------------------------

  async function handleGalleryUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const files = Array.from(event.target.files ?? []);

    // Allow selecting the same file again later.
    event.target.value = "";

    if (files.length === 0) return;

    setErrorMessage("");
    setUploadingGallery(true);

    const uploadedItems: ExperienceGalleryItem[] = [];
    const uploadedPaths: string[] = [];

    try {
      for (const file of files) {
        if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
          throw new Error(
            `${file.name}: only JPG, PNG, and WebP images are allowed.`
          );
        }

        if (file.size > MAX_IMAGE_SIZE) {
          throw new Error(
            `${file.name}: image size must not exceed 10 MB.`
          );
        }

        const extension =
          file.type === "image/jpeg"
            ? "jpg"
            : file.type === "image/png"
              ? "png"
              : "webp";

        const folderId = initialData?.id ?? "pending";

        const filePath =
          `experience/${folderId}/${crypto.randomUUID()}.${extension}`;

        const { error: uploadError } = await supabase.storage
          .from("portfolio-media")
          .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false,
            contentType: file.type,
          });

        if (uploadError) {
          throw new Error(
            `Failed to upload ${file.name}: ${uploadError.message}`
          );
        }

        uploadedPaths.push(filePath);

        const { data } = supabase.storage
          .from("portfolio-media")
          .getPublicUrl(filePath);

        uploadedItems.push({
          src: data.publicUrl,
          path: filePath,
          alt: file.name.replace(/\.[^/.]+$/, ""),
        });
      }

      setGallery((current) => [
        ...current,
        ...uploadedItems,
      ]);

      setNewlyUploadedPaths((current) => [
        ...current,
        ...uploadedPaths,
      ]);
    } catch (error) {
      // Remove files uploaded in this batch if another upload fails.
      if (uploadedPaths.length > 0) {
        const { error: cleanupError } = await supabase.storage
          .from("portfolio-media")
          .remove(uploadedPaths);

        if (cleanupError) {
          console.error(
            "Gallery upload cleanup error:",
            cleanupError
          );
        }
      }

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to upload gallery images."
      );
    } finally {
      setUploadingGallery(false);
    }
  }

  // --------------------------------------------------
  // Remove gallery image
  // --------------------------------------------------

  function handleRemoveGalleryImage(
    item: ExperienceGalleryItem
  ) {
    setGallery((current) =>
      current.filter((image) => image.path !== item.path)
    );

    setRemovedGallery((current) => {
      if (current.some((image) => image.path === item.path)) {
        return current;
      }

      return [...current, item];
    });
  }

  // --------------------------------------------------
  // Storage cleanup
  // --------------------------------------------------

  async function removeStorageFiles(paths: string[]) {
    const uniquePaths = Array.from(new Set(paths)).filter(Boolean);

    if (uniquePaths.length === 0) return;

    const { error } = await supabase.storage
      .from("portfolio-media")
      .remove(uniquePaths);

    if (error) {
      console.error("Storage cleanup error:", error);
    }
  }

  // --------------------------------------------------
  // Cancel form
  // --------------------------------------------------

  async function handleCancel() {
    if (loading || uploadingGallery) return;

    if (newlyUploadedPaths.length > 0) {
      await removeStorageFiles(newlyUploadedPaths);
    }

    router.push("/admin/experience");
  }

  // --------------------------------------------------
  // Submit form
  // --------------------------------------------------

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setErrorMessage("");

    if (uploadingGallery) {
      setErrorMessage(
        "Please wait until all gallery images finish uploading."
      );
      return;
    }

    if (!company.trim() || !position.trim() || !startDate) {
      setErrorMessage(
        "Company, position, and start date are required."
      );
      return;
    }

    if (!isCurrent && endDate && endDate < startDate) {
      setErrorMessage(
        "End date cannot be earlier than start date."
      );
      return;
    }

    if (
      metrics.some(
        (metric) =>
          (metric.value.trim() && !metric.label.trim()) ||
          (!metric.value.trim() && metric.label.trim())
      )
    ) {
      setErrorMessage(
        "Please complete both value and label for each metric."
      );
      return;
    }

    setLoading(true);

    const payload: ExperiencePayload = {
      company: company.trim(),
      position: position.trim(),
      employment_type: employmentType,
      location: location.trim(),

      start_date: startDate,
      end_date: isCurrent || !endDate ? null : endDate,
      is_current: isCurrent,

      summary: summary.trim(),

      responsibilities: responsibilities
        .map((item) => item.trim())
        .filter(Boolean),

      achievements: achievements
        .map((item) => item.trim())
        .filter(Boolean),

      tech_stack: techStack
        .map((item) => item.trim())
        .filter(Boolean),

      metrics: metrics.filter(
        (item) =>
          item.value.trim() && item.label.trim()
      ),

      gallery,

      case_study_slug: caseStudySlug.trim(),
      evidence_url: evidenceUrl.trim(),
      evidence_label: evidenceLabel.trim(),
      confidentiality_note: confidentialityNote.trim(),

      display_order: displayOrder,
      status,
    };

    try {
      const result = initialData?.id
        ? await updateExperience(initialData.id, payload)
        : await createExperience(payload);

      if (!result.success) {
        setErrorMessage(
          result.error || "Failed to save experience."
        );
        setLoading(false);
        return;
      }

      // Delete removed images only after database save succeeds.
      const removedPaths = removedGallery.map(
        (item) => item.path
      );

      if (removedPaths.length > 0) {
        await removeStorageFiles(removedPaths);
      }

      router.push("/admin/experience");
      router.refresh();
    } catch (error) {
      console.error("Experience submission error:", error);

      setErrorMessage(
        "An unexpected error occurred. Please try again."
      );

      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* ================================================
          01. BASIC INFORMATION
      ================================================= */}

      <FormSection
        number="01"
        title="Basic Information"
        description="Enter the company and position details."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Company Name *">
            <input
              className={inputClass}
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. PT BFI Finance Indonesia Tbk."
              required
            />
          </Field>

          <Field label="Position *">
            <input
              className={inputClass}
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              placeholder="e.g. Business Intelligence Intern"
              required
            />
          </Field>

          <Field label="Employment Type">
            <select
              className={inputClass}
              value={employmentType}
              onChange={(e) =>
                setEmploymentType(e.target.value)
              }
            >
              <option value="Internship">Internship</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Freelance">Freelance</option>
              <option value="Apprenticeship">Apprenticeship</option>
              <option value="Other">Other</option>
            </select>
          </Field>

          <Field label="Location">
            <input
              className={inputClass}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Tangerang Selatan"
            />
          </Field>
        </div>
      </FormSection>

      {/* ================================================
          02. EMPLOYMENT PERIOD
      ================================================= */}

      <FormSection
        number="02"
        title="Employment Period"
        description="Specify the duration of this experience."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Start Date *">
            <input
              type="date"
              className={inputClass}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </Field>

          <Field label="End Date">
            <input
              type="date"
              className={inputClass}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              disabled={isCurrent}
              min={startDate || undefined}
            />
          </Field>
        </div>

        <label className="flex items-center gap-3 text-sm text-[#334155]">
          <input
            type="checkbox"
            checked={isCurrent}
            onChange={(e) => {
              setIsCurrent(e.target.checked);

              if (e.target.checked) {
                setEndDate("");
              }
            }}
            className="h-4 w-4 accent-[#2563EB]"
          />

          I currently work here
        </label>
      </FormSection>

      {/* ================================================
          03. EXPERIENCE DETAILS
      ================================================= */}

      <FormSection
        number="03"
        title="Experience Details"
        description="Describe your role, contributions, and accomplishments."
      >
        <Field label="Professional Summary">
          <textarea
            className={inputClass}
            rows={4}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Write a brief overview of your experience..."
          />
        </Field>

        <DynamicList
          title="Responsibilities"
          description="Your main tasks and responsibilities."
          values={responsibilities}
          onChange={setResponsibilities}
          placeholder="Describe a responsibility..."
        />

        <DynamicList
          title="Key Achievements"
          description="Results and accomplishments."
          values={achievements}
          onChange={setAchievements}
          placeholder="Describe an achievement..."
        />
      </FormSection>

      {/* ================================================
          04. METRICS
      ================================================= */}

      <FormSection
        number="04"
        title="Key Results & Metrics"
        description="Add measurable outcomes such as RMSE, MAE, and MAPE."
      >
        <div className="space-y-3">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="grid gap-3 rounded-lg bg-[#F8FAFC] p-3 md:grid-cols-[1fr_1fr_auto]"
            >
              <input
                className={inputClass}
                value={metric.value}
                onChange={(e) =>
                  setMetrics((items) =>
                    items.map((item, i) =>
                      i === index
                        ? { ...item, value: e.target.value }
                        : item
                    )
                  )
                }
                placeholder="e.g. 13.23%"
              />

              <input
                className={inputClass}
                value={metric.label}
                onChange={(e) =>
                  setMetrics((items) =>
                    items.map((item, i) =>
                      i === index
                        ? { ...item, label: e.target.value }
                        : item
                    )
                  )
                }
                placeholder="e.g. MAPE"
              />

              <button
                type="button"
                onClick={() =>
                  setMetrics((items) =>
                    items.filter((_, i) => i !== index)
                  )
                }
                aria-label="Remove metric"
                className="rounded-lg border border-[#E2E8F0] px-3 text-[#64748B] hover:text-red-600"
              >
                <Trash2 size={17} />
              </button>
            </div>
          ))}
        </div>

        <AddButton
          onClick={() =>
            setMetrics((items) => [
              ...items,
              { value: "", label: "" },
            ])
          }
        >
          Add Metric
        </AddButton>
      </FormSection>

      {/* ================================================
          05. TECHNOLOGIES
      ================================================= */}

      <FormSection
        number="05"
        title="Technologies & Tools"
        description="List the technologies and tools used."
      >
        <DynamicList
          title="Tech Stack"
          values={techStack}
          onChange={setTechStack}
          placeholder="e.g. Python, SQL, XGBoost"
        />
      </FormSection>

      {/* ================================================
          06. GALLERY
      ================================================= */}

      <FormSection
        number="06"
        title="Experience Gallery"
        description="Upload images to document this professional experience."
      >
        <div className="space-y-4">
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              onChange={handleGalleryUpload}
              className="hidden"
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadingGallery || loading}
              className="inline-flex items-center gap-2 rounded-lg border border-dashed border-[#94A3B8] bg-[#F8FAFC] px-5 py-4 text-sm font-semibold text-[#2563EB] transition hover:border-[#2563EB] hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {uploadingGallery ? (
                <LoaderCircle
                  size={18}
                  className="animate-spin"
                />
              ) : (
                <ImagePlus size={18} />
              )}

              {uploadingGallery
                ? "Uploading images..."
                : "Upload Gallery Images"}
            </button>

            <p className="mt-2 text-xs text-[#94A3B8]">
              JPG, PNG, or WebP. Maximum 10 MB per image.
            </p>
          </div>

          {gallery.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {gallery.map((item) => (
                <div
                  key={item.path}
                  className="group relative overflow-hidden rounded-xl border border-[#E2E8F0] bg-[#F8FAFC]"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-2 p-3">
                    <p className="truncate text-xs text-[#64748B]">
                      {item.alt}
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveGalleryImage(item)
                      }
                      disabled={loading}
                      aria-label="Remove gallery image"
                      className="shrink-0 rounded-md p-1.5 text-[#64748B] transition hover:bg-red-50 hover:text-red-600"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[#E2E8F0] bg-[#F8FAFC] px-6 py-10 text-center">
              <ImageIcon
                size={32}
                className="mb-3 text-[#94A3B8]"
              />

              <p className="text-sm font-medium text-[#475569]">
                No gallery images yet
              </p>

              <p className="mt-1 text-xs text-[#94A3B8]">
                Uploaded images will appear here.
              </p>
            </div>
          )}
        </div>
      </FormSection>

      {/* ================================================
          07. CASE STUDY & EVIDENCE
      ================================================= */}

      <FormSection
        number="07"
        title="Case Study & Evidence"
        description="Connect this experience with supporting projects and documents."
      >
        <Field label="Case Study Slug">
          <input
            className={inputClass}
            value={caseStudySlug}
            onChange={(e) =>
              setCaseStudySlug(e.target.value)
            }
            placeholder="bfi-finance-business-intelligence"
          />
        </Field>

        <Field label="Evidence URL">
          <input
            type="url"
            className={inputClass}
            value={evidenceUrl}
            onChange={(e) => setEvidenceUrl(e.target.value)}
            placeholder="https://drive.google.com/..."
          />
        </Field>

        <Field label="Evidence Label">
          <input
            className={inputClass}
            value={evidenceLabel}
            onChange={(e) =>
              setEvidenceLabel(e.target.value)
            }
            placeholder="e.g. Project Files"
          />
        </Field>

        <Field label="Confidentiality Notice">
          <textarea
            className={inputClass}
            rows={3}
            value={confidentialityNote}
            onChange={(e) =>
              setConfidentialityNote(e.target.value)
            }
            placeholder="Optional confidentiality notice..."
          />
        </Field>
      </FormSection>

      {/* ================================================
          08. PUBLISHING SETTINGS
      ================================================= */}

      <FormSection
        number="08"
        title="Publishing Settings"
        description="Control visibility and ordering on your portfolio."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Display Order">
            <input
              type="number"
              min="0"
              className={inputClass}
              value={displayOrder}
              onChange={(e) =>
                setDisplayOrder(
                  Math.max(0, Number(e.target.value))
                )
              }
            />

            <p className="mt-2 text-xs text-[#94A3B8]">
              Smaller numbers appear first.
            </p>
          </Field>

          <Field label="Publication Status">
            <select
              className={inputClass}
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target.value as "draft" | "published"
                )
              }
            >
              <option value="draft">Save as Draft</option>
              <option value="published">Published</option>
            </select>
          </Field>
        </div>
      </FormSection>

      {/* ================================================
          ERROR MESSAGE
      ================================================= */}

      {errorMessage && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          {errorMessage}
        </div>
      )}

      {/* ================================================
          FORM ACTIONS
      ================================================= */}

      <div className="flex flex-col-reverse gap-3 border-t border-[#E2E8F0] pt-6 sm:flex-row sm:justify-between">
        <button
          type="button"
          onClick={handleCancel}
          disabled={loading || uploadingGallery}
          className="rounded-lg border border-[#E2E8F0] px-5 py-3 text-sm font-semibold text-[#475569] hover:bg-[#F8FAFC] disabled:opacity-60"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading || uploadingGallery}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
        >
          {loading || uploadingGallery ? (
            <LoaderCircle
              size={17}
              className="animate-spin"
            />
          ) : initialData?.id ? (
            <Save size={17} />
          ) : status === "published" ? (
            <Send size={17} />
          ) : (
            <Save size={17} />
          )}

          {loading
            ? "Saving..."
            : uploadingGallery
              ? "Uploading..."
              : initialData?.id
                ? "Save Changes"
                : status === "published"
                  ? "Publish Experience"
                  : "Save as Draft"}
        </button>
      </div>
    </form>
  );
}

// ======================================================
// FORM SECTION
// ======================================================

function FormSection({
  number,
  title,
  description,
  children,
}: {
  number: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex gap-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-sm font-bold text-[#2563EB]">
          {number}
        </div>

        <div>
          <h2 className="text-lg font-bold text-[#0B1F3A]">
            {title}
          </h2>

          <p className="mt-1 text-sm text-[#64748B]">
            {description}
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {children}
      </div>
    </section>
  );
}

// ======================================================
// FIELD
// ======================================================

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label className={labelClass}>
        {label}
      </label>

      {children}
    </div>
  );
}

// ======================================================
// DYNAMIC LIST
// ======================================================

function DynamicList({
  title,
  description,
  values,
  onChange,
  placeholder,
}: {
  title: string;
  description?: string;
  values: string[];
  onChange: (values: string[]) => void;
  placeholder: string;
}) {
  return (
    <div className="space-y-3">
      <div>
        <label className={labelClass}>
          {title}
        </label>

        {description && (
          <p className="mb-3 text-xs text-[#94A3B8]">
            {description}
          </p>
        )}
      </div>

      {values.map((value, index) => (
        <div
          key={index}
          className="flex gap-2"
        >
          <input
            className={inputClass}
            value={value}
            onChange={(e) =>
              updateDynamicValue(
                values,
                onChange,
                index,
                e.target.value
              )
            }
            placeholder={placeholder}
          />

          <button
            type="button"
            onClick={() =>
              onChange(
                values.filter((_, i) => i !== index)
              )
            }
            aria-label={`Remove ${title} item`}
            className="shrink-0 rounded-lg border border-[#E2E8F0] px-3 text-[#64748B] hover:text-red-600"
          >
            <Trash2 size={17} />
          </button>
        </div>
      ))}

      <AddButton
        onClick={() =>
          onChange([...values, ""])
        }
      >
        Add {title}
      </AddButton>
    </div>
  );
}

// ======================================================
// UPDATE DYNAMIC VALUE
// ======================================================

function updateDynamicValue(
  values: string[],
  onChange: (values: string[]) => void,
  index: number,
  newValue: string
) {
  onChange(
    values.map((item, i) =>
      i === index ? newValue : item
    )
  );
}

// ======================================================
// ADD BUTTON
// ======================================================

function AddButton({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 text-sm font-semibold text-[#2563EB] hover:text-blue-700"
    >
      <Plus size={16} />
      {children}
    </button>
  );
}
