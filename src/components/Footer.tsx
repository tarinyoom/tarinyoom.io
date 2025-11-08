import { Mail } from "lucide-react";
import { SiGithub, SiLinkedin } from "react-icons/si";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8">
        <div className="space-y-4 text-center">
          <div className="flex justify-center gap-4">
            <a
              href="https://github.com/tarinyoom"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="GitHub"
            >
              <SiGithub className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/in/adam-reynolds-246744201"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="LinkedIn"
            >
              <SiLinkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:tarinyoom@proton.me"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
          <p className="text-muted-foreground">&copy; {new Date().getFullYear()} Adam Reynolds. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
