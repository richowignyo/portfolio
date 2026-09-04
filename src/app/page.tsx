import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import OrganizationalExperience from "@/components/OrganizationalExperience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#111827]">
      <Navbar />

      <Hero />

      <About />

      <Experience />

      <OrganizationalExperience />

      <Projects />

      <Skills />

      <Certifications />

      <Contact />

      {/* Footer */}
      <footer className="bg-[#0B1F3A] px-6 pb-8 text-[#94A3B8] lg:px-8">
        <div className="mx-auto flex max-w-7xl justify-between border-t border-[#1E3A5F] pt-6 text-sm">
          <p>© 2026 Richo Wignyo Aji Saputra</p>
          <p>Data Science · Analytics · BI</p>
        </div>
      </footer>
    </main>
  );
}