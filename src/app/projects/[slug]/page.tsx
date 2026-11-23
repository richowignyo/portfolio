
import { notFound } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import DynamicProjectCaseStudy from "@/components/admin/projects/DynamicProjectCaseStudy";
import LegacyProjectCaseStudy from "./LegacyProjectCaseStudy";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProjectCaseStudy({ params }: PageProps) {
  const { slug } = await params;

  const supabase = await createClient();

  // Check published projects from Supabase first.
  const { data: project, error: projectError } = await supabase
    .from("projects")
    .select(`
      id,
      slug,
      title,
      category,
      short_description,
      project_type,
      start_date,
      end_date,
      role,
      overview,
      tech_stack,
      thumbnail_path,
      repository_url,
      demo_url
    `)
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  // If the Supabase query failed, do not silently hide the error.
  if (projectError) {
    console.error("Failed to fetch project:", projectError);
  }

  // Render dynamic project when it exists in Supabase.
  if (project) {
    const { data: sections, error: sectionsError } = await supabase
      .from("project_sections")
      .select(`
        id,
        section_key,
        title,
        subtitle,
        section_type,
        content,
        display_order,
        is_visible
      `)
      .eq("project_id", project.id)
      .order("display_order", { ascending: true });

    if (sectionsError) {
      console.error("Failed to fetch project sections:", sectionsError);
    }

    return (
      <DynamicProjectCaseStudy
        project={project}
        sections={sections ?? []}
      />
    );
  }

  // If not found in Supabase, check the legacy case studies.
  // This preserves all previously created static project pages.
  return <LegacyProjectCaseStudy params={Promise.resolve({ slug })} />;
}
