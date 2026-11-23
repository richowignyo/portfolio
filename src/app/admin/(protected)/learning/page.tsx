
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Plus,
  GraduationCap,
  Award,
  Pencil,
  BookOpen,
  ExternalLink,
} from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import LearningDeleteButton from "@/components/admin/learning/LearningDeleteButton";

export default async function LearningPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.app_metadata?.role !== "admin") {
    redirect("/login");
  }

  const { data: records, error } = await supabase
    .from("learning_records")
    .select("*")
    .order("display_order", { ascending: true })
    .order("issue_date", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  const items = records ?? [];
  const total = items.length;
  const published = items.filter(
    (item) => item.status === "published"
  ).length;
  const drafts = items.filter(
    (item) => item.status === "draft"
  ).length;

  const inProgress = items.filter(
    (item) => item.learning_status === "in_progress"
  ).length;

  function getPublicUrl(path: string | null) {
    if (!path) return "";
    if (path.startsWith("http")) return path;

    return supabase.storage
      .from("portfolio-media")
      .getPublicUrl(path).data.publicUrl;
  }

  function formatCategory(category: string) {
    return category
      .replaceAll("_", " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  }

  function formatDate(date: string | null) {
    if (!date) return "—";

    return new Date(`${date}T00:00:00`).toLocaleDateString(
      "en-US",
      {
        month: "short",
        year: "numeric",
      }
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-[#2563EB]">
            CONTENT MANAGEMENT
          </p>
          <h1 className="mt-2 text-3xl font-bold text-[#0B1F3A]">
            Continuous Learning
          </h1>
          <p className="mt-2 text-[#64748B]">
            Manage your certifications, courses, training, and learning journey.
          </p>
        </div>

        <Link
          href="/admin/learning/new"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <Plus size={19} />
          Add Learning
        </Link>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Records"
          value={total}
          icon={<BookOpen size={25} />}
        />
        <StatCard
          label="Published"
          value={published}
          icon={<GlobeIcon />}
        />
        <StatCard
          label="Drafts"
          value={drafts}
          icon={<Pencil size={25} />}
        />
        <StatCard
          label="In Progress"
          value={inProgress}
          icon={<GraduationCap size={25} />}
        />
      </div>

      <section className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm">
        <div className="border-b border-[#E2E8F0] px-7 py-6">
          <h2 className="text-lg font-semibold text-[#0B1F3A]">
            Learning Records
          </h2>
          <p className="mt-1 text-sm text-[#64748B]">
            All learning activities stored in your portfolio CMS.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="flex min-h-[350px] flex-col items-center justify-center px-6 text-center">
            <div className="mb-5 rounded-2xl bg-blue-50 p-5 text-[#2563EB]">
              <GraduationCap size={38} />
            </div>
            <h3 className="text-lg font-semibold text-[#0B1F3A]">
              No learning records yet
            </h3>
            <p className="mt-2 text-sm text-[#64748B]">
              Start by adding your first certification, course, or training.
            </p>
            <Link
              href="/admin/learning/new"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              <Plus size={17} />
              Add Your First Learning
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-[#E2E8F0]">
            {items.map((item) => {
              const logoUrl = getPublicUrl(item.provider_logo_path);

              return (
                <div
                  key={item.id}
                  className="flex flex-col justify-between gap-5 px-6 py-6 lg:flex-row lg:items-center"
                >
                  <div className="flex min-w-0 items-start gap-4">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#E2E8F0] bg-slate-50">
                      {logoUrl ? (
                        <img
                          src={logoUrl}
                          alt={item.provider}
                          className="h-full w-full object-contain p-2"
                        />
                      ) : (
                        <Award
                          size={28}
                          className="text-[#94A3B8]"
                        />
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-[#0B1F3A]">
                          {item.title}
                        </h3>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            item.status === "published"
                              ? "bg-green-50 text-green-700"
                              : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {item.status === "published"
                            ? "Published"
                            : "Draft"}
                        </span>
                      </div>

                      <p className="mt-1 text-sm text-[#64748B]">
                        {item.provider}
                      </p>

                      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-[#64748B]">
                        <span className="rounded-md bg-slate-100 px-2 py-1">
                          {formatCategory(item.category)}
                        </span>
                        <span className="rounded-md bg-blue-50 px-2 py-1 text-blue-700">
                          {item.learning_status === "completed"
                            ? "Completed"
                            : "In Progress"}
                        </span>
                        <span>
                          {formatDate(item.issue_date)}
                        </span>
                      </div>

                      {item.description && (
                        <p className="mt-2 line-clamp-2 text-sm text-[#94A3B8]">
                          {item.description}
                        </p>
                      )}

                      {Array.isArray(item.skills) &&
                        item.skills.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {item.skills.slice(0, 5).map(
                              (skill: string, index: number) => (
                                <span
                                  key={`${skill}-${index}`}
                                  className="rounded-md border border-[#E2E8F0] px-2 py-1 text-xs text-[#64748B]"
                                >
                                  {skill}
                                </span>
                              )
                            )}
                            {item.skills.length > 5 && (
                              <span className="px-2 py-1 text-xs text-[#94A3B8]">
                                +{item.skills.length - 5} more
                              </span>
                            )}
                          </div>
                        )}
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2 lg:justify-end">
                    {item.certificate_path && (
                      <a
                        href={getPublicUrl(item.certificate_path)}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-[#E2E8F0] px-3 py-2.5 text-sm text-[#334155] hover:bg-slate-50"
                      >
                        <ExternalLink size={16} />
                        Certificate
                      </a>
                    )}

                    <Link
                      href={`/admin/learning/${item.id}/edit`}
                      className="inline-flex items-center gap-2 rounded-lg border border-[#E2E8F0] px-4 py-2.5 text-sm text-[#334155] hover:bg-slate-50"
                    >
                      <Pencil size={16} />
                      Edit
                    </Link>

                    <LearningDeleteButton id={item.id} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
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
    <div className="rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#64748B]">{label}</p>
        <span className="text-[#2563EB]">{icon}</span>
      </div>
      <p className="mt-5 text-3xl font-bold text-[#0B1F3A]">
        {value}
      </p>
    </div>
  );
}

function GlobeIcon() {
  return <Award size={25} />;
}
