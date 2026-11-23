
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { projects as staticProjects } from "@/data/projects";
import { createClient } from "@/lib/supabase/server";

const projectThumbnails: Record<string, string> = {
  "bfi-finance-business-intelligence": "/projects/thumbnail-bfi.png",
  "shallot-garlic-price-forecasting": "/projects/thumbnail-thesis.png",
  "maybank-sharia-market-positioning": "/projects/thumbnail-maybank.png",
  "bisindo-sign-language-recognition": "/projects/thumbnail-bisindo.png",
  "lgbt-discourse-sentiment-analysis": "/projects/thumbnail-sentiment.png",
  "medical-qa-chatbot-rag": "/projects/thumbnail-medicalqa.png",
  "queue-system-analysis-kopi-kenangan": "/projects/thumbnail-queue.png",
  "evachub-disaster-information-system": "/projects/thumbnail-evachub.png",
};

type ProjectCardData = {
  slug: string;
  number: string;
  category: string;
  title: string;
  description: string;
  techStack: string[];
  thumbnail: string | null;
};

type DynamicProject = {
  id: string;
  slug: string;
  title: string;
  category: string | null;
  short_description: string | null;
  tech_stack: string[] | null;
  thumbnail_path: string | null;
  display_order: number | null;
};

async function getDynamicProjects(): Promise<ProjectCardData[]> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("projects")
      .select(
        `
          id,
          slug,
          title,
          category,
          short_description,
          tech_stack,
          thumbnail_path,
          display_order
        `
      )
      .eq("status", "published")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to fetch published projects:", error.message);
      return [];
    }

    const dynamicProjects = (data ?? []) as DynamicProject[];

    return dynamicProjects.map((project, index) => {
      let thumbnail: string | null = null;

      if (project.thumbnail_path) {
        if (project.thumbnail_path.startsWith("http")) {
          thumbnail = project.thumbnail_path;
        } else {
          thumbnail = supabase.storage
            .from("portfolio-media")
            .getPublicUrl(project.thumbnail_path).data.publicUrl;
        }
      }

      return {
        slug: project.slug,
        number: String(index + 1).padStart(2, "0"),
        category: project.category || "Project",
        title: project.title,
        description: project.short_description || "",
        techStack: project.tech_stack ?? [],
        thumbnail,
      };
    });
  } catch (error) {
    console.error("Unexpected error fetching projects:", error);
    return [];
  }
}

export default async function Projects() {
  const dynamicProjects = await getDynamicProjects();

  // Hindari menampilkan project dua kali apabila slug-nya sama.
  const dynamicSlugs = new Set(
    dynamicProjects.map((project) => project.slug)
  );

  const legacyProjects: ProjectCardData[] = staticProjects
    .filter((project) => !dynamicSlugs.has(project.slug))
    .map((project) => ({
      slug: project.slug,
      number: project.number,
      category: project.category,
      title: project.title,
      description: project.description,
      techStack: project.techStack,
      thumbnail: projectThumbnails[project.slug] ?? null,
    }));

  // Project lama tetap ada, project CMS ditambahkan setelahnya.
  const allProjects = [...legacyProjects, ...dynamicProjects];

  return (
    <section id="projects" className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2563EB]">
            Selected Work
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight text-[#0B1F3A] sm:text-5xl">
            Projects
          </h2>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#64748B]">
            A selection of academic, professional, and team projects covering
            data analysis, business intelligence, machine learning, and
            data-driven applications.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {allProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
}: {
  project: ProjectCardData;
}) {
  return (
    <article className="group flex min-h-85 flex-col rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-7 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-md lg:p-8">
      {/* Top */}
      <div className="flex items-start justify-between">
        <span className="text-sm font-semibold text-[#2563EB]">
          {project.number}
        </span>

        <ArrowUpRight
          size={20}
          className="text-[#94A3B8] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#2563EB]"
        />
      </div>

      {/* Thumbnail */}
      {project.thumbnail && (
        <div className="mt-6 overflow-hidden rounded-xl border border-[#E2E8F0] bg-white">
          <div className="relative h-36 w-full sm:h-40">
            {project.thumbnail.startsWith("http") ? (
              <img
                src={project.thumbnail}
                alt={`${project.title} project thumbnail`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            ) : (
              <Image
                src={project.thumbnail}
                alt={`${project.title} project thumbnail`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            )}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="mt-7">
        <p className="text-sm font-medium text-[#0F766E]">
          {project.category}
        </p>

        <h3 className="mt-3 text-2xl font-bold leading-tight text-[#0B1F3A]">
          {project.title}
        </h3>

        <p className="mt-5 max-w-xl text-base leading-7 text-[#64748B] text-justify">
          {project.description}
        </p>

        {/* Tech Stack */}
        {project.techStack.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="text-xs font-medium text-[#64748B]"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Bottom */}
      <div className="mt-auto pt-8">
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#2563EB] transition-colors hover:text-[#0F766E]"
        >
          Case Study

          <ArrowUpRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </Link>
      </div>
    </article>
  );
}
