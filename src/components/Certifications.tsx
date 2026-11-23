
import { ArrowUpRight, Award, BadgeCheck } from "lucide-react";

export type AdditionalLearningRecord = {
  id: string;
  title: string;
  provider: string;
  category: string;
  learning_status: "in_progress" | "completed";
  description: string | null;
  skills: string[];
  issue_date: string | null;
  expiration_date: string | null;
  credential_id: string | null;
  credential_url: string | null;
  certificate_path: string | null;
  certificateUrl: string | null;
};

type CertificationItem = {
  id?: string;
  title: string;
  issuer: string;
  date: string;
  type: string;
  certificate: string | null;
  credentialId: string | null;
};

const certifications: CertificationItem[] = [
  {
    title: "Data Analyst",
    issuer: "DQLab — Digital Talent Academy",
    date: "Aug 2026",
    type: "Course",
    certificate: "/certifications/fundamental-of-data-analyst.jpg",
    credentialId: null,
  },
  {
    title: "Artificial Intelligence",
    issuer: "AWS — Digital Talent Academy",
    date: "Aug 2026",
    type: "Course",
    certificate: "/certifications/ai.jpg",
    credentialId: null,
  },
  {
    title: "Associate Data Scientist + Python",
    issuer: "Digital Talent Academy",
    date: "Sep 2026",
    type: "Course",
    certificate: "/certifications/associate-data-scientist-python.jpg",
    credentialId: "21211993840-9809",
  },
  {
    title: "Data Scientist Supervisor",
    issuer: "Digital Talent Academy",
    date: "Sep 2026",
    type: "Course",
    certificate: "/certifications/data-scientist-supervisor.jpg",
    credentialId: "21211994840-2492",
  },
  {
    title: "SQL (Basic)",
    issuer: "HackerRank",
    date: "Aug 2026",
    type: "Course",
    certificate: "/certifications/sql-basic.jpg",
    credentialId: "3565ED7FD226",
  },
  {
    title: "English Language Proficiency Test",
    issuer: "Pusat Bahasa dan Multibudaya Universitas Airlangga",
    date: "May 2022",
    type: "Certification",
    certificate: "/certifications/elpt.jpg",
    credentialId: null,
  },
  {
    title: "Pengenalan Data Science dan Pemanfaatannya di Berbagai Sektor",
    issuer: "Digital Talent Scholarship",
    date: "Aug 2026",
    type: "Course",
    certificate: "/certifications/data-science-micro-skill.jpg",
    credentialId: null,
  },
];

function formatLearningDate(date: string | null) {
  if (!date) return "Date not specified";

  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Date not specified";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(parsedDate);
}

function formatCategory(category: string) {
  const labels: Record<string, string> = {
    certification: "Certification",
    training: "Training",
    course: "Course",
    workshop: "Workshop",
    bootcamp: "Bootcamp",
    other: "Other",
  };

  return labels[category] ?? "Learning";
}

export default function Certifications({
  additionalLearningRecords = [],
}: {
  additionalLearningRecords?: AdditionalLearningRecord[];
}) {
  const additionalCertifications: CertificationItem[] =
    additionalLearningRecords.map((record) => ({
      id: record.id,
      title: record.title,
      issuer: record.provider,
      date: formatLearningDate(record.issue_date),
      type: formatCategory(record.category),
      certificate: record.certificateUrl,
      credentialId: record.credential_id,
    }));

  const allCertifications = [
    ...certifications,
    ...additionalCertifications,
  ];

  return (
    <section
      id="certifications"
      className="border-t border-[#E2E8F0] bg-white py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#2563EB]">
            Certifications & Training
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-[#0B1F3A] sm:text-4xl">
            Continuous Learning
          </h2>

          <p className="mt-4 max-w-2xl text-base leading-7 text-[#64748B]">
            Selected certifications and training that support my development
            in data analytics, data science, and related technical skills.
          </p>
        </div>

        {/* Certifications */}
        <div className="grid gap-5 md:grid-cols-2">
          {allCertifications.map((certification) => {
            const isCertification =
              certification.type === "Certification";

            return (
              <article
                key={certification.id ?? certification.title}
                className="group flex flex-col rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-md lg:p-7"
              >
                {/* Type + Date */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    {isCertification ? (
                      <BadgeCheck
                        size={16}
                        className="text-[#0F766E]"
                      />
                    ) : (
                      <span className="h-2 w-2 rounded-full bg-[#94A3B8]" />
                    )}

                    <span
                      className={`text-[11px] font-semibold uppercase tracking-[0.16em] ${
                        isCertification
                          ? "text-[#0F766E]"
                          : "text-[#64748B]"
                      }`}
                    >
                      {certification.type}
                    </span>
                  </div>

                  <span className="shrink-0 text-xs font-medium text-[#64748B]">
                    {certification.date}
                  </span>
                </div>

                {/* Title */}
                <div className="mt-5">
                  <h3 className="text-xl font-bold leading-tight text-[#0B1F3A]">
                    {certification.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#64748B]">
                    {certification.issuer}
                  </p>
                </div>

                {/* Credential */}
                {isCertification && (
                  <div className="mt-6 border-t border-[#E2E8F0] pt-4">
                    {certification.credentialId ? (
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#94A3B8]">
                          Credential ID
                        </p>

                        <p className="mt-1 font-mono text-xs font-medium text-[#475569]">
                          {certification.credentialId}
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#94A3B8]">
                          Credential ID
                        </p>

                        <p className="mt-1 text-xs font-medium text-[#475569]">
                          Verified certificate
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Training Status */}
                {!isCertification && (
                  <div className="mt-6 border-t border-[#E2E8F0] pt-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#94A3B8]">
                      Learning Program
                    </p>

                    <p className="mt-1 text-xs font-medium text-[#475569]">
                      {certification.type}
                    </p>
                  </div>
                )}

                {/* Certificate Link */}
                {certification.certificate && (
                  <div className="mt-auto pt-5">
                    <a
                      href={certification.certificate}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#2563EB] transition-colors hover:text-[#0F766E]"
                    >
                      <Award size={16} />
                      View Certificate
                      <ArrowUpRight
                        size={15}
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </a>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
