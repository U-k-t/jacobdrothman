import { Link } from "react-router";
import { Briefcase, TrendingUp, Code } from "lucide-react";

export function Portfolio() {
  return (
    <div className="min-h-[calc(100vh-theme(spacing.16))]">
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="mb-6">Portfolio</h1>

          <p className="text-lg text-muted-foreground mb-12">
            A showcase of my work across product strategy, process optimization, and technical projects. Each piece represents a challenge overcome and lessons learned.
          </p>

          <div className="space-y-6">
            <Link
              to="/portfolio/product-case-studies"
              className="group block bg-card border border-border rounded-lg p-8 hover:shadow-lg hover:border-[#1fa2ff]/30 transition-all"
            >
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-gradient-to-br from-[#1fa2ff]/20 to-[#60b8ff]/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Briefcase className="text-[#1fa2ff]" size={28} />
                </div>
                <div className="flex-1">
                  <h2 className="mb-3 group-hover:text-[#1fa2ff] transition-colors">
                    Product Case Studies
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Deep dives into product launches, feature development, and strategic initiatives. See how I've driven product success from concept to delivery.
                  </p>
                  <span className="text-[#1fa2ff] group-hover:underline">
                    View case studies →
                  </span>
                </div>
              </div>
            </Link>

            <Link
              to="/portfolio/process-improvement"
              className="group block bg-card border border-border rounded-lg p-8 hover:shadow-lg hover:border-[#1fa2ff]/30 transition-all"
            >
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-gradient-to-br from-[#1fa2ff]/20 to-[#60b8ff]/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <TrendingUp className="text-[#1fa2ff]" size={28} />
                </div>
                <div className="flex-1">
                  <h2 className="mb-3 group-hover:text-[#1fa2ff] transition-colors">
                    Process Improvement
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    How I've streamlined workflows, implemented agile practices, and fostered collaboration across teams to increase velocity and quality.
                  </p>
                  <span className="text-[#1fa2ff] group-hover:underline">
                    Explore improvements →
                  </span>
                </div>
              </div>
            </Link>

            <Link
              to="/portfolio/software-projects"
              className="group block bg-card border border-border rounded-lg p-8 hover:shadow-lg hover:border-[#1fa2ff]/30 transition-all"
            >
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-gradient-to-br from-[#1fa2ff]/20 to-[#60b8ff]/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Code className="text-[#1fa2ff]" size={28} />
                </div>
                <div className="flex-1">
                  <h2 className="mb-3 group-hover:text-[#1fa2ff] transition-colors">
                    Software Projects
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Technical projects and tools I've built to solve real problems. Leveraging my engineering background to create practical solutions.
                  </p>
                  <span className="text-[#1fa2ff] group-hover:underline">
                    See projects →
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
