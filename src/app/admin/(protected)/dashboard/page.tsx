
export default function AdminDashboardPage() {
  return (
    <div>
      {/* Page Heading */}
      <div className="mb-8">
        <p className="text-sm font-semibold text-blue-600">
          OVERVIEW
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          Dashboard
        </h1>

        <p className="mt-2 text-slate-500">
          Welcome back! Manage your portfolio content here.
        </p>
      </div>

      {/* Content Management Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-slate-900">
            Professional Experience
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Manage your professional work experience.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-slate-900">
            Projects
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Manage your portfolio projects and details.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-slate-900">
            Continuous Learning
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Manage certifications, training, and learning records.
          </p>
        </div>

      </div>
    </div>
  );
}
