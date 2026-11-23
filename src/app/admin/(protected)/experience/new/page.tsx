
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ExperienceForm from "../../../../../components/admin/experience/ExperienceForm";

export default function NewExperiencePage() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/admin/experience"
          className="inline-flex items-center gap-2 text-sm text-[#64748B] hover:text-[#2563EB]"
        >
          <ArrowLeft size={16} />
          Back to Experience
        </Link>

        <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-[#2563EB]">
          Content Management
        </p>

        <h1 className="mt-2 text-3xl font-bold text-[#0B1F3A]">
          Add New Experience
        </h1>

        <p className="mt-2 text-[#64748B]">
          Add a new professional experience to your portfolio.
        </p>
      </div>

      <ExperienceForm />
    </div>
  );
}
