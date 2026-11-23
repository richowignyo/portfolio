
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience, {
  type ProfessionalExperience,
} from "@/components/Experience";
import OrganizationalExperience from "@/components/OrganizationalExperience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Certifications, {
  type AdditionalLearningRecord,
} from "@/components/Certifications";
import Contact from "@/components/Contact";
import ScrollRevealInitializer from "@/components/ScrollRevealInitializer";
import BackToTop from "@/components/BackToTop";

import { createClient } from "@/lib/supabase/server";
import { projects as staticProjects } from "@/data/projects";

export default async function Home() {
  const supabase = await createClient();

  // Fetch published professional experiences
  const { data, error } = await supabase
    .from("professional_experiences")
    .select(`
      id,
      company,
      position,
      employment_type,
      location,
      start_date,
      end_date,
      is_current,
      summary,
      responsibilities,
      achievements,
      tech_stack,
      metrics,
      gallery,
      case_study_slug,
      evidence_url,
      evidence_label,
      confidentiality_note
    `)
    .eq("status", "published")
    .order("display_order", { ascending: true })
    .order("start_date", { ascending: false });

  if (error) {
    console.error(
      "Failed to fetch professional experiences:",
      error
    );
  }

  const additionalExperiences =
    (data as ProfessionalExperience[] | null) ?? [];

  // Fetch published learning records
  const {
    data: learningData,
    error: learningError,
  } = await supabase
    .from("learning_records")
    .select(`
      id,
      title,
      provider,
      category,
      learning_status,
      description,
      skills,
      issue_date,
      expiration_date,
      credential_id,
      credential_url,
      certificate_path,
      display_order
    `)
    .eq("status", "published")
    .order("display_order", { ascending: true })
    .order("issue_date", { ascending: false });

  if (learningError) {
    console.error(
      "Failed to fetch learning records:",
      learningError
    );
  }

  const additionalLearningRecords: AdditionalLearningRecord[] = (
    learningData ?? []
  ).map((record) => {
    let certificateUrl: string | null = null;

    if (record.certificate_path) {
      if (record.certificate_path.startsWith("http")) {
        certificateUrl = record.certificate_path;
      } else {
        const { data: storageData } = supabase.storage
          .from("portfolio-media")
          .getPublicUrl(record.certificate_path);

        certificateUrl = storageData.publicUrl;
      }
    } else if (record.credential_url) {
      certificateUrl = record.credential_url;
    }

    return {
      id: record.id,
      title: record.title,
      provider: record.provider,
      category: record.category,
      learning_status: record.learning_status,
      description: record.description,
      skills: Array.isArray(record.skills)
        ? record.skills.map((item: unknown) => String(item))
        : [],
      issue_date: record.issue_date,
      expiration_date: record.expiration_date,
      credential_id: record.credential_id,
      credential_url: record.credential_url,
      certificate_path: record.certificate_path,
      certificateUrl,
    };
  });

  // Fetch published project slugs for the Hero project counter
  const {
    data: publishedProjectData,
    error: projectError,
  } = await supabase
    .from("projects")
    .select("slug")
    .eq("status", "published");

  if (projectError) {
    console.error(
      "Failed to fetch published project count:",
      projectError
    );
  }

  // Combine static and published CMS projects without duplicate slugs
  const projectSlugs = new Set(
    staticProjects.map((project) => project.slug)
  );

  (publishedProjectData ?? []).forEach((project) => {
    if (project.slug) {
      projectSlugs.add(project.slug);
    }
  });

  const projectCount = projectSlugs.size;

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#111827]">
      <ScrollRevealInitializer />

      <Navbar />

      <Hero projectCount={projectCount} />

      <About />

      <Experience
        additionalExperiences={additionalExperiences}
      />

      <OrganizationalExperience />

      <Projects />

      <Skills />

      <Certifications
        additionalLearningRecords={additionalLearningRecords}
      />

      <Contact />

      <BackToTop />

      {/* Footer */}
      <footer className="bg-[#0B1F3A] pb-8 text-[#94A3B8]">
        <div className="mx-auto flex w-full justify-between border-t border-[#1E3A5F] px-6 pt-6 text-sm lg:px-16">
          <p>© 2026 Richo Wignyo Aji Saputra</p>
          <p>Data Science · Analytics</p>
        </div>
      </footer>
    </main>
  );
}
