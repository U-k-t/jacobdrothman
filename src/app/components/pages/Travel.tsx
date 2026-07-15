import { MapPin } from "lucide-react";
import { TravelMap } from "../TravelMap";

export function Travel() {
  const destinations = [
    {
      location: "Japan",
      year: "2024",
      description: "Immersed in the blend of ancient traditions and cutting-edge technology. The attention to detail in Japanese design inspired my approach to product development.",
    },
    {
      location: "New Zealand",
      year: "2023",
      description: "Trekked through stunning landscapes while learning about Māori culture and their deep connection to the land. A masterclass in sustainable thinking.",
    },
    {
      location: "Iceland",
      year: "2023",
      description: "Explored volcanic landscapes and witnessed the northern lights. The raw power of nature reminded me to think big and embrace uncertainty.",
    },
    {
      location: "Portugal",
      year: "2022",
      description: "Discovered the perfect balance of old-world charm and modern innovation in Lisbon's tech scene. Great pastel de nata too.",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-theme(spacing.16))]">
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="mb-6">Travel Adventures</h1>

          <p className="text-lg text-muted-foreground mb-12">
            Travel broadens my perspective and informs how I approach product management. Every destination offers unique insights into how people solve problems, interact with technology, and build communities.
          </p>

          <TravelMap />

          <div className="space-y-8">
            {destinations.map((destination, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-md hover:border-[#1fa2ff]/30 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#1fa2ff]/20 to-[#60b8ff]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-[#1fa2ff]" size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3 mb-2">
                      <h3>{destination.location}</h3>
                      <span className="text-muted-foreground">{destination.year}</span>
                    </div>
                    <p className="text-muted-foreground">{destination.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-accent/50 border border-border rounded-lg p-6">
            <h3 className="mb-3">What Travel Teaches Me</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Empathy for diverse user needs and cultural contexts</li>
              <li>• Adaptability when plans change unexpectedly</li>
              <li>• The importance of research and preparation</li>
              <li>• How to communicate across language and cultural barriers</li>
              <li>• Finding creative solutions with limited resources</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
