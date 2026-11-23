
import { redirect } from "next/navigation";
import ProjectForm from "@/components/admin/projects/ProjectForm";
import { createClient } from "@/lib/supabase/server";

export default async function NewProjectPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.app_metadata?.role !== "admin") {
    redirect("/login");
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <ProjectForm mode="create" />
    </div>
  );
}
