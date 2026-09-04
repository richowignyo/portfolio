import { ArrowUpRight } from "lucide-react";

const organizations = [
  {
    organization: "IRIS",
    role: "Researcher",
    period: "Jan 2025 – Nov 2025",
    location: "Surabaya",
    description:
      "Contributed to research and technology projects based on assigned responsibilities, supporting development and implementation across team projects.",
  },
  {
    organization: "HIMATESDA",
    role: "Head of Talent Escalation Division",
    period: "Jan 2024 – Dec 2024",
    location: "Surabaya",
    description:
      "Led the Talent Escalation Division, focusing on student interests, non-academic skills, competitions, communities, and creative activities.",
  },
  {
    organization: "BEM FTMM",
    role: "Staff — Ministry of Social Affairs",
    period: "Feb 2023 – Jan 2024",
    location: "Surabaya",
    description:
      "Contributed to social, community service, and environmental programs, including FTMM Solar Rays, while supporting other programs as a team member.",
  },
];

export default function OrganizationalExperience() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        {/* Section Header */}
        <div className="mb-14">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2563EB]">
            Organizational Experience
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight text-[#0B1F3A] sm:text-5xl">
            Beyond Professional Work
          </h2>
        </div>

        {/* Organizations */}
        <div className="divide-y divide-[#E2E8F0] border-y border-[#E2E8F0]">
          {organizations.map((item) => (
            <article
              key={`${item.organization}-${item.role}`}
              className="grid gap-6 py-8 transition-all duration-300 hover:px-3 lg:grid-cols-[1.1fr_2fr_0.7fr] lg:items-start"
            >
              {/* Organization */}
              <div>
                <h3 className="text-xl font-bold text-[#0B1F3A]">
                  {item.organization}
                </h3>

                <p className="mt-2 text-sm font-medium text-[#2563EB]">
                  {item.role}
                </p>
              </div>

              {/* Description */}
              <div>
                <p className="max-w-2xl text-base leading-7 text-[#64748B]">
                  {item.description}
                </p>
              </div>

              {/* Period / Location */}
              <div className="lg:text-right">
                <p className="text-sm font-medium text-[#0B1F3A]">
                  {item.period}
                </p>

                <p className="mt-1 text-sm text-[#64748B]">
                  {item.location}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Selected Leadership */}
        <div className="mt-20">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2563EB]">
            Selected Leadership
          </p>

          <div className="mt-6 border-y border-[#E2E8F0]">
            <article className="grid gap-6 py-8 transition-all duration-300 hover:px-3 lg:grid-cols-[1.1fr_2fr_0.7fr] lg:items-start">
              <div>
                <h3 className="text-xl font-bold text-[#0B1F3A]">
                  Airnology 2023
                </h3>

                <p className="mt-2 text-sm font-medium text-[#0F766E]">
                  Logistics Division Lead
                </p>
              </div>

              <div>
                <p className="max-w-2xl text-base leading-7 text-[#64748B]">
                  Led the logistics division for a national competition and
                  event, coordinating resources and supporting event-day
                  operations across the committee.
                </p>
              </div>

              <div className="lg:text-right">
                <p className="text-sm font-medium text-[#0B1F3A]">2023</p>

                <p className="mt-1 text-sm text-[#64748B]">
                  Surabaya
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}