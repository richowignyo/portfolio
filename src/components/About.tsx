"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const aboutImages = [
  {
    src: "/about/solar-rays.jpg",
    alt: "FTMM Solar Rays",
  },
  {
    src: "/about/bem-ftmm.jpg",
    alt: "BEM FTMM activity",
  },
  {
    src: "/about/iris.jpg",
    alt: "IRIS organization activity",
  },
  {
    src: "/about/social-program.jpg",
    alt: "Social program activity",
  },
  {
    src: "/about/organization.jpg",
    alt: "Organizational activity",
  },
];

export default function About() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((current) => (current + 1) % aboutImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const previousImage = () => {
    setCurrentImage(
      (current) =>
        (current - 1 + aboutImages.length) % aboutImages.length
    );
  };

  const nextImage = () => {
    setCurrentImage((current) => (current + 1) % aboutImages.length);
  };

  return (
    <section id="about" className="scroll-mt-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        {/* About Me */}
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* Left */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2563EB]">
              About Me
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight text-[#0B1F3A] sm:text-5xl">
              Who I am
            </h2>

            {/* Photo Carousel */}
            <div className="mt-8 max-w-sm">
              <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] shadow-sm">
                <img
                  src={aboutImages[currentImage].src}
                  alt={aboutImages[currentImage].alt}
                  className="h-full w-full object-cover transition-opacity duration-500"
                />

                {/* Previous */}
                <button
                  type="button"
                  onClick={previousImage}
                  aria-label="Previous photo"
                  className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#0B1F3A] shadow-sm transition-all hover:bg-white hover:scale-105"
                >
                  <ChevronLeft size={18} />
                </button>

                {/* Next */}
                <button
                  type="button"
                  onClick={nextImage}
                  aria-label="Next photo"
                  className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#0B1F3A] shadow-sm transition-all hover:bg-white hover:scale-105"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Indicators */}
              <div className="mt-3 flex items-center justify-center gap-2">
                {aboutImages.map((image, index) => (
                  <button
                    key={image.src}
                    type="button"
                    onClick={() => setCurrentImage(index)}
                    aria-label={`Show photo ${index + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === currentImage
                        ? "w-6 bg-[#2563EB]"
                        : "w-1.5 bg-[#CBD5E1] hover:bg-[#94A3B8]"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="space-y-5 text-lg leading-8 text-[#64748B]">
            <p>
              I’m a Data Science graduate from Universitas Airlangga with a
              strong interest in Data Analytics and Business Intelligence.
            </p>

            <p>
              Through academic, professional, and organizational experiences,
              I have worked with data across forecasting, business analysis,
              statistical analysis, visualization, and database-driven
              applications.
            </p>

            <p>
              My experience includes a Business Intelligence internship at BFI
              Finance, where I worked on booking value forecasting, as well as
              projects involving market analysis, statistical modeling,
              machine learning, and dashboard development.
            </p>

            <p>
              I enjoy turning raw data into clear insights that can support
              better decisions, and I’m currently looking to grow my career in
              Data Analytics, with a focus on turning data into actionable
              insights for better decision-making.
            </p>
          </div>
        </div>

        {/* Education */}
        <div className="mt-20">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2563EB]">
                Education
              </p>

              <h3 className="mt-3 text-2xl font-bold tracking-tight text-[#0B1F3A] sm:text-3xl">
                Universitas Airlangga
              </h3>
            </div>

            <p className="text-sm font-medium text-[#64748B]">
              2022 — 2026
            </p>
          </div>

          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            <div>
              <p className="text-sm text-[#64748B]">Degree</p>

              <p className="mt-2 font-semibold text-[#0B1F3A]">
                Bachelor of Data Science
              </p>

              <p className="mt-1 text-sm text-[#64748B]">S.Si.D</p>
            </div>

            <div>
              <p className="text-sm text-[#64748B]">Faculty</p>

              <p className="mt-2 font-semibold text-[#0B1F3A]">
                Faculty of Advanced Technology and Multidiscipline
              </p>
            </div>

            <div>
              <p className="text-sm text-[#64748B]">GPA</p>

              <p className="mt-2 text-2xl font-bold text-[#2563EB]">
                3.60
                <span className="text-base font-medium text-[#64748B]">
                  {" "}
                  / 4.00
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}