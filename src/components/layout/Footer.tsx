"use client";

import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/SocialIcons";

const quickLinks = [
  { href: "#home", label: "Home" },
  { href: "#projects", label: "Projects" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-foreground/5 pt-16 pb-8 px-6 md:px-12 lg:px-20">
      <div className="max-w-[1440px] mx-auto">
        {/* Top section - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 pb-12">
          {/* Left - Monogram + tagline */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg border border-foreground/20 text-sm font-bold tracking-tight">
              KC
            </div>
            <p className="text-sm text-muted">
              Building digital experiences.
            </p>
          </div>

          {/* Center - Quick links */}
          <div className="flex flex-col items-center gap-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted mb-1">
              Navigation
            </p>
            <div className="flex items-center gap-6">
              {quickLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-foreground/40 hover:text-foreground transition-colors"
                  data-cursor="link"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right - Social + email */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted mb-1">
              Connect
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/KaranChandekar"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-foreground/40 hover:text-accent transition-colors"
                data-cursor="link"
              >
                <GithubIcon size={18} />
              </a>
              <a
                href="https://linkedin.com/in/karan-chandekar"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-foreground/40 hover:text-accent transition-colors"
                data-cursor="link"
              >
                <LinkedinIcon size={18} />
              </a>
              <a
                href="https://twitter.com/KaranChandekar"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-foreground/40 hover:text-accent transition-colors"
                data-cursor="link"
              >
                <TwitterIcon size={18} />
              </a>
              <span className="text-foreground/10 mx-1">|</span>
              <a
                href="mailto:karanchandekar431@gmail.com"
                className="text-sm text-foreground/40 hover:text-accent transition-colors"
                data-cursor="link"
              >
                Email
              </a>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="border-t border-foreground/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-foreground/30">
            &copy; {new Date().getFullYear()} Karan Chandekar
          </p>
          <button
            onClick={scrollToTop}
            className="text-xs text-foreground/30 hover:text-accent transition-colors font-mono uppercase tracking-wider"
            data-cursor="link"
          >
            Back to top &uarr;
          </button>
        </div>
      </div>
    </footer>
  );
}
