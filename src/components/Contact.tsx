import { ArrowUpRight, Mail } from "lucide-react";

type Contact = {
  label: string;
  value: string;
  href: string;
  icon?: typeof Mail;
  image?: string;
};

const contacts: Contact[] = [
  {
    label: "Email",
    value: "richowignyo@gmail.com",
    href: "mailto:richowignyo@gmail.com",
    icon: Mail,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/richowignyo",
    href: "https://www.linkedin.com/in/richowignyo/",
    image: "/linkedin-logo.png",
  },
  {
    label: "GitHub",
    value: "github.com/richowignyo",
    href: "https://github.com/richowignyo",
    image: "/github-logo.png",
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="border-t border-[#E2E8F0] bg-[#F8FAFC]"
    >
      <div className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          {/* Left */}
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#2563EB]">
              Let&apos;s Connect
            </p>

            <h2 className="max-w-3xl text-4xl font-bold tracking-tight text-[#0B1F3A] sm:text-5xl">
              Let&apos;s work with data.
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-7 text-[#64748B]">
              I&apos;m open to opportunities in data analytics, business
              intelligence, and data-driven roles. Feel free to reach out if
              you&apos;d like to connect or discuss an opportunity.
            </p>
          </div>

          {/* Right */}
          <div className="space-y-3">
            {contacts.map((contact) => {
              const Icon = contact.icon;

              return (
                <a
                  key={contact.label}
                  href={contact.href}
                  target={contact.label !== "Email" ? "_blank" : undefined}
                  rel={
                    contact.label !== "Email"
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="group flex items-center justify-between rounded-2xl border border-[#E2E8F0] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#CBD5E1] hover:shadow-md"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#2563EB]">
                      {contact.image ? (
                        <img
                          src={contact.image}
                          alt={`${contact.label} logo`}
                          className="h-5 w-5 object-contain"
                        />
                      ) : Icon ? (
                        <Icon size={19} />
                      ) : null}
                    </div>

                    <div>
                      <p className="text-sm font-medium text-[#64748B]">
                        {contact.label}
                      </p>

                      <p className="mt-1 text-sm font-semibold text-[#0B1F3A]">
                        {contact.value}
                      </p>
                    </div>
                  </div>

                  <ArrowUpRight
                    size={18}
                    className="text-[#94A3B8] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#2563EB]"
                  />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}