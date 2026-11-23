
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  FolderKanban,
  GraduationCap,
  PanelLeftClose,
  PanelLeftOpen,
  Layers,
} from "lucide-react";

interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navigation = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Professional Experience",
    href: "/admin/experience",
    icon: BriefcaseBusiness,
  },
  {
    label: "Projects",
    href: "/admin/projects",
    icon: FolderKanban,
  },
  {
    label: "Continuous Learning",
    href: "/admin/learning",
    icon: GraduationCap,
  },
];

export default function AdminSidebar({
  collapsed,
  onToggle,
}: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`flex h-screen flex-col border-r border-slate-200 bg-white transition-all duration-300 ${
        collapsed ? "w-19" : "w-65"
      }`}
    >
      {/* Brand */}
      <div className="flex h-19 items-center justify-between border-b border-slate-100 px-5">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600">
              <Layers size={20} className="text-white" />
            </div>

            <div>
              <h1 className="text-sm font-bold tracking-wide text-slate-900">
                RICHO CMS
              </h1>
              <p className="text-[10px] text-slate-500">
                Portfolio Management
              </p>
            </div>
          </div>
        )}

        {collapsed && (
          <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600">
            <Layers size={20} className="text-white" />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-7 overflow-y-auto px-3 py-6">
        <div>
          {!collapsed && (
            <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              General
            </p>
          )}

          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;

              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={collapsed ? item.label : undefined}
                  className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition-colors ${
                    isActive
                      ? "bg-blue-50 font-semibold text-blue-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  } ${collapsed ? "justify-center" : ""}`}
                >
                  <Icon size={19} strokeWidth={1.8} />

                  {!collapsed && (
                    <span className="truncate">{item.label}</span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Collapse Button */}
      <div className="border-t border-slate-100 p-3">
        <button
          type="button"
          onClick={onToggle}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-slate-500 transition hover:bg-slate-50 hover:text-slate-900 ${
            collapsed ? "justify-center" : ""
          }`}
        >
          {collapsed ? (
            <PanelLeftOpen size={19} />
          ) : (
            <PanelLeftClose size={19} />
          )}

          {!collapsed && <span>Collapse Sidebar</span>}
        </button>
      </div>
    </aside>
  );
}
