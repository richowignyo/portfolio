
"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  ChevronRight,
  LogOut,
  UserRound,
} from "lucide-react";

interface AdminHeaderProps {
  email?: string;
}

const pageTitles: Record<string, string> = {
  "/admin/dashboard": "Dashboard",
  "/admin/experiences": "Professional Experience",
  "/admin/projects": "Projects",
  "/admin/learning": "Continuous Learning",
};

export default function AdminHeader({
  email,
}: AdminHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const currentPage = pageTitles[pathname] ?? "Admin";
  const displayName = email?.split("@")[0] ?? "Administrator";

  async function handleLogout() {
    setLoading(true);
    setError("");

    try {
      const supabase = createClient();

      const { error: logoutError } =
        await supabase.auth.signOut();

      if (logoutError) {
        throw logoutError;
      }

      router.replace("/admin/login");
      router.refresh();
    } catch {
      setError("Logout failed. Please try again.");
      setLoading(false);
    }
  }

  return (
    <header className="sticky top-0 z-30 flex min-h-18 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-slate-400">
          Admin
        </span>

        <ChevronRight size={15} className="text-slate-400" />

        <span className="font-semibold text-slate-900">
          {currentPage}
        </span>
      </div>

      {/* Administrator Profile */}
      <div className="flex items-center gap-3">

        <div className="hidden text-right sm:block">
          <p className="text-sm font-semibold capitalize text-slate-800">
            {displayName}
          </p>

          <p className="text-xs text-slate-500">
            Administrator
          </p>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600">
          <UserRound size={19} />
        </div>

        <button
          type="button"
          onClick={handleLogout}
          disabled={loading}
          title="Logout"
          className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
        >
          <LogOut size={16} />

          <span className="hidden sm:inline">
            {loading ? "Signing out..." : "Logout"}
          </span>
        </button>
      </div>

      {error && (
        <p className="absolute right-4 top-full mt-2 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600 shadow-sm">
          {error}
        </p>
      )}

    </header>
  );
}
