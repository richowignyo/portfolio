import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  BarChart3,
  Database,
  LineChart,
  Target,
} from "lucide-react";
import type { ReactNode } from "react";

import { caseStudies } from "@/data/caseStudies";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProjectCaseStudy({ params }: PageProps) {
  const { slug } = await params;

  const project = caseStudies[slug as keyof typeof caseStudies];

  // Project not found
  if (!project) {
    return (
      <main className="min-h-screen bg-[#F8FAFC]">
        <div className="mx-auto max-w-4xl px-6 py-24 lg:px-8">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#2563EB] transition-colors hover:text-[#0F766E]"
          >
            <ArrowLeft size={16} />
            Back to Projects
          </Link>

          <div className="mt-16 rounded-2xl border border-[#E2E8F0] bg-white p-8 lg:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2563EB]">
              Case Study
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#0B1F3A]">
              Project not found
            </h1>

            <p className="mt-5 text-base leading-7 text-[#64748B]">
              The case study for this project is currently being prepared.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* =========================================================
          HEADER
      ========================================================= */}
      <section className="border-b border-[#E2E8F0] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#2563EB] transition-colors hover:text-[#0F766E]"
          >
            <ArrowLeft size={16} />
            Back to Projects
          </Link>

          <div className="mt-12 max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2563EB]">
              {project.category}
            </p>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-[#0B1F3A] sm:text-5xl lg:text-6xl">
              {project.title}
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#64748B]">
              {project.subtitle}
            </p>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-[#64748B]">
              {project.techStack.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>

            {slug === "bfi-finance-business-intelligence" ? (
              <div className="mt-8 rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-5 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#2563EB]">
                  Data Disclaimer
                </p>

                <p className="mt-3 text-sm leading-7 text-[#475569]">
                  The data used in this project consists of dummy/simulated data created for portfolio purposes. Actual/internal data from PT BFI Finance Indonesia Tbk is not publicly available.
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* =========================================================
          OVERVIEW
      ========================================================= */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0F766E]">
                Overview
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#0B1F3A] sm:text-4xl">
                {project.overview.title}
              </h2>

              <div className="mt-6 space-y-5 text-base leading-8 text-[#64748B]">
                {project.overview.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {project.overview.stats.map((stat, index) => (
                <MetricCard
                  key={`${stat.label}-${index}`}
                  icon={getMetricIcon(index)}
                  value={stat.value}
                  label={stat.label}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          PROBLEM & DATA
      ========================================================= */}
      <section className="bg-[#F8FAFC]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-2">
            <ContentBlock
              eyebrow="The Problem"
              title={project.problem.title}
            >
              {project.problem.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </ContentBlock>

            <ContentBlock eyebrow="The Data" title={project.data.title}>
              {project.data.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </ContentBlock>
          </div>
        </div>
      </section>

      {/* =========================================================
          APPROACH
      ========================================================= */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2563EB]">
              Approach
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#0B1F3A] sm:text-4xl">
              {project.approach.title}
            </h2>

            <p className="mt-5 text-base leading-8 text-[#64748B]">
              The workflow combined data preparation, feature engineering,
              analysis, modeling, and evaluation to produce and assess the
              final results.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {project.approach.steps.map((step) => (
              <ProcessCard
                key={step.number}
                number={step.number}
                title={step.title}
                description={step.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          MODEL
          Optional — only rendered when "model" exists.
      ========================================================= */}
      {"model" in project && project.model ? (
        <section className="bg-[#F8FAFC]">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0F766E]">
                  Model
                </p>

                <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#0B1F3A] sm:text-4xl">
                  {project.model.title}
                </h2>

                <p className="mt-5 text-base leading-8 text-[#64748B]">
                  {project.model.description}
                </p>
              </div>

              <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 lg:p-8">
                <div className="grid gap-6 sm:grid-cols-2">
                  {project.model.parameters.map((parameter) => (
                    <ModelItem
                      key={parameter.label}
                      label={parameter.label}
                      value={parameter.value}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* =========================================================
          MODEL COMPARISON
          Optional — only rendered when "modelComparison" exists.
      ========================================================= */}
      {"modelComparison" in project && project.modelComparison ? (
        <ModelComparisonSection
          modelComparison={project.modelComparison}
        />
      ) : null}

      {/* =========================================================
          RESULTS
      ========================================================= */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2563EB]">
              Results
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#0B1F3A] sm:text-4xl">
              {project.results.title}
            </h2>

            <p className="mt-5 text-base leading-8 text-[#64748B]">
              {project.results.description}
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {project.results.metrics.map((metric, index) => (
              <ResultCard
                key={`${metric.label}-${index}`}
                icon={getResultIcon(index)}
                value={metric.value}
                label={metric.label}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          VISUALIZATIONS
          Optional — only rendered when "visualizations" exists.
      ========================================================= */}
      {"visualizations" in project && project.visualizations ? (
        <section className="bg-[#F8FAFC]">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2563EB]">
                Visual Analysis
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#0B1F3A] sm:text-4xl">
                {project.visualizations.title}
              </h2>

              <p className="mt-5 text-base leading-8 text-[#64748B]">
                Selected visualizations used to explore patterns, communicate
                findings, and support the analysis.
              </p>
            </div>

            <div className="mt-12 grid gap-8 lg:grid-cols-2">
              {project.visualizations.items.map((visual, index) => (
                <VisualCard
                  key={`${visual.title}-${index}`}
                  title={visual.title}
                  description={visual.description}
                  image={visual.image}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}
      {/* =========================================================
          MODEL EVALUATION
          Optional — only rendered when "evaluation" exists.
      ========================================================= */}
      {"evaluation" in project && project.evaluation ? (
        <ModelEvaluationSection
          evaluation={
            project.evaluation as {
              title: string;
              description: string;
              oneHand: {
                title: string;
                columns: string[];
                rows: {
                  alphabet: string;
                  precision: string | number;
                  recall: string | number;
                  f1: string | number;
                }[];
              };
              twoHand: {
                title: string;
                columns: string[];
                rows: {
                  alphabet: string;
                  precision: string | number;
                  recall: string | number;
                  f1: string | number;
                }[];
              };
            }
          }
        />
      ) : null}
      {/* =========================================================
          FORECAST INSIGHT
          Optional — only rendered when "forecast" exists.
      ========================================================= */}
      {"forecast" in project && project.forecast ? (
        <section className="bg-[#F8FAFC]">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
            <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
              <ContentBlock
                eyebrow="Forecast Insight"
                title={project.forecast.title}
              >
                {project.forecast.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </ContentBlock>

              <div className="rounded-2xl border border-[#E2E8F0] bg-white p-8">
                <p className="text-sm font-medium text-[#64748B]">
                  Forecast range
                </p>

                <p className="mt-3 text-4xl font-bold tracking-tight text-[#0B1F3A]">
                  {project.forecast.range}
                </p>

                <p className="mt-2 text-sm text-[#64748B]">
                  {project.forecast.label}
                </p>

                <div className="mt-8 h-px bg-[#E2E8F0]" />

                <div className="mt-6 flex items-center justify-between gap-4">
                  <span className="text-sm text-[#64748B]">
                    Forecast period
                  </span>

                  <span className="text-sm font-semibold text-[#0B1F3A]">
                    {project.forecast.period}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* =========================================================
          KEY INSIGHT
          Optional — only rendered when "insight" exists.
      ========================================================= */}
      {"insight" in project && project.insight ? (
        <section className="bg-[#F8FAFC]">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2563EB]">
                  Key Insight
                </p>

                <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#0B1F3A] sm:text-4xl">
                  {project.insight.title}
                </h2>
              </div>

              <div className="rounded-2xl border border-[#E2E8F0] bg-white p-7 lg:p-8">
                <div className="space-y-5 text-base leading-8 text-[#64748B]">
                  {project.insight.paragraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* =========================================================
          MY CONTRIBUTION
      ========================================================= */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0F766E]">
              My Contribution
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#0B1F3A] sm:text-4xl">
              {project.contribution.title}
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {project.contribution.items.map((item) => (
              <ContributionCard
                key={item.title}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          EVIDENCE
      ========================================================= */}
      <section className="border-t border-[#E2E8F0] bg-[#F8FAFC]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2563EB]">
                Evidence
              </p>

              <h2 className="mt-3 text-2xl font-bold text-[#0B1F3A]">
                {project.evidence.title}
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#64748B]">
                {project.evidence.description}
              </p>
            </div>

            {project.evidence.link && project.evidence.link !== "#" ? (
              <a
                href={project.evidence.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1D4ED8]"
              >
                {project.evidence.linkLabel}
                <ArrowUpRight size={16} />
              </a>
            ) : (
              <span className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#CBD5E1] bg-white px-5 py-3 text-sm font-semibold text-[#64748B]">
                {project.evidence.linkLabel}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================
          BACK TO PROJECTS
      ========================================================= */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#2563EB] transition-colors hover:text-[#0F766E]"
          >
            <ArrowLeft size={16} />
            Back to Projects
          </Link>
        </div>
      </section>
    </main>
  );
}

/* ===============================================================
   MODEL COMPARISON
=============================================================== */

function ModelComparisonSection({
  modelComparison,
}: {
  modelComparison: {
    title: string;
    description: string;
    shallot: {
      title: string;
      rows: {
        scenario: string;
        model: string;
        rmse: string;
        mae: string;
        mape: string;
      }[];
    };
    garlic: {
      title: string;
      rows: {
        scenario: string;
        model: string;
        rmse: string;
        mae: string;
        mape: string;
      }[];
    };
  };
}) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2563EB]">
            Model Comparison
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#0B1F3A] sm:text-4xl">
            {modelComparison.title}
          </h2>

          <p className="mt-5 text-base leading-8 text-[#64748B]">
            {modelComparison.description}
          </p>
        </div>

        <div className="mt-12 space-y-10">
          <ComparisonTable
            title={modelComparison.shallot.title}
            rows={modelComparison.shallot.rows}
          />

          <ComparisonTable
            title={modelComparison.garlic.title}
            rows={modelComparison.garlic.rows}
          />
        </div>
      </div>
    </section>
  );
}

/* ===============================================================
   COMPARISON TABLE
=============================================================== */

function ComparisonTable({
  title,
  rows,
}: {
  title: string;
  rows: {
    scenario: string;
    model: string;
    rmse: string;
    mae: string;
    mape: string;
  }[];
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white">
      <div className="border-b border-[#E2E8F0] px-6 py-5">
        <h3 className="text-xl font-bold text-[#0B1F3A]">{title}</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left">
          <thead className="bg-[#F8FAFC]">
            <tr className="border-b border-[#E2E8F0]">
              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                Scenario
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                Model
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                RMSE
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                MAE
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                MAPE
              </th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, index) => (
              <tr
                key={`${row.scenario}-${row.model}-${index}`}
                className="border-b border-[#E2E8F0] last:border-b-0"
              >
                <td className="px-5 py-4 text-sm font-medium text-[#0B1F3A]">
                  {row.scenario}
                </td>

                <td className="px-5 py-4 text-sm text-[#64748B]">
                  {row.model}
                </td>

                <td className="px-5 py-4 text-sm text-[#64748B]">
                  {row.rmse}
                </td>

                <td className="px-5 py-4 text-sm text-[#64748B]">
                  {row.mae}
                </td>

                <td className="px-5 py-4 text-sm font-semibold text-[#0F766E]">
                  {row.mape}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ===============================================================
   MODEL EVALUATION
=============================================================== */

function ModelEvaluationSection({
  evaluation,
}: {
  evaluation: {
    title: string;
    description: string;
    oneHand: {
      title: string;
      columns: string[];
      rows: {
        alphabet: string;
        precision: string | number;
        recall: string | number;
        f1: string | number;
      }[];
    };
    twoHand: {
      title: string;
      columns: string[];
      rows: {
        alphabet: string;
        precision: string | number;
        recall: string | number;
        f1: string | number;
      }[];
    };
  };
}) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0F766E]">
            Model Evaluation
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#0B1F3A] sm:text-4xl">
            {evaluation.title}
          </h2>

          <p className="mt-5 text-base leading-8 text-[#64748B]">
            {evaluation.description}
          </p>
        </div>

        <div className="mt-12 space-y-10">
          <EvaluationTable
            title={evaluation.oneHand.title}
            rows={evaluation.oneHand.rows}
          />

          <EvaluationTable
            title={evaluation.twoHand.title}
            rows={evaluation.twoHand.rows}
          />
        </div>
      </div>
    </section>
  );
}

/* ===============================================================
   EVALUATION TABLE
=============================================================== */

function EvaluationTable({
  title,
  rows,
}: {
  title: string;
  rows: {
    alphabet: string;
    precision: string | number;
    recall: string | number;
    f1: string | number;
  }[];
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white">
      <div className="border-b border-[#E2E8F0] px-6 py-5">
        <h3 className="text-xl font-bold text-[#0B1F3A]">{title}</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left">
          <thead className="bg-[#F8FAFC]">
            <tr className="border-b border-[#E2E8F0]">
              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                Alphabet
              </th>
              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                Precision
              </th>
              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                Recall
              </th>
              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                F1-Score
              </th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, index) => (
              <tr
                key={`${row.alphabet}-${index}`}
                className="border-b border-[#E2E8F0] last:border-b-0"
              >
                <td className="px-5 py-4 text-sm font-semibold text-[#0B1F3A]">
                  {row.alphabet}
                </td>
                <td className="px-5 py-4 text-sm text-[#64748B]">
                  {row.precision}
                </td>
                <td className="px-5 py-4 text-sm text-[#64748B]">
                  {row.recall}
                </td>
                <td className="px-5 py-4 text-sm font-semibold text-[#0F766E]">
                  {row.f1}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ===============================================================
   VISUAL CARD
=============================================================== */

function VisualCard({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image: string;
}) {
  return (
    <article className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white">
      <div className="border-b border-[#E2E8F0] px-6 py-6 lg:px-8">
        <h3 className="text-xl font-bold text-[#0B1F3A] sm:text-2xl">
          {title}
        </h3>

        <p className="mt-3 text-sm leading-6 text-[#64748B] sm:text-base">
          {description}
        </p>
      </div>

      <div className="bg-[#F8FAFC] p-4 sm:p-6 lg:p-8">
        <div className="relative aspect-video overflow-hidden rounded-xl border border-[#E2E8F0] bg-white">
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </article>
  );
}

/* ===============================================================
   METRIC CARD
=============================================================== */

function MetricCard({
  icon,
  value,
  label,
}: {
  icon: ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#2563EB]">
        {icon}
      </div>

      <p className="mt-6 text-3xl font-bold tracking-tight text-[#0B1F3A]">
        {value}
      </p>

      <p className="mt-2 text-sm text-[#64748B]">{label}</p>
    </div>
  );
}

/* ===============================================================
   CONTENT BLOCK
=============================================================== */

function ContentBlock({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2563EB]">
        {eyebrow}
      </p>

      <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#0B1F3A]">
        {title}
      </h2>

      <div className="mt-6 space-y-5 text-base leading-8 text-[#64748B]">
        {children}
      </div>
    </div>
  );
}

/* ===============================================================
   PROCESS CARD
=============================================================== */

function ProcessCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
      <span className="text-sm font-semibold text-[#2563EB]">{number}</span>

      <h3 className="mt-8 text-xl font-bold text-[#0B1F3A]">{title}</h3>

      <p className="mt-3 text-sm leading-6 text-[#64748B]">{description}</p>
    </div>
  );
}

/* ===============================================================
   MODEL ITEM
=============================================================== */

function ModelItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wider text-[#94A3B8]">
        {label}
      </p>

      <p className="mt-2 text-lg font-bold text-[#0B1F3A]">{value}</p>
    </div>
  );
}

/* ===============================================================
   RESULT CARD
=============================================================== */

function ResultCard({
  icon,
  value,
  label,
}: {
  icon: ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-7">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#2563EB]">
        {icon}
      </div>

      <p className="mt-7 text-3xl font-bold tracking-tight text-[#0B1F3A]">
        {value}
      </p>

      <p className="mt-2 text-sm font-medium text-[#64748B]">{label}</p>
    </div>
  );
}

/* ===============================================================
   CONTRIBUTION CARD
=============================================================== */

function ContributionCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
      <h3 className="text-lg font-bold text-[#0B1F3A]">{title}</h3>

      <p className="mt-3 text-sm leading-6 text-[#64748B]">{description}</p>
    </div>
  );
}

/* ===============================================================
   ICON HELPERS
=============================================================== */

function getMetricIcon(index: number): ReactNode {
  const icons = [
    <Database key="database" size={20} />,
    <LineChart key="line-chart" size={20} />,
    <BarChart3 key="bar-chart" size={20} />,
  ];

  return icons[index % icons.length];
}

function getResultIcon(index: number): ReactNode {
  const icons = [
    <Target key="target" size={20} />,
    <BarChart3 key="bar-chart" size={20} />,
    <LineChart key="line-chart" size={20} />,
  ];

  return icons[index % icons.length];
}