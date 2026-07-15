import { Award, TrendingUp } from "lucide-react";

export function Climbing() {
  const achievements = [
    {
      route: "El Capitan, Yosemite",
      grade: "5.10d",
      description: "Multi-day climb that tested endurance, planning, and trust in my team. Every pitch required careful risk assessment.",
    },
    {
      route: "Red Rocks, Nevada",
      grade: "5.11a",
      description: "Technical routes with stunning desert views. Learned the value of patience and reading the rock.",
    },
    {
      route: "Smith Rock, Oregon",
      grade: "5.10c",
      description: "Beautiful basalt columns that demand precise footwork and mental focus. A lesson in attention to detail.",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-theme(spacing.16))]">
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="mb-6">Rock Climbing</h1>

          <p className="text-lg text-muted-foreground mb-12">
            Rock climbing has taught me invaluable lessons about problem-solving, risk management, and perseverance. Each route is like a product challenge: assess the problem, plan your approach, adapt when necessary, and push through when it gets tough.
          </p>

          <div className="mb-12">
            <h2 className="mb-6">Notable Climbs</h2>
            <div className="space-y-6">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-lg p-6 hover:shadow-md hover:border-[#1fa2ff]/30 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#1fa2ff]/20 to-[#60b8ff]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="text-[#1fa2ff]" size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-3 mb-2">
                        <h3>{achievement.route}</h3>
                        <span className="text-sm bg-accent px-2 py-1 rounded">{achievement.grade}</span>
                      </div>
                      <p className="text-muted-foreground">{achievement.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-accent/50 border border-border rounded-lg p-6">
              <div className="w-10 h-10 bg-gradient-to-br from-[#1fa2ff]/20 to-[#60b8ff]/20 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="text-[#1fa2ff]" size={20} />
              </div>
              <h3 className="mb-3">Parallels to Product Management</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Breaking complex problems into manageable sequences</li>
                <li>• Continuous assessment and adaptation</li>
                <li>• Trusting your team and clear communication</li>
                <li>• Knowing when to push forward and when to retreat</li>
                <li>• Preparation and planning for the unexpected</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="mb-3">Current Goals</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-[#1fa2ff] mt-1">→</span>
                  <span>Lead a 5.12a trad route</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#1fa2ff] mt-1">→</span>
                  <span>Complete a multi-pitch climb in the Alps</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#1fa2ff] mt-1">→</span>
                  <span>Improve crack climbing technique</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#1fa2ff] mt-1">→</span>
                  <span>Mentor new climbers in outdoor safety</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
