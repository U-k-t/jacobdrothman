import type { ReactNode } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft } from "lucide-react";
import { getProject } from "../../data/projects";
import { NotFound } from "./NotFound";

function Section({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">{label}</h2>
      {children}
    </div>
  );
}

export function Project() {
  const { slug = "" } = useParams();
  const project = getProject(slug);
  if (!project) return <NotFound />;

  return (
    <div className="min-h-[calc(100vh-theme(spacing.16))]">
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/work#projects"
            className="inline-flex items-center gap-1 text-brand-strong mb-8 hover:gap-2 transition-all"
          >
            <ArrowLeft size={16} />
            All work
          </Link>
          <h1 className="mb-3">{project.title}</h1>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-4">
            <span className="text-xs bg-gradient-to-br from-brand/20 to-brand-soft/20 text-brand-strong px-3 py-1 rounded-full">
              {project.maturity}
            </span>
            {project.maturityNote && (
              <span className="text-sm text-muted-foreground">{project.maturityNote}</span>
            )}
          </div>
          <p className="text-lg text-muted-foreground mb-10">{project.tagline}</p>

          <div className="bg-card border border-border rounded-lg p-6 sm:p-8 divide-y divide-border [&>*]:py-7 [&>*:first-child]:pt-0 [&>*:last-child]:pb-0">
            <Section label="User problem">
              <div className="space-y-3">
                {project.userProblem.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </Section>
            <Section label="Target user">
              <p>{project.targetUser}</p>
            </Section>
            <div>
              <div className="border-l-2 border-brand pl-5 -ml-1">
                <h2 className="text-xs uppercase tracking-wider text-brand-strong mb-2">Product hypothesis</h2>
                <p className="text-lg">{project.hypothesis}</p>
              </div>
            </div>
            <Section label="Key product decisions">
              <ul className="space-y-4">
                {project.decisions.map((d) => (
                  <li key={d.decision} className="rounded-lg border border-border p-4">
                    <p className="mb-1">{d.decision}</p>
                    <p className="text-sm text-muted-foreground">{d.why}</p>
                  </li>
                ))}
              </ul>
            </Section>
            <Section label="Workflow">
              <ol className="list-decimal pl-5 space-y-1 text-muted-foreground">
                {project.workflow.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ol>
            </Section>
            <Section label="Feedback and usage">
              <div className="bg-accent/50 rounded-lg p-5 space-y-3">
                {project.usage.map((u) => (
                  <p key={u}>{u}</p>
                ))}
              </div>
            </Section>
            <Section label="Iteration and next steps">
              {project.next.intro && <p className="text-muted-foreground mb-2">{project.next.intro}</p>}
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                {project.next.items.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </Section>
            {project.stack.length > 0 && (
              <Section label="Technology">
                <ul className="flex flex-wrap gap-2">
                  {project.stack.map((t) => (
                    <li key={t} className="text-xs text-muted-foreground bg-accent/50 rounded-full px-3 py-1">
                      {t}
                    </li>
                  ))}
                </ul>
              </Section>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
