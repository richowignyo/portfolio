
"use client";

import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

interface AdminShellProps {
  children: React.ReactNode;
  email?: string;
}

export default function AdminShell({
  children,
  email,
}: AdminShellProps) {
  const [collapsed, setCollapsed] = useState(false);

  function handleToggleSidebar() {
    setCollapsed((previous) => !previous);
  }

  return (
    <div className="flex min-h-screen bg-slate-50">

      {/* Sidebar */}
      <AdminSidebar
        collapsed={collapsed}
        onToggle={handleToggleSidebar}
      />

      {/* Main Content */}
      <div className="flex min-w-0 flex-1 flex-col">

        {/* Header */}
        <AdminHeader email={email} />

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-7xl">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}
