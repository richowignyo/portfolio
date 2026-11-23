
"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import {
  normalizeProjectContent,
  type ProjectContentBlockUnion,
  type ProjectSectionContent,
} from "@/types/project-content";

export type ProjectSectionPayload = {
  section_key: string;
  title: string;
  subtitle: string;
  section_type: string;
  content: ProjectSectionContent | string[];
  display_order: number;
  is_visible: boolean;
};

export type ProjectPayload = {
  slug: string;
  title: string;
  category: string;
  short_description: string;
  project_type: string;
  start_date: string;
  end_date: string | null;
  role: string;
  overview: string;
  tech_stack: string[];
  thumbnail_path: string;
  repository_url: string;
  demo_url: string;
  display_order: number;
  status: "draft" | "published";
  sections: ProjectSectionPayload[];
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

function normalizeSectionKey(value: string): string {
  return value.trim().toLowerCase();
}

function validateBlock(
  block: ProjectContentBlockUnion
): string | null {
  if (
    !block ||
    typeof block.id !== "string" ||
    !block.id.trim()
  ) {
    return "Every content block must have a valid ID.";
  }

  if (!block.data || typeof block.data !== "object") {
    return "Invalid content block data.";
  }

  switch (block.type) {
    case "text":
      if (typeof block.data.body !== "string") {
        return "Text block body must be a string.";
      }
      break;

    case "image":
      if (
        typeof block.data.path !== "string" ||
        typeof block.data.alt !== "string" ||
        !["full", "half", "image-text"].includes(
          block.data.layout
        )
      ) {
        return "Invalid image block data.";
      }
      break;

    case "table":
      if (
        !Array.isArray(block.data.columns) ||
        !Array.isArray(block.data.rows) ||
        !block.data.rows.every(
          (row) =>
            Array.isArray(row) &&
            row.every((cell) => typeof cell === "string")
        )
      ) {
        return "Invalid table block data.";
      }
      break;

    case "metrics":
      if (
        !Array.isArray(block.data.items) ||
        !block.data.items.every(
          (item) =>
            typeof item.id === "string" &&
            typeof item.value === "string" &&
            typeof item.label === "string"
        )
      ) {
        return "Invalid metrics block data.";
      }
      break;

    case "list":
      if (
        !Array.isArray(block.data.items) ||
        !block.data.items.every(
          (item) => typeof item === "string"
        ) ||
        !["bullet", "numbered"].includes(block.data.style)
      ) {
        return "Invalid list block data.";
      }
      break;

    case "callout":
      if (
        typeof block.data.message !== "string" ||
        !["info", "success", "warning", "default"].includes(
          block.data.variant
        )
      ) {
        return "Invalid callout block data.";
      }
      break;

    case "link":
      if (
        typeof block.data.label !== "string" ||
        typeof block.data.url !== "string"
      ) {
        return "Invalid link block data.";
      }
      break;

    default:
      return "Unsupported content block type.";
  }

  return null;
}

function validatePayload(payload: ProjectPayload) {
  if (!payload.title.trim() || !payload.slug.trim()) {
    return "Project title and slug are required.";
  }

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(payload.slug)) {
    return "Slug must contain lowercase letters, numbers, and hyphens only.";
  }

  if (
    payload.start_date &&
    payload.end_date &&
    payload.end_date < payload.start_date
  ) {
    return "End date cannot be earlier than start date.";
  }

  if (
    !Array.isArray(payload.tech_stack) ||
    !Array.isArray(payload.sections)
  ) {
    return "Invalid project data.";
  }

  if (!["draft", "published"].includes(payload.status)) {
    return "Invalid project publication status.";
  }

  const sectionKeys = new Set<string>();

  for (const section of payload.sections) {
    if (
      !section ||
      typeof section.title !== "string" ||
      typeof section.section_key !== "string" ||
      !Array.isArray(section.content)
    ) {
      return "Invalid project section data.";
    }

    // Section tanpa judul memang tidak disimpan,
    // mengikuti perilaku implementasi sebelumnya.
    if (!section.title.trim()) {
      continue;
    }

    const normalizedKey = normalizeSectionKey(
      section.section_key
    );

    if (!normalizedKey) {
      return "Every section must have a section key.";
    }

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(normalizedKey)) {
      return `Invalid section key: ${normalizedKey}`;
    }

    if (sectionKeys.has(normalizedKey)) {
      return `Duplicate section key: ${normalizedKey}`;
    }

    sectionKeys.add(normalizedKey);

    const blocks = normalizeProjectContent(section.content);

    for (const block of blocks) {
      const blockError = validateBlock(block);

      if (blockError) {
        return blockError;
      }
    }
  }

  return null;
}

function buildProjectData(payload: ProjectPayload) {
  return {
    slug: payload.slug.trim(),
    title: payload.title.trim(),
    category: payload.category.trim() || null,
    short_description:
      payload.short_description.trim() || null,
    project_type: payload.project_type.trim() || null,
    start_date: payload.start_date || null,
    end_date: payload.end_date || null,
    role: payload.role.trim() || null,
    overview: payload.overview.trim() || null,
    tech_stack: payload.tech_stack,
    thumbnail_path: payload.thumbnail_path || null,
    repository_url: payload.repository_url.trim() || null,
    demo_url: payload.demo_url.trim() || null,
    display_order: Math.max(0, payload.display_order),
    status: payload.status,
  };
}

async function syncSections(
  supabase: Awaited<ReturnType<typeof createClient>>,
  projectId: string,
  sections: ProjectSectionPayload[]
) {
  const rows = sections
    .filter((section) => section.title.trim())
    .map((section, index) => ({
      section_key: normalizeSectionKey(section.section_key),
      title: section.title.trim(),
      subtitle: section.subtitle.trim() || null,
      section_type: section.section_type || "content",
      content: normalizeProjectContent(section.content),
      display_order: index,
      is_visible: section.is_visible,
    }));

  const { error } = await supabase.rpc(
    "sync_project_sections",
    {
      p_project_id: projectId,
      p_sections: rows,
    }
  );

  return error;
}

export async function createProject(payload: ProjectPayload) {
  const { supabase, error: authError } = await verifyAdmin();

  if (!supabase) {
    return { success: false, error: authError };
  }

  const validationError = validatePayload(payload);

  if (validationError) {
    return { success: false, error: validationError };
  }

  const { data: existing, error: lookupError } = await supabase
    .from("projects")
    .select("id")
    .eq("slug", payload.slug.trim())
    .maybeSingle();

  if (lookupError) {
    return { success: false, error: lookupError.message };
  }

  if (existing) {
    return {
      success: false,
      error: "This project slug is already in use.",
    };
  }

  const publishedAt =
    payload.status === "published"
      ? new Date().toISOString()
      : null;

  const { data: project, error } = await supabase
    .from("projects")
    .insert({
      ...buildProjectData(payload),
      published_at: publishedAt,
    })
    .select("id")
    .single();

  if (error || !project) {
    return {
      success: false,
      error: error?.message ?? "Failed to create project.",
    };
  }

  const sectionError = await syncSections(
    supabase,
    project.id,
    payload.sections
  );

  if (sectionError) {
    await supabase
      .from("projects")
      .delete()
      .eq("id", project.id);

    return {
      success: false,
      error: sectionError.message,
    };
  }

  revalidatePath("/admin/projects");
  revalidatePath("/");

  return { success: true };
}

export async function updateProject(
  id: string,
  payload: ProjectPayload
) {
  const { supabase, error: authError } = await verifyAdmin();

  if (!supabase) {
    return { success: false, error: authError };
  }

  if (!id?.trim()) {
    return { success: false, error: "Project ID is required." };
  }

  const validationError = validatePayload(payload);

  if (validationError) {
    return { success: false, error: validationError };
  }

  const { data: existing, error: fetchError } = await supabase
    .from("projects")
    .select("id, published_at")
    .eq("id", id)
    .maybeSingle();

  if (fetchError || !existing) {
    return {
      success: false,
      error: fetchError?.message ?? "Project not found.",
    };
  }

  const { data: duplicate, error: duplicateError } =
    await supabase
      .from("projects")
      .select("id")
      .eq("slug", payload.slug.trim())
      .neq("id", id)
      .maybeSingle();

  if (duplicateError) {
    return {
      success: false,
      error: duplicateError.message,
    };
  }

  if (duplicate) {
    return {
      success: false,
      error: "This project slug is already in use.",
    };
  }

  const publishedAt =
    payload.status === "published"
      ? existing.published_at ?? new Date().toISOString()
      : null;

  const { error } = await supabase
    .from("projects")
    .update({
      ...buildProjectData(payload),
      published_at: publishedAt,
    })
    .eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  const sectionError = await syncSections(
    supabase,
    id,
    payload.sections
  );

  if (sectionError) {
    return {
      success: false,
      error: sectionError.message,
    };
  }

  revalidatePath("/admin/projects");
  revalidatePath(`/admin/projects/${id}/edit`);
  revalidatePath("/");

  return { success: true };
}

export async function deleteProject(id: string) {
  const { supabase, error: authError } = await verifyAdmin();

  if (!supabase) {
    return { success: false, error: authError };
  }

  if (!id?.trim()) {
    return { success: false, error: "Project ID is required." };
  }

  const { data, error } = await supabase
    .from("projects")
    .delete()
    .eq("id", id)
    .select("id")
    .maybeSingle();

  if (error || !data) {
    return {
      success: false,
      error:
        error?.message ??
        "Project not found or could not be deleted.",
    };
  }

  revalidatePath("/admin/projects");
  revalidatePath("/");

  return { success: true };
}
