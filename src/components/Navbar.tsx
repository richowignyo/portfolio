
"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  // N2 & N3 — Active navigation and navbar transition
  useEffect(() => {
    let animationFrameId: number | null = null;

    const updateScrollState = () => {
      const scrollTop = window.scrollY;

      // N3 — Detect navbar scroll state
      setIsScrolled(scrollTop > 12);

      // N2 — Determine active navigation section
      const activationPoint = window.innerHeight * 0.35;
      let currentSection = "";

      for (const item of navItems) {
        const sectionId = item.href.replace("#", "");
        const section = document.getElementById(sectionId);

        if (!section) continue;

        const rect = section.getBoundingClientRect();

        if (rect.top <= activationPoint) {
          currentSection = sectionId;
        } else {
          break;
        }
      }

      setActiveSection(currentSection);
    };

    const handleScroll = () => {
      if (animationFrameId !== null) return;

      animationFrameId = requestAnimationFrame(() => {
        updateScrollState();
        animationFrameId = null;
      });
    };

    // Initial state
    updateScrollState();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);

      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  const handleNavigation = () => {
    setIsOpen(false);
  };

  return (
    <nav
      className={`sticky top-0 z-50 border-b border-[#E2E8F0] backdrop-blur transition-all duration-300 motion-reduce:transition-none ${
        isScrolled
          ? "bg-white/95 shadow-[0_4px_18px_rgba(15,23,42,0.06)]"
          : "bg-white/95 shadow-none"
      }`}
    >
      <div className="mx-auto flex h-20 w-full items-center justify-between px-6 lg:px-16">
        {/* Logo */}
        <a
          href="#"
          onClick={handleNavigation}
          className="text-2xl font-bold tracking-tight text-[#0B1F3A]"
        >
          <span className="text-[#2563EB]">RICH</span>
          <span className="text-[#0B1F3A]">O.</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden h-full items-center gap-8 md:flex">
          {navItems.map((item) => {
            const sectionId = item.href.replace("#", "");
            const isActive = activeSection === sectionId;

            return (
              <a
                key={item.label}
                href={item.href}
                aria-current={isActive ? "location" : undefined}
                className={`inline-flex h-full items-center border-b-2 text-base font-medium transition-colors duration-200 motion-reduce:transition-none ${
                  isActive
                    ? "border-[#2563EB] text-[#2563EB]"
                    : "border-transparent text-[#111827] hover:text-[#2563EB]"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label={
            isOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 text-[#0B1F3A] transition-colors hover:bg-[#F8FAFC] md:hidden"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-[#E2E8F0] bg-white md:hidden"
        >
          <div className="mx-auto w-full px-6 py-4 lg:px-16">
            <div className="flex flex-col">
              {navItems.map((item) => {
                const sectionId = item.href.replace("#", "");
                const isActive = activeSection === sectionId;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    aria-current={isActive ? "location" : undefined}
                    onClick={handleNavigation}
                    className={`border-b border-[#F1F5F9] py-4 text-base font-medium transition-colors duration-200 last:border-b-0 motion-reduce:transition-none ${
                      isActive
                        ? "text-[#2563EB]"
                        : "text-[#111827] hover:text-[#2563EB]"
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
