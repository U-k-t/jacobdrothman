import { Mail, Linkedin, Github, MapPin } from "lucide-react";

// Built at runtime rather than a literal string, so the address isn't sitting in
// the page as scrapeable plaintext.
const CONTACT_EMAIL = ["mrjrothman", "gmail.com"].join("@");

const iconBox =
  "w-10 h-10 bg-gradient-to-br from-[#1fa2ff]/20 to-[#60b8ff]/20 rounded-lg flex items-center justify-center flex-shrink-0";

export function Contact() {
  return (
    <div className="min-h-[calc(100vh-theme(spacing.16))]">
      <section className="py-16 lg:py-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="mb-6">Contact</h1>

          <p className="text-lg text-muted-foreground mb-12">
            I'm looking for software product management roles, especially in B2B software and fintech. If you're hiring, email is the best way to reach me.
          </p>

          <div className="bg-card border border-border rounded-lg p-6 space-y-4">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="flex items-center gap-3 text-muted-foreground hover:text-[#1fa2ff] transition-colors"
            >
              <div className={iconBox}>
                <Mail size={20} className="text-[#1fa2ff]" />
              </div>
              <span>Email</span>
            </a>
            <a
              href="https://linkedin.com/in/jacob-rothman"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-muted-foreground hover:text-[#1fa2ff] transition-colors"
            >
              <div className={iconBox}>
                <Linkedin size={20} className="text-[#1fa2ff]" />
              </div>
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/U-k-t"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-muted-foreground hover:text-[#1fa2ff] transition-colors"
            >
              <div className={iconBox}>
                <Github size={20} className="text-[#1fa2ff]" />
              </div>
              <span>GitHub</span>
            </a>
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className={iconBox}>
                <MapPin size={20} className="text-[#1fa2ff]" />
              </div>
              <span>Southern California</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
