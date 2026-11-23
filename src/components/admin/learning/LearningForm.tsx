"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Plus,
  X,
  Upload,
  Trash2,
  Save,
  Award,
  FileText,
  ExternalLink,
} from "lucide-react";

import {
  createLearningRecord,
  updateLearningRecord,
  type LearningPayload,
} from "@/app/admin/(protected)/learning/actions";

import { createClient } from "@/lib/supabase/client";

type LearningInitialData = LearningPayload & {
  id: string;
};

type LearningFormProps = {
  mode: "create" | "edit";
  initialData?: LearningInitialData;
};

const inputClass =
  "w-full rounded-lg border border-[#E2E8F0] bg-white px-4 py-3 text-sm text-[#0B1F3A] outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100";

const labelClass =
  "mb-2 block text-sm font-medium text-[#334155]";

const secondaryButton =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-[#E2E8F0] bg-white px-4 py-2.5 text-sm font-medium text-[#334155] transition hover:bg-slate-50 disabled:opacity-50";

function FormSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
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
  children: React.ReactNode;
  required?: boolean;
  hint?: string;
}) {
  return (
    <div>
      <label className={labelClass}>
        {label}{" "}
        {required && (
          <span className="text-red-500">*</span>
        )}
      </label>

      {children}

      {hint && (
        <p className="mt-1.5 text-xs text-[#94A3B8]">
          {hint}
        </p>
      )}
    </div>
  );
}

export default function LearningForm({
  mode,
  initialData,
}: LearningFormProps) {
  const router = useRouter();
  const supabase = createClient();

  // Basic Information
  const [title, setTitle] = useState(
    initialData?.title ?? ""
  );

  const [provider, setProvider] = useState(
    initialData?.provider ?? ""
  );

  const [category, setCategory] = useState<
    LearningPayload["category"]
  >(initialData?.category ?? "course");

  const [learningStatus, setLearningStatus] = useState<
    LearningPayload["learning_status"]
  >(initialData?.learning_status ?? "completed");

  const [description, setDescription] = useState(
    initialData?.description ?? ""
  );

  // Skills
  const [skills, setSkills] = useState<string[]>(
    initialData?.skills ?? []
  );

  const [newSkill, setNewSkill] = useState("");

  // Dates
  const [issueDate, setIssueDate] = useState(
    initialData?.issue_date ?? ""
  );

  const [expirationDate, setExpirationDate] = useState(
    initialData?.expiration_date ?? ""
  );

  // Credentials
  const [credentialId, setCredentialId] = useState(
    initialData?.credential_id ?? ""
  );

  const [credentialUrl, setCredentialUrl] = useState(
    initialData?.credential_url ?? ""
  );

  // Media
  const [certificatePath, setCertificatePath] = useState(
    initialData?.certificate_path ?? ""
  );

  const [providerLogoPath, setProviderLogoPath] = useState(
    initialData?.provider_logo_path ?? ""
  );

  // Publishing
  const [displayOrder, setDisplayOrder] = useState(
    initialData?.display_order ?? 0
  );

  const [status, setStatus] = useState<
    "draft" | "published"
  >(initialData?.status ?? "draft");

  // UI States
  const [newUploadPaths, setNewUploadPaths] = useState<string[]>([]);
  const [uploadingCertificate, setUploadingCertificate] =
    useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Upload File
  async function uploadFile(
    file: File,
    type: "certificate" | "logo"
  ) {
    setError("");

    const imageTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    const certificateTypes = [
      ...imageTypes,
      "application/pdf",
    ];

    const allowedTypes =
      type === "certificate"
        ? certificateTypes
        : imageTypes;

    if (!allowedTypes.includes(file.type)) {
      setError(
        type === "certificate"
          ? "Certificate must be PDF, JPG, PNG, or WebP."
          : "Provider logo must be JPG, PNG, or WebP."
      );
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("File size must not exceed 10 MB.");
      return;
    }

    if (type === "certificate") {
      setUploadingCertificate(true);
    } else {
      setUploadingLogo(true);
    }

    try {
      const extension =
        file.name.split(".").pop()?.toLowerCase() || "file";

      const folder = initialData?.id ?? "pending";

      const path =
        `learning/${folder}/${type}-${crypto.randomUUID()}.${extension}`;

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

      if (type === "certificate") {
        setCertificatePath(path);
      } else {
        setProviderLogoPath(path);
      }
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "File upload failed."
      );
    } finally {
      setUploadingCertificate(false);
      setUploadingLogo(false);
    }
  }

  // Skills
  function addSkill() {
    const value = newSkill.trim();

    if (!value) return;

    const alreadyExists = skills.some(
      (skill) =>
        skill.toLowerCase() === value.toLowerCase()
    );

    if (alreadyExists) {
      setNewSkill("");
      return;
    }

    setSkills((current) => [...current, value]);
    setNewSkill("");
  }

  function removeSkill(index: number) {
    setSkills((current) =>
      current.filter((_, i) => i !== index)
    );
  }

  // Storage Cleanup
  async function removeNewUploads() {
    if (newUploadPaths.length === 0) return;

    await supabase.storage
      .from("portfolio-media")
      .remove(newUploadPaths);

    setNewUploadPaths([]);
  }

  async function handleCancel() {
    await removeNewUploads();
    router.push("/admin/learning");
  }

  // Public URL
  function getPublicUrl(path: string) {
    if (!path) return "";

    if (path.startsWith("http")) {
      return path;
    }

    return supabase.storage
      .from("portfolio-media")
      .getPublicUrl(path).data.publicUrl;
  }

  // Submit
  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Learning title is required.");
      return;
    }

    if (!provider.trim()) {
      setError("Provider is required.");
      return;
    }

    if (
      issueDate &&
      expirationDate &&
      expirationDate < issueDate
    ) {
      setError(
        "Expiration date cannot be earlier than issue date."
      );
      return;
    }

    const payload: LearningPayload = {
      title: title.trim(),
      provider: provider.trim(),
      category,
      learning_status: learningStatus,
      description: description.trim(),
      skills,
      issue_date: issueDate,
      expiration_date: expirationDate || null,
      credential_id: credentialId.trim(),
      credential_url: credentialUrl.trim(),
      certificate_path: certificatePath,
      provider_logo_path: providerLogoPath,
      display_order: Math.max(
        0,
        Number(displayOrder) || 0
      ),
      status,
    };

    setSaving(true);

    try {
      const result =
        mode === "edit" && initialData
          ? await updateLearningRecord(
              initialData.id,
              payload
            )
          : await createLearningRecord(payload);

      if (result?.error) {
        setError(result.error);
        return;
      }

      // Delete old media only after successful database save.
      const oldPaths = [
        initialData?.certificate_path,
        initialData?.provider_logo_path,
      ].filter(
        (path): path is string =>
          Boolean(path) && !path!.startsWith("http")
      );

      const currentPaths = [
        certificatePath,
        providerLogoPath,
      ];

      const pathsToRemove = oldPaths.filter(
        (path) => !currentPaths.includes(path)
      );

      if (pathsToRemove.length > 0) {
        await supabase.storage
          .from("portfolio-media")
          .remove(pathsToRemove);
      }

      setNewUploadPaths([]);

      router.push("/admin/learning");
      router.refresh();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Failed to save learning record."
      );
    } finally {
      setSaving(false);
    }
  }

  const certificateUrl = getPublicUrl(certificatePath);
  const logoUrl = getPublicUrl(providerLogoPath);

  const certificateIsPdf = certificatePath
    .toLowerCase()
    .endsWith(".pdf");

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <button
            type="button"
            onClick={handleCancel}
            className="mb-3 inline-flex items-center gap-2 text-sm text-[#64748B] hover:text-[#2563EB]"
          >
            <ArrowLeft size={16} />
            Back to Learning
          </button>

          <h1 className="text-2xl font-bold text-[#0B1F3A]">
            {mode === "edit"
              ? "Edit Learning Record"
              : "Add Learning Record"}
          </h1>

          <p className="mt-1 text-sm text-[#64748B]">
            Manage your certifications, training, and learning activities.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleCancel}
            disabled={saving}
            className={secondaryButton}
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={
              saving ||
              uploadingCertificate ||
              uploadingLogo
            }
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
          >
            <Save size={16} />
            {saving ? "Saving..." : "Save Learning"}
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Basic Information */}
      <FormSection
        title="Basic Information"
        description="Main information about your learning activity."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Learning Title" required>
            <input
              className={inputClass}
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
              placeholder="e.g. Associate Data Scientist"
              required
            />
          </Field>

          <Field label="Provider / Organizer" required>
            <input
              className={inputClass}
              value={provider}
              onChange={(event) =>
                setProvider(event.target.value)
              }
              placeholder="e.g. Digital Talent Academy - Komdigi"
              required
            />
          </Field>

          <Field label="Category" required>
            <select
              className={inputClass}
              value={category}
              onChange={(event) =>
                setCategory(
                  event.target.value as LearningPayload["category"]
                )
              }
            >
              <option value="certification">Certification</option>
              <option value="training">Training</option>
              <option value="course">Course</option>
              <option value="workshop">Workshop</option>
              <option value="bootcamp">Bootcamp</option>
              <option value="other">Other</option>
            </select>
          </Field>

          <Field label="Learning Status" required>
            <select
              className={inputClass}
              value={learningStatus}
              onChange={(event) =>
                setLearningStatus(
                  event.target.value as LearningPayload["learning_status"]
                )
              }
            >
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </Field>
        </div>

        <Field label="Description">
          <textarea
            className={inputClass}
            rows={5}
            value={description}
            onChange={(event) =>
              setDescription(event.target.value)
            }
            placeholder="Describe what you learned, the program objectives, and relevant details..."
          />
        </Field>
      </FormSection>

      {/* Skills */}
      <FormSection
        title="Skills & Competencies"
        description="List the skills and competencies gained from this learning activity."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            className={inputClass}
            value={newSkill}
            onChange={(event) =>
              setNewSkill(event.target.value)
            }
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                addSkill();
              }
            }}
            placeholder="e.g. Python, SQL, Data Visualization"
          />

          <button
            type="button"
            onClick={addSkill}
            className={secondaryButton}
          >
            <Plus size={16} />
            Add Skill
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={`${skill}-${index}`}
              className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-2 text-sm font-medium text-[#2563EB]"
            >
              {skill}

              <button
                type="button"
                onClick={() => removeSkill(index)}
                aria-label={`Remove ${skill}`}
                className="hover:text-red-600"
              >
                <X size={14} />
              </button>
            </span>
          ))}

          {skills.length === 0 && (
            <p className="text-sm text-[#94A3B8]">
              No skills added yet.
            </p>
          )}
        </div>
      </FormSection>

      {/* Dates */}
      <FormSection
        title="Learning Period"
        description="Set the issue date and expiration date if applicable."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Issue / Start Date">
            <input
              type="date"
              className={inputClass}
              value={issueDate}
              onChange={(event) =>
                setIssueDate(event.target.value)
              }
            />
          </Field>

          <Field
            label="Expiration Date"
            hint="Leave empty if the credential does not expire."
          >
            <input
              type="date"
              className={inputClass}
              value={expirationDate}
              onChange={(event) =>
                setExpirationDate(event.target.value)
              }
            />
          </Field>
        </div>
      </FormSection>

      {/* Credentials */}
      <FormSection
        title="Credential Information"
        description="Optional certificate and credential verification details."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Credential ID">
            <input
              className={inputClass}
              value={credentialId}
              onChange={(event) =>
                setCredentialId(event.target.value)
              }
              placeholder="e.g. CERT-2026-001"
            />
          </Field>

          <Field label="Credential URL">
            <input
              type="url"
              className={inputClass}
              value={credentialUrl}
              onChange={(event) =>
                setCredentialUrl(event.target.value)
              }
              placeholder="https://example.com/verify"
            />
          </Field>
        </div>
      </FormSection>

      {/* Media */}
      <FormSection
        title="Learning Media"
        description="Upload the certificate and provider logo. Maximum file size: 10 MB each."
      >
        <Field label="Certificate">
          {certificatePath ? (
            <div className="flex flex-col gap-3 rounded-xl border border-[#E2E8F0] p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-center gap-3">
                {certificateIsPdf ? (
                  <FileText
                    size={30}
                    className="shrink-0 text-red-500"
                  />
                ) : (
                  <img
                    src={certificateUrl}
                    alt="Certificate preview"
                    className="h-16 w-20 rounded-lg border object-cover"
                  />
                )}

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-[#334155]">
                    {certificatePath.split("/").pop()}
                  </p>

                  <a
                    href={certificateUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-flex items-center gap-1 text-xs text-[#2563EB] hover:underline"
                  >
                    View certificate
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setCertificatePath("")}
                className="inline-flex items-center gap-2 text-sm text-red-600 hover:text-red-700"
              >
                <Trash2 size={15} />
                Remove
              </button>
            </div>
          ) : (
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#CBD5E1] bg-slate-50 px-6 py-8 text-center hover:border-[#2563EB] hover:bg-blue-50">
              <Upload
                size={27}
                className="mb-3 text-[#64748B]"
              />

              <span className="text-sm font-semibold text-[#334155]">
                {uploadingCertificate
                  ? "Uploading certificate..."
                  : "Click to upload certificate"}
              </span>

              <span className="mt-1 text-xs text-[#94A3B8]">
                PDF, JPG, PNG, or WebP
              </span>

              <input
                type="file"
                accept=".pdf,image/jpeg,image/png,image/webp"
                className="hidden"
                disabled={uploadingCertificate}
                onChange={(event) => {
                  const file = event.target.files?.[0];

                  if (file) {
                    void uploadFile(file, "certificate");
                  }

                  event.target.value = "";
                }}
              />
            </label>
          )}
        </Field>

        <Field label="Provider Logo">
          {logoUrl ? (
            <div className="flex items-center gap-4 rounded-xl border border-[#E2E8F0] p-4">
              <img
                src={logoUrl}
                alt="Provider logo preview"
                className="h-20 w-20 rounded-lg border border-[#E2E8F0] object-contain p-2"
              />

              <div className="flex-1">
                <p className="text-sm font-medium text-[#334155]">
                  Provider logo uploaded
                </p>

                <p className="mt-1 text-xs text-[#94A3B8]">
                  This image represents the learning provider.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setProviderLogoPath("")}
                className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                aria-label="Remove provider logo"
              >
                <Trash2 size={17} />
              </button>
            </div>
          ) : (
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#CBD5E1] bg-slate-50 px-6 py-8 text-center hover:border-[#2563EB] hover:bg-blue-50">
              <Award
                size={27}
                className="mb-3 text-[#64748B]"
              />

              <span className="text-sm font-semibold text-[#334155]">
                {uploadingLogo
                  ? "Uploading logo..."
                  : "Click to upload provider logo"}
              </span>

              <span className="mt-1 text-xs text-[#94A3B8]">
                JPG, PNG, or WebP
              </span>

              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                disabled={uploadingLogo}
                onChange={(event) => {
                  const file = event.target.files?.[0];

                  if (file) {
                    void uploadFile(file, "logo");
                  }

                  event.target.value = "";
                }}
              />
            </label>
          )}
        </Field>
      </FormSection>

      {/* Publishing Settings */}
      <FormSection
        title="Publishing Settings"
        description="Control the display order and publication status."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <Field
            label="Display Order"
            hint="Lower numbers appear first."
          >
            <input
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
            ? "This learning record will be marked as published when saved."
            : "This learning record will remain a draft and will not be publicly displayed."}
        </div>
      </FormSection>

      {/* Bottom Actions */}
      <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
        <button
          type="button"
          onClick={handleCancel}
          className={secondaryButton}
          disabled={saving}
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={
            saving ||
            uploadingCertificate ||
            uploadingLogo
          }
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
        >
          <Save size={16} />

          {saving
            ? "Saving Learning..."
            : "Save Learning"}
        </button>
      </div>
    </form>
  );
}