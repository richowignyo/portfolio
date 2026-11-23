
import { notFound, redirect } from "next/navigation";
import LearningForm from "@/components/admin/learning/LearningForm";
import { createClient } from "@/lib/supabase/server";
import type { LearningPayload } from "../../actions";

type EditLearningPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditLearningPage({
  params,
}: EditLearningPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.app_metadata?.role !== "admin") {
    redirect("/login");
  }

  const { data: record, error } = await supabase
    .from("learning_records")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !record) {
    notFound();
  }

  const initialData: LearningPayload & { id: string } = {
    id: record.id,
    title: record.title ?? "",
    provider: record.provider ?? "",
    category: record.category,
    learning_status: record.learning_status,
    description: record.description ?? "",
    skills: Array.isArray(record.skills)
      ? record.skills.map((item: unknown) => String(item))
      : [],
    issue_date: record.issue_date ?? "",
    expiration_date: record.expiration_date ?? null,
    credential_id: record.credential_id ?? "",
    credential_url: record.credential_url ?? "",
    certificate_path: record.certificate_path ?? "",
    provider_logo_path: record.provider_logo_path ?? "",
    display_order: record.display_order ?? 0,
    status: record.status,
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <LearningForm mode="edit" initialData={initialData} />
    </div>
  );
}
