
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Plus,
  FolderKanban,
  Pencil,
  Globe,
  Code2,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import ProjectDeleteButton from "@/components/admin/projects/ProjectDeleteButton";

export default async function ProjectsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.app_metadata?.role !== "admin") {
    redirect("/admin/login");
  }

  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  const total = projects?.length ?? 0;
  const published =
    projects?.filter((item) => item.status === "published").length ?? 0;
  const drafts =
    projects?.filter((item) => item.status === "draft").length ?? 0;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-[#2563EB]">
            Content Management
          </p>

          <h1 className="mt-2 text-3xl font-bold text-[#0B1F3A]">
            Projects
          </h1>

          <p className="mt-2 text-[#64748B]">
            Manage your portfolio projects, case studies, and technical work.
          </p>
        </div>

        <Link
          href="/admin/projects/new"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Project
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Total Projects"
          value={total}
          icon={<FolderKanban size={20} />}
        />
        <StatCard
          label="Published"
          value={published}
          icon={<Globe size={20} />}
        />
        <StatCard
          label="Drafts"
          value={drafts}
          icon={<Pencil size={20} />}
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm">
        <div className="border-b border-[#E2E8F0] px-6 py-5">
          <h2 className="font-semibold text-[#0B1F3A]">
            Project Records
          </h2>
          <p className="mt-1 text-sm text-[#64748B]">
            All projects stored in your portfolio CMS.
          </p>
        </div>

        {error ? (
          <div className="p-8 text-center text-sm text-red-600">
            Failed to load projects: {error.message}
          </div>
        ) : !projects || projects.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <FolderKanban
              size={40}
              className="mx-auto text-[#CBD5E1]"
            />

            <h3 className="mt-4 font-semibold text-[#0B1F3A]">
              No projects yet
            </h3>

            <p className="mt-2 text-sm text-[#64748B]">
              Start by adding your first portfolio project.
            </p>

            <Link
              href="/admin/projects/new"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              <Plus size={17} />
              Add Your First Project
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-[#E2E8F0]">
            {projects.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#F1F5F9]">
                    {item.thumbnail_path ? (
                      <img
                        src={item.thumbnail_path.startsWith("http")
                          ? item.thumbnail_path
                          : supabase.storage
                              .from("portfolio-media")
                              .getPublicUrl(item.thumbnail_path).data.publicUrl}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Code2 size={22} className="text-[#94A3B8]" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-semibold text-[#0B1F3A]">
                        {item.title}
                      </h3>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          item.status === "published"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {item.status === "published" ? "Published" : "Draft"}
                      </span>
                    </div>

                    <p className="mt-1 text-sm text-[#64748B]">
                      {item.category || item.project_type || "Uncategorized"}
                    </p>

                    <p className="mt-2 line-clamp-2 text-xs text-[#94A3B8]">
                      {item.short_description || "No short description."}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 flex-wrap items-center gap-2">
                  <Link
                    href={`/admin/projects/${item.id}/edit`}
                    className="inline-flex w-fit items-center gap-2 rounded-lg border border-[#E2E8F0] px-4 py-2 text-sm font-medium text-[#475569] transition-colors hover:border-[#2563EB] hover:text-[#2563EB]"
                  >
                    <Pencil size={15} />
                    Edit
                  </Link>

                  <ProjectDeleteButton
                    id={item.id}
                    title={item.title}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#64748B]">{label}</p>
        <span className="text-[#2563EB]">{icon}</span>
      </div>

      <p className="mt-3 text-3xl font-bold text-[#0B1F3A]">
        {value}
      </p>
    </div>
  );
}
