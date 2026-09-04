const skillGroups = [
  {
    title: "Programming & Data",
    description: "Languages and core tools for data analysis and modeling.",
    skills: [
      "Python",
      "SQL",
      "R",
      "Microsoft Excel",
      "Google Sheets",
    ],
  },
  {
    title: "Analytics & Visualization",
    description: "Turning data into insights, analysis, and clear visual stories.",
    skills: [
      "Data Visualization",
      "Statistical Analysis",
      "Power BI",
      "Tableau",
    ],
  },
  {
    title: "Statistical & Analysis Tools",
    description: "Tools used for statistical analysis, exploration, and development.",
    skills: [
      "SPSS",
      "RStudio",
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="bg-[#F8FAFC]">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2563EB]">
            Skills
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight text-[#0B1F3A] sm:text-5xl">
            Skills & Tools
          </h2>

          <p className="mt-6 text-base leading-7 text-[#64748B] sm:text-lg">
            A practical toolkit built through academic projects, professional
            experience, and hands-on data analysis work.
          </p>
        </div>

        {/* Skill Groups */}
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <SkillCard key={group.title} group={group} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCard({
  group,
}: {
  group: {
    title: string;
    description: string;
    skills: string[];
  };
}) {
  return (
    <article className="rounded-2xl border border-[#E2E8F0] bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md lg:p-8">
      {/* Small Data Marker */}
      <div className="flex items-center gap-3">
        <span className="h-2 w-2 rounded-full bg-[#2563EB]" />

        <p className="text-sm font-semibold uppercase tracking-wider text-[#64748B]">
          Skill Set
        </p>
      </div>

      <h3 className="mt-6 text-xl font-bold text-[#0B1F3A]">
        {group.title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-[#64748B]">
        {group.description}
      </p>

      {/* Skills */}
      <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3">
        {group.skills.map((skill) => (
          <span
            key={skill}
            className="border-b border-[#CBD5E1] pb-1 text-sm font-medium text-[#334155] transition-colors duration-200 hover:border-[#2563EB] hover:text-[#2563EB]"
          >
            {skill}
          </span>
        ))}
      </div>
    </article>
  );
}