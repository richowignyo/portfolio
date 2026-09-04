"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-[#E2E8F0] bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <a
          href="#"
          onClick={() => setIsOpen(false)}
          className="text-xl font-bold tracking-tight text-[#0B1F3A]"
        >
          RW.
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-[#111827] transition-colors hover:text-[#2563EB]"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 text-[#0B1F3A] transition-colors hover:bg-[#F8FAFC] md:hidden"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-[#E2E8F0] bg-white md:hidden">
          <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
            <div className="flex flex-col">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="border-b border-[#F1F5F9] py-4 text-sm font-medium text-[#111827] transition-colors last:border-b-0 hover:text-[#2563EB]"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}