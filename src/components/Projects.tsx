import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";

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

export default function Projects() {
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
          {projects.map((project) => (
            <ProjectCard key={project.number} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
}: {
  project: {
    slug: string;
    number: string;
    category: string;
    title: string;
    description: string;
    techStack: string[];
  };
}) {
  const thumbnail = projectThumbnails[project.slug];

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
      {thumbnail && (
        <div className="mt-6 overflow-hidden rounded-xl border border-[#E2E8F0] bg-white">
          <div className="relative h-36 w-full sm:h-40">
            <Image
              src={thumbnail}
              alt={`${project.title} project thumbnail`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
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

        <p className="mt-5 max-w-xl text-base leading-7 text-[#64748B]">
          {project.description}
        </p>

        {/* Tech Stack */}
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