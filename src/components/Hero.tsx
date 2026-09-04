import Image from "next/image";
import { ArrowDown, ArrowUpRight, BarChart3 } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#F8FAFC]"
    >
      {/* Data grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage: `
            linear-gradient(to right, #E2E8F0 1px, transparent 1px),
            linear-gradient(to bottom, #E2E8F0 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-10 px-6 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:px-8 lg:py-14">
        {/* Left Content */}
        <div className="relative z-10">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-[#2563EB]">
            Data Science Graduate | Aspiring Data Analyst
          </p>

          <h1 className="max-w-3xl text-5xl font-bold leading-[1.02] tracking-[-0.03em] text-[#0B1F3A] sm:text-6xl lg:text-[68px]">
            Turning data into
            <span className="block text-[#2563EB]">
              meaningful insights.
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-7 text-[#64748B] sm:text-lg sm:leading-8">
            I’m Richo Wignyo Aji Saputra, a Data Science graduate from
            Universitas Airlangga with a strong interest in Data Analytics and
            Business Intelligence.
          </p>

          {/* Metrics */}
          <div className="mt-8 flex items-center gap-8 sm:gap-10">
            <div>
              <p className="text-2xl font-bold tracking-tight text-[#0B1F3A]">
                8
              </p>
              <p className="mt-1 text-xs font-medium uppercase tracking-[0.08em] text-[#64748B]">
                Selected Projects
              </p>
            </div>

            <div className="h-10 w-px bg-[#E2E8F0]" />

            <div>
              <p className="text-2xl font-bold tracking-tight text-[#0B1F3A]">
                1
              </p>
              <p className="mt-1 text-xs font-medium uppercase tracking-[0.08em] text-[#64748B]">
                Business Intelligence Internship
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-lg bg-[#2563EB] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1D4ED8]"
            >
              View My Work
              <ArrowUpRight size={17} />
            </a>

            <a
              href="/CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-[#CBD5E1] bg-white px-6 py-3.5 text-sm font-semibold text-[#0B1F3A] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#2563EB] hover:text-[#2563EB]"
            >
              View CV
              <ArrowUpRight size={17} />
            </a>
          </div>

          <a
            href="#about"
            className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-[#64748B] transition-colors hover:text-[#2563EB]"
          >
            Scroll to explore
            <ArrowDown size={16} />
          </a>
        </div>

        {/* Profile Photo */}
        <div className="relative z-10 mx-auto w-full max-w-md lg:max-w-lg">
          {/* Decorative data points */}
          <div className="absolute -right-5 -top-5 h-28 w-28 rounded-full bg-[#0F766E]/10" />
          <div className="absolute -bottom-5 -left-5 h-28 w-28 rounded-full bg-[#2563EB]/10" />

          {/* Horizontal data line */}
          <div className="absolute -right-10 top-1/2 hidden w-24 items-center lg:flex">
            <div className="h-px w-full bg-[#CBD5E1]" />
            <div className="ml-2 h-2 w-2 rounded-full bg-[#0F766E]" />
          </div>

          {/* Photo */}
          <div className="relative overflow-hidden rounded-[24px] border border-[#E2E8F0] bg-white shadow-sm">
            <div className="relative aspect-[4/5] w-full">
              <Image
                src="/profile.jpg"
                alt="Richo Wignyo Aji Saputra"
                fill
                priority
                className="object-cover object-top"
                sizes="(max-width: 1024px) 80vw, 40vw"
              />
            </div>
          </div>

          {/* Target role card */}
          <div className="absolute -bottom-5 right-4 w-[290px] rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-sm sm:right-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-[#64748B]">
                  Open to
                </p>

                <p className="mt-1 text-sm font-bold text-[#0B1F3A]">
                  Data Analyst Roles
                </p>
              </div>

              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0F766E]/10 text-[#0F766E]">
                <BarChart3 size={16} />
              </div>
            </div>

            <div className="mt-4 text-xs text-[#64748B]">
              Surabaya · Jakarta
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}