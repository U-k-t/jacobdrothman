import { Link, useLocation } from "react-router";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  const isParentActive = (basePath: string) => location.pathname.startsWith(basePath);

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-medium tracking-tight hover:opacity-70 transition-opacity">
            Jacob Rothman
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-accent rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`transition-colors hover:text-[#1fa2ff] ${
                isActive("/") ? "text-[#1fa2ff]" : "text-muted-foreground"
              }`}
            >
              Home
            </Link>

            <div className="relative group">
              <button
                className={`flex items-center gap-1 transition-colors hover:text-[#1fa2ff] ${
                  isParentActive("/about") ? "text-[#1fa2ff]" : "text-muted-foreground"
                }`}
              >
                About
                <ChevronDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-40 bg-popover border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <Link
                  to="/about"
                  className="block px-4 py-2 hover:bg-accent rounded-t-lg transition-colors"
                >
                  Overview
                </Link>
                <Link
                  to="/about/travel"
                  className="block px-4 py-2 hover:bg-accent transition-colors"
                >
                  Travel
                </Link>
                <Link
                  to="/about/climbing"
                  className="block px-4 py-2 hover:bg-accent rounded-b-lg transition-colors"
                >
                  Climbing
                </Link>
              </div>
            </div>

            <div className="relative group">
              <button
                className={`flex items-center gap-1 transition-colors hover:text-[#1fa2ff] ${
                  isParentActive("/portfolio") ? "text-[#1fa2ff]" : "text-muted-foreground"
                }`}
              >
                Portfolio
                <ChevronDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-52 bg-popover border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <Link
                  to="/portfolio"
                  className="block px-4 py-2 hover:bg-accent rounded-t-lg transition-colors"
                >
                  Overview
                </Link>
                <Link
                  to="/portfolio/product-case-studies"
                  className="block px-4 py-2 hover:bg-accent transition-colors"
                >
                  Product Case Studies
                </Link>
                <Link
                  to="/portfolio/process-improvement"
                  className="block px-4 py-2 hover:bg-accent rounded-b-lg transition-colors"
                >
                  Process Improvement
                </Link>
              </div>
            </div>

            <Link
              to="/resume"
              className={`transition-colors hover:text-[#1fa2ff] ${
                isActive("/resume") ? "text-[#1fa2ff]" : "text-muted-foreground"
              }`}
            >
              Resume
            </Link>
            <Link
              to="/contact"
              className={`transition-colors hover:text-[#1fa2ff] ${
                isActive("/contact") ? "text-[#1fa2ff]" : "text-muted-foreground"
              }`}
            >
              Contact
            </Link>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="block py-2 hover:text-[#1fa2ff] transition-colors"
            >
              Home
            </Link>

            <div>
              <button
                onClick={() => setAboutOpen(!aboutOpen)}
                className="flex items-center justify-between w-full py-2 hover:text-[#1fa2ff] transition-colors"
              >
                About
                <ChevronDown
                  size={16}
                  className={`transition-transform ${aboutOpen ? "rotate-180" : ""}`}
                />
              </button>
              {aboutOpen && (
                <div className="pl-4 space-y-2 mt-2">
                  <Link
                    to="/about"
                    onClick={() => setIsOpen(false)}
                    className="block py-1 text-muted-foreground hover:text-[#1fa2ff] transition-colors"
                  >
                    Overview
                  </Link>
                  <Link
                    to="/about/travel"
                    onClick={() => setIsOpen(false)}
                    className="block py-1 text-muted-foreground hover:text-[#1fa2ff] transition-colors"
                  >
                    Travel
                  </Link>
                  <Link
                    to="/about/climbing"
                    onClick={() => setIsOpen(false)}
                    className="block py-1 text-muted-foreground hover:text-[#1fa2ff] transition-colors"
                  >
                    Climbing
                  </Link>
                </div>
              )}
            </div>

            <div>
              <button
                onClick={() => setPortfolioOpen(!portfolioOpen)}
                className="flex items-center justify-between w-full py-2 hover:text-[#1fa2ff] transition-colors"
              >
                Portfolio
                <ChevronDown
                  size={16}
                  className={`transition-transform ${portfolioOpen ? "rotate-180" : ""}`}
                />
              </button>
              {portfolioOpen && (
                <div className="pl-4 space-y-2 mt-2">
                  <Link
                    to="/portfolio"
                    onClick={() => setIsOpen(false)}
                    className="block py-1 text-muted-foreground hover:text-[#1fa2ff] transition-colors"
                  >
                    Overview
                  </Link>
                  <Link
                    to="/portfolio/product-case-studies"
                    onClick={() => setIsOpen(false)}
                    className="block py-1 text-muted-foreground hover:text-[#1fa2ff] transition-colors"
                  >
                    Product Case Studies
                  </Link>
                  <Link
                    to="/portfolio/process-improvement"
                    onClick={() => setIsOpen(false)}
                    className="block py-1 text-muted-foreground hover:text-[#1fa2ff] transition-colors"
                  >
                    Process Improvement
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/resume"
              onClick={() => setIsOpen(false)}
              className="block py-2 hover:text-[#1fa2ff] transition-colors"
            >
              Resume
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="block py-2 hover:text-[#1fa2ff] transition-colors"
            >
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
