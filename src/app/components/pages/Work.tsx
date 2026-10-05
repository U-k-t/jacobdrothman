import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { caseStudies } from "../../data/work";
import { productProjects } from "../../data/projects";

export function Work() {
  return (
    <div className="min-h-[calc(100vh-theme(spacing.16))]">
      <section className="py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="mb-6">Work</h1>
          <p className="text-lg text-muted-foreground mb-12 max-w-3xl">
            Each case study covers the problem, my role, the decision I made, what shipped or changed,
            and the result.
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
              Personal projects, ordered by how far each has been used and validated. They are at different stages on purpose.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {productProjects.map((project) => (
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
          </div>
        </div>
      </section>
    </div>
  );
}
