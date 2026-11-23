
"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type ExperienceGalleryItem = {
  src: string;
  path: string;
  alt: string;
};

export type ExperiencePayload = {
  company: string;
  position: string;
  employment_type: string;
  location: string;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  summary: string;
  responsibilities: string[];
  achievements: string[];
  tech_stack: string[];
  metrics: { value: string; label: string }[];
  gallery: ExperienceGalleryItem[];
  case_study_slug: string;
  evidence_url: string;
  evidence_label: string;
  confidentiality_note: string;
  display_order: number;
  status: "draft" | "published";
};

async function verifyAdmin() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.app_metadata?.role !== "admin") {
    return {
      supabase: null,
      error: "Unauthorized. Admin access required.",
    };
  }

  return { supabase, error: null };
}

function validatePayload(payload: ExperiencePayload) {
  if (!payload.company.trim() || !payload.position.trim()) {
    return "Company and position are required.";
  }

  if (!payload.start_date) {
    return "Start date is required.";
  }

  if (payload.is_current && payload.end_date !== null) {
    return "End date must be empty for current employment.";
  }

  if (payload.end_date && payload.end_date < payload.start_date) {
    return "End date cannot be earlier than start date.";
  }

  if (!Array.isArray(payload.gallery)) {
    return "Gallery must be an array.";
  }

  return null;
}

function buildExperienceData(payload: ExperiencePayload) {
  return {
    company: payload.company.trim(),
    position: payload.position.trim(),
    employment_type: payload.employment_type || null,
    location: payload.location || null,
    start_date: payload.start_date,
    end_date: payload.is_current ? null : payload.end_date,
    is_current: payload.is_current,
    summary: payload.summary || null,
    responsibilities: payload.responsibilities,
    achievements: payload.achievements,
    tech_stack: payload.tech_stack,
    metrics: payload.metrics,
    gallery: payload.gallery,
    case_study_slug: payload.case_study_slug || null,
    evidence_url: payload.evidence_url || null,
    evidence_label: payload.evidence_label || null,
    confidentiality_note: payload.confidentiality_note || null,
    display_order: payload.display_order,
    status: payload.status,
  };
}

// CREATE EXPERIENCE
export async function createExperience(payload: ExperiencePayload) {
  const { supabase, error: authError } = await verifyAdmin();

  if (!supabase) {
    return { success: false, error: authError };
  }

  const validationError = validatePayload(payload);

  if (validationError) {
    return { success: false, error: validationError };
  }

  const publishedAt =
    payload.status === "published" ? new Date().toISOString() : null;

  const { error } = await supabase
    .from("professional_experiences")
    .insert({
      ...buildExperienceData(payload),
      published_at: publishedAt,
    });

  if (error) {
    console.error("Create experience error:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/experience");
  revalidatePath("/");

  return { success: true };
}

// UPDATE EXPERIENCE
export async function updateExperience(
  id: string,
  payload: ExperiencePayload
) {
  const { supabase, error: authError } = await verifyAdmin();

  if (!supabase) {
    return { success: false, error: authError };
  }

  if (!id?.trim()) {
    return { success: false, error: "Experience ID is required." };
  }

  const validationError = validatePayload(payload);

  if (validationError) {
    return { success: false, error: validationError };
  }

  const { data: existingExperience, error: fetchError } = await supabase
    .from("professional_experiences")
    .select("id, published_at")
    .eq("id", id)
    .maybeSingle();

  if (fetchError) {
    console.error("Fetch experience error:", fetchError);
    return { success: false, error: fetchError.message };
  }

  if (!existingExperience) {
    return { success: false, error: "Experience record not found." };
  }

  const publishedAt =
    payload.status === "published"
      ? existingExperience.published_at ?? new Date().toISOString()
      : null;

  const { error } = await supabase
    .from("professional_experiences")
    .update({
      ...buildExperienceData(payload),
      published_at: publishedAt,
    })
    .eq("id", id);

  if (error) {
    console.error("Update experience error:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/experience");
  revalidatePath(`/admin/experience/${id}/edit`);
  revalidatePath("/");

  return { success: true };
}

// DELETE EXPERIENCE
export async function deleteExperience(id: string) {
  const { supabase, error: authError } = await verifyAdmin();

  if (!supabase) {
    return { success: false, error: authError };
  }

  if (!id?.trim()) {
    return { success: false, error: "Experience ID is required." };
  }

  const { data: deletedExperience, error } = await supabase
    .from("professional_experiences")
    .delete()
    .eq("id", id)
    .select("id")
    .maybeSingle();

  if (error) {
    console.error("Delete experience error:", error);
    return { success: false, error: error.message };
  }

  if (!deletedExperience) {
    return {
      success: false,
      error: "Experience record not found or could not be deleted.",
    };
  }

  revalidatePath("/admin/experience");
  revalidatePath("/");

  return { success: true };
}
