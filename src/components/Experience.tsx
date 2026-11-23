
"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  FileText,
} from "lucide-react";

const internshipPhotos = [
  {
    src: "/projects/bfi/internship-1.jpg",
    alt: "Internship presentation at BFI Finance",
  },
  {
    src: "/projects/bfi/internship-2.jpg",
    alt: "Internship workplace documentation at BFI Finance",
  },
  {
    src: "/projects/bfi/internship-3.jpg",
    alt: "Internship team documentation at BFI Finance",
  },
];

export type ProfessionalExperience = {
  id: string;
  company: string;
  position: string;
  employment_type: string | null;
  location: string | null;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  summary: string | null;
  responsibilities: string[];
  achievements: string[];
  tech_stack: string[];
  metrics: {
    value: string;
    label: string;
  }[];
  gallery: {
    src: string;
    path: string;
    alt: string;
  }[];
  case_study_slug: string | null;
  evidence_url: string | null;
  evidence_label: string | null;
  confidentiality_note: string | null;
};

type ExperienceProps = {
  additionalExperiences?: ProfessionalExperience[];
};

export default function Experience({
  additionalExperiences = [],
}: ExperienceProps) {
  const [currentPhoto, setCurrentPhoto] = useState(0);

  const previousPhoto = () => {
    setCurrentPhoto((current) =>
      current === 0 ? internshipPhotos.length - 1 : current - 1
    );
  };

  const nextPhoto = () => {
    setCurrentPhoto((current) =>
      current === internshipPhotos.length - 1 ? 0 : current + 1
    );
  };

  return (
    <section id="experience" className="bg-[#F8FAFC]">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2563EB]">
            Experience
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight text-[#0B1F3A] sm:text-5xl">
            Professional Experience
          </h2>
        </div>

        {/* BFI Finance - Existing Hardcoded Experience */}
        <article className="rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-sm transition-transform duration-300 hover:-translate-y-1 lg:p-10">
          {/* Header */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            {/* Photo + Experience Info */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              {/* Internship Photo Carousel */}
              <div className="relative w-full shrink-0 sm:w-47.5">
                <div className="overflow-hidden rounded-xl border border-[#E2E8F0] bg-[#F8FAFC]">
                  <img
                    src={internshipPhotos[currentPhoto].src}
                    alt={internshipPhotos[currentPhoto].alt}
                    className="h-32.5 w-full object-cover"
                  />

                  {/* Previous */}
                  <button
                    type="button"
                    onClick={previousPhoto}
                    aria-label="Previous internship photo"
                    className="absolute left-2 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full border border-[#E2E8F0] bg-white/90 p-1.5 text-[#0B1F3A] shadow-sm transition-colors hover:bg-white hover:text-[#2563EB]"
                  >
                    <ChevronLeft size={15} />
                  </button>

                  {/* Next */}
                  <button
                    type="button"
                    onClick={nextPhoto}
                    aria-label="Next internship photo"
                    className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full border border-[#E2E8F0] bg-white/90 p-1.5 text-[#0B1F3A] shadow-sm transition-colors hover:bg-white hover:text-[#2563EB]"
                  >
                    <ChevronRight size={15} />
                  </button>
                </div>

                {/* Indicators */}
                <div className="mt-2 flex justify-center gap-1.5">
                  {internshipPhotos.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setCurrentPhoto(index)}
                      aria-label={`View internship photo ${index + 1}`}
                      className={`h-1.5 rounded-full transition-all ${
                        index === currentPhoto
                          ? "w-5 bg-[#2563EB]"
                          : "w-1.5 bg-[#CBD5E1] hover:bg-[#94A3B8]"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Experience Info */}
              <div>
                <p className="text-sm font-medium text-[#2563EB]">
                  Jul 2025 – Aug 2025
                </p>

                <h3 className="mt-3 text-2xl font-bold text-[#0B1F3A]">
                  Business Intelligence Intern
                </h3>

                <p className="mt-2 text-lg text-[#64748B]">
                  PT BFI Finance Indonesia Tbk
                </p>
              </div>
            </div>

            {/* Location */}
            <span className="w-fit rounded-lg border border-[#E2E8F0] px-4 py-2 text-sm text-[#64748B]">
              Tangerang Selatan
            </span>
          </div>

          {/* Main Content */}
          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_0.8fr]">
            {/* Left */}
            <div>
              <p className="text-base leading-7 text-[#64748B] text-justify">
                Contributed to Business Intelligence initiatives within the
                Data and Project Management Division, focusing on data analysis
                and forecasting for business planning.
              </p>

              <ul className="mt-6 space-y-4 text-base leading-7 text-[#64748B] text-justify">
                <li className="border-l-2 border-[#2563EB] pl-4">
                  Developed daily booking value forecasting using{" "}
                  <span className="font-medium text-[#0B1F3A]">
                    3,865 daily observations
                  </span>{" "}
                  covering 2015 to July 2025.
                </li>

                <li className="border-l-2 border-[#0F766E] pl-4">
                  Built an XGBoost regression pipeline using day-of-week, month,
                  7-day lag, and 7-day rolling mean features.
                </li>

                <li className="border-l-2 border-[#2563EB] pl-4">
                  Evaluated the model using a time-based train-test split,
                  achieving{" "}
                  <span className="font-medium text-[#0B1F3A]">
                    13.23% MAPE
                  </span>{" "}
                  with Rp11.49B RMSE and Rp7.93B MAE.
                </li>

                <li className="border-l-2 border-[#0F766E] pl-4">
                  Generated an August 2025 forecast of approximately{" "}
                  <span className="font-medium text-[#0B1F3A]">
                    Rp30–60B per day
                  </span>{" "}
                  to support business planning and monitoring.
                </li>
              </ul>
            </div>

            {/* Right */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-[#64748B]">
                Key Results
              </p>

              <div className="mt-5 grid grid-cols-2 gap-4">
                <Metric value="3,865" label="Daily Observations" />
                <Metric value="Rp11.49B" label="RMSE" />
                <Metric value="Rp7.93B" label="MAE" />
                <Metric value="13.23%" label="MAPE" />
              </div>

              <div className="mt-8">
                <p className="text-sm font-semibold uppercase tracking-wider text-[#64748B]">
                  Tech
                </p>

                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                  {[
                    "Python",
                    "SQL",
                    "XGBoost",
                    "Data Analysis",
                    "Time Series Forecasting",
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="border-b border-[#CBD5E1] pb-1 text-sm text-[#64748B]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Evidence */}
          <div className="mt-8 flex flex-wrap gap-4 border-t border-[#E2E8F0] pt-6">
            <a
              href="/projects/bfi-finance-business-intelligence"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#2563EB] transition-colors hover:text-[#0F766E]"
            >
              View Case Study
              <ArrowUpRight size={16} />
            </a>

            <a
              href="https://drive.google.com/file/d/1Ce4Rv5s3ipaPt1X48JH3O7QSE4r8hDXZ/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#64748B] transition-colors hover:text-[#2563EB]"
            >
              Project Files
              <FileText size={16} />
            </a>
          </div>

          {/* Confidentiality Notice */}
          <div className="mt-6 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-5 py-4">
            <p className="text-xs leading-5 text-[#64748B]">
              To protect confidential company information, this case study
              uses synthetic data that preserves the analytical structure and
              workflow without exposing production records or proprietary
              information.
            </p>
          </div>
        </article>

        {/* Additional Experiences from Supabase */}
        {additionalExperiences.map((experience) => (
          <AdditionalExperienceCard
            key={experience.id}
            experience={experience}
          />
        ))}
      </div>
    </section>
  );
}

/* Additional Experience Card */
function AdditionalExperienceCard({
  experience,
}: {
  experience: ProfessionalExperience;
}) {
  const [currentPhoto, setCurrentPhoto] = useState(0);

  const gallery = experience.gallery ?? [];

  const previousPhoto = () => {
    setCurrentPhoto((current) =>
      current === 0 ? gallery.length - 1 : current - 1
    );
  };

  const nextPhoto = () => {
    setCurrentPhoto((current) =>
      current === gallery.length - 1 ? 0 : current + 1
    );
  };

  return (
    <article className="mt-8 rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-sm transition-transform duration-300 hover:-translate-y-1 lg:p-10">
      {/* Header */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
          {gallery.length > 0 && (
            <div className="relative w-full shrink-0 sm:w-47.5">
              <div className="overflow-hidden rounded-xl border border-[#E2E8F0] bg-[#F8FAFC]">
                <img
                  src={gallery[currentPhoto].src}
                  alt={gallery[currentPhoto].alt || experience.company}
                  className="h-32.5 w-full object-cover"
                />

                {gallery.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={previousPhoto}
                      aria-label="Previous experience photo"
                      className="absolute left-2 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full border border-[#E2E8F0] bg-white/90 p-1.5 text-[#0B1F3A] shadow-sm transition-colors hover:bg-white hover:text-[#2563EB]"
                    >
                      <ChevronLeft size={15} />
                    </button>

                    <button
                      type="button"
                      onClick={nextPhoto}
                      aria-label="Next experience photo"
                      className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full border border-[#E2E8F0] bg-white/90 p-1.5 text-[#0B1F3A] shadow-sm transition-colors hover:bg-white hover:text-[#2563EB]"
                    >
                      <ChevronRight size={15} />
                    </button>
                  </>
                )}
              </div>

              {gallery.length > 1 && (
                <div className="mt-2 flex justify-center gap-1.5">
                  {gallery.map((photo, index) => (
                    <button
                      key={`${photo.path}-${index}`}
                      type="button"
                      onClick={() => setCurrentPhoto(index)}
                      aria-label={`View experience photo ${index + 1}`}
                      className={`h-1.5 rounded-full transition-all ${
                        index === currentPhoto
                          ? "w-5 bg-[#2563EB]"
                          : "w-1.5 bg-[#CBD5E1] hover:bg-[#94A3B8]"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Experience Info */}
          <div>
            <p className="text-sm font-medium text-[#2563EB]">
              {formatExperiencePeriod(experience)}
            </p>

            <h3 className="mt-3 text-2xl font-bold text-[#0B1F3A]">
              {experience.position}
            </h3>

            <p className="mt-2 text-lg text-[#64748B]">
              {experience.company}
            </p>

            {experience.employment_type && (
              <p className="mt-1 text-sm text-[#94A3B8]">
                {experience.employment_type}
              </p>
            )}
          </div>
        </div>

        {/* Location */}
        {experience.location && (
          <span className="w-fit rounded-lg border border-[#E2E8F0] px-4 py-2 text-sm text-[#64748B]">
            {experience.location}
          </span>
        )}
      </div>

      {/* Main Content */}
      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_0.8fr]">
        {/* Left */}
        <div>
          {experience.summary && (
            <p className="text-base leading-7 text-[#64748B]">
              {experience.summary}
            </p>
          )}

          {(experience.responsibilities?.length > 0 ||
            experience.achievements?.length > 0) && (
            <ul className="mt-6 space-y-4 text-base leading-7 text-[#64748B]">
              {experience.responsibilities?.map((item, index) => (
                <li
                  key={`responsibility-${index}`}
                  className={`border-l-2 ${
                    index % 2 === 0
                      ? "border-[#2563EB]"
                      : "border-[#0F766E]"
                  } pl-4`}
                >
                  {item}
                </li>
              ))}

              {experience.achievements?.map((item, index) => (
                <li
                  key={`achievement-${index}`}
                  className={`border-l-2 ${
                    index % 2 === 0
                      ? "border-[#0F766E]"
                      : "border-[#2563EB]"
                  } pl-4`}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right */}
        <div>
          {experience.metrics?.length > 0 && (
            <>
              <p className="text-sm font-semibold uppercase tracking-wider text-[#64748B]">
                Key Results
              </p>

              <div className="mt-5 grid grid-cols-2 gap-4">
                {experience.metrics.map((metric, index) => (
                  <Metric
                    key={`${metric.label}-${index}`}
                    value={metric.value}
                    label={metric.label}
                  />
                ))}
              </div>
            </>
          )}

          {experience.tech_stack?.length > 0 && (
            <div className={experience.metrics?.length > 0 ? "mt-8" : ""}>
              <p className="text-sm font-semibold uppercase tracking-wider text-[#64748B]">
                Tech
              </p>

              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                {experience.tech_stack.map((tech) => (
                  <span
                    key={tech}
                    className="border-b border-[#CBD5E1] pb-1 text-sm text-[#64748B]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Evidence */}
      {(experience.case_study_slug || experience.evidence_url) && (
        <div className="mt-8 flex flex-wrap gap-4 border-t border-[#E2E8F0] pt-6">
          {experience.case_study_slug && (
            <a
              href={`/projects/${experience.case_study_slug}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#2563EB] transition-colors hover:text-[#0F766E]"
            >
              View Case Study
              <ArrowUpRight size={16} />
            </a>
          )}

          {experience.evidence_url && (
            <a
              href={experience.evidence_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#64748B] transition-colors hover:text-[#2563EB]"
            >
              {experience.evidence_label || "Project Files"}
              <FileText size={16} />
            </a>
          )}
        </div>
      )}

      {/* Confidentiality Notice */}
      {experience.confidentiality_note && (
        <div className="mt-6 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-5 py-4">
          <p className="text-xs leading-5 text-[#64748B]">
            {experience.confidentiality_note}
          </p>
        </div>
      )}
    </article>
  );
}

/* Metric Component */
function Metric({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-5">
      <p className="text-xl font-bold text-[#0B1F3A]">{value}</p>
      <p className="mt-1 text-xs text-[#64748B]">{label}</p>
    </div>
  );
}

/* Date Formatter */
function formatExperiencePeriod(experience: ProfessionalExperience) {
  const formatDate = (date: string) =>
    new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });

  const start = formatDate(experience.start_date);

  const end = experience.is_current
    ? "Present"
    : experience.end_date
      ? formatDate(experience.end_date)
      : "";

  return end ? `${start} – ${end}` : start;
}
