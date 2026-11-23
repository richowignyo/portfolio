
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ExperienceForm from "@/components/admin/experience/ExperienceForm";

type EditExperiencePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditExperiencePage({
  params,
}: EditExperiencePageProps) {
  const { id } = await params;

  const supabase = await createClient();

  // Verify admin access
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.app_metadata?.role !== "admin") {
    redirect("/admin/login");
  }

  // Fetch experience data
  const { data: experience, error } = await supabase
    .from("professional_experiences")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Failed to fetch experience:", error);
    throw new Error("Failed to load professional experience.");
  }

  if (!experience) {
    notFound();
  }

  // Prepare initial form data
  const initialData = {
    id: experience.id,

    // Basic Information
    company: experience.company,
    position: experience.position,
    employment_type: experience.employment_type ?? "",
    location: experience.location ?? "",

    // Employment Period
    start_date: experience.start_date,
    end_date: experience.end_date ?? null,
    is_current: experience.is_current ?? false,

    // Experience Details
    summary: experience.summary ?? "",
    responsibilities: experience.responsibilities ?? [],
    achievements: experience.achievements ?? [],

    // Metrics and Technologies
    metrics: experience.metrics ?? [],
    tech_stack: experience.tech_stack ?? [],

    // Experience Gallery
    gallery: experience.gallery ?? [],

    // Case Study & Evidence
    case_study_slug: experience.case_study_slug ?? "",
    evidence_url: experience.evidence_url ?? "",
    evidence_label: experience.evidence_label ?? "",
    confidentiality_note: experience.confidentiality_note ?? "",

    // Publishing Settings
    display_order: experience.display_order ?? 0,
    status:
      experience.status === "published"
        ? ("published" as const)
        : ("draft" as const),
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-[#2563EB]">
          Content Management
        </p>

        <h1 className="mt-2 text-3xl font-bold text-[#0B1F3A]">
          Edit Experience
        </h1>

        <p className="mt-2 text-[#64748B]">
          Update your professional experience information.
        </p>
      </div>

      {/* Experience Form */}
      <ExperienceForm initialData={initialData} />
    </div>
  );
}
