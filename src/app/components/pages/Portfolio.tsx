import { Link } from "react-router";
import { Briefcase, TrendingUp } from "lucide-react";

export function Portfolio() {
  return (
    <div className="min-h-[calc(100vh-theme(spacing.16))]">
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="mb-6">Portfolio</h1>

          <p className="text-lg text-muted-foreground mb-12">
            Selected work across product launches, customer discovery, and internal tooling.
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
                    Two case studies: an AI-infrastructure hardware product line at Infineon and a B2B marketplace I co-founded.
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
                    Reporting tools, outreach automation, and CRM adoption work at Infineon, each with its own users and results.
                  </p>
                  <span className="text-[#1fa2ff] group-hover:underline">
                    Explore improvements →
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
