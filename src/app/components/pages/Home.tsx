import { Link } from "react-router";
import { ArrowRight, Briefcase, Code, TrendingUp } from "lucide-react";

export function Home() {
  return (
    <div className="min-h-[calc(100vh-theme(spacing.16))]">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1fa2ff]/10 via-transparent to-[#60b8ff]/5 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-6xl mb-6 tracking-tight">
              Jacob Rothman
              <br />
              <span className="bg-gradient-to-r from-[#1fa2ff] to-[#60b8ff] bg-clip-text text-transparent">Product Manager, Roadmaps, Data & Customer-Driven Decisions</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
              Product Manager with a CS background and B2B marketplace startup experience — translating customer needs into product strategy, prioritizing with data, and leading cross-functional teams from requirements through launch.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1fa2ff] to-[#60b8ff] text-white px-6 py-3 rounded-lg hover:shadow-lg hover:shadow-[#1fa2ff]/25 transition-all"
              >
                View My Work
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 border-2 border-[#1fa2ff] text-[#1fa2ff] px-6 py-3 rounded-lg hover:bg-[#1fa2ff]/10 transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl mb-12 text-center">What I Do</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:border-[#1fa2ff]/30 transition-all group">
              <div className="w-12 h-12 bg-gradient-to-br from-[#1fa2ff]/20 to-[#60b8ff]/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Briefcase className="text-[#1fa2ff]" size={24} />
              </div>
              <h3 className="mb-3">Product Strategy</h3>
              <p className="text-muted-foreground">
                Defining product vision, roadmaps, and go-to-market strategies that align with business goals and user needs.
              </p>
              <Link
                to="/portfolio/product-case-studies"
                className="inline-flex items-center gap-1 text-[#1fa2ff] mt-4 hover:gap-2 transition-all"
              >
                View Case Studies
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:border-[#1fa2ff]/30 transition-all group">
              <div className="w-12 h-12 bg-gradient-to-br from-[#1fa2ff]/20 to-[#60b8ff]/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <TrendingUp className="text-[#1fa2ff]" size={24} />
              </div>
              <h3 className="mb-3">Process Optimization</h3>
              <p className="text-muted-foreground">
                Streamlining workflows, implementing agile methodologies, and driving continuous improvement across teams.
              </p>
              <Link
                to="/portfolio/process-improvement"
                className="inline-flex items-center gap-1 text-[#1fa2ff] mt-4 hover:gap-2 transition-all"
              >
                See Improvements
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:border-[#1fa2ff]/30 transition-all group">
              <div className="w-12 h-12 bg-gradient-to-br from-[#1fa2ff]/20 to-[#60b8ff]/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Code className="text-[#1fa2ff]" size={24} />
              </div>
              <h3 className="mb-3">Technical Projects</h3>
              <p className="text-muted-foreground">
                Building tools and applications that solve real problems, leveraging my technical background in software development.
              </p>
              <Link
                to="/resume"
                className="inline-flex items-center gap-1 text-[#1fa2ff] mt-4 hover:gap-2 transition-all"
              >
                See Technical Skills
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl mb-6">Let's Work Together</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            I'm always interested in hearing about new opportunities and exciting projects. Feel free to reach out!
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1fa2ff] to-[#60b8ff] text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            Contact Me
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
