
"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type LearningPayload = {
  title: string;
  provider: string;
  category:
    | "certification"
    | "training"
    | "course"
    | "workshop"
    | "bootcamp"
    | "other";
  learning_status: "in_progress" | "completed";
  description: string;
  skills: string[];
  issue_date: string;
  expiration_date: string | null;
  credential_id: string;
  credential_url: string;
  certificate_path: string;
  provider_logo_path: string;
  display_order: number;
  status: "draft" | "published";
};

async function verifyAdmin() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user || user.app_metadata?.role !== "admin") {
    throw new Error("Unauthorized: Admin access required.");
  }

  return supabase;
}

function validatePayload(payload: LearningPayload) {
  if (!payload.title?.trim()) {
    return "Learning title is required.";
  }

  if (!payload.provider?.trim()) {
    return "Provider is required.";
  }

  const validCategories = [
    "certification",
    "training",
    "course",
    "workshop",
    "bootcamp",
    "other",
  ];

  if (!validCategories.includes(payload.category)) {
    return "Invalid learning category.";
  }

  if (
    payload.learning_status !== "in_progress" &&
    payload.learning_status !== "completed"
  ) {
    return "Invalid learning status.";
  }

  if (
    payload.status !== "draft" &&
    payload.status !== "published"
  ) {
    return "Invalid publication status.";
  }

  if (
    payload.issue_date &&
    payload.expiration_date &&
    payload.expiration_date < payload.issue_date
  ) {
    return "Expiration date cannot be earlier than issue date.";
  }

  if (!Array.isArray(payload.skills)) {
    return "Skills must be an array.";
  }

  return null;
}

function buildLearningData(payload: LearningPayload) {
  return {
    title: payload.title.trim(),
    provider: payload.provider.trim(),
    category: payload.category,
    learning_status: payload.learning_status,
    description: payload.description?.trim() || null,
    skills: payload.skills
      .map((skill) => skill.trim())
      .filter(Boolean),
    issue_date: payload.issue_date || null,
    expiration_date: payload.expiration_date || null,
    credential_id: payload.credential_id?.trim() || null,
    credential_url: payload.credential_url?.trim() || null,
    certificate_path: payload.certificate_path || null,
    provider_logo_path: payload.provider_logo_path || null,
    display_order: Math.max(0, Number(payload.display_order) || 0),
    status: payload.status,
  };
}

export async function createLearningRecord(payload: LearningPayload) {
  try {
    const supabase = await verifyAdmin();

    const validationError = validatePayload(payload);
    if (validationError) return { error: validationError };

    const { error } = await supabase
      .from("learning_records")
      .insert({
        ...buildLearningData(payload),
        published_at:
          payload.status === "published"
            ? new Date().toISOString()
            : null,
      });

    if (error) return { error: error.message };

    revalidatePath("/admin/learning");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "Failed to create learning record.",
    };
  }
}

export async function updateLearningRecord(
  id: string,
  payload: LearningPayload
) {
  try {
    const supabase = await verifyAdmin();

    const validationError = validatePayload(payload);
    if (validationError) return { error: validationError };

    const { data: existing, error: fetchError } = await supabase
      .from("learning_records")
      .select("published_at,status")
      .eq("id", id)
      .single();

    if (fetchError || !existing) {
      return { error: "Learning record not found." };
    }

    const publishedAt =
      payload.status === "published"
        ? existing.status === "published" && existing.published_at
          ? existing.published_at
          : new Date().toISOString()
        : null;

    const { error } = await supabase
      .from("learning_records")
      .update({
        ...buildLearningData(payload),
        published_at: publishedAt,
      })
      .eq("id", id);

    if (error) return { error: error.message };

    revalidatePath("/admin/learning");
    revalidatePath(`/admin/learning/${id}/edit`);
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "Failed to update learning record.",
    };
  }
}

export async function deleteLearningRecord(id: string) {
  try {
    const supabase = await verifyAdmin();

    const { data: record, error: fetchError } = await supabase
      .from("learning_records")
      .select("certificate_path,provider_logo_path")
      .eq("id", id)
      .single();

    if (fetchError || !record) {
      return { error: "Learning record not found." };
    }

    const paths = [
      record.certificate_path,
      record.provider_logo_path,
    ].filter(
      (path): path is string =>
        Boolean(path) && !path!.startsWith("http")
    );

    const { error } = await supabase
      .from("learning_records")
      .delete()
      .eq("id", id);

    if (error) return { error: error.message };

    if (paths.length > 0) {
      await supabase.storage
        .from("portfolio-media")
        .remove(paths);
    }

    revalidatePath("/admin/learning");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "Failed to delete learning record.",
    };
  }
}
