
import { createClient } from "@/lib/supabase/server";
import AdminShell from "@/components/admin/AdminShell";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  // Validate authentication session
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    redirect("/admin/login");
  }

  // Validate administrator role
  const appMetadata = data.claims.app_metadata as
    | { role?: string }
    | undefined;

  if (appMetadata?.role !== "admin") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <div className="max-w-md rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-red-600">
            Access Denied
          </h1>

          <p className="mt-3 text-sm text-slate-500">
            You do not have permission to access this dashboard.
          </p>
        </div>
      </main>
    );
  }

  // Get administrator email
  const email =
    typeof data.claims.email === "string"
      ? data.claims.email
      : undefined;

  return (
    <AdminShell email={email}>
      {children}
    </AdminShell>
  );
}
