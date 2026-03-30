import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/SocialIcons";

export default function Footer() {
  return (
    <footer className="border-t border-border py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-foreground/40">
          &copy; {new Date().getFullYear()} Karan Chandekar. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/karanchandekar"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-foreground/40 hover:text-accent transition-colors"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href="https://linkedin.com/in/karanchandekar"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-foreground/40 hover:text-accent transition-colors"
          >
            <LinkedinIcon size={18} />
          </a>
          <a
            href="https://twitter.com/karanchandekar"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="text-foreground/40 hover:text-accent transition-colors"
          >
            <TwitterIcon size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
