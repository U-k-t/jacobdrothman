import { Link } from "react-router";
import { Mountain, Plane } from "lucide-react";

export function About() {
  return (
    <div className="min-h-[calc(100vh-theme(spacing.16))]">
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="mb-8">About Me</h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-muted-foreground mb-6">
              I'm a product manager with a passion for building products that make a difference. With a background in software engineering and a love for solving complex problems, I bridge the gap between technical teams and business stakeholders.
            </p>

            <p className="text-muted-foreground mb-6">
              My journey into product management started with curiosity about how great products come to life. Over the years, I've led cross-functional teams, launched successful products, and continuously refined processes to deliver exceptional user experiences.
            </p>

            <p className="text-muted-foreground mb-8">
              When I'm not thinking about product strategy or diving into user research, you'll find me exploring the world or scaling new heights. My adventures fuel my creativity and teach me lessons that I bring back to my work.
            </p>
          </div>

          <h2 className="mb-6">Beyond Product Management</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Link
              to="/about/travel"
              className="group bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:border-[#1fa2ff]/30 transition-all"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#1fa2ff]/20 to-[#60b8ff]/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Plane className="text-[#1fa2ff]" size={24} />
              </div>
              <h3 className="mb-2">Travel Adventures</h3>
              <p className="text-muted-foreground mb-4">
                Exploring new cultures, perspectives, and cuisines around the globe. Each journey teaches me something new about people and problem-solving.
              </p>
              <span className="text-[#1fa2ff] group-hover:underline">
                Read more →
              </span>
            </Link>

            <Link
              to="/about/climbing"
              className="group bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:border-[#1fa2ff]/30 transition-all"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#1fa2ff]/20 to-[#60b8ff]/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Mountain className="text-[#1fa2ff]" size={24} />
              </div>
              <h3 className="mb-2">Rock Climbing</h3>
              <p className="text-muted-foreground mb-4">
                Pushing limits on the rock face, where every route is a puzzle to solve and every climb teaches resilience and planning.
              </p>
              <span className="text-[#1fa2ff] group-hover:underline">
                Read more →
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
