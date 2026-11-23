
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import {
  normalizeProjectContent,
  type ProjectContentBlockUnion,
} from "@/types/project-content";

type DynamicProject = {
  id: string;
  slug: string;
  title: string;
  category: string | null;
  short_description: string | null;
  project_type: string | null;
  role: string | null;
  overview: string | null;
  tech_stack: string[] | null;
  thumbnail_path: string | null;
  repository_url: string | null;
  demo_url: string | null;
  start_date: string | null;
  end_date: string | null;
};

type DynamicSection = {
  id: string;
  section_key: string;
  title: string;
  subtitle: string | null;
  section_type: string;
  content: unknown;
  display_order: number;
  is_visible: boolean;
};

type Props = {
  project: DynamicProject;
  sections: DynamicSection[];
};

type SupabaseClient = Awaited<ReturnType<typeof createClient>>;

const sectionEyebrow =
  "text-xs font-semibold uppercase tracking-[0.18em] text-[#0F766E]";

const sectionTitle =
  "mt-3 text-2xl font-bold tracking-tight text-[#0B1F3A] sm:text-3xl";

const bodyText = "text-sm leading-7 text-[#64748B] sm:text-base";

function getPublicImageUrl(
  path: string,
  supabase: SupabaseClient
): string {
  if (!path) return "";

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return supabase.storage
    .from("portfolio-media")
    .getPublicUrl(path).data.publicUrl;
}

/* =========================================================
   CONTENT BLOCK RENDERER
   ========================================================= */

function ContentBlockRenderer({
  block,
  supabase,
}: {
  block: ProjectContentBlockUnion;
  supabase: SupabaseClient;
}) {
  switch (block.type) {
    case "text": {
      const data = block.data;

      return (
        <div className="space-y-3">
          {data.heading ? (
            <h3 className="text-lg font-bold text-[#0B1F3A]">
              {data.heading}
            </h3>
          ) : null}

          {data.body ? (
            <p className={`${bodyText} whitespace-pre-line`}>
              {data.body}
            </p>
          ) : null}
        </div>
      );
    }

    case "image": {
      const data = block.data;
      const imageUrl = getPublicImageUrl(data.path, supabase);

      if (!imageUrl) return null;

      const isHalf = data.layout === "half";
      const isImageText = data.layout === "image-text";

      return (
        <figure
          className={
            isHalf
              ? "mx-auto w-full max-w-3xl"
              : isImageText
                ? "grid items-center gap-6 md:grid-cols-2"
                : "w-full"
          }
        >
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC]">
            <Image
              src={imageUrl}
              alt={data.alt || data.caption || "Project image"}
              fill
              unoptimized
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-contain"
            />
          </div>

          {data.caption || data.description ? (
            <figcaption className="mt-3 space-y-1">
              {data.caption ? (
                <p className="text-sm font-semibold text-[#0B1F3A]">
                  {data.caption}
                </p>
              ) : null}

              {data.description ? (
                <p className="text-sm leading-6 text-[#64748B]">
                  {data.description}
                </p>
              ) : null}
            </figcaption>
          ) : null}
        </figure>
      );
    }

    case "table": {
      const data = block.data;

      return (
        <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white">
          {data.title || data.description ? (
            <div className="border-b border-[#E2E8F0] px-5 py-4 sm:px-6">
              {data.title ? (
                <h3 className="font-bold text-[#0B1F3A]">
                  {data.title}
                </h3>
              ) : null}

              {data.description ? (
                <p className="mt-1 text-sm leading-6 text-[#64748B]">
                  {data.description}
                </p>
              ) : null}
            </div>
          ) : null}

          <div className="overflow-x-auto">
            <table className="w-full min-w-130 text-left text-sm">
              <thead className="bg-[#F8FAFC]">
                <tr>
                  {data.columns.map((column, index) => (
                    <th
                      key={`${column}-${index}`}
                      className="border-b border-[#E2E8F0] px-4 py-3 font-semibold text-[#475569] sm:px-5"
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {data.rows.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="border-b border-[#E2E8F0] last:border-0"
                  >
                    {data.columns.map((_, columnIndex) => (
                      <td
                        key={columnIndex}
                        className="px-4 py-3 text-[#64748B] sm:px-5"
                      >
                        {row[columnIndex] ?? "—"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    case "metrics": {
      const data = block.data;

      return (
        <div>
          {data.heading ? (
            <h3 className="mb-5 text-lg font-bold text-[#0B1F3A]">
              {data.heading}
            </h3>
          ) : null}

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.items.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-[#E2E8F0] bg-white p-5 sm:p-6"
              >
                <p className="text-2xl font-bold tracking-tight text-[#0B1F3A] sm:text-3xl">
                  {item.value}
                </p>

                <p className="mt-2 text-sm font-semibold text-[#475569]">
                  {item.label}
                </p>

                {item.description ? (
                  <p className="mt-2 text-xs leading-5 text-[#64748B]">
                    {item.description}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      );
    }

    case "list": {
      const data = block.data;
      const ListTag = data.style === "numbered" ? "ol" : "ul";

      return (
        <div>
          {data.heading ? (
            <h3 className="mb-4 text-lg font-bold text-[#0B1F3A]">
              {data.heading}
            </h3>
          ) : null}

          <ListTag
            className={
              data.style === "numbered"
                ? "list-decimal space-y-3 pl-6"
                : "list-disc space-y-3 pl-6"
            }
          >
            {data.items.map((item, index) => (
              <li key={index} className={`${bodyText} pl-1`}>
                {item}
              </li>
            ))}
          </ListTag>
        </div>
      );
    }

    case "callout": {
      const data = block.data;

      const variantClasses: Record<string, string> = {
        info: "border-blue-200 bg-blue-50 text-blue-950",
        success: "border-emerald-200 bg-emerald-50 text-emerald-950",
        warning: "border-amber-200 bg-amber-50 text-amber-950",
        default: "border-[#E2E8F0] bg-[#F8FAFC] text-[#0B1F3A]",
      };

      return (
        <aside
          className={`rounded-2xl border p-5 sm:p-6 ${
            variantClasses[data.variant] ??
            variantClasses.default
          }`}
        >
          {data.title ? (
            <h3 className="font-bold">{data.title}</h3>
          ) : null}

          <p className="mt-1 whitespace-pre-line text-sm leading-7">
            {data.message}
          </p>
        </aside>
      );
    }

    case "link": {
      const data = block.data;

      if (!data.url) return null;

      return (
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 sm:p-6">
          {data.description ? (
            <p className="mb-3 text-sm leading-6 text-[#64748B]">
              {data.description}
            </p>
          ) : null}

          <a
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#2563EB] transition hover:text-[#0F766E]"
          >
            {data.label || data.url}
            <ArrowUpRight size={16} />
          </a>
        </div>
      );
    }

    default:
      return null;
  }
}

/* =========================================================
   PUBLIC PROJECT CASE STUDY PAGE
   ========================================================= */

export default async function DynamicProjectCaseStudy({
  project,
  sections,
}: Props) {
  const supabase = await createClient();

  const thumbnailUrl = project.thumbnail_path
    ? getPublicImageUrl(project.thumbnail_path, supabase)
    : "";

  const visibleSections = sections
    .filter((section) => section.is_visible)
    .sort((a, b) => a.display_order - b.display_order);

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* PROJECT HEADER */}
      <section className="border-b border-[#E2E8F0] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-20">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#2563EB] transition hover:text-[#0F766E]"
          >
            <ArrowLeft size={16} />
            Back to Projects
          </Link>

          <div className="mt-10 max-w-4xl">
            <p className={sectionEyebrow}>
              {project.category || project.project_type || "Project"}
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#0B1F3A] sm:text-5xl lg:text-6xl">
              {project.title}
            </h1>

            {project.short_description ? (
              <p className="mt-5 max-w-3xl text-base leading-8 text-[#64748B] sm:text-lg">
                {project.short_description}
              </p>
            ) : null}

            {project.tech_stack?.length ? (
              <div className="mt-7 flex flex-wrap gap-2">
                {project.tech_stack.map((tech, index) => (
                  <span
                    key={`${tech}-${index}`}
                    className="rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-1.5 text-xs font-medium text-[#475569]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            ) : null}

            {project.role || project.start_date || project.end_date ? (
              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#64748B]">
                {project.role ? (
                  <span>Role: {project.role}</span>
                ) : null}

                {project.start_date ? (
                  <span>
                    Period: {project.start_date}
                    {project.end_date ? ` – ${project.end_date}` : ""}
                  </span>
                ) : null}
              </div>
            ) : null}
          </div>

          {thumbnailUrl ? (
            <div className="relative mt-12 aspect-video w-full overflow-hidden rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC]">
              <Image
                src={thumbnailUrl}
                alt={project.title}
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, 1200px"
                className="object-cover"
                priority
              />
            </div>
          ) : null}
        </div>
      </section>

      {/* PROJECT OVERVIEW */}
      {project.overview ? (
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-20">
            <div className="max-w-3xl">
              <p className={sectionEyebrow}>Overview</p>

              <div className="mt-5">
                <p className={`${bodyText} whitespace-pre-line`}>
                  {project.overview}
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* DYNAMIC CONTENT SECTIONS */}
      {visibleSections.map((section, sectionIndex) => {
        const blocks = normalizeProjectContent(section.content).filter(
          (block) => block.is_visible
        );

        if (!section.title && !section.subtitle && blocks.length === 0) {
          return null;
        }

        return (
          <section
            key={section.id}
            className={
              sectionIndex % 2 === 0
                ? "bg-[#F8FAFC]"
                : "bg-white"
            }
          >
            <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-20">
              <div className="max-w-3xl">
                <p className={sectionEyebrow}>
                  {section.section_key.replace(/-/g, " ")}
                </p>

                {section.title ? (
                  <h2 className={sectionTitle}>
                    {section.title}
                  </h2>
                ) : null}

                {section.subtitle ? (
                  <p className={`mt-4 ${bodyText}`}>
                    {section.subtitle}
                  </p>
                ) : null}
              </div>

              {blocks.length > 0 ? (
                <div className="mt-9 space-y-8">
                  {blocks.map((block) => (
                    <ContentBlockRenderer
                      key={block.id}
                      block={block}
                      supabase={supabase}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          </section>
        );
      })}

      {/* PROJECT LINKS */}
      {project.repository_url || project.demo_url ? (
        <section className="border-t border-[#E2E8F0] bg-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-12 sm:flex-row sm:items-center sm:justify-between lg:px-8">
            <div>
              <p className={sectionEyebrow}>Project Links</p>

              <h2 className="mt-2 text-xl font-bold text-[#0B1F3A]">
                Explore this project
              </h2>
            </div>

            <div className="flex flex-wrap gap-3">
              {project.repository_url ? (
                <a
                  href={project.repository_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-[#CBD5E1] px-5 py-3 text-sm font-semibold text-[#334155] transition hover:bg-[#F8FAFC]"
                >
                  Repository
                  <ArrowUpRight size={16} />
                </a>
              ) : null}

              {project.demo_url ? (
                <a
                  href={project.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1D4ED8]"
                >
                  Live Demo
                  <ArrowUpRight size={16} />
                </a>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      {/* BACK TO PROJECTS */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#2563EB] transition hover:text-[#0F766E]"
          >
            <ArrowLeft size={16} />
            Back to Projects
          </Link>
        </div>
      </section>
    </main>
  );
}
