import { Github, Linkedin, Mail } from "lucide-react";

// Built at runtime rather than a literal string, so the address isn't sitting in
// the page as scrapeable plaintext.
const CONTACT_EMAIL = ["mrjrothman", "gmail.com"].join("@");

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} Jacob Rothman
          </p>
          <div className="flex gap-4">
            <a
              href="https://github.com/U-k-t"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-[#1fa2ff] transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com/in/jacob-rothman"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-[#1fa2ff] transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-muted-foreground hover:text-[#1fa2ff] transition-colors"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
