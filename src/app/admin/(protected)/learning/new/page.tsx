
import { redirect } from "next/navigation";
import LearningForm from "@/components/admin/learning/LearningForm";
import { createClient } from "@/lib/supabase/server";

export default async function NewLearningPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.app_metadata?.role !== "admin") {
    redirect("/login");
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <LearningForm mode="create" />
    </div>
  );
}
