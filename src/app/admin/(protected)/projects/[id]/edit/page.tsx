
import { notFound, redirect } from "next/navigation";
import ProjectForm from "@/components/admin/projects/ProjectForm";
import { createClient } from "@/lib/supabase/server";
import type {
  ProjectPayload,
  ProjectSectionPayload,
} from "../../actions";

type EditProjectPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditProjectPage({
  params,
}: EditProjectPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.app_metadata?.role !== "admin") {
    redirect("/login");
  }

  const { data: project, error: projectError } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (projectError || !project) {
    notFound();
  }

  const { data: sectionRecords, error: sectionsError } = await supabase
    .from("project_sections")
    .select("*")
    .eq("project_id", id)
    .order("display_order", { ascending: true });

  if (sectionsError) {
    throw new Error("Failed to load project sections.");
  }

  const sections: ProjectSectionPayload[] = (sectionRecords ?? []).map(
    (section) => ({
      section_key: section.section_key ?? "",
      title: section.title ?? "",
      subtitle: section.subtitle ?? "",
      section_type: section.section_type ?? "content",

      // Preserve structured content blocks as objects.
      content: Array.isArray(section.content)
        ? section.content
        : [],

      display_order: section.display_order ?? 0,
      is_visible: section.is_visible ?? true,
    })
  );

  const initialData: ProjectPayload & { id: string } = {
    id: project.id,
    slug: project.slug ?? "",
    title: project.title ?? "",
    category: project.category ?? "",
    short_description: project.short_description ?? "",
    project_type: project.project_type ?? "",
    start_date: project.start_date ?? "",
    end_date: project.end_date ?? null,
    role: project.role ?? "",
    overview: project.overview ?? "",
    tech_stack: Array.isArray(project.tech_stack)
      ? project.tech_stack.map((item: unknown) => String(item))
      : [],
    thumbnail_path: project.thumbnail_path ?? "",
    repository_url: project.repository_url ?? "",
    demo_url: project.demo_url ?? "",
    display_order: project.display_order ?? 0,
    status: project.status === "published" ? "published" : "draft",
    sections,
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <ProjectForm mode="edit" initialData={initialData} />
    </div>
  );
}
