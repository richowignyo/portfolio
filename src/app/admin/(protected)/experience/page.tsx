
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Plus,
  BriefcaseBusiness,
  Pencil,
  CalendarDays,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import ExperienceDeleteButton from "@/components/admin/experience/ExperienceDeleteButton";

export default async function ExperiencePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.app_metadata?.role !== "admin") {
    redirect("/admin/login");
  }

  const { data: experiences, error } = await supabase
    .from("professional_experiences")
    .select("*")
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-[#2563EB]">
            Content Management
          </p>

          <h1 className="mt-2 text-3xl font-bold text-[#0B1F3A]">
            Professional Experience
          </h1>

          <p className="mt-2 text-[#64748B]">
            Manage your professional work experience and career history.
          </p>
        </div>

        <Link
          href="/admin/experience/new"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Experience
        </Link>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Total Experiences"
          value={experiences?.length ?? 0}
          icon={<BriefcaseBusiness size={20} />}
        />

        <StatCard
          label="Published"
          value={
            experiences?.filter((item) => item.status === "published")
              .length ?? 0
          }
          icon={<CalendarDays size={20} />}
        />

        <StatCard
          label="Drafts"
          value={
            experiences?.filter((item) => item.status === "draft").length ?? 0
          }
          icon={<Pencil size={20} />}
        />
      </div>

      {/* Experience List */}
      <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm">
        <div className="border-b border-[#E2E8F0] px-6 py-5">
          <h2 className="font-semibold text-[#0B1F3A]">
            Experience Records
          </h2>

          <p className="mt-1 text-sm text-[#64748B]">
            All professional experience entries.
          </p>
        </div>

        {error ? (
          <div className="p-8 text-center text-sm text-red-600">
            Failed to load experiences: {error.message}
          </div>
        ) : !experiences || experiences.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <BriefcaseBusiness
              size={40}
              className="mx-auto text-[#CBD5E1]"
            />

            <h3 className="mt-4 font-semibold text-[#0B1F3A]">
              No experience records yet
            </h3>

            <p className="mt-2 text-sm text-[#64748B]">
              Start by adding your first professional experience.
            </p>

            <Link
              href="/admin/experience/new"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              <Plus size={17} />
              Add Your First Experience
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-[#E2E8F0]">
            {experiences.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-semibold text-[#0B1F3A]">
                      {item.position}
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
                    {item.company}
                    {item.location ? ` · ${item.location}` : ""}
                  </p>

                  <p className="mt-2 text-xs text-[#94A3B8]">
                    {item.start_date} –{" "}
                    {item.is_current ? "Present" : item.end_date ?? "N/A"}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    href={`/admin/experience/${item.id}/edit`}
                    className="inline-flex w-fit items-center gap-2 rounded-lg border border-[#E2E8F0] px-4 py-2 text-sm font-medium text-[#475569] transition-colors hover:border-[#2563EB] hover:text-[#2563EB]"
                  >
                    <Pencil size={15} />
                    Edit
                  </Link>

                  <ExperienceDeleteButton
                    id={item.id}
                    position={item.position}
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
