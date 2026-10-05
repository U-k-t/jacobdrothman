import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { caseStudies } from "../../data/work";
import { productProjects } from "../../data/projects";

// Projects are listed by maturity; the first two have real use, the rest are earlier-stage.
const mature = productProjects.slice(0, 2);
const early = productProjects.slice(2);

export function Work() {
  return (
    <div className="min-h-[calc(100vh-theme(spacing.16))]">
      <section className="py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="mb-6">Work</h1>
          <p className="text-lg text-muted-foreground mb-12 max-w-3xl">
            Three case studies from Infineon and my startup, then smaller products I built on my own.
            Each covers the problem, what I owned, the key decision, and the result.
          </p>

          <h2 id="selected-work" className="mb-6 scroll-mt-24">
            Selected Work
          </h2>
          <div className="space-y-6">
            {caseStudies.map((study) => (
              <Link
                key={study.slug}
                to={`/work/${study.slug}`}
                className="group block bg-card border border-border rounded-lg p-6 sm:p-8 hover:shadow-lg hover:border-[#1fa2ff]/30 transition-all"
              >
                <span className="inline-block text-xs bg-gradient-to-br from-[#1fa2ff]/20 to-[#60b8ff]/20 text-[#1fa2ff] px-3 py-1 rounded-full mb-4">
                  {study.tag}
                </span>
                <h3 className="text-2xl mb-1 group-hover:text-[#1fa2ff] transition-colors">
                  {study.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">{study.org}</p>
                <p className="text-muted-foreground mb-5">{study.summary}</p>
                <div className="bg-accent/50 rounded-lg px-4 py-3 mb-5">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Result</p>
                  <p className="text-[#1fa2ff]">{study.headline}</p>
                </div>
                <span className="inline-flex items-center gap-1 text-[#1fa2ff] group-hover:gap-2 transition-all">
                  Read the case study
                  <ArrowRight size={16} />
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-20 pt-10 border-t border-border">
            <h2 id="projects" className="mb-2 scroll-mt-24">
              Product Projects
            </h2>
            <p className="text-muted-foreground mb-6 max-w-3xl">
              Small tools I built for my own use, ordered by how far each has been used and validated.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              {mature.map((project) => (
                <Link
                  key={project.slug}
                  to={`/work/projects/${project.slug}`}
                  className="group flex flex-col items-start bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:border-[#1fa2ff]/30 transition-all"
                >
                  <span className="inline-block text-xs bg-gradient-to-br from-[#1fa2ff]/20 to-[#60b8ff]/20 text-[#1fa2ff] px-3 py-1 rounded-full mb-3">
                    {project.maturity}
                  </span>
                  <h3 className="text-xl mb-1 group-hover:text-[#1fa2ff] transition-colors">
                    {project.title}
                  </h3>
                  {project.maturityNote && (
                    <p className="text-xs text-muted-foreground mb-3">{project.maturityNote}</p>
                  )}
                  <p className="text-sm text-muted-foreground mb-4">{project.tagline}</p>
                  <span className="mt-auto inline-flex items-center gap-1 text-sm text-[#1fa2ff] group-hover:gap-2 transition-all">
                    Read more
                    <ArrowRight size={16} />
                  </span>
                </Link>
              ))}
            </div>
            {early.map((project) => (
              <Link
                key={project.slug}
                to={`/work/projects/${project.slug}`}
                className="group mt-6 block border border-dashed border-border rounded-lg px-6 py-4 hover:border-[#1fa2ff]/30 transition-colors"
              >
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="group-hover:text-[#1fa2ff] transition-colors">{project.title}</h3>
                  <span className="text-xs text-muted-foreground">
                    {project.maturity}
                    {project.maturityNote ? ` · ${project.maturityNote}` : ""}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{project.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
