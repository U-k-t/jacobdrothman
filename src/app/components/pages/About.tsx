import { Link } from "react-router";
import { Mountain, Plane } from "lucide-react";

const chapters = [
  {
    label: "Foundation",
    title: "Computer Science and entrepreneurship",
    body: "I studied Computer Science with a minor in Entrepreneurship and Business Management at Cal Poly Pomona. In 2020 I co-founded Trusty, a B2B proptech marketplace, and led product and technical work as one of four co-founders. We talked to 25+ participants, shipped an MVP with a live Stripe purchase flow, and pivoted three times based on what we learned.",
  },
  {
    label: "International product work",
    title: "Product marketing at Infineon, in Europe",
    body: "In 2021 I joined Infineon's graduate program and relocated to Villach, Austria, then to Munich in 2022. The work was product work on technical hardware products: turning customer interviews and market data into requirements and roadmap recommendations, and building Python, VBA, and Tableau tools that helped teams work faster.",
  },
  {
    label: "Increasing ownership",
    featured: true,
    title: "From supporting roadmaps to owning them",
    body: "Over five years my scope grew from analysis and tooling, to proposing product concepts, to coordinating prioritization across three product teams, to owning feature and positioning decisions through launch and ramp for an AI-infrastructure product line. Along the way I ran a Greater China discovery trip with 13 customer visits and presented priorities to senior leadership.",
  },
  {
    label: "Next",
    title: "Software product management",
    body: "I'm moving into software product management. I started out building software, and my product roles have kept me close to technical tradeoffs. Software PM is where I want to apply that ownership next, working with engineers, customers, and data.",
  },
];

export function About() {
  return (
    <div className="min-h-[calc(100vh-theme(spacing.16))]">
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="mb-8">About Me</h1>

          <p className="text-lg text-muted-foreground mb-12">
            I'm a product manager with a Computer Science degree, a startup I co-founded, and five years of product work on technical products in Europe. Software product management is where I'm taking that next.
          </p>

          <div className="space-y-8 mb-16">
            {chapters.map((chapter, index) => (
              <div
                key={chapter.label}
                className={
                  chapter.featured
                    ? "border-l-2 border-[#1fa2ff]/60 pl-6"
                    : "border-l-2 border-[#1fa2ff]/30 pl-6"
                }
              >
                <div className="text-sm text-[#1fa2ff] mb-1">
                  {index + 1}. {chapter.label}
                </div>
                <h3 className={chapter.featured ? "mb-2 text-xl" : "mb-2"}>{chapter.title}</h3>
                <p className={chapter.featured ? "text-foreground text-lg" : "text-muted-foreground"}>
                  {chapter.body}
                </p>
              </div>
            ))}
          </div>

          <p className="text-muted-foreground mb-16">
            You can see the details in my <Link to="/resume" className="text-[#1fa2ff] hover:underline">resume</Link> and the <Link to="/work" className="text-[#1fa2ff] hover:underline">work</Link> behind it.
          </p>

          <h2 className="mb-6">Outside of Work</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Link
              to="/about/travel"
              className="group bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:border-[#1fa2ff]/30 transition-all"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#1fa2ff]/20 to-[#60b8ff]/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Plane className="text-[#1fa2ff]" size={24} />
              </div>
              <h3 className="mb-2">Travel</h3>
              <p className="text-muted-foreground mb-4">
                Trips across Europe, East Asia, and the US, plus two work moves to Austria and Germany.
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
              <h3 className="mb-2">Climbing</h3>
              <p className="text-muted-foreground mb-4">
                Bouldering about twice a week, in gyms around the world and outdoors in Southern California.
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
